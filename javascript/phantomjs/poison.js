global.loginInstructions = function () {
    $("#login_form").val("username");
    $("#senha_form").val("password");
    $("#form_login").submit();
}

global.checkLoginInstructions = function () {
    return $(".sair").size() > 0;
}

global.auctionInstructions = function() {
    var online = function (current) {
        if(current["dar_lance_boot"])
            window.dar_lances_boot(current["dar_lance_boot"], dir);

        console.log(current["tempo"] + " - " + current["valor"] + " - " + current["clientes"])

        if (current["tempo"] == "01") {
            console.log("---------------------- BUUUMMMMMMM!!! ---------------------------");
            // dar_lances("item=" + current["id"], "http://www.lancedesuplementos.com.br");
        }
    }

    var offline = function (current) {
        var arrematado = current["arrematado"]
        console.log("Arrematado -> Nome: "+arrematado["clientes"]+" Valor: "+arrematado["valor"]);
    }

    var patchedCallback = function (json) {
        for(var i=1; i<=json.num_banco; i++){
            var current = json.item[i];

            if(!current["situacao"]) {
                online(current);
        	} else {
                offline(current);
       	    }
        }
    };

    window.update_leilao = function(itens, dir) {
        var url = dir + "/paginas/leiloes/ajax/update.php?cache=" + new Date().getTime();

        $.ajax({
            type: "POST",
            url: url,
            data: itens,
            dataType: "json",
            success: patchedCallback
        });

    	window.setTimeout(function () {
            update_leilao(itens, dir);
        }, 1000);
    };
}

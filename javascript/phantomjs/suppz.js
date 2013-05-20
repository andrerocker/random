var system    = require("system");
var poison    = require("./poison.js");

var supp_home = "http://www.lancedesuplementos.com.br/";
var supp_url  = system.args[1];

var buildPage = function () {
    var page = require("webpage").create();
    page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0";
    page.onConsoleMessage = function(msg) { console.log("[site] - "+ msg); };
    return page;
}

var startRequest = function () {
    console.log("iniciando requisição a pagina inicial -> " + supp_home);
    var page = buildPage();
    page.open(supp_url, function(status) {
        login(page);
    });
}

var login = function (page) {
    console.log("aguardando 3 segundos para efetuar login.");
    setTimeout(function () {
        page.evaluate(loginInstructions);
        console.log("aguardando 10 segundos para verificar se o login deu certo.")
        setTimeout(function () {
            if (!page.evaluate(checkLoginInstructions)) {
                console.log("problemas ao executar login");
                return;
            }

            console.log("login executado com sucesso!")
            loadSuppPage(page);
        }, 10000);
    }, 3000);
}

var loadSuppPage = function (page) {
    console.log("carregando pagina do leilao!");
    page.open(supp_url, function () {
        if (page.evaluate(checkLoginInstructions)) {
            console.log("executando patch nas funcoes de controle");
            page.evaluate(auctionInstructions);
        }
    });
}

startRequest();

from bottle import route, run

@route("/bacon/:name")
def index(name="Jonnhy"):
    return "<b>Hello World: %s!</b>" % name
 
run(host="localhost", port=8080)
from flask import Flask, render_template, request
import json

app=Flask(__name__)

w=json.load(open('static/worldl.json'))

@app.route("/")
def index():
    return render_template("index.html")
@app.route("/api/country/<i>", methods=['GET'])
def get(i):
    ret = next((c for c in w if c['id'] == int(i)),None)
    if ret:
        return ret
    return "not found", 404

@app.route("/api/country/<i>", methods = ['DELETE'])
def delete(i):
    global w
    w = [c for c in w if c['id'] != int(i)]
    json.dump(w, open("static/worldl.json","w"))
    return {}

@app.route("/api/country/<i>", methods = ['POST'])
def post(i):
    #TODO - are, population, GDP, flag and tld are all missing
    ret = next((c for c in w if c['id'] == int(i)))
    payload = request.json
    ret['name'] =payload['name']
    ret['continent'] = payload['continent']
    ret['capital'] = payload['capital']
    
    return {}
    
app.run(debug=True)

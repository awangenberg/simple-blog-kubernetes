from flask import Flask, jsonify, request 


app =   Flask(__name__)

@app.route('/hello', methods=['GET']) 
def helloworld(): 
    if(request.method == 'GET'): 
        data = {"data": "Hello World"} 
        return jsonify(data) 

@app.route('/health-check', methods=['GET']) 
def health_check(): 
    if(request.method == 'GET'): 
        data = {"health-check": "Service is up and running!"} 
        return jsonify(data)

if __name__ == '__main__': 
    app.run(debug=True) 


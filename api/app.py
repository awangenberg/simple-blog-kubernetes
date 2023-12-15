from flask import Flask, jsonify, request
from flask_cors import CORS 


app =   Flask(__name__)
CORS(app)

@app.route('/posts', methods=['POST']) 
def create_posts(): 
    if(request.method == 'POST'): 
        heading = request.form['heading']
        body = request.form['body']
        
        return jsonify(data) 

@app.route('/health-check', methods=['GET']) 
def health_check(): 
    if(request.method == 'GET'): 
        data = {"health-check": "The service is up and running!"} 
        return jsonify(data)



if __name__ == '__main__': 
    app.run(debug=True) 


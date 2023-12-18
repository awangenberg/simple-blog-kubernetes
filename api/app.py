from flask import Flask, jsonify, request
import flask
from flask_cors import CORS 


app =   Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "HEAD", "POST", "OPTIONS"], "allow_headers": ["*"]}})


@app.route('/health-check', methods=['GET']) 
def health_check(): 
    if(request.method == 'GET'): 
        response = flask.jsonify({'health-check': 'The service is up and running!'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == '__main__': 
    app.run(debug=True) 
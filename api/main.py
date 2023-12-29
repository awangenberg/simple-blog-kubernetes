import logging
import os
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from config import DevelopmentConfig, ProductionConfig, TestConfiguration 
from data.database import Post, db
import flask
from data.database import *

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://simple-blog.strangled.net/'])

def create_app():
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    run_environment = os.getenv('RUNENVIRONMENT', '').lower()

    if run_environment == "production":
        app.config.from_object(ProductionConfig)
    elif run_environment == "development":
        app.config.from_object(DevelopmentConfig)
    elif run_environment == "testing":
        app.config.from_object(TestConfiguration)
    else:
        raise KeyError("RUNENVIRONMENT has to be set as an os-environment variable")

    db.app = app
    db.init_app(app)

    return app

app = create_app()

@app.route('/health-check', methods=['GET'])
@cross_origin()
def health_check():
    print("Registered Routes:", app.url_map)
    if(request.method == 'GET'):
        response = flask.jsonify({'health-check': 'The service is up and running!'})
        return response

@app.route('/posts', methods=['POST'])
@cross_origin()
def add_posts():
    data = request.get_json()
    new_post = Post()
       
    if "heading" not in data or data["heading"] == "":
        return jsonify({'error': "heading property can not be empty!"}), 400
    
    if "body" not in data or data["body"] == "":
        return jsonify({'error': "body property can not be empty!"}), 400
       
    new_post.heading = data["heading"]
    new_post.body = data["body"]
    
    if "picture" in data and data["picture"] != "":
        new_post.picture = data["picture"]
    
    id = insert_post(new_post)
    
    response = jsonify({ "id": id })
    response.status_code = 200
    return response

@app.route("/posts/<id>", methods=['DELETE'])
@cross_origin()
def delete_post(id):
    remove_post(id)
    response = make_response('')
    response.status_code = 204
    return response

@app.route('/posts/<id>', methods=['GET'])
@cross_origin()
def get_post(id): 
    post:Post = retrieve_post(id)
    
    if(post is None):
        response = make_response('Could not find entry with Id: ' + id)
        response.status_code = 404
    else:
        response = jsonify(create_post_json(post))
    return response
    
@app.route("/posts",  methods=['GET'])
@cross_origin()
def get_all_posts():
    posts:Post = []
    for post in retrieve_all_posts():
        json = create_post_json(post)
        posts.append(json)
 
    response = jsonify(posts)
    return response

def create_post_json(post: Post):
 return {"id": post.id, 
                 "heading":post.heading, 
                 "body":post.body,
                 "created":post.created_at,
                 "picture":post.picture}


if __name__ == '__main__':    
    with app.app_context():
        db.create_all()
        app.run()
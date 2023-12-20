import logging
import os
from flask import Flask, jsonify, make_response, request
import flask
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig 
from data.database import Post, db, insert_post, remove_post, retrieve_all_posts, retrieve_post

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

if os.getenv('RUNENVIRONMENT').lower() == "production":
    app.config.from_object(ProductionConfig)
else:
    app.config.from_object(DevelopmentConfig)


CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "HEAD", "POST", "OPTIONS"], "allow_headers": ["*"]}})

db.app = app 
db.init_app(app)


@app.route('/health-check', methods=['GET']) 
def health_check(): 
    if(request.method == 'GET'):
        insert_post()
        response = flask.jsonify({'health-check': 'The service is up and running!'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/posts', methods=['POST'])
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
    response.headers.add('Access-Control-Allow-Origin', '*') #TODO set this globally to frontend URL
    return response

@app.route("/posts/<id>", methods=['DELETE'])
def delete_post(id):
    remove_post(id)
    response = make_response('')
    response.status_code = 204
    response.headers.add('Access-Control-Allow-Origin', '*') #TODO set this globally to frontend URL
    return response

@app.route('/posts/<id>', methods=['GET']) 
def get_post(id): 
    post:Post = retrieve_post(id)
    
    if(post is None):
        response = make_response('Could not find entry with Id: ' + id)
        response.status_code = 404
    else:
        response = jsonify(create_post_json(post))
        response.headers.add('Access-Control-Allow-Origin', '*') #TODO set this globally to frontend URL
    return response
    
@app.route("/posts",  methods=['GET'])
def get_all_posts():
    posts:Post = []
    for post in retrieve_all_posts():
        json = create_post_json(post)
        posts.append(json)
 
    response = jsonify(posts)
    response.headers.add('Access-Control-Allow-Origin', '*') #TODO set this globally to frontend URL
    return response

def create_post_json(post: Post):
 return {"id": post.id, 
                 "heading":post.heading, 
                 "body":post.body,
                 "created":post.created_at,
                 "picture":post.picture}

with app.app_context():
    db.create_all()
    app.run()
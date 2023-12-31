
from logging import info
import uuid
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

db = SQLAlchemy()
userid = '11111111-1111-1111-1111-111111111111' #TODO: get userId from token instead

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(36), nullable=False, unique=False, default=str(uuid.uuid4()))
    heading = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    picture = db.Column(db.LargeBinary, nullable=True)

def remove_post(id):
    Post.query.filter(id == id).delete
    
    post_to_delete = Post.query.get(id)
    if post_to_delete:
        db.session.delete(post_to_delete)
        db.session.commit()
        info('User with Id: %s deleted post with Id: %s ', userid, id)
    else:
        info('User with Id: %s tried to delete post with Id: %s but was not found.', userid, id)

    

def retrieve_post(id):
    info('User with Id: %s retrieving post with Id: %s ', userid, id)
    return Post.query.filter_by(id=id).first()
    
def retrieve_all_posts():
    info('User with Id: %s retrieving all posts', userid)
    return Post.query.all()
      
def insert_post(new_post: Post):
    new_post.userid = userid
    db.session.add(new_post)
    db.session.commit()
    info('User with Id: %s added new post with Id: %s ', new_post.userid, new_post.id)
    return new_post.id
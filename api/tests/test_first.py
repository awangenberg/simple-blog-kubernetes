import logging
import os
from flask import Flask
from flask_testing import TestCase
from config import TestConfiguration
from main import *

class EndpointsTests(TestCase):
    
        
    def create_app(self):
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        x =10
        db.session.remove()
        db.drop_all()


    def test_get_one_posts_should_return_200(self):        
        self.fill_db_with_post()
        with self.app.test_client() as client:
            reponse = client.get('/posts/1')
            assert reponse.status_code == 200
            
    def test_get_non_existing_posts_should_return_404(self):        
        with self.app.test_client() as client:
            reponse = client.get('/posts/1')
            assert reponse.status_code == 404
            
    def test_get_all_posts_empty_should_return_200(self):        
        with self.app.test_client() as client:
            reponse = client.get('/posts')
            assert reponse.status_code == 200
            assert reponse.content_type == 'application/json'
            data = reponse.get_json()
            assert isinstance(data, list)
            assert len(data) == 0 
            
    def test_get_all_posts_should_return_200(self):        
        self.fill_db_with_post()
        with self.app.test_client() as client:
            reponse = client.get('/posts')
            assert reponse.status_code == 200
            
            
    def test_should_return_200(self):        
        print("* Using DB: %s" % str(db.engine.url))
        with self.app.test_client() as client:
            reponse = client.get('/health-check')
            assert reponse.status_code == 200
            
    def test_add_post_should_return_200(self):        
        with self.app.test_client() as client:
            data = {
                "heading": "Test Heading",
                "body": "Test Body"
            }
        
        reponse = client.post('/posts', json=data)
        assert reponse.status_code == 200
        assert reponse.content_type == 'application/json'
        response_data = reponse.get_json()
        assert "id" in response_data
        assert response_data["id"] is not None
        
    def test_add_post_with_invalid_heading_should_return_400(self):        
        with self.app.test_client() as client:
            data = {
                "heading": "",
                "body": "Test Body"
            }
        
        reponse = client.post('/posts', json=data)
        assert reponse.status_code == 400

    def test_add_post_with_invalid_body_should_return_400(self):        
        with self.app.test_client() as client:
            data = {
                "heading": "Test",
                "body": ""
            }
        reponse = client.post('/posts', json=data)
        assert reponse.status_code == 400
       
    def test_remove_non_existing_post_should_return_204(self):        
        with self.app.test_client() as client:
            reponse = client.delete('/posts/1')
        
        assert reponse.status_code == 204
        
    def test_remove_post_should_return_204(self): 
        self.fill_db_with_post()       
        with self.app.test_client() as client:
            reponse = client.delete('/posts/1')
        
        assert reponse.status_code == 204   
          
    def fill_db_with_post(self):
        new_post = Post(heading = "test heading", body= "test body")
        new_post.heading = "test heading"
        new_post.body = "test body"
        id = insert_post(new_post)   

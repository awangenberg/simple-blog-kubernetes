import os

class Config:
    DEBUG = False

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') #TODO: get from kubernetes

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI= 'mysql+pymysql://root:password@localhost:3306/simple-blog'
    DEBUG = True
    DEVELOPMENT = True
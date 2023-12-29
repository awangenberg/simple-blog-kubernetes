import os

class Config(object):
    DEBUG = False

class ProductionConfig(Config):
    sql_password = os.environ.get("MYSQL_ROOT_PASSWORD", '')
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:" + sql_password + "@mysql:3306/simple_blog"

class DevelopmentConfig(Config):
    sql_password = os.environ.get("MYSQL_ROOT_PASSWORD", '')
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:" + sql_password + "@localhost:3306/simple_blog"
    DEBUG = True
    DEVELOPMENT = True
    
class TestConfiguration():
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    HASH_ROUNDS = 1
import os

class Config(object):
    DEBUG = False

class ProductionConfig(Config):
    sql_password = os.environ["MYSQL_ROOT_PASSWORD"]
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:" + sql_password + "@mysql:3306/simple_blog"

class DevelopmentConfig(Config):
    sql_password = os.environ["MYSQL_ROOT_PASSWORD"]
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:" + sql_password + "@localhost:3306/simple_blog"
    DEBUG = True
    DEVELOPMENT = True
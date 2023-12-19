import os

class Config:
    DEBUG = False

class ProductionConfig(Config):
    sql_password = username = os.environ["MYSQL_ROOT_PASSWORD"]
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://mysql:' + sql_password + '@10.128.81.29:3306/simple_blog'

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost:3306/simple_blog'
    DEBUG = True
    DEVELOPMENT = True
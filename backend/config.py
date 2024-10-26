import boto3
import json

def get_secret(secret_name):
    client = boto3.client("secretsmanager")
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])["api_key"]

def get_db_config():
    secret = get_secret("rds_credentials")
    return {
        "dbname": secret["dbname"],
        "user": secret["username"],
        "password": secret["password"],
        "host": secret["host"],
        "port": secret["port"]
    }

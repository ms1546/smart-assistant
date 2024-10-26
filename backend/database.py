import psycopg2
from psycopg2.extras import RealDictCursor
from backend.config import get_db_config

def get_connection():
    config = get_db_config()
    return psycopg2.connect(
        dbname=config["dbname"],
        user=config["user"],
        password=config["password"],
        host=config["host"],
        port=config["port"]
    )

def insert_task(task_name: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (task_name) VALUES (%s)", (task_name,))
    conn.commit()
    cursor.close()
    conn.close()

def get_tasks():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    return tasks

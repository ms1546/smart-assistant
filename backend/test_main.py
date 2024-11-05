import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_chat_with_ai():
    response = client.post("/chat/", json={"message": "Hello, AI!"})
    assert response.status_code == 200
    assert "response" in response.json()

def test_create_task():
    response = client.post("/tasks/", json={"task_name": "New Task"})
    assert response.status_code == 200
    assert response.json() == {"message": "Task created successfully"}

def test_list_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert "tasks" in response.json()

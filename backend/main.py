from fastapi import FastAPI, HTTPException
import openai
from backend.database import insert_task, get_tasks
from backend.config import get_secret

app = FastAPI()

openai.api_key = get_secret("openai_api_key")

@app.post("/chat/")
async def chat_with_ai(message: str):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": message}]
        )
        ai_response = response.choices[0].message["content"]
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tasks/")
async def create_task(task_name: str):
    try:
        insert_task(task_name)
        return {"message": "Task created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tasks/")
async def list_tasks():
    try:
        tasks = get_tasks()
        return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

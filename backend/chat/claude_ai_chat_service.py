import anthropic
from typing import List, Dict
import os
from project_config import setup_app_config
import pandas as pd
import io

setup_app_config()

MODEL_ID = "claude-3-5-sonnet-20241022"

api_key = os.getenv("ANTHROPIC_API_KEY")

print("ANTHROPIC_API_KEY>>", api_key)

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key=api_key
)


class ChatHistoryManager:
    def __init__(self):
        self.chat_history: List[dict] = []

    def add_user_message(self, message: str):
        self.chat_history.append({'role': 'user', 'content': message})

    def add_ai_message(self, message: str):
        self.chat_history.append({'role': 'assistant', 'content': message})


chat_memory_per_user: Dict[str, ChatHistoryManager] = dict()


def get_chat_memory_per_user(user_id: str):
    if user_id in chat_memory_per_user:
        return chat_memory_per_user[user_id]
    else:
        new_memory = ChatHistoryManager()
        chat_memory_per_user[user_id] = new_memory
        return new_memory


def add_file_as_context(user_id: str, local_file_path: str):
    """
        Read file and add it as context.
        It works with CSV and Excel files
    :param local_file_path:
    :return:
    """
    print("add_file_as_context::local_file_path>>",local_file_path)
    print("add_file_as_context::user_id>>",user_id)
    chat_history = get_chat_memory_per_user(user_id)
    current_df = None
    data_type = ""
    if local_file_path.endswith(".csv"):
        current_df = pd.read_csv(local_file_path)
        data_type = "CSV"
    elif local_file_path.endswith(".xlsx"):
        current_df = pd.read_excel(local_file_path)
        data_type = "Excel"
    else:
        raise Exception("Format not supported!")

    buffer = io.StringIO()
    current_df.to_string(buffer)
    data_str = buffer.getvalue()

    # Add the data context to conversation history
    chat_history.add_user_message(f"Here's the {data_type} data I'd like you to analyze:\n\n{data_str}")


def handle_get_response_for_user(user_prompt: str, user_id: str) -> str:
    chat_memory = get_chat_memory_per_user(user_id)

    chat_memory.add_user_message(user_prompt)
    try:
        response = client.messages.create(
            model=MODEL_ID,
            max_tokens=1024,
            messages=chat_memory.chat_history
        )

        result = response.content[0].text
        chat_memory.add_ai_message(result)
        print("result >> ", result)

        return result
    except Exception as err:
        print("Error sending message to Claude API >> ",err)
        raise err
    except anthropic.BadRequestError as err:
        print("Bad request >> ",err,"::message>>")
        raise err


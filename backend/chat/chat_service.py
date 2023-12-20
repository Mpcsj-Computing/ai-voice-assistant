from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from project_config import setup_app_config

setup_app_config()

llm = ChatOpenAI(temperature=1)

# chat_memory = ConversationBufferMemory()

chat_memory_per_user = dict()


def get_chat_memory_per_user(user_id: str):
    if user_id in chat_memory_per_user:
        return chat_memory_per_user[user_id]
    else:
        new_memory = ConversationBufferMemory()
        chat_memory_per_user[user_id] = new_memory
        return new_memory


def handle_get_response_for_user(user_prompt: str, user_id: str) -> str:
    chat_memory = get_chat_memory_per_user(user_id)
    conversation = ConversationChain(
        llm=llm,
        verbose=False,
        memory=chat_memory
    )

    result = conversation.predict(input=user_prompt)
    print("result >> ", result)
    return result


def run():
    user_id1 = "123"
    user_id2 = "456"
    while True:
        user_id = user_id1 if input("1 for user_id1, anything else for user_id2:") == "1" else user_id2
        user_prompt = input("Ask something to the bot, or 0 to leave:")
        if user_prompt == "0":
            break
        handle_get_response_for_user(user_prompt, user_id)


if __name__ == "__main__":
    run()

from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from project_config import setup_app_config

setup_app_config()

llm = ChatOpenAI(temperature=1)

chat_memory_for_users = dict()


def get_chat_memory_for_user(user_id: str) -> ConversationBufferMemory:
    # TODO: Persist chat memory somewhere in the case of stopping the server
    if user_id in chat_memory_for_users:
        return chat_memory_for_users[user_id]
    else:
        chat_memory = ConversationBufferMemory()
        chat_memory_for_users[user_id] = chat_memory
        return chat_memory


def handle_get_response_for_user(user_id: str, user_prompt: str):
    user_chat_memory = get_chat_memory_for_user(user_id)
    conversation = ConversationChain(
        llm=llm,
        verbose=False,
        memory=user_chat_memory
    )

    result = conversation.predict(input=user_prompt)

    return result


def run():
    from project_config import setup_app_config
    setup_app_config()
    user_id1 = "useremail@gmail.com"
    user_id2 = "useremail2@gmail.com"

    while True:
        user_selected = input("1 for user 1, 2 for user 2:")
        user_id = user_id1 if user_selected == "1" else user_id2

        print("user selected >> ", user_id)
        user_prompt = input("Ask something to the bot (0 to leave):")
        if user_prompt == "0":
            break

        result = handle_get_response_for_user(user_id=user_id, user_prompt=user_prompt)
        print(result)


if __name__ == "__main__":
    run()

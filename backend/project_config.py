import os
from dotenv import load_dotenv


def setup_openai_config():
    import openai
    openai.api_key = os.getenv('OPENAI_API_KEY')
    openai.organization = os.getenv('OPENAI_ORG_ID')


def setup_app_config():
    load_dotenv()
    setup_openai_config()

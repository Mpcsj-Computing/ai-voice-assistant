import requests
import os
from utils.file_utils import create_unique_tmp_file


def get_api_key():
    return os.environ['ELEVEN_LABS_API_KEY']


def get_all_voice_ids():
    url = "https://api.elevenlabs.io/v1/voices"

    # Here, headers for the HTTP request are being set up.
    # Headers provide metadata about the request. In this case, we're specifying the content type and including our API key for authentication.
    headers = {
        "Accept": "application/json",
        "xi-api-key": get_api_key(),
        "Content-Type": "application/json"
    }

    # A GET request is sent to the API endpoint. The URL and the headers are passed into the request.
    response = requests.get(url, headers=headers)

    # The JSON response from the API is parsed using the built-in .json() method from the 'requests' library.
    # This transforms the JSON data into a Python dictionary for further processing.
    data = response.json()

    # A loop is created to iterate over each 'voice' in the 'voices' list from the parsed data.
    # The 'voices' list consists of dictionaries, each representing a unique voice provided by the API.
    for voice in data['voices']:
        # For each 'voice', the 'name' and 'voice_id' are printed out.
        # These keys in the voice dictionary contain values that provide information about the specific voice.
        print(f"{voice['name']}; {voice['voice_id']}")


def convert_text_to_audio(text_content: str, voice_id="pNInz6obpgDQGcFmaJgB"):
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": get_api_key()
    }

    print("header>>", headers)
    data = {
        "text": text_content,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
        }
    }

    CHUNK_SIZE = 1024
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    response = requests.post(url, json=data, headers=headers)
    output_file_path = create_unique_tmp_file('ai_voice_output.mp3')
    with open(output_file_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)

    return output_file_path


def get_account_info():
    url = "https://api.elevenlabs.io/v1/user"
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": get_api_key()
    }
    response = requests.request("GET", url, headers=headers)

    print(response.text)


if __name__ == "__main__":
    from project_config import setup_app_config

    setup_app_config()
    # get_all_voice_ids()
    get_account_info()

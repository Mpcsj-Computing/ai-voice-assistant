import openai


def convert_audio_to_text(local_input_file_path: str) -> dict:
    transcription = openai.Audio.transcribe("whisper-1", open(local_input_file_path, 'rb'))
    print(transcription)
    return transcription

import openai


def convert_audio_to_text(local_input_file_path: str) -> dict:
    transcription = openai.Audio.transcribe("whisper-1", open(local_input_file_path, 'rb'))
    print(transcription)
    return transcription



def run():
    from project_config import setup_app_config
    setup_app_config()
    file_path = "/Users/marcosjunior/Projects/work/mpcsj/Mpcsj/Youtube/Mpcsj_computing/VideoContent/thats_the_power_of_computer/ai/videos/final/shorts_final_audio.mp3"
    convert_audio_to_text(file_path)

if __name__ == "__main__":
    run()
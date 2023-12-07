import boto3

polly_client = boto3.client('polly', region_name="us-east-1")


def convert_text_to_audio(text_content: str):
    response = polly_client.synthesize_speech(
        Engine='standard',
        LanguageCode='en-US',
        OutputFormat='mp3',
        Text=text_content,
        VoiceId='Brian'
    )
    return response

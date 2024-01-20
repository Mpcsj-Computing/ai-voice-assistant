from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user

controller = APIRouter(prefix='/api/voice-assistant')


@controller.post('/audio-message', status_code=200)
async def handle_receive_audio_data(file: UploadFile, userId: str = Form(...)):
    print('file_data >> ', file)
    print('userId >>', userId)
    file_data = await file.read()
    generated_ai_audio_file_path = await handle_audio_from_user(file_data, user_id=userId)
    return FileResponse(generated_ai_audio_file_path, media_type='audio/mpeg', filename='ai_output')

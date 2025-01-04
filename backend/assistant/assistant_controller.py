from fastapi import APIRouter, UploadFile, Form, File,HTTPException,status
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user, handle_user_file

controller = APIRouter(prefix='/api/voice-assistant')


@controller.post('/audio-message', status_code=200)
async def handle_receive_audio_data(file: UploadFile, userId: str = Form(...)):
    print('file_data >> ', file)
    print('userId >>', userId)
    file_data = await file.read()

    try:
        generated_ai_audio_file_path = await handle_audio_from_user(file_data, user_id=userId)
        return FileResponse(generated_ai_audio_file_path, media_type='audio/mpeg', filename='ai_output')
    except Exception as err:
        print("controller exception >>",err)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating voice response >> {err}"
        )



@controller.post("/upload-file")
async def upload_file(file: UploadFile = File(...), userId: str = Form(...)):
    file_extension = file.filename.split(".")[-1].lower()
    file_data = await file.read()

    handle_user_file(file=file_data, user_id=userId, file_extension=file_extension)
    return {"status": "ok"}

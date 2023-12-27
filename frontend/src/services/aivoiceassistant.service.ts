import { APP_CONFIG } from "../configuration";

export const getAIReplyOutput = async (userAudioData: Blob, userId: string) => {
  const audioFile = new File([userAudioData], "userVoiceInput", {
    type: "audio/mpeg",
  });
  const formData = new FormData();
  formData.append("file", audioFile);
  formData.append("userId", userId);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const url = `${APP_CONFIG.BACKEND_URL}/api/voice-assistant/audio-message`;
    console.log("url>>", url);
    const result = await fetch(url, requestOptions);

    return await result.blob();
  } catch (error) {
    console.error("Error handling user voice data >> ", error);
  }
};

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
    const result = await fetch(
      "http://localhost:8000/voice-assistant/audio-message",
      requestOptions
    );

    return await result.blob();
  } catch (error) {
    console.error("Error handling user voice data >> ", error);
  }
};

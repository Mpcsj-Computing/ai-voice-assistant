export const getAIReplyOutput = async (userAudioData: Blob) => {
    const audioFile = new File([userAudioData], "userVoiceInput", {
      type: "audio/mpeg",
    });
    const formData = new FormData();
    formData.append("file", audioFile);
  
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
  
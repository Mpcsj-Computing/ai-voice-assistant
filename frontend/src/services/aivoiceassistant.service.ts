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

  const url = `${APP_CONFIG.BACKEND_URL}/api/voice-assistant/audio-message`;
  console.log("url>>", url);
  const result = await fetch(url, requestOptions);

  console.log("ai vocie result >>", { result });
  // Check if response was not OK (e.g., status 400, 500, etc.)
  if (!result.ok) {
    // Attempt to parse error response as JSON (typical for FastAPI)
    let errorData;
    try {
      errorData = await result.json();
    } catch (parseError) {
      // If the response is not JSON, fallback to plain text or a generic message
      console.error("Could not parse error as JSON.", parseError);
      throw new Error(
        `Request failed with status ${result.status} (${result.statusText})`
      );
    }

    // The default FastAPI error shape is often: { detail: "Your error message" }
    const messageFromServer = errorData?.detail ?? JSON.stringify(errorData);
    throw new Error(`Server Error (${result.status}): ${messageFromServer}`);
  }

  return await result.blob();
};

export const uploadCSVOrExcelFile = async (file: File, userId: string) => {
  // We assume `file` is already a CSV or Excel file coming from,
  // e.g., an <input type="file" /> or a Dropzone
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const requestOptions: RequestInit = {
    method: "POST",
    body: formData,
  };

  try {
    const url = `${APP_CONFIG.BACKEND_URL}/api/voice-assistant/upload-file`; // Use your desired endpoint
    const result = await fetch(url, requestOptions);

    // You can handle the response as JSON, text, or something else based on your needs
    // e.g.:
    // const data = await result.json();
    // return data;

    return await result.json();
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};

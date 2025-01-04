import {
  getAIReplyOutput,
  uploadCSVOrExcelFile,
} from "@/services/aivoiceassistant.service";
import { useState } from "react";
import { v4 } from "uuid";
import { SnackbarMessageInfo } from "./SnackbarMessage/SnackbarMessage.component";

const useVoiceAssistant = () => {
  const [isWaitingAIOutput, setIsWaitingAIOutput] = useState<boolean>(false);
  const [lastAIReplyURL, setLastAIReplyURL] = useState<string | undefined>(
    undefined
  );
  const [snackbarMessage, setSnackbarMessage] = useState<
    SnackbarMessageInfo | undefined
  >(undefined);
  const [userId, _] = useState(v4());

  const handleUserVoiceRecorded = async (userAudioData: Blob) => {
    setIsWaitingAIOutput(true);
    try {
      const result = await getAIReplyOutput(userAudioData, userId);
      setIsWaitingAIOutput(false);
      if (result) {
        const url = URL.createObjectURL(result);
        setLastAIReplyURL(url);
      }
    } catch (error) {
      setSnackbarMessage({
        message: `Error sending AI message >> ${error}. Please try again later`,
        messageVariant: "error",
      });
      setIsWaitingAIOutput(false);
    }
  };

  const handleUploadFile = async (file: File) => {
    setIsWaitingAIOutput(true);
    try {
      const result = await uploadCSVOrExcelFile(file, userId);
      setIsWaitingAIOutput(false);
      if (result) {
        setSnackbarMessage({
          message: "File successfully uploaded!",
          messageVariant: "success",
        });
      }
    } catch (error) {
      setSnackbarMessage({
        message: `Error uploading file >> ${error}`,
        messageVariant: "error",
      });
    }
  };

  const handleCloseSnackbarMessage = () => {
    setSnackbarMessage(undefined);
  };

  const handleOnAudioPlayEnd = () => {
    setLastAIReplyURL(undefined);
  };

  return {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
    handleUploadFile,
    handleCloseSnackbarMessage,
    snackbarMessage,
  };
};

export default useVoiceAssistant;

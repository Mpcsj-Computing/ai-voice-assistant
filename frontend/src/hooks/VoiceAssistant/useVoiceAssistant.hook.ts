import { getAIReplyOutput } from "@/services/aivoiceassistant.service";
import { useState } from "react";
import { v4 } from "uuid";

const useVoiceAssistant = () => {
  const [isWaitingAIOutput, setIsWaitingAIOutput] = useState<boolean>(false);
  const [lastAIReplyURL, setLastAIReplyURL] = useState<string | undefined>(
    undefined
  );
  const [userId, _] = useState(v4());

  const handleUserVoiceRecorded = async (userAudioData: Blob) => {
    setIsWaitingAIOutput(true);
    const result = await getAIReplyOutput(userAudioData, userId);
    setIsWaitingAIOutput(false);
    if (result) {
      const url = URL.createObjectURL(result);
      setLastAIReplyURL(url);
    }
  };

  const handleOnAudioPlayEnd = () => {
    setLastAIReplyURL(undefined);
  };
  return {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  };
};

export default useVoiceAssistant;

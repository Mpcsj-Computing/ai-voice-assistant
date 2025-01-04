import VoiceAssistantAvatar from "./VoiceAssistantAvatar/VoiceAssistantAvatar.component";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder.component";
import styles from "@/styles/VoiceAssistant.module.css";
import useVoiceAssistant from "../../../hooks/VoiceAssistant/useVoiceAssistant.hook";
import ReactLoading from "react-loading";
import AudioPlayer from "../AudioPlayer/AudioPlayer.component";
import FileSender from "../FileSender/FileSender.component";
import SnackbarMessage from "@/hooks/VoiceAssistant/SnackbarMessage/SnackbarMessage.component";

const VoiceAssistant = () => {
  const {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
    handleUploadFile,
    handleCloseSnackbarMessage,
    snackbarMessage,
  } = useVoiceAssistant();
  return (
    <div className={styles["voice-assistant-component"]}>
      <VoiceAssistantAvatar audioFileUrl={lastAIReplyURL} />
      <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded} />
      {isWaitingAIOutput && (
        <ReactLoading type={"bars"} color={"#4287f5"} width={200} />
      )}

      <FileSender
        disabled={isWaitingAIOutput}
        onFileSelected={handleUploadFile}
      />
      <AudioPlayer
        audioFileUrl={lastAIReplyURL}
        onAudioPlayEnd={handleOnAudioPlayEnd}
      />
      <SnackbarMessage
        messageInfo={snackbarMessage}
        onClose={handleCloseSnackbarMessage}
      />
    </div>
  );
};

export default VoiceAssistant;

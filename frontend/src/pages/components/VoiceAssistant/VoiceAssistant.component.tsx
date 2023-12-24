import VoiceAssistantAvatar from "./VoiceAssistantAvatar/VoiceAssistantAvatar.component";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder.component";
import styles from "@/styles/VoiceAssistant.module.css";
import useVoiceAssistant from "../../../hooks/VoiceAssistant/useVoiceAssistant.hook";
import ReactLoading from "react-loading";
import AudioPlayer from "../AudioPlayer/AudioPlayer.component";

const VoiceAssistant = () => {
  const {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  } = useVoiceAssistant();
  return (
    <div className={styles["voice-assistant-component"]}>
      <VoiceAssistantAvatar audioFileUrl={lastAIReplyURL} />
      <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded} />
      {isWaitingAIOutput && (
        <ReactLoading type={"bars"} color={"#4287f5"} width={200} />
      )}

      <AudioPlayer
        audioFileUrl={lastAIReplyURL}
        onAudioPlayEnd={handleOnAudioPlayEnd}
      />
    </div>
  );
};

export default VoiceAssistant;

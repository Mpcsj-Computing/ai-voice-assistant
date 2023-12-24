import styles from "@/styles/VoiceAssistant.module.css";
import useVoiceAssistantAvatar, {
  CANVAS_ORB_ID,
  UseVoiceAssistantAvatarProps,
} from "../../../../hooks/VoiceAssistant/VoiceAssistantAvatar/useVoiceAssistantAvatar";
import AudioBarsVisualizer from "./AudioBarsVisualizer/AudioBarsVisualizer";

const VoiceAssistantAvatar = (props: UseVoiceAssistantAvatarProps) => {
  const { audioFileUrl } = props;
  useVoiceAssistantAvatar(props);
  return (
    <div className={styles["voice-assistant-avatar-wrapper"]}>
      <canvas
        id={CANVAS_ORB_ID}
        className={styles["voice-assistant-avatar-canvas"]}
      />
      <AudioBarsVisualizer audioFileUrl={audioFileUrl} />
    </div>
  );
};

export default VoiceAssistantAvatar;

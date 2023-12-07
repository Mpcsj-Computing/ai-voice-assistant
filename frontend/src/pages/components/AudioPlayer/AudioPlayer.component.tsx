export interface AudioPlayerProps {
  audioFileUrl?: string;
  onAudioPlayEnd: () => void;
}

export const AUDIO_ELEMENT_ID = "ai-assistant-audio";

const AudioPlayer = ({ audioFileUrl, onAudioPlayEnd }: AudioPlayerProps) => {
  return (
    <div>
      {audioFileUrl && (
        <audio
          id={AUDIO_ELEMENT_ID}
          controls={true}
          autoPlay={true}
          onEnded={onAudioPlayEnd}
          src={audioFileUrl}
        />
      )}
    </div>
  );
};

export default AudioPlayer;

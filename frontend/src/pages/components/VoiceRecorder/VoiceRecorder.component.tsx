import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export interface VoiceRecorderProps{
    onAudioRecordingComplete: (audioData: Blob) => void;
}

const VoiceRecorder = ({onAudioRecordingComplete}:VoiceRecorderProps)=>{
    const recorderControls = useAudioRecorder();
    return (
        <div>
          <AudioRecorder
            onRecordingComplete={onAudioRecordingComplete}
            recorderControls={recorderControls}
          />
          {recorderControls.isRecording && (
            <button onClick={recorderControls.stopRecording}>Stop recording</button>
          )}
        </div>
    )
}


export default VoiceRecorder
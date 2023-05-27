

export interface AudioPlayerProps{
    audioFileUrl?: string;
    onAudioPlayEnd: () => void;
}

const AudioPlayer = ({audioFileUrl,onAudioPlayEnd}:AudioPlayerProps)=>{
    return (
        <div>
          {audioFileUrl && (
            <audio
              controls={true}
              autoPlay={true}
              onEnded={onAudioPlayEnd}
              src={audioFileUrl}
            />
          )}
        </div>
    )
}


export default AudioPlayer
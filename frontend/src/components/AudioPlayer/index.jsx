import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong } from "../../redux/audioPlayerSlice";
// import Like from "../Like";
import { IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";

const AudioPlayer = () => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Check if current song has a value else initiate it as null
  const { currentSong } = useSelector((state) =>
    state ? state.audioPlayer : null
  );
  const dispatch = useDispatch();

  const audioRef = useRef();
  const intervalRef = useRef();

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current?.ended) {
        dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
      } else if (audioRef.current) {
        setTrackProgress(audioRef.current.currentTime);
        audioRef.current.duration && setDuration(audioRef.current.duration);
      } else {
        setTrackProgress(0);
      }
    }, 1000);
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  //Since you're accessing an object, appending the null coalescing operator will help catch errors
  useEffect(() => {
    if (currentSong?.action === "play") {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [currentSong]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleActions = () => {
    currentSong?.action === "play"
      ? dispatch(setCurrentSong({ ...currentSong, action: "pause" }))
      : dispatch(setCurrentSong({ ...currentSong, action: "play" }));
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.left}>
        <img src={currentSong?.song.img} alt="song_img" />
        <div className={styles.songInfo}>
          <p className={styles.songName}>{currentSong?.song.name}</p>
          <p className={styles.songArtist}>{currentSong?.song.artist}</p>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.audioControls}>
          <IconButton className={styles.prev}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton className={styles.play} onClick={handleActions}>
            {currentSong?.action === "play" ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton className={styles.next}>
            <SkipNextIcon />
          </IconButton>
        </div>
        <div className={styles.progressContainer}>
          <p>{Math.floor(trackProgress)}</p>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            onChange={(e) => onScrub(e.target.value)}
            max={duration ? duration : 0}
            className={styles.progress}
            style={{ background: trackStyling }}
          />
          <audio src={currentSong?.song.song} ref={audioRef}></audio>
          <p>{Math.floor(duration)}</p>
        </div>
      </div>
      <div className={styles.right}>
        {/* The component doesn't exist anywher. Did you create it? If not, create it before importing */}
        {/* <Like songId={currentSong?.song._id} /> */}
      </div>
    </div>
  );
};

export default AudioPlayer;

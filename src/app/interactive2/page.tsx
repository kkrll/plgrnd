"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

const TVWorkout = () => {
  const [reps, setReps] = useState(2);
  const [time, setTime] = useState(34);
  const [heartRate, setHeartRate] = useState(146);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  // Initialize webcam
  useEffect(() => {
    const initializeWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 424,
            height: 580,
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setWebcamError("Unable to access camera. Please check permissions.");
      }
    };

    initializeWebcam();

    // Cleanup function
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulated timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.videoSection}>
        {/* Instruction Video */}
        <div className={styles.instructionVideo}>
          <div className={styles.heartRateIndicator}>
            <div className={styles.zoneIndicators}>
              <div className={styles.zone1} />
              <div className={styles.zone2} />
              <div className={styles.zone3} />
              <div className={styles.activeZone}>
                <span>􀊵</span>
                <span>{heartRate} BPM</span>
              </div>
              <div className={styles.zone5} />
            </div>
          </div>

          <div className={styles.exerciseInfo}>
            <h2>Sprint run in place</h2>
            <p>Round 1 / 6</p>
          </div>
        </div>

        {/* User Camera */}
        <div className={styles.userCamera}>
          {webcamError ? (
            <div className={styles.webcamError}>{webcamError}</div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={styles.webcamVideo}
              />
              <div className={styles.poseDetection}>
                {/* Pose detection markers will be added here */}
                <div className={styles.markers} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Performance Meter */}
      <div className={styles.performanceSection}>
        <div className={styles.repCounter}>
          <span className={styles.repNumber}>{reps}</span>
          <span className={styles.repLabel}>Reps</span>
        </div>

        <div className={styles.repMeter}>
          <div className={styles.meterLine} />
          <div className={styles.completedReps}>
            {[...Array(2)].map((_, i) => (
              <div key={`completed-${i}`} className={styles.repBarCompleted} />
            ))}
          </div>
          <div className={styles.currentIndicator} />
          <div className={styles.remainingReps}>
            {[...Array(10)].map((_, i) => (
              <div key={`remaining-${i}`} className={styles.repBarRemaining} />
            ))}
          </div>
          <div className={styles.bonusReps}>
            {[...Array(5)].map((_, i) => (
              <div key={`bonus-${i}`} className={styles.repBarBonus} />
            ))}
          </div>
        </div>

        <div className={styles.timer}>
          {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(time % 60).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default TVWorkout;

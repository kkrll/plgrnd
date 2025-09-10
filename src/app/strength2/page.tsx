"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const StrengthScore = () => {
  const [score] = useState(578);

  return (
    <div className={styles.container}>
      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={styles.time}>9:41</div>
        <div className={styles.dynamicIsland}></div>
        <div className={styles.statusIcons}>
          <div className={styles.signal}></div>
          <div className={styles.wifi}></div>
          <div className={styles.battery}></div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Back Button */}
        <button className={styles.backButton}>
          <span>􀆉</span>
        </button>

        {/* Score Section */}
        <div className={styles.scoreSection}>
          <div className={styles.dumbbell}>
            <img src="/dumbbell.png" alt="Dumbbell" />
          </div>

          <div className={styles.scoreDisplay}>
            <div className={styles.scoreValue}>
              <span>{score}</span>
              <span className={styles.unit}>pts</span>
            </div>
            <div className={styles.scoreChange}>↓10</div>
          </div>

          {/* League Chart */}
          <div className={styles.leagueChart}>
            <div className={styles.league}>
              <div className={styles.leagueTitle}>
                <span>􁃘</span>
                <span>LEAGUE OF LOW</span>
              </div>
              <div className={styles.leagueBar}>
                <div className={styles.barFill} style={{ width: "40%" }}></div>
              </div>
              <div className={styles.leagueScore}>417</div>
            </div>

            <div className={styles.league}>
              <div className={styles.leagueTitle}>
                <span>􁃘</span>
                <span>LEAGUE OF AVERAGE</span>
              </div>
              <div className={styles.leagueBar}>
                <div className={styles.barFill} style={{ width: "60%" }}></div>
              </div>
              <div className={styles.leagueScore}>482</div>
            </div>

            <div className={styles.league}>
              <div className={styles.leagueTitle}>
                <span>􁃘</span>
                <span>LEAGUE OF FIT</span>
              </div>
              <div className={styles.leagueBar}>
                <div className={styles.barFill} style={{ width: "80%" }}></div>
              </div>
              <div className={styles.leagueScore}>550</div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className={styles.textContent}>
          <h1>
            Strength Score
            <br />
            Updated
          </h1>
          <h2>Get 25 points to reach new level</h2>
          <p>
            Follow your plan, level up all muscles in your body and increase
            your strength score!
          </p>
        </div>

        {/* Bottom Button */}
        <button className={styles.gotItButton}>Got It</button>
      </div>
    </div>
  );
};

export default StrengthScore;

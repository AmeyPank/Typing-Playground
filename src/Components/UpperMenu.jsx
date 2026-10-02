import React from "react";
import { useTestMode } from "../Context/TestModeContext";
import { IconButton, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "../Context/ThemeContext";
import {
  TEST_MODES,
  TIME_OPTIONS,
  WORD_OPTIONS,
} from "../constants/appConstants";

const UpperMenu = ({ countDown, currWordIndex }) => {
  const {
    testTime,
    setTestTime,
    testMode,
    setTestMode,
    testWords,
    setTestWords,
  } = useTestMode();
  const { theme } = useTheme();

  const tooltipStyle = {
    backgroundColor: theme.background,
    color: "#fff",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "8px 12px",
  };

  const tooltipTitleStyle = {
    color: "white",
    fontSize: "16px",
  };

  const updateTime = (time) => {
    setTestTime(time);
  };

  const updateWord = (words) => {
    setTestWords(words);
  };

  const updateMode = (mode) => {
    setTestMode(mode);
  };

  return (
    <div className="upper-menu">
      {testMode === TEST_MODES.TIME ? (
        <div className="counter">{countDown}s</div>
      ) : (
        <div className="counter">
          {currWordIndex}/{testWords}
        </div>
      )}

      <div className="modes">
        <Tooltip
          title={<span style={tooltipTitleStyle}>English</span>}
          placement="top"
          enterDelay={500}
          arrow
          classes={{
            tooltip: "custom-tooltip",
          }}
          style={tooltipStyle}
        >
          <IconButton
            style={{ backgroundColor: theme.background }}
            color="inherit"
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <span>Mode - </span>
        <span
          className={testMode === TEST_MODES.TIME ? "active mode" : "mode"}
          onClick={() => updateMode(TEST_MODES.TIME)}
        >
          Time
        </span>
        <span
          className={testMode === TEST_MODES.WORD ? "active mode" : "mode"}
          onClick={() => updateMode(TEST_MODES.WORD)}
        >
          Word
        </span>
      </div>

      {testMode === TEST_MODES.TIME ? (
        <div className="time-modes">
          {TIME_OPTIONS.map((timeOption) => (
            <div
              key={timeOption}
              className={
                Number(testTime) === timeOption ? "active-value time" : "time"
              }
              onClick={() => updateTime(timeOption)}
            >
              {timeOption}s
            </div>
          ))}
        </div>
      ) : (
        <div className="word-modes">
          {WORD_OPTIONS.map((wordOption) => (
            <div
              key={wordOption}
              className={
                Number(testWords) === wordOption
                  ? "active-value no-of-word"
                  : "no-of-word"
              }
              onClick={() => updateWord(wordOption)}
            >
              {wordOption}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpperMenu;

import React, { createContext, useContext, useState } from "react";
import {
  DEFAULT_TIME_IN_SECONDS,
  DEFAULT_WORD_COUNT_FOR_WORD_MODE,
  TEST_MODES,
} from "../constants/appConstants";

const TestModeContext = createContext();

export const TestModeContextProvider = ({ children }) => {
  const [testTime, setTestTimeState] = useState(DEFAULT_TIME_IN_SECONDS);
  const [testMode, setTestMode] = useState(TEST_MODES.TIME);
  const [testWords, setTestWordsState] = useState(DEFAULT_WORD_COUNT_FOR_WORD_MODE);

  const setTestTime = (time) => {
    setTestTimeState(Number(time) || DEFAULT_TIME_IN_SECONDS);
  };

  const setTestWords = (words) => {
    setTestWordsState(Number(words) || DEFAULT_WORD_COUNT_FOR_WORD_MODE);
  };

  const values = {
    testTime,
    setTestTime,
    testMode,
    setTestMode,
    testWords,
    setTestWords,
  };

  return (
    <TestModeContext.Provider value={values}>
      {children}
    </TestModeContext.Provider>
  );
};

export const useTestMode = () => useContext(TestModeContext);

import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import { generate as randomWords } from "random-words";
import Stats from "./Stats";
import { Button, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";
import { useTheme } from "../Context/ThemeContext";
import LanguageIcon from "@mui/icons-material/Language";

const TypingBox = () => {
  const inputRef = useRef(null);
  const { theme } = useTheme();

  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntervalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctCharacter, setCorrectCharacter] = useState(0);

  // --------------------> WPM states --------------------

  const [inCorrectCharacter, setInCorrectCharacter] = useState(0);
  const [missedCharacter, setMissedCharacter] = useState(0);
  const [extraCharacter, setExtraCharacter] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  // --------------------> WPM function --------------------

  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(50);
  });

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]); //Graph data for state

  // Define tooltipStyle constant
  const tooltipStyle = {
    backgroundColor: theme.background,
    color: "#fff",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "8px 12px",
  };

  // Define tooltipTitleStyle constant
  const tooltipTitleStyle = {
    color: "white", // Set the desired text color
    fontSize: "16px", // Set the desired font size
  };
  // -------------------->Start Timer --------------------
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);

    setIntervalId(intervalId);

    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectCharacter((correctCharacter) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latestCountDown + 1,
                correctCharacter / 5 / ((testTime - latestCountDown + 1) / 60),
              ],
            ];
          });
          return correctCharacter;
        });

        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(randomWords(60));
    resetWordSpanRefClassName();
    focusInput();
  };

  const backToTest = () => {
    try {
      resetTest();
    } catch (error) {
      // Handle the error here
      console.error("An error occurred during backToTest:", error);
    }
  };

  // --------------------> WordsSpanRef Memo for getting words array --------------------
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const resetWordSpanRefClassName = () => {
    wordsSpanRef.forEach((ref) => {
      Array.from(ref.current.childNodes)?.forEach((node) => {
        node.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  // -------------------->Handle the user input keyboard input --------------------

  const handleUserInput = (e) => {
    try {
      if (!testStart) {
        startTimer();
        setTestStart(true);
      }

      if (wordsSpanRef[currWordIndex].current) {
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
        const blockedKeys = [
          "Control",
          "Fn",
          "Shift",
          "CapsLock",
          "Tab",
          "Alt",
        ];

        if (blockedKeys.includes(e.key)) {
          return toast.warning("Invalid Key"); // Ignore the blocked keys
        }

        // --------------------> Logic for spaces --------------------

        if (e.keyCode === 32) {
          let correctCharsInWords =
            wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
          if (correctCharsInWords.length === allCurrChars.length) {
            setCorrectWords(correctWords + 1);
          }

          if (allCurrChars.length <= currCharIndex) {
            // --------------------> remove cursor from last place in a word --------------------

            allCurrChars[currCharIndex - 1].classList.remove("current-right");
          } else {
            // --------------------> remove cursor from in between of the word --------------------
            setMissedCharacter(
              missedCharacter + (allCurrChars.length - currCharIndex)
            );

            for (let i = currCharIndex; i < allCurrChars.length; i++) {
              allCurrChars[i].className += " skipped";
            }

            allCurrChars[currCharIndex].classList.remove("current");
          }
          // place cursor to beginning
          wordsSpanRef[currWordIndex + 1].current.childNodes[0].className +=
            "current";
          setCurrWordIndex(currWordIndex + 1);
          setCurrCharIndex(0);
          return;
        }
        if (e.keyCode === 8) {
          // --------------------> Logic for backspace handling --------------------

          if (currCharIndex !== 0) {
            if (allCurrChars.length === currCharIndex) {
              if (
                allCurrChars[currCharIndex - 1] &&
                allCurrChars[currCharIndex - 1].className.includes("extra")
              ) {
                allCurrChars[currCharIndex - 1].remove();

                allCurrChars[currCharIndex - 2].className += " current-right";
              }

              if (allCurrChars[currCharIndex - 1]) {
                allCurrChars[currCharIndex - 1].className = "current";
              }
              setCurrCharIndex(currCharIndex - 1);

              return;
            }

            allCurrChars[currCharIndex].className = "";
            allCurrChars[currCharIndex - 1].className = "current";
            setCurrCharIndex(currCharIndex - 1);
          }

          return;
        }

        if (currCharIndex === allCurrChars.length) {
          let newSpan = document.createElement("span");
          newSpan.innerText = e.key;
          newSpan.className = "incorrect extra current-right";
          allCurrChars[currCharIndex - 1].classList.remove("current-right");
          wordsSpanRef[currWordIndex].current.append(newSpan);
          setCurrCharIndex(currCharIndex + 1);
          setExtraCharacter(extraCharacter + 1);
          return;
        }

        if (e.key === allCurrChars[currCharIndex].innerText) {
          allCurrChars[currCharIndex].className = "correct";
          setCorrectCharacter(correctCharacter + 1);
        } else {
          allCurrChars[currCharIndex].className = "incorrect";
          setInCorrectCharacter(inCorrectCharacter + 1);
        }

        if (currCharIndex + 1 === allCurrChars.length) {
          allCurrChars[currCharIndex].className += " current-right";
        } else {
          allCurrChars[currCharIndex + 1].className += "current";
        }
        setCurrCharIndex(currCharIndex + 1);
      }
    } catch (error) {
      // Handle the error here
      console.error("An error occurred during handleUserInput");
    }
  };

  // --------------------> WPM function --------------------

  const calculateWPM = () => {
    return Math.round(correctCharacter / 5 / (testTime / 60));
  };

  // --------------------> CorrectAccuracy function --------------------

  const correctAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };
  // --------------------> focusInput function --------------------

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    // Update the state to set the initial class name
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setWordsArray(randomWords(60));
  }, []);

  // Add a new useEffect to set the initial class name when wordsSpanRef is updated
  useEffect(() => {
    if (wordsSpanRef[0] && wordsSpanRef[0].current) {
      const firstChild = wordsSpanRef[0].current.childNodes[0];
      if (firstChild) {
        firstChild.className = "current";
      }
    }
  }, [wordsSpanRef]);

  return (
    <div>
      {testEnd ? (
        " "
      ) : (
        <div>
          <Tooltip
            title={<span style={tooltipTitleStyle}>English</span>} // Apply styles to the title
            placement="top"
            enterDelay={500}
            arrow
            classes={{
              tooltip: "custom-tooltip", // Add a custom class for additional styling
            }}
            style={tooltipStyle}
          >
            {/* IconButton */}
            <IconButton color="inherit">
              <LanguageIcon />
            </IconButton>
          </Tooltip>
          <UpperMenu countDown={countDown} s />
        </div>
      )}
      {testEnd ? (
        <div>
          <div>
            <Button onClick={backToTest}>Repeat test</Button>
          </div>
          <Stats
            wpm={calculateWPM()}
            accuracy={correctAccuracy()}
            correctCharacter={correctCharacter}
            inCorectCharacter={inCorrectCharacter}
            missedCharacter={missedCharacter}
            extraCharacter={extraCharacter}
            graphData={graphData}
            resetTest={resetTest}
          />
        </div>
      ) : (
        <div className="box">
          <div className="type-box" onClick={focusInput}>
            <div className="words">
              {wordsArray.map((word, index) => (
                <span className="word" key={index} ref={wordsSpanRef[index]}>
                  {word.split("").map((char, charIndex) => (
                    <span key={charIndex}>{char}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Tooltip
              title={<span style={tooltipTitleStyle}>Reset</span>}
              placement="bottom"
              enterDelay={500}
              arrow
              classes={{
                tooltip: "custom-tooltip", // Add a custom class for additional styling
              }}
              style={tooltipStyle}
            >
              <IconButton onClick={resetTest} color="inherit">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;

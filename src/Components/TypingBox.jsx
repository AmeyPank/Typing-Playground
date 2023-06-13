import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import { generate as randomWords } from "random-words";
import Stats from "./Stats";

const TypingBox = () => {
  const inputRef = useRef(null);
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
    return randomWords(60);
  });

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]); //Graph data for state

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

  // --------------------> WordsSpanRef Memo for getting words array --------------------
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const resetWordSpanRefClassName = () => {
    wordsSpanRef.map((ref) => {
      Array.from(ref.current.childNodes).map((node) => {
        node.className = "";
       return;
      });
      wordsSpanRef[0].current.childNodes[0].className = "current";
       return;
    });
  };

  // -------------------->Handle the user input keyboard input --------------------

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    // -------------------->Logic for spaces --------------------

    if (e.keyCode === 32) {
      let correctCharsInWords =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
      if (correctCharsInWords.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        // -------------------->remove cursor from last place in a word --------------------

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
      //place cursor to beginning
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
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div className="middle-div">
      <UpperMenu countDown={countDown} />
      {testEnd ? (
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
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {
            wordsArray.map((word, index) => (
              <span className="word" key={index} ref={wordsSpanRef[index]}>
                {
                word.split("").map((char, charIndex) => (
                  <span key={charIndex}>{char}</span>
                ))
                }
              </span>
            ))
            }
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

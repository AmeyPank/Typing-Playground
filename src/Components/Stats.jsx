import React, { useEffect, useMemo, useRef } from "react";
import Graph from "./Graph";
import { auth } from "../firebaseConfig";
import { ResultService } from "../services/resultService";
import { CreateResultDto } from "../dtos/CreateResultDto";
import { ResultMapper } from "../mappers/ResultMapper";
import { toast } from "react-toastify";

const Stats = ({
  wpm,
  accuracy,
  correctCharacter,
  inCorrectCharacter,
  missedCharacter,
  extraCharacter,
  graphData = [],
}) => {
  const hasSavedRef = useRef(false);

  const cleanGraphData = useMemo(() => {
    return ResultMapper.toLiveChartCoordinates(graphData);
  }, [graphData]);

  useEffect(() => {
    if (hasSavedRef.current) return;

    const currentUser = auth.currentUser;
    if (currentUser) {
      if (isNaN(accuracy) || isNaN(wpm)) {
        toast.warning("Invalid test result, not saved.");
        return;
      }

      hasSavedRef.current = true;
      const resultDto = new CreateResultDto({
        wpm,
        accuracy,
        correctCharacter,
        inCorrectCharacter,
        missedCharacter,
        extraCharacter,
        userId: currentUser.uid,
      });

      ResultService.saveResult(resultDto)
        .then(() => {
          toast.success("Data Saved To The Database", { theme: "colored" });
        })
        .catch((err) => {
          console.error("Save result error:", err);
          toast.error(err.message || "Some error occurred", {
            theme: "colored",
          });
        });
    } else {
      toast.warning("Login to save results", {
        theme: "colored",
      });
    }
  }, [wpm, accuracy, correctCharacter, inCorrectCharacter, missedCharacter, extraCharacter]);

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctCharacter} : {inCorrectCharacter} : {missedCharacter} :{" "}
          {extraCharacter}
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={cleanGraphData} type="time" />
      </div>
    </div>
  );
};

export default Stats;

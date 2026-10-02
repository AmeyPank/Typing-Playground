import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UserDataTable from "../Components/UserDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ResultService } from "../services/resultService";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/");
      return;
    }

    let isMounted = true;
    setDataLoading(true);

    ResultService.getUserResults(user.uid)
      .then(({ results, graphData: historicalGraphData }) => {
        if (isMounted) {
          setData(results);
          setGraphData(historicalGraphData);
          setDataLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to load user results:", error);
        if (isMounted) {
          setDataLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user, loading, navigate]);

  if (loading || dataLoading) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="canvas">
      <Header />
      <div>
        <UserInfo totalTestsTaken={data.length} />
        {data.length !== 0 ? (
          <div className="graph">
            <Graph graphData={graphData} type="date" />
          </div>
        ) : (
          <p>No data found</p>
        )}
        {data.length !== 0 && <UserDataTable data={data} />}
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;

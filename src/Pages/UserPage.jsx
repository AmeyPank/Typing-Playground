import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UserDataTable from "../Components/UserDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataloading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultsRef = db.collection("results");
    const { uid } = auth.currentUser;

    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.docs.forEach((doc) => {
          // ==========================================console.log(doc.data()); // to get the data from the snapshot
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataloading(false);
        console.log(data);
      });
  };

  // Added theloading function for solving the error Cannot destructure property 'uid' of
  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

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
      <UserInfo totalTestsTaken={data.length} />
      <div className="graph">
        <Graph graphData={graphData} type="date" />
      </div>
      <UserDataTable data={data} />
    </div>
  );
};

export default UserPage;

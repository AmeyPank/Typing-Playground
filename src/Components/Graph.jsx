import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "../Context/ThemeContext";
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale);

function Graph({ graphData }) {
  const { theme } = useTheme();

  // Get the recent 20 days of data
  const recentData = graphData.slice(-20);

  // Get the start and end date
  const startDate = graphData[0][0];
  const endDate = graphData[graphData.length - 1][0];

  return (
    <>
      {/* Recent 20 days graph */}
      <div>
        <h2>Recent 20 Days</h2>
        <Line
          data={{
            labels: recentData.map((i) => i[0]),
            datasets: [
              {
                type: "line",
                data: recentData.map((i) => i[1]),
                label: "wpm",
                borderColor: theme.title,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Time in Seconds",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Words per minute",
                },
              },
            },
          }}
        />
      </div>

      {/* All data graph with start and end dates */}
      <div>
        <h2>
          All Data (Start: {startDate}, End: {endDate})
        </h2>
        <Line
          data={{
            labels: graphData.map((i) => i[0]),
            datasets: [
              {
                type: "line",
                data: graphData.map((i) => i[1]),
                label: "wpm",
                borderColor: theme.title,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Time in Seconds",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Words per minute",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default Graph;

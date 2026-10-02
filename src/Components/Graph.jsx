import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../Context/ThemeContext";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ graphData = [], type = "time" }) {
  const { theme } = useTheme();

  const labels = graphData.map((i) => i[0]);
  const dataPoints = graphData.map((i) => i[1]);
  const xAxisTitle = type === "date" ? "Date" : "Time in Seconds";

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
      <Line
        data={{
          labels,
          datasets: [
            {
              type: "line",
              data: dataPoints,
              label: "WPM",
              borderColor: theme.title,
              backgroundColor: theme.title,
              tension: 0.3,
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: theme.title,
              },
            },
          },
          scales: {
            x: {
              display: true,
              ticks: { color: theme.typeBoxText },
              grid: { color: "rgba(128, 128, 128, 0.15)" },
              title: {
                display: true,
                text: xAxisTitle,
                color: theme.title,
              },
            },
            y: {
              display: true,
              ticks: { color: theme.typeBoxText },
              grid: { color: "rgba(128, 128, 128, 0.15)" },
              title: {
                display: true,
                text: "Words per minute",
                color: theme.title,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Graph;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import { formatDateSafe } from "../Utils/dateUtils";

const UserDataTable = ({ data = [] }) => {
  const { theme } = useTheme();
  const cellStyle = {
    color: theme.title,
    textAlign: "center",
    borderColor: "rgba(128, 128, 128, 0.2)",
  };

  const [visibleRows, setVisibleRows] = useState(20);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 20);
  };

  return (
    <div className="table" style={{ marginTop: "2rem" }}>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          border: `1px solid rgba(128, 128, 128, 0.2)`,
          borderRadius: "8px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...cellStyle, fontWeight: "bold" }}>
                WPM
              </TableCell>
              <TableCell style={{ ...cellStyle, fontWeight: "bold" }}>
                Accuracy
              </TableCell>
              <TableCell style={{ ...cellStyle, fontWeight: "bold" }}>
                Characters
              </TableCell>
              <TableCell style={{ ...cellStyle, fontWeight: "bold" }}>
                Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, visibleRows).map((rowData, index) => {
              const displayDate =
                rowData.formattedDateTime ||
                formatDateSafe(rowData.timeStamp, true);

              return (
                <TableRow key={rowData.id || index}>
                  <TableCell style={cellStyle}>{rowData.wpm}</TableCell>
                  <TableCell style={cellStyle}>{rowData.accuracy}</TableCell>
                  <TableCell style={cellStyle}>{rowData.characters}</TableCell>
                  <TableCell style={cellStyle}>{displayDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {visibleRows < data.length && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            onClick={handleShowMore}
            variant="contained"
            style={{
              backgroundColor: theme.typeBoxText,
              color: theme.title,
            }}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDataTable;

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTheme } from "../Context/ThemeContext";

const UserDataTable = ({ data }) => {
  const { theme } = useTheme();
  const cellStyle = { color: theme.title, textAlign: "center" };
  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow>
                <TableCell style={cellStyle}>{data.wpm}</TableCell>
                <TableCell style={cellStyle}>{data.accuracy}</TableCell>
                <TableCell style={cellStyle}>{data.characters}</TableCell>
                <TableCell style={cellStyle}>
                  {data.timeStamp.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserDataTable;

import React from "react";

import { Button, TableCell, TableRow, Tooltip } from "@mui/material";

const LCADataTable = ({ rowName, value, coefficinet, file, unit, sum }) => {
  const downloadPDF = (data, filename) => {
    const linkSource = data;
    const downloadLink = document.createElement("a");
    let fileName = filename;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <TableRow>
      <TableCell>{rowName}</TableCell>
      <TableCell>{value} {unit}</TableCell>
      <TableCell>{coefficinet}</TableCell>
      {sum ? <TableCell>{sum.toFixed(2)}</TableCell> : <TableCell></TableCell>}
      {file? <TableCell><Tooltip title="Click to download"><Button variant="outlined" size="small" onClick={() => downloadPDF(file.data, file.name)}>{file.name}</Button></Tooltip></TableCell> : <TableCell>No file</TableCell>}
    </TableRow>
  );
};

export default LCADataTable;

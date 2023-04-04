import React from "react";

import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const LCADataTable = ({ rowName, value, coefficinet, description, file, unit, sum }) => {
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
      <TableCell style={{ width: "120px" }}>{rowName}</TableCell>
      <TableCell>{value} {unit}</TableCell>
      <TableCell colSpan={2}>{coefficinet ? coefficinet : description}</TableCell>
      {sum ? <TableCell align='right' style={{ width: "150px" }}>{sum.toFixed(2)}</TableCell> : <TableCell></TableCell>}
      {file ? <TableCell style={{ width: "120px" }}><Tooltip title={`Click to download ${file.name}`}><Button variant="outlined" size="small" endIcon={<DownloadIcon />} onClick={() => downloadPDF(file.data, file.name)}>{file.name.length > 13 ? `${file.name.split("").splice(0, 10).join("")}...` : file.name}</Button></Tooltip></TableCell> : <TableCell style={{ width: "120px" }}></TableCell>}
    </TableRow>
  );
};

export default LCADataTable;

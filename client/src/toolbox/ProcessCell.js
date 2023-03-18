import React from 'react'

import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const ProcessCell = ({ time, electricity, coefVal, coefDes, file, sum, header }) => {
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
            <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>{header}</TableCell>
            <TableCell >{time}</TableCell>
            <TableCell >{electricity}</TableCell>
            <TableCell >{coefVal}</TableCell>
            <TableCell >{coefDes}</TableCell>
            {sum ? <TableCell>{sum.toFixed(2)}</TableCell> : <TableCell></TableCell>}
            {file ? <TableCell><Tooltip title="Click to download"><Button variant="outlined" size="small" endIcon={<DownloadIcon />} onClick={() => downloadPDF(file.data, file.name)}>{file.name.length > 27 ? `${file.name.split("").splice(0, 24).join("")}...` : file.name}</Button></Tooltip></TableCell> : <TableCell>No file</TableCell>}
        </TableRow>
    )
}

export default ProcessCell
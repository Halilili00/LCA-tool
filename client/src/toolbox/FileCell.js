import React from 'react'

import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const FileCell = ({ file, rowSpan, colSpan}) => {
    const downloadPDF = (data, filename) => {
        const linkSource = data;
        const downloadLink = document.createElement("a");
        let fileName = filename;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    return (
        <>
            {file ? <TableCell colSpan={colSpan} rowSpan={rowSpan}><Tooltip title="Click to download"><Button variant="outlined" size="small" endIcon={<DownloadIcon />} onClick={() => downloadPDF(file.data, file.name)}>{file.name.length > 27 ? `${file.name.split("").splice(0, 24).join("")}...` : file.name}</Button></Tooltip></TableCell> : <TableCell rowSpan={rowSpan} colSpan={colSpan}>No file</TableCell>}
        </>
    )
}

export default FileCell
import React from 'react'

import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const CustomTableCell = ({ rowName, rowSpan, colSpan,afterRowSpan, value, coefficinet, coefficinet2, description, file, unit, sum }) => {
    const downloadPDF = (data, filename) => {
        const linkSource = data;
        const downloadLink = document.createElement("a");
        let fileName = filename;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const lastCell = () => {
        if (file && description) {
            console.log(rowName + ": eka")
            return (<TableCell rowSpan={rowSpan} style={{ minWidth: "120px" }}><Tooltip title={`Click to download ${file.name}`}><Button variant="outlined" size="small" endIcon={<DownloadIcon />} onClick={() => downloadPDF(file.data, file.name)}>{file.name.length > 13 ? `${file.name.split("").splice(0, 10).join("")}...` : file.name}</Button></Tooltip><br />{description}</TableCell>)
        } else if (file) {
            console.log(rowName + ": toka")
            return (<TableCell rowSpan={rowSpan} style={{ minWidth: "120px" }}><Tooltip title={`Click to download ${file.name}`}><Button variant="outlined" size="small" endIcon={<DownloadIcon />} onClick={() => downloadPDF(file.data, file.name)}>{file.name.length > 13 ? `${file.name.split("").splice(0, 10).join("")}...` : file.name}</Button></Tooltip></TableCell>)
        } else if (description) {
            console.log(rowName + ": kolmas")
            return (<TableCell rowSpan={rowSpan} style={{ minWidth: "120px" }}>{description}</TableCell>)
        } else if(!afterRowSpan){
            return (<TableCell rowSpan={rowSpan} style={{ minWidth: "120px" }}></TableCell>)
        }
    }

    //console.log(rowName + ": " + sum)

    return (
        <TableRow>
            <TableCell style={{ minWidth: "120px", position: "sticky", left: 0, backgroundColor: "white" }}>{rowName}</TableCell>
            <TableCell align="right" style={{ minWidth: "100px" }}>{value} {unit}</TableCell>
            {coefficinet >= 0 && <TableCell align='right' style={{ minWidth:"120px"}}>{coefficinet}</TableCell>}
            {coefficinet2 >= 0 && <TableCell  align='right' style={{ minWidth:"100px"}}>{coefficinet2}</TableCell>}
            {sum>=0 ? <TableCell align='right' style={{ minWidth: "226px" }}>{sum.toFixed(2)}</TableCell> : <TableCell align='right' style={{ minWidth: "226px" }} colSpan={colSpan}></TableCell>}
            {lastCell()}
        </TableRow >
    )
}

export default CustomTableCell
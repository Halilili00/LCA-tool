import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import FileCell from './FileCell'

const ValueDescriptionCell = ({header, value, coefficinet, description, sum, file}) => {
    return (
        <>
            <TableRow>
                <TableCell rowSpan="2" style={{ fontSize: "1rem", fontWeight: "600", position: "sticky", left: 0, backgroundColor: "white" }}>{header}</TableCell>
                <TableCell >Value: {value} kg</TableCell>
                <TableCell colSpan={3}></TableCell>
                {sum ? <TableCell rowSpan={2}>{sum.toFixed(2)}</TableCell> : <TableCell rowSpan={2}></TableCell>}
                <FileCell rowSpan={2} file={file} />
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>EF: {coefficinet} kg CO2 eq/t-km</TableCell>
                <TableCell colSpan={2} style={{ width: "260px" }}>{description}</TableCell>
            </TableRow>
        </>
    )
}

export default ValueDescriptionCell
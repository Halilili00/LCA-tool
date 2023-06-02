import React from 'react'

import { TableCell, TableRow,} from "@mui/material";

const ProcessCell = ({ time, electricity, coefVal, coefDes, file, sum, header }) => {
    return (
        <TableRow>
            <TableCell style={{ fontSize: "1rem", fontWeight: "600",position: "sticky", left: 0, backgroundColor: "white" }}>{header}</TableCell>
            <TableCell colSpan={2}>{time}</TableCell>
            <TableCell colSpan={2}>{electricity}</TableCell>
            {sum ? <TableCell colSpan={2}>{sum.toFixed(2)}</TableCell> : <TableCell colSpan={2}></TableCell>}
        </TableRow>
    )
}

export default ProcessCell
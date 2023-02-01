import React, { useMemo, useState } from 'react'
import { ButtonGroup, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Filter from '../toolbox/Filter';
import { useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions/postActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const DataTable = ({ findPosts }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState({ value: 0, comparator: ">="});

    const comparisonOperatorsHash = (comparator, a, b) => {
        switch (comparator) {
            case '<':
                return a < b
            case '>':
                return a > b
            case '<=':
                return a <= b
            case '>=':
                return a >= b
            case '=':
                return a === b
            default:
                break;
        }
    };

    const filteredPosts = useMemo(() => {
        if (!findPosts.length) return []
        return findPosts.filter(post => {
            if (typeof filterValue.value === "number" && filterValue.value > 0) {
                return comparisonOperatorsHash(filterValue.comparator, (post.steelRemoved.value * post.steelRemoved.coefficinet + (post.steel.value - post.steelRemoved.value) * post.partWeight.coefficinet + post.energyConsumption.value * post.machiningTime.value * post.machiningTime.coefficinet + (post.machiningLiquidConsumption.value / post.annualProduction.value) * post.machiningLiquidConsumption.coefficinet
                    + (post.hydraulicOilConsumption.value / post.annualProduction.value) * post.hydraulicOilConsumption.coefficinet + post.packagingPlastic.value * post.packagingPlastic.coefficinet + (post.oil.value / post.annualProduction.value) * post.oil.coefficinet + (post.electrycity.value / post.annualProduction.value) * post.electrycity.coefficinet
                    + ((40 / 100) * post.euro5?.value * post.euro5?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro6?.value * post.euro6?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro7?.value * post.euro7?.coefficinet * (post.steel.value / 2000)) + ((4000 / 100) * post.roro?.value * post.roro?.coefficinet * (post.steel.value / 2000000))).toFixed(2), filterValue.value)
            } else {
                return post
            }
        })
    }, [filterValue, findPosts])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    console.log(filteredPosts)
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>LCAID</StyledTableCell>
                        <StyledTableCell>Part name</StyledTableCell>
                        <StyledTableCell>PartID</StyledTableCell>
                        <StyledTableCell>Data collected by</StyledTableCell>
                        <StyledTableCell>Valid date</StyledTableCell>
                        <StyledTableCell>Name of production site</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>GHG emissions(CO2 eqv GHG kg)</StyledTableCell>
                        <StyledTableCell align='right'><Filter filterValue={filterValue} setFilterValue={setFilterValue} /></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredPosts)
                        .map(post => (
                            <StyledTableRow key={post._id}>
                                <StyledTableCell onClick={() => navigate(`/LCADatas/${post._id}`)}>{post.lcaID}</StyledTableCell>
                                <StyledTableCell>{post.partName}</StyledTableCell>
                                <StyledTableCell>{post.partID}</StyledTableCell>
                                <StyledTableCell>{post.creator}</StyledTableCell>
                                <StyledTableCell>{(post.validDate?.start && post.validDate.start !== null) && moment(post.validDate.start).format("DD/MM/YYYY")} - {(post.validDate?.end && post.validDate.end !== null) && moment(post.validDate.end).format("DD/MM/YYYY")}</StyledTableCell>
                                <StyledTableCell>{post.productionSite?.factoryName}</StyledTableCell>
                                <StyledTableCell>{post.productionSite?.address}</StyledTableCell>
                                <StyledTableCell>{(post.steelRemoved.value * post.steelRemoved.coefficinet + (post.steel.value - post.steelRemoved.value) * post.partWeight.coefficinet + post.energyConsumption.value * post.machiningTime.value * post.machiningTime.coefficinet + (post.machiningLiquidConsumption.value / post.annualProduction.value) * post.machiningLiquidConsumption.coefficinet
                                    + (post.hydraulicOilConsumption.value / post.annualProduction.value) * post.hydraulicOilConsumption.coefficinet + post.packagingPlastic.value * post.packagingPlastic.coefficinet + (post.oil.value / post.annualProduction.value) * post.oil.coefficinet + (post.electrycity.value / post.annualProduction.value) * post.electrycity.coefficinet
                                    + ((40 / 100) * post.euro5?.value * post.euro5?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro6?.value * post.euro6?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro7?.value * post.euro7?.coefficinet * (post.steel.value / 2000)) + ((4000 / 100) * post.roro?.value * post.roro?.coefficinet * (post.steel.value / 2000000))).toFixed(2)}</StyledTableCell>
                                <StyledTableCell>
                                    <ButtonGroup >
                                        <Tooltip title="Update">
                                            <IconButton color='inherit' onClick={() => navigate(`/Forms/${post._id}`)}><EditRoundedIcon /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Detele">
                                            <IconButton color='inherit' onClick={() => dispatch(deletePost(post._id))}><RemoveCircleRoundedIcon /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Go details">
                                            <IconButton color='inherit' onClick={() => navigate(`/LCADatas/${post._id}`)}><MoreHorizOutlinedIcon /></IconButton>
                                        </Tooltip>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={filteredPosts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table >
        </TableContainer >
    )
}

export default DataTable
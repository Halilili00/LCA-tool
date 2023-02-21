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
import { useDialogAlert } from '../hooks/useDialogAlert';
import useCalculateSum from '../hooks/useCalculateSum';

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
    const [filterValue, setFilterValue] = useState({ value: 0, comparator: ">=" });
    const { handleOpenDialog } = useDialogAlert();
    const [orderDirection, setOrderDirection] = useState("asc");
    const { calculateSum } = useCalculateSum();

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

    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    calculateSum(a) - calculateSum(b)
                );
            case "desc":
                return arr.sort((a, b) =>
                    calculateSum(b) - calculateSum(a)
                );
        }
    };

    const handleSortRequest = () => {
        sortArray(findPosts, orderDirection);
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };

    const filteredPosts = useMemo(() => {
        if (!findPosts.length) return []
        return findPosts.filter(post => {
            if (typeof filterValue.value === "number" && filterValue.value > 0) {
                return comparisonOperatorsHash(filterValue.comparator, calculateSum(post), filterValue.value)
            } else {
                return post
            }
        })
    }, [filterValue, findPosts, orderDirection])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeletePost = (id) => {
        handleOpenDialog({
            title: "You want to delte data?",
            succes: "Data is deleted",
            buttons: [
                { lable: "Delte data", onConfirm: () => { dispatch(deletePost(id)) } },
            ]
        })
    }

    console.log(filteredPosts)
    console.log(calculateSum(filteredPosts[0]))
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>LCAID</StyledTableCell>
                        <StyledTableCell>Part name</StyledTableCell>
                        <StyledTableCell>PartID</StyledTableCell>
                        <StyledTableCell>Data collected by</StyledTableCell>
                        <StyledTableCell>Valid date</StyledTableCell>
                        <StyledTableCell>Name of production site</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell onClick={handleSortRequest} sortDirection={orderDirection}>
                            <TableSortLabel
                                sx={{ '&.MuiTableSortLabel-root': { color: 'white' }, '& .MuiTableSortLabel-icon': { color: 'white !important', } }}
                                direction={orderDirection}
                            >
                                GHG emissions(CO2 eqv GHG kg)
                            </TableSortLabel>
                        </StyledTableCell>
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
                                <StyledTableCell align='right'>{calculateSum(post)}</StyledTableCell>
                                <StyledTableCell>
                                    <ButtonGroup >
                                        <Tooltip title="Update">
                                            <IconButton color='inherit' onClick={() => navigate(`/Forms/${post._id}`)}><EditRoundedIcon /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Detele">
                                            <IconButton color='inherit' onClick={() => handleDeletePost(post._id)}><RemoveCircleRoundedIcon /></IconButton>
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
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table >
        </TableContainer >
    )
}

export default DataTable
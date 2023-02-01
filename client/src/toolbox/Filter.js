import React, { memo, useState } from 'react'
import { Badge, Button, IconButton, Menu, MenuItem, NativeSelect, TextField, Tooltip } from '@mui/material'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';

const Filter = ({ filterValue, setFilterValue }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const columns = [{ lableName: "GHG emissions", type: "Number" }, { lableName: "Valid date", type: "Date" }]
    const comparators = [">=", "<=", ">", "<", "="]
    const [inputValue, setInputValue] = useState(columns[0].lableName);
    const [isFilterOnline, setIsFilterOnline] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handelColumnsOption = (e) => {
        setInputValue(e.target.value)
    }

    const handelComparisatorOption = (e) => {
        setFilterValue({ ...filterValue, comparator: e.target.value })
    }

    const handleChange = (e) => {
        let { value, type } = e.target;
        console.log(value)
        console.log(type)
        if (value) {
            setIsFilterOnline(false)
        } else {
            setIsFilterOnline(true)
        }
        if (type === "number") {
            return setFilterValue({ ...filterValue, value: parseFloat(value, 10) })
        } else if (type === "Date") {
            return setFilterValue({ ...filterValue, value: value })
        }
    }

    const resetFilter = () => {
        setIsFilterOnline(true)
        setFilterValue({ value: 0, comparator: ">=" })
    }

    console.log(filterValue)

    return (
        <>
            <Tooltip title="Filter">
                <IconButton color='inherit' onClick={handleClick}>
                    <Badge color="success" variant="dot" invisible={isFilterOnline}><FilterListTwoToneIcon /></Badge>
                </IconButton>
            </Tooltip>
            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <MenuItem >
                    {/*<NativeSelect onChange={handelColumnsOption}>
                        {columns.map((c, index) => (
                            <option key={index}>{c.lableName}</option>
                        ))}
                    </NativeSelect>
                    */}
                    <NativeSelect onChange={handelColumnsOption}>
                        <option >{columns[0].lableName}</option>
                    </NativeSelect>
                    <NativeSelect onChange={handelComparisatorOption} style={{ margin: "0 10px 0 10px" }}>
                        {comparators.map((comp, index) => (
                            <option key={index}>{comp}</option>
                        ))}
                    </NativeSelect>
                    <TextField label={inputValue} type={columns.find(c => c.lableName === inputValue).type} value={filterValue.value} onChange={handleChange} />
                </MenuItem>
                {!isFilterOnline && <MenuItem style={{display: "flex", justifyContent: "end" }}><Button variant='contained' color='inherit' onClick={resetFilter}>Reset filter</Button></MenuItem>}
            </Menu>
        </>
    )
}

export default memo(Filter)
import React, { memo, useState } from 'react'
import { IconButton, Menu, MenuItem, NativeSelect, TextField } from '@mui/material'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';

const Filter = ({ filterValue, setFilterValue }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const columns = [{ lableName: "GHG emissions", type: "Number" }, { lableName: "Valid date", type: "Date" }]
    const comparators = ["=", ">="]
    const [inputValue, setInputValue] = useState(columns[0].lableName);

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
        if (type === "number") {
            return setFilterValue({ ...filterValue, value: parseFloat(value, 10) })
        } else if (type === "Date") {
            return setFilterValue({ ...filterValue, value: value })
        }
    }

    console.log(filterValue)

    return (
        <>
            <IconButton color='inherit' onClick={handleClick}><FilterListTwoToneIcon /></IconButton>
            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem>
                    {/*<NativeSelect onChange={handelColumnsOption}>
                        {columns.map((c, index) => (
                            <option key={index}>{c.lableName}</option>
                        ))}
                    </NativeSelect>
                    <NativeSelect onChange={handelComparisatorOption}>
                        {comparators.map((comp, index) => (
                            <option key={index}>{comp}</option>
                        ))}
                        </NativeSelect>*/}
                    <NativeSelect onChange={handelColumnsOption}>
                            <option >{columns[0].lableName}</option>
                    </NativeSelect>
                    {">="}
                    <TextField label={inputValue} type={columns.find(c => c.lableName === inputValue).type} value={filterValue.value} onChange={handleChange} />
                </MenuItem>
            </Menu>
        </>
    )
}

export default memo(Filter)
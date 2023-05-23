import React, { memo, useEffect, useState } from 'react'
import { Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import Header from './Header'


const CofDesInput = ({ name, name2, type, label, value, value2, options, handleValue, unit, description, handleDescription, handleSelection }) => {

    const [id, setId] = useState(0)

    useEffect(() => {
        //jos tulee joskus myöhemmin samaanlaisia valuetia optionissa ei sitte ei toimi oikein!!!!
        if (value !== 0) {
            options.map(opt => opt.value === value && setId(opt.id))
        }
    }, [value])

    const renderColumn = () => {
        return (
            <>
                <Header size={3.5} variant="h5">{label}</Header>
                <Grid container item xs={12} sm={8.5} direction="row" spacing={1} alignItems="center">
                    <Grid item className="styled-grid2">
                        <Select
                            value={id}
                            onChange={(e) => handleSelection(e, options)}
                            name={name}
                            fullWidth
                        >
                            {options.map((opt, index) => (
                                <MenuItem onClick={() => setId(opt.id)} value={opt.id} key={index}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item className="styled-grid2">
                        <TextField
                            label={"Description"}
                            name={name}
                            type="text"
                            value={description}
                            onChange={handleDescription}
                            fullWidth
                        />
                    </Grid>
                    {name2 ? <Grid container item spacing={1}>
                        <Grid item className="styled-grid2" justifyContent="flex-start" display="flex">
                            <TextField
                                label={"EF without electricity"}
                                name={name}
                                type={type}
                                required
                                value={value}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ "& .MuiTypography-root": { fontSize: "0.7rem" } }}>
                                            {unit}
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    step: 0.01
                                }}
                            />
                        </Grid>
                        <Grid item className="styled-grid2" justifyContent="flex-start" display="flex">
                            <TextField
                                label={"EF"}
                                name={name}
                                type={type}
                                required
                                value={value2}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ "& .MuiTypography-root": { fontSize: "0.7rem" } }}>
                                            {unit}
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    step: 0.01
                                }}
                            />
                        </Grid>
                    </Grid>
                        : <Grid item minWidth="100%">
                            <TextField
                                label={label}
                                name={name}
                                type={type}
                                required
                                value={value}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ "& .MuiTypography-root": { fontSize: "0.7rem" } }}>
                                            {unit}
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    step: 0.01
                                }}
                            />
                        </Grid>}
                </Grid>
            </>
        )
    }
    return (
        renderColumn()
    )
}

export default memo(CofDesInput)
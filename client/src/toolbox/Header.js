import React, { memo } from 'react'
import { Grid, Typography } from '@mui/material'

const Header = ({children, size, variant}) => {
    return (
        <Grid item xs={size}>
            <Typography variant={variant} align="left">{children}</Typography>
        </Grid>
    )
}

export default memo(Header)
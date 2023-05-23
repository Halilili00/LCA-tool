import React, { memo } from 'react'
import { Grid, Typography } from '@mui/material'

const Header = ({ children, size, variant, sum }) => {
    return (
        <>{sum
            ? <Grid container item xs={12} sm={size}>
                <Grid item xs={8}>
                    <Typography variant={variant} align="left">{children}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" align="right" marginRight={"5%"}>= {sum}</Typography>
                </Grid>
            </Grid>
            : <Grid item xs={12} sm={size} >
                <Typography variant={variant} align="left">{children}</Typography>
            </Grid>}
        </>
    )
}

export default memo(Header)
import React, { useEffect, useMemo, useState } from 'react'
import { CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import DataTable from './DataTable';

const LCAData = () => {
    const { posts, loading, error } = useSelector((state) => state.postReducer);
    const [query, setQuery] = useState("");

    const findPosts = useMemo(() => {
        if (!posts.length) return []
        return posts.filter(post => {
            return post.lcaID.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, posts])

    console.log(loading)
    console.log(posts)
    console.log(findPosts)
    return (
        <Grid container direction="column">
            <Typography variant='h3'>LCADatas</Typography>
            <Grid item mb={1}>
                <TextField
                    style={{ backgroundColor: "whitesmoke", borderRadius: "20px", margin: "15px 0px 0px 0px" }}
                    type="search"
                    label="Search with LCAID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon fontSize="large" color="primary" />
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item mb={1}>
                {loading ? <CircularProgress style={{ marginTop: "150px" }} size="15vh" color='inherit' />
                    : findPosts.length ? <DataTable findPosts={findPosts} /> : <div>Nothing found</div>}
            </Grid>
        </Grid>
    )
}
export default LCAData

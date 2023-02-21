import React, { useMemo, useState } from 'react'
import { CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import DataTable from './DataTable';
import TabPanel from '../toolbox/TabPanel';

const LCAData = () => {
    const { posts, loading, error } = useSelector((state) => state.postReducer);
    const [query, setQuery] = useState("");
    const [TabsP, tabValue] = TabPanel([{ label: "All", value: "All" }, { label: "Machingins", value: "MAC-0001" }, { label: "Temp2", value: "MAC-0002" }]);

    const tabPosts = useMemo(() => {
        if (!posts.length) return []
        if (tabValue !== "All") {
            return posts.filter(post => {
                return post.tempID.toLowerCase() === tabValue.toLowerCase();
            })
        } else {
            return posts;
        }
    }, [tabValue, posts])

    const findPosts = useMemo(() => {
        return tabPosts.filter(post => {
            return post.lcaID.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, tabPosts])

    console.log(loading)
    console.log(posts)
    console.log(findPosts)
    console.log(tabValue.value)
    return (
        <Grid container direction="column">
            <TextField
                style={{ backgroundColor: "whitesmoke", borderRadius: "20px", margin: "15px 0px 15px 0px" }}
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
            <TabsP />
            {loading ? <Grid item><CircularProgress style={{ marginTop: "150px" }} size="15vh" color='inherit' /></Grid>
                : findPosts.length ? <DataTable findPosts={findPosts} /> : <div>Nothing found</div>}
        </Grid>
    )
}
export default LCAData

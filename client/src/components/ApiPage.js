import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardMedia, InputAdornment, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector } from 'react-redux';
import * as api from "../api/index.js"

const ApiPage = () => {
    const user = useSelector((state) => state.authReducer.authData);
    const [apiKey, setApiKey] = useState("");

    const generateApiKey = async () => {
        await api.createapikey(user.result).then(data => setApiKey(data.data));
        //console.log(apikey.data)  
    }

    const fethApiKey = async () => {
        await api.getapikey()
            .then(data => setApiKey(data.data))
    }

    /*const copytoClickboard = () => {

    }*/

    useEffect(() => {
        fethApiKey()
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 370, marginTop: "20px"}}>
                <CardMedia
                    sx={{ height: 200, fontSize: "5rem" }}
                    image={user.result.imageUrl || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
                    title={user?.result.name?.charAt(0)}
                />
                <CardContent>
                    <Typography variant="body1">Name: {user.result.name}</Typography>
                    <Typography variant="body1">Email: {user.result.email}</Typography>
                    <hr style={{ borderTop: "4px solid #403a3a", width: "95%" }} />
                    {apiKey ? <TextField
                        label="Click button to copy Api key"
                        value={apiKey}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="end" onClick={() => {navigator.clipboard.writeText(apiKey); alert("Copied");}}><ContentCopyIcon /></InputAdornment>
                        }}
                        style={{ maxWidth: "250px" }}
                    />
                        : <Button onClick={generateApiKey} variant='contained' color='inherit'>Generate API key</Button>
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default ApiPage
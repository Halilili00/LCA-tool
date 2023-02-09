import React, { createContext, useContext, useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogTitle, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const AlertContext = createContext();

export const Alertprovider = ({ children }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState({ title: "", succes: "", buttons: [{ lable: "Cancel", navigatePage: "" }] });
    const navigate = useNavigate();

    const handleOpenSnackbar = () => {
        setSnackbarOpen(true);
    }

    const handleOpenDialog = (message) => {
        setDialogOpen(true);
        setMessage(message)
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCloseSnackBar = () => {
        setSnackbarOpen(false)
    }

    const handleCancel = () => {
        handleCloseDialog()
    }

    const handleOk = (onConfirm, navigatePage) => {
        handleCloseDialog();
        handleOpenSnackbar();
        onConfirm()
        if (navigatePage) {
            return navigate(navigatePage);
        }
    }

    return (
        <AlertContext.Provider value={{ handleOpenDialog }}>
            {children}

            {dialogOpen && <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            >
                <DialogTitle textAlign="center">{message.title}</DialogTitle>
                <DialogActions>
                    {message.buttons.map((button, index) => (
                        <Button key={index} onClick={() => handleOk(button.onConfirm, button.navigatePage)} variant='contained'>{button.lable}</Button>
                    ))}
                    <Button variant='contained' onClick={() => handleCancel()}>Cancel</Button>
                </DialogActions>
            </Dialog>}
            {snackbarOpen && <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{vertical: "top", horizontal: "right"}}   
            >
                <Alert severity='success'>{message.succes}</Alert>
            </Snackbar>}
        </AlertContext.Provider>
    )
}

export const useDialogAlert = () => useContext(AlertContext)
import { Box, Button, Card, Container, Snackbar, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import MuiAlert from '@mui/material/Alert';

const MainContent = styled(Box)(() => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`)

export default function SignIn() {
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <Snackbar
                open={snackBarMessage != ''}
                autoHideDuration={6000}
                onClose={() => setSnackBarMessage('')}
            >
                <MuiAlert style={{ color: 'whitesmoke' }} severity="error">
                    {snackBarMessage}
                </MuiAlert>
            </Snackbar>
            <MainContent>
                <Container maxWidth="sm">
                    <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                        <Stack spacing={3}>
                            <TextField
                                label='Your email'
                                type='email'
                                value={emailInput}
                                onChange={e => setEmailInput(e.target.value)}
                            />

                            <TextField
                                label='Your password'
                                type='password'
                                value={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            />

                            <Button
                                variant="outlined"
                                style={{ marginTop: 40 }}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </Card>
                </Container>
            </MainContent>
        </>
    )
}
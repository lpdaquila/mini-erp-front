import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react"
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { useRequests } from "src/utils/requests";

export default function AddEmployee() {
    const [requestLoading, setRequestLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const navigate = useNavigate();
    const { addEmployee } = useRequests();

    async function handleAdd() {
        const [name, email, password] = [nameInput, emailInput, passwordInput]

        if (!name || !email || !password) {
            setInfoMessage('Give a name, email and password.')
            return;
        }

        setRequestLoading(true);
        const response = await addEmployee({ name, email, password });
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail)
            return;
        }

        navigate('/employees')
    }

    return (
        <PermissionMiddleware codeName="add_employee">
            <Helmet>
                <title>Add an Employee</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{ height: 2 }} color='primary' />}

            <PageTitleWrapper>
                <PageTitle
                    heading="Add an Employee"
                    subHeading="Add an employee and define name, email, password, etc."
                />
            </PageTitleWrapper>
            <Snackbar
                open={infoMessage != ''}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={infoMessage}
            />

            <Container maxWidth='lg'>
                <Stack maxWidth={700} spacing={3}>
                    <TextField
                        fullWidth
                        label='Name *'
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Email *'
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Password *'
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                    />

                    <Button
                        variant="outlined"
                        sx={{ width: 90, mt: 3.4 }}
                        onClick={requestLoading ? () => null : handleAdd}
                    >
                        Add
                    </Button>
                </Stack>
            </Container>

        </PermissionMiddleware>
    )
}
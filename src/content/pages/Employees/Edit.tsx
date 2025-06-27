import { Autocomplete, Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { Group } from "src/models/Group";
import { useRequests } from "src/utils/requests";

export default function EditEmployee() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [infoMessage, setInfoMessage] = useState('');

    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const [groupsData, setGroupsData] = useState<Group[]>([])
    const [groupsInput, setGroupsInput] = useState<Group[]>([])

    const { id: employee_id } = useParams();
    const navigate = useNavigate();

    const { editEmployee, getGroups, getAEmployee } = useRequests();

    const handleGetGroups = async () => {
        const response = await getGroups();

        if (!response.detail) {
            setGroupsData(response.data.groups)
        }
    }

    async function handleGetEmployee() {
        const response = await getAEmployee(+employee_id)

        if (!response.detail) {
            setNameInput(response.data.name)
            setEmailInput(response.data.email)
            setGroupsInput(response.data.groups)
            console.log('name: ', response.data.name)
        }
    }

    async function handleEdit() {
        const [name, email] = [nameInput, emailInput]
        const groups = groupsInput.map((item) => item.id).join(',')

        if (!name || !email) {
            setInfoMessage('Give a name and email.')
            return;
        }

        setRequestLoading(true);
        const response = await editEmployee(+employee_id, { name, email, groups });
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail)
            return;
        }

        navigate('/employees')
    }

    useEffect(() => {
        Promise.resolve([handleGetEmployee(), handleGetGroups()]).finally(() => {
            setRequestLoading(false);
        })
    }, [])

    return (
        <PermissionMiddleware codeName="change_employee">
            <Helmet>
                <title>Edit an Employee</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{ height: 2 }} color='primary' />}

            <PageTitleWrapper>
                <PageTitle
                    heading="Edit an Employee"
                    subHeading="Edit an employee and change name, email, groups, etc."
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
                    {groupsData.length >= 1 &&

                        <Autocomplete
                            multiple
                            options={groupsData}
                            getOptionLabel={(option: Group) => option.name}
                            value={groupsData.filter((itemData) => groupsInput.some(item => item.id == itemData.id))}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Employee Roles"
                                    placeholder="Select"
                                />)}
                            onChange={(e, value: Group[]) => setGroupsInput(value)}
                        />
                    }

                    <Button
                        variant="outlined"
                        sx={{ width: 90, mt: 3.4 }}
                        onClick={requestLoading ? () => null : handleEdit}
                    >
                        Edit
                    </Button>
                </Stack>
            </Container>

        </PermissionMiddleware>
    )
}
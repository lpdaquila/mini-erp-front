import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react"
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import SelectEmployee from "src/components/SelectEmployee";
import SelectTaskStatus from "src/components/SelectTaskStatus";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { useDate } from "src/utils/formatDate";
import { useRequests } from "src/utils/requests";

export default function AddTask() {
    const [requestLoading, setRequestLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [selectedStatusInput, setSelectedStatusInput] = useState(1);
    const [selectedEmployeeInput, setSelectedEmployeeInput] = useState<number | ''>('');

    const navigate = useNavigate();

    const { formatDateForAPI } = useDate();
    const { addTask } = useRequests();

    async function handleAdd() {
        const [
            title, description, employee_id, status_id
        ] = [
                titleInput, descriptionInput, selectedEmployeeInput, selectedStatusInput
            ]
        const due_date = dateTimeInput ? formatDateForAPI(dateTimeInput) : null

        if (!title || !employee_id) {
            setInfoMessage('Required fields missing.')
            return;
        }

        setRequestLoading(true);
        const response = await addTask({ title, description, due_date, employee_id, status_id })
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail)
            return;
        }

        navigate('/tasks')
    }

    return (
        <PermissionMiddleware codeName="add_task">
            <Helmet>
                <title>Add a Task</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{ height: 2 }} color='primary' />}

            <PageTitleWrapper>
                <PageTitle
                    heading="Add a Task"
                    subHeading="Add a task and define title, description, due date, employee, status, etc."
                />
            </PageTitleWrapper>

            <Snackbar
                open={infoMessage != ''}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={infoMessage}
            />

            <Container maxWidth='lg'>
                <Stack
                    maxWidth={700}
                    spacing={3}
                >
                    <TextField
                        fullWidth
                        label="Title *"
                        value={titleInput}
                        onChange={e => setTitleInput(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        value={descriptionInput}
                        onChange={e => setDescriptionInput(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        type='datetime-local'
                        value={dateTimeInput}
                        onChange={e => setDateTimeInput(e.target.value)}
                    />

                    <SelectEmployee
                        selectedEmployee={selectedEmployeeInput}
                        setSelectedEmployee={setSelectedEmployeeInput}
                    />

                    <SelectTaskStatus
                        selectedStatus={selectedStatusInput}
                        setSelectedStatus={setSelectedStatusInput}
                    />

                    <Button
                        variant="outlined"
                        sx={{ width: 90, mt: 3.5 }}
                        onClick={requestLoading ? () => null : handleAdd}
                        disabled={requestLoading}
                    >
                        Add
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    )
}
import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import SelectEmployee from "src/components/SelectEmployee";
import SelectTaskStatus from "src/components/SelectTaskStatus";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { useDate } from "src/utils/formatDate";
import { useRequests } from "src/utils/requests";

export default function EditTask() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [infoMessage, setInfoMessage] = useState('');

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [selectedStatusInput, setSelectedStatusInput] = useState(1);
    const [selectedEmployeeInput, setSelectedEmployeeInput] = useState<number | ''>('');

    const { id: task_id } = useParams();
    const navigate = useNavigate();

    const { formatDateForAPI } = useDate();
    const { editTask, getATask } = useRequests();

    async function handleGetTask() {
        const response = await getATask(+task_id)
        const task = response.data.task

        if (!response.detail) {
            setTitleInput(task.title)
            setDescriptionInput(task.description)
            setDateTimeInput(task.due_date ? task.due_date.slice(0, -4) : null)
            setSelectedEmployeeInput(task.employee.id)
            setSelectedStatusInput(task.status == 'todo' ? 1 : 2)
        }
    }

    async function handleEdit() {
        const [
            title, employee_id, status_id
        ] = [
                titleInput, selectedEmployeeInput, selectedStatusInput
            ]
        const due_date = dateTimeInput ? formatDateForAPI(dateTimeInput) : null;
        const description = descriptionInput ? descriptionInput : null

        if (!title || !employee_id) {
            setInfoMessage('Required fields missing.')
            return;
        }

        setRequestLoading(true);
        const response = await editTask(+task_id, { title, description, due_date, employee_id, status_id })
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail)
            return;
        }

        navigate('/tasks')
    }

    useEffect(() => {
        Promise.resolve(handleGetTask()).finally(() => {
            setRequestLoading(false);
        })
    }, [])

    return (
        <PermissionMiddleware codeName="change_task">
            <Helmet>
                <title>Edit a Task</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{ height: 2 }} color='primary' />}

            <PageTitleWrapper>
                <PageTitle
                    heading="Edit a Task"
                    subHeading="Edit a task and change title, description, due date, employee, status, etc."
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
                        onClick={requestLoading ? () => null : handleEdit}
                        disabled={requestLoading}
                    >
                        Edit
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    )
}
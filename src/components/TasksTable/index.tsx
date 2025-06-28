import {
    Card,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { DeleteTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";
import { Task } from "src/models/Tasks";
import { useDate } from "src/utils/formatDate";

type Props = {
    tasksList: Task[];
    refreshList: () => void;
}

export default function TasksTable({ tasksList, refreshList }: Props) {
    const { handlePermissionsExists } = useAuth();
    const { deleteTask } = useRequests();
    const { formatAPIDate } = useDate();

    const navigate = useNavigate();

    function handleEditTask(id: number) {
        navigate(`/tasks/edit/${id}`)
    }

    async function handleDeleteTask(id: number) {

        await deleteTask(id);

        refreshList();
    }

    return (
        <Container maxWidth='lg'>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasksList.map((task) => (
                                <TableRow hover key={task.id}>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{task.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.due_date ? formatAPIDate(task.due_date) : 'No deadline'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {handlePermissionsExists('change_task') &&
                                            <Tooltip title="Edit task" arrow>
                                                <IconButton
                                                    color='primary'
                                                    size='small'
                                                >
                                                    <EditTwoToneIcon onClick={() => handleEditTask(task.id)} />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        {handlePermissionsExists('delete_task') &&
                                            <Tooltip title="Fire task" arrow>
                                                <IconButton
                                                    color='error'
                                                    size='small'
                                                >
                                                    <DeleteTwoTone onClick={() => handleDeleteTask(task.id)} />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    )
}
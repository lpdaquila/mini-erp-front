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
import { Employee } from "src/models/Employee"
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";

type Props = {
    employeesList: Employee[];
    refreshList: () => void;
}

export default function EmployeesTable({ employeesList, refreshList }: Props) {
    const { handlePermissionsExists } = useAuth();
    const { deleteEmployee } = useRequests();

    const navigate = useNavigate();

    function handleEditEmployee(id: number) {
        navigate(`/employees/edit/${id}`)
    }

    async function handleDeleteEmployee(id: number) {
        await deleteEmployee(id);

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
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeesList.map((employee) => (
                                <TableRow hover key={employee.id}>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{employee.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {employee.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {employee.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {handlePermissionsExists('change_employee') &&
                                            <Tooltip title="Edit Employee" arrow>
                                                <IconButton
                                                    color='primary'
                                                    size='small'
                                                >
                                                    <EditTwoToneIcon onClick={() => handleEditEmployee(employee.id)} />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        {handlePermissionsExists('delete_employee') &&
                                            <Tooltip title="Fire Employee" arrow>
                                                <IconButton
                                                    color='error'
                                                    size='small'
                                                >
                                                    <DeleteTwoTone onClick={() => handleDeleteEmployee(employee.id)} />
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
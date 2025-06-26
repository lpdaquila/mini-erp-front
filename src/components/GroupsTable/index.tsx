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
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { GroupDetail } from "src/models/Group";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";

type Props = {
    groupsList: GroupDetail[];
    refreshList: () => void;
}

export default function GroupsTable({ groupsList, refreshList }: Props) {
    const { handlePermissionsExists } = useAuth();

    const { deleteGroup } = useRequests();

    const theme = useTheme();
    const navigate = useNavigate();

    function handleEditGroup(id: number) {
        navigate(`/groups/edit/${id}`)
    }

    async function handleDeleteGroup(id: number) {
        await deleteGroup(id);
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
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                            <TableBody>
                                {groupsList.map((group) => (
                                    <TableRow hover key={group.id}>
                                        <TableCell>
                                            <Typography
                                                fontWeight="bold"
                                                gutterBottom
                                            >
                                                #{group.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                fontWeight="bold"
                                                gutterBottom
                                            >
                                                #{group.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {handlePermissionsExists('change_group') &&
                                                <Tooltip title="Edit role" arrow>
                                                    <IconButton
                                                        sx={{
                                                            '&:hover': {
                                                                background: theme.colors.primary.lighter
                                                            },
                                                            color: theme.palette.primary.main
                                                        }}
                                                        color='inherit'
                                                        size='small'
                                                    >
                                                        <EditTwoToneIcon onClick={() => handleEditGroup(group.id)} />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {handlePermissionsExists('delete_group') &&
                                                <Tooltip title="Delete role" arrow>
                                                    <IconButton
                                                        sx={{
                                                            '&:hover': {
                                                                background: theme.colors.primary.lighter
                                                            },
                                                            color: theme.palette.error.main
                                                        }}
                                                        color='inherit'
                                                        size='small'
                                                    >
                                                        <DeleteTwoTone onClick={() => handleDeleteGroup(group.id)} />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    )
}
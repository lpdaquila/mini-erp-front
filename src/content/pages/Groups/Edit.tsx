import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PermissionsList from "src/components/PermissionsList";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { PermissionDetail } from "src/models/Permission";
import { useRequests } from "src/utils/requests";

export default function EditGroup() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [infoMessage, setInfoMessege] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [permissionsData, setPermissionsData] = useState<PermissionDetail[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const { getPermissions, getAGroup, editGroup } = useRequests();

    const { id: group_id } = useParams();

    const navigate = useNavigate();

    async function handleGetGroup() {
        const response = await getAGroup(+group_id)

        if (!response.detail) {
            setNameInput(response.data.group.name)
            setSelectedPermissions(response.data.group.permissions.map(item => item.id))
        }
    }

    async function handleGetPermissions() {
        const response = await getPermissions();

        if (!response.detail) {
            setPermissionsData(response.data.permissions);
        }
    }

    async function handleEdit() {
        const name = nameInput;
        const permissions = selectedPermissions.join(',');

        if (!name) {
            setInfoMessege('Give a name to the role.');
            return;
        }

        setRequestLoading(true);
        const response = await editGroup(+group_id, { name, permissions });
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessege(response.detail);
        } else {
            navigate('/groups')
        }
    }

    useEffect(() => {
        Promise.resolve([handleGetPermissions(), handleGetGroup()]).finally(() => {
            setRequestLoading(false)
        });
    }, [])

    return (
        <>
            <PermissionMiddleware codeName="change_group">
                <Helmet>
                    <title>Edit a Role</title>
                </Helmet>

                {requestLoading && <LinearProgress sx={{ height: 2 }} color="primary" />}

                <PageTitleWrapper>
                    <PageTitle
                        heading="Edit a role"
                        subHeading="Edit a role and define a new name, permissions, etc." />
                </PageTitleWrapper>

                <Snackbar
                    open={infoMessage != ''}
                    onClose={() => setInfoMessege('')}
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

                        <PermissionsList
                            permissionsData={permissionsData}
                            selectedPermissions={selectedPermissions}
                            setSelectedPermissions={setSelectedPermissions}
                        />

                        <Button
                            variant="outlined"
                            sx={{ width: 90, mt: 3 }}
                            onClick={requestLoading ? () => null : handleEdit}
                        >
                            Edit
                        </Button>
                    </Stack>
                </Container>

            </PermissionMiddleware>
        </>
    )
}
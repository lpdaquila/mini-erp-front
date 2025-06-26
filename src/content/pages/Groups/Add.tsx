import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PermissionsList from "src/components/PermissionsList";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { PermissionDetail } from "src/models/Permission";
import { useRequests } from "src/utils/requests";

export default function AddGroups() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [infoMessage, setInfoMessege] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [permissionsData, setPermissionsData] = useState<PermissionDetail[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const { getPermissions, addGroup } = useRequests();

    const navigate = useNavigate();

    async function handleGetPermissions() {
        const response = await getPermissions();

        if (!response.detail) {
            setPermissionsData(response.data.permissions);
        }
    }

    async function handleAdd() {
        const name = nameInput;
        const permissions = selectedPermissions.join(',');

        if (!name) {
            setInfoMessege('Give a name to the role.');
            return;
        }

        setRequestLoading(true);
        const response = await addGroup({ name, permissions });
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessege(response.detail);
        } else {
            navigate('/groups')
        }
    }

    useEffect(() => {
        Promise.resolve(handleGetPermissions()).finally(() => {
            setRequestLoading(false)
        });
    }, [])

    return (
        <>
            <PermissionMiddleware codeName="add_group">
                <Helmet>
                    <title>Add a Role</title>
                </Helmet>

                {requestLoading && <LinearProgress sx={{ height: 2 }} color="primary" />}

                <PageTitleWrapper>
                    <PageTitle
                        heading="Add a role"
                        subHeading="Add a role and define name, permissions, etc." />
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
                            onClick={requestLoading ? () => null : handleAdd}
                        >
                            Add
                        </Button>
                    </Stack>
                </Container>

            </PermissionMiddleware>
        </>
    )
}
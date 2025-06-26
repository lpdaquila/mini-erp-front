import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { PermissionDetail } from "src/models/Permission";
import { useRequests } from "src/utils/requests";

export default function AddGroups() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [permissionsData, setPermissionsData] = useState<PermissionDetail[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const { getPermissions, addGroup } = useRequests();

    async function handleGetPermissions() {
        const response = await getPermissions();

        if (!response.detail) {
            setPermissionsData(response.data.permissions);
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

            </PermissionMiddleware>
        </>
    )
}
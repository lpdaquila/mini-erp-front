import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import GroupsTable from "src/components/GroupsTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { GroupDetail } from "src/models/Group";
import { useRequests } from "src/utils/requests";

export default function Groups() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [groupsData, setGroupsData] = useState<GroupDetail[]>([])

    const { getGroups } = useRequests();

    async function handleGetGroups() {
        const response = await getGroups();

        setGroupsData(response.data.groups)
        setRequestLoading(false)
    }

    useEffect(() => {
        handleGetGroups();
    }, [])

    return (
        <>
            <PermissionMiddleware codeName="view_group">
                <>
                    <Helmet>
                        <title>Roles</title>
                    </Helmet>
                    <PageTitleWrapper>
                        <PageTitle
                            heading="Roles"
                            subHeading="Query your enterprise roles and execute actions"
                        />
                    </PageTitleWrapper>
                </>

                <Container
                    maxWidth="xl"
                    sx={{
                        marginX: requestLoading ? '-10%' : 0,
                        transition: 'all .5s'
                    }}
                >
                    <GroupsTable
                        refreshList={handleGetGroups}
                        groupsList={groupsData}
                    />
                </Container>


            </PermissionMiddleware>
        </>
    );
}
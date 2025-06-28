import { Container } from "@mui/material";
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import TasksTable from "src/components/TasksTable";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { Task } from "src/models/Tasks";
import { useRequests } from "src/utils/requests";

export default function Tasks() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [tasksData, setTasksData] = useState<Task[]>([])

    const { getTasks } = useRequests();

    async function handleGetTasks() {
        const response = await getTasks();

        if (!response.detail) {
            setTasksData(response.data.tasks)
            setRequestLoading(false);
        }
    }

    useEffect(() => {
        handleGetTasks();
    }, [])

    return (
        <PermissionMiddleware codeName="view_task">
            <Helmet>
                <title>Tasks</title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle
                    heading="Tasks"
                    subHeading="Query the enterprise tasks and manage."
                />
            </PageTitleWrapper>
            <Container maxWidth='xl' sx={{
                marginX: requestLoading ? '-10%' : 0,
                transition: 'all .5s'
            }}>
                <TasksTable
                    tasksList={tasksData}
                    refreshList={handleGetTasks}
                />
            </Container>
        </PermissionMiddleware>
    )
}
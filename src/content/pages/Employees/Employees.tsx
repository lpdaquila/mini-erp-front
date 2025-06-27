import { Container } from "@mui/material";
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async";
import EmployeesTable from "src/components/EmployeesTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { Employee } from "src/models/Employee";
import { useRequests } from "src/utils/requests";

export default function Employees() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [employeesData, setEmployeesData] = useState<Employee[]>([])

    const { getEmployees } = useRequests();

    async function handleGetEmployees() {
        const response = await getEmployees();
        setRequestLoading(false);
    }

    useEffect(() => {
        handleGetEmployees();
    }, [])

    return (
        <PermissionMiddleware codeName="view_employee">
            <Helmet>
                <title>Employees</title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle
                    heading="Employees"
                    subHeading="Query the enterprise employees and execute actions for each employee."
                />
            </PageTitleWrapper>
            <Container maxWidth='xl' sx={{
                marginX: requestLoading ? '-10%' : 0,
                transition: 'all .5s'
            }}>
                <EmployeesTable
                    employeesList={employeesData}
                    refreshList={handleGetEmployees}
                />
            </Container>
        </PermissionMiddleware>
    )
}
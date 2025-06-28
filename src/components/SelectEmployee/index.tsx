import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { Employee } from "src/models/Employee"
import { useRequests } from "src/utils/requests"

type Props = {
    selectedEmployee: number | ''
    setSelectedEmployee: (employee_id: number) => void
}

export default function SelectEmployee({ selectedEmployee, setSelectedEmployee }: Props) {
    const [employeesData, setEmployeesData] = useState<Employee[]>([]);

    const { getEmployees } = useRequests();

    async function handleGetEmployees() {
        const response = await getEmployees();

        if (!response.detail) setEmployeesData(response.data.employees)
    }

    useEffect(() => {
        handleGetEmployees();
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel>Select an employee</InputLabel>
            <Select
                value={selectedEmployee}
                label="Select an employee"
                onChange={e => setSelectedEmployee(+e.target.value)}
            >
                {employeesData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name} - {item.email}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}
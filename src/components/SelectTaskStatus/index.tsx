import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
    selectedStatus: number;
    setSelectedStatus: (status_id: number) => void;
}

export default function SelectTaskStatus({ selectedStatus, setSelectedStatus }: Props) {
    return (
        <FormControl>
            <InputLabel>Select a Task Status</InputLabel>
            <Select
                value={selectedStatus}
                label="Select a Status"
                onChange={e => setSelectedStatus(+e.target.value)}
            >
                <MenuItem value={1}>To Do</MenuItem>
                <MenuItem value={2}>Doing</MenuItem>
                <MenuItem value={3}>Done</MenuItem>
            </Select>
        </FormControl>
    )
}
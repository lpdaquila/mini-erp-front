import { Box, Button, Container, Typography } from "@mui/material";
import { ReactNode } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";

type Props = {
    children: ReactNode;
    codeName: string;
}

export function PermissionMiddleware({ children, codeName }: Props) {
    const navigate = useNavigate();

    const { handlePermissionsExists } = useAuth();

    function handleRefreshPage() {
        navigate(0)
    }

    if (!handlePermissionsExists(codeName)) {
        <Container maxWidth='sm' sx={{ mt: 16 }}>
            <Box textAlign="center">
                <img
                    alt="status-500"
                    height={260}
                    src="/static/images/status/500.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                    You do not have permission to access this area!
                </Typography>

                <Typography color='text.secondary' sx={{ mb: 4 }}>
                    If you solicited to administration the permission to access this area,
                    just refresh the page by clicking in the button below.
                </Typography>

                <Button onClick={handleRefreshPage} variant="contained" sx={{ ml: 1 }} />
            </Box>
        </Container>
    }

    return (
        <>
            {children}
        </>
    )
} 
// Dashboard.tsx
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to Dashboard, {username}!
            </Typography>
            <Typography variant="body1" gutterBottom>
                This is your dashboard page.
            </Typography>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
        </Box>
    );
}
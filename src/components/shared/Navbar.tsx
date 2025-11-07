import { AppBar, Box, FormControl, Grid, InputLabel, MenuItem, Select, Toolbar, Typography, type SelectChangeEvent } from "@mui/material";
import { useState } from "react";
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";
import SettingCard from "./settingCard";
import { locationOptions } from "../../lib/models/locationOptions";
import i18n from "../../lib/utils/i18n";

type NavbarProps = {
    mode: "light" | "dark";
    setMode: (mode: "light" | "dark") => void;
};

export default function Navbar({ mode, setMode }: NavbarProps) {

const [age, setAge] = useState('');
const navigate = useNavigate();

const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
};

    return (
        <>
            <AppBar position="static" sx={{minWidth:'480px', bgcolor:'#F3FAFE', color:'text.primary', boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.15)'}}>
                <Toolbar sx={{justifyContent:'space-between', py:1, alignItems:'center'}}>
                    <Grid>
                        <Box sx={{display:'flex', alignItems:'center', gap:2}}>
                            <Box component='img' src="/assets/dashboard/logo.svg" alt="Logo" sx={{width:'56px', height:'56px'}}/>
                            <Typography component='div' sx={{fontWeight:'400', fontSize:'12px', letterSpacing:'0.15px', color:'#003464'}}>Weather Dashboard</Typography>
                        </Box>
                    </Grid>
                    <Grid >
                        <Box sx={{display:'flex', alignItems:'center', gap:2}}>
                            <FormControl sx={{width:'295px', height:'40px',pb:2}}>
                                <InputLabel id="demo-simple-select-label">
                                    Search Your Location
                                </InputLabel>
                                <Select id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
                                    {locationOptions.map(c => (
                                        <MenuItem key={c.en} value={c.en}>
                                            {i18n.language === 'fa' ? c.fa : c.en}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <SettingCard  mode={mode} setMode={setMode} onExit={() => navigate("/")} />
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

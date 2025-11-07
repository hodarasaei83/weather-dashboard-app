import {  Box, Grid, Typography } from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Footer(){
    return(
        <Box component='footer' sx={{minWidth:'480px', bgcolor:'#F3FAFE', color:'##003464'}}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',height:'106px'}}>
                <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:1.5}}>
                    <Box component='img' src="/assets/dashboard/footerLogo.svg" sx={{width:'50px', height:'50px', pl:2}}/>
                    <Typography sx={{fontSize:'14px', fontWeight:'400', lineHeight:'24px', letterSpacing:'0%'}}>All rights of this site are reserved for Nadin Sadr Aria Engineering Company.</Typography>
                </Grid>
                <Grid sx={{display:'flex', alignItems:'center', gap:3}}>
                    <Box sx={{display:'flex', alignItems:'center', gap:0.5}}>
                        <MailOutlineOutlinedIcon sx={{width:'19px', height:'15px', color:'#003464'}}/>
                        <Typography sx={{fontWeight:'400', fontSize:'14px', lineHeight:'24px', letterSpacing:'0%'}}>contact us: info@nadin.ir</Typography>
                    </Box>
                    <Box sx={{display:'flex', alignItems:'center', gap:0.5}}>
                        <CalendarMonthOutlinedIcon sx={{width:'17px', height:'19px', color:'#003464'}}/>
                        <Typography sx={{fontWeight:'400', fontSize:'14px', lineHeight:'24px', letterSpacing:'0%'}}>12:25 . Monday23December2023</Typography>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useUsername } from "../../../services/context/UsernameContext"
import { useTranslation } from "react-i18next"

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    height: '560px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    borderRadius: '12px'
}

export default function Login() {
    const {Username, setUsername} = useUsername()
    const { t, i18n } = useTranslation();


    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        
        if (Username.trim()) {
            // Save to localStorage
            localStorage.setItem('username', Username.trim())
            // localStorage.setItem('language', t.toString())
            
            // Redirect to dashboard
            navigate('/dashboard')
        } else {
            alert('Please enter your name')
        }
    }

    return (
        <>
          <Box sx={boxStyle}>
            <Grid container>
                <Grid size={{xs:12, sm:12, lg:6}}>
                    <Container>
                    <Box 
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'space-between',
                            alignItems:'center',
                            width:'386px', 
                            height:'355px',
                            px:5,
                            py:10
                        }}
                    >
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{fontSize:'25.63px', fontWeight:'700', fontStyle:'bold', mb: 3, textAlign:'center'}}>
                                Login
                            </Typography>

                            <TextField 
                                label='Enter Your Name' 
                                fullWidth 
                                value={Username} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box sx={{width: '100%'}}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                                sx={{mt: 2}}
                            >
                                LOGIN
                            </Button>
                        </Box>
                    </Box>
                    </Container>
                </Grid>

                <Grid size={{xs:12, sm:12, lg:6}}>
                    <Box 
                      component='img'
                      src="./assets/login/frame10.svg"
                      sx={{
                        width: '100%',
                        height: '560px',
                        borderRadius:'12px', 
                        objectFit:'cover'
                      }}
                      alt="loginImage"                    
                    />
                </Grid>
            </Grid>
          </Box> 

          <Box 
  sx={{
    position: 'absolute',
    bottom: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '220px',
    height: '45px',
    zIndex: 1000,
  }}
>
<FormControl fullWidth variant="standard" sx={{ direction: i18n.language === "fa" ? "rtl" : "ltr" , mb:1}}>
          <InputLabel id="lang-label" sx={{ color: "#000000", position: "inherit",mb:-2 }}>
            {t("language")}
          </InputLabel>
          <Select
            labelId="lang-label"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fa">فارسی</MenuItem>
          </Select>
        </FormControl>
</Box>
                
        </>
    )
}
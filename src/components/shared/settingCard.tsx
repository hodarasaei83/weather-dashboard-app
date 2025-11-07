import React, { useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from "react-i18next";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";


export type SettingCardProps = {
  mode: "light" | "dark";
  setMode: (m: "light" | "dark") => void;
  onExit?: () => void;
};

const SettingCard: React.FC<SettingCardProps> = ({ mode, setMode, onExit }) => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "settings-popover" : undefined;

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label=" settings" sx={{border:'1px solid #BBC1C4', borderRadius:'8px', height:'40px', width:'40px'}}>
        <SettingsIcon sx={{color:'#BBC1C4'}}/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        elevation={8}
      >
        <Box sx={{ p: 2, width: 230 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t("mode")}
              </Typography>
              <ToggleButtonGroup
                exclusive
                value={mode}
                onChange={(_, val) => val && setMode(val)}
                size="small"
                fullWidth
              >
                <ToggleButton value="light">
                  <WbSunnyOutlinedIcon fontSize="small" sx={{ mr: 1, opacity: "0.6" }} />
                  {t("light")}
                </ToggleButton>
                <ToggleButton value="dark">
                  <DarkModeOutlinedIcon fontSize="small" sx={{ mr: 1, opacity: "0.6" }} />
                  {t("dark")}
                </ToggleButton>
              </ToggleButtonGroup>



            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t("language")}
              </Typography>
              <ToggleButtonGroup
                exclusive
                value={i18n.language.startsWith("fa") ? "fa" : "en"}
                onChange={(_, val) => val && i18n.changeLanguage(val)}
                size="small"
                fullWidth
              >
                <ToggleButton value="en">En</ToggleButton>
                <ToggleButton value="fa">Fa</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Divider />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <LogoutIcon sx={{ width: "20px", height: "40px" }} />
              <Button variant="text" sx={{ color: "black" }} onClick={onExit}>{t("exit")}</Button>
            </Box>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default SettingCard;
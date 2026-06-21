import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const OPTIONS = [
    { value: 'light', label: 'Light', icon: <LightModeIcon fontSize="small" /> },
    { value: 'system', label: 'System', icon: <SettingsBrightnessIcon fontSize="small" /> },
    { value: 'dark', label: 'Dark', icon: <DarkModeIcon fontSize="small" /> },
];

export default function ModeSelect() {
    const { mode, setMode } = useColorScheme();

    if (!mode) return null;

    return (
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Chế độ</InputLabel>
            <Select
                value={mode}
                label="Chế độ"
                onChange={(e) => setMode(e.target.value)}
                renderValue={(selected) => {
                    const { icon, label } = OPTIONS.find((o) => o.value === selected);
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {icon}
                            {label}
                        </Box>
                    );
                }}
            >
                {OPTIONS.map(({ value, label, icon }) => (
                    <MenuItem key={value} value={value} sx={{ gap: 1 }}>
                        {icon}
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
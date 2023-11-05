import * as React from 'react';
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Link from 'next/link';
import { AppBar, Box, Typography, Toolbar, IconButton, TextField, Container, Button, InputAdornment, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function valuetext(value: number) {
    return `${value}`;
}

export default function DisplayResult() {
  const sliderSettings = [
    { min: 10000, max: 100000, step: 5, label: "Gross Monthly Income"},
    { min: 10, max: 90, step: 10, label: "Credit Card Payment"},
    { min: 1, max: 99, step: 1, label: "Car Payment"},
    { min: -50, max: 50, step: 2, label: "Student Loan Payment"},
    { min: 20, max: 80, step: 5, label: "Appraised Value"},
    { min: 5, max: 95, step: 1, label: "Down Payment"},
    { min: 10, max: 60, step: 10, label: "Loan Amount"},
    { min: 0, max: 100, step: 20, label: "Monthly Mortgage Payment"},
    { min: 300, max: 850, step: 3, label: "Credit Score"}
  ];

  const [sliderValues, setSliderValues] = React.useState(
    sliderSettings.map((setting) => (setting.min + setting.max) / 2)
  );

  const handleSliderChange = (event, newValue, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = newValue;
    setSliderValues(newSliderValues);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "linear-gradient(to right, #00395d, #7bb0db)" }} position="static">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Link>
          <Button color="inherit">Result</Button>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        maxWidth="sm"
      >
        <Grid container spacing={15}>
          {sliderSettings.map((setting, index) => (
            <Grid item xs={4} key={index}>
              <Box sx={{ width: "200%" }}>
                <Typography variant="body2">{setting.label}</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box mr = {1}>
                  <Typography variant="caption">{setting.min}</Typography>
                  </Box>
                  <Slider 
                    min={setting.min}
                    max={setting.max}
                    step={setting.step}
                    value={sliderValues[index]}
                    onChange={(event, newValue) => handleSliderChange(event, newValue, index)}
                    aria-label={setting.label}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                  />
                  <Box ml = {1}>
                  <Typography variant="caption">{setting.max}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    </ThemeProvider>
  );
}
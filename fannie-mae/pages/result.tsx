'use client'
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
import { withRouter } from 'next/router'
import { useEffect, useState } from "react"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

let emailParams = {
  to: 'renny@rennyhoang.com',
  subject: 'Quali Report',
  text: 'Hello, Quali client! You recently used our webservices for housing eligibility! Here are some recommendations based on your results! ',
  html: '',
};

async function sendMail(to, subject, text, html) {
  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,         // recipient's email
        subject,    // subject of the email
        text,       // plain text body
        html,       // HTML body
      }),
    });

    if (!response.ok) {
      throw new Error(`Email could not be sent, status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // It's good to log this for now to see the response from your API
    // Handle success
    alert('Email sent successfully!');
  } catch (error) {
    console.error("Failed to send email: ", error);
  }
}

let approved = true

let articles = [
  'It looks like your loan amount to house value ratio is rather high, you should visit the following: https://movement.com/blog/2023/10/6-ways-to-improve-loan-to-value-ratio',
  'Your credit score can be raised just a bit more: https://www.experian.com/blogs/ask-experian/credit-education/improving-credit/improve-credit-score/',
  'You should work on your debt to income ratio: https://bettermoneyhabits.bankofamerica.com/en/credit/what-is-debt-to-income-ratio',
  'Be sure to invest some time in learning about the front end debt to income ratio: https://www.investopedia.com/terms/f/front-end-debt-to-income-ratio.asp'
]

let userDetails = {
  gmi: 0,
  ccp: 0,
  cp: 0,
  slp: 0,
  av: 0,
  dp: 0,
  la: 0,
  mmp: 0,
  cs: 0
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function doMath(){
  // calculate DTI
  let DTI = (userDetails.ccp + userDetails.cp + userDetails.slp + userDetails.mmp) / userDetails.gmi
  // calculate LTV
  let LTV = userDetails.la / userDetails.av
  let FEDTI = userDetails.mmp / userDetails.gmi
  // judge credit
  if (userDetails.cs < 640 || LTV > 0.8 || DTI > 0.43 || FEDTI > 0.28){
    approved = false
  }
  else{
    approved = true
  }
}

function initialMath(){
  // calculate DTI
  let DTI = (userDetails.ccp + userDetails.cp + userDetails.slp + userDetails.mmp) / userDetails.gmi
  // calculate LTV
  let LTV = userDetails.la / userDetails.av
  let FEDTI = userDetails.mmp / userDetails.gmi
  // judge credit
  if (userDetails.cs < 640){
    approved = false
    emailParams.text = emailParams.text.concat(articles[1])
    console.log(articles[1])
    console.log(emailParams.text)
    // add articles [1] to email
  }
  else if ( LTV > 0.8){
    approved = false
    emailParams.text = emailParams.text.concat(articles[0])
    console.log(articles[0])
    console.log(emailParams.text)
    // add articles[0] to email
  }
  else if (DTI > 0.43){
    approved = false
    emailParams.text = emailParams.text.concat(articles[2])
    console.log(articles[2])
    console.log(emailParams.text)
    // add articles[2] to email
  }
  else if (FEDTI > 0.28){
    approved = false
    emailParams.text.concat(articles[3])
    console.log(articles[3])
    console.log(emailParams.text)
  }
  else {
    emailParams.text = emailParams.text.concat("However, it seems like you're all set!")
    console.log(emailParams.text)
    approved = true
  }
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent default form submission
  sendMail(emailParams.to, emailParams.subject, emailParams.text, emailParams.html);
};

function valuetext(value: number) {
    return `${value}`;
}
const theme = createTheme({
  typography: {
    fontSize: 20,
  },
});

async function fetchUser(id) {
  try {
    const response = await fetch('/api/readUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    }
    )
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    userDetails = data
    console.log(data)
  } catch (error: any) {
    console.error('Failed to create user:', error);
  }
}

export default function DisplayResult() {
  const [email, setEmail] = useState('');
  let item
  if (typeof window !== 'undefined'){
    item = sessionStorage.getItem("id")
  }
  console.log(item)
  let id = parseInt(item)
  fetchUser(id)
  setTimeout(() => {
    initialMath();
  }, 2000);
  console.log(emailParams.text + " This is the text that's actually sent")

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

  function updateDetails(){
    userDetails.gmi = sliderValues[0]
    userDetails.ccp = sliderValues[1]
    userDetails.cp = sliderValues[2]
    userDetails.slp = sliderValues[3]
    userDetails.av = sliderValues[4]
    userDetails.dp = sliderValues[5]
    userDetails.la = sliderValues[6]
    userDetails.mmp = sliderValues[7]
    userDetails.cs = sliderValues[8]
  }

  const handleSliderChange = (event, newValue, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = newValue;
    setSliderValues(newSliderValues);
    updateDetails()
    console.log(userDetails)
    doMath()
    console.log(approved)
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "linear-gradient(to right, #00395d, #7bb0db)" }} position="static">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QUALI
            </Typography>
          </Link>
          <Button color="inherit">Result</Button>
        </Toolbar>
      </AppBar>
      <div style={{position: "absolute", top: "50%", left: "8%"}}>
      <ThemeProvider theme={theme}>
        { approved ? <Typography variant="h3">Eligible</Typography>
                   : <Typography variant="h3">Not Eligible</Typography> }
        </ThemeProvider>
      </div>
      <form onSubmit={handleSubmit}>
      <TextField id="outlined-basic" label="Enter your email" variant="outlined" onChange={(e) => emailParams.to = e.target.value} style={{position: "absolute", top: "63%", left: "8%"}}/>
      <Button style={{position: "absolute", top: "66%", left: "8%"}} type="submit" variant="contained" color="primary">
        Send Email
      </Button>
      </form>
      <Container
        style={{
          position: "absolute",
          left: "55%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
        maxWidth="sm"
      >  
        <Grid container rowSpacing={15} columnSpacing={25} mt = {15}>
          {sliderSettings.map((setting, index) => (
            <Grid item xs={4} key={index}>
              <Box sx={{ width: "450%" }}>
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
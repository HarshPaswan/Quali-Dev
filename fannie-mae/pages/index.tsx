import React, { useState } from "react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Link from 'next/link';
import { AppBar, Box, Typography, Toolbar, IconButton, TextField, Container, Button, InputAdornment, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import QuestionInput from '../components/QuestionInput'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

  const questionTitles = [
    "Please enter your gross monthly income: ",
    "Please enter your monthly credit card payment: ",
    "Please enter your monthly car payment: ",
    "Please enter your student loan payment: ",
    "Please enter your desired home's appraised value: ",
    "Please enter your intended down payment: ",
    "Please enter your desired loan amount: ",
    "Please enter your monthly mortgage payment: ",
    "Please enter your credit score: "
  ]
  const factors = [
    "gmi",
  "ccp",
  "cp",
  "slp",
  "av",
  "dp",
  "la",
  "mmp",
  "cs"
  ]

async function handleSubmit(userData) {
  try {
    const response = await fetch('/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('User created with ID:', result.id);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

let newUserDetails = {
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

export default function ButtonUsage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSubmit = (answer: string, factor: string) => {
    // Here you would typically handle the answer, like sending it to a server
    if (currentQuestionIndex < questionTitles.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    switch(factor){
      case 'gmi':
        newUserDetails.gmi = parseFloat(answer)
        console.log(newUserDetails.gmi)
        break
      case 'ccp':
        newUserDetails.ccp = parseFloat(answer)
        console.log(newUserDetails.ccp)
        break
      case 'cp':
        newUserDetails.cp = parseFloat(answer)
        break
      case 'slp':
        newUserDetails.slp = parseFloat(answer)
        break
      case 'av':
        newUserDetails.av = parseFloat(answer)
        break
      case 'dp':
        newUserDetails.dp = parseFloat(answer)
        break
      case 'la':
        newUserDetails.la = parseFloat(answer)
        break
      case 'mmp':
        newUserDetails.mmp = parseFloat(answer)
        break
      case 'cs':
        newUserDetails.cs = parseFloat(answer)
        handleSubmit(newUserDetails)
        break
    }
  };

  return (
    
    <Box sx={{ flexGrow: 1 }}>
    <AppBar style={{ background: "linear-gradient(to right, #00395d, #7bb0db)" }} position="static">
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Link href="/result"><Button color="inherit">Result</Button></Link>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm">

      {questionTitles.map((title, index) => (
        <div
          key={title}
          style={{
            display: index === currentQuestionIndex ? 'block' : 'none',
            transition: 'opacity 1s ease',
            opacity: index === currentQuestionIndex ? 1 : 0,
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          className="transition-all"
        >
          <QuestionInput
            question={title}
            factor={factors[index]}
            onSubmit={handleAnswerSubmit}
          />
        </div>
      ))}
    
    </Container>
    </Box>
  );
}
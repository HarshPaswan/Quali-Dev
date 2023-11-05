import React from "react"
import { GetStaticProps } from "next"
import prisma from '../lib/prisma';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Typography, TextField, Container, Stack, Button} from '@mui/material';

export default function ButtonUsage() {
  return (
    <Container style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
  }} maxWidth="sm">
      <h1 className="text-3xl font-bold underline">
        question goes here
      </h1>
      <TextField id="outlined-basic" label="enter your bullshit" className="mr-100" variant="outlined"/>
      <Button variant='contained'> submit! </Button>
    </Container>
  );
}
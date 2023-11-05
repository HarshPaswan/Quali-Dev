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
    <Container>
      <TextField id="outlined-basic" label="enter your bullshit" variant="outlined" />
      <Button variant = 'contained'> Hello world </Button>
    </Container>
  );
}
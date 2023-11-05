import React from "react"
import { GetStaticProps } from "next"
import prisma from '../lib/prisma';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {TextField, Container, Button, InputAdornment, FormControl, InputLabel, OutlinedInput} from '@mui/material';

export default function ButtonUsage() {
  return (
    <Container style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
  }} maxWidth="sm">
      <h1 className="text-3xl font-bold underline">
        question goes here
      </h1>
      <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
      </FormControl>
      <Button variant='contained' style={{margin: '8px'}}> Submit! </Button>
    </Container>
  );
}
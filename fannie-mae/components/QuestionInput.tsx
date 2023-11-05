import React, { useState } from 'react';
import { OutlinedInput, TextField, Button, Box, InputLabel, InputAdornment, FormControl } from '@mui/material';

// Define the props for the component
interface QuestionInputProps {
  question: string;
  factor: string;
  onSubmit: (answer: string, factor: string) => void; // You can modify the type here based on how you want to handle the submit event
}

const QuestionInput: React.FC<QuestionInputProps> = ({ question, factor, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    // You can add any validation or preprocessing here if necessary
    onSubmit(answer, factor);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box mb={2}>
        <h1 className="text-3xl font-bold underline">{question}</h1>
      </Box>
      <Box mb={2}>
      <FormControl fullWidth>
        { (factor != "cs")
        ? <div><InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel><OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
        onChange={(e) => setAnswer(e.target.value)}
      /></div>
          : <div><TextField onChange={(e) => setAnswer(e.target.value)}/></div>
        }
      </FormControl>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default QuestionInput;
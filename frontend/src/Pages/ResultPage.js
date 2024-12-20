import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, score, questions, answers } = location.state || {};

  return (
    <Stack spacing={3} sx={{ padding: 4, alignItems: "center" }}>
      <Typography variant="h4">Quiz Results for {userName}</Typography>
      <Typography>Total Questions: {questions.length}</Typography>
      <Typography>Correct Answers: {score.correct}</Typography>
      <Typography>Incorrect Answers: {score.incorrect}</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
    </Stack>
  );
}

export default ResultPage;

import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "User";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-questions/")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleSubmit();
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  const handleSubmit = () => {
    const score = questions.reduce(
      (acc, question, index) => {
        if (answers[index] === question.correct_option) acc.correct++;
        else acc.incorrect++;
        return acc;
      },
      { correct: 0, incorrect: 0 }
    );

    navigate("/result", { state: { userName, score, questions, answers } });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Stack spacing={2} sx={{ padding: 4 }}>
      <Typography variant="h5">Quiz for {userName}</Typography>
      <Typography>Time Left: {formatTime(timeLeft)}</Typography>

      {questions.length > 0 && (
        <Stack spacing={2}>
          <Typography>{`${currentQuestionIndex + 1}. ${
            questions[currentQuestionIndex].text
          }`}</Typography>
          <RadioGroup
            onChange={(e) => handleAnswerChange(e.target.value)}
            value={answers[currentQuestionIndex] || ""}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={questions[currentQuestionIndex].option_a}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={questions[currentQuestionIndex].option_b}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={questions[currentQuestionIndex].option_c}
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={questions[currentQuestionIndex].option_d}
            />
          </RadioGroup>
        </Stack>
      )}

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Box>
          <Button
            variant="contained"
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}

export default QuizPage;

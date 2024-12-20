import './App.css';
import { Stack } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartQuiz from './Pages/HomePage';
import QuizPage from './Pages/QuizPage';
import ResultPage from './Pages/ResultPage';

function App() {
  return (
    <Router>
      <Stack sx={{ backgroundColor: "#15202b", minHeight: "100vh", color: "white" }}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Stack>
    </Router>
  );
}

export default App;

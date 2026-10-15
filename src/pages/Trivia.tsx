import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./trivia.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTriviaQuizCategories } from "../fetch/triviaCategories";
import { fetchTriviaQuiz } from "../fetch/trivia";
import { shuffleArray } from "../utilities/arrayShuffle";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

const Trivia = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [categoryIsChosen, setCategoryIsChosen] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [mixedAnswers, setMixedAnswers] = useState<string[]>([]);
  const [quizOver, setQuizOver] = useState<boolean>(false);

  const {
    setUserGems,
    isSpace,
    userUpgrades: {
      extraGems: { currentBonus },
    },
  } = useApp();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["triviaCategories"],
    queryFn: fetchTriviaQuizCategories,
  });

  const {
    data: questions,
    isLoading: isLoadingQuestions,
    isError: isErrorQuestions,
  } = useQuery({
    queryKey: ["triviaQuestions", category],
    queryFn: () => fetchTriviaQuiz(category),
    enabled: categoryIsChosen,
  });

  const handleAnswer = (answer: string) => {
    const isCorrect =
      answer == questions?.results[currentQuestion]?.correct_answer;

    const finalCorrect = isCorrect ? correct + 1 : correct;
    const finalWrong = !isCorrect ? wrong + 1 : wrong;

    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }

    if (
      questions &&
      questions.results &&
      currentQuestion < questions.results.length - 1
    ) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    } else if (
      questions &&
      questions.results &&
      currentQuestion == questions.results.length - 1
    ) {
      if (finalCorrect > finalWrong) {
        setUserGems(
          (prevUserGems) => prevUserGems + 5 + (5 / 100) * currentBonus,
        );
        console.log("Sorpasso riuscito! 5 gemme assegnate.");
      }

      setQuizOver(true);
    }
  };

  useEffect(() => {
    if (questions && questions.results && questions.results[currentQuestion]) {
      const targetQuestion = questions.results[currentQuestion];

      if (targetQuestion.incorrect_answers) {
        const allAnswers = [...targetQuestion.incorrect_answers];
        allAnswers.push(targetQuestion.correct_answer);
        setMixedAnswers(shuffleArray(allAnswers));
      }
    }
  }, [questions, currentQuestion]);

  // DEBUG
  useEffect(() => {
    console.log(questions?.results[currentQuestion].correct_answer);
  }, [questions, currentQuestion]);

  return (
    <Box
      className="trivia"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />
      <Typography variant="h2">Trivia</Typography>

      <Box className="trivia-container">
        {!started ? (
          <Box
            sx={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Typography variant="h3">
              Score more correct answers than wrong ones to earn 5 (+{" "}
              {(5 / 100) * currentBonus}) gems!
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setStarted(true);
              }}
            >
              Start
            </Button>
          </Box>
        ) : categoryIsChosen ? (
          !isLoadingQuestions &&
          questions &&
          questions.results &&
          questions.results[currentQuestion] ? (
            quizOver ? (
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <Typography variant="h3">Final results:</Typography>
                <Typography variant="h3">
                  Correct: {correct} | Wrong: {wrong}
                </Typography>
                <Typography variant="h3">
                  {correct > wrong
                    ? "You won the quiz and earned " +
                      (5 + (5 / 100) * currentBonus) +
                      " gems!"
                    : "You did not win the quiz..."}
                </Typography>
                <Link to={isSpace ? "/space" : "/"}>
                  <Button variant="contained">Home</Button>
                </Link>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <Typography variant="h3">
                  Correct: {correct} | Wrong: {wrong}
                </Typography>
                <Typography variant="h4">
                  Question {currentQuestion + 1}:{" "}
                  {questions.results[currentQuestion].question}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {mixedAnswers.map((answer, index) => (
                    <Box
                      key={"ans-" + index}
                      sx={{
                        width: "50%",
                        height: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid black",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAnswer(answer)}
                    >
                      <Typography variant="h5">{answer}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )
          ) : (
            <Typography variant="h4">Loading questions...</Typography>
          )
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Typography variant="h3">Choose a category</Typography>
            {!isLoadingCategories && categories ? (
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  overflowY: "auto",
                }}
              >
                {Object.values(categories)[0].map((category: any) => (
                  <Box
                    key={category.id}
                    sx={{
                      width: "calc(20% - 10px)",
                      height: "30%",
                      border: "2px solid black",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setCategoryIsChosen(true);
                      setCategory(category.id);
                    }}
                  >
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                      {category.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="h4">Loading categories...</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Trivia;

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
import { useTranslation } from "react-i18next";

const Trivia = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [categoryIsChosen, setCategoryIsChosen] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [mixedAnswers, setMixedAnswers] = useState<string[]>([]);
  const [quizOver, setQuizOver] = useState<boolean>(false);

  const QUIZ_WON_VALUE = 20;

  const {
    setUserGems,
    isSpace,
    userUpgrades: {
      extraGems: { currentBonus },
    },
  } = useApp();

  const { t } = useTranslation();

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
          (prevUserGems) =>
            prevUserGems +
            QUIZ_WON_VALUE +
            (QUIZ_WON_VALUE / 100) * currentBonus,
        );
        console.log("Sorpasso riuscito! gemme assegnate.");
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
      <Typography variant="h2">{t("trivia.trivia")}</Typography>

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
              {t("trivia.score")} {QUIZ_WON_VALUE} (+{" "}
              {(QUIZ_WON_VALUE / 100) * currentBonus}) gems!
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setStarted(true);
              }}
            >
              {t("trivia.start")}
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
                <Typography variant="h3">
                  {t("trivia.finalResults")}:
                </Typography>
                <Typography variant="h3">
                  {t("trivia.correct")}: {correct} | {t("trivia.wrong")}:{" "}
                  {wrong}
                </Typography>
                <Typography variant="h3">
                  {correct > wrong
                    ? t("trivia.winQuiz") +
                      " " +
                      (QUIZ_WON_VALUE + (QUIZ_WON_VALUE / 100) * currentBonus) +
                      " " +
                      t("home.userInfo.gems") +
                      "!"
                    : t("trivia.noWinQuiz")}
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
                  {t("trivia.correct")}: {correct} | {t("trivia.wrong")}:{" "}
                  {wrong}
                </Typography>
                <Typography variant="h4">
                  {t("trivia.question")} {currentQuestion + 1}:{" "}
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
            <Typography variant="h4">
              {t("trivia.loadingQuestions")}...
            </Typography>
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
            <Typography variant="h3">{t("trivia.choose")}</Typography>
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
                      width: {
                        xs: "calc(100% - 10px)",
                        md: "calc(20% - 10px)",
                      },
                      height: "30%",
                      border: "2px solid black",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
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
              <Typography variant="h4">
                {t("trivia.loadingCategories")}...
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Trivia;

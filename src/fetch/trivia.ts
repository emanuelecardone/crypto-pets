const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTriviaQuiz = async (
  category: number,
  attempt: number = 1,
): Promise<{
  response_code: number;
  results: {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }[];
}> => {
  const tokenUrl = "https://opentdb.com/api_token.php?command=request";
  const MAX_RETRIES = 3;

  try {
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();
    const tokenString = tokenData.token;

    let url = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple&token=${tokenString}`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.response_code === 5) {
      if (attempt <= MAX_RETRIES) {
        console.warn(
          `Rate limit detected (Code 5). Attempt number ${attempt} of ${MAX_RETRIES}. 3 seconds waiting...`,
        );

        await delay(3000);

        return fetchTriviaQuiz(category, attempt + 1);
      } else {
        console.error("Max attempts reached for Rate Limit...");
      }
    }

    if (data.response_code === 4) {
      console.log(
        "Domande esaurite per questa sessione. Reset del token in corso...",
      );
      const tokenResetUrl = `https://opentdb.com/api_token.php?command=reset&token=${tokenString}`;
      await fetch(tokenResetUrl);

      response = await fetch(url);
      data = await response.json();
    }

    return data;
  } catch (error) {
    console.warn("Failed connection, no trivia received", error);
    return { response_code: 0, results: [] };
  }
};

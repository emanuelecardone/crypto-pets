export const fetchTriviaQuizCategories = async (): Promise<{
  trivia_categories: { id: number; name: string }[];
}> => {
  const url = "https://opentdb.com/api_category.php";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`Server KO`);
      return { trivia_categories: [] };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.warn("Failed connection, no trivia received");
    return { trivia_categories: [] };
  }
};

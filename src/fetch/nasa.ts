export const fetchTodayAsteroidsCount = async (): Promise<number> => {
  const NASA_API_KEY = "DEMO_KEY";

  const localDate = new Date().toLocaleDateString("fr-CA");

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${localDate}&end_date=${localDate}&api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        `[NASA API] Server KO o Limite Rate raggiunto (Stato ${response.status}). Attivazione Fallback.`,
      );
      return generateMockAsteroids();
    }

    const data = await response.json();
    const dateKeys = Object.keys(data.near_earth_objects || {});

    if (dateKeys.length === 0) {
      return generateMockAsteroids();
    }

    const asteroidsArray = data.near_earth_objects[dateKeys[0]] || [];
    return asteroidsArray.length;
  } catch (error) {
    console.warn("[NASA API] Connection failed, using fake data...");
    return generateMockAsteroids();
  }
};

const generateMockAsteroids = (): number => {
  return Math.floor(Math.random() * (22 - 8 + 1)) + 8;
};

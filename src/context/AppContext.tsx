import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { Shop } from "../types/shop";
import { shop } from "../data/shop";
import { UserUpgrades } from "../types/userUpgrades";
import { userAllUpgrades } from "../data/userUpgrades";
import { Pets } from "../types/pets";
import { userPets as defaultUserPets } from "../data/userPets";
import { MutationOdds } from "../types/mutationOdds";
import { mutationOdds as allMutationOdds } from "../data/mutationOdds";
import { Mutations } from "../types/mutations";
import { mutations as allMutations } from "../data/mutations";
import { userCharacters } from "../data/userCharacters";
import { cells } from "../data/cells";
import { tutorialTexts } from "../data/tutorial";
import { useNavigate } from "react-router-dom";
import { spaceCells } from "../data/spaceCells";
import { Rebirths } from "../types/rebirths";
import { rebirths as allRebirths } from "../data/rebirths";

interface AppState {
  tutorialWatched: boolean;
  setTutorialWatched: Dispatch<SetStateAction<boolean>>;
  tutorial: string[];
  setTutorial: Dispatch<SetStateAction<string[]>>;
  isSpace: boolean;
  setIsSpace: Dispatch<SetStateAction<boolean>>;
  userCharacter: string;
  setUserCharacter: Dispatch<SetStateAction<string>>;
  userWallet: number;
  petCount: number;
  setUserWallet: Dispatch<SetStateAction<number>>;
  userGems: number;
  setUserGems: Dispatch<SetStateAction<number>>;
  setPetCount: Dispatch<SetStateAction<number>>;
  totalCells: number;
  userPosition: number;
  setUserPosition: Dispatch<SetStateAction<number>>;
  alienPosition: number;
  setAlienPosition: Dispatch<SetStateAction<number>>;
  guardianPosition: number;
  setGuardianPosition: Dispatch<SetStateAction<number>>;
  userSpacePosition: number;
  setUserSpacePosition: Dispatch<SetStateAction<number>>;
  alienRelicFound: boolean;
  setAlienRelicFound: Dispatch<SetStateAction<boolean>>;
  guardianEnigmaSolved: boolean;
  setGuardianEnigmaSolved: Dispatch<SetStateAction<boolean>>;
  currentGoldSpawns: number[];
  setCurrentGoldSpawns: Dispatch<SetStateAction<number[]>>;
  shopUpgrades: Shop;
  setShopUpgrades: Dispatch<SetStateAction<Shop>>;
  userUpgrades: UserUpgrades;
  setUserUpgrades: Dispatch<SetStateAction<UserUpgrades>>;
  goldValue: number;
  setGoldValue: Dispatch<SetStateAction<number>>;
  userPets: Pets;
  setUserPets: Dispatch<SetStateAction<Pets>>;
  userAlienPets: Pets;
  setUserAlienPets: Dispatch<SetStateAction<Pets>>;
  userEarnings: number;
  setUserEarnings: Dispatch<SetStateAction<number>>;
  userGemsEarnings: number;
  setUserGemsEarnings: Dispatch<SetStateAction<number>>;
  asteroidsBonus: boolean;
  setAsteroidsBonus: Dispatch<SetStateAction<boolean>>;
  userAsteroidsBonus: number;
  setUserAsteroidsBonus: Dispatch<SetStateAction<number>>;
  mutations: Mutations;
  setMutations: Dispatch<SetStateAction<Mutations>>;
  mutationOdds: MutationOdds;
  setMutationOdds: Dispatch<SetStateAction<MutationOdds>>;
  rebirths: Rebirths;
  setRebirths: Dispatch<SetStateAction<Rebirths>>;
  isMusicPlaying: boolean;
  currentTrackIndex: number;
  toggleMusic: () => void;
  nextTrack: () => void;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const PLAYLIST = [
    "/track-0.mp3",
    "/track-1.mp3",
    "/track-2.mp3",
    "/track-3.mp3",
    "/track-4.mp3",
  ];

  const [tutorialWatched, setTutorialWatched] = useState<boolean>(false);
  const [userCharacter, setUserCharacter] = useState<string>(userCharacters[0]);
  const [tutorial, setTutorial] = useState<string[]>(tutorialTexts);
  const [isSpace, setIsSpace] = useState<boolean>(false);
  const [alienRelicFound, setAlienRelicFound] = useState<boolean>(false);
  const [guardianEnigmaSolved, setGuardianEnigmaSolved] =
    useState<boolean>(false);
  const [userWallet, setUserWallet] = useState<number>(0);
  const [userGems, setUserGems] = useState<number>(0);
  const [petCount, setPetCount] = useState<number>(0);
  const totalCells = 400;
  const [userPosition, setUserPosition] = useState<number>(0);
  const [userSpacePosition, setUserSpacePosition] = useState<number>(101);
  const [alienPosition, setAlienPosition] = useState<number>(
    spaceCells.buildings.alien.position,
  );
  const [guardianPosition, setGuardianPosition] = useState<number>(
    spaceCells.buildings.alien.position,
  );
  const {
    gold: { possibleSpawns },
  } = cells;
  const [currentGoldSpawns, setCurrentGoldSpawns] = useState<number[]>([]);
  const [shopUpgrades, setShopUpgrades] = useState<Shop>(shop);
  const [userUpgrades, setUserUpgrades] =
    useState<UserUpgrades>(userAllUpgrades);
  const [goldValue, setGoldValue] = useState<number>(20);
  const [userPets, setUserPets] = useState<Pets>(defaultUserPets);
  const [userAlienPets, setUserAlienPets] = useState<Pets>(defaultUserPets);
  const [userEarnings, setUserEarnings] = useState<number>(0);
  const [userGemsEarnings, setUserGemsEarnings] = useState<number>(0);
  const [asteroidsBonus, setAsteroidsBonus] = useState<boolean>(false);
  const [userAsteroidsBonus, setUserAsteroidsBonus] = useState<number>(0);
  const [mutations, setMutations] = useState<Mutations>(allMutations);
  const [mutationOdds, setMutationOdds] =
    useState<MutationOdds>(allMutationOdds);
  const [rebirths, setRebirths] = useState<Rebirths>(allRebirths);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const navigate = useNavigate();

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => console.log("Interazione richiesta:", err));
    }
  };
  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  useEffect(() => {
    if (isSpace) {
      navigate("/space");
    } else {
      navigate("/");
    }
  }, [isSpace]);

  useEffect(() => {
    const interval = setInterval(() => {
      let totalGold = 0;
      Object.values(userPets).forEach((petArray) => {
        petArray.forEach((pet: any) => {
          let petEarnings = pet.earnings || 0;
          if (pet.mutation) {
            petEarnings += pet.earnings * pet.mutation.bonusMultiplier;
          }
          totalGold += petEarnings;
        });
      });
      const finalGoldEarnings =
        totalGold + (totalGold / 100) * userUpgrades.extraGold.currentBonus;

      let totalGems = 0;
      Object.values(userAlienPets).forEach((petArray) => {
        petArray.forEach((pet: any) => {
          let petEarnings = pet.earnings || 0;
          if (pet.mutation) {
            petEarnings += pet.earnings * pet.mutation.bonusMultiplier;
          }
          totalGems += petEarnings;
        });
      });
      const finalGemsEarnings =
        totalGems + (totalGems / 100) * userUpgrades.extraGems.currentBonus;
      setUserEarnings(finalGoldEarnings);
      setUserGemsEarnings(finalGemsEarnings);

      if (finalGoldEarnings > 0) {
        setUserWallet((prevWallet) => prevWallet + finalGoldEarnings);
      }
      if (finalGemsEarnings > 0) {
        setUserGems((prevGems) => prevGems + finalGemsEarnings);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userPets, userAlienPets, userUpgrades]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentGoldSpawns.length >= possibleSpawns.length) {
        return;
      }

      let randomSpawn: number;

      do {
        const randomIndex = Math.floor(Math.random() * possibleSpawns.length);
        randomSpawn = possibleSpawns[randomIndex];
      } while (currentGoldSpawns.includes(randomSpawn));

      setCurrentGoldSpawns([...currentGoldSpawns, randomSpawn]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentGoldSpawns]);

  useEffect(() => {
    const totalBonus =
      (userUpgrades.extraGold.baseValue / 100) *
      userUpgrades.extraGold.currentBonus;

    setGoldValue(userUpgrades.extraGold.baseValue + totalBonus);
  }, [userUpgrades]);

  useEffect(() => {
    audioRef.current = new Audio("../../public" + PLAYLIST[currentTrackIndex]);
    audioRef.current.volume = 0.3;
    audioRef.current.crossOrigin = "anonymous";

    const handleAudioEnded = () => {
      nextTrack();
    };

    audioRef.current.addEventListener("ended", handleAudioEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();

    audioRef.current.src = PLAYLIST[currentTrackIndex];
    audioRef.current.load();

    if (isMusicPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log("Errore riproduzione:", err));
    }
  }, [currentTrackIndex]);

  return (
    <AppContext.Provider
      value={{
        tutorialWatched,
        setTutorialWatched,
        tutorial,
        setTutorial,
        userCharacter,
        setUserCharacter,
        isSpace,
        setIsSpace,
        userWallet,
        petCount,
        setUserWallet,
        alienRelicFound,
        setAlienRelicFound,
        guardianEnigmaSolved,
        setGuardianEnigmaSolved,
        userGems,
        setUserGems,
        setPetCount,
        totalCells,
        userPosition,
        setUserPosition,
        userSpacePosition,
        setUserSpacePosition,
        alienPosition,
        setAlienPosition,
        guardianPosition,
        setGuardianPosition,
        currentGoldSpawns,
        setCurrentGoldSpawns,
        shopUpgrades,
        setShopUpgrades,
        userUpgrades,
        setUserUpgrades,
        goldValue,
        setGoldValue,
        userPets,
        setUserPets,
        userAlienPets,
        setUserAlienPets,
        userEarnings,
        setUserEarnings,
        userGemsEarnings,
        setUserGemsEarnings,
        asteroidsBonus,
        setAsteroidsBonus,
        userAsteroidsBonus,
        setUserAsteroidsBonus,
        mutations,
        setMutations,
        mutationOdds,
        setMutationOdds,
        rebirths,
        setRebirths,
        isMusicPlaying,
        currentTrackIndex,
        toggleMusic,
        nextTrack,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useApp deve essere utilizzato all'interno di un AppProvider",
    );
  }
  return context;
}

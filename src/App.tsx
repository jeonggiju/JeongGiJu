import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import Diary from "./pages/Diary.tsx";
import Exercise from "./pages/Exercise.tsx";
import Today from "./pages/Today.tsx";
import Smoking from "./pages/Smoking.tsx";
import NotFound from "./pages/NotFound.tsx";
import Study from "./pages/Study.tsx";
import { DaysProvider } from "./provider/DaysProvider.tsx";
import { DiariesProvider } from "./provider/DiariesProvider.tsx";
import { DiaryCheck } from "./pages/DiaryCheck.tsx";
import { DayProvider } from "./provider/DayProvider.tsx";

function App() {
  return (
    <>
      <DaysProvider>
        <DiariesProvider>
          <DayProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/DIARY/:page" element={<Diary />} />
              <Route path="/DIARYCHECK/:page" element={<DiaryCheck />} />
              <Route path="/EXERCISE/:page" element={<Exercise />} />
              <Route path="/TODAY/:page" element={<Today />} />
              <Route path="/SMOKING/:page" element={<Smoking />} />
              <Route path="/STUDY/:page" element={<Study />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DayProvider>
        </DiariesProvider>
      </DaysProvider>
    </>
  );
}

export default App;

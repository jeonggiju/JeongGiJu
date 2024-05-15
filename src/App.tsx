import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import Diary from "./pages/Diary.tsx";
import Exercise from "./pages/Exercise.tsx";
import Today from "./pages/Today.tsx";
import Smoking from "./pages/Smoking.tsx";
import NotFound from "./pages/NotFound.tsx";
import Study from "./pages/Study.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/DIARY/:page" element={<Diary />}></Route>
        <Route path="/EXERCISE/:page" element={<Exercise />}></Route>
        <Route path="/TODAY/:page" element={<Today />}></Route>
        <Route path="/SMOKING/:page" element={<Smoking />}></Route>
        <Route path="/STUDY/:page" element={<Study />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

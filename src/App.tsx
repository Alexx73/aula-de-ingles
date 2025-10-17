import { DarkThemeToggle } from "flowbite-react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import Alphabet from "./pages/Alphabet.jsx";
import Numbers from "./pages/Numbers.jsx";
import PersonalInformation from "./pages/PersonalInformation.jsx";
import DialogoPage from "./pages/DialogoPage.jsx";
import DialogoPage2 from "./pages/DialogoPage2.jsx";
import Dialogos from "./pages/Dialogos.jsx";

export default function App() {
  return (
    // Use Vite base so BrowserRouter works when deployed to a subpath (GitHub Pages)
    <Router basename={import.meta.env.BASE_URL}>
      <NavBar />
      <main className="flex flex-col bg-white px-4 py-4 dark:bg-gray-900 dark:text-white">
        <DarkThemeToggle className="absolute right-4 bottom-4" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/dialogo" element={<DialogoPage />} />
          <Route path="/dialogo2" element={<DialogoPage2 />} />
          <Route path="/dialogos" element={<Dialogos />} />

          <Route path="/personal" element={<PersonalInformation />} />

          {/* Añade más rutas según necesites */}
        </Routes>
      </main>
    </Router>
  );
}

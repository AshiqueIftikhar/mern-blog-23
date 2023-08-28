import Home from "./pages/Home";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:name" element={<Article />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

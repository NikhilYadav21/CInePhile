import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from "./store/homeSlice"; 
import Headers from "./components/header/Headers";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Detail from "./pages/details/Detail";
import SearchResult from "./pages/searchResultPage/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { fetchDataFromApi } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  
  useEffect(() => {
    fetchApiConfig();
    genreCall();
  }, []);
  
  const fetchApiConfig = async () => {
    try {
      const data = await fetchDataFromApi("/configuration", { api_key: "a4111ed526d6704485d6f8937a64c3bc" });
      const configUrls = {
        backdrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(configUrls));
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const genreCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};  // Initialize as a regular object
    
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`, { api_key: "a4111ed526d6704485d6f8937a64c3bc" }));
    });
    
    try {
      const data = await Promise.all(promises);
      data.forEach(({ genres }) => {
        genres.forEach((item) => {
          allGenres[item.id] = item;
        });
      });
      dispatch(getGenres(allGenres));
      // console.log(allGenres);
    } catch (err) {
      console.error("Error fetching genres: ", err);
    }
  };

  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="/search/:query" element={<SearchResult />} />         
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

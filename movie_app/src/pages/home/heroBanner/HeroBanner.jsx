import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadimage/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {} = useSelector((state) => state.home);

  const params = useMemo(
    () => ({ api_key: "a4111ed526d6704485d6f8937a64c3bc" }),
    []
  );
  const { data, loading } = useFetch("/movie/upcoming", params);

  useEffect(() => {
    if (data?.results?.length) {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)];
      setBackground(
        `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`
      );
    }
  }, [data]);

  const searchQueryHandler = () => {
    if (query.length > 0) {
      console.log("Searching for:", query); // Debugging output
      navigate(`/search/${query}`);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      searchQueryHandler();
    }
  };

  const handleButtonClick = () => {
    searchQueryHandler();
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions Of Movies, TV Shows To Discover Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <button onClick={handleButtonClick}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;

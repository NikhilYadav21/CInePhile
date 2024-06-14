import React, { useState ,useMemo } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../components/switchTabs/SwitchTab';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
  
    const params = useMemo(
      () => ({ api_key: "a4111ed526d6704485d6f8937a64c3bc" }),
      []
    );
    const { data, loading } = useFetch(`/trending/all/${endpoint}`, params);
  
    const onTabChange = (tab) => {
      setEndpoint(tab === "Day" ? "day" : "week");
    };
  
    return (
      <div className='carouselSection'>
        <ContentWrapper>
          <span className="carouselTitle">Trending</span>
          <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
      </div>
    );
  };
  export default Trending;
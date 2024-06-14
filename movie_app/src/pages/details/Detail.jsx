import React from 'react'
import  {useParams} from "react-router-dom"
import useFetch from '../../hooks/useFetch';
import "./style.scss" ;
import DetailsBanner from './detailBanner/DetailBanner';
import Casts from './cast/Casts';
import VideosSection from './videoSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';

const Detail = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`, { api_key: "a4111ed526d6704485d6f8937a64c3bc" });
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`, { api_key: "a4111ed526d6704485d6f8937a64c3bc" });

  return (
    <div>
        <DetailsBanner
      video={data?.results?.[0]} crew={credits?.crew}
    />
      <Casts data= {credits?.cast} loading= {creditsLoading}/>
      
      <VideosSection data ={data} loading ={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
   
    </div>
    
  
  );
}

export default Detail

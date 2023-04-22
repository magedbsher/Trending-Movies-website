import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  let { id, mediaType } = useParams();
  let [details, setDetails] = useState({});

  async function getTrending(id,mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=8a2851c7b64ed23255eb6f3a919cd306&language=en-US`
    );

    setDetails(data);
    console.log(data);
  }

  useEffect(() => {
    getTrending(id,mediaType);
  }, []);

  return <>
  
  <div className="row">
    <div className="col-md-3">

    {details.poster_path ? <img
            src={'https://image.tmdb.org/t/p/w500'+details.poster_path}
            className="w-100"
            alt=""
          />: <img
          src={'https://image.tmdb.org/t/p/w500'+details.profile_path}
          className="w-100"
          alt=""
        />}
    </div>
    <div className="col-md-6 d-flex align-items-center">
      <div>
      <h2 >{details.title}{details.name}</h2>
<p className="text-muted my-3">{details.overview}{details.biography}</p>
{details.vote_average ? <h4>Vote average : {details.vote_average}</h4>
:""}

{details.vote_count ? <h4>Vote count : {details.vote_count}</h4>
:""}



      </div>
    

    </div>
  </div>
  
  </>;
}

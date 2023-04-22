import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Mediaitem from "../Mediaitem";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTV] = useState([]);
  const [people, setPeople] = useState([]);

  async function getTrending(mediaitem, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=8a2851c7b64ed23255eb6f3a919cd306`
    );

    callback(data.results);

    console.log(data.results);
  }
  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTV);
    getTrending("person", setPeople);
  }, []);

  return (<>
{movies ? <>
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className="brdr w-25 mb-3 "></div>
            <h2 className="h3">
              Trending <br /> Movies <br />
              To watch Now
            </h2>
            <p className="text-muted">Most Watched Movies by Week</p>
            <div className="brdr w-100 mt-3 "></div>
          </div>
        </div>
        {movies.slice(0,10).map((item,index)=><Mediaitem key={index} item={item}/>

        )}
      </div>


      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className="brdr w-25 mb-3 "></div>
            <h2 className="h3">
              Trending <br /> Tv <br />
              To watch Now
            </h2>
            <p className="text-muted">Most Watched Tv by Week</p>
            <div className="brdr w-100 mt-3 "></div>
          </div>
        </div>
        {tv.slice(0,10).map((item,index)=><Mediaitem key={index} item={item}/>

        )}
      </div>





      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className="brdr w-25 mb-3 "></div>
            <h2 className="h3">
              Trending <br /> people <br />
              To watch Now
            </h2>
            <p className="text-muted">Most Watched people by Week</p>
            <div className="brdr w-100 mt-3 "></div>
          </div>
        </div>
        {people.slice(0,10).map((item,index)=><Mediaitem key={index} item={item}/>

        )}
      </div>
    </>:<div className="d-flex vh-100 align-items-center justify-content-center">
      <i className="fa fa-spinner fa-spin fa-8x">

      </i>
      </div>}

    
   
 </> );
}

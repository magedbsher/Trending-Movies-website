import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Tvshow() {


    const [tv, setTv] = useState([]);
    let nums = new Array(10).fill(1).map((number,index)=> index+1)     // for create the number in pagination
    console.log(nums);
  
  
  
    async function getTrending(page) {
      let { data } = await axios.get(
        ` https://api.themoviedb.org/3/discover/tv?api_key=8a2851c7b64ed23255eb6f3a919cd306&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
      );
      setTv(data.results);
      console.log(data.results);
    }
  
    useEffect(() => {
      getTrending(1);
    }, []);
  
    return (
      <>
        <div className="row">
          {tv.map((tv, index) => (
            <div key={index} className="col-md-3 ">
              <Link
                className="text-decoration-none text-white"
                to={`/moviedetails/${tv.id}/tv`}
              >
                <div className="position-relative ">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                    className="w-100 rounded"
                    alt=""
                  />
  
                  <h3>{tv.title}</h3>
                  <div className="vote top-0 end-0 position-absolute p-1 rounded">
                    {tv.vote_average}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <nav className="py-5">
      <ul className="pagination pagination-sm d-flex justify-content-center">
        {nums.map((page,index)=> <li onClick={()=>getTrending(page)} key={index} className="page-item p-1 ">
          <Link className="page-link bg-transparent text-white">{page}</Link>
        </li>) 
         
        }
        
      </ul>
        </nav>
      </>
    );

    
}

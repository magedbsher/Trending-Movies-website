import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function People() {




  const [people, setPeople] = useState([]);
  let nums = new Array(10).fill(1).map((number,index)=> index+1)     // for create the number in pagination
  console.log(nums);



  async function getTrending(page) {
    let { data } = await axios.get(
       `https://api.themoviedb.org/3/person/popular?api_key=8a2851c7b64ed23255eb6f3a919cd306&language=en-US&page=${page}`
    );
    setPeople(data.results);
    console.log(data.results);
  }

  useEffect(() => {
    getTrending(1);
  }, []);

  return (
    <>
      <div className="row">
        {people.map((people, index) => (
          <div key={index} className="col-md-3 ">
            <Link
              className="text-decoration-none text-white"
              to={`/moviedetails/${people.id}/person`}
            >
              <div className="position-relative ">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + people.profile_path}
                  className="w-100 rounded"
                  alt=""
                />

                <h3>{people.name}</h3>
               
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

import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CTX } from "../store";
import { v4 as uuidv4 } from "uuid";
import { getCategories, getData, getMovies } from "./axios";
import ImgMediaCard from "./paper";

function Showcase() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useContext(CTX);

  const history = useHistory();
  const clicked = (data) => {
    history.push("/play");
    dispatch({ type: "SET_CURRENT", payload: data });
  };
  useEffect(() => {
    (async () => {
      let data = await getCategories();
      // for(category in data){
      //     dispatch({type:"ADD_CATEGORIE", payload:{name :category}})
      // }

      data.data.forEach((dt) => {
        dispatch({ type: "ADD_CATEGORIE", payload: { name: dt } });
      });
      data.data.forEach((dt) => {
        async function gtMvs(dt) {
          let data1 = await getMovies(dt);
          dispatch({
            type: "ADD_MOVIES",
            payload: { name: dt, movies: data1 },
          });
          if (dt == data.data[data.data.length - 1]) {
            dispatch({ type: "SET_READY" });
          }
        }
        let y = gtMvs(dt);
      });
    })();
  }, []);
  useEffect(() => {
    if (state.ready) {
      console.log(state.categories);
      state.categories.forEach((cat) => {
        let movies = [];
        if (cat.movies) {
          if (cat.movies.length > 0) {
            cat.movies.forEach((movie) => {
              let y = movie.split(".")[0];

              async function getMv(name) {
                let data11 = await getData(name);

                movies.push({ name, data: data11.data, nameFull: movie });

                if (movies.length === cat.movies.length) {
                  setData((data) => [...data, { name: cat.name, movies }]);
                }
              }
              let datasdsds = getMv(y);
            });

          } else {
            setData((dat) => [...dat, cat]);
          }
        }
      });
      //
    }
  }, [state.ready]);
  return (
    <div
      className="Showcase"
      style={{
        width: "100vw",
      }}
    >
      {data.map((dt1) => {
        if (dt1.movies.length > 0) {
          return (
            //
            <div
              style={{
                width: "100vw",
              }}
              key={uuidv4()}
              className="cat"
            >
              <h1>{dt1.name}</h1>
              <div className="content">
                {dt1.movies.map((dt) => {
                  return (
                    <div
                      key={uuidv4()}
                      onClick={() => {
                        clicked({ ...dt, cat: dt1.name });
                      }}
                      className="movie"
                    >
                      <ImgMediaCard props={dt.data} />
                      {dt.data.hasOwnProperty("Title") ? (
                        <div className="dt">
                          <h2>{dt.name}</h2>
                          <p>{dt.data.Genre.split(",")[0]}</p>
                        </div>
                      ) : (
                        <div className="dt">
                          <h2>{dt.name}</h2>
                          {/* <p>{dt.data.Genre.split('.')[0]}</p> */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            //
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Showcase;

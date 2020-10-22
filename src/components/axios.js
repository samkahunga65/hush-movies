import axios from "axios";
const instance = axios.create({
    // instance: "http://127.0.0.1:8000",
    baseURL: "http://192.168.0.109:4000/",
  });

export async function getData(movieName){
    return axios
    .get(`http://www.omdbapi.com/?apikey=b0202a42&t=${movieName}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}
export async function getData1(movieName, callback){
    return axios
    .get(`http://www.omdbapi.com/?apikey=b0202a42&t=${movieName}`)
    .then((res)=>{
        callback(res)
    })
    
    .catch((err)=>{
        callback(err)
    })
}
export async function getCategories(){
    return axios
    .get(`http://192.168.0.109:4000/categories`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}
export async function getMovies(category){
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ category});
    return axios
    .post(`http://192.168.0.109:4000/movies`, body, config)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}
export async function getMovie(movieName, category){
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ movieName, category });

    return axios
    .post(`http://192.168.0.109:4000/movieStream`, body, config)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export async function getAll(callback){
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    instance.get(`getAll`, config)
    .then((res)=>{
         callback(res)
    })
    .catch((err)=>{
         callback(err)
    })
}

export async function getCategorie(callback){
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    instance
    .get(`getCategories`, config)
    .then((res)=>{
        callback(res)
    })
    .catch((err)=>{
        callback(err)
    })
}

export async function addImage(imgLink, category, movName, callback){
    const config = {
        headers: {
            "Content-Type": "application/json",
          },
      };
      const body = JSON.stringify({ imgLink, category, movName });


     instance
    .post(`addImage`, body, config)
    .then((res)=>{
        callback(res)
    })
    .catch((err)=>{
        callback(err)
    })
}
export async function ifMovie(category, movie, callback){
    const config = {
        headers: {
            "Content-Type": "application/json",
          },
      };
      const body = JSON.stringify({ category, movie });


     instance
    .post(`moviesQM`, body, config)
    .then((res)=>{
        callback(res)
    })
    .catch((err)=>{
        callback(err)
    })
}

export async function noPic(category, moviename, callback){
    const config = {
        headers: {
            "Content-Type": "application/json",
          },
      };
      const body = JSON.stringify({ category, moviename });


     instance
    .post(`noImage`, body, config)
    .then((res)=>{
        callback(res)
    })
    .catch((err)=>{
        callback(err)
    })
}
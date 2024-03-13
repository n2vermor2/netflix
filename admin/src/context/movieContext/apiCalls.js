import { getMoviesFailure, getMoviesStart, getMoviesSuccess, deleteMovieFailure, deleteMovieSuccess, deleteMovieStart, createMovieStart, createMovieSuccess, createMovieFailure, updateMovieStart, updateMovieSuccess, updateMovieFailure } from "./MovieActions"
import axios from 'axios'

export const getMovies = async (dispatch) =>{
    dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
    }catch(err){
        dispatch(getMoviesFailure());
    }
}

//delete
export const deleteMovie = async (id, dispatch) =>{
  dispatch(deleteMovieStart());
try {
  await axios.delete("/movies/"+id, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  dispatch(deleteMovieSuccess(id));
  }catch(err){
      dispatch(deleteMovieFailure());
  }
}

//create
export const createMovie = async (movie, dispatch) =>{
  dispatch(createMovieStart());
try {
  const res = await axios.post("/movies/", movie, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  dispatch(createMovieSuccess(res.data));
  }catch(err){
      dispatch(createMovieFailure());
  }
}

//update
export const updateMovie = async (id, dispatch, movie2) =>{
  dispatch(updateMovieStart());
try {
  await axios.put("/movies/" +id,movie2, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  dispatch(updateMovieSuccess(movie2));
  }catch(err){
      console.error("Error updating movie:", err);
      dispatch(updateMovieFailure());
  }
}
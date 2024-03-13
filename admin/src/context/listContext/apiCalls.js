import { createListFailure, createListStart, createListSuccess, deleteListsFailure, deleteListsStart, deleteListsSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from "./ListActions";
import axios from 'axios'

export const getLists = async (dispatch) =>{
    dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
    }catch(err){
        dispatch(getListsFailure());
    }
}

//delete
export const deleteList = async (id, dispatch) =>{
  dispatch(deleteListsStart());
try {
  await axios.delete("/lists/"+id, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  dispatch(deleteListsSuccess(id));
  }catch(err){
      dispatch(deleteListsFailure());
  }
}

//create
export const createList = async (list, dispatch) =>{
  dispatch(createListStart());
try {
  const res = await axios.post("/lists/",list, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  dispatch(createListSuccess(res.data));
  }catch(err){
      dispatch(createListFailure());
  }
}

//update
export const updateList = async (id, updatedList, dispatch) =>{
  dispatch(updateListStart());
try {
  await axios.put("/lists/"+id,updatedList, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  dispatch(updateListSuccess(updatedList));
  }catch(err){
      console.error("Error updating list:", err);
      dispatch(updateListFailure());
  }
}

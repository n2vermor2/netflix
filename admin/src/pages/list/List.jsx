import { Link, useLocation, useNavigate } from 'react-router-dom'
import './list.css'
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from '../../context/listContext/ListContext';
import { updateList } from '../../context/listContext/apiCalls';

export default function List() {
    const location = useLocation();
    const list = location.state.list;

    const [list2, setList2] = useState({})
    const navigate = useNavigate()

    const {dispatch} = useContext(ListContext)
    const {movies, dispatch: dispatchMovie } = useContext(MovieContext)

    useEffect(()=>{
      getMovies(dispatchMovie);
    },[dispatchMovie]);
  
    const handleChange = (e) =>{
      const value = e.target.value;
      setList2({...list2, [e.target.name]: value});  
    };
  
    const handleSelect = (e)=>{
      let value = Array.from(e.target.selectedOptions, (option)=> option.value);
      setList2({...list2, [e.target.name]: value});
    };
  
    const handleUpdate = (e) =>{
      e.preventDefault();
      const updatedList = {
        ...list,
        ...list2,
        content: [...list.content, ...list2.content]
      };
      updateList(list._id, updatedList, dispatch);
      navigate("/lists");
    };
  return (
    <div className='product'>
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
            <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
            <div className="productInfoTop">
                <span className="productName">{list.title}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{list._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">genre:</span>
                    <span className="productInfoValue">{list.genre}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">type:</span>
                    <span className="productInfoValue">{list.type}</span>
                </div>
            </div>
        </div>
        <div className="productTopRight">
        <div className="addProductItem">
          <label>In this List:</label>
            <select multiple name="content" style={{ height: "340px" }} onChange={handleSelect}>
                {movies.filter((movie) => list.content.includes(movie._id))
                  .map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
            </select>
        </div>
        </div>
      </div>
      <div className="productBottom">
        <form action="" className="productForm">
            <div className="productFormLeft">
                <label>List Title</label>
                <input type="text" name='title' onChange={handleChange} placeholder={list.title} />
                <label>Type</label>
                <input type="text" name='type' onChange={handleChange} placeholder={list.type}/>
                <label>Genre</label>
                <input type="text" name='genre' onChange={handleChange} placeholder={list.genre}/>           
            </div>
        <div className="productFormRight">
          <div className="addProductItem">
            <label>Content</label>
            <select multiple name="content" style={{ height: "340px" }} onChange={handleSelect}>
                {movies.filter((movie) => !list.content.includes(movie._id))
                  .map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
            </select>
        </div>
                <button className="productButton" onClick={handleUpdate}>Update</button>
            </div>
        </form>
      </div>
    </div>
  )
}

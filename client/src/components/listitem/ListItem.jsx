
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import "./listitem.scss";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Link} from "react-router-dom";

export default function ListItem({index, item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    const getMovie = async ()=>{
      try{
        const res = await axios.get('/movies/find/'+item, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  console.log(movie)

  return (
    //<Link to={{ pathname: "/watch", movie: movie  }}>
    <Link className="link" to={"/watch"} state={{movie: movie}}>
      <div className="listitem"   
      style={{left: isHovered && index * 275 -50 + index*2.5}}
      onMouseEnter={()=>setIsHovered(true)} 
      onMouseLeave={()=>setIsHovered(false)}
      >
        <img src={movie.imgSm} alt="" />
        {isHovered && (
          <>
          <video src={movie.trailer} autoPlay = {true} loop ></video>
        <div className="itemInfo">
          <div className="icons">
            <PlayArrow className="icon"/>
            <Add className="icon"/>
            <ThumbUpOutlined className="icon"/>
            <ThumbDownOutlined className="icon"/>
          </div>
          <div className="itemInfoTop">
            <span>{movie.duration}</span>
            <span className="limit">+{movie.limit}</span>
            <span>{movie.year}</span>
          </div>
          <div className="desc">
            {movie.desc}
          </div>
          <div className="genre">{movie.genre}</div>
        </div>
        </>
        )}
      </div>
    </Link>
  ) 
}


import { Link, useLocation, useNavigate } from 'react-router-dom'
import './product.css'
import { Publish } from '@mui/icons-material'
import { useState } from 'react';
import storage from "../../firebase";
import {MovieContext} from '../../context/movieContext/MovieContext'
import { updateMovie } from '../../context/movieContext/apiCalls';
import { useContext } from 'react';

export default function Product() {
    const navigate = useNavigate();
    const location = useLocation();
    const movie = location.state.movie;

    const {dispatch} = useContext(MovieContext)

    const [movie2, setMovie2] = useState(null)

    const [img, setImg] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null)

    const [uploaded, setUploaded] = useState(0)

    const upload = (items) =>{
        items.forEach(item=>{
          const uploadTask = storage.ref(`/items/${item.file.name}`).put(item.file);
          uploadTask.on('state_changed', snapshot=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is' + progress + ' % done');
          },(err)=> {console.log(err)}, ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(url=>{
              setMovie2(prev=>{return {...prev, [item.label]:url};
              });
              setUploaded((prev) => prev + 1);
            });
          });
        })
      }

      const handleUpdate = (e) =>{
        e.preventDefault();
        upload([
          {file: trailer, label: "trailer"},
          {file: video, label: "video"},
          {file: video, label: "img"},
        ]); 
        updateMovie(movie._id, dispatch, movie2);
        navigate('/movies');
      };

    const handleUpload = (e) =>{
        e.preventDefault();
        upload([
          {file: trailer, label: "trailer"},
          {file: video, label: "video"},
          {file: img, label: "img"},
        ]);    
      };

    const handleChange = (e) =>{
        const value = e.target.value;
        setMovie2({...movie2, [e.target.name]: value});
      };

  return (
    <div className='product'>
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newProduct">
            <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
            <div className="productInfoTop"> 
                <img src={movie.img} alt="" className="productInfoImg" />
                <span className="productName">{movie.title}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{movie._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">genre:</span>
                    <span className="productInfoValue">{movie.genre}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">year:</span>
                    <span className="productInfoValue">{movie.year}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">limit:</span>
                    <span className="productInfoValue">{movie.limit}</span>
                </div>
            </div>
        </div>
      </div>
      <div className="productBottom">
        <form action="" className="productForm">
            <div className="productFormLeft">
                <label>Movie Title</label>
                <input type="text" name='title' onChange={handleChange} placeholder={movie.title} />
                <label>Year</label>
                <input type="text" name='year' onChange={handleChange} placeholder={movie.year}/>
                <label>Genre</label>
                <input type="text" name='genre'onChange={handleChange} placeholder={movie.genre}/>
                <label>Limit</label>
                <input type="text" name='limit'onChange={handleChange} placeholder={movie.limit}/>
                <label>Trailer</label>
                <input type="file" name='trailer' onChange={e=>setTrailer(e.target.files[0])} placeholder={movie.trailer}/>
                <label>Video</label>
                <input type="file" name='video' onChange={e=>setVideo(e.target.files[0])}  placeholder={movie.video}/>            
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    <img src={movie.img} alt="" className="productUploadImg" />
                    <label for="file">
                        <Publish className='productFormIcon'/>
                    </label>
                    <input type="file" id='file' name='img' onChange={e=>setImg(e.target.files[0])} style={{display:'none'}}/>
                </div>
                {uploaded === 3 ? (
                    <button className="productButton" onClick={handleUpdate}>Update</button>
                ): (
                    <button className="productButton" onClick={handleUpload}>Upload</button>
                )}
            </div>
        </form>
      </div>
    </div>
  )
}

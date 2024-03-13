import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import './list.scss';
import ListItem from "../listitem/ListItem";
import { useRef, useState} from 'react';

export default function List({list}) {

    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber,setSlideNumber] = useState(0);
    const [clickLimit,setClickLimit] = useState(window.innerWidth / 280);
    const listRef= useRef();

    const handleClick = (direction)=>{  
        let distance = listRef.current.getBoundingClientRect().x-50;
        setIsMoved(true);
        if(direction === "left" && slideNumber>0){
            setSlideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${280+distance}px)`;
        }  
        if(direction === "right" && slideNumber<10 -clickLimit ){
          setSlideNumber(slideNumber+1);
          listRef.current.style.transform = `translateX(${-280+distance}px)`;
      } 
    }

  return (  
    <div className='list'>
      <span className='listTitle'>{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosNewOutlined className='sliderArrow left' onClick={()=>handleClick('left')} style={{display: !isMoved && 'none'}} />
        <div className="container" ref={listRef}>
            {list.content.map((item, i)=>(
              <ListItem index={i} item={item}/>  
            ))}      
        </div>
        <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick('right')} />
      </div>
    </div>
  )
}

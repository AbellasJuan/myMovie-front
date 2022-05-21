import React, { useState } from "react";
import "../../styles/movieRow.css";
import { HiArrowSmRight, HiArrowSmLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function MovieRow ({title, items}){
    const navigate = useNavigate();
    const [scrollX, setScrollX] = useState(-3);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x>0){
            x=0
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 203;

        if((window.innerWidth - listWidth) > x){
            x = (window.innerWidth - listWidth);
        }
        
        setScrollX(x);
    };

    function getMovieInfos(movieId, type){
        navigate(`/review/${type}/${movieId}`)
    };

    return (
        <div className="movieRow">
            <h2> {title} </h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <HiArrowSmLeft style={{fontSize: 40}} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <HiArrowSmRight style={{fontSize: 40}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                        marginLeft: scrollX,
                        width: items.results.length * 219,
                        transition: 'all ease 0.6s',
                }}>
                    {items.results.length > 0 && items.results.map((item, index)=>(
                        <div className="movieRow--item" key={index}>
                            <img  key={index} onClick={() => getMovieInfos(item.id, 'movie')} src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
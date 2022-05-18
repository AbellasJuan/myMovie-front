import React, { useState } from "react";
import "../../styles/movieRow.css";
import { BiArrowFromRight, BiArrowFromLeft } from 'react-icons/bi';

export default function MovieRow ({title, items}){

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
    }

    return (
        <div className="movieRow">
            <h2> {title} </h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <BiArrowFromRight style={{fontSize: 40}} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <BiArrowFromLeft style={{fontSize: 40}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                        marginLeft: scrollX,
                        width: items.results.length * 219,
                        transition: 'all ease 0.6s',
                }}>
                    {items.results.length > 0 && items.results.map((item, index)=>(
                        <div className="movieRow--item" key={index}>
                            <img  key={index} src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
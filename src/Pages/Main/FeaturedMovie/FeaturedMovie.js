import React from "react";
import "../FeaturedMovie/index.css";
import { useNavigate } from "react-router-dom";

export default function FeaturedMovie({item}){
    const navigate = useNavigate();
    
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    };

    function getMovieInfos(movieId, type){
        navigate(`/review/${type}/${movieId}`)
    };

    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            'backgroundRepeat': 'no-repeat',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
            }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.title}</div>
                    <div className="featured--info">
                    <div className="featured--points">{item.vote_average} pontos</div>
                    <div className="featured--year">{item.release_date.slice(0,4)}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                       <div className="featured--button" onClick={()=> getMovieInfos(item.id, 'movie')}> Fazer Crítica </div>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: {genres.join(', ')}</strong></div>
                </div>
            </div>
        </section>
    )
};
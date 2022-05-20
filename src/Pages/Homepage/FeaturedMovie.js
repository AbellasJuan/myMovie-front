import React from "react";
import "../../styles/featuredMovie.css";
import { useNavigate } from "react-router-dom";

export default function FeaturedMovie({item}){
    const navigate = useNavigate();
    let firstDate = new Date(item.first_air_date);

    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    };

    function getMovieInfos(movieId, type){
        console.log('entrou', movieId)
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
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                    <div className="featured--points">{item.vote_average} pontos</div>
                    <div className="featured--year">{firstDate.getFullYear()}</div>
                    <div className="featured--seasons">{item.number_of_seasons} {item.number_of_seasons > 1 ? 'temporadas' : 'temporada'}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                       <div className="featured--button" onClick={()=> getMovieInfos(item.id, 'tv')}> Fazer Crítica </div>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: {genres.join(', ')}</strong></div>
                </div>
            </div>
        </section>
    )
};
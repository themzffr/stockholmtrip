//#region import
import React from 'react';

import NewCard from '../Slider/NewCard';

//#endregion

const WatchList = (props) => {
    return (
        <div className="container-fluid watchList">
            <div className="container-fluid ">
                <div className="list-page">
                    <h1 className="mb-4">{props.Title}</h1>
                </div>
                <div className="new-slider-container none-slider active small mb-3 mb-md-5">
<div className='new-slider'>
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            {props.Array.map((episode) => {
                                return (
                                    <div id={"list_" + episode.Id} className="swiper-slide swiperList" key={episode.Id}>
                                             <NewCard  MediaType={2} product={episode}  />
                                    </div>
                                );
                            })}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WatchList;
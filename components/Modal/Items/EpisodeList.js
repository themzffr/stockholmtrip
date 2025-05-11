//#region import
import React, { useEffect, useState } from 'react';

import { api } from '../../../config/Constants/API';

import Episode from './Episode';
//#endregion

export default function EpisodeList(props) {

    //#region const
    //Tüm yapımları tutar
    const [products, setProducts] = useState(null);
    //Yapımların seon bazlı filtreli halini tutar
    const [shows, setShows] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [showCount, setShowCount] = useState([6]);
    //#endregion

    useEffect(() => {
        if (props.NameForUrl != undefined) {
            (async () => {
                await fetch(api.GetVideos + "?productnameforurl=" + props.NameForUrl).then(response => response.json())
                    .then(data => { setProducts(data); setShows(props.Season > 1 ? data.filter(i => i.Season == 1) : data); })

                return () => {
                    setShows(null);
                }
            })();
        }
    }, [props.NameForUrl])

    const changeSeason = e => {
        setSelectedSeason(e.currentTarget.value);
        setShows(products.filter(i => i.Season == e.currentTarget.value));
        setShowCount(6);
    }

    return (<>
        {
            (products != null && products.length > 0) ?
                <div className="preview-modal-episode">
                    <div className="preview-modal-episode-head">
                        <div className="episode-title">
                            <span>{props.Season > 1 ? "Bölümler" : "İçerikler"}</span>
                            <i className="d-none d-md-inline-block">{props.Season > 1 ? (selectedSeason + ". Sezon") : ""}</i>
                        </div>
                        {props.Season > 1 ? <div className="episode-select radius-5">
                            <select onChange={changeSeason}>
                                {(() => {
                                    const options = [];

                                    for (let i = 1; i <= props.Season; i++) {
                                        options.push(<option key={i} value={i}>{i}. Sezon</option>);
                                    }

                                    return options;
                                })()}
                            </select>
                        </div> : ""}
                    </div>
                    <div className="preview-modal-episode-content">
                        {
                            shows != null ?
                                <>
                                    {
                                        shows.slice(0, showCount).map((season, index) => {
                                            return (<Episode index={index + 1} episode={season} productName={props.NameForUrl} key={season.Id} />);
                                        })}

                                    {shows.length > 6 ?
                                        <a className="episode-more-button text-center radius-5 transition-2" onClick={() => { showCount == 6 ? setShowCount(shows.length) : setShowCount(6) }}>
                                            <span>{showCount == 6 ?
                                                'Daha Fazla Göster' : 'Daha Az Göster'
                                            }</span>

                                            {
                                                showCount == 6 ?
                                                    <svg width={24} height={24} viewBox="0 0 24 24"  >
                                                        <path d="M12 4a1 1 0 0 1 1 1v5.999L19 11a1 1 0 0 1 0 2l-6-.001V19a1 1 0 0 1-2 0v-6.001L5 13a1 1 0 0 1 0-2l6-.001V5a1 1 0 0 1 1-1z" fill="#FFF" fillRule="evenodd" />
                                                    </svg> :
                                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                            }

                                        </a> : <></>}</> : ""}
                    </div>
                </div> : ""}
    </>
    );
}
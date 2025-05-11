//#region import
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

//css
import 'swiper/css';

import { useClicked } from '../../config/Clicked';
import { useAuth } from '../../config/Auth';

//hook
import { useSignIn } from '../../config/Hook/UserHook';
import { useLikeToProduct } from "../../config/Hook/LikeTransactionsHook"
import { useAddList, useRemoveList } from "../../config/Hook/ListTransactionsHook";
import useGetImage from '../../config/Hook/ImageHook';
//#endregion



const Card = ({ sliderList }) => {
    
    //#region const
    const cardRef = useRef();
    const { setClickedId, setModalOpen } = useClicked();
    const { authTokens } = useAuth();

    const signIn = useSignIn();
    const [added, setAdded] = useState(sliderList.IsListAtteched);
    const [liked, setLiked] = useState(sliderList.IsLike);
    const [control, setControl] = useState(false);
    //#endregion

    useEffect(() => {

        if (control === false) {
            setAdded(sliderList.IsListAtteched);
            setLiked(sliderList.IsLike);
        }
    }, [sliderList, liked, added])


    const getPadding = e => {
        setControl(true);
        const sliderCard = e.currentTarget;
        sliderCard.className = "slider-card active";
    }
    const closePadding = e => {
        setControl(false);
        const sliderCard = e.currentTarget;
        sliderCard.className = "slider-card";
    }

    const addList = e => {
        if (authTokens != "null") {
            if (!document.getElementsByClassName("cardList_" + sliderList.Id)[0].classList.contains("active")) {
                useAddList(authTokens.split('|')[1], sliderList.Id, sliderList.Name);

            }
            else {
                useRemoveList(authTokens.split('|')[1], sliderList.Id, sliderList.Name);
            }
        } else {
            signIn();
        }
    }

    const Like = e => {
        if (authTokens != "null") {
            if (!document.getElementsByClassName("cardLike_" + sliderList.Id)[0].classList.contains("active")) {
                useLikeToProduct(authTokens.split('|')[1], sliderList.Id, sliderList.Name, true);
            }
            else {
                useLikeToProduct(authTokens.split('|')[1], sliderList.Id, sliderList.Name, false);
            }
        } else {
            signIn();
        }
    }
    const openModal = () => {
        localStorage.setItem("scroll", document.documentElement.scrollTop);

        setModalOpen(true);
        setClickedId(sliderList.Id);
    }

    return (
        <div className="slider-card " ref={cardRef} onMouseOver={getPadding} onMouseOut={closePadding}>
            <Link href={"/izle/" + sliderList.NameForUrl} className="img-holder _300x168">
                <img src={useGetImage(sliderList.MediaAssets, ["300x168", "450x252"])} data-src={useGetImage(sliderList.MediaAssets, ["300x168", "450x252"])} width={300} height={168} className="lazyloaded" alt={sliderList.Name} />
            </Link>
            <div className="slider-card-text">
                <div className="slider-card-text-content" >
                    <div className="slider-card-title-area">
                        <span className="slider-card-title">{sliderList.Name}</span>
                        <span className="slider-card-time"></span>
                    </div>
                    <div className="slider-card-category">
                        <Link href={"/kesfet/" + sliderList.CategoryNameForUrl} className="radius-5">{sliderList.CategoryName}</Link>
                        {sliderList.Types ? sliderList.Types.map(types => {
                            const { Id, Name, NameForUrl } = types;
                            return <Link key={Id} href={"/kesfet/" + sliderList.CategoryNameForUrl + "/" + NameForUrl} onClick={() => { setModalOpen(false); }} >{Name}</Link>
                        }) : <></>}
                    </div>
                    <div className="slider-card-buttons">
                        <div>
                            <Link href={"/izle/" + sliderList.NameForUrl + (sliderList.VideoNameForUrl != null ? ("/" + sliderList.VideoNameForUrl) : "")} className="slider-card-buttons-play radius-5">
                                <svg width={24} height={24} viewBox="0 0 24 24"  >
                                    <path d="m7.605 3.22 11.279 8.57a1 1 0 0 1-.05 1.628L7.557 20.96A1 1 0 0 1 6 20.128V4.016a1 1 0 0 1 1.605-.796z" fill="#15182A" fillRule="evenodd" />
                                </svg>
                            </Link>
                            <a onClick={addList} className={
                                'cardList_' + sliderList.Id + ' slider-card-buttons-add-list radius-5' + (added ? ' active' : '')
                            } />
                        </div>
                        <div> <a onClick={Like} className={
                            'cardLike_' + sliderList.Id + ' slider-card-buttons-like radius-50' + (liked ? ' active' : '')
                        } >
                            <svg width={26} height={24} viewBox="0 0 26 24"  >
                                <path d="M24.019 17.525c1.094 0 1.981-.908 1.981-2.029 0-1.12-.887-2.029-1.981-2.029h-.566v-.016c1.094 0 1.981-.909 1.981-2.03 0-1.12-.887-2.028-1.98-2.028v-.012l-7.874.102c1.522-2.733 1.51-5.828 1.298-7.718C16.766.76 15.938 0 14.951 0c-.973 0-1.79.74-1.923 1.726-.437 3.246-1.936 4.583-3.299 6.563C8.147 10.587 8 13.224 8 13.224v7.168C8 22.385 9.577 24 11.523 24h11.93c.767 0 1.39-.637 1.39-1.422 0-.786-.623-1.423-1.39-1.423.975 0 1.765-.809 1.765-1.806 0-.998-.79-1.807-1.765-1.807v-.017h.566zM4.638 24H1.362C.61 24 0 23.43 0 22.727V11.273C0 10.57.61 10 1.362 10h3.276C5.39 10 6 10.57 6 11.273v11.454C6 23.43 5.39 24 4.638 24" fill="#FFF" fillRule="evenodd" />
                            </svg>
                        </a>
                        </div>
                    </div>
                    <a onClick={openModal} className="slider-card-more-button" >
                        <span>Daha Fazla</span>
                        <svg width={24} height={24} viewBox="0 0 24 24"  >
                            <path d="M6.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#FFF" fillRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div >
    );
}
export default Card;

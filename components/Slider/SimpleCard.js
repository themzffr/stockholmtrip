//#region import
import React from 'react';
import Link from 'next/link';
import useGetImage from '../../config/Hook/ImageHook';
//#endregion

const SimpleCard = (props) => {

    const sliderList = props.sliderList;

    return (

        <div className="slider-card ">
            <Link href={"/izle/" + props.productUrl + "/" + sliderList.NameForUrl} className="img-holder _300x168">
                <img src={useGetImage(sliderList.MediaAssets, ["300x168", "450x252","128x72"])} data-src={useGetImage(sliderList.MediaAssets, ["300x168","450x252", "128x72"])} width={300} height={168} className="lazyloaded" alt={sliderList.Name} loading="lazy"/>

            </Link>
            <div className="slider-card-text">
                <div className="slider-card-text-content" >
                    <div className="slider-card-title-area">
                        <span className="slider-card-title">{sliderList.Name}  </span>
                        <span className="slider-card-time"></span>
                    </div>

                </div>


            </div>
        </div>




    );
}
export default SimpleCard;
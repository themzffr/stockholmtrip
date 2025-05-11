//#region import
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';




export default function NewCard({ product }) {

   
    return (

        <div className={"new-slider-item liste"} aria-label={""}>

            <div className={"img-holder " + ("_195x260")} >
                <img style={{ height: "100%", objectFit: "cover" }} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+product.photos[0]?.photo_reference+"&key=AIzaSyAMtmFiOtTLdyj6qouc9q_97S9oBCtbm_s"
} data-src="temp/195x260-3.jpg" width={"195"} height={ "260"} className=" lazyloaded" alt={""} loading="lazy" />
            </div>

            <div className="new-slider-hover active">
               
           
                <span className="new-slider-hover-title">{product.name}</span>
                <span className="new-slider-hover-info">
                    <i>{}</i>
                  
                </span>
            </div> <Link style={{
                position: "absolute",
                zIndex: 10, width: "85%", top: 0, left: 0, height: "100%"
            }} href="#" className="slider-card-buttons-play radius-5" >
            </Link>

        </div>

    )
}

//#region import
import React, { useState, useRef, useEffect, useCallback } from 'react';

import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import SwiperCore, { Navigation } from 'swiper';
import NewCard from './NewCard';

//#endregion

SwiperCore.use([Navigation]);


const Slidersipper = (props) => {

    const sliderListem = props.sliderListem?.filter(i => i.MediaAssets.filter(j => j.AssetAttribute === (props.MediaType ? (props.MediaType === 1 ? "195x260" : "300x168") : "300x168")).length > 0);

 
    const [perView, setPerview]=useState(6)
const sliderRef=useRef(null);


    const [isActive, setIsActive] = useState(false);
    const getPadding = () => {
        document.body.style.touchAction= 'none';
        setIsActive(true);
    }
    const closePadding = () => {
        setIsActive(false);
        document.body.style.touchAction = 'auto';
    }


    useEffect(() => {
        const updatePerview = () => {
          setPerview(window.innerWidth > 768 ? parseInt((window.innerWidth - 50) / 264) : window.innerWidth / 207);
        };
    
        // İlk render'da çalıştırılsın diye
        updatePerview();
    
        // Event listener'ı ekleyelim
        window.addEventListener("resize", updatePerview);
    
        // Component unmount olduğunda event listener'ı temizleyelim
        return () => {
          window.removeEventListener("resize", updatePerview);
        };
      }, []); 

    return (

        <div className={props.MediaType? props.MediaType=="podcast"? "podcast-slider" :"new-slider ":isActive ? 'default-slider mb-2 active' : 'default-slider mb-2'} >
<Swiper
    modules={[Navigation]}
    slidesPerView={"auto"}

  
    ref={sliderRef}
    navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }}
  speed={200}
    onSlideChangeTransitionStart={()=>{
        document.body.style.touchAction= 'none';
      }}
      onSlideChangeTransitionEnd={()=>{
        document.body.style.touchAction= 'auto';
      }}
    direction="horizontal"
>
    {sliderListem.map((sliderListem, index) => (
        <SwiperSlide
         
          
            key={sliderListem.Id}
        >
            {props.MediaType
                ? 
              <NewCard list={props.list} moduleId={props.id} MediaType={props.MediaType} product={sliderListem} DataType={props.DataType} />
                : <Card sliderList={sliderListem} />
            }
        </SwiperSlide>
    ))}

{sliderListem.length>perView && <div className="swiper-button-next" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-b10107388bead99d6f" aria-disabled="false"></div>
  }  
  {sliderListem.length>perView &&<div className="swiper-button-prev swiper-button-disabled" tabIndex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-b10107388bead99d6f" aria-disabled="true"></div>
}</Swiper>
        </div>

    );
}
export default Slidersipper;





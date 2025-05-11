//#region import
import React, { useState } from 'react';

//css
import '../../assets/css/swiper.min.css';
import '../../assets/css/player.css';

//item
import SimpleCard from './SimpleCard';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
//#endregion

SwiperCore.use([Navigation]);

const SimpleSlider = (props) => {

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    const sliderListem = props.sliderListem;
    const sliderOpen = props.sliderOpen;

    return (

        <div className={sliderOpen ? 'swiper swiper-initialized swiper-horizontal swiper-pointer-events mb-2 block' : 'swiper swiper-initialized swiper-horizontal swiper-pointer-events mb-2'} >

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}


            >
                {sliderListem.map((sliderListem) => {
                    return (<SwiperSlide className="swiper-wrapper" key={sliderListem.Id}>  <SimpleCard sliderList={sliderListem} productUrl={props.productNameForUrl} /></SwiperSlide>);
                })
                }



                <div className="swiper-button-prev d-none" ref={navigationPrevRef} >       <svg width={27} height={50} viewBox="0 0 27 50"  >
                    <path d="M26 1 2 25l24 24" stroke="#FFF" strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" />
                </svg> </div>
                <div ref={navigationNextRef} className="swiper-button-next d-none" >      <svg width={27} height={50} viewBox="0 0 27 50"  >
                    <path d="m1 1 24 24L1 49" stroke="#FFF" strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" />
                </svg> </div>


            </Swiper>
        </div>

    );
}
export default SimpleSlider;
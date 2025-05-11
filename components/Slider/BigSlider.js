import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';

import { Navigation, Pagination } from "swiper";



import BigCard from './BigCard';

export default function BigSlider({list, Id}) {

 

  const handleScroll = (e) => {
    e.preventDefault();
  };




    // useEffect(() => {
    //   const swiperElement = document.querySelector('.big_'+Id);
    //     const swiper = new Swiper(swiperElement, {
    //      loop:true,
    //       slidesPerView: "auto",
        
    //       speed:200,
    //       resistance:0.9,
         
    //       navigation: {
    //         nextEl: '.bigSlider-widget-next',
    //         prevEl: '.bigSlider-widget-prev',
    //       },
    //    pagination: {
    //       el: `.bigSliderPagination_${Id}`,
    //       clickable: true,
    //     },
    //      direction:"horizontal",
    //       on:{slideChangeTransitionStart:()=>{
    //         document.body.style.touchAction= 'none';
    //         document.body.style.overflow='none';
    //       },
    //     slideChangeTransitionEnd:()=>{
    //       document.body.style.touchAction= 'auto';
    //       document.body.style.overflow='auto';
    //     }
    //     }
    //     });
        
    //     return () => {
     
    //     };
       
    //   }, []);
    
      return (
        <div className={"big-slider mb-3 mb-md-5 lazyloaded "}>
          <div className={"swiper big-swiper big_"+Id}>
          <Swiper
                        modules={[Navigation, Pagination]}
          
                        slidesPerView={1}
                   
                        onDragStart={()=>{
                          document.body.style.touchAction= 'none';
                          document.body.style.pointerEvents = 'none'
                      }}
                      onDragEnd={()=>{
                          document.body.style.pointerEvents = 'auto'
                          document.body.style.touchAction= 'auto';
                      }}
                          onSlideChangeTransitionStart={()=>{
                            document.body.style.touchAction= 'none';
                          }}
                          onSlideChangeTransitionEnd={()=>{
                            document.body.style.touchAction= 'auto';
                          }}
                        navigation={{
                          nextEl: '.bigSlider-widget-next',
                          prevEl: '.bigSlider-widget-prev',
                        }}
                        pagination={{
                        }}
                        direction="horizontal"
                   
        
                      speed={200}
                     
                     
                        loop={true}
                    >
            <div 
            className="swiper-wrapper">
            {list.filter(item=>item.MediaAssets.filter(i => i.AssetAttribute == "1920x473").length>0).map((item) => {
                        return (<SwiperSlide 
                        
                        
                        key={item.Id } > 
                
                      <BigCard product={item} />
               
                        
                         </SwiperSlide>);
                    })
                    }
            </div>
    {list.filter(item=>item.MediaAssets.filter(i => i.AssetAttribute == "1920x473").length>0).length>1?
      <React.Fragment><div className={"swiper-button-next bigSlider-widget-next"}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83999 28.0131C9.99481 28.1683 10.1787 28.2915 10.3812 28.3755C10.5837 28.4595 10.8008 28.5027 11.02 28.5027C11.2392 28.5027 11.4563 28.4595 11.6588 28.3755C11.8613 28.2915 12.0452 28.1683 12.2 28.0131L23.28 16.9331C23.4036 16.8097 23.5017 16.6632 23.5686 16.5019C23.6355 16.3406 23.6699 16.1677 23.6699 15.9931C23.6699 15.8185 23.6355 15.6456 23.5686 15.4843C23.5017 15.323 23.4036 15.1765 23.28 15.0531L12.2 3.9731C11.5467 3.31977 10.4933 3.31977 9.83999 3.9731C9.18666 4.62643 9.18666 5.67977 9.83999 6.3331L19.4933 15.9998L9.82666 25.6664C9.18666 26.3064 9.18666 27.3731 9.83999 28.0131Z" fill="white"/>
            </svg>
          </div>
          <div className={"swiper-button-prev bigSlider-widget-prev "}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.16 3.98641C22.0052 3.8312 21.8213 3.70806 21.6188 3.62404C21.4163 3.54001 21.1992 3.49677 20.98 3.49677C20.7608 3.49677 20.5437 3.54001 20.3412 3.62404C20.1387 3.70806 19.9548 3.8312 19.8 3.98641L8.72 15.0664C8.5964 15.1898 8.49834 15.3363 8.43143 15.4976C8.36452 15.6589 8.33008 15.8318 8.33008 16.0064C8.33008 16.181 8.36452 16.3539 8.43143 16.5152C8.49834 16.6765 8.5964 16.8231 8.72 16.9464L19.8 28.0264C20.4533 28.6797 21.5067 28.6797 22.16 28.0264C22.8133 27.3731 22.8133 26.3197 22.16 25.6664L12.5067 15.9997L22.1733 6.33308C22.8133 5.69308 22.8133 4.62641 22.16 3.98641Z" fill="white"/>
            </svg>  
                                              
          </div>
          <div className={'swiper-pagination bigSlider-widget-pagination ' + `bigSliderPagination_${Id}`}></div>
      </React.Fragment>:""
    }
            </Swiper>
          </div>
        
        </div>)
}

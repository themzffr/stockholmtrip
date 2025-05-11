import React from 'react'
import NewSlider from "./EditorialSlider";
import useGetImage from '../../config/Hook/ImageHook';

export default function EditorialSlider({list, title, MediaType, modulImages, ModuleType , Id}) {



  return (
<div className="special-widget mb-3 mb-md-5 "  >
      <div className="special-widget-title">{title}</div>
      <div className="special-widget-bg">
        <picture>
          <source srcSet={useGetImage(modulImages, ["1920x468"]) }width="1920" height="468" media="(min-width: 768px)" />
          <img src={useGetImage(modulImages, ["767x321"])}  width="767" height="321"  alt={title} />
        </picture>
      </div>
      <div className="special-widget-left">
        <picture>
          <source srcSet={useGetImage(modulImages, ["274x354"])} width="274" height="354" media="(min-width: 768px)" />
          <img src={useGetImage(modulImages, ["222x165"])}  width="222" height="165"  alt={title} />
        </picture>
      </div>
      <div className="special-widget-right">
        <div className="special-widget-slider">
        <NewSlider Id={Id}  MediaType={MediaType} list={list} ModuleType={ModuleType}  />
        </div>
      </div>
    </div>
  )
}

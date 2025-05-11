import React from 'react'
import NewSlider from "./EditorialSlider";


export default function EditorialSlider({list, title, Id}) {



  return (
<div className="special-widget mb-3 mb-md-5 "  >
      <div className="special-widget-title">{title}</div>
      <div className="special-widget-bg">
      <picture>
          <source srcSet={"https://images.unsplash.com/photo-1509356843151-3e7d96241e11?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2tob2xtfGVufDB8fDB8fHww" }width="1920" height="468" media="(min-width: 768px)" />
          <img src={"https://images.unsplash.com/photo-1509356843151-3e7d96241e11?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2tob2xtfGVufDB8fDB8fHww"}  width="767" height="321"  alt={title} />
        </picture> 
      </div>
      <div className="special-widget-left">
      <div className='main-title mt-5'>
      <h2  >Stockholm Google Önerileri</h2>
          </div>  
      </div>
      <div className="special-widget-right">
        <div className="special-widget-slider">
        <NewSlider Id={Id}  list={list}  />
        </div>
      </div>
    </div>
  )
}

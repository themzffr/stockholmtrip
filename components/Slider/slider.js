<Swiper
modules={[Navigation]}
slidesPerView={'auto'}
longSwipesRatio={0.1}
resistance={0.9}
speed={200}
ref={sliderRef}
navigation={{
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
}}

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
    document.body.style.overflow='none';
  }}
  onSlideChangeTransitionEnd={()=>{
    document.body.style.touchAction= 'auto';
    document.body.style.overflow='auto';
  }}
observer={true} // Dinamik değişiklikleri dinlemek için observer'ı etkinleştir
>
{sliderListem.filter((i) => i.MediaAssets.filter((j) => j.AssetAttribute === (props.MediaType ? (props.MediaType === 1 ? '195x260' : '300x168') : '300x168')).length > 0).map((sliderListem, index) => (
  <SwiperSlide
    onMouseOver={getPadding}
    onPointerEnter={getPadding}
    onMouseOut={closePadding}
    onPointerOut={closePadding}
    key={sliderListem.Id}
    onPointerOver={()=>{  document.body.style.touchAction = 'none';
    document.body.style.overflow = 'none';}}
    onPointerLeave={()=>{  document.body.style.touchAction = 'auto';
    document.body.style.overflow = 'auto';}}
  >
    {props.MediaType ? (
      props.MediaType === 'podcast' ? (
        <PodcastCard product={sliderListem} index={index} />
      ) : (
        <NewCard list={props.list} moduleId={props.id} MediaType={props.MediaType} product={sliderListem} DataType={props.DataType} />
      )
    ) : (
      <Card sliderList={sliderListem} />
    )}
  </SwiperSlide>
))}
{showArrows && (
  <>
    <div className="swiper-button-next" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-b10107388bead99d6f" aria-disabled="false"></div>
    <div className="swiper-button-prev swiper-button-disabled" tabIndex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-b10107388bead99d6f" aria-disabled="true"></div>
  </>
)}
</Swiper>
import Head from 'next/head'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, FreeMode, Thumbs, Autoplay } from 'swiper';


import 'swiper/css';

export default function Home() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
const places = [{
            "name": "Stockholm Royal Palace",
            "type": "Müze / Tarihi Yapı",
            "location": "Gamla Stan",
            "entry_fee": "200220 SEK",
            "visit_duration": "1.52 saat",
            "note": "Kraliyet Ailesi'nin resmi konutu. Saray içinde birkaç müze de bulunuyor.",
            "image_url": "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/344000/344609-Stockholm-Royal-Palace-Stockholms-Slott.jpg"
        },
        {
            "name": "Riddarholm Church",
            "type": "Müze / Tarihi Yapı",
            "location": "Riddarholmen",
            "entry_fee": "4050 SEK",
            "visit_duration": "30-45 dakika",
            "note": "İsveç kraliyet ailesi üyelerinin mezarları burada.",
            "image_url": "https://www.campervansweden.com/assets/img/blog/639.png"
        },
        {
            "name": "Vasa Museum",
            "type": "Müze",
            "location": "Djurgården",
            "entry_fee": "230 SEK",
            "visit_duration": "2-3 saat",
            "note": "1600’lerden kalma batık bir savaş gemisi sergileniyor.",
            "image_url": "https://www.vasamuseet.se/globalassets/vasamuseet/bilder/start/skeppet-sidan-akter-1900-800.jpg"
        },
        {
            "name": "National Nuseum",
            "type": "Müze",
            "location": "Blasieholmen",
            "entry_fee": "160 SEK (Perşembe 17:00-20:00 arası ücretsiz)",
            "visit_duration": "1.52 saat",
            "note": "İsveç ve Avrupa sanatına dair büyük koleksiyonlar.",
            "image_url": "https://lp-cms-production.imgix.net/2023-05/iStock-1411962669.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75"
        },
        {
            "name": "Stockholm German Church (Tyska Kyrkan)",
            "type": "Müze / Tarihi Yapı",
            "location": "Gamla Stan",
            "entry_fee": "30 SEK",
            "visit_duration": "30-45 dakika",
            "note": "",
            "image_url": "https://us.images.westend61.de/0000627357pw/sweden-stockholm-view-to-gamla-stan-with-german-church-in-the-evening-light-MSF004676.jpg"
        },
        {
            "name": "Gustaf Vasa Church",
            "type": "Müze / Tarihi Yapı",
            "location": "Vasastan",
            "entry_fee": "Ücretsiz",
            "visit_duration": "30-45 dakika",
            "note": "",
            "image_url": "https://media-cdn.sygictraveldata.com/media/1200x630/612664395a40232133447d33247d38313137373032303432"
        },
        {
            "name": "Fika and Wine Cafe",
            "type": "Kafe",
            "location": "Gamla Stan",
            "price": "Kahve + atıştırmalık 70100 SEK",
            "visit_duration": "45-60 dakika",
            "note": "",
            "image_url": "https://www.bizevdeyokuz.com/wp-content/uploads/Cafe-Pascal-stockholm-1.jpg"
        },
        {
            "name": "Stora Bageriet",
            "type": "Kafe",
            "location": "Östermalm",
            "price": "Tatlılar ve içecekler 6090 SEK",
            "visit_duration": "30-45 dakika",
            "note": "",
            "image_url": "https://live.staticflickr.com/65535/53710955662_4e143ab2d7_b.jpg"
        },
        {
            "name": "Aifur Krog & Bar",
            "type": "Restoran",
            "location": "Gamla Stan",
            "price": "Ana yemek 225 SEK / Kişi başı 450-500 SEK",
            "visit_duration": "1.52 saat",
            "note": "Viking temalı, müzikli ve eğlenceli atmosfer.",
            "image_url": "https://img.atlasobscura.com/R6ZKW4ECZTMN30qI-y07MdGFU9NC6Pn12T_L5dHqIdk/rt:fit/w:1200/q:80/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9lMWY0/YWNiMC02N2U2LTQx/MDgtOTIzYi1lMGU5/YTM0YTM2OWE0ODdk/ZDlmNGJmN2E0NzBi/YTVfYWlmdXJfZ3Jp/Z29yaXNrYXIuanBn.jpg"
        },
        {
            "name": "Den Gyldene Freden",
            "type": "Restoran",
            "location": "Österlånggatan 51, Gamla Stan",
            "price": "Ana yemekler 200-300 SEK / Toplam ortalama 450600 SEK",
            "visit_duration": "1.5 saat",
            "note": "1722’den beri açık, İsveç Akademisi burada toplanıyor.",
            "image_url": "https://www.visitstockholm.com/media/images/pelikan.width-1020.jpg"
        },
        {
            "name": "Gamla Stan",
            "type": "Bölge",
            "location": "Stockholm",
            "entry_fee": "Ücretsiz",
            "visit_duration": "2-3 saat",
            "note": "Eski şehir bölgesi, tarihi sokaklar, hediyelikler.",
            "image_url": "https://as2.ftcdn.net/v2/jpg/03/86/57/25/1000_F_386572548_wqxif9YzWz1RQhTEYDmPWADaWiEoYL9L.jpg"
        },
        {
            "name": "Fjäderholmarna Adası",
            "type": "Doğa / Gezi",
            "location": "Stockholm",
            "entry_fee": "Feribot Ücreti: Gidişdönüş yaklaşık 195 SEK",
            "visit_duration": "3-4 saat (yarım gün)",
            "note": "El yapımı hediyelikler, deniz kenarı restoranlar.",
            "image_url": "https://www.visitstockholm.com/media/images/18072019_Fjaderholmarna-sommar-vatten-byggnad.width-1280.jpg"
        }
    ];


  return (
    <>
      <Head>
        <title>Stockholm Plans</title>
        <meta name="description" content="2025 Stockholm Plans" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
   
      </Head>
      <main  className='container p-md-5'>
        <div className='justify-content-center align-items-center'>
          <div className='main-title'>
      <h1  >Stockholm Gezi Rehberi</h1>
          </div>      <div className='hero-slider m-5'>
      <Swiper spaceBetween={50} slidesPerView={1}
       modules={[Navigation, Pagination]}
       direction="horizontal"
       resistance={0.9}
     speed={200}
       longSwipesRatio={0.1}
       
     
         navigation= {{
           nextEl: ".hero-slider .swiper-button-next",
           prevEl: ".hero-slider .swiper-button-prev",
       }}
       pagination= {{
           el: ".hero-slider .swiper-pagination",
       }}
       loop={ true}>
          <div className='swiper-wrapper'>
        {places?.map((place, index) => (
          <SwiperSlide key={index}>
      <div className="hero-slider-text">
      <div className="hero-slide-small-image">
              <h2 className="hero-slider-title">{place.name}</h2>
              </div>
              <p className="hero-slider-spot">Tür: {place.type}
              <br/>Konum :{place.location}
              <br/>Ücret : {place.entry_fee}
              <br/>Tahmini Süre : {place.visit_duration}
              <br/>Not : {place.note}</p>
  </div>
  <div className="hero-slider-image">
  <picture>
              <img src={place.image_url} alt={place.name} width={1920} height={1080}  />
              </picture>
              </div>
          
          </SwiperSlide>
        ))}
      </div>
         <div className="swiper-button-next" ref={navigationNextRef}>
                    <svg width="27" height="50" viewBox="0 0 27 50" xmlns="http://www.w3.org/2000/svg">
                            <path d="m1 1 24 24L1 49" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                        </svg>
                    </div>
                    <div className="swiper-button-prev" ref={navigationPrevRef}>
                    <svg width="27" height="50" viewBox="0 0 27 50" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 1 2 25l24 24" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                        </svg>
                    </div>
         <div className="swiper-pagination"></div>
      </Swiper>
      </div>
      </div>
      </main>
    </>
  )
}

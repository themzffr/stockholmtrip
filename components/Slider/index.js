//#region import
import React, { useState, useEffect } from 'react';

//config
import { api } from '../config/Constants/API';
import { useGetUserId } from '../config/Hook/UserHook';


//items


// Import the Error component dynamically
import Error from'../pages/404';

// Import the other components dynamically
import BigSlider from'../components/Slider/BigSlider';
import Slidersipper from'../components/Slider/Slidersipper';
import HeroSlider from'../components/Hero/HeroSlider';
import EditorialSlider from'../components/Slider/EditorialArea';
import { useRouter } from 'next/router';
import { useClicked } from '../config/Clicked';
import { useAuth } from '../config/Auth';
//#endregion

export default function Index({ heros, modules, error, userList }) {

    //#region showCount
    const [showCount, setShowCount] = useState(3);
    const {  setHomeList, homeList } = useClicked();
    const {authTokens}=useAuth()
    const router=useRouter();


    useEffect(()=>{
if(userList.length>0)
{setHomeList(userList);}

      return()=>{
        setHomeList([])
      }
    }, [router])



    useEffect(()=>{
if(homeList.length>0)
{      setHomeList(homeList);
}
            
          }, [homeList])

          useEffect(()=>{
            window.addEventListener("scroll", ()=>{setShowCount(99)})
          }, [])

    //#endregion

    return (
        error ? <Error /> :
            <>{
                <div className="container-fluid ">
                    { <HeroSlider heros={heros} />}

                       


{modules.slice(0, showCount).map((show, index) => {
 let filteredProducts=   show.Products.filter(i=>i.MediaAssets.filter(j=>j.AssetAttribute==( show.ModuleType==2? "1920x473": show.MediaType==1?"195x260":"300x168" )).length>0);
     
  switch (show.ModuleType) {
    case 3:
      let mediaData=  JSON.parse(show.MediaAssetsJson);
      return (
      <>
      {
mediaData.filter(i=>i.AssetAttribute=="1920x468" || i.AssetAttribute=="767x321").length>1 && 
filteredProducts.length>0
       ?
       <EditorialSlider Id={show.Id} MediaType={1} modulImages={mediaData} ModuleType={show.ModuleType} list={filteredProducts} title={show.Name} key={show.Id} />
 :<></>
      }
         
     
      </>);

     
    case 2:
      return (

    <BigSlider  list={show.Products} key={show.Id} Id={show.Id} />

   
      );
    default:
      
      return (<div key={show.Id}>
   { filteredProducts.length>0?
    <div className='new-slider-container small mb-3 mb-md-5'  > 
          <div className="new-slider-title">{show.Name}</div>
          <Slidersipper  id={show.Id} MediaType={show.MediaType} DataType={show.DataType}  sliderListem={filteredProducts} />
        </div>:<></>
   }
        
        {(homeList.length>0 && index==1 && authTokens!="null")&& <div className='new-slider-container small mb-3 mb-md-5 liste'>
    <div className="new-slider-title">Listem</div>

<Slidersipper sliderListem={homeList} MediaType={2} list={true}  /> </div> }
           </div>
      );
  }
})
}

                   </div>}
                   
                   
             
                   
                   </>
    );
}

export async function getServerSideProps({ req }) {
    try {
        const userId = useGetUserId(req);

        return {
            props: {
                heros: await fetch(api.GetHero + "?ishomehero=true" + "&userId=" + userId).then(res => res.json()),
                modules: await fetch(api.GetModules+  "?userId=" + userId ).then(res => res.json()),
                userList: await fetch(api.GetUserProducts + "?userId=" + userId).then(res => res.json())
            }
        };
    }
    catch (e) {
        return {
            props: {
                error: true,
            },
        }
    }
}

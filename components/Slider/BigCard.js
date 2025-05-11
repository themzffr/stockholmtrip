import React, {useState} from 'react'
import useGetImage from '../../config/Hook/ImageHook'
import Link from 'next/link'


import { useClicked } from '../../config/Clicked';
import { useAuth } from '../../config/Auth';

//hook
import { useSignIn } from '../../config/Hook/UserHook';
import { useAddList, useRemoveList } from "../../config/Hook/ListTransactionsHook";

export default function BigCard({product}) {

    const { authTokens } = useAuth();
    const signIn = useSignIn();


const {homeList, setHomeList}=useClicked();

    const addList = () => {
        if (authTokens !== "null") {
            if (!document.getElementById("bigCard_" + product.Id)?.classList.contains("active")) {

                document.getElementById("bigCard_" + product.Id)?.classList.add("active");
                document.getElementById("bigText_" + product.Id).innerText = "Listemden Çıkar";
                useAddList(authTokens.split('|')[1], product.Id, product.Name);

                setHomeList([...homeList, {...product, IsListAtteched:true}])

            } else {
                document.getElementById("bigCard_" + product.Id).className="big-slider-add-list";
                document.getElementById("bigText_" + product.Id).innerText = "Listeme Ekle";
                useRemoveList(authTokens.split('|')[1], product.Id, product.Name);
                if(document.getElementById("list_" + product.Id)){
                   
                    document.getElementById("list_" + product.Id).classList.add("fadeOutCard");
                    setTimeout(() => { setHomeList(homeList.filter(i=>i.Id!=product.Id)) }, 500);
                                }
            }
        } else {
            signIn();
        }
    }
    


  return (
<div className="big-slider-item">
                                <div className="big-slider-text">
                                    <h4 className="big-slider-title">
                                   
                                        <strong>{product.Name}</strong>
                                    </h4>
                                    <span className="big-slider-spot"> {product.Spot} </span>
                                    <div className="big-slider-buttons">
                                        <Link href={"/izle/" + product.NameForUrl +  "/" + product.VideoNameForUrl }  className="big-slider-play">
                                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.96559 13.15C1.60927 13.3816 1.24833 13.3947 0.882748 13.1895C0.517882 12.985 0.335449 12.6689 0.335449 12.2414V1.17781C0.335449 0.750229 0.517882 0.433822 0.882748 0.228586C1.24833 0.0240613 1.60927 0.0376013 1.96559 0.269205L10.6775 5.80098C10.9981 6.01477 11.1585 6.31764 11.1585 6.70958C11.1585 7.10153 10.9981 7.40439 10.6775 7.61818L1.96559 13.15Z" fill="black"></path>
                                            </svg>
                                            Oynat
                                        </Link>
                                        <a onClick={()=>{addList()}} id={"bigCard_" + product.Id} className={"big-slider-add-list "+  (product.IsListAtteched? " active" :"")}>  
                                        <span className=" bigText" id={"bigText_" + product.Id}>{
                                                    product.IsListAtteched ? 'Listemden Çıkar' : 'Listeme Ekle'
                                                }</span>
                                        </a>
                                        <a onClick={()=>{addList()}} className="big-slider-info-dot"></a>
                                    </div>
                                </div>
                                <picture className="big-slider-image">
                                    <source srcSet={useGetImage(product.MediaAssets, ["1920x473"])} datasrcset="temp/1920x473.jpg" width="1920" height="473" media="(min-width: 768px)"/>
                                    <img src={useGetImage(product.MediaAssets, ["767x354"])} data-src="temp/767x354.jpg" className=" ls-is-cached lazyloaded" width="767" height="354" data-loadmode="0" alt={product.Name} loading="lazy"/>
                                </picture>
                            </div>
  )
}

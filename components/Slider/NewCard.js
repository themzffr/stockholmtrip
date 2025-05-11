//#region import
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';




import { useClicked } from '../../config/Clicked';
import { useAuth } from '../../config/Auth';

//hook
import { useSignIn } from '../../config/Hook/UserHook';
import { useLikeToProduct } from "../../config/Hook/LikeTransactionsHook"
import { useAddList, useRemoveList } from "../../config/Hook/ListTransactionsHook";
import useGetImage from '../../config/Hook/ImageHook';
import { useRouter } from 'next/router';
//#endregion



export default function NewCard({ product, MediaType, DataType, ModuleType, list }) {

    //#region const
    const cardRef = useRef();
    const { setClickedId, setModalOpen, setHomeList, homeList } = useClicked();
    const { authTokens } = useAuth();
    const router = useRouter();
    const signIn = useSignIn();
    const [added, setAdded] = useState(product.IsListAtteched);
    const [liked, setLiked] = useState(product.IsLike);
    const [control, setControl] = useState(false);
    //#endregion

    useEffect(() => {

        if (control === false) {
            setAdded(product.IsListAtteched);
            setLiked(product.IsLike);
        }
    }, [product, liked, added])



    const addList = e => {
        if (authTokens != "null") {
            if (!document.getElementsByClassName("cardList_" + product.Id)[0].classList.contains("active")) {
                useAddList(authTokens.split('|')[1], product.Id, product.Name);

                if (router.asPath == "/") {
                    setHomeList([{ ...product, IsListAtteched: true }, ...homeList,])
                }
            }
            else {

                useRemoveList(authTokens.split('|')[1], product.Id, product.Name);
                if (document.getElementById("list_" + product.Id)) {

                    document.getElementById("list_" + product.Id).classList.add("fadeOutCard");
                    setTimeout(() => { setHomeList(homeList.filter(i => i.Id != product.Id)) }, 500);
                }
            }
        } else {
            signIn();
        }
    }

    const Like = e => {
        if (authTokens != "null") {
            if (!document.getElementsByClassName("cardLike_" + product.Id)[0].classList.contains("active")) {
                useLikeToProduct(authTokens.split('|')[1], product.Id, product.Name, true);
            }
            else {
                useLikeToProduct(authTokens.split('|')[1], product.Id, product.Name, false);
            }
        } else {
            signIn();
        }
    }
    const openModal = () => {
        localStorage.setItem("scroll", document.documentElement.scrollTop);
        setModalOpen(true);
        setClickedId(product.Id);
    }
    return (

        <div className={"new-slider-item liste"} id={(list ? "list_" + product.Id : "")} aria-label={product.Name}>

            <div className={"img-holder " + (ModuleType == 3 ? "_240x320" : MediaType == 1 ? "_195x260" : "_240x135")} >
                <img style={{ height: "100%", objectFit: "cover" }} src={useGetImage(product.MediaAssets, MediaType == 1 ? ["195x260"] : ["240x135", "300x168"])} data-src="temp/195x260-3.jpg" width={MediaType == 1 ? "195" : "240"} height={MediaType == 1 ? "260" : "135"} className=" lazyloaded" alt={product.Name} loading="lazy" />
            </div>

            <div className="new-slider-hover">
                <a onClick={openModal} className="new-slider-hover-dot"></a>
                <a onClick={addList} className={"new-slider-hover-add-list cardList_" + product.Id + " " + (added ? " active" : "")}></a>

                {DataType == 2 && <span className="new-slider-hover-play"></span>}
                <span className="new-slider-hover-title">{product.Name}</span>
                <span className="new-slider-hover-info">
                    <i>{product.CategoryName}</i>
                    {product.Season > 0 && <i>{product.Season} Sezon</i>}
                    {product.CreatedYear > 0 && <i>{product.CreatedYear}</i>}
                </span>
            </div> <Link style={{
                position: "absolute",
                zIndex: 10, width: "85%", top: 0, left: 0, height: "100%"
            }} href={"/izle/" + ((DataType == 2) ? (product.ProductNameForUrl + "/") : "") + product.NameForUrl} className="slider-card-buttons-play radius-5" >
            </Link>

        </div>

    )
}

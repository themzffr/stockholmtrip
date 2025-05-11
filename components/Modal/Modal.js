//#region import
import React, { useEffect, useState, useRef, } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//items
import SimilarList from './Items/SimilarList';
import Persons from './Items/Persons';
import EpisodeList from './Items/EpisodeList';

//config
import { api } from '../../config/Constants/API';
import { useClicked } from '../../config/Clicked';
import { useAuth } from '../../config/Auth';

//hook
import { useCloseModal } from '../../config/Hook/ModalCloseHook';
import { useSignIn } from '../../config/Hook/UserHook';
import { useLikeToProduct } from "../../config/Hook/LikeTransactionsHook"
import { useAddList, useRemoveList } from "../../config/Hook/ListTransactionsHook";
import useGetImage from '../../config/Hook/ImageHook';
import Share from '../Shared/Items/Share';
import Loader from '../Shared/Items/Loader';

//#endregion

function Modal() {

    //#region const
    const [closeEpisode, setcloseEpisode] = useState(true);
    const router = useRouter();
    const signIn = useSignIn();
    const modalRef = useRef();
    const [modalImage, setModalImage] = useState(' <picture className="d-block"> <source srcSet="/assets/images/modal-placeholder-turkuvapp.jpg" width={1056} height={592} media="(min-width: 768px)" /> <img src="/assets/images/modal-placeholder-turkuvapp.jpg" alt=""/> </picture>');
    const { clickedId, setClickedId, modalOpen, setModalOpen, setHomeList, homeList } = useClicked();
    const [dataControl, setDataControl] = useState(false);
    const [show, setShow] = useState([]);
    const { authTokens } = useAuth();
    const [added, setAdded] = useState(false);
    const [liked, setLiked] = useState(false);
    //#endregion

    useCloseModal(modalRef, () => {
       closeModal()
      
    });

    useEffect(() => {
        setDataControl(false);
        setModalImage(null);
        setcloseEpisode(true);
        setClickedId(null);
        setShow(null);
    }, [router])

    const closeModal = () => {
        setDataControl(false);
        setcloseEpisode(true);
        setClickedId(null);
        setShow(null);
        setModalImage(null);
        setModalOpen(false);
  
        
            
        
    }

    useEffect(() => {
        (async () => {

            let modalTime = "";
            if (modalOpen) {

                await fetch(api.GetProductDetail + "?productId=" + clickedId + "&userId=" + (authTokens != "null" ? authTokens.split('|')[1] : '00000000-0000-0000-0000-000000000000'))
                    .then(function (response) {

                        return response.json();
                    })
                    .then(function (data) {
                        setShow(data);
                        setModalImage('<picture className="d-block"> <source srcSet="' + useGetImage(data.MediaAssets, ["1056x592"]) + `" data-srcset="` + useGetImage(data.MediaAssets, ["1056x592", "1920x1080"]) + `" width={1056} height={592} media="(min-width: 768px)" /> <img src="` + useGetImage(data.MediaAssets, ["450x450","767x767" ]) + '" data-srcset="' + useGetImage(data.MediaAssets, ["450x450", "767x767"]) + '" width={450} height={450}  alt="'+data.Name+'"/> </picture>');
                        setTimeout(() => { setDataControl(true) }, 800);
                        setAdded(data.IsListAtteched);
                        setLiked(data.IsLike);
                    });



            } else { setShow(null); setDataControl(false); setModalImage(null); clearTimeout(modalTime) };
        })();

        return () => { }
    }, [clickedId]);

    const Like = e => {

        if (authTokens != "null") {
            useLikeToProduct(authTokens.split('|')[1], show.Id, show.Name, !liked);
            setLiked(!liked);
        } else {
            signIn();
        }
    }

    const addList = e => {
        if (authTokens != "null") {
            setAdded(!added);
            if (!added) {
                useAddList(authTokens.split('|')[1], show.Id, show.Name);
                
                if(router.asPath=="/"){
                    setHomeList([{...show, IsListAtteched:true}, ...homeList])
                }

            }
            else {

                useRemoveList(authTokens.split('|')[1], show.Id, show.Name);

                if(document.getElementById("list_" + show.Id)){
                   
                    document.getElementById("list_" + show.Id).classList.add("fadeOutCard");
                    setTimeout(() => { setHomeList(homeList.filter(i=>i.Id!=show.Id)) }, 500);
                                }
            }
        } else {
            signIn();
        }
    }

    return (

        <div className={modalOpen ? "preview-modal-container d-none active " : "preview-modal-container d-none  "} id="modal">
            {show !== null ? <>
                <div className={"preview-modal" } ref={modalRef} id="modalRef">
                    <a className="close-modal radius-50" onClick={closeModal}>
                        <svg width={24} height={24} viewBox="0 0 24 24"  >
                            <path d="M17.657 6.343a1 1 0 0 1 0 1.414L13.415 12l4.242 4.244a1 1 0 0 1-1.414 1.414L12 13.414l-4.244 4.243a1 1 0 0 1-1.414-1.414l4.243-4.244-4.243-4.242a1 1 0 0 1 1.414-1.414l4.244 4.242 4.242-4.242a1 1 0 0 1 1.414 0z" fill="#FFF" fillRule="evenodd" />
                        </svg>
                    </a>
                    <div className="preview-modal-image ">
                        <Link className="img-holder" href={"/izle/" + show.NameForUrl} onClick={() => { setModalOpen(false); }} >
                            <div dangerouslySetInnerHTML={{ __html: modalImage }}></div>
                        </Link>
                    </div>


                    <div className="preview-modal-content ">
                        <div className="preview-modal-info ">
                            <div className="preview-modal-title mb-3">
                                <h6>{show.Name}</h6>
                            </div>
                            <div className="preview-modal-tags mb-4">
                                <Link href={"/kesfet/" + show.CategoryNameForUrl} onClick={() => { setModalOpen(false); }} >{show.CategoryName}</Link>
                                {show.Types ? show.Types.map(types => {
                                    const { Id, Name, NameForUrl } = types;
                                    return <Link key={Id} href={"/kesfet/" + show.CategoryNameForUrl + "/" + NameForUrl} onClick={() => { setModalOpen(false); }} >{Name}</Link>
                                }) : <></>}
                            </div>
                            <div className="preview-modal-buttons mb-4">
                                <Link href={"/izle/" + show.NameForUrl + (show.VideoNameForUrl != null ? ("/" + show.VideoNameForUrl) : "")} className="preview-modal-play-button" onClick={() => { setModalOpen(false); }} >
                                    <svg width={24} height={24} viewBox="0 0 24 24"  >
                                        <path d="m7.605 3.22 11.279 8.57a1 1 0 0 1-.05 1.628L7.557 20.96A1 1 0 0 1 6 20.128V4.016a1 1 0 0 1 1.605-.796z" fill="#15182A" fillRule="evenodd" />
                                    </svg>
                                </Link>
                                <a onClick={addList} className={"preview-modal-add-list-button" + (added ? " active" : "")}>
                                    <span className="d-none d-md-block"> {added ? "Listemden Çıkar" : "Listeme Ekle"} </span>
                                </a>
                                <a onClick={Like} className={"preview-modal-button-like radius-50" + (liked ? " active" : "")}>
                                    <svg width={26} height={24} viewBox="0 0 26 24"  >
                                        <path d="M24.019 17.525c1.094 0 1.981-.908 1.981-2.029 0-1.12-.887-2.029-1.981-2.029h-.566v-.016c1.094 0 1.981-.909 1.981-2.03 0-1.12-.887-2.028-1.98-2.028v-.012l-7.874.102c1.522-2.733 1.51-5.828 1.298-7.718C16.766.76 15.938 0 14.951 0c-.973 0-1.79.74-1.923 1.726-.437 3.246-1.936 4.583-3.299 6.563C8.147 10.587 8 13.224 8 13.224v7.168C8 22.385 9.577 24 11.523 24h11.93c.767 0 1.39-.637 1.39-1.422 0-.786-.623-1.423-1.39-1.423.975 0 1.765-.809 1.765-1.806 0-.998-.79-1.807-1.765-1.807v-.017h.566zM4.638 24H1.362C.61 24 0 23.43 0 22.727V11.273C0 10.57.61 10 1.362 10h3.276C5.39 10 6 10.57 6 11.273v11.454C6 23.43 5.39 24 4.638 24" fill="#FFF" fillRule="evenodd" />
                                    </svg>
                                </a>
                                <div className='share-button-area'>
                                    <Share nameForUrl={"/izle/" + show.NameForUrl} />
                                </div>

                            </div>
                            <div className="preview-modal-text">
                                <div className="preview-modal-text-left">
                                    <span className="preview-modal-text-content" id="desc"> {show.Description}</span>
                                </div>
                                <Persons personList={show.Artists} source={show.Source} year={show.CreatedYear} categoryname={show.CategoryName} />
                            </div>
                        </div>
                        <EpisodeList oncloseEpisode={closeEpisode} setcloseEpisode={setcloseEpisode} NameForUrl={show.NameForUrl} Season={show.Season} categoryId={show.CategoryId} />
                        <SimilarList categoryId={show.CategoryId} productId={clickedId} closeModal={closeModal} />
                    </div>
                </div> <div className={"preview-modal " + (dataControl ? "d-none" : "d-block")} style={{ height: "100% " }}>
                    <a className="close-modal radius-50" onClick={closeModal}>
                        <svg width={24} height={24} viewBox="0 0 24 24"  >
                            <path d="M17.657 6.343a1 1 0 0 1 0 1.414L13.415 12l4.242 4.244a1 1 0 0 1-1.414 1.414L12 13.414l-4.244 4.243a1 1 0 0 1-1.414-1.414l4.243-4.244-4.243-4.242a1 1 0 0 1 1.414-1.414l4.244 4.242 4.242-4.242a1 1 0 0 1 1.414 0z" fill="#FFF" fillRule="evenodd" />
                        </svg>
                    </a>

                    <div className="preview-modal-content" style={{ height: "100% ", display: "flex" }}>
                      <Loader/>
                         </div> </div>
            </>
                :
                <div className="preview-modal " style={{ height: "100% " }}>
                    <a className="close-modal radius-50" onClick={closeModal}>
                        <svg width={24} height={24} viewBox="0 0 24 24"  >
                            <path d="M17.657 6.343a1 1 0 0 1 0 1.414L13.415 12l4.242 4.244a1 1 0 0 1-1.414 1.414L12 13.414l-4.244 4.243a1 1 0 0 1-1.414-1.414l4.243-4.244-4.243-4.242a1 1 0 0 1 1.414-1.414l4.244 4.242 4.242-4.242a1 1 0 0 1 1.414 0z" fill="#FFF" fillRule="evenodd" />
                        </svg>
                    </a>

                    <div className="preview-modal-content" style={{ height: "100% ", display: "flex" }}>
                        <Loader/>
                    </div> </div>}
        </div>

    );



} export default Modal;
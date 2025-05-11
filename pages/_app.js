//#region import
import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { ClickedContext } from "../config/Clicked";
import { AuthContext } from '../config/Auth';
import "swiper/css";


import Head from "../components/Shared/Items/Head";
import Loader from '../components/Shared/Items/Loader';
//#endregion
// Örneğin, bu kodu bir JavaScript dosyasında kullanıyorsanız

// import '../public/assets/css/headerV2.css';
// import '../public/assets/css/footer.css';
// import '../public/assets/css/swiper.min.css';
// import '../public/assets/css/customV2.css';
// import '../public/assets/css/bootstrap-grid.css';
// import '../public/assets/css/preview-modal.css';
// import '../public/assets/css/hero-slider.css';
// import '../public/assets/css/special-widget.css';
// import '../public/assets/css/big-slider.css';
// import '../public/assets/css/new-slider.css';
// import '../public/assets/css/podcast-slider.css';
// import '../public/assets/css/hero-container.css';
// import '../public/assets/css/default-slider.css';
// import '../public/assets/css/player-area.css';

const MyApp = ({ Component, pageProps}) => {

    //#region useState
    const router = useRouter();
    const [authTokens, setAuthTokens] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [clickedId, setClickedId] = useState();
    const [homeList, setHomeList]=useState([]);
    const [activePage, setActivePage]=useState("streaming");
    const [currentRadio, setCurrentRadio]=useState(null);
    const [changeRadio, setChangeRadio]=useState(null);
    const [pause, setPause] = useState(true);
    //#endregion

    //#region useEffect
    useEffect(() => {
        const userInfo = decodeURIComponent(getCookieForWebsite('.AuthDecr'));
        if (userInfo == null || userInfo == '') { document.cookie = "userId="; }
        else { document.cookie = "userId=" + userInfo.split('|')[1]; }
        setAuthTokens(userInfo || 'null');
     
    }, [router])
    //#endregion

    //#region funcs
    const setTokens = (data) => {
        setAuthTokens(data);
    };
    const hideWrapper = (value) => {
        setModalOpen(value);
    }

    const getId = (id) => {
        setClickedId(id);
    }

    useEffect(() => {
        modalOpen ? setClickedId(clickedId) : setClickedId(null);

    }, [modalOpen])

    const getCookieForWebsite = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //#endregion

    //#region loader
    const [timer, setTimer] = useState(false);
    useEffect(() => {
   
        Router.events.on('routeChangeStart', () => {setTimer(true);   });
        Router.events.on('routeChangeComplete', () => {setTimer(false);  localStorage.setItem("scroll", "null");     document.querySelector("html").scrollTop=0; });
        Router.events.on('routeChangeError', () => setTimer(false));
        window.addEventListener('beforeunload', function(event) {
            localStorage.setItem("scroll", "null"); 
          });
        
        return () => {
           
            Router.onRouteChangeStart = null;
            Router.onRouteChangeComplete = null;
            Router.onRouteChangeError = null;
        }

    }, [Router.events])
   
    //#endregion

    return (<ClickedContext.Provider value={{ clickedId, setClickedId: getId, modalOpen, setModalOpen: hideWrapper , homeList, setHomeList, currentRadio, setCurrentRadio, activePage, setActivePage, pause, setPause,changeRadio, setChangeRadio }}>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }} >
            <>
                {
                   
                       
                            <>
                                <Head title={"Gezi Rehberi"} description={"Stockholm Gezi Rehberi"} canonical={""} />
                                <div className={"Timer" + (timer ? " timerFlex" : "")}>
                                
                                 </div><div className={timer ? "componentNone" : ""} >
                                    <Component {...pageProps} /></div>
                            </>
                      
                       
                }
            </>
        </AuthContext.Provider>
    </ClickedContext.Provider>)
}


export default MyApp;

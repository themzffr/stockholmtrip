//#region import
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

import Link from 'next/link';
import UserButton from '../../Login/UserButton';
import { useOnClickOutside } from '../../../config/Hook/SearchHook';

import { useRouter } from 'next/router';

//#endregion

const Header = (props) => {

    //#region const
    const ref = useRef([]);
    const mRef = useRef([]);
    const MenuRef = useRef();


    const [isMOpen, setIsMOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(true);
    //#endregion

    // useEffect(() => {
    //     setDarkMode((localStorage.getItem("theme") == "dark" || localStorage.getItem("theme") == null) ? true : false)
    //     window.addEventListener('scroll', function () { document.getElementById('headerSticky').className = 'main-header' + (window.scrollY === 0 ? "" : " sticky"); });
    // }, [])

    //#region MobileMenu
    const openMobile = (e) => {
        if (window.innerWidth <= 768) {
            setMobileMenu(!mobileMenu);
        }

    }
    useEffect(() => {
        // Mobilde scroll engelliyor
        const ogElement = document.getElementById("og");
        const contentWrapperElement = document.getElementById("content-wrapper");
        const isMobile = window.innerWidth <= 750;
    
        if (mobileMenu === true && isMobile) {
            if (ogElement) {
                ogElement.className = "opacity-bg active";
            }
            if(contentWrapperElement){
                contentWrapperElement.style.overflow = "hidden";
            contentWrapperElement.style.height = "100vh";
            }
            
        } else {
            if (ogElement) {
                ogElement.className = "opacity-bg ";
            }
            if(contentWrapperElement){
                 contentWrapperElement.style.height = "unset";
            contentWrapperElement.style.overflow = "unset";
            }
           
        }
    }, [mobileMenu]);
    
    //#endregion


    useEffect(() => {


        window.addEventListener("resize", () => {
            if (window.innerWidth <= 768) {
                setMobileMenu(false);

                if (isMOpen && window.innerWidth > 768) { setIsOpen(true) }
                if (isOpen && window.innerWidth < 768) { setIsMOpen(true) }

            }
        })
    }, [])

    //#region Search
    const openSearch = () => {
        document.getElementById("Search").focus();
        setIsOpen(!isOpen);
    }

    const openMSearch = () => {
        document.getElementById("MSearch").focus();
        setIsMOpen(!isMOpen);
        setMobileMenu(false);
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        
    };
    const closeSearch = () => {
        setInputValue("")
        setIsOpen(false);
        setIsMOpen(false);
        document.getElementById("Search").value = document.getElementById("Search").text = "";

    }

    const closeMSearch = () => {
        setInputValue("")
        setIsMOpen(false);
        setIsOpen(false);
        document.getElementById("MSearch").value = document.getElementById("MSearch").text = "";
    }


    const handleKeyDownEvent = (e) => {
        if (e.key == "Enter") {
            if (e.key == "Enter") {
                if (e.currentTarget.value.length > 2) {
                    setInputValue("");
                    router.push("/ara/" + e.currentTarget.value);
                }
                else {
                    alert("En az 3 harf girmelisiniz.");
                }
            }
        }
        if (e.key == ' ') {
            e.stopPropagation(); 
          }
    }

    const openSearchs = () => {
        if (window.innerWidth > 768) {
            openSearch()
        } else {

            openMSearch()
        }
    }

    const toggleFavourites = () => {
        document.querySelector('body').classList.remove('favourites-channel-active');
        document.querySelector('body').classList.remove('channel-active');
        document.querySelector('html').classList.remove('favourites-channel-active');
        document.querySelector('html').classList.remove('channel-active');

    };
    useEffect(() => {
        const handleScroll = () => {
          // window.scrollY, sayfanın ne kadar scroll edildiğini verir
          if (window.scrollY > 100) {
            var menu=document.querySelector(".main-menu");
            if(menu && menu.classList.contains("active")){

            }else{
                document.getElementById("headerSticky")?.classList.add("sticky");
            }
           
          } else {
            document.getElementById("headerSticky")?.classList.remove("sticky");
          }
        };
    
        // Scroll event listener'ını ekleyelim
        window.addEventListener('scroll', handleScroll);
    
        // Temizleme işlemi: Component unmount olduğunda listener'ı kaldır
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    useOnClickOutside(MenuRef, () => {
        let clickedElement = null;

        document.addEventListener("click", function (event) {
            clickedElement = event.target;

            if (clickedElement?.className != "middle") {

                const menu = document.getElementsByClassName("main-menu")[0];
                menu?.classList.remove("active");

                const midmenu = document.getElementsByClassName("middle-menu")[0];

                midmenu?.classList.remove("active");
            }
        })





    })
    useOnClickOutside(ref, () => { setIsOpen(false) });
    useOnClickOutside(mRef, () => { setIsMOpen(false) });
    //#endregion

    //#region Theme Options
    useEffect(() => {
        if (darkMode) {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light")
        }
    }, [darkMode]);
    //#endregion

    return (
        <header className="main-header" id="headerSticky">
            <div className="backbtn d-md-none">
                <a onClick={toggleFavourites}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <path d="M9.625 13.75L4.125 19.25L9.625 24.75" stroke="#FDFDFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 19.25H30.7656C35.8153 19.25 39.875 23.4893 39.875 28.5312V30.25" stroke="#FDFDFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>

            {/* <a className={mobileMenu ? "mobile-menu-button d-block d-md-none active absbutton" : "mobile-menu-button d-block d-md-none"} ref={MenuButton} onClick={mobileMenu ? () => { setMobileMenu(!mobileMenu) } : openMobile}>
            </a> */}
            <div className="header-logo">
                <h1>
                    <span className="d-none">Turkuvapp</span>
                    <Link href="/" onClick={() => { setMobileMenu(false) }}  >
                        <img src="/assets/images/main-logo-v2.png" width={180} height={55} alt="Turkuvapp" />
                        <img src="/assets/images/main-logo-dark-v2.png" width={180} height={55} alt="Turkuvapp" />
                    </Link>
                </h1>
            </div>
            <div className="header-search">
                <a className="header-search-open" onClick={openSearchs}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2a8 8 0 0 1 6.32 12.905l5.387 5.388a1 1 0 0 1-1.32 1.497l-.094-.083-5.388-5.386A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#FFF" fillRule="evenodd" />
                    </svg>
                </a>
                <div ref={mRef} className={"header-search-web transition-2 radius-5 " + (isMOpen ? " active" : "")}>
                    <input id="MSearch" type="text" placeholder="Ara" value={inputValue}
                        onChange={handleInputChange} onKeyDown={handleKeyDownEvent} />
                    <a>
                        <svg width={24} height={24} viewBox="0 0 24 24" onClick={closeMSearch}>
                            <path d="M17.657 6.343a1 1 0 0 1 0 1.414L13.415 12l4.242 4.244a1 1 0 0 1-1.414 1.414L12 13.414l-4.244 4.243a1 1 0 0 1-1.414-1.414l4.243-4.244-4.243-4.242a1 1 0 0 1 1.414-1.414l4.244 4.242 4.242-4.242a1 1 0 0 1 1.414 0z" fill="#414563" fillRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className={mobileMenu ? "main-menu active" : "main-menu "} ref={MenuRef}>
                <div className="menu-logo d-block d-md-none">
                    <img src="/assets/images/main-logo.png" width="180" height="55" alt="" />
                </div>
                <div className="header-user">
                    {/* <a className='template-mode' onClick={() => { setDarkMode(!darkMode); }}>

        </a>*/}
                    <div className="header-search-mobile d-none d-md-block" >
                        <div className='header-search'>
                            <a className="header-search-mobile-open" onClick={openSearchs}>
                                <svg width={24} height={24} viewBox="0 0 24 24">
                                    <path d="M10 2a8 8 0 0 1 6.32 12.905l5.387 5.388a1 1 0 0 1-1.32 1.497l-.094-.083-5.388-5.386A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#FFF" fillRule="evenodd" />
                                </svg>
                            </a>
                            <div ref={ref} className={"header-search-web transition-2 radius-5" + (isOpen ? " active" : "")}>
                                <input value={inputValue}
                                    onChange={handleInputChange} id="Search" type="text" placeholder="Ara" onKeyDown={handleKeyDownEvent} />
                                <a>
                                    <svg width={24} height={24} viewBox="0 0 24 24" onClick={closeSearch}>
                                        <path d="M17.657 6.343a1 1 0 0 1 0 1.414L13.415 12l4.242 4.244a1 1 0 0 1-1.414 1.414L12 13.414l-4.244 4.243a1 1 0 0 1-1.414-1.414l4.243-4.244-4.243-4.242a1 1 0 0 1 1.414-1.414l4.244 4.242 4.242-4.242a1 1 0 0 1 1.414 0z" fill="#414563" fillRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <UserButton />
                </div>


                <nav>
                    <ul>
                        <li>
                            <Link href="/" onClick={openMobile} className={"d-flex radius-5 transition-2" + (router.pathname == "/" ? " active" : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none" className="d-none d-md-block">
                                    <path d="M11.6542 2.32023C11.4716 2.16382 11.2397 2.07793 11 2.07793C10.7603 2.07793 10.5284 2.16382 10.3458 2.32023L2.47077 9.06027C2.35927 9.15579 2.26973 9.27457 2.20837 9.4084C2.147 9.54222 2.11527 9.68788 2.11538 9.83528V20.3739C2.11538 20.4818 2.15793 20.5852 2.23367 20.6614C2.3094 20.7377 2.41212 20.7805 2.51923 20.7805H6.55769C6.6648 20.7805 6.76752 20.7377 6.84326 20.6614C6.91899 20.5852 6.96154 20.4818 6.96154 20.3739V14.6813C6.96154 14.1421 7.17428 13.625 7.55296 13.2437C7.93164 12.8624 8.44524 12.6482 8.98077 12.6482H12.6154C12.8806 12.6482 13.1431 12.7008 13.3881 12.803C13.6331 12.9052 13.8557 13.0549 14.0432 13.2437C14.2307 13.4325 14.3794 13.6566 14.4809 13.9033C14.5824 14.15 14.6346 14.4143 14.6346 14.6813V20.3739C14.6346 20.4818 14.6772 20.5852 14.7529 20.6614C14.8286 20.7377 14.9314 20.7805 15.0385 20.7805H19.4808C19.5879 20.7805 19.6906 20.7377 19.7663 20.6614C19.8421 20.5852 19.8846 20.4818 19.8846 20.3739V9.83447C19.8846 9.68721 19.8528 9.5417 19.7915 9.40803C19.7301 9.27435 19.6406 9.1557 19.5292 9.06027L11.6542 2.32105V2.32023ZM9.29981 1.08168C9.77443 0.675446 10.3771 0.452393 11 0.452393C11.6229 0.452393 12.2256 0.675446 12.7002 1.08168L20.5752 7.82091C20.8651 8.06901 21.0979 8.37759 21.2576 8.72526C21.4173 9.07294 21.5 9.45141 21.5 9.83447V20.3739C21.5 20.9131 21.2873 21.4302 20.9086 21.8115C20.5299 22.1928 20.0163 22.407 19.4808 22.407H15.0385C14.5029 22.407 13.9893 22.1928 13.6107 21.8115C13.232 21.4302 13.0192 20.9131 13.0192 20.3739V14.6813C13.0192 14.5735 12.9767 14.47 12.9009 14.3938C12.8252 14.3175 12.7225 14.2747 12.6154 14.2747H8.98077C8.87366 14.2747 8.77094 14.3175 8.69521 14.3938C8.61947 14.47 8.57692 14.5735 8.57692 14.6813V20.3739C8.57692 20.9131 8.36418 21.4302 7.9855 21.8115C7.60682 22.1928 7.09323 22.407 6.55769 22.407H2.51923C1.9837 22.407 1.4701 22.1928 1.09142 21.8115C0.71274 21.4302 0.5 20.9131 0.5 20.3739V9.83447C0.500021 9.45141 0.582739 9.07294 0.742424 8.72526C0.902109 8.37759 1.13495 8.06901 1.42481 7.82091L9.29981 1.08168Z" fill="white"></path>
                                </svg>
                                <span>Anasayfa</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/canli-izle" className={"radius-5 transition-2"+ (router.pathname == "/canli-izle" ? " active" : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none" className={"d-none d-md-block"}>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.15385 7.27216C2.93805 7.27216 1.96154 8.25313 1.96154 9.47447V16.8155C1.96154 18.0368 2.93805 19.0178 4.15385 19.0178H15.8462C17.0619 19.0178 18.0385 18.0368 18.0385 16.8155V9.47447C18.0385 8.25313 17.0619 7.27216 15.8462 7.27216H4.15385ZM0.5 9.47447C0.5 7.44226 2.13087 5.80396 4.15385 5.80396H15.8462C17.8691 5.80396 19.5 7.44226 19.5 9.47447V16.8155C19.5 18.8477 17.8691 20.486 15.8462 20.486H4.15385C2.13087 20.486 0.5 18.8477 0.5 16.8155V9.47447Z" fill="#fff"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.54492 23.0785C6.54492 22.6015 6.85425 22.2148 7.23583 22.2148H12.7631C13.1447 22.2148 13.454 22.6015 13.454 23.0785C13.454 23.5555 13.1447 23.9421 12.7631 23.9421H7.23583C6.85425 23.9421 6.54492 23.5555 6.54492 23.0785Z" fill="#fff"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.9628 0.844385C15.2579 1.1395 15.2579 1.61798 14.9628 1.9131L10.4287 6.44726C10.1336 6.74238 9.65512 6.74238 9.36001 6.44726C9.06489 6.15214 9.06489 5.67367 9.36001 5.37855L13.8941 0.844385C14.1892 0.549268 14.6677 0.549268 14.9628 0.844385Z" fill="#fff"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.03774 0.844385C5.33285 0.549268 5.81132 0.549268 6.10644 0.844385L10.6405 5.37855C10.9356 5.67367 10.9356 6.15214 10.6405 6.44726C10.3454 6.74238 9.86694 6.74238 9.57183 6.44726L5.03774 1.9131C4.74263 1.61798 4.74263 1.1395 5.03774 0.844385Z" fill="#fff"></path>
                                </svg>
                                <span>Canlı Tv</span>
                            </Link>
                            <div onMouseEnter={() => { }} className={"sub-menu d-none d-md-block"}>
                                <ul className="d-flex align-items-center">
                                    <li>
                                        <Link href="/canli-izle/yayin-akisi" >
                                            Yayın Akışı
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/canli-izle/tv-simdi" >
                                            TV’de Şimdi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/canli-izle/favorilerim" >
                                            Favorilerim
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link href="/canli-radyo" className={"radius-5 transition-2"+ (router.pathname == "/canli-radyo" ? " active" : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={"d-none d-md-block"}>
                                    <path d="M0.794922 10.3169C0.794922 5.0055 5.04807 0.699219 10.2949 0.699219C15.5418 0.699219 19.7949 5.0055 19.7949 10.3169V15.2976C19.7949 16.0738 19.7949 16.6067 19.6591 17.0741C19.5286 17.5242 19.3049 17.9418 19.0026 18.2999C18.7004 18.658 18.3262 18.9485 17.9044 19.1527C17.4693 19.3617 16.9506 19.4443 16.1935 19.565L16.07 19.584C15.8407 19.6236 15.6104 19.6568 15.3793 19.6837C15.1808 19.7027 14.9784 19.7094 14.7713 19.6685C14.4346 19.6005 14.1212 19.4467 13.8614 19.222C13.6016 18.9973 13.4042 18.7094 13.2884 18.386C13.2222 18.1902 13.1851 17.9856 13.1782 17.779C13.1668 17.5852 13.1668 17.3496 13.1668 17.0741V13.1098C13.1668 12.7061 13.1668 12.3584 13.2589 12.0601C13.3612 11.7266 13.5491 11.4258 13.8037 11.1875C14.0584 10.9491 14.371 10.7816 14.7105 10.7016C15.0107 10.6323 15.3537 10.6598 15.7517 10.6921L15.8401 10.6988L15.9446 10.7083C16.6884 10.7672 17.1986 10.8071 17.6308 10.9695C17.9348 11.0835 18.216 11.2393 18.4697 11.4322V10.3169C18.4697 5.74649 14.8093 2.04155 10.2949 2.04155C5.78052 2.04155 2.12017 5.74649 2.12017 10.3169V11.4322C2.37382 11.2393 2.65502 11.0826 2.95902 10.9695C3.39127 10.808 3.90142 10.7672 4.64527 10.7073L4.74977 10.6988L4.83812 10.6921C5.23712 10.6598 5.57912 10.6323 5.87932 10.7016C6.21881 10.7816 6.53144 10.9491 6.78611 11.1875C7.04077 11.4258 7.2286 11.7266 7.33092 12.0601C7.42402 12.3584 7.42307 12.7061 7.42307 13.1098V17.0732C7.42307 17.3496 7.42307 17.5862 7.41167 17.779C7.40027 17.9814 7.37367 18.1847 7.30147 18.3851C7.18569 18.7083 6.98844 18.9962 6.72882 19.2209C6.46919 19.4455 6.15598 19.5994 5.81947 19.6676C5.61844 19.7034 5.41317 19.7088 5.21052 19.6837C5.01957 19.6647 4.78872 19.6277 4.51987 19.5849L4.39637 19.5659C3.63922 19.4443 3.11957 19.3617 2.68542 19.1517C2.26363 18.9476 1.88947 18.657 1.58719 18.2989C1.28492 17.9408 1.06128 17.5232 0.930772 17.0732C0.818672 16.6884 0.798722 16.259 0.795872 15.6852L0.794922 15.5V10.3169Z" fill="white"></path>
                                </svg>
                                <span>Canlı Radyo</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/liste" onClick={openMobile} className={"radius-5 transition-2" + (router.pathname == "/liste" ? " active" : "")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none" className="d-none d-md-block">
                                    <path d="M6.79492 1H19.7949M6.79492 7H19.7949M6.79492 13H19.7949M1.79492 1H1.80492M1.79492 7H1.80492M1.79492 13H1.80492" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span>Listem</span>
                            </Link>
                        </li>
                    </ul>

                    {/* <a href="/canli-yayin" onClick={openMobile} className={"radius-5 transition-2" + (router.pathname == "/canli-yayin" ? " active" : "")}>
                    <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.25211 0.960965C6.36976 1.07849 6.46309 1.21804 6.52677 1.37166C6.59045 1.52527 6.62323 1.68993 6.62323 1.85623C6.62323 2.02252 6.59045 2.18718 6.52677 2.34079C6.46309 2.49441 6.36976 2.63397 6.25211 2.75149C4.35332 4.6506 3.28661 7.22615 3.28661 9.91167C3.28661 12.5972 4.35332 15.1727 6.25211 17.0719C6.36959 17.1894 6.46277 17.329 6.52632 17.4826C6.58987 17.6361 6.62255 17.8007 6.62249 17.9669C6.62243 18.1331 6.58964 18.2977 6.52598 18.4512C6.46232 18.6048 6.36904 18.7443 6.25148 18.8617C6.13391 18.9792 5.99435 19.0724 5.84077 19.136C5.6872 19.1995 5.52261 19.2322 5.3564 19.2321C5.19019 19.2321 5.02563 19.1993 4.87209 19.1356C4.71856 19.072 4.57907 18.9787 4.46159 18.8611C-0.481011 13.9185 -0.481011 5.90356 4.46159 0.960965C4.57911 0.843314 4.71866 0.74998 4.87228 0.6863C5.0259 0.62262 5.19056 0.589844 5.35685 0.589844C5.52314 0.589844 5.6878 0.62262 5.84141 0.6863C5.99503 0.74998 6.13459 0.843314 6.25211 0.960965ZM22.3617 0.960965C27.3043 5.90483 27.3043 13.9185 22.3617 18.8611C22.1231 19.0916 21.8034 19.2192 21.4717 19.2163C21.1399 19.2134 20.8225 19.0803 20.5879 18.8457C20.3533 18.6111 20.2202 18.2937 20.2173 17.9619C20.2144 17.6302 20.342 17.3105 20.5725 17.0719C22.4713 15.1727 23.538 12.5972 23.538 9.91167C23.538 7.22615 22.4713 4.6506 20.5725 2.75149C20.335 2.51422 20.2016 2.19234 20.2015 1.85667C20.2013 1.521 20.3346 1.19903 20.5718 0.961597C20.8091 0.724159 21.131 0.590702 21.4667 0.590583C21.8023 0.590464 22.1243 0.723695 22.3617 0.960965ZM10.0065 4.59768C10.2437 4.83498 10.377 5.15678 10.377 5.49231C10.377 5.82785 10.2437 6.14964 10.0065 6.38694C9.54585 6.84755 9.18043 7.3944 8.93112 7.99624C8.68181 8.59809 8.55349 9.24315 8.55349 9.89459C8.55349 10.546 8.68181 11.1911 8.93112 11.7929C9.18043 12.3948 9.54585 12.9416 10.0065 13.4022C10.1274 13.519 10.2238 13.6586 10.2901 13.813C10.3564 13.9674 10.3913 14.1334 10.3928 14.3014C10.3942 14.4694 10.3622 14.6361 10.2986 14.7916C10.235 14.9471 10.141 15.0884 10.0222 15.2072C9.90338 15.326 9.7621 15.4199 9.60659 15.4836C9.45108 15.5472 9.28445 15.5792 9.11643 15.5778C8.94842 15.5763 8.78237 15.5414 8.62799 15.4751C8.47361 15.4088 8.33398 15.3124 8.21725 15.1915C6.81246 13.7867 6.02326 11.8813 6.02326 9.89459C6.02326 7.90787 6.81246 6.00253 8.21725 4.59768C8.45455 4.36046 8.77635 4.2272 9.11188 4.2272C9.44742 4.2272 9.76921 4.36046 10.0065 4.59768ZM18.8123 4.59768C20.2171 6.00253 21.0063 7.90787 21.0063 9.89459C21.0063 11.8813 20.2171 13.7867 18.8123 15.1915C18.6948 15.3091 18.5554 15.4023 18.4018 15.466C18.2483 15.5297 18.0837 15.5625 17.9175 15.5625C17.7513 15.5626 17.5867 15.5299 17.4331 15.4663C17.2796 15.4028 17.14 15.3096 17.0224 15.1921C16.9049 15.0746 16.8116 14.9352 16.7479 14.7816C16.6843 14.6281 16.6515 14.4635 16.6514 14.2973C16.6514 14.1311 16.684 13.9665 16.7476 13.8129C16.8111 13.6594 16.9043 13.5198 17.0218 13.4022C17.4825 12.9416 17.8479 12.3948 18.0972 11.7929C18.3465 11.1911 18.4748 10.546 18.4748 9.89459C18.4748 9.24315 18.3465 8.59809 18.0972 7.99624C17.8479 7.3944 17.4825 6.84755 17.0218 6.38694C16.7845 6.1495 16.6513 5.82753 16.6514 5.49186C16.6515 5.15619 16.785 4.83432 17.0224 4.59705C17.2599 4.35978 17.5818 4.22655 17.9175 4.22667C18.2532 4.22679 18.5751 4.36025 18.8123 4.59768ZM13.5142 8.1028C13.7634 8.1028 14.0102 8.1519 14.2405 8.24728C14.4708 8.34267 14.68 8.48248 14.8563 8.65874C15.0326 8.83499 15.1724 9.04423 15.2678 9.27452C15.3631 9.5048 15.4122 9.75162 15.4122 10.0009C15.4122 10.2501 15.3631 10.497 15.2678 10.7272C15.1724 10.9575 15.0326 11.1668 14.8563 11.343C14.68 11.5193 14.4708 11.6591 14.2405 11.7545C14.0102 11.8499 13.7634 11.899 13.5142 11.899C13.0108 11.899 12.528 11.699 12.172 11.343C11.8161 10.9871 11.6161 10.5043 11.6161 10.0009C11.6161 9.49748 11.8161 9.0147 12.172 8.65874C12.528 8.30278 13.0108 8.1028 13.5142 8.1028Z" fill="white"></path>
                            </svg>
                        <span>Canlı Yayın</span>
                    </a> */}

                    {/* <>{
                        mobileMenu ?
                            <a className='template-mode' onClick={() => { setDarkMode(!darkMode); openMobile() }}>
                                <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
                            </a>
                            : ''
                    }
                    </> */}
                </nav>
                {/* <div className="header-search">
                    <a className="header-search-open" onClick={openSearch}>
                        <svg width={24} height={24} viewBox="0 0 24 24">
                            <path d="M10 2a8 8 0 0 1 6.32 12.905l5.387 5.388a1 1 0 0 1-1.32 1.497l-.094-.083-5.388-5.386A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#FFF" fillRule="evenodd" />
                        </svg>
                    </a>
                    <div ref={ref} className={"header-search-web transition-2 radius-5" + (isOpen ? " active" : "")}>
                        <input id="Search" type="text" placeholder="Ara" onKeyDown={handleKeyDown} />
                        <a>
                            <svg width={24} height={24} viewBox="0 0 24 24" onClick={closeSearch}>
                                <path d="M17.657 6.343a1 1 0 0 1 0 1.414L13.415 12l4.242 4.244a1 1 0 0 1-1.414 1.414L12 13.414l-4.244 4.243a1 1 0 0 1-1.414-1.414l4.243-4.244-4.243-4.242a1 1 0 0 1 1.414-1.414l4.244 4.242 4.242-4.242a1 1 0 0 1 1.414 0z" fill="#414563" fillRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                    <a href="https://www.724dinle.com/" className="web-logo-724 d-none d-md-block" target="_blank">
                        <img src="/assets/images/724-dinle.png" width="33" height="28" alt="724 Dinle" />
                        <img src="/assets/images/724-dinle-light.png" width="33" height="28" alt="724 Dinle" />
                    </a>

                </div> */}
                <div className="main-menu-bottom">
                    <span>Sosyal Medyada Takip Edin</span>
                    <div className="main-menu-social-link">
                        <a href="https://www.facebook.com/turkuvapp" target="_blank">
                            <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.40503 11.9427H9.89483L10.8908 7.95902H7.40503V5.96718C7.40503 4.94139 7.40503 3.97534 9.39687 3.97534H10.8908V0.629053C10.5661 0.586228 9.3401 0.489624 8.04541 0.489624C5.34149 0.489624 3.42135 2.13986 3.42135 5.17045V7.95902H0.433594V11.9427H3.42135V20.408H7.40503V11.9427Z" fill="black"></path>
                            </svg>
                        </a>
                        <a href="https://twitter.com/turkuvapp" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 512 512">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@turkuvapp" target="_blank">
                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5162 2.78163C21.392 2.33774 21.1553 1.93342 20.829 1.60784C20.5027 1.28226 20.0979 1.04644 19.6537 0.923224C17.9865 0.477499 11.2839 0.477499 11.2839 0.477499C11.2839 0.477499 4.59402 0.466807 2.90935 0.923224C2.4659 1.04698 2.06187 1.28305 1.73632 1.6086C1.41077 1.93415 1.17471 2.33818 1.05094 2.78163C0.734327 4.4885 0.578388 6.22128 0.585173 7.95725C0.582084 9.68486 0.737999 11.4091 1.05094 13.1081C1.17511 13.5518 1.41124 13.9562 1.73668 14.2823C2.06212 14.6084 2.46593 14.8454 2.90935 14.9706C4.57664 15.4163 11.2839 15.4163 11.2839 15.4163C11.2839 15.4163 17.9697 15.4163 19.6537 14.9706C20.0979 14.846 20.5025 14.6092 20.8287 14.283C21.1548 13.9569 21.3916 13.5523 21.5162 13.1081C21.8229 11.4101 21.9726 9.68334 21.9619 7.95725C21.9726 6.21979 21.8262 4.49035 21.5162 2.78163ZM9.14281 11.1562V4.74429L14.722 7.95725L9.14281 11.1562Z" fill="black"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/turkuvapp" target="_blank">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8557 5.58109C7.88654 5.58109 5.49028 7.97736 5.49028 10.9465C5.49028 13.9157 7.88654 16.312 10.8557 16.312C13.8249 16.312 16.2211 13.9157 16.2211 10.9465C16.2211 7.97736 13.8249 5.58109 10.8557 5.58109ZM10.8557 14.4337C8.93556 14.4337 7.36858 12.8667 7.36858 10.9465C7.36858 9.02638 8.93556 7.45939 10.8557 7.45939C12.7759 7.45939 14.3429 9.02638 14.3429 10.9465C14.3429 12.8667 12.7759 14.4337 10.8557 14.4337ZM16.4409 4.1109C15.7477 4.1109 15.1878 4.67072 15.1878 5.36396C15.1878 6.05721 15.7477 6.61703 16.4409 6.61703C17.1341 6.61703 17.694 6.05982 17.694 5.36396C17.6942 5.19935 17.6619 5.03631 17.599 4.88419C17.5361 4.73207 17.4438 4.59385 17.3274 4.47745C17.211 4.36105 17.0728 4.26876 16.9207 4.20586C16.7685 4.14296 16.6055 4.11069 16.4409 4.1109ZM21.3145 10.9465C21.3145 9.50249 21.3276 8.07153 21.2465 6.63011C21.1654 4.95587 20.7835 3.46997 19.5592 2.24568C18.3323 1.01877 16.849 0.639454 15.1747 0.558357C13.7307 0.477261 12.2997 0.490341 10.8583 0.490341C9.41429 0.490341 7.98334 0.477261 6.54192 0.558357C4.86767 0.639454 3.38178 1.02139 2.15749 2.24568C0.930579 3.47259 0.551258 4.95587 0.470161 6.63011C0.389065 8.07415 0.402145 9.50511 0.402145 10.9465C0.402145 12.3879 0.389065 13.8215 0.470161 15.2629C0.551258 16.9372 0.933195 18.4231 2.15749 19.6474C3.38439 20.8743 4.86767 21.2536 6.54192 21.3347C7.98595 21.4158 9.41691 21.4027 10.8583 21.4027C12.3024 21.4027 13.7333 21.4158 15.1747 21.3347C16.849 21.2536 18.3349 20.8717 19.5592 19.6474C20.7861 18.4205 21.1654 16.9372 21.2465 15.2629C21.3302 13.8215 21.3145 12.3906 21.3145 10.9465ZM19.0124 17.1151C18.8215 17.5912 18.5912 17.947 18.2224 18.3132C17.8535 18.6821 17.5004 18.9123 17.0243 19.1032C15.6482 19.65 12.3808 19.527 10.8557 19.527C9.33058 19.527 6.06057 19.65 4.68455 19.1059C4.20844 18.9149 3.85266 18.6847 3.48642 18.3158C3.11756 17.947 2.88735 17.5938 2.69638 17.1177C2.15225 15.7391 2.27521 12.4717 2.27521 10.9465C2.27521 9.42139 2.15225 6.15138 2.69638 4.77536C2.88735 4.29925 3.11756 3.94347 3.48642 3.57723C3.85528 3.21099 4.20844 2.97817 4.68455 2.7872C6.06057 2.24307 9.33058 2.36602 10.8557 2.36602C12.3808 2.36602 15.6509 2.24307 17.0269 2.7872C17.503 2.97817 17.8588 3.20837 18.225 3.57723C18.5939 3.94609 18.8241 4.29925 19.015 4.77536C19.5592 6.15138 19.4362 9.42139 19.4362 10.9465C19.4362 12.4717 19.5592 15.7391 19.0124 17.1151Z" fill="black"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="main-menu-store">
                        <a target={"_blank"} href="https://apps.apple.com/kg/app/turkuvapp-dizi-program-m%C3%BCzik/id6445958352">
                            <img src="/assets/images/app-store.png" data-src="/assets/images/app-store.png" width="115" height="31" className=" lazyloaded" alt="" />
                        </a>
                        {/* <a href="#">
                                <img src="assets/images/google-play.png" data-src="c/i/google-play.png" width="104" height="31" className=" lazyloaded" alt="" />
                            </a> */}
                    </div>
                </div>

            </div>

        </header>
    );
}
export default Header;



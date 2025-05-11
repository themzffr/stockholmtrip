//#region GA4 Code
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-DFBRVWBGGK');
//#endregion
//#region GetCookie
//User bilgileri için gerekli cookie yi döner.
function getCookieForWebsite(cname) {
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
//#region List And Like Transactions
//Listeye Ekle fonksiyonundan sonra ekrandaki Card ve Hero komponentlerini günceller.
// function AddList(productId, productName) {

//     GetToast(productId, productName, "listenize eklendi.");

//     if (document.getElementsByClassName("cardList_" + productId).length > 0) {
//         for (var i = 0; i < document.getElementsByClassName("cardList_" + productId).length; i++) {
//             document.getElementsByClassName("cardList_" + productId)[i].classList.add("active");
//         }
//     }

//     if (document.getElementById("hero_" + productId) != null) {
//         document.getElementById("hero_" + productId).classList.add("active");
//         document.getElementById("heroText_" + productId).innerText = "Listemden Çıkar";
//     }
// }

// //Listemden Çıkar fonksiyonundan sonra ekrandaki Card ve Hero komponentlerini günceller.
// function RemoveList(productId, productName) {

//     GetToast(productId, productName, "listenizden çıkarıldı.");

//     if (document.getElementsByClassName("cardList_" + productId).length > 0) {
//         for (var i = 0; i < document.getElementsByClassName("cardList_" + productId).length; i++) {
//             document.getElementsByClassName("cardList_" + productId)[i].classList.remove("active");
//         }
//     }

//     if (document.getElementById("hero_" + productId) != null) {
//         document.getElementById("hero_" + productId).classList.remove("active");
//         document.getElementById("heroText_" + productId).innerText = "Listeme Ekle";
//     }

//     if (window.location.href.indexOf('liste') > -1) RemovePageList(productId);
// }

//Beğeni fonksiyonundan sonra ekrandaki Card komponentlerini günceller.
// function LikeProduct(productId, productName) {

//     //GetToast(productId, productName, "beğenilerinize eklendi.");

//     for (var i = 0; i < document.getElementsByClassName("cardLike_" + productId).length; i++) {
//         document.getElementsByClassName("cardLike_" + productId)[i].classList.add("active");
//     }
// }

// //Beğenmeme fonksiyonundan sonra ekrandaki Card komponentlerini günceller.
// function DislikeProduct(productId, productName) {

//     // GetToast(productId, productName, "beğenilerinizden çıkarıldı.");

//     for (var i = 0; i < document.getElementsByClassName("cardLike_" + productId).length; i++) {
//         document.getElementsByClassName("cardLike_" + productId)[i].classList.remove("active");
//     }
//     if (window.location.href.indexOf('begeniler') > -1) RemovePageList(productId);
// }

//Liste ve Beğeniler ekranında silinen ürünleri çıkarır.
function RemovePageList(productId) {
    document.getElementById("list_" + productId).classList.add("fadeOutCard");
    setTimeout(() => { document.getElementById("list_" + productId).remove(); }, 500);
    if (document.getElementsByClassName("swiperList").length == 0) {
        document.getElementsByClassName("watchList")[0].style.display = "none";
        document.getElementsByClassName("list-page")[1].style.display = "block";
    }
}

//Liste ve Beğeniler de toast bilgilendirme çıkarır.
function GetToast(productId, productName, desc) {
    document.getElementById("snackbar").innerHTML = `<div  id="toast_` + productId + `"> <div class="innerSnack fadeinCard">` + productName + ' ' + desc + '</div></div>';

    var y = document.getElementById("toast_" + productId)
    setTimeout(function () { y.classList.replace("fadeinCard", "fadeOutCard") }, 1000);
    setTimeout(function () { y.innerHTML = "" }, 1500);
}

//Çıkış işlemi sonrası ekrandaki beğeni ve liste fonksiyonlarını sıfırlar.
function logOff() {
    if (document.getElementsByClassName("slider-card-buttons-like").length > 0) {
        for (var i = 0; i < document.getElementsByClassName("slider-card-buttons-like").length; i++) {
            document.getElementsByClassName("slider-card-buttons-like")[i].classList.remove("active");
            document.getElementsByClassName("slider-card-buttons-add-list")[i].classList.remove("active");
        }
    }
    if (document.getElementsByClassName("video-button-like").length > 0) {
        document.getElementsByClassName("video-button-like")[0].classList.remove("active");
    }
    if (document.getElementsByClassName("add-list-button").length > 0) {
        for (var i = 0; i < document.getElementsByClassName("add-list-button").length; i++) {
            document.getElementsByClassName("add-list-button")[i].classList.remove("active");
            document.getElementsByClassName("heroText")[i].innerText = "Listeme Ekle";
        }
    }
    if (document.getElementsByClassName("swiperList").length > 0) {
        document.getElementsByClassName("watchList")[0].style.display = "none";
        document.getElementsByClassName("list-page")[1].style.display = "block";
    }
    

    document.cookie = "userId=";
    document.cookie = ".AuthDecr=";
}
//#endregion
//#region Player Seek
document.addEventListener("keydown", keyDownHandler);

//Videoyu iletilen süreye götürür
function GetDurationTime(second) {
    window.hola_player().vjs.currentTime(second)
}

function GetFullScreen() {
    var videoElement = document.getElementsByClassName('vjs-tech')[0];
    document.fullscreenElement === videoElement ? document.exitFullscreen() : videoElement.requestFullscreen();
}
function keyDownHandler(e) {
    var videoElement = document.getElementsByClassName('vjs-tech')[0];
    const videoControls = e.keyCode
    switch (videoControls) {
        case 32: // Key Space
            videoElement.paused ? videoElement.play() : videoElement.pause()
            e.preventDefault();
            break;
        case 37: //ArrowLeft
            videoElement.currentTime -= 10;
            break;
        case 38: //Arrow Up
            videoElement.volume = Math.min(1, videoElement.volume + 0.1);
            e.preventDefault();
            break;
        case 39: //ArrowRight
            videoElement.currentTime += 10
            break;
        case 40: //Arrow Down
            videoElement.volume = Math.max(0, videoElement.volume - 0.1);
            e.preventDefault();
            break;
        case 70: //Key F
            GetFullScreen();
            break;
        default:
            break;
    }
}
//#endregion
import { api } from '../Constants/API';
import React, { useState, useEffect } from 'react';

export function useAddList(userId, productId, productName)
{
    if (userId == '00000000-0000-0000-0000-000000000000') return;

    fetch(api.AddProductToList + "?userId=" + userId + "&productId=" + productId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

 AddList(productId, productName);
}

export function useRemoveList(userId,productId, productName)
{
    if (userId == '00000000-0000-0000-0000-000000000000') return;

     fetch(api.RemoveProductToList + "?userId=" + userId + "&productId=" + productId,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
     });

     RemoveList(productId, productName);
     
}



export function AddList(productId, productName) {

    // GetToast(productId, productName, "listenize eklendi.");

    if (document.getElementsByClassName("cardList_" + productId).length > 0) {
        for (var i = 0; i < document.getElementsByClassName("cardList_" + productId).length; i++) {
            document.getElementsByClassName("cardList_" + productId)[i].classList.add("active");
        }
    }

    if (document.getElementById("hero_" + productId) != null) {
        document.getElementById("hero_" + productId).classList.add("active");
        if(document.getElementById("heroText_" + productId)){
            document.getElementById("heroText_" + productId).innerText = "Listemden Çıkar";
        }
    }

    if (document.getElementById("bigCard_" + productId)!= null) {
        document.getElementById("bigCard_" + productId)?.classList.add("active");

        if(document.getElementById("heroText_" + productId)){
        document.getElementById("bigText_" + productId).innerText = "Listemden Çıkar";
        }
       
    } 
}

//Listemden Çıkar fonksiyonundan sonra ekrandaki Card ve Hero komponentlerini günceller.
export function RemoveList(productId, productName) {

    // GetToast(productId, productName, "listenizden çıkarıldı.");

    if (document.getElementsByClassName("cardList_" + productId).length > 0) {
        for (var i = 0; i < document.getElementsByClassName("cardList_" + productId).length; i++) {
            document.getElementsByClassName("cardList_" + productId)[i].classList.remove("active");
        }
    }

    if (document.getElementById("hero_" + productId) != null) {
        document.getElementById("hero_" + productId).classList.remove("active");
        if(document.getElementById("heroText_" + productId)){
            document.getElementById("heroText_" + productId).innerText = "Listeme Ekle";
        }
        
    }

    if (document.getElementById("bigCard_" + productId)!= null) {
        document.getElementById("bigCard_" + productId).className="big-slider-add-list";

        if(document.getElementById("heroText_" + productId)){
        document.getElementById("bigText_" + productId).innerText = "Listeme Ekle";
        }
       
    } 

   if (window.location.href.indexOf('liste') > -1 || document.getElementsByClassName("list_")>0){RemovePageList(productId)};
}
function RemovePageList(productId) {

    document.getElementById("list_" + productId).classList.add("fadeOutCard");
    setTimeout(() => { document.getElementById("list_" + productId).remove(); }, 500);
    if (document.getElementsByClassName("swiperList").length == 0) {
        document.getElementsByClassName("watchList")[0].style.display = "none";
        document.getElementsByClassName("list-page")[1].style.display = "block";
    }

}




export function useToast(productId, productName, desc) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(toastTimeout);
    };
  }, []);

  return (
    <>
      {visible && (
        <div id={`toast_${productId}`}>
          <div className="innerSnack fadeinCard">{productName} {desc}</div>
        </div>
      )}
    </>
  );
}

import { api } from '../Constants/API';


export function useLikeToProduct(userId, productId, productName, isLike) {

    if (userId == '00000000-0000-0000-0000-000000000000') return;

    fetch(api.LikeOrDislikeToProduct + "?userId=" + userId + "&productId=" + productId + "&isLike=" + isLike, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (isLike) LikeProduct(productId, productName);
    else DislikeProduct(productId, productName);
}


export function useLikeToChannel(userId, channelUrl, channelName, isLike){


    if (userId == '00000000-0000-0000-0000-000000000000') return;

    fetch(api.LikeOrDislikeToChannels + "?userId=" + userId + "&isLike=" + isLike + "&isDisLike=" + !isLike + "&ChannelNameForUrl=" + channelUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


} 

export function useLikeToChannelWithDislike(userId, channelUrl, channelName, isLike, isDisLike){


    if (userId == '00000000-0000-0000-0000-000000000000') return;

    fetch(api.LikeOrDislikeToChannels + "?userId=" + userId + "&isLike=" + isLike + "&isDisLike=" + isDisLike + "&ChannelNameForUrl=" + channelUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


} 


function LikeProduct(productId, productName) {

    //GetToast(productId, productName, "beğenilerinize eklendi.");

    for (var i = 0; i < document.getElementsByClassName("cardLike_" + productId).length; i++) {
        document.getElementsByClassName("cardLike_" + productId)[i].classList.add("active");
    }
}

//Beğenmeme fonksiyonundan sonra ekrandaki Card komponentlerini günceller.
function DislikeProduct(productId, productName) {

    // GetToast(productId, productName, "beğenilerinizden çıkarıldı.");

    for (var i = 0; i < document.getElementsByClassName("cardLike_" + productId).length; i++) {
        document.getElementsByClassName("cardLike_" + productId)[i].classList.remove("active");
    }
    if (window.location.href.indexOf('begeniler') > -1) RemovePageList(productId);
}

export function UpdateLikedChannelsOrder(channels, userId){
    
    fetch(api.UpdateLikedChannelsOrder+ "?userId=" + userId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(channels)
    });
}

export async function getChannelIsLiked(userId, channelNameForUrl) {
    console.log(userId, "first")
    if (userId == '00000000-0000-0000-0000-000000000000' || userId == undefined) {
      return false;
      
    } else {
      
      try {
        if (!api.GetIsLikedChannel) {
          throw new Error('API endpoint not defined');
        }
  
        const response = await fetch(`${api.GetIsLikedChannel}?userId=${userId}&channelNameForUrl=${channelNameForUrl}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
    
  return data;
        // Bu noktada data içinde beklenen değeri kullanabilirsiniz.
        // Örneğin: return data.isLiked;
  
      } catch (error) {
        console.error('Fetch error:', error);
  
        // Hata durumunda nasıl davranması gerektiğine karar verin.
        // Örneğin: return false; veya throw error;
      }
    }
  }
  
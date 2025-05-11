export default function useGetImage(mediaAssets, sizeList) {
   var image = sizeList.filter(i=>i=="195x260").length>0? "/assets/images/Dummy_Vertical.jpg": "/assets/images/modal-placeholder-turkuvapp.jpg";
   if (mediaAssets != undefined) {
      sizeList.forEach(size => {
         var media = mediaAssets.filter(i => i.AssetAttribute == size);
         if (media.length > 0 ) {
            image = media[0].Path.split(":")[0]=="https"? media[0].Path :"https://ia.tmgrup.com.tr/" + media[0].Path;
         }
      });
   }
   return image;
}
//#region import
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../config/Auth';
//hook
import { useSignIn } from '../../../config/Hook/UserHook';
import { useLikeToProduct } from '../../../config/Hook/LikeTransactionsHook';

//#endregion

function SocialArea({  video }) {

    //#region attr
   
    const [liked, setLiked] = useState(video.IsLike==null || video.IsLike == "null"|| video.IsLike==false?  false : true );

    const signIn = useSignIn();
    const { authTokens } = useAuth();
    const userId = authTokens != null && authTokens != "null" ? authTokens.split('|')[1] : '00000000-0000-0000-0000-000000000000';
    //#endregion

    //#region funcs
    const Like = () => {
        if (authTokens != null && authTokens != "null") {
            useLikeToProduct(userId, video.ProductId, video.ProductName, !liked);
          
            setLiked(!liked);
        }
        else signIn();
    }
    //#endregion

    return (
        <>
            { <a className={"video-button-like radius-50" + (liked && " active" )} style={{padding:5}} onClick={() => { Like(); }}>
                <svg width="20" height="20" viewBox="0 0 26 24" >
                    <path d="M24.019 17.525c1.094 0 1.981-.908 1.981-2.029 0-1.12-.887-2.029-1.981-2.029h-.566v-.016c1.094 0 1.981-.909 1.981-2.03 0-1.12-.887-2.028-1.98-2.028v-.012l-7.874.102c1.522-2.733 1.51-5.828 1.298-7.718C16.766.76 15.938 0 14.951 0c-.973 0-1.79.74-1.923 1.726-.437 3.246-1.936 4.583-3.299 6.563C8.147 10.587 8 13.224 8 13.224v7.168C8 22.385 9.577 24 11.523 24h11.93c.767 0 1.39-.637 1.39-1.422 0-.786-.623-1.423-1.39-1.423.975 0 1.765-.809 1.765-1.806 0-.998-.79-1.807-1.765-1.807v-.017h.566zM4.638 24H1.362C.61 24 0 23.43 0 22.727V11.273C0 10.57.61 10 1.362 10h3.276C5.39 10 6 10.57 6 11.273v11.454C6 23.43 5.39 24 4.638 24" fill="#FFF" fillRule="evenodd"></path>
                </svg>
            </a>
             }
       
        </>
    );
}

export default SocialArea;
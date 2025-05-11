import { useAuth } from "../Auth";


export function useSignIn() {
    const { authTokens, setAuthTokens } = useAuth();

    const signIn = () => {
        const siteId = '46C4D652-21A8-4945-9714-60D6560B1CA0';
        window.TMDAuthentication.ShowLoginPopup({
            webSiteId: siteId,
            callback: function (user) {
                let cookie = decodeURIComponent(getCookieForWebsite('.AuthDecr'));

                document.cookie = "userId=" + cookie.split('|')[1];
                setAuthTokens(cookie);
                location.reload();
            },
            cookieExpireDays: 2

        })

    }

    return signIn;
}

export function useGetUserId(req) {
    return (req.cookies.userId != undefined && req.cookies.userId != null && req.cookies.userId != '') ? req.cookies.userId : '00000000-0000-0000-0000-000000000000';
}



// export function useGetCookieForWebsite(cname) {
//     function getCookie(cname) {
//       var name = cname + "=";
//       var decodedCookie = decodeURIComponent(document.cookie);
//       var ca = decodedCookie.split(';');
//       for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//         }
//         if (c.indexOf(name) === 0) {
//           return c.substring(name.length, c.length);
//         }
//       }
//       return "";
//     }
//     return getCookie(cname);
// }
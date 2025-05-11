import React, { useEffect } from 'react';
import HeadElement from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

export default function Head({ title, description, canonical }) {

    const router = useRouter();
  var versionStyle=4;
    useEffect(() => {
        //#region Gemius Code
        //(C)2000 - 2022 Gemius SA - gemiusPrism / 724izle.com 
        var pp_gemius_identifier = (window.location.pathname == "/" || window.location.pathname == "") ? 'ncqaeDuRmyRVB__jHepjo8SZHZdWxq9Fud6HIitsUhf.W7' : '.cAwEit3rwwrb6I.9hx0HKPePziG14buQ1qaNO.kJ1n._7';
        // lines below shouldn't be edited
        function gemius_pending(i) { window[i] = window[i] || function () { var x = window[i + '_pdata'] = window[i + '_pdata'] || []; x[x.length] = arguments; }; };
        gemius_pending('gemius_hit'); gemius_pending('gemius_event'); gemius_pending('gemius_init'); gemius_pending('pp_gemius_hit'); gemius_pending('pp_gemius_event'); gemius_pending('pp_gemius_init');
        (function (d, t) {
            try {
                var gt = d.createElement(t), s = d.getElementsByTagName(t)[0], l = 'http' + ((location.protocol == 'https:') ? 's' : ''); gt.setAttribute('async', 'async');
                gt.setAttribute('defer', 'defer'); gt.src = l + '://gatr.hit.gemius.pl/xgemius.js'; s.parentNode.insertBefore(gt, s);
            } catch (e) { }
        })(document, 'script');
        gemius_pending('pp_gemius_hit');
        pp_gemius_hit(pp_gemius_identifier);
        //--><!]]>
        //#endregion
        //#region Google tag (gtag.js)
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-DFBRVWBGGK');
        //#endregion
    }, [router])
   
    return (
        <>
            <HeadElement>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

                <link rel="canonical" href={canonical} />
                <meta name="referrer" content="origin-when-crossorigin" id="meta_referrer" />
                 <meta property="og:type" content="website" />
                 <meta property="og:site_name" content="Turkuvapp" />
                <meta property="og:locale" content="tr_TR" />
                <meta property="og:article:author" content="Turkuvapp" />
                <meta property="og:article:section" content="News" />
                <meta property="og:url" content="https://www.turkuvapp.com" />
                <meta property="fb:pages" content="" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="Turkuvapp" />
                  <meta name="twitter:creator" content="Turkuvapp" />
                {
                    !router.asPath.includes("/izle/") &&
<React.Fragment>
<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:description" content={description} />
<meta name="twitter:title" content="Turkuvapp" />
<meta property="twitter:description" content="Ücretsiz videolar ve filmler, haber, canlı yayın senin için seçilmiş belgeseler ve çok özel röportajlar yayınlarıyla Turkuvapp hayatın her anında yanında! Turkuvapp ile  ücretsiz video, film ve yayınları izle!" />                         
<meta property="og:image" content="https://www.turkuvapp.com/assets/images/turkuvapp-og.jpg" />
<meta name="twitter:image" content="https://www.turkuvapp.com/assets/images/turkuvapp-og.jpg" />
<meta property="og:title" content="Turkuvapp" />     
</React.Fragment>
                }
                
                <meta name="twitter:domain" content="https://www.turkuvapp.com" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#000000" />
                <meta http-equiv="cache-control" content="max-age=0" />
                <meta http-equiv="cache-control" content="no-cache" />
                <meta http-equiv="expires" content="0" />
                <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
                <meta http-equiv="pragma" content="no-cache" />
                <link rel="shortcut icon" type="image/x-icon" sizes="180x180" href="/assets/images/favicon-v2.ico" />
                <link href={"/assets/css/headerV2.css?v="+versionStyle} rel="stylesheet" />
                <link href={"/assets/css/footer.css?v="+versionStyle} rel="stylesheet" />
                <link href={"/assets/css/swiper.min.css?v="+versionStyle} rel="stylesheet" />
                <link href={"/assets/css/customV2.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/bootstrap-grid.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/preview-modal.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/hero-slider.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/special-widget.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/big-slider.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/new-slider.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/podcast-slider.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/hero-container.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/default-slider.css?v=" +versionStyle} rel="stylesheet" />
                <link href={"/assets/css/player-area.css?v=" +versionStyle} rel="stylesheet" />
            </HeadElement>
            {/*Login*/}
            {
                process.env.NODE_ENV === 'production' ? (
                    <Script type="text/javascript" src="https://i.tmgrup.com.tr/uyelik/popupauth/j/popupauthentication.js?v=2022-12-02" />
                ) : (
                    <Script type="text/javascript" src="https://i.tmgrup.com.tr/uyelik/popupauth/j/popupauthentication.dev.js?v=2022-09-02" />
                )
            }
                    {/*GA4 Script*/}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DFBRVWBGGK" />
            <Script async src="/assets/js/custom.js" />
        </>
    );
}

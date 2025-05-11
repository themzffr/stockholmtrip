import React, { useState } from 'react'
import Link from 'next/link';
import Head from 'next/head';

const Error = () => {

    const [timeleft, setTimeleft] = useState(5);
    const [timer, setTimer] = useState(true);

    const downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        }

        setTimeleft(timeleft - 1);
    }, 1000);

    const goHome = () => {
        setTimer(false)
    }

    setTimeout(goHome, 5000);
    if (timer === true) {
        return (
            <div className="body">
                <Head>
                    <link href="/assets/css/error.css" rel="stylesheet" />
                </Head>
                <div className="header">
                  <div className="error-content">   <Link href="/" >  <img src='/assets/images/main-logo-v2.png' /> </Link></div>
                </div>
                <div className="container error-container">
                    <div className="error-content">
                        <img src='/assets/images/error.png' />
                        <p className="t2"> SAYFA BULUNAMADI</p>
                        <p>Gitmek istediğiniz sayfa taşınmış veya adı değiştirilmiş olabilir. </p>
                        <p>
                            <span id="t">{timeleft}</span> saniye içinde ana sayfaya yönlendirileceksiniz. <br /> Beklemek istemiyorsanız  <Link href="/" id="link">tıklayın</Link>
                        </p>

                    </div>
                </div>

            </div>
        )
    } else { return window.location.href = "/"; }

}
export default Error;
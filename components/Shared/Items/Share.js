import React, { useState } from 'react'
import ShareBox from './ShareBox';

export default function Share({ nameForUrl }) {

    const [socialAreaShow, setsocialAreaShow] = useState(false);

    

    return (
        <>
            <a className="player-social-more-button radius-50" onClick={() => { setsocialAreaShow(!socialAreaShow) }}>
            <svg width="33px" height="24px" viewBox="0 0 33 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                                <title>Path</title>
                                                <g id="desktop" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.600000024">
                                                    <g id="1_3_1_724Izle_home_diziPlay_D" transform="translate(-971.000000, -660.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                        <g id="Group-14" transform="translate(796.000000, 650.000000)">
                                                            <g id="Group-18" transform="translate(168.000000, 0.000000)">
                                                                <path d="M27.8017095,18.0000857 C18.4017095,18.0000857 10.2017095,24.4002286 7.92170952,33.5200857 L7.80173095,34 C12.921731,28.88 19.881731,26 27.121731,26 L27.8016952,26 L27.8016952,34 L39.8016952,22 L27.8016952,10 L27.8017095,18.0000857 Z" id="Path"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>


        
            </a>
            {
                socialAreaShow ? 
               <ShareBox nameForUrl={nameForUrl} />: <></>
             } </>
    )
}


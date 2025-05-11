//#region import
import React from 'react';

import Link from 'next/link';
//#endregion

const EmptyList = (props) => {
    return (
        <div className="list-page" style={{ display: props.display }}>
            <h1 className="mb-4">{ props.Title }</h1>
            <div className="list-page-text mb-4">Listenize henüz içerik eklememişsiniz. <br />
                <a className="list-page-add-button">
                    <svg width={24} height={24} viewBox="0 0 24 24"  >
                        <path d="M12 4a1 1 0 0 1 1 1v5.999L19 11a1 1 0 0 1 0 2l-6-.001V19a1 1 0 0 1-2 0v-6.001L5 13a1 1 0 0 1 0-2l6-.001V5a1 1 0 0 1 1-1z" fill="#FFF" fillRule="evenodd" />
                    </svg>
                </a> ikonuna basarak kendinize özel bir arşiv hazırlayabilirsiniz.</div>
            <Link href='/kesfet' className="list-page-button">
                <svg width={24} height={24} viewBox="0 0 24 24"  >
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm4 4-2.168 5.832L8 16l2.168-5.832L16 8z" fill="#FFF" fillRule="evenodd" />
                </svg>
                <span>Keşfet</span>
            </Link>
        </div>

    );
}


export default EmptyList;
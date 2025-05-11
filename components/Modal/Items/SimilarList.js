//#region import
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useClicked } from '../../../config/Clicked';
import { api } from '../../../config/Constants/API';
import useGetImage from '../../../config/Hook/ImageHook';
//#endregion

export default function SimilarList(props, { closeModal }) {

    const { clickedId, setModalOpen } = useClicked();
    const [similarList, setSimilarList] = useState([]);

    useEffect(() => {
        (async () => {
            if (props.categoryId != undefined && props.categoryId != null) {

                await fetch(api.GetSameProducts + "?categoryId=" + props.categoryId + "&productId=" + clickedId + "&take=6")
                    .then(response => response.json())
                    .then(data => {
                        setSimilarList(data)
                    })

                return () => { setSimilarList([]) }
            }

        })();
        return () => { setSimilarList([]); }
    }, [clickedId, props.categoryId])

    return (
        similarList.length > 0 ?
            <div className="preview-modal-similar">
                <div className="preview-modal-similar-title">
                    Benzer Yapımlar
                </div>
                <div className="preview-modal-similar-content">
                    {
                        similarList.map((similar) => {
                            return (
                                <figure className="similar-box" key={similar.Id} onClick={closeModal}>
                                    <Link href={"/izle/" + similar.NameForUrl} className="img-holder _300x168" onClick={() => { setModalOpen(false) }}>
                                        <picture>
                                            <source srcSet={useGetImage(similar.MediaAssets, ["300x168", "450x252"])} width={300} height={168} media="(min-width: 768px)" />
                                            <img src={useGetImage(similar.MediaAssets, ["450x252","300x168"])} width={450} height={252} className="lazyloaded" data-loadmode={1} alt={similar.Name} />
                                        </picture>
                                    </Link>
                                    <figcaption>
                                        <a >
                                            <span>{similar.Name}</span>
                                            {/* <i>1s 52dk</i> */}
                                        </a>
                                    </figcaption>
                                </figure>
                            );
                        })
                    }
                </div>
            </div>
            : <></>
    );

}
//#region import
import React from 'react';
import Link from 'next/link';
import { useClicked } from '../../../config/Clicked';
import useGetImage from '../../../config/Hook/ImageHook';
//#endregion

const Episode = ({ productName, episode, index }) => {

    const { setModalOpen } = useClicked();

    return (
        <figure className="episode-box" onClick={() => { setModalOpen(false) }}>
            <Link href={"/izle/" + productName + "/" + episode.NameForUrl} className="img-holder _300x168">
                <picture>
                   <source srcSet={useGetImage(episode.MediaAssets, ["192x108", "300x168"])} width={192} height={108} media="(min-width: 768px)" />
                    <img src={useGetImage(episode.MediaAssets, ["450x252", "300x168"])} width={450} height={252} className="lazyloaded" data-loadmode={0} alt={episode.Name} />
                </picture>
            </Link>
            <figcaption>
                <Link href={"/izle/" + productName + "/" + episode.NameForUrl} >
                    <strong>{index}</strong>
                    <span>
                        <u>{episode.Name}</u>
                        <i>{episode.DurationTime}</i>
                    </span>
                </Link>
            </figcaption>
        </figure>
    );
}
export default Episode;
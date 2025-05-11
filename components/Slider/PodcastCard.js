import React from 'react'
import Link from 'next/link'
import SVG from '../../config/Constants/SVG'
import useGetImage from '../../config/Hook/ImageHook';

export default function PodcastCard({product, index}) {
  return (

                                <Link href={"/izle/" + product.NameForUrl + (product.VideoNameForUrl != null ? ("/" + product.VideoNameForUrl) : "")} className="podcast-slider-item">
                                    <span className="podcast-slider-number">
                                     <SVG icon={index+1}  />                                                                                                                                                                                                                                                                                     
                                    </span>
                                    <img src={useGetImage(product.MediaAssets, ["194x194", "450x450"])} data-src="temp/194x194.jpg" width="194" height="194" className=" ls-is-cached lazyloaded" alt={product.Name} style={{objectFit:"cover"}} />
                                </Link>
                            
  )
}

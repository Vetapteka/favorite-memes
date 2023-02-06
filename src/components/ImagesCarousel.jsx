import React, { useEffect, useState } from 'react';
import { fetchImage, fetchImagesNames } from '../API';
import { convertToSrc } from '../util';
import Image from './Image';

const ImagesCarousel = ({ url }) => {
    const [imagesSrc, setImagesSrc] = useState([]);

    useEffect(() => {
        fetchImagesNames(url).then((names) => {
            const imagesUrls = names.map((name) => url + '/' + name);

            Promise.all(
                imagesUrls.map((url) =>
                    fetchImage(url).then((image) => convertToSrc(image))
                )
            ).then((srcs) => setImagesSrc(srcs));
        });
    }, []);

    return (
        <section>
            {imagesSrc.map((src, index) => (
                <Image key={index} src={src} />
            ))}
        </section>
    );
};

export default ImagesCarousel;

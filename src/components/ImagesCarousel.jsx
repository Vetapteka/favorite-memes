import React, { useEffect, useState } from 'react';
import { fetchImage, fetchImagesNames } from '../API';
import { convertToSrc } from '../util';
import Image from './Image';
import styled, { keyframes } from 'styled-components';

const Section = styled.section``;

const Panel = styled.div`
    margin-top: 20px;
    display: flex;
    width: 100%;
`;

const Button = styled.button`
    width: 3%;
`;
const Content = styled.div`
    width: 94%;
    overflow: hidden;
`;

const Сonveyor = styled.ul`
    width: fit-content;
    white-space: nowrap;
    list-style: none;
    transform: translateX(10%);
`;

const ImageContainer = styled.li`
    height: 400px;
    padding: 10px;
    display: inline-block;
`;

const Title = styled.h2`
    background-color: #fce9e8;
    display: block;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
`;

const ImagesCarousel = ({ url, title }) => {
    const [imagesSrc, setImagesSrc] = useState([]);

    const turnLeft = () => {};
    const turnRight = () => {};

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
        <Section>
            <Title>{title}</Title>
            <Panel>
                <Button onClick={turnLeft}>a</Button>
                <Content>
                    <Сonveyor>
                        {imagesSrc.map((src, index) => (
                            <ImageContainer key={index}>
                                <Image src={src} />
                            </ImageContainer>
                        ))}
                    </Сonveyor>
                </Content>
                <Button onClick={turnRight}>b</Button>
            </Panel>
        </Section>
    );
};

export default ImagesCarousel;

import React, { useEffect, useState } from 'react';
import { fetchImage, fetchImagesNames } from '../API';
import { convertToSrc } from '../util';
import Image from './Image';
import { COLOR_LIGHT_PINK } from '../stylesVariables';
import styled, { keyframes } from 'styled-components';

const moveGorisontally = (x) => keyframes`
    from{
        transform: translateX(${x.from}px);
    }
    to {
        transform: translateX(${x.to}px);
    }
`;
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

    animation-name: ${(props) => moveGorisontally(props.moving)};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`;

const ImageContainer = styled.li`
    height: 400px;
    padding: 10px;
    display: inline-block;
`;

const Title = styled.h2`
    background-color: ${COLOR_LIGHT_PINK};
    display: block;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
`;

const ImagesCarousel = ({ url, title }) => {
    const [imagesSrc, setImagesSrc] = useState([]);
    const [moving, setMoving] = useState({ from: 0, to: 0 });

    const movingValue = 400;
    const turnLeft = () => {
        setMoving({ from: moving.to, to: moving.to + movingValue });
    };
    const turnRight = () => {
        setMoving({ from: moving.to, to: moving.to - movingValue });
    };

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
            <Title>{title}</Title>
            <Panel>
                <Button onClick={turnLeft}>a</Button>
                <Content>
                    <Сonveyor moving={moving}>
                        {imagesSrc.map((src, index) => (
                            <ImageContainer key={index}>
                                <Image src={src} />
                            </ImageContainer>
                        ))}
                    </Сonveyor>
                </Content>
                <Button onClick={turnRight}>b</Button>
            </Panel>
        </section>
    );
};

export default ImagesCarousel;

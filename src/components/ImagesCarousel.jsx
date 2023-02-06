import React, { useEffect, useState } from 'react';
import { fetchImage, fetchImagesNames } from '../API';
import { convertToSrc } from '../util';
import Image from './Image';
import { COLOR_PINK_LIGHT, COLOR_GREY_LIGHT } from '../stylesVariables';
import arrowIcon from '../assets/arrow.png';
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
    width: 40px;
    background-color: white;
    border: 1px dashed ${COLOR_GREY_LIGHT};
    border-radius: 10px;
`;
const Content = styled.div`
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
    background-color: ${COLOR_PINK_LIGHT};
    display: block;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
`;

const ImagesCarousel = ({ url, title }) => {
    const [imagesSrc, setImagesSrc] = useState([]);
    const [moving, setMoving] = useState({ from: 0, to: 0 });

    const movingValue = 200;
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
                <Button onClick={turnLeft}>
                    <img
                        style={{ transform: 'rotate(180deg)' }}
                        src={arrowIcon}
                    />
                </Button>
                <Content>
                    <Сonveyor moving={moving}>
                        {imagesSrc.map((src, index) => (
                            <ImageContainer key={index}>
                                <Image src={src} />
                            </ImageContainer>
                        ))}
                    </Сonveyor>
                </Content>
                <Button onClick={turnRight}>
                    <img src={arrowIcon} />
                </Button>
            </Panel>
        </section>
    );
};

export default ImagesCarousel;

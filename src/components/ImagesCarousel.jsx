import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fetchImage, fetchImagesNames } from '../API';
import { convertToSrc } from '../util';
import Image from './Image';
import { COLOR_PINK_LIGHT, COLOR_GREY_LIGHT } from '../stylesVariables';
import arrowIcon from '../assets/arrow.png';
import styled, { keyframes } from 'styled-components';

const imagePadding = 10;

const moveGorisontally = (x) => keyframes`
  from {
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
    padding: 0 3px;
    background-color: white;
    border: 1px dashed ${COLOR_GREY_LIGHT};
    border-radius: 10px;
`;
const Content = styled.div`
    overflow: hidden;
`;

const Conveyor = styled.ul`
    display: block;
    width: fit-content;
    white-space: nowrap;
    list-style: none;

    animation-name: ${(props) => moveGorisontally(props.moving)};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`;

const ImageContainer = styled.li`
    height: 400px;
    padding: ${imagePadding}px;
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
    const ref = useRef(null);
    const refMemeLine = useRef(null);

    const [contentWidth, setContentWidth] = useState(0);
    const [memeLineWidth, setMemeLineWidth] = useState(0);

    useLayoutEffect(() => {
        setContentWidth(ref.current.offsetWidth);
        // setMemeLineWidth(refMemeLine.current.offsetWidth);
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setContentWidth(ref.current.offsetWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [moving, setMoving] = useState({ from: 0, to: 0 });

    const movingValue = 400;

    const turnLeft = () => {
        const toValue = Math.min(moving.to + movingValue, 0);

        setMoving({ from: moving.to, to: toValue });
    };

    /*TODO: Вот тут 80 заменить на ширину кнопки */
    const turnRight = () => {
        const toValue = Math.max(
            moving.to - movingValue,
            -(memeLineWidth - (contentWidth - 80 - 10))
        );
        setMoving({ from: moving.to, to: toValue });
    };

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

    useEffect(() => {
        setMemeLineWidth(refMemeLine.current.offsetWidth);
    });

    return (
        <section>
            <Title>{title}</Title>
            <Panel ref={ref}>
                <Button onClick={turnLeft}>
                    <img
                        style={{ transform: 'rotate(180deg)' }}
                        src={arrowIcon}
                        alt='arrow left'
                    />
                </Button>
                <Content>
                    <Conveyor ref={refMemeLine} moving={moving}>
                        {imagesSrc.map((src, index) => (
                            <ImageContainer key={index}>
                                <Image src={src} />
                            </ImageContainer>
                        ))}
                    </Conveyor>
                </Content>
                <Button onClick={turnRight}>
                    <img src={arrowIcon} alt='arrow right' />
                </Button>
            </Panel>
        </section>
    );
};

export default ImagesCarousel;

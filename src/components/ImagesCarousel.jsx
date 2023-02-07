import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fetchImage, fetchImagesNames } from '../API';
import { convertToSrc } from '../util';
import Image from './Image';
import { COLOR_PINK_LIGHT, COLOR_GREY_LIGHT } from '../stylesVariables';
import arrowIcon from '../assets/arrow.png';
import styled, { keyframes } from 'styled-components';

const imagePadding = 10;
const arrowIconWidth = 32;
const buttonWidth = arrowIconWidth + 8;

class MovingCoords {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}

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
    min-width: ${buttonWidth}px;
    background-color: white;
    border: 1px dashed ${COLOR_GREY_LIGHT};
    border-radius: 10px;
    box-sizing: border-box;
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

    @media ${(props) => props.theme.media.phone} {
        height: 250px;
    }

    @media ${(props) => props.theme.media.tablet} {
        height: 300px;
    }
`;

const Title = styled.h2`
    background-color: ${COLOR_PINK_LIGHT};
    display: block;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
`;

const ImagesCarousel = ({ url, title }) => {
    // calculate width of
    const ref = useRef(null);
    const conveyorRef = useRef(null);

    const [contentWidth, setContentWidth] = useState(0);
    const [conveyorWidth, setConveyorWidth] = useState(0);
    const [movingValue, setMovingValue] = useState(0);

    useLayoutEffect(() => {
        setContentWidth(ref.current.offsetWidth);
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

    useEffect(() => {
        setConveyorWidth(conveyorRef.current.offsetWidth);
        setMovingValue(contentWidth / 3);
    });

    const [movingCoord, setMovingCoord] = useState(new MovingCoords(0, 0));

    const turnLeft = () => {
        const toValue = Math.min(movingCoord.to + movingValue, 0);
        setMovingCoord(new MovingCoords(movingCoord.to, toValue));
    };

    const turnRight = () => {
        const toValue = Math.max(
            movingCoord.to - movingValue,
            -(conveyorWidth - (contentWidth - 2 * buttonWidth - imagePadding))
        );
        setMovingCoord(new MovingCoords(movingCoord.to, toValue));
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

    return (
        <section>
            <Title>{title + ' ' + movingValue + ' ' + contentWidth}</Title>
            <Panel ref={ref}>
                <Button onClick={turnLeft}>
                    <img
                        style={{ transform: 'rotate(180deg)' }}
                        src={arrowIcon}
                        alt='arrow left'
                    />
                </Button>
                <Content>
                    <Conveyor ref={conveyorRef} moving={movingCoord}>
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

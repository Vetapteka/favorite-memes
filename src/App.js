import React from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import ImagesCarousel from './components/ImagesCarousel';
import { MEMES_BEST_URL, MEMES_CATS_URL } from './global';
import styled from 'styled-components';

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const CaurouselContainer = styled.div`
    margin: 30px 0;
`;

function App() {
    return (
        <Wrapper>
            <Header />
            <Main>
                <CaurouselContainer>
                    <ImagesCarousel
                        title='лучшее свежее: '
                        url={MEMES_BEST_URL}
                    />
                </CaurouselContainer>
                <CaurouselContainer>
                    <ImagesCarousel
                        title='лучшее с котами: '
                        url={MEMES_CATS_URL}
                    />
                </CaurouselContainer>
            </Main>
            <Footer />
        </Wrapper>
    );
}

export default App;

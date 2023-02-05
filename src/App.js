import React from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import styled from 'styled-components';

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        <Wrapper>
            <Header />
            <Main></Main>
            <Footer />
        </Wrapper>
    );
}

export default App;

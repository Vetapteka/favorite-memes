import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const StyledMain = styled.main`
    flex-grow: 1;
`;

const Main = (props) => {
    return (
        <StyledMain {...props}>
            <Container>{props.children}</Container>
        </StyledMain>
    );
};

export default Main;

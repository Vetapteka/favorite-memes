import React from 'react';
import { COLOR_PINK } from '../../stylesVariables';
import Container from './Container';
import styled from 'styled-components';

const StyledHeader = styled.header`
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 100;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${COLOR_PINK};
    padding: 15px;
    border-radius: 30px;
`;

const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <Content>
                    <h1>это валидная html-ка с любимыми мемами</h1>
                </Content>
            </Container>
        </StyledHeader>
    );
};

export default Header;

import React from 'react';
import Container from './Container';
import { CODE_URL, GIT_URL } from '../../global';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    flex-grow: 0;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <Container>
                <Content>
                    <a href={CODE_URL}>source code</a>
                    <div>{new Date().getFullYear()}</div>
                    <a href={GIT_URL}>about me</a>
                </Content>
            </Container>
        </StyledFooter>
    );
};

export default Footer;

import React from 'react';
import Container from './Container';
import { CODE_URL, GIT_URL } from '../../global';
import { COLOR_FIOL, COLOR_PINK_LIGHT } from '../../stylesVariables';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    flex-grow: 0;
`;

const Content = styled.div`
    display: flex;
    background-color: ${COLOR_PINK_LIGHT};
    padding: 10px;
    border-radius: 10px;
    justify-content: space-around;
`;

const Link = styled.a`
    color: ${COLOR_FIOL};
`;

const Footer = () => {
    return (
        <StyledFooter>
            <Container>
                <Content>
                    <Link href={CODE_URL} target='_blank'>
                        source code
                    </Link>
                    <div>{new Date().getFullYear()}</div>
                    <Link href={GIT_URL} target='_blank'>
                        about me
                    </Link>
                </Content>
            </Container>
        </StyledFooter>
    );
};

export default Footer;

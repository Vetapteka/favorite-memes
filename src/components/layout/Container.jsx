import React from 'react';
import styled from 'styled-components';
import { CONTENT_WIDTH } from '../../stylesVariables';

const StyledContainer = styled.div`
    max-width: ${CONTENT_WIDTH};
    margin: 0 auto;
    padding: 10px;
`;
const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;

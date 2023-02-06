import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
    display: block;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
`;
const Image = ({ src }) => {
    return <StyledImage src={src} />;
};

export default Image;

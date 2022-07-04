import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';

export const FaBarIcon = styled(FaBars)`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;



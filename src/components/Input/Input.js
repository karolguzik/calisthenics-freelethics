import styled from 'styled-components';

const Input = styled.input`
  width:100%;
  padding: .5rem 1rem;
  background: rgba(65,65,68, .5);
  color: ${({theme}) => theme.fontColorDark};
  border: none;
`;

export default Input;

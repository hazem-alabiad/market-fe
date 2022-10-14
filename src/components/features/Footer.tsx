import styled from "styled-components";

export const Footer = () => (
  <StyledFooter>
    <div>©2019 Market</div>
    <div>•</div>
    <div>Privacy Policy</div>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  color: ${({ theme }) => theme.brand.secondary.text};
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 136px;
`;

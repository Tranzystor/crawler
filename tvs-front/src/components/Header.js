import React from "react";
import moment from "moment";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const HeaderElement = styled.div`
  width: 200px;
`;

const formatDate = date => {
  return moment(date).format("D-MMM-YY");
};

const Header = ({ tv }) => {
  const {
    model,
    diagonal,
    lowestPrice,
    lowestPriceDate,
    newestDate,
    newestPrice
  } = tv;
  return (
    <Wrapper>
      <HeaderElement>{model}</HeaderElement>
      <HeaderElement>{diagonal}[cal]</HeaderElement>
      <HeaderElement>{formatDate(lowestPriceDate)}</HeaderElement>
      <HeaderElement>{lowestPrice}</HeaderElement>
      <HeaderElement>{formatDate(newestDate)}</HeaderElement>
      <HeaderElement>{newestPrice}</HeaderElement>
    </Wrapper>
  );
};

export default Header;

import styled from "styled-components";

export const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 10px 14.6px 10px 0;
  border-color: transparent white transparent transparent;
  transform: rotate(90deg);
  position: relative;
`;

export const InnerTriangle = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 9px 12.6px 9px 0;
  border-color: transparent rgba(248, 251, 255) transparent transparent;
  transform: rotate(90deg);
  position: absolute;
  bottom: 0;
  left: 1px;
`;
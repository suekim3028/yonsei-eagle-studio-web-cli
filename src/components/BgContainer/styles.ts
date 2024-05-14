"use client";
import { styledUtils } from "@web-core";
import styled from "styled-components";

export const Circle = styled.div`
  top: 125px;
  width: 130dvw;
  height: 130dvw;
  left: -15dvw;
  background-color: #d0e9ff;
  border-radius: 50%;
  position: absolute;
  ${styledUtils.blur(34.1)}
  z-index: 0;
`;

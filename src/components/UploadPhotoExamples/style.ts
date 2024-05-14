"use client";
import styled from "styled-components";

export const ScrollWrapper = styled.div`
  scrollbar-width: none;
  display: flex;
  overflow-x: scroll;
  padding: 0px 28px;
  max-width: 100%;
  align-self: center;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

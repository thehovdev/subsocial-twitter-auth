import ContainerStyled from "./Container.styled";
import React from "react";
import {JSXElement} from "@babel/types";

interface LayoutProps {
  children: React.ReactNode
}
export default function Container(props: LayoutProps) {
  return <ContainerStyled>
    {props.children}
  </ContainerStyled>
}
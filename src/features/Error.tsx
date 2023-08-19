"use client";

import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  font-size: 24px;
  align-items: center;
`;

type ErrorProps = {
  icon?: (props: { size?: number }) => ReactNode;
  children: ReactNode;
};

export function Error(props: ErrorProps) {
  return (
    <Wrapper>
      {props.icon && <div><props.icon size={48} /></div>}
      <div>{props.children}</div>
    </Wrapper>
  );
}

import { ReactNode } from "react";
import styled from "styled-components";

const TextWithLoadingWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
`;

type TextWithLoadingProps = {
  loading: boolean;
  children: ReactNode;
  component: ReactNode;
};

export function TextWithLoading(props: TextWithLoadingProps) {
  return (
    <TextWithLoadingWrapper>
      {props.loading && <div>{props.component}</div>}
      <div>{props.children}</div>
    </TextWithLoadingWrapper>
  );
}

import styled from "styled-components";
import { ds } from "../../style/designSystem";
import { ReactNode } from "react";

const Banner = styled.div`
  --banner-bg: ${ds.colors.gray.dynamic["300"]};

  background-color: var(--banner-bg);
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  gap: 8px;
`;

const Message = styled.div``;

type GenericBannerProps = {
  icon?: (props: { size: number }) => ReactNode;
  message: ReactNode;
  className?: string;
};

export function GenericBanner(props: GenericBannerProps) {
  return <Banner className={props.className}>
    {props.icon != null && <props.icon size={24} />}
    <Message>{props.message}</Message>
  </Banner>;
}

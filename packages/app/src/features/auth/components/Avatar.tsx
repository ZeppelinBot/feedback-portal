"use client";

import styled from "styled-components";
import { ClientUser } from "../entities/ClientUser";
import { ds } from "../../style/designSystem";
import { CSSProperties } from "react";

const Wrapper = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${ds.colors.gray.dynamic["300"]};
  font-size: 0.9em;
  font-weight: 600;
  line-height: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type AvatarProps = {
  user: ClientUser;
  style?: CSSProperties;
};

export function Avatar(props: AvatarProps) {
  if (! props.user.image) {
    return (
      <Wrapper style={props.style}>{props.user.name?.slice(0, 1).toUpperCase() ?? "?"}</Wrapper>
    );
  }

  return (
    <Wrapper style={props.style}>
      <img src={props.user.image} />
    </Wrapper>
  );
}

import { styled } from "styled-components";
import { ClientUser } from "../entities/ClientUser";
import { roles } from "../roles";
import { z } from "zod";
import { ClientAnonymousUser } from "../entities/ClientAnonymousUser";
import { CSSProperties } from "react";

type Role = z.infer<typeof roles>;

const roleColors: Record<Role, string> = {
  [roles.enum.ADMIN]: "rgb(46, 204, 113)",
  [roles.enum.MEMBER]: "rgb(52, 152, 219)",
};

const StyledUsername = styled.span`
  font-weight: 500;
`;

type UsernameProps = {
  user: ClientUser | ClientAnonymousUser;
  style?: CSSProperties;
};

export function Username(props: UsernameProps) {
  const style = props.user && "role" in props.user
    ? { color: roleColors[props.user.role] }
    : {};
  return <StyledUsername style={{ ...props.style, ...style }}>{props.user.name ?? ""}</StyledUsername>;
}

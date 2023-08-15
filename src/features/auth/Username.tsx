import { styled } from "styled-components";
import { ClientUser } from "./entities/ClientUser";
import { roles } from "./roles";

type Role = typeof roles[keyof typeof roles];

const roleColors: Record<Role, string> = {
  [roles.ADMIN]: "rgb(46, 204, 113)",
  [roles.MEMBER]: "rgb(52, 152, 219)",
};

const StyledUsername = styled.span`
  font-weight: 500;
`;

type UsernameProps = {
  user: ClientUser;
};

export function Username(props: UsernameProps) {
  return <StyledUsername style={{ color: roleColors[props.user.role as Role] }}>{props.user.name ?? ""}</StyledUsername>;
}

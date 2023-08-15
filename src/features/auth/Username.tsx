import { styled } from "styled-components";
import { ClientUser } from "./entities/ClientUser";
import { roles } from "./roles";
import { z } from "zod";

type Role = z.infer<typeof roles>;

const roleColors: Record<Role, string> = {
  [roles.enum.ADMIN]: "rgb(46, 204, 113)",
  [roles.enum.MEMBER]: "rgb(52, 152, 219)",
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

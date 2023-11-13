"use client";

import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { atBreakpoint } from "../style/breakpoints";
import { ds } from "../style/designSystem";
import { ClientUser } from "../auth/entities/ClientUser";
import { logout } from "../auth/actions/logout";
import { login } from "../auth/actions/login";
import NextLink from "next/link";
import { UnstyledButton } from "../general/components/UnstyledButton";
import { Home as HomeIcon, MessageRoundedAdd } from "@styled-icons/boxicons-solid";
import { LogOut } from "@styled-icons/boxicons-regular";
import { mobileFooterHeight } from "./values";

const MobileFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${atBreakpoint(ds.breakpoints.lg, css`
    display: none;
  `)}
`;

const MobileFooterMenu = styled.ul`
  display: flex;
  height: ${mobileFooterHeight};
  align-items: stretch;

  background-color: ${ds.colors.gray.dynamic["100"]};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);

  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  flex: 1 1 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

const menuItemContentStyles = css`
  display: block;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

const MenuLink = styled(NextLink)`
  text-decoration: none;
  color: currentColor;

  ${menuItemContentStyles}
`;

const MenuButton = styled(UnstyledButton)`
  ${menuItemContentStyles}
`;

const MenuForm = styled.form`
  flex: 1 1 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

type ClientMobileFooterProps = {
  currentUser: ClientUser | null;
};

export function ClientMobileFooter(props: ClientMobileFooterProps): ReactNode {
  return (
    <MobileFooterWrapper>
      <MobileFooterMenu role="menu">
        <MenuItem>
          <MenuLink href="/">
            <HomeIcon size="24px" />
            Home
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/feedback/new">
            <MessageRoundedAdd size="24px" />
            New feedback
          </MenuLink>
        </MenuItem>
        {(() => {
            if (props.currentUser) {
              return <>
                <MenuItem>
                  <MenuForm action={logout}>
                    <MenuButton>
                      <LogOut size="24px" />
                      Log out
                    </MenuButton>
                  </MenuForm>
                </MenuItem>
              </>;
            }

            return (
              <MenuItem>
                <MenuForm action={login}>
                    <MenuButton>
                      <LogOut size="24px" />
                      Sign in
                    </MenuButton>
                </MenuForm>
              </MenuItem>
            );
        })()}
      </MobileFooterMenu>
    </MobileFooterWrapper>
  );
}

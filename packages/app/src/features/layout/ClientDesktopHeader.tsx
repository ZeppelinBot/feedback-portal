"use client";

import styled, { css } from "styled-components";
import React, { ReactElement } from "react";
import logoUrl from "./logo.png";
import Image from "next/image";
import { ds } from "../style/designSystem";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { atBreakpoint } from "../style/breakpoints";
import { ClientUser } from "../auth/entities/ClientUser";
import { Username } from "../auth/components/Username";
import { login } from "../auth/actions/login";
import { logout } from "../auth/actions/logout";
import { Home as HomeIcon, MessageRoundedAdd } from "@styled-icons/boxicons-solid";
import { LogOut } from "@styled-icons/boxicons-regular";

const HeaderWrapper = styled.header`
  display: none;

  ${atBreakpoint(ds.breakpoints.lg, css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 64px;
  `)}
`;

const LogoArea = styled.div`
  flex: 0 0 auto;
  margin-top: 0;
`;

const LogoAreaLink = styled(NextLink)`
  color: ${ds.colorPresets.bodyText};
  text-decoration: none;

  &:visited {
    color: ${ds.colorPresets.bodyText};
  }

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const LogoImageWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 80px;
  height: 40px;
`;

const MainHeading = styled.h1`
  font: ${ds.text.fonts.heading};
  font-size: 28px;
  font-weight: 400;
  margin: 0;
`;

const MenuArea = styled.menu`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  gap: 16px;
`;

const MenuItem = styled.li`
  flex: 0 0 auto;
`;

const MenuSeparator = styled.div`
  border-left: 1px solid ${ds.colors.gray.dynamic["400"]};
`;

const menuLinkStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${ds.colors.gray.dynamic["800"]};
  text-decoration: none;
  font-weight: 500;

  padding: 8px;

  &:visited {
    color: ${ds.colors.gray.dynamic["800"]};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const activeMenuLinkStyles = css`
  font-weight: 700;
`;

type MenuLinkProps = {
  $active: boolean;
};

const MenuRouterLink = styled(NextLink)<MenuLinkProps>`
  ${menuLinkStyles}
  ${props => props.$active && activeMenuLinkStyles}
`;

const MenuButtonLink = styled.button<MenuLinkProps>`
  border: none;
  font: inherit;
  color: inherit;
  background: transparent;
  cursor: pointer;
  padding: 0;

  ${menuLinkStyles}

  ${props => props.$active && activeMenuLinkStyles}
`;

const MenuUsernameWrapper = styled.div`
  padding: 8px;
`;

type ClientMainHeaderProps = {
  user: ClientUser | null;
};

export function ClientDesktopHeader(props: ClientMainHeaderProps): ReactElement {
  const pathname = usePathname();

  return (
    <HeaderWrapper>
      <LogoArea>
        <LogoAreaLink href="/">
          <LogoImageWrapper>
            <Image
              src={logoUrl}
              alt=""
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </LogoImageWrapper>
          <MainHeading>
            Zeppelin Feedback Portal
          </MainHeading>
        </LogoAreaLink>
      </LogoArea>
      <MenuArea>
        <MenuList>
          <MenuItem>
            <MenuRouterLink href="/" $active={pathname === "/"}>
              <HomeIcon size="20px" />
              Home
            </MenuRouterLink>
          </MenuItem>
          <MenuItem>
            <MenuRouterLink href="/feedback/new" $active={pathname === "/feedback/new"}>
              <MessageRoundedAdd size="20px" />
              New feedback
            </MenuRouterLink>
          </MenuItem>
          <MenuSeparator />
          {(() => {
            if (props.user) {
              return <>
                <MenuItem>
                  <MenuUsernameWrapper>
                    <Username user={props.user} />
                  </MenuUsernameWrapper>
                </MenuItem>
                <MenuItem>
                  <form action={logout}>
                    <MenuButtonLink $active={false}>
                      Log out
                    </MenuButtonLink>
                  </form>
                </MenuItem>
              </>;
            }

            return (
              <MenuItem>
                <form action={login}>
                  <MenuButtonLink $active={false}>
                    Sign in
                  </MenuButtonLink>
                </form>
              </MenuItem>
            );
          })()}
        </MenuList>
      </MenuArea>
    </HeaderWrapper>
  );
}

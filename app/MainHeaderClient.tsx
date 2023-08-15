"use client";

import styled, { css } from "styled-components";
import React, { ReactElement } from "react";
import logoUrl from "./logo.png";
import Image from "next/image";
import { ds } from "../src/features/style/designSystem";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { atBreakpoint } from "../src/features/style/breakpoints";
import { Session } from "next-auth";
import { ClientUser, createClientUser } from "../src/features/auth/entities/ClientUser";
import { Username } from "../src/features/auth/Username";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 32px;
  ${atBreakpoint(ds.breakpoints.md, css`
    margin-bottom: 64px;
  `)}
`;

const LogoArea = styled.div`
  flex: 1 1 100%;
  margin-top: 16px;

  ${atBreakpoint(ds.breakpoints.md, css`
    flex: 0 0 auto;
    margin-top: 0;
  `)}
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
  gap: 12px;

  ${atBreakpoint(ds.breakpoints.md, css`
    gap: 24px;
  `)}
`;

const LogoImageWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;

  ${atBreakpoint(ds.breakpoints.md, css`
  width: 80px;
  `)}
`;

const MainHeading = styled.h1`
  font: ${ds.text.fonts.heading};
  font-size: 18px;
  font-weight: 400;
  margin: 0;

  ${atBreakpoint(ds.breakpoints.md, css`
  font-size: 28px;
  `)}
`;

const MenuArea = styled.menu`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;

  display: none;
  ${atBreakpoint(ds.breakpoints.md, css`
    display: block;
  `)}
`;

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  gap: 24px;
`;

const MenuItem = styled.li`
  flex: 0 0 auto;
`;

const MenuSeparator = styled.div`
  border-left: 1px solid ${ds.colors.gray.dynamic["400"]};
`;

const menuLinkStyles = css`
  color: ${ds.colors.gray.dynamic["800"]};
  text-decoration: none;
  font-weight: 500;

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

type MainHeaderClientProps = {
  user: ClientUser | null;
};

export function MainHeaderClient(props: MainHeaderClientProps): ReactElement {
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
              objectFit="contain"
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
              Home
            </MenuRouterLink>
          </MenuItem>
          <MenuItem>
            <MenuRouterLink href="/design" $active={pathname.startsWith("/design")}>
              Design
            </MenuRouterLink>
          </MenuItem>
          <MenuSeparator />
          {(() => {
            if (props.user) {
              return <>
                <MenuItem>
                  <Username user={props.user} />
                </MenuItem>
                <MenuItem>
                  <MenuButtonLink onClick={() => signOut()} $active={false}>
                    Log out
                  </MenuButtonLink>
                </MenuItem>
              </>;
            }

            return (
              <MenuItem>
                <MenuButtonLink onClick={() => signIn("discord")} $active={false}>
                  Sign in
                </MenuButtonLink>
              </MenuItem>
            );
          })()}
        </MenuList>
      </MenuArea>
    </HeaderWrapper>
  );
}

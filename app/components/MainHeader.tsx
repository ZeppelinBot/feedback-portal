"use client";

import styled, { css } from "styled-components";
import React, { ReactElement } from "react";
import logoUrl from "../logo.png";
import Image from "next/image";
import { ds } from "../style/designSystem";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoArea = styled.div`
  flex: 0 0 auto;
`;

const LogoAreaLink = styled(NextLink)`
  color: ${ds.colorPresets.bodyText};
  text-decoration: none;

  &:visited {
    color: ${ds.colorPresets.bodyText};
  }

  display: flex;
  align-items: center;
  gap: 24px;
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

export function MainHeader(): ReactElement {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <HeaderWrapper>
      <LogoArea>
        <LogoAreaLink href="/">
          <Image
            src={logoUrl}
            alt=""
            width={80}
          />
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
          <MenuItem>
            <MenuButtonLink onClick={() => signIn()} $active={false}>
              Sign in
            </MenuButtonLink>
          </MenuItem>
        </MenuList>
      </MenuArea>
    </HeaderWrapper>
  );
}

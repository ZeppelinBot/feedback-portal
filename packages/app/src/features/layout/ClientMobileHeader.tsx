"use client";

import Image from "next/image";
import NextLink from "next/link";
import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";
import { ClientUser } from "../auth/entities/ClientUser";
import { atBreakpoint } from "../style/breakpoints";
import { ds } from "../style/designSystem";
import logoUrl from "./logo.png";
import { mobileHeaderHeight } from "./values";
import { Avatar } from "../auth/components/Avatar";
import { Username } from "../auth/components/Username";

const MobileHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${mobileHeaderHeight};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  background-color: ${ds.colors.gray.dynamic["100"]};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);

  ${atBreakpoint(ds.breakpoints.lg, css`
    display: none;
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
  gap: 6px;
`;

const LogoImageWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 30px;
  height: 20px;
`;

const MainHeading = styled.h1`
  font: ${ds.text.fonts.heading};
  font-size: 13px;
  font-weight: 500;
  margin: 0;
`;

const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
`;

type ClientMobileHeaderProps = {
  currentUser: ClientUser | null;
};

export function ClientMobileHeader(props: ClientMobileHeaderProps): ReactNode {
  return (
    <MobileHeaderWrapper>
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
              Feedback Portal
            </MainHeading>
        </LogoAreaLink>
      </LogoArea>
      <ProfileArea>
        {(() => {
          if (props.currentUser) {
            return <>
              <Username user={props.currentUser} style={{ flex: "0 1 100%", overflow: "hidden", textOverflow: "ellipsis" }} />
              <Avatar user={props.currentUser} style={{ flex: "0 0 auto" }} />
            </>;
          }
          return undefined;
        })()}
      </ProfileArea>
    </MobileHeaderWrapper>
  );
}

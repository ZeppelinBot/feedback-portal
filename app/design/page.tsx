"use client";

import React, { ReactElement } from "react";
import styled from "styled-components";
import { ds } from "../style/designSystem";
import { keys } from "../../lib/utils";
import { H1 } from "../components/H1";
import { H2 } from "../components/H2";
import { H3 } from "../components/H3";
import { Paragraph } from "../components/Paragraph";
import { Button, ButtonIcon } from "../components/Button";
import { HSpacer } from "../components/HSpacer";
import { Save } from "@styled-icons/boxicons-solid";

const Wrapper = styled.div`
  display: flex;
  border: 2px solid ${ds.colors.gray.dynamic["500"]};
`;

const PreviewPane = styled.div`
  flex: 1;
  padding: ${ds.spacing["6"]};

  background: ${ds.colorPresets.background};
  color: ${ds.colorPresets.bodyText};
`;

const Color = styled.div`
  display: flex;
`;
const Shade = styled.div`
  width: 32px;
  height: 32px;
`;

const ButtonList = styled(Paragraph)`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const buttonSizes = ["small", "medium", "large"] as const;
const buttonVariants = ["basic", "primary", "secondary", "danger", "rainbow"] as const;

export default function DesignPage(): ReactElement {
  return (
    <Wrapper>
      {["light", "dark"].map(theme => (
        <PreviewPane key={theme} className={`__theme-${theme}`}>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut mollis tortor.
            Donec pretium volutpat sodales. Proin mauris mauris, tempor ac molestie at, porttitor ut metus.
            Morbi massa nulla, pellentesque luctus molestie non, rutrum et nulla. Aliquam erat volutpat.
            Maecenas porttitor orci a libero mollis varius id ut sapien.
            Vestibulum eget condimentum libero, et fermentum ipsum.
          </Paragraph>
          {buttonSizes.map(buttonSize => (
            <ButtonList key={buttonSize}>
              {buttonVariants.map(buttonVariant => (
                <Button key={buttonVariant} $variant={buttonVariant} $size={buttonSize}>
                  Button
                </Button>
              ))}
            </ButtonList>
          ))}
          {buttonSizes.map(buttonSize => (
            <ButtonList key={buttonSize}>
              {buttonVariants.map(buttonVariant => (
                <Button key={buttonVariant} $variant={buttonVariant} $size={buttonSize}>
                  <ButtonIcon icon={Save} />
                  Button
                </Button>
              ))}
            </ButtonList>
          ))}
          {keys(ds.colors).map(colorName => (
            <Color key={colorName}>
              {keys(ds.colors[colorName].dynamic).map(shadeName => (
                <Shade key={shadeName} style={{ backgroundColor: ds.colors[colorName].dynamic[shadeName] }} />
              ))}
            </Color>
          ))}
        </PreviewPane>
      ))}
    </Wrapper>
  );
}

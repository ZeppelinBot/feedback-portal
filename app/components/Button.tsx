import styled, { css } from "styled-components";
import { ds } from "../style/designSystem";
import { ReactElement, ReactNode } from "react";
import { inDarkTheme, inLightTheme } from "../style/theme";
import NextLink from "next/link";

type ButtonProps = {
  $variant?: "basic" | "primary" | "secondary" | "danger" | "rainbow";
  $size?: "small" | "medium" | "large";
};

const ButtonIconWrapper = styled.div`
  display: block;
  line-height: 0;
`;

const buttonStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  font: ${ds.text.fonts.body};
  font-size: 13px;

  border: none;
  border-radius: 4px;

  transition: background-color 100ms ease-in-out, box-shadow 200ms ease-in-out;
  &:hover {
    transition: background-color 33ms ease-in-out, box-shadow 100ms ease-in-out;
  }

  /* SIZES */

  ${props => props.$size === "small" && css`
    padding: 5px 12px;
    font-size: 14px;
  `}

  ${props => Boolean(! ("$size" in props) || props.$size === "medium") && css`
    padding: 6px 16px;
    font-size: 15px;
  `}

  ${props => props.$size === "large" && css`
    padding: 12px 22px;
    font-size: 15px;
  `}

  /* VARIANTS */

  ${props => Boolean(! ("$variant" in props) || props.$variant === "basic") && css`
    ${inLightTheme(css`
      background-color: ${ds.colors.gray.light["100"]};
      border: 1px solid ${ds.colors.gray.light["400"]};

      color: ${ds.colors.gray.light["900"]};
      &:visited {
        color: ${ds.colors.gray.light["900"]};
      }

      box-shadow: inset 0 -2px 6px hsl(0 0% 0% / 3%), 0 1px 2px -2px black;

      &:hover {
        background-color: ${ds.colors.gray.light["200"]};
      }

      &:active {
        box-shadow: inset 0 2px 6px hsl(0 0% 0% / 25%);
      }
    `)}

    ${inDarkTheme(css`
      background-color: ${ds.colors.gray.dark["400"]};
      border: 1px solid transparent;

      color: ${ds.colors.gray.dark["900"]};
      &:visited {
        color: ${ds.colors.gray.dark["900"]};
      }

      box-shadow: inset 0 -2px 6px hsl(0 0% 0% / 10%), 0 1px 2px -2px black;

      &:hover {
        background-color: ${ds.colors.gray.dark["400"]};
      }

      &:active {
        box-shadow: inset 0 2px 6px hsl(0 0% 0% / 25%);
      }
    `)}
  `}

  ${props => props.$variant === "primary" && css`
    background-color: ${ds.colors.green.light["600"]};
    border: 1px solid transparent;
    background-image: linear-gradient(to bottom, transparent, hsl(0 0% 0% / 10%));
    font-weight: 500;

    color: ${ds.colors.gray.light["100"]};
    &:visited {
      color: ${ds.colors.gray.light["100"]};
    }

    &:hover {
      background-color: ${ds.colors.green.light["700"]};
    }

    &:active {
      box-shadow: inset 0 2px 6px hsl(0 0% 0% / 35%);
    }
  `}

  ${props => props.$variant === "secondary" && css`
    background-color: ${ds.colors.blue.light["600"]};
    border: 1px solid transparent;
    background-image: linear-gradient(to bottom, transparent, hsl(0 0% 0% / 10%));
    font-weight: 500;

    color: ${ds.colors.gray.light["100"]};
    &:visited {
      color: ${ds.colors.gray.light["100"]};
    }

    &:hover {
      background-color: ${ds.colors.blue.light["700"]};
    }

    &:active {
      box-shadow: inset 0 2px 6px hsl(0 0% 0% / 35%);
    }
  `}

  ${props => props.$variant === "danger" && css`
    background-color: ${ds.colors.red.light["600"]};
    border: 1px solid transparent;
    background-image: linear-gradient(to bottom, transparent, hsl(0 0% 0% / 10%));
    font-weight: 500;

    color: ${ds.colors.gray.light["100"]};
    &:visited {
      color: ${ds.colors.gray.light["100"]};
    }

    &:hover {
      background-color: ${ds.colors.red.light["700"]};
    }

    &:active {
      box-shadow: inset 0 2px 6px hsl(0 0% 0% / 35%);
    }
  `}

  ${props => props.$variant === "rainbow" && css`
    background-image: linear-gradient(to right, #e206c5, orange);
    background-origin: border-box;
    border: 2px solid transparent;
    margin: -1px;
    border-radius: 6px;

    color: ${ds.colors.gray.dynamic["900"]};
    &:visited {
      color: ${ds.colors.gray.dynamic["900"]};
    }

    box-shadow:
      inset 0 -16px 16px -16px hsl(0 0% 0% / 15%),
      inset 0 0 0 999px ${ds.colors.gray.dynamic["100"]};

    &:hover {
      background-image: linear-gradient(to right, orange, ${ds.colors.green.light["500"]}, ${ds.colors.blue.light["500"]});
    }

    &:active {
      box-shadow:
        inset 0 2px 6px hsl(0 0% 0% / 25%),
        inset 0 0 0 999px ${ds.colors.gray.dynamic["100"]};
    }
  `}
`;

export const Button = styled.button<ButtonProps>`
  ${buttonStyles}
`;

export const LinkButton = styled.a<ButtonProps>`
  text-decoration: none;
  ${buttonStyles}
`;

export const NextLinkButton = styled(NextLink)<ButtonProps>`
  text-decoration: none;
  ${buttonStyles}
`;

type GenericIcon = (props: { size: number }) => ReactNode;

type ButtonIconProps = {
  icon: GenericIcon;
};

export function ButtonIcon(props: ButtonIconProps): ReactElement {
  return (
    <ButtonIconWrapper>
      <props.icon size={20} />
    </ButtonIconWrapper>
  );
}

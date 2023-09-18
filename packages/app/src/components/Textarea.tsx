import { css, styled } from "styled-components";
import { ds } from "../features/style/designSystem";
import { inDarkTheme, inLightTheme } from "../features/style/theme";

export const Textarea = styled.textarea`
  border: 1px solid;
  font: inherit;
  padding: 6px 10px;
  border-radius: 4px;

  ${inLightTheme(css`
    border-color: ${ds.colors.gray.light["400"]};
    background-color: white;
    color: black;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
  `)}

  ${inDarkTheme(css`
    border-color: var(--color-gray-300);
    background-color: var(--color-gray-200);
    color: white;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.5);
  `)}
`;

import styled from "styled-components";
import { ds } from "../features/style/designSystem";

export const H1 = styled.h1`
  font: ${ds.text.fonts.heading};
  font-size: ${ds.text.sizes.h1};
  font-weight: 600;

  margin: 1rem 0;
  &:first-child {
    margin-top: 0;
  }
`;

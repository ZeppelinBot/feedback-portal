import styled from "styled-components";
import { ds } from "../style/designSystem";

export const H3 = styled.h3`
  font: ${ds.text.fonts.heading};
  font-size: ${ds.text.sizes.h3};
  font-weight: 500;

  margin: 1rem 0;
  &:first-child {
    margin-top: 0;
  }
`;

import styled from "styled-components";
import { ds } from "../style/designSystem";

export const H2 = styled.h2`
  font: ${ds.text.fonts.heading};
  font-size: ${ds.text.sizes.h2};
  font-weight: 500;

  margin: 1rem 0;
  &:first-child {
    margin-top: 0;
  }
`;

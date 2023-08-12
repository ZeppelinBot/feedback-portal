import styled from "styled-components";
import { ds } from "../style/designSystem";

export const Container = styled.div`
  width: 100%;
  max-width: ${ds.maxContentWidth};
  margin: 0 auto;
  padding: ${ds.spacing["6"]};
`;
import styled from "styled-components";
import { GenericBanner } from "./GenericBanner";
import { ds } from "../../style/designSystem";

export const ErrorBanner = styled(GenericBanner)`
  --banner-bg: ${ds.colors.red.dynamic["200"]};
`;

import styled from "styled-components";
import { GenericBanner } from "./GenericBanner";
import { ds } from "../../style/designSystem";

export const SuccessBanner = styled(GenericBanner)`
  --banner-bg: ${ds.colors.green.light["600"]};
  color: white;
`;

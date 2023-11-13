import styled from "styled-components";
import { GenericBanner } from "./GenericBanner";
import { ds } from "../../style/designSystem";

export const InfoBanner = styled(GenericBanner)`
  --banner-bg: ${ds.colors.blue.light["600"]};
  color: white;
`;

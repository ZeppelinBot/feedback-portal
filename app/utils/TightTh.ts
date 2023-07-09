import { Th, chakra } from "@chakra-ui/react";

export const TightTh = chakra(Th, {
  baseStyle: {
    width: "1px",
    whiteSpace: "nowrap",
  },
});

import { Td, chakra } from "@chakra-ui/react";

export const TightTd = chakra(Td, {
  baseStyle: {
    width: "1px",
    whiteSpace: "nowrap",
  },
});

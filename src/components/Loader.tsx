import { keyframes, styled } from "styled-components";

const anim = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(359deg) }
`;

export const Loader = styled.div`
  --size: 1em;
  --duration: 800ms;

  width: var(--size);
  height: var(--size);
  border: calc(var(--size) / 4) solid currentColor;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: ${anim} var(--duration) infinite linear;
`;

"use client";

import styled, { css } from "styled-components";
import { ds } from "../../style/designSystem";
import { inDarkTheme } from "../../style/theme";
import { atBreakpoint, bpUtilityClasses } from "../../style/breakpoints";
import { SearchAlt } from "@styled-icons/boxicons-regular";
import { Button, NextLinkButton } from "../../../components/Button";
import { useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { FieldInput } from "../../../components/FieldInput";

const SearchLocation = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  ${atBreakpoint(ds.breakpoints.md, css`
    justify-content: flex-start;
    margin-bottom: -36px;
    z-index: 1;
    position: absolute;
  `)}
`;

const SearchForm = styled.form`
  display: flex;
  gap: 16px;
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 300px;
`;

const SearchBar = styled(FieldInput)`
  width: 100%;
  font: inherit;
  padding: ${ds.spacing[3]};
  padding-left: 36px;
  background: white;
  border: 1px solid ${ds.colors.gray.dynamic["300"]};
  border-radius: 24px;

  &::placeholder {
    color: ${ds.colors.gray.dynamic["500"]};
  }

  ${inDarkTheme(css`
    background: ${ds.colors.gray.dark["200"]};
    border-color: ${ds.colors.gray.dark["400"]};

    &::placeholder {
      color: ${ds.colors.gray.dynamic["700"]};
    }
  `)}
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 8px;
  color: ${ds.colors.gray.dynamic["500"]};
`;

type FeedbackDisplaySearchProps = {
  searchTerm: string;
};

export function FeedbackDisplaySearch(props: FeedbackDisplaySearchProps) {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm);
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const initialRef = useRef(true);
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }

    router.replace(`?searchTerm=${encodeURIComponent(searchTerm)}`);
  }, [debouncedSearchTerm]);

  return (
    <SearchLocation>
      <SearchForm action="">
        <SearchBarWrapper>
          <SearchIconWrapper>
            <SearchAlt size={24} />
          </SearchIconWrapper>
          <SearchBar
            name="searchTerm"
            type="text"
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
            placeholder="Search for feedback..."
          />
        </SearchBarWrapper>
        <noscript>
          <Button>Search</Button>
        </noscript>
      </SearchForm>
      <div className={bpUtilityClasses.hiddenUntil.md}>
        <NextLinkButton href="/feedback/new" $variant="primary">Submit feedback</NextLinkButton>
      </div>
    </SearchLocation>
  );
}

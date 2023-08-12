"use client";

import { FeedbackItem } from "./types";
import { Pagination } from "../components/Pagination";
import { Comment, SearchAlt, UpArrowCircle, Time, UpArrow, UpArrowAlt, Chat } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";
import { HiddenUntil, atBreakpoint, untilBreakpoint } from "../style/breakpoints";
import { ds } from "../style/designSystem";
import { OnlyInDarkTheme, OnlyInLightTheme, inDarkTheme, inLightTheme } from "../style/theme";
import NextLink from "next/link";
import { Button } from "../components/Button";
import { Comment as SolidComment, Chat as SolidChat } from "@styled-icons/boxicons-solid";

const numberFormatter = new Intl.NumberFormat("en-US");

const FeedbackList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeedbackListItem = styled.li`

`;

const FeedbackListLink = styled(NextLink)`
  display: grid;

  border: 1px solid ${ds.colors.gray.dynamic["200"]};
  border-radius: 8px;

  text-decoration: none;
  color: ${ds.colorPresets.bodyText};
  &:visited {
    color: ${ds.colorPresets.bodyText};
  }

  ${inLightTheme(css`
    background-color: white;

    &:hover {
      border-color: ${ds.colors.gray.light["300"]};
      background-color: ${ds.colors.gray.light["200"]};
    }
  `)}

  ${inDarkTheme(css`
    background-color: ${ds.colors.gray.dark["200"]};

    &:hover {
      background-color: ${ds.colors.gray.dark["300"]};
    }
  `)}

  padding: 12px 22px;

  ${untilBreakpoint(ds.breakpoints.md, css`
    grid-template-areas:
      "title title title"
      "votes date comments";
    grid-template-columns: 1fr 1fr 1fr;
  `)}

  ${atBreakpoint(ds.breakpoints.md, css`
    grid-template-areas:
      "votes title  comments"
      "votes author comments";
    grid-template-columns: 80px auto min-content;
    gap: 0 16px;
  `)}
`;

const FeedbackTitle = styled.div`
  grid-area: title;
  font-weight: 500;

  ${untilBreakpoint(ds.breakpoints.md, css`
    margin-bottom: 16px;
  `)}
`;

const FeedbackAuthor = styled.div`
  grid-area: author;
  font-size: 14px;
  color: ${ds.colors.gray.dynamic["500"]};

  display: none;
  ${atBreakpoint(ds.breakpoints.md, css`
    display: block;
  `)}
`;

const FeedbackVotes = styled.div`
  grid-area: votes;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;

  ${atBreakpoint(ds.breakpoints.md, css`
    justify-content: flex-start;
  `)}
`;

const FeedbackDate = styled.div`
  grid-area: date;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${atBreakpoint(ds.breakpoints.md, css`
    display: none;
  `)}
`;

const FeedbackComments = styled.div`
  grid-area: comments;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  ${atBreakpoint(ds.breakpoints.md, css`
    justify-content: flex-start;
  `)}
`;

const DisplayHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 16px;

  ${atBreakpoint(ds.breakpoints.md, css`
    justify-content: space-between;
  `)}
`;

const DisplayHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DisplayFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  ${atBreakpoint(ds.breakpoints.md, css`
    justify-content: flex-end;
  `)}
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 300px;
`;

const SearchBar = styled.input`
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

type FeedbackListProps = {
  items: FeedbackItem[];
  page: number;
  perPage: number;
  totalItems: number;
};

export function FeedbackDisplay(props: FeedbackListProps) {
  return (
    <div>
      <DisplayHeader>
        {/* Actions */}
        <DisplayHeaderActions>
          {/* Search */}
          <SearchBarWrapper>
            <SearchIconWrapper>
              <SearchAlt size={24} />
            </SearchIconWrapper>
            <SearchBar
              type="text"
              placeholder="Search for feedback..."
            />
          </SearchBarWrapper>
          <HiddenUntil bp={ds.breakpoints.md}>
            <div>
              <Button $variant="primary">
                Submit feedback
              </Button>
            </div>
          </HiddenUntil>
        </DisplayHeaderActions>

        {/* Pagination */}
        <HiddenUntil bp={ds.breakpoints.md}>
          <div>
            <Pagination
              page={props.page}
              perPage={props.perPage}
              totalItems={props.totalItems}
            />
          </div>
        </HiddenUntil>
      </DisplayHeader>

      <FeedbackList>
        {props.items.map(item => (
          <FeedbackListItem key={item.id}>
            <FeedbackListLink href="/">
              <FeedbackTitle>{item.title}</FeedbackTitle>
              <FeedbackAuthor>
                Posted by @{item.authorName} 7 days ago
              </FeedbackAuthor>
              <FeedbackVotes>
                <UpArrowAlt size={24} />
                {numberFormatter.format(item.votes)}
              </FeedbackVotes>
              <FeedbackDate>
                <Time size={20} />
                7d
              </FeedbackDate>
              <FeedbackComments>
                <OnlyInLightTheme>
                  <Chat size={18} />
                </OnlyInLightTheme>
                <OnlyInDarkTheme>
                  <SolidChat size={18} />
                </OnlyInDarkTheme>
                0
              </FeedbackComments>
            </FeedbackListLink>
          </FeedbackListItem>
        ))}
      </FeedbackList>

      <DisplayFooter>
        {/* Pagination */}
        <div>
          <Pagination
            page={props.page}
            perPage={props.perPage}
            totalItems={props.totalItems}
          />
        </div>
      </DisplayFooter>
    </div>
  );
}

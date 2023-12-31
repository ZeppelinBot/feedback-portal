"use client";

import { Chat, Time, UpArrowAlt } from "@styled-icons/boxicons-regular";
import { Chat as SolidChat } from "@styled-icons/boxicons-solid";
import humanizeDuration from "humanize-duration";
import NextLink from "next/link";
import styled, { css } from "styled-components";
import { shortEnglishHumanizer } from "../../../utils/shortEnglishHumanizer";
import { atBreakpoint, untilBreakpoint } from "../../style/breakpoints";
import { ds } from "../../style/designSystem";
import { inDarkTheme, inLightTheme, onlyInDarkThemeClass, onlyInLightThemeClass } from "../../style/theme";
import type { ClientFeedbackPost } from "../entities/ClientFeedbackPost";
import { Username } from "../../auth/components/Username";

const numberFormatter = new Intl.NumberFormat("en-US");

const FeedbackListWrapper = styled.ul`
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

  transition: background-color 67ms ease-out;
  &:hover {
    transition-duration: 34ms;
  }

  ${inLightTheme(css`
    background-color: white;

    &:hover {
      border-color: ${ds.colors.gray.light["300"]};
      background-color: ${ds.colors.gray.light["200"]};
    }

    &:hover:active {
      filter: brightness(0.95);
      transition: filter 67ms ease-out;
    }
  `)}

  ${inDarkTheme(css`
    background-color: ${ds.colors.gray.dark["200"]};

    &:hover {
      background-color: ${ds.colors.gray.dark["300"]};
    }
  `)}

  padding: 12px 22px;

  ${untilBreakpoint(ds.breakpoints.lg, css`
    grid-template-areas:
      "title title title"
      "votes date comments";
    grid-template-columns: 1fr 1fr 1fr;
  `)}

  ${atBreakpoint(ds.breakpoints.lg, css`
    grid-template-areas:
      "votes title  comments"
      "votes author comments";
    grid-template-columns: 60px auto min-content;
    gap: 0 16px;
  `)}
`;

const FeedbackTitle = styled.div`
  grid-area: title;
  font-weight: 500;

  ${untilBreakpoint(ds.breakpoints.lg, css`
    margin-bottom: 16px;
  `)}
`;

const FeedbackAuthor = styled.div`
  grid-area: author;
  font-size: 14px;
  color: ${ds.colors.gray.dynamic["500"]};

  display: none;
  ${atBreakpoint(ds.breakpoints.lg, css`
    display: block;
  `)}
`;

const FeedbackVotes = styled.div`
  grid-area: votes;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;

  ${atBreakpoint(ds.breakpoints.lg, css`
    justify-content: flex-start;
  `)}
`;

const FeedbackDate = styled.div`
  grid-area: date;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${atBreakpoint(ds.breakpoints.lg, css`
    display: none;
  `)}
`;

const FeedbackComments = styled.div`
  grid-area: comments;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  ${atBreakpoint(ds.breakpoints.lg, css`
    justify-content: flex-start;
  `)}
`;

type FeedbackListProps = {
  posts: ClientFeedbackPost[];
};

const humanize = (ms: number) => humanizeDuration(ms, {
  largest: 1,
  round: true,
});

const humanizeShort = (ms: number) => shortEnglishHumanizer(ms);

export function FeedbackList(props: FeedbackListProps) {
  return (
    <FeedbackListWrapper>
      {props.posts.map(post => (
        <FeedbackListItem key={post.id}>
          <FeedbackListLink href={`/feedback/${post.id}`}>
            <FeedbackTitle>{post.title}</FeedbackTitle>
            <FeedbackAuthor>
              Posted {humanize(Date.now() - post.posted_at.getTime())} ago
            </FeedbackAuthor>
            <FeedbackVotes>
              <UpArrowAlt size={24} />
              {numberFormatter.format(post.num_votes)}
            </FeedbackVotes>
            <FeedbackDate>
              <Time size={20} />
              {humanizeShort(Date.now() - post.posted_at.getTime())}
            </FeedbackDate>
            <FeedbackComments>
              <Chat size={18} className={onlyInLightThemeClass} />
              <SolidChat size={18} className={onlyInDarkThemeClass} />
              {post.num_comments}
            </FeedbackComments>
          </FeedbackListLink>
        </FeedbackListItem>
      ))}
    </FeedbackListWrapper>
  );
}

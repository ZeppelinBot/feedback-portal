"use client";

import styled, { css } from "styled-components";
import { Pagination } from "../../../components/Pagination";
import { atBreakpoint, bpUtilityClasses } from "../../style/breakpoints";
import { ds } from "../../style/designSystem";
import { FeedbackList } from "./FeedbackList";
import { ClientFeedbackPost } from "../entities/ClientFeedbackPost";

const FeedbackDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${atBreakpoint(ds.breakpoints.lg, css`
    justify-content: flex-end;
    height: 36px;
  `)}
`;

const DisplayHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 16px;

  ${atBreakpoint(ds.breakpoints.lg, css`
    justify-content: space-between;
  `)}
`;

const DisplayFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  ${atBreakpoint(ds.breakpoints.lg, css`
    justify-content: flex-end;
  `)}
`;

type FeedbackListControlsProps = {
  posts: ClientFeedbackPost[];
  totalItems: number;
  page: number;
  perPage: number;
  otherQueryParams?: Record<string, any>;
};

export function FeedbackDisplay(props: FeedbackListControlsProps) {
  return (
    <FeedbackDisplayWrapper>
      <PaginationWrapper>
        {props.totalItems > props.perPage && (
          <Pagination
            page={props.page}
            perPage={props.perPage}
            totalItems={props.totalItems}
            otherQueryParams={props.otherQueryParams}
            className={bpUtilityClasses.hiddenUntil.md}
          />
        )}
      </PaginationWrapper>

      {(() => {
        if (props.posts.length === 0) {
          return (
            <div>No posts found</div>
          );
        }

        return <FeedbackList posts={props.posts} />;
      })()}

      <PaginationWrapper>
        {props.totalItems > props.perPage && (
          <Pagination
            page={props.page}
            perPage={props.perPage}
            totalItems={props.totalItems}
            otherQueryParams={props.otherQueryParams}
          />
        )}
      </PaginationWrapper>
    </FeedbackDisplayWrapper>
  );
}

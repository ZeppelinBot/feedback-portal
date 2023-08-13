"use client";

import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";
import { Pagination } from "../../components/Pagination";
import { HiddenUntil, atBreakpoint, bpUtilityClasses } from "../style/breakpoints";
import { ds } from "../style/designSystem";
import { ClientFeedbackPost } from "./entities/ClientFeedbackPost";
import { FeedbackList } from "./FeedbackList";

const FeedbackDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${atBreakpoint(ds.breakpoints.md, css`
    justify-content: flex-end;
    height: 36px;
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

const DisplayFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  ${atBreakpoint(ds.breakpoints.md, css`
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

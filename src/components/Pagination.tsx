import NextLink from "next/link";
import { range } from "../utils";
import { ReactElement } from "react";
import { Button, NextLinkButton } from "./Button";
import styled from "styled-components";

const PageList = styled.div`
  display: flex;
  gap: 4px;
`;

type PaginationLinkProps = {
  pageParam: string;
  page: number;
  isActive: boolean;
};

function PaginationLink(props: PaginationLinkProps) {
  return (
    <NextLinkButton
      href={{ query: { [props.pageParam]: props.page } }}
      $variant={props.isActive ? "secondary" : "basic"}
      $size="small"
    >
      {props.page}
    </NextLinkButton>
  );
}

function PaginationSeparator() {
  return (
    <div>
      ...
    </div>
  );
}

const paginationRadius = 2;

type PaginationProps = {
  pageParam?: string;
  page: number;
  perPage: number;
  totalItems: number;
};

export function Pagination(props: PaginationProps): ReactElement {
  const pageParam = props.pageParam || "page";
  const totalPages = Math.ceil(props.totalItems / props.perPage);

  const naiveStartPage = Math.max(1, props.page - paginationRadius);
  const naiveEndPage = Math.min(totalPages, props.page + paginationRadius);

  // Balance number of displayed pages so the pagination doesn't jump around
  let startPage = Math.max(1, naiveStartPage - (paginationRadius - (naiveEndPage - props.page)));
  let endPage = Math.min(totalPages, naiveEndPage + (paginationRadius - (props.page - naiveStartPage)));

  if (startPage <= 3 && endPage <= (totalPages - 3)) {
    endPage += 1;
  }
  if (endPage >= (totalPages - 3) && startPage >= 3) {
    startPage -= 1;
  }

  return (
    <PageList>
      {startPage > 1 && (
        <>
          <PaginationLink
            pageParam={pageParam}
            page={1}
            isActive={props.page === 1}
          />
          {startPage > 2 && (
            <PaginationSeparator />
          )}
        </>
      )}
      {range(startPage, endPage).map(pageNum => (
        <PaginationLink
          key={pageNum}
          pageParam={pageParam}
          page={pageNum}
          isActive={props.page === pageNum}
        />
      ))}
      {endPage < totalPages && (
        <>
          {endPage < (totalPages - 1) && (
            <PaginationSeparator />
          )}
          <PaginationLink
            pageParam={pageParam}
            page={totalPages}
            isActive={props.page === totalPages}
          />
        </>
      )}
    </PageList>
  );
}

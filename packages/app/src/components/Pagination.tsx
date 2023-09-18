import { ReactElement } from "react";
import styled from "styled-components";
import { range } from "../utils";
import { NextLinkButton } from "./Button";

const PageList = styled.div`
  display: flex;
  gap: 4px;
`;

type PaginationLinkProps = {
  pageParam: string;
  page: number;
  isActive: boolean;
  otherQueryParams?: Record<string, any>;
};

function PaginationLink(props: PaginationLinkProps) {
  const query = {
    ...props.otherQueryParams,
    [props.pageParam]: props.page,
  };
  return (
    <NextLinkButton
      href={{ query }}
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
  otherQueryParams?: Record<string, any>;
  className?: string;
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

  const otherQueryParams = {
    ...props.otherQueryParams,
    perPage: props.perPage,
  };

  return (
    <PageList className={props.className}>
      {startPage > 1 && (
        <>
          <PaginationLink
            pageParam={pageParam}
            page={1}
            isActive={props.page === 1}
            otherQueryParams={otherQueryParams}
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
          otherQueryParams={otherQueryParams}
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
            otherQueryParams={otherQueryParams}
          />
        </>
      )}
    </PageList>
  );
}

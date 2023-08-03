import NextLink from "next/link";
import { cn, range } from "../../lib/utils";
import { ReactElement } from "react";

type PaginationLinkProps = {
  pageParam: string;
  page: number;
  isActive: boolean;
};

function PaginationLink(props: PaginationLinkProps) {
  let className = "block border border-gray-300 shadow-sm px-2 rounded min-w-[30px] text-center";
  if (props.isActive) {
    className = cn(className, "font-semibold bg-slate-500 border-slate-600 text-white");
  }

  return (
    <NextLink
      className={className}
      href={{ query: { [props.pageParam]: props.page } }}
    >
      {props.page}
    </NextLink>
  );
}

function PaginationSeparator() {
  return (
    <div className="w-[30px] text-center">
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
    <div className="flex gap-1">
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
    </div>
  );
}

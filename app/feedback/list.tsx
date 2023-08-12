"use client";

import { FeedbackItem } from "./types";
import { Table, TableContainer, Td, Th, BodyTr } from "@/components/ui/table";
import { Pagination } from "../../components/ui/pagination";
import { SearchAlt } from "@styled-icons/boxicons-regular";

const numberFormatter = new Intl.NumberFormat("en-US");

type TableListProps = {
  items: FeedbackItem[];
};

function TableList({ items }: TableListProps) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th className="text-center">Votes</Th>
            <Th>Feedback</Th>
            <Th className="text-center">Date</Th>
            <Th>Author</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <BodyTr key={i}>
              <Td className="text-center">
                {numberFormatter.format(item.votes)}
              </Td>
              <Td>
                <div className="font-semibold">
                  {item.title}
                  {/* <Badge variant="secondary" className="ml-1">{item.type}</Badge> */}
                </div>
                <div>
                  {item.body}
                </div>
              </Td>
              <Td className="text-center">{item.date}</Td>
              <Td>
                {item.authorName}
              </Td>
            </BodyTr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

type FeedbackListProps = {
  items: FeedbackItem[];
  page: number;
  perPage: number;
  totalItems: number;
};

export function FeedbackList(props: FeedbackListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Actions */}
        <div className="relative flex gap-4 items-center">
          {/* Search */}
          <div>
            <div className="absolute top-2 left-3 text-gray-500">
              <SearchAlt size={24} />
            </div>
            <input
              type="text"
              className="p-2 pl-12 border border-gray-400 rounded-3xl"
              placeholder="Search for feedback..."
            />
          </div>
          <div>
            {/* <Button>
              Add feedback
            </Button> */}
          </div>
        </div>

        {/* Pagination */}
        <div>
          <Pagination
            page={props.page}
            perPage={props.perPage}
            totalItems={props.totalItems}
          />
        </div>
      </div>

      <TableList items={props.items} />

      <div className="flex justify-end mt-6">
        {/* Pagination */}
        <div>
          <Pagination
            page={props.page}
            perPage={props.perPage}
            totalItems={props.totalItems}
          />
        </div>
      </div>
    </div>
  );
}

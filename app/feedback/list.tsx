"use client";

import { Table, TableContainer, Tbody, Th, Thead, Tr, Text, Td, LinkOverlay, useBreakpointValue, LinkBox } from "@chakra-ui/react";
import { FeedbackItem } from "./types";
import { TightTh } from "../utils/TightTh";
import { TightTd } from "../utils/TightTd";
import NextLink from "next/link";

const numberFormatter = new Intl.NumberFormat("en-US");

type FeedbackListProps = {
  items: FeedbackItem[];
};

function CardList({ items }: FeedbackListProps) {
  return (
    <div>Hi this is a card list</div>
  );
}

function TableList({ items }: FeedbackListProps) {
  return (
    <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <TightTh>Votes</TightTh>
              <Th>Feedback</Th>
              <TightTh>Author</TightTh>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, i) => (
              <Tr key={i}>
                <TightTd textAlign="center">
                  <Text as="strong">
                    {numberFormatter.format(item.votes)}
                  </Text>
                </TightTd>
                <Td>
                  <LinkBox>
                    <LinkOverlay as={NextLink} href="#">
                      <Text as="strong">
                        {item.title}
                      </Text>
                      <Text>
                        {item.body}
                      </Text>
                    </LinkOverlay>
                  </LinkBox>
                </Td>
                <TightTd>
                  {item.authorName}
                </TightTd>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
  );
}

export function FeedbackList({ items }: FeedbackListProps) {
  const listType = useBreakpointValue({
    base: "cards",
    md: "table",
  }, {
    fallback: "cards"
  });

  return (
    <div>
      {listType === "cards" ? <CardList items={items} /> : <TableList items={items} />}
    </div>
  );
}

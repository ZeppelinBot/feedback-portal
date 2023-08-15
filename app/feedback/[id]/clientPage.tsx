"use client";

import { styled } from "styled-components";
import { H1 } from "../../../src/components/H1";
import { ClientFeedbackPost } from "../../../src/features/feedback/entities/ClientFeedbackPost";
import { dayjs } from "../../../src/utils/dayjs";
import { ClientTime } from "../../../src/utils/ClientTime";
import { Paragraph } from "../../../src/components/Paragraph";
import { Button, ButtonIcon } from "../../../src/components/Button";
import { UpArrowAlt } from "@styled-icons/boxicons-regular";
import { H2 } from "../../../src/components/H2";
import { VSpacer } from "../../../src/components/VSpacer";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { postComment } from "./postComment";
import { Username } from "../../../src/features/auth/Username";

const numberFormatter = new Intl.NumberFormat("en-US");

const Subtitle = styled.div`
  margin-top: -16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Votes = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const AdjustedUpArrowAlt = styled(UpArrowAlt)`
  margin-left: -6px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Comment = styled.div`
  display: grid;
  grid-template-areas:
    "avatar name"
    "avatar body";
  grid-template-columns: 56px auto;
`;

const CommentAvatar = styled.div`
  grid-area: avatar;
  padding-right: 16px;

  img {
    display: block;
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 4px;
  }
`;

const CommentName = styled.div`
  grid-area: name;
`;

const CommentAuthorName = styled.div`
  font-weight: 500;
`;

const CommentBody = styled.div`
  grid-area: body;

  font-size: 15px;
`;

type ClientPageProps = {
  post: ClientFeedbackPost;
  user?: Session["user"];
};

export function ClientFeedbackPostPage(props: ClientPageProps) {
  const postedAt = dayjs.utc(props.post.posted_at);
  return (
    <div>
      <Header>
        <div>
          <H1>{props.post.title}</H1>
          <Subtitle>Posted by <Username user={props.post.author!} /> on <ClientTime time={postedAt} format={"D MMM YYYY [at] H:mm z"} /></Subtitle>
        </div>
        <Actions>
          <Votes>
            <ButtonIcon icon={AdjustedUpArrowAlt} />
            {numberFormatter.format(props.post.num_votes)}
          </Votes>
          <Button $variant="primary">
            Vote
          </Button>
          <Button $variant="secondary">
            Edit
          </Button>
          <Button $variant="danger">
            Delete
          </Button>
        </Actions>
      </Header>
      <Paragraph>{props.post.body}</Paragraph>
      <VSpacer size="10" />
      <H2>Comments</H2>
      {((): ReactNode => {
        if (props.post.comments!.length === 0) {
          return (
            <Paragraph>No comments</Paragraph>
          );
        }

        return (
          <CommentList>
            {props.post.comments!.map(comment => (
              <Comment key={comment.id}>
                <CommentAvatar>
                  {comment.author!.image != null && (
                    <img src={comment.author!.image} alt={`${comment.author!.name!}'s avatar`} />
                  )}
                </CommentAvatar>
                <CommentName>
                  <CommentAuthorName>
                    <Username user={comment.author!} />
                  </CommentAuthorName>
                </CommentName>
                <CommentBody>
                  {comment.body}
                </CommentBody>
              </Comment>
            ))}
          </CommentList>
        );
      })()}

      {props.user != null && <>
        <VSpacer size="8" />
        <div>
          <form action={postComment}>
            <input type="hidden" name="post_id" value={props.post.id} />
            <div>
              <textarea name="body"></textarea>
            </div>
            <Button type="submit" $variant="primary">Post comment</Button>
          </form>
        </div>
      </>}
    </div>
  );
}

"use client";

import { css, styled } from "styled-components";
import { H1 } from "../../../src/components/H1";
import { ClientFeedbackPost } from "../../../src/features/feedback/entities/ClientFeedbackPost";
import { dayjs } from "../../../src/utils/dayjs";
import { ClientTime } from "../../../src/utils/ClientTime";
import { Paragraph } from "../../../src/components/Paragraph";
import { Button, ButtonIcon, LinkButton, NextLinkButton } from "../../../src/components/Button";
import { UpArrowAlt } from "@styled-icons/boxicons-regular";
import { H2 } from "../../../src/components/H2";
import { VSpacer } from "../../../src/components/VSpacer";
import { ReactNode, useState } from "react";
import { Session } from "next-auth";
import { postComment } from "./postComment";
import { Username } from "../../../src/features/auth/Username";
import { TextWithLoading } from "../../../src/components/TextWithLoading";
import { Loader } from "../../../src/components/Loader";
import { FormSubmit } from "../../../src/components/FormSubmit";
import { ds } from "../../../src/features/style/designSystem";
import { H3 } from "../../../src/components/H3";
import { unvotePost } from "./unvotePost";
import { votePost } from "./votePost";
import { ServerActionButton } from "../../../src/components/ServerActionButton";
import { RenderSafeMarkdown } from "../../../src/features/markdown/RenderSafeMarkdown";
import { Textarea } from "../../../src/components/Textarea";
import { ClientUser } from "../../../src/features/auth/entities/ClientUser";
import { ClientFeedbackComment } from "../../../src/features/feedback/entities/ClientFeedbackComment";
import { ClientAnonymousUser } from "../../../src/features/auth/entities/ClientAnonymousUser";

const numberFormatter = new Intl.NumberFormat("en-US");

const Subtitle = styled.div`
  margin-top: -16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Votes = styled.div<{ $hasUserVote: boolean }>`
  display: flex;
  gap: 2px;
  align-items: center;
  min-height: 40px;

  ${props => props.$hasUserVote && css`
    color: ${ds.colors.blue.dynamic["500"]};
    font-weight: 500;
  `}
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
`;

const CommentAvatarImgContainer = styled.div`
  position: relative;
  background-color: ${ds.colors.gray.dynamic["300"]};
  border-radius: 50%;
  overflow: hidden;
  margin-top: 4px;
  padding-bottom: 100%;

  img {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
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

const CommentTextarea = styled(Textarea)`
  width: 600px;
  max-width: 100%;
  height: 140px;
`;

type ClientPageProps = {
  post: ClientFeedbackPost & {
    comments: Array<ClientFeedbackComment & {
      author: ClientUser | ClientAnonymousUser;
    }>;
    author: ClientUser | ClientAnonymousUser;
  };
  user?: Session["user"];
  hasUserVote: boolean;
};

export function ClientFeedbackPostPage(props: ClientPageProps) {
  const postedAt = dayjs.utc(props.post.posted_at);
  const [postingComment, setPostingComment] = useState(false);
  const [voting, setVoting] = useState(false);

  return (
    <div>
      <Header>
        <div>
          <H1>{props.post.title}</H1>
          <Subtitle>Posted by <Username user={props.post.author!} /> on <ClientTime time={postedAt} format={"D MMM YYYY [at] H:mm z"} /></Subtitle>
        </div>
        <Actions>
          <Votes $hasUserVote={props.hasUserVote}>
            <ButtonIcon icon={AdjustedUpArrowAlt} />
            {numberFormatter.format(props.post.num_votes)}
          </Votes>
          {(props.user && props.hasUserVote) && (
            <ServerActionButton action={unvotePost} $data={{ post_id: props.post.id }}>
            {(loading) => (
              <Button disabled={loading}>
                <TextWithLoading
                  loading={loading}
                  component={<Loader />}
                >
                  Unvote
                </TextWithLoading>
              </Button>
            )}
          </ServerActionButton>
          )}
          {(props.user && ! props.hasUserVote) && (
            <ServerActionButton action={votePost} $data={{ post_id: props.post.id }}>
              {(loading) => (
                <Button $variant="primary" disabled={loading}>
                  <TextWithLoading
                    loading={loading}
                    component={<Loader />}
                  >
                    Vote
                  </TextWithLoading>
                </Button>
              )}
            </ServerActionButton>
          )}
          {props.user && "id" in props.post.author && props.post.author.id === props.user.id && <>
            <NextLinkButton $variant="secondary" href={`/feedback/${props.post.id}/edit`}>
              Edit
            </NextLinkButton>
            <Button $variant="danger">
              Delete
            </Button>
          </>}
        </Actions>
      </Header>
      <VSpacer size="8" />
      <RenderSafeMarkdown content={props.post.body} />
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
              <Comment key={comment.id} id={comment.id}>
                <CommentAvatar>
                  <CommentAvatarImgContainer>
                    {("image" in comment.author && comment.author.image) && (
                      <img src={comment.author.image} alt={`${comment.author.name!}'s avatar`} />
                    )}
                  </CommentAvatarImgContainer>
                </CommentAvatar>
                <CommentName>
                  <CommentAuthorName>
                    <Username user={comment.author!} />
                  </CommentAuthorName>
                </CommentName>
                <CommentBody>
                  <RenderSafeMarkdown content={comment.body} />
                </CommentBody>
              </Comment>
            ))}
          </CommentList>
        );
      })()}

      <VSpacer size="8" />

      {props.user != null && <>
        <H3>Post new comment</H3>
        <div>
          <form action={postComment}>
            <input type="hidden" name="post_id" value={props.post.id} />
            <div>
              <CommentTextarea name="body"></CommentTextarea>
            </div>
            <VSpacer size="2" />
            <FormSubmit
              onSubmit={() => setPostingComment(true)}
              afterSubmit={() => setPostingComment(false)}
            >
              <Button $variant="primary">
                <TextWithLoading
                  loading={postingComment}
                  component={<Loader />}
                >
                  Post comment
                </TextWithLoading>
              </Button>
            </FormSubmit>
          </form>
        </div>
      </>}
    </div>
  );
}

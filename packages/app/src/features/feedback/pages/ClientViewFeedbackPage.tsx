"use client";

import { css, styled } from "styled-components";
import { H1 } from "../../../components/H1";
import { ClientFeedbackPost } from "../entities/ClientFeedbackPost";
import { dayjs } from "../../../utils/dayjs";
import { ClientTime } from "../../../utils/ClientTime";
import { Paragraph } from "../../../components/Paragraph";
import { Button, ButtonIcon, NextLinkButton } from "../../../components/Button";
import { UpArrowAlt } from "@styled-icons/boxicons-regular";
import { H2 } from "../../../components/H2";
import { VSpacer } from "../../../components/VSpacer";
import { ReactNode, useState } from "react";
import { postComment } from "../actions/postComment";
import { Username } from "../../auth/components/Username";
import { TextWithLoading } from "../../../components/TextWithLoading";
import { Loader } from "../../../components/Loader";
import { FormSubmit } from "../../../components/FormSubmit";
import { ds } from "../../style/designSystem";
import { H3 } from "../../../components/H3";
import { unvotePost } from "../actions/unvotePost";
import { votePost } from "../actions/votePost";
import { ServerActionButton } from "../../../components/ServerActionButton";
import { RenderSafeMarkdown } from "../../markdown/RenderSafeMarkdown";
import { Textarea } from "../../../components/Textarea";
import { ClientUser } from "../../auth/entities/ClientUser";
import { ClientFeedbackComment } from "../entities/ClientFeedbackComment";
import { ClientAnonymousUser } from "../../auth/entities/ClientAnonymousUser";
import { User } from "../../auth/entities/User";
import { DynamicTime } from "../../../utils/DynamicTime";
import { Time } from "@styled-icons/boxicons-solid";
import { HumanizedTime } from "../../../utils/HumanizedTime";

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

const PostContent = styled.div`
  overflow-wrap: break-word;
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
  display: flex;
  gap: 16px;
  align-items: baseline;
`;

const CommentAuthorName = styled.div`
  font-weight: 500;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: ${ds.colors.gray.dynamic[500]};
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
  user: User | null;
  hasUserVote: boolean;
};

export function ClientViewFeedbackPage(props: ClientPageProps) {
  const postedAt = dayjs.utc(props.post.posted_at);
  const [postingComment, setPostingComment] = useState(false);
  const [voting, setVoting] = useState(false);

  new Date()

  return (
    <div>
      <Header>
        <div>
          <H1>{props.post.title}</H1>
          <Subtitle>Posted by <Username user={props.post.author!} /> <HumanizedTime time={props.post.posted_at} /> ago</Subtitle>
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
      <PostContent>
        <RenderSafeMarkdown content={props.post.body} />
      </PostContent>
      <VSpacer size="10" />

      {props.user != null && <>
        <H2>Leave a comment</H2>
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
        <VSpacer size="8" />
      </>}

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
                  <CommentDate>
                    <HumanizedTime time={comment.posted_at} /> ago
                  </CommentDate>
                </CommentName>
                <CommentBody>
                  <RenderSafeMarkdown content={comment.body} />
                </CommentBody>
              </Comment>
            ))}
          </CommentList>
        );
      })()}
    </div>
  );
}

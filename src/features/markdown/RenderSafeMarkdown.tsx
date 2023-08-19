"use client";

import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { useMemo } from "react";
import { styled } from "styled-components";

const MarkdownStyles = styled.div`
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol {
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

type RenderSafeMarkdown = {
  content: string;
};

export function RenderSafeMarkdown(props: RenderSafeMarkdown) {
  const rendered = useMemo(() => {
    return sanitizeHtml(marked.parse(props.content), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    });
  }, []);

  return (
    <MarkdownStyles dangerouslySetInnerHTML={{ __html: rendered }} />
  );
}

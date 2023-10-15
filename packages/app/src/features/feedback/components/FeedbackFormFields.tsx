"use client";

import { styled } from "styled-components";
import { FieldInput } from "../../../components/FieldInput";
import { Label } from "../../../components/Label";
import { Paragraph } from "../../../components/Paragraph";
import { Textarea } from "../../../components/Textarea";
import { VSpacer } from "../../../components/VSpacer";
import { ds } from "../../style/designSystem";
import { SrOnly } from "../../../components/SrOnly";

const Code = styled.code`
  white-space: nowrap;
  padding: 2px 4px;
  background-color: ${ds.colors.gray.dynamic["200"]};
  border-radius: 3px;
`;

const TitleField = styled(FieldInput)`
  font-size: 20px;
`;

type FeedbackFormFieldsProps = {
  title: string;
  description: string;
};

export function FeedbackFormFields(props: FeedbackFormFieldsProps) {
  return (
    <>
      <Label>
        <SrOnly>Title</SrOnly>
        <TitleField
          name="title"
          type="text"
          style={{ width: "100%" }}
          placeholder="Zeppelin should have..."
          defaultValue={props.title}
          required={true}
          minLength={3}
          maxLength={255}
          autoFocus={true}
        />
      </Label>
      <VSpacer size="8" />
      <Label>
        <SrOnly>Description</SrOnly>
        <Textarea
          name="body"
          style={{ width: "100%", height: "180px" }}
          placeholder="Here's why this is needed..."
          defaultValue={props.description}
          required={true}
          minLength={80}
          maxLength={8_000}
        />
      </Label>
      <Paragraph>
        You can use standard Markdown in the description for styling.<br />
        Image uploads are currently not supported, but you can use markdown image embeds to show images from e.g. Discord:{" "}
        <Code>![](https://link-to-image)</Code>
      </Paragraph>
    </>
  );
}

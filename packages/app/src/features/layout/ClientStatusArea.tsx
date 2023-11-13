"use client";

import { ErrorAlt as ErrorIcon } from "@styled-icons/boxicons-solid";
import { ErrorType, errorMessages, isValidErrorType } from "../statusMessages/errorMessages";
import { useSearchParams } from "next/navigation";
import { ErrorBanner } from "../statusMessages/components/ErrorBanner";
import React, { ReactNode } from "react";
import styled from "styled-components";

const BannerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export function ClientStatusArea() {
  const params = useSearchParams();
  const statusBanners: ReactNode[] = [];

  const error = params.get("error");
  if (error && isValidErrorType(error)) {
    statusBanners.push(
      <ErrorBanner
        icon={ErrorIcon}
        message={errorMessages[error]}
      />
    );
  }

  if (statusBanners.length === 0) {
    return undefined;
  }

  return (
    <BannerList>
      {statusBanners.map((banner, i) => (
        <React.Fragment key={i}>{banner}</React.Fragment>
      ))}
    </BannerList>
  );
}

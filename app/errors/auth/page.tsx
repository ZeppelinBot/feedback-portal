import { AuthErrorClientPage } from "./clientPage";

type AuthErrorPageParams = {
  searchParams?: {
    error?: string;
  };
};

export const metadata = {
  robots: {
    index: false,
  },
};

export default function AuthErrorPage(props: AuthErrorPageParams) {
  return <AuthErrorClientPage error={props.searchParams?.error} />;
}

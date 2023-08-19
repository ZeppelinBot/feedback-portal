import { RequiresLogin } from "../../../src/features/auth/RequiresLogin";

export const metadata = {
  robots: {
    index: false,
  },
};

export default function LoginRequiredErrorPage() {
  return <RequiresLogin />;
}

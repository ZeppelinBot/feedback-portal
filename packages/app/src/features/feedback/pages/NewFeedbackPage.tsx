import { pageRequireUser } from "../../auth/checks";
import { withSession } from "../../session/session";
import { ClientNewFeedbackPage } from "./ClientNewFeedbackPage";

const NewFeedbackPage = withSession(async () => {
  const { user, errorPage } = await pageRequireUser();
  if (! user) {
    return <>{errorPage}</>;
  }
  return <ClientNewFeedbackPage />;
});

export default NewFeedbackPage;

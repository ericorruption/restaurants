import { FormEvent, FunctionComponent, useState } from "react";

import type { ReviewId } from "../../../1.domain/Review";
import {
  GetOwnerDashboardDocument,
  Role,
  useReplyToReviewMutation,
} from "../graphql/generated-types-and-hooks";
import { useUser } from "../UserContext";

export const ReplyForm: FunctionComponent<{ reviewId: ReviewId }> = ({
  reviewId,
}) => {
  const [reply, setReply] = useState("");
  const user = useUser();
  // TODO data, loading, error
  const [replyToReview] = useReplyToReviewMutation({
    refetchQueries: [GetOwnerDashboardDocument],
  });

  if (user?.role !== Role.Owner) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await replyToReview({
      variables: {
        input: {
          reply,
          reviewId,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="visually-hidden">Reply form</legend>
        <label htmlFor="reply">Reply</label>
        <textarea
          name="reply"
          id="reply"
          required
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </fieldset>

      <button type="submit" className="button--primary">
        Reply
      </button>
    </form>
  );
};

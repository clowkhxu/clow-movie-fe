////////////////////////// FEEDBACK //////////////////////////

type FeedbackItemProps = {
  feedback: {
    _id: string;
    content: string;
    created_at: number | string;
    is_spam: number;
    mention_id: string | null;
    mention_user: {
      _id: string;
      name: string;
      avatar: string;
    } | null;
    movie_slug: string;
    parent_id: string | null;
    reviews: {
      point: number;
    };
    reviews_id: string | null;
    total_children: number;
    total_dislike: number;
    total_like: number;
    author: {
      _id: string;
      name: string;
      role: "member" | "admin";
      gender: "male" | "female" | "other";
      avatar: string;
    };
  };
};

type FeedbackSlice = {
  feedbackData: {
    items: any;
    loading: boolean;
    hasMore: boolean;
    totalFeedbacks: number;
    itemCount: number;
    error: boolean;
    showFeedbackId: string | null;
  };
  voteList: {
    userLikedFeedbacks: Record<string, string[]>;
    userDislikedFeedbacks: Record<string, string[]>;
  };
  repliesData: {
    data: Record<
      string,
      { items: any; hasMore: boolean; loading: boolean; error: boolean }
    >;
    showReplyId: string | null;
  };
  parentId: string | null;
  replyId: string | null;
  feedbackType: "comment" | "review";
};

type EditableFeedbackProps = {
  children: React.ReactNode;
  feedbackId: string;
  defaultValue?: string;
  parentId?: string | null;
  readonly?: boolean;
};

type FeedbackActionsProps = {
  action: "comment" | "review" | "reply";
  data: FeedbackItemProps["feedback"];
  rootId?: string | null;
};

type FeedbackInputProps = {
  action: "comment" | "reply";
  feedback?: FeedbackItemProps["feedback"];
  autoFocus?: boolean;
  rootId?: string | null;
};

type ReplyItemProps = {
  reply: FeedbackItemProps["feedback"];
  parentId?: string | null;
};

type ReplyListProps = {
  data: {
    items: FeedbackItemProps["feedback"][];
    hasMore: boolean;
  };
  parentId: string;
};

type ReplySectionProps = {
  totalChildren: number;
  parentId: string;
};

type GetFeedbacks = {
  movieSlug: string;
  limit: number;
  type: "review" | "comment";
};

type AddFeedback = {
  movieSlug: string;
  userId: string;
  type: "review" | "comment";
  accessToken: string;
  point?: number;
  content?: string;
};

type DeleteFeedback = {
  feedbackId: string;
  userId: string;
  accessToken: string;
};

type UpdateContentFeedback = {
  feedbackId: string;
  userId: string;
  content: string;
  accessToken: string;
};

type AddReplyFeedback = {
  movieSlug: string;
  userId: string;
  content: string;
  type: "review" | "comment";
  parentId: string;
  accessToken: string;
};

type VoteFeedback = {
  movieSlug: string;
  userId: string;
  feedbackId: string;
  voteType: "like" | "dislike";
  accessToken: string;
};

type GetMoreFeedbacks = {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
  afterTime: number;
}

type GetReplyListFeedback = {
  parentId: string;
  limit: number;
  type: "review" | "comment";
};

type GetMoreReplyListFeedback = {
  parentId: string;
  limit: number;
  type: "review" | "comment";
  afterTime: number | string;
};

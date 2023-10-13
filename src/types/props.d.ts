export interface AnswerFormProps {
  question: string;
  questionId: string;
  authorId: string;
}

export interface TagCardProps {
  tag: { id: string; name: string };
  description: string;
  questionsNumber: number;
}

export interface UserCardProps {
  id: string;
  clerkId?: string;
  picture: string;
  name: string;
  userName: string;
}

export interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textClasses?: string;
  href?: string;
  isAuthor?: boolean;
}

export interface NoResultProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

export interface QuestionCardProps {
  id: string;
  title: string;
  tags: { id: string; name: string }[];
  author: { id: string; name: string; picture: string };
  upvotes: number;
  views: number;
  answers: Array;
  createdAt: Date;
}

export interface TagProps {
  tag: { id: string; name: string; num?: number };
}

export interface FilterProps {
  filters: { name: string; value: string }[];
  containerClasses?: string;
  otherClasses?: string;
}

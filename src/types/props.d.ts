export interface TagProps {
  tag: {
    id: number;
    name: string;
    num?: number;
  };
}

export interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  containerClasses?: string;
  otherClasses?: string;
}

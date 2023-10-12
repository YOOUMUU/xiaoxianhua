export type Post = {
  _id?: string;
  content: string;
  tag: string;
  creator?: {
    username: string;
    _id: string;
  };
};

export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage: any;
  body: any;
  authorName: string;
  authorImage: any;
  categories: string[];
}

// Types
import type { AuthorType } from "./author.types";

export interface PageType {
  status: string,
  slug: string,
  date: string,
  title: {
    rendered: string
  },
  excerpt: {
    rendered: string
  },
  content: {
    rendered: string
  },
  _embedded: {
    author: AuthorType[]
  }
}

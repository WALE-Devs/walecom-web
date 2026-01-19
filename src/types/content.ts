
export interface ContentBlock {
  id: number;
  content: number;
  identifier: string;
  title: string;
  subtitle: string;
  content_text: string;
  items: unknown;
  image_path: string | null;
  image_url?: string | null;
  order: number;
  is_active: boolean;
  type: string;
  language: string;
}

export interface Content {
  id: number;
  identifier: string;
  title: string;
  description: string;
  language: string;
  is_active: boolean;
  last_updated: string;
  blocks: ContentBlock[];
}

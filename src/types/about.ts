
export interface AboutBlock {
  id: number;
  content: number;
  identifier: string;
  title: string;
  subtitle: string;
  content_text: string;
  items: string[];
  image_path: string | null;
  image_url: string | null;
  order: number;
  is_active: boolean;
  type: string;
  language: string;
}

export interface AboutContent {
  id: number;
  identifier: string;
  title: string;
  description: string;
  language: string;
  is_active: boolean;
  last_updated: string;
  blocks: AboutBlock[];
}

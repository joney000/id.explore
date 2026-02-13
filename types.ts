
export enum IdentityCategory {
  PERSON = 'Person',
  OBJECT = 'Object',
  PLACE = 'Place'
}

export interface PaperAsset {
  title: string;
  url: string;
  source: string;
  snippet: string;
}

export interface MediaAsset {
  title: string;
  url: string;
  thumbnailHint?: string;
  platform?: string;
}

export interface IdentityResult {
  name: string;
  category: IdentityCategory;
  papers: PaperAsset[];
  images: MediaAsset[];
  videos: MediaAsset[];
  summary: string;
}

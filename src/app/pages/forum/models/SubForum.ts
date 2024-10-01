export type SubForum = {
  id?: number;
  name: string;
  description?: string;
  avatar?: string;
  banner?: string;
  status: number;
  facebookLink?: string;
  instagramLink?: string;
  zaloLink?: string;
  twitterLink?: string;
  communityCategoryId: number;
  pined: boolean;
  isFeature: boolean;
}

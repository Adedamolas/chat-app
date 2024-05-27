export interface Post {
  id: string;
  title: string;
  postText: string;
  author: {
    name: string;
    id: string;
    profile_image: string | null;
  };
  imageUrl?: string;
  createdAt: Date;
  niche: string;
}

export interface Authors {
  id: string;
  name: string;
  profile_img: string | null;
}
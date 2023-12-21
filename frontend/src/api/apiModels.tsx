export interface PostModel {
    id: string;
    heading: string;
    body: string;
    created: string;
    picture: string;
}

export interface CreatePostModel {
    heading: string;
    body: string;
    picture: string | undefined;
}

export interface ChannelDetails {
    title: string;
    thumbnail: string;
    subscribers: number;
}

export interface VideoDetails {
    title: string;
    description: string;
    thumbnail: string;
    channel: ChannelDetails;
    views: number;
    comments: number;
    publishedAt: string;
}
import { Feed } from '../types/feed';

export interface FeedService {
  getAllFeed(): Promise<{ date: string; feeds: Feed[] }[]>;
}

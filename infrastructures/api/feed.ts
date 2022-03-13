import { ClockTime, Feed } from '../types/feed';

export interface FeedService {
  getAllFeed(): Promise<{ date: string; feeds: Feed[] }[]>;
  getTime(): Promise<{ my: ClockTime; families: ClockTime[] }>;
}

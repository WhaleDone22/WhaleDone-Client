import { ClockTime, Feed, ReactionItem } from '../types/feed';

export interface FeedService {
  getAllFeed(): Promise<{ date: string; feeds: Feed[] }[]>;
  getTime(): Promise<{ my: ClockTime; families: ClockTime[] }>;
  getReactions(feedID: number): Promise<ReactionItem[]>;
}

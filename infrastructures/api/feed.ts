import { ClockTime, Feed, ReactionItem } from '../types/feed';

export interface FeedService {
  createFeed(
    title: string,
    content: string,
    type: 0 | 1,
  ): Promise<{ isSuccess: boolean }>;
  getAllFeed(): Promise<{ date: string; feeds: Feed[] }[]>;
  getTime(familyID: number): Promise<{ my: ClockTime; families: ClockTime[] }>;
  getReactions(feedID: number): Promise<ReactionItem[]>;
}

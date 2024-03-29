import { ClockTime, Feed, ReactionItem } from '../types/feed';

export interface FeedService {
  createFeed(
    title: string,
    content: string,
    type: 'TEXT' | 'IMAGE',
  ): Promise<{ isSuccess: boolean }>;
  updateFeed(
    feedID: number,
    title: string,
    content: string,
    type: 'TEXT' | 'IMAGE',
  ): Promise<{ isSuccess: boolean }>;
  deleteFeed(feedID: number): Promise<{ isSuccess: boolean }>;
  getAllFeed(): Promise<{ date: string; feeds: Feed[] }[]>;
  getTime(): Promise<{ my: ClockTime; families: ClockTime[] }>;
  getReactions(feedID: number): Promise<ReactionItem[]>;
  createReaction(
    postID: number,
    content: string,
    type: 'TEXT' | 'EMOJI' | 'RECORD',
  ): Promise<{ isSuccess: boolean }>;
  deleteReaction(
    feedID: number,
    reactionID: number,
  ): Promise<{ isSuccess: boolean }>;
}

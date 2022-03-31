import { FeedService } from '../feed';
import { FEED_DATA } from './feed.data';

export function feedMock(): FeedService {
  const createFeed = async () => {
    return { isSuccess: true };
  };

  const getAllFeed = async () => {
    return FEED_DATA.GET_ALL;
  };

  const getTime = async () => {
    return FEED_DATA.GET_TIME;
  };

  const getReactions = async () => {
    return FEED_DATA.GET_REACTIONS;
  };

  const createReaction = async () => {
    return { isSuccess: true };
  };

  return { createFeed, getAllFeed, getTime, getReactions, createReaction };
}

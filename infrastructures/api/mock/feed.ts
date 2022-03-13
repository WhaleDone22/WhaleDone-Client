import { FeedService } from '../feed';
import { FEED_DATA } from './feed.data';

export function feedMock(): FeedService {
  const getAllFeed = async () => {
    return FEED_DATA.GET_ALL;
  };

  const getTime = async () => {
    return FEED_DATA.GET_TIME;
  };

  return { getAllFeed, getTime };
}

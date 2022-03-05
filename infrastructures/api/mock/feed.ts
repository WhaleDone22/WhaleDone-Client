import { FeedService } from '../feed';
import { FEED_DATA } from './feed.data';

export function feedMock(): FeedService {
  const getAllFeed = async () => {
    return FEED_DATA.GET_ALL;
  };

  return { getAllFeed };
}

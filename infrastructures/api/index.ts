import { FeedService } from './feed';
import { NoticeService } from './notice';
import { feedRemote } from './remote/feed';
import { noticeRemote } from './remote/notice';

export interface APIService {
  noticeService: NoticeService;
  feedService: FeedService;
}

function provideMockAPIService(): APIService {
  const noticeService = noticeRemote();
  const feedService = feedRemote();

  return { noticeService, feedService };
}

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

export const api: APIService = getAPIMethod();

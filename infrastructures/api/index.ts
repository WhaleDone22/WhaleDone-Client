import { FeedService } from './feed';
import { noticeMock } from './mock/notice';
import { NoticeService } from './notice';
import { feedRemote } from './remote/feed';

export interface APIService {
  noticeService: NoticeService;
  feedService: FeedService;
}

function provideMockAPIService(): APIService {
  const noticeService = noticeMock();
  const feedService = feedRemote();

  return { noticeService, feedService };
}

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

export const api: APIService = getAPIMethod();

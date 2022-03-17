import { FeedService } from './feed';
import { feedMock } from './mock/feed';
import { noticeMock } from './mock/notice';
import { NoticeService } from './notice';

export interface APIService {
  noticeService: NoticeService;
  feedService: FeedService;
}

function provideMockAPIService(): APIService {
  const noticeService = noticeMock();
  const feedService = feedMock();

  return { noticeService, feedService };
}

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

export const api: APIService = getAPIMethod();

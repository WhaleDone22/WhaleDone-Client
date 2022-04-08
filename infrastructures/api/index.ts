import { FamilyService } from './family';
import { FeedService } from './feed';
import { NoticeService } from './notice';
import { familyRemote } from './remote/family';
import { feedRemote } from './remote/feed';
import { noticeRemote } from './remote/notice';

export interface APIService {
  noticeService: NoticeService;
  feedService: FeedService;
  familyService: FamilyService;
}

function provideMockAPIService(): APIService {
  const noticeService = noticeRemote();
  const feedService = feedRemote();
  const familyService = familyRemote();

  return { noticeService, feedService, familyService };
}

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

export const api: APIService = getAPIMethod();

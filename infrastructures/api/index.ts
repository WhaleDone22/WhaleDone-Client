import { noticeMock } from './mock/notice';
import { NoticeService } from './notice';

export interface APIService {
  noticeService: NoticeService;
}

function provideMockAPIService(): APIService {
  const noticeService = noticeMock();

  return { noticeService };
}

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

export const api: APIService = getAPIMethod();

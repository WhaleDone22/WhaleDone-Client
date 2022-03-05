import { Notice } from '../types/notice';

export interface NoticeService {
  getAllNotice(): Promise<{ date: string; notices: Notice[] }[]>;
}

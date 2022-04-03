import { Notice } from '../types/notice';

export interface NoticeService {
  getAllNotice(): Promise<{ date: string; notices: Notice[] }[]>;
  deleteNotice(noticeID: number): Promise<{ isSuccess: boolean }>;
  undoDeleteNotice(noticeID: number): Promise<{ isSuccess: boolean }>;
}

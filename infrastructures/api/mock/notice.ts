import { NoticeService } from '../notice';
import { NOTICE_DATA } from './notice.data';

export function noticeMock(): NoticeService {
  const getAllNotice = async () => {
    return NOTICE_DATA.GET_ALL;
  };

  return { getAllNotice };
}

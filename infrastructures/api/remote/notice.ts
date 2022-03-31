import { NoticeService } from '../notice';
import { privateAPI } from './base';

export function noticeRemote(): NoticeService {
  const getAllNotice = async () => {
    return privateAPI
      .get({ url: 'api/v1/reaction-alarms' })
      .then((response) => {
        if (response.code === 'SUCCESS') {
          return Object.keys(response.singleData.result).map((date) => ({
            date,
            notices: response.singleData.result[date].map((notice: any) => ({
              id: notice.postId,
              type:
                // eslint-disable-next-line no-nested-ternary
                notice.reactionType === 'AUDIO'
                  ? 'VOICE'
                  : notice.reactionType === 'TEXT'
                  ? 'TEXT'
                  : 'EMOJI',
            })),
          }));
        }
        return [];
      });
  };

  return { getAllNotice };
}

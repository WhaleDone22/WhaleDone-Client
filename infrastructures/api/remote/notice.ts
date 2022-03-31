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
              id: `${notice.postId}-${notice.reactionId}`,
              type:
                // eslint-disable-next-line no-nested-ternary
                notice.reactionType === 'AUDIO'
                  ? 'VOICE'
                  : notice.reactionType === 'TEXT'
                  ? 'TEXT'
                  : 'EMOJI',
              body: `${notice.nickName}(이)가 일상 글에 ${
                // eslint-disable-next-line no-nested-ternary
                notice.reactionType === 'AUDIO'
                  ? '음성'
                  : notice.reactionType === 'TEXT'
                  ? '반응'
                  : '이모지 반응'
              }을 남겼습니다.`,
              sub: notice.reactionType === 'TEXT' && notice.reactionContent,
              nickName: notice.nickName,
              isSeen: false,
            })),
          }));
        }
        return [];
      });
  };

  return { getAllNotice };
}

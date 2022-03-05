import { Notice } from '../../types/notice';

export const NOTICE_DATA: { GET_ALL: { date: string; notices: Notice[] }[] } = {
  GET_ALL: [
    {
      date: '2022-11-11 금',
      notices: [
        {
          id: 1,
          type: 'VOICE',
          body: 'user2가 일상 글에 음성을 남겼습니다',
          isSeen: false,
        },
        {
          id: 2,
          type: 'TEXT',
          body: 'user2가 일상 글에 반응을 남겼습니다',
          isSeen: false,
          sub: '잘 먹고 잘 지낸다니 다행이구나',
        },
        {
          id: 3,
          type: 'EMOJI',
          body: 'user2가 일상 글에\n {이름} 이모지 반응을 남겼습니다',
          isSeen: false,
        },
        {
          id: 4,
          type: 'VOICE',
          body: 'user2가 일상 글에 음성을 남겼습니다',
          isSeen: false,
        },
      ],
    },
    {
      date: '2022-11-10 금',
      notices: [
        {
          id: 5,
          type: 'VOICE',
          body: 'user2가 일상 글에 음성을 남겼습니다',
          isSeen: false,
        },
        {
          id: 6,
          type: 'TEXT',
          body: 'user2가 일상 글에 반응을 남겼습니다',
          isSeen: true,
          sub: '잘 먹고 잘 지낸다니 다행이구나',
        },
        {
          id: 7,
          type: 'EMOJI',
          body: 'user2가 일상 글에\n {이름} 이모지 반응을 남겼습니다',
          isSeen: true,
        },
        {
          id: 8,
          type: 'TEXT',
          body: 'user2가 일상 글에 반응을 남겼습니다',
          isSeen: true,
          sub: '잘 먹고 잘 지낸다니 다행이구나 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        },
      ],
    },
  ],
};

import { ClockTime, Feed, ReactionItem } from '../../types/feed';

export const FEED_DATA: {
  GET_ALL: { date: string; feeds: Feed[] }[];
  GET_TIME: { my: ClockTime; families: ClockTime[] };
  GET_REACTIONS: ReactionItem[];
} = {
  GET_ALL: [
    {
      date: '2022-01-21 금',
      feeds: [
        {
          id: 1,
          writer: '가나다라마',
          writerID: 2,
          writerThumbnail:
            'https://avatars.githubusercontent.com/u/48249505?v=4',
          title: '가족에게 소개하고 싶은 운동 한 가지는?',
          body: '달리기하고 있는데, 돈 들지 않고 제일 효과가 좋은 운동 같아서 꼭 소개하고 싶어요!',
          reactions: [
            { type: 'EMOJI', count: 2 },
            { type: 'TEXT', count: 1 },
            { type: 'RECORD', count: 3 },
          ],
        },
        {
          id: 2,
          writer: '마라다나가',
          writerID: 4,
          title: '가족에게 소개하고 싶은 운동 한 가지는?',
          body: '달리기하고 있는데, 돈 들지 않고 제일 효과가 좋은 운동 같아서 꼭 소개하고 싶어요!',
          reactions: [
            { type: 'EMOJI', count: 2 },
            { type: 'TEXT', count: 1 },
            { type: 'RECORD', count: 0 },
          ],
        },
        {
          id: 3,
          writer: '나나나나나',
          writerID: 5,
          title: '가족에게 소개하고 싶은 운동 한 가지는?',
          body: '달리기하고 있는데, 돈 들지 않고 제일 효과가 좋은 운동 같아서 꼭 소개하고 싶어요!',
          reactions: [
            { type: 'EMOJI', count: 2 },
            { type: 'TEXT', count: 1 },
            { type: 'RECORD', count: 0 },
          ],
        },
      ],
    },
    {
      date: '2022-01-22 토',
      feeds: [
        {
          id: 4,
          writer: '가나다라마',
          writerID: 2,
          writerThumbnail:
            'https://avatars.githubusercontent.com/u/48249505?v=4',
          title: '가족에게 소개하고 싶은 운동 한 가지는?',
          body: '달리기하고 있는데, 돈 들지 않고 제일 효과가 좋은 운동 같아서 꼭 소개하고 싶어요!',
          reactions: [
            { type: 'EMOJI', count: 2 },
            { type: 'TEXT', count: 1 },
            { type: 'RECORD', count: 3 },
          ],
        },
        {
          id: 5,
          writer: '마라다나가',
          writerID: 4,
          title: '가족에게 소개하고 싶은 운동 한 가지는?',
          body: '달리기하고 있는데, 돈 들지 않고 제일 효과가 좋은 운동 같아서 꼭 소개하고 싶어요!',
          reactions: [
            { type: 'EMOJI', count: 2 },
            { type: 'TEXT', count: 1 },
            { type: 'RECORD', count: 0 },
          ],
        },
        {
          id: 6,
          writer: '나나나나나',
          writerID: 5,
          title: '가족에게 소개하고 싶은 운동 한 가지는?',
          body: '달리기하고 있는데, 돈 들지 않고 제일 효과가 좋은 운동 같아서 꼭 소개하고 싶어요!',
          reactions: [
            { type: 'EMOJI', count: 2 },
            { type: 'TEXT', count: 1 },
            { type: 'RECORD', count: 0 },
          ],
        },
      ],
    },
  ],
  GET_TIME: {
    my: { id: 1, countryCode: 'KR', timeDelta: 0 },
    families: [
      { id: 2, countryCode: 'KR', timeDelta: 0 },
      { id: 3, countryCode: 'CN', timeDelta: -1 },
    ],
  },
  GET_REACTIONS: [
    {
      reactionID: 1,
      writerID: 1,
      reactionType: 'EMOJI',
      content:
        'https://seojinseojin-dummy.s3.ap-northeast-2.amazonaws.com/emoji_6.png',
    },
    {
      reactionID: 2,
      writerID: 2,
      reactionType: 'EMOJI',
      content:
        'https://seojinseojin-dummy.s3.ap-northeast-2.amazonaws.com/emoji_1.png',
    },
    {
      reactionID: 3,
      writerID: 3,
      reactionType: 'RECORD',
      content:
        'https://seojinseojin-dummy.s3.ap-northeast-2.amazonaws.com/sample-6s.mp3',
    },
    {
      reactionID: 4,
      writerThumbnail: 'https://avatars.githubusercontent.com/u/48249505?v=4',
      writerID: 4,
      reactionType: 'TEXT',
      content:
        '텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. ',
    },
    {
      reactionID: 5,
      writerThumbnail: 'https://avatars.githubusercontent.com/u/48249505?v=4',
      writerID: 4,
      reactionType: 'TEXT',
      content:
        '텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. ',
    },
    {
      reactionID: 6,
      writerThumbnail: 'https://avatars.githubusercontent.com/u/48249505?v=4',
      writerID: 4,
      reactionType: 'TEXT',
      content:
        '텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. ',
    },
    {
      reactionID: 7,
      writerThumbnail: 'https://avatars.githubusercontent.com/u/48249505?v=4',
      writerID: 4,
      reactionType: 'TEXT',
      content:
        '텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. ',
    },
    {
      reactionID: 8,
      writerThumbnail: 'https://avatars.githubusercontent.com/u/48249505?v=4',
      writerID: 4,
      reactionType: 'TEXT',
      content:
        '텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. 텍스트 반응이 들어갑니다. 최대 40글자. ',
    },
  ],
};

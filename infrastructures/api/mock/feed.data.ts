import { ClockTime, Feed } from '../../types/feed';

export const FEED_DATA: {
  GET_ALL: { date: string; feeds: Feed[] }[];
  GET_TIME: { my: ClockTime; families: ClockTime[] };
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
  ],
  GET_TIME: {
    my: { countryCode: 'KR', timeDelta: 0 },
    families: [
      { countryCode: 'KR', timeDelta: 0 },
      { countryCode: 'CN', timeDelta: -1 },
    ],
  },
};

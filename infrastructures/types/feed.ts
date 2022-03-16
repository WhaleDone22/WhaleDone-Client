export type Feed = {
  id: number;
  writer: string;
  writerID: number;
  writerThumbnail?: string;
  title: string;
  body: string;
  reactions: Reaction[];
};

export type Reaction = {
  type: 'EMOJI' | 'TEXT' | 'RECORD';
  count: number;
};

const IcEmoji = require('../../assets/ic-reaction-emoji.png');
const IcText = require('../../assets/ic-reaction-text.png');
const IcRecord = require('../../assets/ic-reaction-record.png');

export const reactionToIcon = {
  EMOJI: IcEmoji,
  TEXT: IcText,
  RECORD: IcRecord,
};

export type ClockTime = {
  countryCode: string;
  timeDelta: number;
};

export type ReactionItem = {
  writerThumbnail?: string;
  writerID: number;
  reactionID: number;
  reactionType: Reaction['type'];
  content: string;
};

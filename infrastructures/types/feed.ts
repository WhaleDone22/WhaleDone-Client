export type Reaction = {
  type: 'EMOJI' | 'TEXT' | 'RECORD';
  count: number;
};

export type Feed = {
  id: number;
  writer: string;
  writerID: number;
  writerThumbnail?: string;
  title: string;
  type: 'TEXT' | 'IMAGE';
  body: string;
  reactions: Reaction[];
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
  id?: number;
  countryCode: string;
  timeDelta: number;
};

export type ReactionItem = {
  writerThumbnail?: string;
  writerID: number;
  reactionID: number;
  reactionType: Reaction['type'];
  content: string;
  isMine: boolean;
};

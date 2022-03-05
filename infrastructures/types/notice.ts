export type Notice = {
  id: number;
  type: 'VOICE' | 'TEXT' | 'EMOJI';
  isSeen: boolean;
  body: string;
  sub?: string;
};

const IcEmoji = require('../../assets/ic-emoji.png');
const IcText = require('../../assets/ic-text.png');
const IcMicrophone = require('../../assets/ic-microphone.png');

export const noticeToIcon = {
  VOICE: IcMicrophone,
  TEXT: IcText,
  EMOJI: IcEmoji,
};

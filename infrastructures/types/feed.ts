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

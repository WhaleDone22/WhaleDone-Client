/* eslint-disable no-nested-ternary */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClockTime } from '../../types/feed';
import { FeedService } from '../feed';
import { privateAPI } from './base';

export function feedRemote(): FeedService {
  const createFeed = async (
    title: string,
    content: string,
    type: 'TEXT' | 'IMAGE',
  ) => {
    return privateAPI
      .post({
        url: 'api/v1/users/auth/post',
        data: { title, content, type },
      })
      .then((data) => {
        if (data.code === 'SUCCESS') return { isSuccess: true };
        return {
          isSuccess: false,
        };
      });
  };

  const getAllFeed = async () => {
    return privateAPI
      .get({ url: 'api/v1/users/auth/family-posts' })
      .then((response) => {
        return Object.keys(response.singleData.result).map((date) => {
          return {
            date,
            feeds: response.singleData.result[date].map((feed: any) => ({
              id: feed.id,
              writer: feed.authorName,
              writerID: feed.authorIdx,
              writerThumbnail: feed.profileImgUrl,
              title: feed.title,
              type: feed.type,
              body: feed.contents,
              reactions: feed.reactionCount.map((reaction: any) => {
                if (reaction.type === 'TEXT') return reaction;
                if (reaction.type === 'IMAGE')
                  return { type: 'EMOJI', count: reaction.count };
                if (reaction.type === 'AUDIO')
                  return { type: 'RECORD', count: reaction.count };
                return reaction;
              }),
            })),
          };
        });
      });
  };

  const getTime = async () => {
    const familyID = await AsyncStorage.getItem('familyID');
    const myID = await AsyncStorage.getItem('userID');
    return privateAPI
      .get({
        url: `api/v1/families/${familyID}/users/time-difference`,
      })
      .then((response) => {
        const data: ClockTime[] = response.multipleData.map((time: any) => ({
          id: time.id,
          countryCode: time.countryCode,
          timeDelta: time.timeDiff,
        }));
        const mine = data.find((time: any) => time.id === myID?.toString()) ?? {
          id: +(myID ?? 0),
          countryCode: 'KR',
          timeDelta: 0,
        };
        return {
          my: {
            id: mine.timeDelta,
            countryCode: mine.countryCode,
            timeDelta: 0,
          },
          families: data
            .filter((time) => time.id?.toString() !== myID)
            .map((time) => ({
              id: time.id,
              countryCode: time.countryCode,
              timeDelta: time.timeDelta - mine.timeDelta,
            })),
        };
      });
  };

  const getReactions = async (feedID: number) => {
    return privateAPI
      .get({
        url: `api/v1/posts/${feedID}/reactions`,
      })
      .then((response) => {
        return response.multipleData.map((reaction: any) => ({
          writerThumbnail: reaction.profileImgUrl,
          writerID: reaction.authorIdx,
          reactionID: reaction.id,
          reactionType:
            reaction.type === 'IMAGE'
              ? 'EMOJI'
              : reaction.type === 'AUDIO'
              ? 'RECORD'
              : 'TEXT',
          content: reaction.contents,
        }));
      });
  };

  const createReaction = async (
    postID: number,
    content: string,
    type: 'TEXT' | 'EMOJI' | 'RECORD',
  ) => {
    const clientTypeToServerType = {
      TEXT: 'TEXT',
      EMOJI: 'IMAGE',
      RECORD: 'AUDIO',
    };
    return privateAPI
      .post({
        url: `api/v1/posts/${postID}/reaction`,
        data: { content, type: clientTypeToServerType[type] },
      })
      .then((response) => {
        if (response.code === 'SUCCESS') return { isSuccess: true };
        return { isSuccess: false };
      });
  };

  return { createFeed, getAllFeed, getTime, getReactions, createReaction };
}

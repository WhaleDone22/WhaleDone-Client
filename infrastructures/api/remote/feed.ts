import { FeedService } from '../feed';
import { privateAPI } from './base';

export function feedRemote(): FeedService {
  const createFeed = async (title: string, content: string, type: 0 | 1) => {
    return privateAPI
      .post({
        url: '/api/v1/users/auth/post',
        data: { title, question: content, type },
      })
      .then((data) => ({ isSuccess: data.responseSuccess ?? false }));
  };

  const getAllFeed = async () => {
    return privateAPI.get({ url: '/api/v1/users/auth/family-posts' });
  };

  const getTime = async (familyID: number) => {
    return privateAPI.get({
      url: `/api/v1/families/${familyID}/users/time-difference`,
    });
  };

  const getReactions = async (feedID: number) => {
    return privateAPI.get({
      url: `/api/v1/posts/${feedID}/reactions`,
    });
  };

  return { createFeed, getAllFeed, getTime, getReactions };
}

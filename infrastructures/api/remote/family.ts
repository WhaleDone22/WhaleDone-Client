import { FamilyService } from '../family';
import { privateAPI } from './base';

export function familyRemote(): FamilyService {
  const getNewCode = async (familyID: number) =>
    privateAPI
      .post({ url: `api/v1/families/${familyID}/new-code` })
      .then((response) => {
        if (typeof response.singleData.invitationCode === 'string')
          return { newCode: response.singleData.invitationCode };
        return { newCode: '' };
      });

  return { getNewCode };
}

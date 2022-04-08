export interface FamilyService {
  getNewCode(familyID: number): Promise<{ newCode: string }>;
}

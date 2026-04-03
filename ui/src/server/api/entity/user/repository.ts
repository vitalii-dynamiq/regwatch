import BaseRepository from '@/lib/repositories/baseRepository';
import type { User, UserCreateDto, UserPatchDto, UserUpdateDto } from '@/server/api/entity/user/types';

export default class UserRepository extends BaseRepository<User, UserCreateDto, UserUpdateDto, UserPatchDto> {
  protected endpoint: string = '/v1/users';

  async me(): Promise<User> {
    return await this.getOne('/me');
  }

  async patchMe(data: UserPatchDto): Promise<User> {
    return await this.patch('/me', data);
  }

  async createUserWithSignIn(data: UserCreateDto, token: string): Promise<User> {
    this.fetcher.setBearerAuthorization(token);
    const newUserData = await this.fetcher.post(this.buildUrlPath(), data);
    return newUserData as User;
  }
}

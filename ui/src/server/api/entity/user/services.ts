import Repository from '@/server/api/entity/user/repository';
import {
  type User,
  type UserCreateDto,
  type UserPatchDto,
  type UserUpdateDto,
  createUserSchema,
  patchUserSchema,
  userArraySchema,
  userPaginationSchema,
  userSchema,
} from '@/server/api/entity/user/types';

import { factoryCrudService } from '@/server/api/_shared/factoryCrudService';

const repo = new Repository();

export const userService = factoryCrudService<User, UserCreateDto, UserUpdateDto, Partial<UserUpdateDto>>({
  repo,
  schemas: {
    list: userArraySchema,
    pagination: userPaginationSchema,
    item: userSchema,
    create: createUserSchema,
    patch: patchUserSchema,
  },
});

export const fetchPaginationUsers = userService.fetchAllWithPagination;
export const fetchMe = async (): Promise<User> => {
  const data = await repo.me();
  return userSchema.parse(data);
};
export const patchMe = async (input: UserPatchDto): Promise<User> => {
  const dto = patchUserSchema.parse(input);
  const data = await repo.patchMe(dto);
  return userSchema.parse(data);
};
export const createUserWithSignIn = async (input: UserCreateDto, id_token: string): Promise<User> => {
  const dto = createUserSchema.parse(input);
  const data = await repo.createUserWithSignIn(dto, id_token);
  return userSchema.parse(data);
};

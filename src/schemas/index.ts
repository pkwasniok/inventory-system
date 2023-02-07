import {
  loginSchema,
  type LoginInput
} from './login.schema';

import {
  registerSchema,
  type RegisterInput
} from './register.schema';

import {
  organizationCreateSchema,
  type OrganizationCreateInput,
  organizationUpdateSchema,
  type OrganizationUpdateInput,
  organizationIdSchema,
  type OrganizationId,
} from './organization.schema';

import {
  userUpdateSchema,
  type UserUpdateInput,
  userPasswordChangeSchema,
  type UserPasswordChangeInput,
} from './user.schema';

import {
  bookCreateSchema,
  type BookCreateInput,
  bookUpdateSchema,
  type BookUpdateInput,
} from './book.schema';



export {
  loginSchema,
  registerSchema,
  organizationIdSchema,
  organizationCreateSchema,
  organizationUpdateSchema,
  userUpdateSchema,
  userPasswordChangeSchema,
  bookCreateSchema,
  bookUpdateSchema,
}

export type {
  LoginInput,
  RegisterInput,
  OrganizationId,
  OrganizationCreateInput,
  OrganizationUpdateInput,
  UserUpdateInput,
  UserPasswordChangeInput,
  BookCreateInput,
  BookUpdateInput,
}

import {
  loginSchema,
  type LoginInput
} from './login.schema';

import {
  registerSchema,
  type RegisterInput
} from './register.schema';

import {
  bookCreateSchema,
  type BookCreateInput,
  bookUpdateSchema,
  type BookUpdateInput,
} from './book.schema';



export {
  loginSchema,
  registerSchema,
  bookCreateSchema,
  bookUpdateSchema,
}

export type {
  LoginInput,
  RegisterInput,
  BookCreateInput,
  BookUpdateInput,
}

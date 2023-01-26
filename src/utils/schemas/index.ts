import { loginSchema, type LoginInput } from "./login.schema";
import { registerSchema, type RegisterInput } from "./register.schema";
import { organizationCreateSchema, type OrganizationCreateInput } from "./organization.schema";

export {
  loginSchema,
  registerSchema,
  organizationCreateSchema,
}

export type {
  LoginInput,
  RegisterInput,
  OrganizationCreateInput,
}

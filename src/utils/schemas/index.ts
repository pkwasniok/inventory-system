import { loginSchema, type LoginInput } from "./login.schema";
import { registerSchema, type RegisterInput } from "./register.schema";
import { organizationCreateSchema, type OrganizationCreateInput, organizationUpdateSchema, type OrganizationUpdateInput } from "./organization.schema";

export {
  loginSchema,
  registerSchema,
  organizationCreateSchema,
  organizationUpdateSchema
}

export type {
  LoginInput,
  RegisterInput,
  OrganizationCreateInput,
  OrganizationUpdateInput,
}

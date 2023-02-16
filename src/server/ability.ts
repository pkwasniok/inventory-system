import { AbilityBuilder, type PureAbility } from '@casl/ability';

import { createPrismaAbility, type PrismaQuery, type Subjects } from '@casl/prisma';

import {
  type User,
  type Organization,
} from '@prisma/client';



type AppActions = 'manage'|'create'|'read'|'update'|'delete';
type AppSubjects = Subjects<{ Organization: Organization }>;
type AppAbility = PureAbility<[AppActions, AppSubjects], PrismaQuery>;

export const defineAbilityFor = (user?: User) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (user == undefined) {
    return build();
  }

  can('manage', 'Organization', { users: { some: { userId: user.id } } });

  return build();
}
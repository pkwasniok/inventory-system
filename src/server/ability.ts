import { AbilityBuilder, type PureAbility } from '@casl/ability';
import { createPrismaAbility, type PrismaQuery, type Subjects } from '@casl/prisma';
import { type User, type Organization } from '@prisma/client';



type AppAction = 'manage'|'create'|'read'|'update'|'delete';
type AppSubject = Subjects<{ User: User, Organization: Organization }>;
export type AppAbility = PureAbility<[AppAction, AppSubject], PrismaQuery>;

export const defineAbilityFor = (user: User|null) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  // Return empty ability when user is unauthenticated
  if (user == null) {
    return build();
  }

  // Organization
  can('create', 'Organization');
  can('read', 'Organization', { users: { some: { userId: user.id } } });
  can('update', 'Organization', { users: { some: { userId: user.id } } });
  can('delete', 'Organization', { users: { some: { userId: user.id } } });

  return build();
}

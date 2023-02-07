import { AbilityBuilder, type PureAbility } from '@casl/ability';
import { createPrismaAbility, type PrismaQuery, type Subjects } from '@casl/prisma';
import { type User, type Organization, type Book, type Room, type Group, type Item, type UserOnOrganization } from '@prisma/client';



type AppAction = 'manage'|'create'|'read'|'update'|'delete';
type AppSubject = Subjects<{ User: User, Organization: Organization, Book: Book, Room: Room, Group: Group, Item: Item }>;
export type AppAbility = PureAbility<[AppAction, AppSubject], PrismaQuery>;



export const defineAbility = (user?: User) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  // Return empty ability when user is unauthenticated
  if (user == undefined) {
    return build();
  }

  // Organization
  can('manage', 'Organization', { users: { some: { userId: user.id } } });

  // Book
  can('manage', 'Book', { organization: { users: { some: { userId: user.id } } } });

  // Room
  can('manage', 'Room');

  // Group
  can('manage', 'Group');

  // Item
  can('manage', 'Item');

  return build();
}

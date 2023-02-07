import { AbilityBuilder, type PureAbility } from '@casl/ability';
import { createPrismaAbility, type PrismaQuery, type Subjects } from '@casl/prisma';
import { type User, type Organization, type Book, type Room, type Group, type Item } from '@prisma/client';



type AppAction = 'manage'|'create'|'read'|'update'|'delete';
type AppSubject = Subjects<{ User: User, Organization: Organization, Book: Book, Room: Room, Group: Group, Item: Item }>;
export type AppAbility = PureAbility<[AppAction, AppSubject], PrismaQuery>;



export const defineAbilityFor = (user: User|null) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  // Return empty ability when user is unauthenticated
  if (user == null) {
    return build();
  }

  // Organization
  can('manage', 'Organization');

  // Book
  can('manage', 'Book');

  // Room
  can('manage', 'Room');

  // Group
  can('manage', 'Group');

  // Item
  can('manage', 'Item');

  return build();
}

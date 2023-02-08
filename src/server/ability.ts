import { AbilityBuilder, type PureAbility } from '@casl/ability';

import { createPrismaAbility, type PrismaQuery, type Subjects } from '@casl/prisma';

import { prisma } from './db';

import {
  type User,
  type Organization,
  type Book,
  type Room,
  type Group,
  type Item,
} from '@prisma/client';



type AppActions = 'manage'|'create'|'read'|'update'|'delete';
type AppSubjects = Subjects<{ Book: Book, Room: Room, Group: Group, Item: Item }>;
type AppAbility = PureAbility<[AppActions, AppSubjects], PrismaQuery>;

export const defineAbilityFor = async (user?: User, organization?: Organization) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (user == undefined || organization == undefined) {
    return build();
  }

  const _organization = await prisma.organization.findFirst({
    where: {
      id: organization.id,
      users: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (_organization == null) {
    return build();
  }

  can('manage', 'Book');
  can('manage', 'Room');
  can('manage', 'Group');
  can('manage', 'Item');

  return build();
}
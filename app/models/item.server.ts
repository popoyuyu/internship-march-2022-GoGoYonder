import type { Item, Attendee, User, Trip } from "@prisma/client"

import { prisma } from "../db.server"
export type { Item }

export async function getItemsByAttendee( Pick < Item, `userId` | `tripId`>
  userId: User[`id`],
  tripId: Trip[`id`],
) {
  return prisma.item.findMany({
    where: {
      userId: {
        contains: userId,
      },
      tripId: {
        contains: tripId,
      },
    },
  })
}

// export async function createItem(item: Item): Promise<Item> {
//   return prisma.item.create({ data: item })
// }
export async function createItem(
  item: Pick<Item, `description` | `tripId` | `userId`>,
){
  return prisma.item.create({ data: item })
}

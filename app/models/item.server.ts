import type { Item, Attendee, User, Trip } from "@prisma/client"

import { prisma } from "../db.server"
export type { Item }

export async function getItemsByAttendee(
  userId: User[`id`],
  tripId: Trip[`id`],
): Promise<Pick<Item, `tripId` | `userId`>[]> {
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

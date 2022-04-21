/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Item } from "@prisma/client"
import type { Attendee, User, Trip } from "@prisma/client"

import { prisma } from "../db.server"

export type { Attendee, Item }

export async function getAttendeesByTripId(tripId: Trip[`id`]) {
  return prisma.attendee.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      user: {},
      expenses: {},
      packingList: {},
      trip: {},
    },
  })
}

// export async function createItem(
//   item: Pick<Item, `attendeeId` | `description`>,
// ) {
//   return prisma.item.create({ data: item })
// }

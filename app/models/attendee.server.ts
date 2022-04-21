/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Attendee, User, Trip } from "@prisma/client"

import { prisma } from "../db.server"

export type { Attendee }

export async function getAttendees() {
  return prisma.attendee.findMany()
}

export async function getAttendeesByUserId(userId: User[`id`]) {
  return prisma.attendee.findMany({ where: { userId: userId } })
}

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

export async function getAttendeeById(
  tripId: Attendee[`tripId`],
  userId: Attendee[`userId`],
) {
  return prisma.attendee.findFirst({
    where: {
      tripId: tripId,
      userId: userId,
    },
    include: {
      user: {},
      expenses: {},
      packingList: {},
      trip: {},
    },
  })
}

export async function createAttendee(
  attendee: Pick<Attendee, `tripId` | `userId`>,
) {
  return prisma.attendee.create({ data: attendee })
}

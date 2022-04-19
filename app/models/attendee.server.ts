import type { Attendee, User } from "@prisma/client"

import { prisma } from "../db.server"

export type { Attendee }

export async function getAttendees() {
  return prisma.attendee.findMany()
}

export async function getAttendeesByUserId(userId: User['id']) {
  return prisma.attendee.findMany({ where: { userId: userId } })
}

export async function createAttendee(
  attendee: Pick<Attendee, `tripId` | `userId`>
) {
  return prisma.attendee.create({ data: attendee })
}
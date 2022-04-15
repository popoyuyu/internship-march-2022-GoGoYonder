import type { FC } from "react"

import { Link, json, useLoaderData, LoaderFunction } from "remix"

import type { Trip, Attendee } from "@prisma/client"
import { getAttendeesByUserId } from "~/models/attendee.server"
import { getTripById } from "~/models/trip.server"
import { requireUserId } from "~/session.server"
import { join } from "~/utils"

type LoaderData = {
  trips: Trip[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const attendees = await getAttendeesByUserId(userId)
  const promises = await Promise.all(
    attendees.map(async (attendee) => (
      await getTripById(attendee.tripId)
    )))

  const trips = promises as Trip[]

  return json<LoaderData>({
    trips: trips
  })
}

const Index: FC = () => {
  const { trips } = useLoaderData() as LoaderData
  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Trips List
      </h1>
      <ul>
        {trips.map((trip: Trip) => (
          <li key={trip.id}>
            <Link
              to={trip.id}
              className={join(
                `flex`,
                `items-center`,
                `justify-center`,
                `rounded-md`,
                `border`,
                `border-transparent`,
                `bg-white`,
                `px-4`,
                `py-3`,
                `text-base`,
                `font-medium`,
                `text-yellow-700`,
                `shadow-sm`,
                `hover:bg-yellow-50`,
                `sm:px-8`,
              )}
            >
              {trip.nickName}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/trips/new/"
        className={join(
          `flex`,
          `items-center`,
          `justify-center`,
          `rounded-md`,
          `border`,
          `border-transparent`,
          `bg-white`,
          `px-4`,
          `py-3`,
          `text-base`,
          `font-medium`,
          `text-yellow-700`,
          `shadow-sm`,
          `hover:bg-yellow-50`,
          `sm:px-8`,
        )}
      >
        Create Trip
      </Link>
      <Link
        to="/trips/trip-id-goes-here"
        className={join(
          `flex`,
          `items-center`,
          `justify-center`,
          `rounded-md`,
          `border`,
          `border-transparent`,
          `bg-white`,
          `px-4`,
          `py-3`,
          `text-base`,
          `font-medium`,
          `text-yellow-700`,
          `shadow-sm`,
          `hover:bg-yellow-50`,
          `sm:px-8`,
        )}
      >
        Example Trip
      </Link>
    </div>
  )
}

export default Index
//outlet

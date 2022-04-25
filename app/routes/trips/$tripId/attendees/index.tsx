import type { FC } from "react"

import type { LoaderFunction } from "remix"
import { Link, json, useLoaderData } from "remix"

import type { Params } from "react-router"
import invariant from "tiny-invariant"

import { getAttendeesByTripId } from "~/models/attendee.server"
import { join } from "~/utils"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (params: Params<string>) => {
  invariant(params.tripId, `trips required`)
  return getAttendeesByTripId(params.tripId)
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.tripId, `trip id is required`)
  return json<LoaderData>(await getLoaderData(params))
}

const UserList: FC = () => {
  const data = useLoaderData<LoaderData>()

  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Attendees
      </h1>
      <ul>
        {data.map((attendee) => (
          <li
            key={attendee.userId}
            className={join(`flex`, `items-center`, `justify-center`)}
          >
            {attendee.user.userName}
          </li>
        ))}
      </ul>
      <Link
        to="new"
        className={join(
          `flex`,
          `items-center`,
          `justify-center`,
          `bg-emerald-400`,
          `rounded`,
          `w-56`,
          `mx-auto`,
          `py-3`,
        )}
      >
        Add a new Attendee
      </Link>
    </div>
  )
}

export default UserList

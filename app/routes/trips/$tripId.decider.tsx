import type { FC } from "react"
import { useEffect } from "react"

import type { ActionFunction, LoaderFunction } from "remix"
import {
  redirect,
  Form,
  Link,
  json,
  useLoaderData,
  useParams,
  useActionData,
  useSubmit,
} from "remix"

import { Decider, Attendee, Trip } from "@prisma/client"
import type { Params } from "react-router"
import invariant from "tiny-invariant"

import { getAttendeeNames } from "~/models/attendee.server"
import {
  getDeciderByTripId,
  updateDeciderByDeciderId,
} from "~/models/decider.server"
import { getTripById } from "~/models/trip.server"
import { WideButton } from "~/styles/styledComponents"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import { join } from "~/utils"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (params: Params<string>) => {
  invariant(params.tripId, `trips required`)
  const decider = await getDeciderByTripId(params.tripId)
  return decider
}
export const loader: LoaderFunction = async ({ params }) => {
  return json<LoaderData>(await getLoaderData(params))
}

type decider =
  | {
      tripId: string | null
      result: string | null
    }
  | undefined

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.tripId, `trips required`)
  const { tripId } = params
  const trip = await getTripById(tripId)
  invariant(trip, `must have a trip`)
  const attendees = await getAttendeeNames(params.tripId)
  invariant(attendees, `need attendees`)
  const attendeeNames = attendees.map((attendee) => attendee.user.userName)
  const result = attendeeNames[Math.floor(Math.random() * attendeeNames.length)]
  invariant(result, `result is not defined`)

  const decider = await updateDeciderByDeciderId(trip.deciderId, result)

  return redirect(`/trips/${tripId}/decider/`)
}

const Decider: FC = () => {
  const data = useLoaderData<LoaderData>()
  const { tripId } = useParams()
  return (
    <div>
      <div>
        <Link to={`/trips/${tripId}`}>
          <div className={join(`ml-8`)}>
            <SvgBackButton />
          </div>
        </Link>
      </div>
      <div>{data?.result}</div>
      <div>
        <Form method="post">
          <WideButton type="submit">Select Random</WideButton>Form
        </Form>
      </div>
    </div>
  )
}

export default Decider

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
import { RoundedRectangle, WideButton } from "~/styles/styledComponents"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import { join } from "~/utils"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (params: Params<string>) => {
  invariant(params.tripId, `trips required`)
  const decider = await getDeciderByTripId(params.tripId)
  const attendee = await getAttendeeNames(params.tripId)
  return { decider, attendee }
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
  const attendeeArray = attendees.map((attendee) => attendee.user)
  const winner = attendeeArray[Math.floor(Math.random() * attendeeArray.length)]
  invariant(winner, `winner is not defined`)

  const decider = await updateDeciderByDeciderId(
    trip.deciderId,
    winner.userName,
    winner.avatarUrl,
  )

  return redirect(`/trips/${tripId}/decider/`)
}

const Decider: FC = () => {
  const data = useLoaderData<LoaderData>()
  console.log(data)
  console.log(data.decider)

  const randomAttendee = data.attendee.map((attendee) => attendee.user)
  const { tripId } = useParams()

  console.log(randomAttendee)

  const defaultAvatar = `public/img/default-avatar.jpg`
  const rectangleStyles = [`flex`, `mx-2`]
  const avatarDivStyles = [`ml-2`, `flex`]

  return (
    <div>
      <div>
        <Link to={`/trips/${tripId}`}>
          <div className={join(`ml-8`)}>
            <SvgBackButton />
          </div>
        </Link>
      </div>
      <div>
        {/* {` `}
        <RoundedRectangle className={join(...rectangleStyles)}>
          <div className={join(...avatarDivStyles)}>
            <Avatar src={attendee.user.avatarUrl || defaultAvatar} />
          </div>
          <div className={join(...titleDivStyles)}>
            <TitleText>{data?.result}</TitleText>
          </div>
        </RoundedRectangle> */}
      </div>

      <div>
        <Form method="post">
          <WideButton type="submit">Select Random</WideButton>
        </Form>
      </div>
    </div>
  )
}

export default Decider

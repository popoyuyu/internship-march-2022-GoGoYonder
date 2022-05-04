import type { FC } from "react"

import type { LoaderFunction } from "remix"
import { Outlet, json, useLoaderData, Link } from "remix"

import type { Trip } from "@prisma/client"
import { User } from "@prisma/client"
import moment from "moment"

import { getUserById } from "~/models/user.server"
import { getUser, requireUserId } from "~/session.server"
import {
  Header,
  SubHeader,
  ProHugeNumber,
  ProH4,
  ProBody,
  ProTripImage,
} from "~/styles/styledComponents"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import SvgGear from "~/styles/SVGR/SvgGear"
import SvgTrip from "~/styles/SVGR/SvgPin"
import SvgProfileDial from "~/styles/SVGR/SvgProfileDial"
import { join } from "~/utils"

import NavBar from "../navbar"
import EditProfile from "./edit"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

// const getLoaderData = async (request: Request) => {
//   const userId = await requireUserId(request)
//   console.log(userId)
//   const user = await getUserById(userId)
//   return { user: user }
// }

const getLoaderData = async (request: Request) => {
  const userId = await requireUserId(request)
  // console.log(userId)
  const user = await getUserById(userId)
  // console.log(user)
  return { user: user }
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>(await getLoaderData(request))
}

const Index: FC = () => {
  //Main Data
  const data = useLoaderData<LoaderData>()
  // console.log(data)
  const user = data?.user
  // console.log(`=======`)
  // console.log(user)
  // console.log(`=======`)
  const trips = data?.user?.trips
  // console.log(trips)

  //Dates
  const convertStringToDate = (inputDate: string) => {
    return (inputDate ? new Date(inputDate) : new Date(0)).toLocaleDateString()
  }
  const createdDate = data.user?.createdAt
  const profileCreatedDate = convertStringToDate(createdDate)

  //Attendees
  const attendees = data?.user?.attendees
  const attendeesCount = attendees.length

  return (
    <div className="flex-col place-content-center">
      <div className={join(`ml-8`)}>
        <SvgBackButton />
      </div>

      <div className="flex w-full items-center justify-between">
        <div>
          <Header>Your Account</Header>
        </div>
        <div className="mx-8">
          <Link to={`/profile/edit`}>
            <span className={join(`flex`, `m-8`)}>
              <SvgGear />
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-col">
        <div>
          <SvgProfileDial />
        </div>
        <div className={join(`text-center, -mt-45`)}>
          <ProHugeNumber>{trips.length}</ProHugeNumber>
          <ProH4>Total Trips</ProH4>
          <ProBody>
            Member Since{` `}
            {profileCreatedDate}
          </ProBody>
        </div>
      </div>

      <div>
        <SubHeader>Recent Trips</SubHeader>
      </div>

      <ul>
        {trips.map((trip: Trip) => (
          <div key={trip.id}>
            <div className></div>
            <ProTripImage>
              <SvgTrip />
            </ProTripImage>
            <ProH4>{trip.nickName}</ProH4>
            <ProBody>
              {convertStringToDate(trip.startDate)}
              {` `}
              {trip.startDate !== null ? `–` : ``}
              {` `}
              {convertStringToDate(trip.endDate)}
            </ProBody>
            <ProBody>
              {attendeesCount}
              {` `}Travelers
            </ProBody>
          </div>
        ))}
      </ul>
      <Outlet />

      <NavBar />
    </div>
  )
}

export default Index

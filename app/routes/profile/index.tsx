import type { FC } from "react"

import type { LoaderFunction } from "remix"
import { Outlet, json, useLoaderData, Link, Form } from "remix"

import { User } from "@prisma/client"
import type { Trip } from "@prisma/client"

import { getAttendeesByUserId } from "~/models/attendee.server"
import { getUserById } from "~/models/user.server"
import { requireUserId } from "~/session.server"
import {
  AddButtonText,
  Header,
  SubHeader,
  ProHugeNumber,
  ProH4,
  ProBody,
  ProTripImage,
  MainBtn,
} from "~/styles/styledComponents"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import SvgGear from "~/styles/SVGR/SvgGear"
import SvgTrip from "~/styles/SVGR/SvgPin"
import SvgProfileDial from "~/styles/SVGR/SvgProfileDial"
import { join } from "~/utils"

import NavBar from "../navbar"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (request: Request) => {
  const userId = await requireUserId(request)
  const user = await getUserById(userId)
  const attendeeObject = await getAttendeesByUserId(userId)
  return { user: user, attendee: attendeeObject }
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>(await getLoaderData(request))
}

const Index: FC = () => {
  //-----------
  //NEED:
  //-USER avatar url
  //-USER.trips OR .attendees - number & list of total trips
  //-USER created date
  //-TRIP trip details from .map (user.trip returns only trips user owns)
  //-^cont. map through TRIPs from ATTENDEES list
  //------------
  //Main Data
  const data = useLoaderData<LoaderData>()
  // const user = data?.user
  const trips = data?.user?.trips
  console.log(data?.user?.attendees)

  //Dates
  const convertStringToDate = (inputDate: string) => {
    return (inputDate ? new Date(inputDate) : new Date(0)).toLocaleDateString()
  }
  const createdDate = data.user?.createdAt
  const profileCreatedDate = convertStringToDate(createdDate)

  //Attendees
  const attendees = data?.user?.attendees
  // console.log(attendees)
  const attendeesCount = attendees.length

  return (
    <>
      <div className="flex-col">
        <div className={join(`ml-8`)}>
          <SvgBackButton />
        </div>

        <div className={join(`flex`, `justify-between`, `items-center`)}>
          <div>
            <Header>Your Account</Header>
          </div>
          <div className="mx-8">
            <Outlet />
            <div className={join(`flex`, `justify-between`, `items-center`)}>
              <AddButtonText>
                {/* <Link to={`/logout`}>
                  <span className={join(`flex`, `m-8`)}>
                    <span className={join(`ml-2`)}>Logout</span>
                  </span>
                </Link> */}

                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className={join(`rounded`, `py-2`, `px-4`, `text-#CAD2C5`)}
                  >
                    Logout
                  </button>
                </Form>
              </AddButtonText>
              <Link to={`edit`}>
                <span className={join(`flex`, `m-8`)}>
                  <SvgGear />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className={join(`container`, `mx-auto`, `-space-y-40`)}>
          <div className={join(`flex`, `justify-center`, `mb-10`)}>
            <SvgProfileDial />
          </div>
          <div className={join(`text-center`)}>
            <ProHugeNumber>{trips.length}</ProHugeNumber>
            <ProH4>Total Trips</ProH4>
            <ProBody>
              Member Since{` `}
              {profileCreatedDate}
            </ProBody>
          </div>
        </div>

        <div className={join(`container`, `mx-auto`, `mt-20`)}>
          <div className={join(`text-center`, `-ml-20`, `p-8`)}>
            <SubHeader>Recent Trips</SubHeader>
          </div>

          <ul>
            {trips.map((trip: Trip) => (
              <div
                key={trip.id}
                className={join(
                  `flex`,
                  `items-center`,
                  `mb-20`,
                  `justify-center`,
                )}
              >
                <div className={join(`order-1`)}>
                  <ProTripImage>
                    <SvgTrip />
                  </ProTripImage>
                </div>
                <div className={join(`order-2`, `ml-5`)}>
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
              </div>
            ))}
          </ul>
        </div>

        <NavBar />
      </div>
    </>
  )
}

export default Index

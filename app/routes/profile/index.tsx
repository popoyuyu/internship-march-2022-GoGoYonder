import type { FC } from "react"

import { Link, useLoaderData, Form } from "remix"

import {
  AddButtonText,
  Header,
  SubHeader,
  ProHugeNumber,
  ProH4,
  ProH5,
  ProBody,
} from "~/styles/styledComponents"
import SvgAddButton from "~/styles/SVGR/SvgAddButton"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import SvgGear from "~/styles/SVGR/SvgGear"
import { join } from "~/utils"

import NavBar from "../navbar"

const Index: FC = () => {
  return (
    <>
      <div className={join(`ml-8`)}>
        <SvgBackButton />
      </div>
      <Header>Your Account</Header>
      <span className={join(`flex`, `m-8`)}>
        <SvgGear />
      </span>
      <div>
        <ProHugeNumber>500</ProHugeNumber>
        <ProH4>Total Trips</ProH4>
        <ProBody>Member Since ExampleDate</ProBody>
      </div>
      <div>
        <SubHeader>Recent Trips</SubHeader>
      </div>
      <ul>
        <li>
          <ProH4>Trip Name</ProH4>
          <ProBody>Trip Dates</ProBody>
          <ProBody>Traveler Number</ProBody>
        </li>
      </ul>
      <NavBar />
    </>
  )
}

export default Index

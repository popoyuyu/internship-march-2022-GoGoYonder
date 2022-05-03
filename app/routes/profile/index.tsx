import type { FC } from "react"

import { Link, useLoaderData, Form } from "remix"

import { AddButtonText, Header, SubHeader } from "~/styles/styledComponents"
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
        <p>Total Trips:</p>
        <p>Member Since:</p>
      </div>
      <div>
        <SubHeader>Recent Trips</SubHeader>
      </div>
      <ul>
        <li>Placeholder Trip 1</li>
      </ul>
      <NavBar />
    </>
  )
}

export default Index

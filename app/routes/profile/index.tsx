import type { FC } from "react"

import { Link, useLoaderData, Form } from "remix"

import { join } from "~/utils"

import NavBar from "../navbar"

const Index: FC = () => {
  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Index

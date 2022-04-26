import { SlowBuffer } from "buffer"

import type { FC } from "react"
import { useState } from "react"

import type { LinksFunction } from "remix"
import { NavLink } from "remix"

import { NavButton } from "~/styles/styledComponents"
import SvgHome from "~/styles/SVGR/SvgHome"
import SvgMap from "~/styles/SVGR/SvgMap"
import SvgProfile from "~/styles/SVGR/SvgProfile"
import SvgTrip from "~/styles/SVGR/SvgTrip"
import { join } from "~/utils"

const NavBar: FC = () => {
  const activeStyle = [
    `bg-[#52796F]`,
    `text-white`,
    `flex`,
    `items-center`,
    `justify-center`,
    `p-2.5`,
    `rounded-lg`,
  ]
  const centered = [`flex`, `items-center`, `justify-center`]
  const container = [
    `fixed`,
    `bottom-0`,
    `w-full`,
    `bg-[#2F3E46DE]`,
    `pt-2.5`,
    `pb-4`,
  ]
  const buttonStyles = [`mx-4`, `w-full`, `h-full`]
  return (
    <div className={join(...centered, ...container)}>
      <NavButton className={join(...buttonStyles)}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? join(...activeStyle) : undefined
          }
        >
          {({ isActive }) =>
            isActive ? (
              <div className={join(...centered)}>
                <SvgHome />
                <h1 className="ml-2">Home</h1>
              </div>
            ) : (
              <SvgHome />
            )
          }
        </NavLink>
      </NavButton>
      <NavButton className={join(...buttonStyles)}>
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            isActive ? join(...activeStyle) : undefined
          }
        >
          {({ isActive }) =>
            isActive ? (
              <div className={join(...centered)}>
                <SvgTrip />
                <h1 className="ml-2">Trips</h1>
              </div>
            ) : (
              <SvgTrip />
            )
          }
        </NavLink>
      </NavButton>
      <NavButton className={join(...buttonStyles)}>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? join(...activeStyle) : undefined
          }
        >
          {({ isActive }) =>
            isActive ? (
              <div className={join(...centered)}>
                <SvgMap />
                <h1 className="ml-2">Map</h1>
              </div>
            ) : (
              <SvgMap />
            )
          }
        </NavLink>
      </NavButton>
      <NavButton className={join(...buttonStyles)}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? join(...activeStyle) : undefined
          }
        >
          {({ isActive }) =>
            isActive ? (
              <div className={join(...centered)}>
                <SvgProfile />
                <h1 className="ml-2">Profile</h1>
              </div>
            ) : (
              <SvgProfile />
            )
          }
        </NavLink>
      </NavButton>
    </div>
  )
}

export default NavBar

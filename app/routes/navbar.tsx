import type { FC } from "react"

import { Link, Form } from "remix"

import { join } from "~/utils"

const NavBar: FC = () => {
  const linkStyles = [
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
  ]
  return (
    <div className={join(`flex`, `items-center`, `justify-center`)}>
      <Link to="/home" className={join(...linkStyles)}>
        Home
      </Link>
      <Link to="/trips" className={join(...linkStyles)}>
        Trips
      </Link>
      <Link to="/map" className={join(...linkStyles)}>
        Map
      </Link>
      <Link to="/profile" className={join(...linkStyles)}>
        View Profile for (add user in loader data)
      </Link>
    </div>
  )
}

export default NavBar

import * as React from "react"
import type { FC } from "react"

const SvgSearchIcon: FC = (props) => (
  <svg
    width={16}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.055 12.556c3.51 0 6.356-2.587 6.356-5.778C13.41
       3.587 10.565 1 7.055 1S.698 3.587.698 6.778c0 3.19 2.846
        5.778 6.357 5.778ZM15 14l-3.456-3.142"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgSearchIcon

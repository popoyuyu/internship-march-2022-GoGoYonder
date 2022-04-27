import * as React from "react"
import type { FC } from "react"

const SvgMap: FC = (props) => (
  <svg
    width={26}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.336 18.378-7.26 1.452V1.68l7.26-1.452v18.15ZM7.261
        1.588 1.126.029a.908.908 0 0 0-.78.163A.908.908 0 0 0 0
        .935v16.336a.907.907 0 0 0 .69.907l6.57
        1.616V1.589Zm17.46.255L18.151.228v18.204l6.135
        1.561a.902.902 0 0 0 .218 0 .908.908 0 0 0 .907-.907V2.75a.908.908
        0 0 0-.69-.907Z"
      fill="#E4EDDF"
    />
  </svg>
)

export default SvgMap

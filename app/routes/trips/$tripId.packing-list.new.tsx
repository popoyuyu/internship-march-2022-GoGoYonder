import type { FC } from "react"

import { redirect, Form, Link } from "remix"

import { createResponseComposition } from "msw"

import { createItem } from "~/models/item.server"
import { join } from "~/utils"

const inputClassName = `join(
  flex
  items-center
  justify-center
  rounded-md
  border
  border-transparent
  bg-white
  px-4
  py-3
  text-base
  font-medium
  text-yellow-700
  shadow-sm
  hover:bg-yellow-50
  sm:px-8
)`

export const action = async ({ request }) => {
  const formData = await request.formData()
  await createResponseComposition(formData.get(`description`))
  return redirect(`packing-list/`)
}

const AddItem: FC = () => {
  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Add Item
      </h1>

      <Form method="post">
        <p>
          <label>
            Item Description:{` `}
            <input type="text" name="description" className={inputClassName} />
          </label>
        </p>
        <p>
          <button type="submit" className={inputClassName}>
            Add Item
          </button>
        </p>
      </Form>

      <Link to="/trips" className={inputClassName}>
        Return to trips
      </Link>
      <Link to="/profile" className={inputClassName}>
        Return to profile
      </Link>
    </div>
  )
}

export default AddItem

// import type { FC } from "react"

// import { Form, Link } from "remix"

// import { join } from "~/utils"

// const AddItem: FC = () => {
//   return (
//     <div>
//       <h1 className={join(`flex`, `items-center`, `justify-center`)}>
//         Add Item
//       </h1>
//       <Link
//         to="/packing-list"
//         className={join(
//           `flex`,
//           `items-center`,
//           `justify-center`,
//           `rounded-md`,
//           `border`,
//           `border-transparent`,
//           `bg-white`,
//           `px-4`,
//           `py-3`,
//           `text-base`,
//           `font-medium`,
//           `text-yellow-700`,
//           `shadow-sm`,
//           `hover:bg-yellow-50`,
//           `sm:px-8`,
//         )}
//       >
//         Return to trips
//       </Link>
//       <Link
//         to="/profile"
//         className={join(
//           `flex`,
//           `items-center`,
//           `justify-center`,
//           `rounded-md`,
//           `border`,
//           `border-transparent`,
//           `bg-white`,
//           `px-4`,
//           `py-3`,
//           `text-base`,
//           `font-medium`,
//           `text-yellow-700`,
//           `shadow-sm`,
//           `hover:bg-yellow-50`,
//           `sm:px-8`,
//         )}
//       >
//         Return to profile
//       </Link>
//     </div>
//   )
// }

// export default AddItem

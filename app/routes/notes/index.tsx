import type { FC } from "react"

import { Link } from "remix"

const NoteIndexPage: FC = () => {
  return (
    <p>
      No note selected. Select a note on the left, or{` `}
      <Link to="new" className="text-blue-500 underline">
        create a new note.
      </Link>
    </p>
  )
}
export default NoteIndexPage

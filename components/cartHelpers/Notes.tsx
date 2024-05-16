"use client";

import useCartStore from "@/utils/store";
import NotesInput from "../NotesInput";

const Notes = () => {
  const maxChars = 200;
  const { orderNotes, setNotes } = useCartStore();

  return (
    <NotesInput
      initialNote={orderNotes}
      maxChars={maxChars}
      onNoteChange={setNotes}
    />
  );
};

export default Notes;

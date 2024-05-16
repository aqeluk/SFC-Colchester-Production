import { Button, Textarea } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

type NotesInputProps = {
  initialNote: string;
  maxChars: number;
  onNoteChange: (note: string) => void;
};

const NotesInput: React.FC<NotesInputProps> = ({
  initialNote,
  maxChars,
  onNoteChange,
}) => {
  const [note, setNote] = useState<string>(initialNote);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  const handleBlur = () => {
    onNoteChange(note);
  };

  const handleClearNotes = () => {
    onNoteChange("");
    setShowNotes(false);
  };

  return (
    <div className="flex justify-center">
      {" "}
      {/* Centering container */}
      <div className="w-full max-w-md p-4 rounded-xl flex flex-col items-center">
        {" "}
        {/* Width-controlled container */}
        {showNotes ? (
          <>
            <Textarea
              variant="underlined"
              label="Description"
              labelPlacement="outside"
              placeholder="Add a note to your order (optional)"
              value={note}
              onValueChange={setNote}
              onBlur={handleBlur}
              maxLength={maxChars}
            />
            <div className="text-right text-sm">
              {note.length}/{maxChars}
            </div>
            <div className="p-2">
              <Button
                color="primary"
                className="mx-4"
                onClick={() => setShowNotes(false)}
              >
                Save Notes
              </Button>
              <Button
                color="danger"
                className="mx-4"
                onClick={handleClearNotes}
              >
                Clear Notes
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              className="p-2 text-lg font-semibold"
              color="primary"
              onClick={() => setShowNotes(true)}
            >
              Want to Add Notes For Your Order?
            </Button>
            {note !== "" && (
              <div className="p-2 text-lg font-semibold">
                Current Note: {note}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotesInput;

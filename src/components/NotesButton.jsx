import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import NotesModal from "./NotesModal";

const NotesButton = ({ notes, setNotes }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-3">
      <Button
        onClick={() => setShowModal(true)}
        variant="info"
      >
          {notes ? "Edit Notes" : "Add Notes"}
      </Button>
      <NotesModal
        show={showModal}
        notes={notes} 
        setNotes={setNotes}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};

export default NotesButton;

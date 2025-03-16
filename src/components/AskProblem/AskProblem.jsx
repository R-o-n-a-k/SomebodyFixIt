import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./AskProblem.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import FileUpload from "../FileUpload";

function AskProblem() {
  // modal open/close
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const userName = "Ronak Patel";

  return (
    <>
      <div className="ask-problem">
        <Avatar name={userName} className="ask-avatar" />
        <div target="_blank">
          <input
            onClick={onOpenModal}
            type="text"
            className="ask-input"
            placeholder="Got a Problem? Ask it..."
          />
          <Modal open={open} onClose={onCloseModal} center>
            <div className="ask-modal">
              <h4>Ask Problem</h4>
              <hr />
              <div className="ask-content">
                <textarea
                  className="ask-desc"
                  rows="4"
                  placeholder="Explain your problem..."
                />
                <FileUpload />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default AskProblem;

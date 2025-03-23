import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./AskProblem.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import FileUpload from "../FileUpload";
import { handlePostSubmit } from "../../utils/postProblem";

function AskProblem({ token }) {
  // modal open/close
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const userName = token.user?.user_metadata?.first_name;
  const [problemDescription, setProblemDescription] = useState(""); // For storing problem text
  const [selectedFile, setSelectedFile] = useState(null); // For storing the uploaded file

  const handleFileUpload = (file) => {
    setSelectedFile(file); // FileUpload component should pass the selected file here
  };

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
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Explain your problem..."
                />
                <FileUpload onFileSelect={handleFileUpload} />
                <button
                  onClick={(e) =>
                    handlePostSubmit(e, {
                      problemDescription,
                      selectedFile,
                      userName,
                      onCloseModal,
                      setProblemDescription,
                      setSelectedFile,
                    })
                  }
                  type="submit"
                  className="ask-post-button"
                >
                  Post
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default AskProblem;

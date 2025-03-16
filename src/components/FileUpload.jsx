import React, { useState } from "react";

function FileUpload() {
  // uploading file
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // deleting file
  function handleDelete() {
    setFile(null);
  }
  return (
    <>
      {file && (
        <div style={{ position: "relative", marginTop: "10px" }}>
          <img src={file} alt="Uploaded" className="ask-uploaded-file" />

          <button onClick={handleDelete} className="ask-uploaded-file-delete">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
      <label htmlFor="file-upload" className="ask-file-icon">
        <i className="fa-solid fa-images" />
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleChange}
        className="ask-file"
      />
      <button type="submit" className="ask-post-button">
        Post
      </button>
    </>
  );
}

export default FileUpload;

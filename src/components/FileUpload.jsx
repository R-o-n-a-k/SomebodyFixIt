import React, { useState } from "react";
function FileUpload({ onFileSelect }) {
  const [filePreview, setFilePreview] = useState(null); // Preview URL
  const [selectedFile, setSelectedFile] = useState(null); // File object

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Save file object
      setFilePreview(URL.createObjectURL(file)); // Create preview URL
      onFileSelect(file); // Pass file to parent component
    }
  };

  // Handle file deletion
  const handleDelete = () => {
    setSelectedFile(null); // Clear file object
    setFilePreview(null); // Clear preview URL
    onFileSelect(null); // Reset file in parent component
  };

  return (
    <>
      {filePreview && (
        <div style={{ position: "relative", marginTop: "10px" }}>
          <img src={filePreview} alt="Uploaded" className="ask-uploaded-file" />

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
        onChange={handleFileChange}
        className="ask-file"
      />
    </>
  );
}

export default FileUpload;

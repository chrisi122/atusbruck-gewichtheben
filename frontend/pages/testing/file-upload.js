import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("files", file);

    const res = await axios.post("http://localhost:1337/api/upload", data);

    const id = res.data[0].id;

    const res2 = await axios.put("http://localhost:1337/api/athletes/620", {
      data: { image: { id } },
    });
  };

  return (
    <div
      style={{
        height: "20rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='file' onChange={(e) => setFile(e.target.files[0])}></input>
        <input type='submit' />
      </form>
    </div>
  );
};

export default FileUpload;

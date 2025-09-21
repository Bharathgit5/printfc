import React, { useContext, useState } from "react";
import { Client, Storage, ID } from "appwrite";
import CopiesContext from "../CopiesContext";
import styles from "./UploadDocs.module.css";
import Alert from "../pages/Alert";

const UploadDocs = ({ onUpload }) => {
  const { setCopies } = useContext(CopiesContext);
  const [docname, setDocname] = useState("");
  const [alert, setAlert] = useState(null);
  const [copies, setLocalCopies] = useState(1);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 2000);
  };

  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  const storage = new Storage(client);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const file = files[0];
    const promise = storage.createFile(import.meta.env.VITE_APPWRITE_BUCKET, ID.unique(), file);

    promise.then(
      (response) => {
        showAlert("File uploaded successfully", "success");

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onloadend = () => {
          const matches = reader.result.match(/\/Type[\s]*\/Page[^s]/g);
          const totalPages = matches ? matches.length : 1;

          document.getElementById("info").textContent = totalPages;

          onUpload({
            fileId: response.$id,
            pages: totalPages,
            copies: copies,
          });
        };

        const txt = `File: ${file.name} | Size: ${Math.round(file.size / 1000)}KB`;
        setDocname(txt);
      },
      (error) => {
        console.error(error);
        showAlert("File upload failed", "danger");
      }
    );
  };

  const handleCopiesChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setLocalCopies(value);
    setCopies(value);
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="card text-center" id={styles.card1}>
        <p className={styles["card-head"]}>
          <i className="bi bi-cloud-arrow-up" id={styles.icon}></i> Upload Your File
        </p>

        <div className={styles["card-body1"]}>
          <div className="uploadmain">
            <div className="upload">
              <div className={styles["main"]}>
                <div className={styles["uploadimage"]}>
                  <label className={styles["imglabel"]} htmlFor="upload-file">
                    <b>Upload File</b>
                  </label>
                </div>
                <input
                  type="file"
                  id="upload-file"
                  className={styles["inputlabel"]}
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
              </div>
              <p className={styles["docnamedisp"]}>{docname}</p>
            </div>

            <div className="container">
              <div className="noofpages">
                <b className={styles.numpages}>Number of Pages:</b>
                <p className={styles.noofpagesbox} id="info">0</p>
              </div>

              <div className="noofcopies">
                <b className={styles.numcopies}>Number of copies:</b>
                <input
                  type="number"
                  min="1"
                  value={copies}
                  onChange={handleCopiesChange}
                  className={styles.nocopiesbox}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDocs;

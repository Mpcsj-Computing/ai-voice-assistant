import { useState } from "react";
import Button from "@mui/material/Button";

interface FileSenderProps {
  disabled: boolean;
  onFileSelected: (file: File) => void;
}

const FileSender = ({ disabled, onFileSelected }: FileSenderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      alert("Please select a file to continue!");
      return;
    }

    onFileSelected(selectedFile);
  };

  if (disabled) {
    return null;
  }
  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".csv, .xlsx" />
      {selectedFile && (
        <Button
          variant="contained"
          onClick={handleUploadFile}
          style={{ background: "#f5bd25", color: "black" }}
        >
          Upload file
        </Button>
      )}
    </div>
  );
};

export default FileSender;

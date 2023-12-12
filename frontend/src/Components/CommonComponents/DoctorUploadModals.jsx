import { useState } from 'react';
import { END_POINT } from '../../Redux/AdminReducer/action';

// ... (Your imports remain unchanged)

const ImageUploadModal = ({ isOpen, closeModal, onImageUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      onImageUpload(selectedFiles);
    }
  };

  const handleFileChange = (e) => {
    Array.from(e.target.files).forEach((image_file) => {
      setSelectedFiles((prev) => [...prev, image_file]);
    });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="modal bg-white p-6 rounded-lg">
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
          <h2 className="text-lg font-semibold mb-2">Upload Images</h2>
          <input type="file" onChange={handleFileChange} multiple={true} />
          <button onClick={handleUpload} className="btn-primary">
            Upload
          </button>
        </div>
        <button onClick={closeModal} className="modal-close" />
      </div>
    )
  );
};

const FileUploadModal = ({ isOpen, closeModal, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files?.[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="modal bg-white p-6 rounded-lg border-black">
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
          <h2 className="text-lg font-semibold mb-2">Upload File</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className="btn-primary">
            Upload
          </button>
        </div>
        <button onClick={closeModal} className="modal-close" />
      </div>
    )
  );
};

const MultipleFileUploads = ({ isOpen, closeModal, onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
    }
  };

  const handleFileChange = (e) => {
    Array.from(e.target.files).forEach((image_file) => {
      setSelectedFiles((prev) => [...prev, image_file]);
    });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="modal bg-white p-6 rounded-lg border-black">
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
          <h2 className="text-lg font-semibold mb-2">Upload Files</h2>
          <input type="file" onChange={handleFileChange} multiple />
          <button onClick={handleUpload} className="btn-primary">
            Upload
          </button>
        </div>
        <button onClick={closeModal} className="modal-close" />
      </div>
    )
  );
};

const ImageShowModal = ({ isOpen, closeModal, Images }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="modal">
          <div className="modal-content h-[80vh] w-[80vw]">
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
            <div className="grid grid-cols-2 gap-2">
              {Images.map((l, index) => (
                <img key={index} src={`${END_POINT}/prescription/get/image/${l}`} className="modal-image" alt={`Image ${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export { FileUploadModal, ImageUploadModal, ImageShowModal, MultipleFileUploads };

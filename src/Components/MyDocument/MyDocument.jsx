import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { baseUrl } from '../Config';
import { Navbar2 } from '../Navbar2/Navbar2';
import { Trash2 } from 'lucide-react';


const MyDocument = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleDocumentClick = async (docId, docName) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/documents/${docId}`);
      navigate('/', {
        state: {
          documentContent: response.data.content,
          documentName: docName,
          documentId: docId,
          documentDate : response.data.updatedAt
        }
      });
    } catch (error) {
      console.error('Error fetching document content:', error);
      alert('Error loading document: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await axios.delete(`${baseUrl}/api/documents/${docId}`);
        setDocuments(prevDocs => prevDocs.filter(doc => doc._id !== docId));
        alert('Document deleted successfully.');
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Error deleting document: ' + error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex lg:flex-row lg:gap-48">
      <div className="thumbnails-sidebar lg:min-h-[91vh]">
              <div className='mt-8 '>
                <Navbar2 />
              </div>
              <div className=' hidden lg:flex justify-center lg:w-full lg:mb-3 lg:mt-3 lg:bg-[#E2E8F0]'>
                <hr />
              </div>
            
              <div className='hidden lg:absolute lg:bottom-0 lg:left-2 lg:bg-[#F8FAFC]'>
                <div className='flex  w-52 mb-3 mt-3 bg-[#E2E8F0] '>
                  <hr />
                </div>
                <div className='flex gap-2 items-center '>
                  <img src="./Images/Avatar.svg" alt="" />
                  <div>
                    <p className='font-bold'>Vikash Kumar</p>
                    <p>Member</p>
                  </div>
                </div>
              </div>
            </div>
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <ul className="documents-list">
            {documents.map(doc => (
              <li key={doc._id} className="document-item">
                <button
                  onClick={() => handleDocumentClick(doc._id, doc.name)}
                  className="document-button"
                >
                  {doc.name || 'Untitled Document'}
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="document-button delete-button"
                >
                  <Trash2 />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyDocument;

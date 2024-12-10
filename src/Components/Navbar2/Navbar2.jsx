import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

export const Navbar2 = ({ onNavigate }) => {
  const location = useLocation(); 

  const handleLinkClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
      console.log('clicked')
    }
  };

  return (
    <nav className="bg-white">
      <div>
        <div className='flex lg:flex-col gap-3 p-2'>
          <div 
            style={{border: '1px solid #CBD5E1', fontSize : '12px' }}   
            className={`text-sm font-medium cursor-pointer flex items-center gap-2 p-2 lg:p-3 rounded-md outline-none w-full ${location.pathname === '/' ? 'bg-blue-600 ' : 'text-gray-500'}`}
          >
            <img  
              src='./Images/general_document_icon.svg' 
              className={`${location.pathname === '/' ? 'hidden' : 'block'}`} 
              alt='general_document_icon'
            />
            <img  
              src='./Images/general_document_active.svg' 
              className={`${location.pathname === '/' ? 'block' : 'hidden'}`} 
              alt='general_document_active'
            />
            
            <Link 
              to="/" 
              onClick={(e) => {
               if(location.pathname === '/'){
                e.preventDefault();
                handleLinkClick('/');
               }
              }}
              className={` ${location.pathname === '/' ? 'text-white' : 'text-gray-500'}`}
            >
              NEW DOCUMENT
            </Link>
          </div>
          
          <div 
            style={{border: '1px solid #CBD5E1', fontSize : '12px'}}  
            className={`text-sm font-medium cursor-pointer flex gap-2 p-3 items-center rounded-md outline-none w-full ${location.pathname === '/my-documents' ? 'bg-blue-600' : 'text-gray-500'}`}
          >
            <img  
              src='./Images/my_document_icon.svg' 
              className={`${location.pathname === '/my-documents' ? 'hidden' : 'block'}`} 
              alt='my_document_icon'
            />
            <img  
              src='./Images/my_document_active.svg' 
              className={`${location.pathname === '/my-documents' ? 'block' : 'hidden'}`} 
              alt='my_document_active'
            />
            <Link 
              to="/my-documents" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/my-documents');
              }}
              className={` ${location.pathname === '/my-documents' ? 'text-white' : 'text-gray-500'}`}
            >
              MY DOCUMENTS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
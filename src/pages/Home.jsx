import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'
import HeroSection from '../HeroSection/HeroSection';
import UploadDocs from '../UploadDocs/UploadDocs';
import Select from './Select';
import ShowPriceAndPay from './ShowPriceAndPay';

import Contact from './Contact';
import CopiesContext from '../CopiesContext';

function Home() {
  const [count, setCount] = useState(0);
  const [copies, setCopies] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [uploadedFileId, setUploadedFileId] = useState("");

  const handleUpload = (data) => {
    setUploadedFileId(data.fileId);
    setCount(data.pages);
    setCopies(data.copies);
  };

  return (
    <>
      <Navbar />
      <HeroSection />

      <CopiesContext.Provider value={{ copies, setCopies }}>
        <UploadDocs onUpload={handleUpload} />
        <Select
          setSelectedValue={setSelectedValue}
          setSelectedValue2={setSelectedValue2}
        />
        <ShowPriceAndPay
          selectedValue={selectedValue}
          selectedValue2={selectedValue2}
          count={count}
          copies={copies}
          uploadedFileId={uploadedFileId}
        />
      </CopiesContext.Provider>

      
      <Contact />
    </>
  );
}

export default Home;

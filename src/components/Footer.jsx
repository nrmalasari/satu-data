import React from "react";

const Footer = () => {
  return (
    <footer className="mt-[122px] bg-[#4164aa] text-white p-10">
      <div className="max-w-[1463px] mx-auto">
        <h3 className="text-[24px] font-extrabold mb-6">
          Dinas Komunikasi dan Informatika Kota Parepare
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="mr-3">📍</span>
            <p className="text-[20px] font-medium max-w-[375px]">
              Jl. Panorama Timur No.3, Ujung Bulu, Kec. Ujung, Kota Parepare,
              Sulawesi Selatan 91111
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="mr-3">📞</span>
            <a href="tel:042121512" className="text-[20px] font-medium underline">
              (0421) 21512
            </a>
          </div>
          
          <div className="flex items-center">
            <span className="mr-3">✉️</span>
            <a href="mailto:setdako@pareparekota.go.id" className="text-[20px] font-medium">
              setdako@pareparekota.go.id
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
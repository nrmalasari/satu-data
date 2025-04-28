import React from "react";
import axios from 'axios';

const Footer = () => {
  return (
    <footer className="mt-[122px] bg-gradient-to-b from-[#4164aa] to-[#2a4a7e] text-white pt-16 pb-10 px-6 md:px-10">
      <div className="max-w-[1463px] mx-auto">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl md:text-[32px] font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              Dinas Komunikasi dan Informatika <br /> Kota Parepare
            </h3>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/10 p-3 rounded-lg mr-4">
                <i className="ri-map-pin-2-fill text-blue-200 text-xl"></i>
              </div>
              <p className="text-lg font-medium max-w-[400px] leading-relaxed">
                Jl. Panorama Timur No.3, Ujung Bulu, Kec. Ujung, <br />
                Kota Parepare, Sulawesi Selatan 91111
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-white/10 p-3 rounded-lg mr-4">
                <i className="ri-phone-fill text-blue-200 text-xl"></i>
              </div>
              <a href="tel:042121512" className="text-lg font-medium hover:text-blue-200 transition-colors">
                (0421) 21512
              </a>
            </div>
            
            <div className="flex items-center">
              <div className="bg-white/10 p-3 rounded-lg mr-4">
                <i className="ri-mail-fill text-blue-200 text-xl"></i>
              </div>
              <a href="mailto:setdako@pareparekota.go.id" className="text-lg font-medium hover:text-blue-200 transition-colors">
                setdako@pareparekota.go.id
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 mb-4 md:mb-0">
            © {new Date().getFullYear()} Dinas Komunikasi dan Informatika Kota Parepare. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
      
      {/* Floating decoration elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-20">
        <div className="absolute -bottom-10 -left-20 w-40 h-40 bg-white/5 rounded-full filter blur-xl"></div>
        <div className="absolute -bottom-20 right-0 w-60 h-60 bg-white/5 rounded-full filter blur-xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
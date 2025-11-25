import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-start w-full h-[90px] min-[1080px]:h-[120px]">
      {/* Left Section */}
      <div className="flex px-4 min-[1080px]:px-[39px] py-2.5 min-[1080px]:py-5 w-full h-full bg-[#D8D8D8]">
        <div className="flex flex-col gap-0 justify-start items-start">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/opensaunas/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-reddit font-medium text-[16px] min-[1080px]:text-[30px] leading-[1.61] tracking-[-0.03em] text-black min-[1080px]:-mb-3 w-fit"
          >
            <span className="inline-block border-b-2 border-black leading-none">Insta</span>
            <span className="inline-block leading-none">g</span>
            <span className="inline-block border-b-2 border-black leading-none">ram</span>
          </a>
          <div
            className="
            flex flex-row
            gap-[17px]
            font-reddit font-medium text-[16px] min-[1080px]:text-[30px] leading-[1.61] tracking-[-0.03em] text-black"
          >
            <p>Contact</p>
            <p className="hidden min-[1080px]:block">opensaunas@gmail.com</p>
          </div>
          <p className="font-reddit font-medium text-[16px] leading-[1.61] tracking-[-0.03em] text-black block min-[1080px]:hidden">
            opensaunas@gmail.com
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex justify-start items-end px-4 min-[1080px]:px-5 py-2.5 min-[1080px]:py-5 bg-[#000000] h-full w-40 min-[1080px]:w-[380px]">
        <p className="font-reddit font-normal text-[12px] min-[1080px]:text-[14px] text-[#9E9E9E] leading-[1.10] tracking-[-0.02em]">
          Copyright ⓒ 2025 Opensaunas All rights reserved
        </p>
      </div>
    </footer>
  );
};
export default Footer;

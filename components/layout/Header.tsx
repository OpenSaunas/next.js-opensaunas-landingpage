import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-4 min-[1080px]:px-10 h-[52px] min-[1080px]:h-[60px] bg-[#F3EFEA]">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Open Saunas Logo"
          width={62}
          height={52}
          className="min-[1080px]:w-[72px] min-[1080px]:h-[60px]"
        />
      </div>

      {/* Text */}
      <div className="font-reddit font-medium text-[14px]">Rest, Locally</div>
    </header>
  );
};

export default Header;

import Image from 'next/image';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center gap-2 text-xl font-semibold">
    <Image
      src="/assets/images/GDG LOGO.png"
      alt="GDG Logo"
      width={45}
      height={28}
 
    />
    {!props.isTextHidden && (
      <span className="font-bold">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">D</span>
        <span className="text-[#FBBC04]">G</span>
        <span className="text-[#34A853]"> Hub</span>
      </span>
    )}
  </div>
);

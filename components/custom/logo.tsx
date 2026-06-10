import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Image
      src="/blocks/imli-logo.svg"
      alt="IMILI logo"
      width={360}
      height={286}
      priority
      className="h-auto w-56 "
    />
  );
};

export default Logo;

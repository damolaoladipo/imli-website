import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <>
      <Image
        src="/new/asure-us-logo.svg"
        alt="logo"
        width={360}
        height={150}
        style={{ width: '200px', height: 'auto' }}
        className="dark:hidden"
      />
      <Image
        src="/new/asure-us-logo.svg"
        alt="logo"
        width={360}
        height={150}
        style={{ width: '200px', height: 'auto' }}
        className="dark:block hidden"
      />
    </>
  );
};

export default Logo;

import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="flex flex-row justify-between navbar bg-purple-brand">
      <div className="ml-4 md:ml-24">
        <Image src="/logo.png" height={128} width={128} alt="Logo" />
      </div>
      <div className="w-10 rounded-full mr-4">
        <Image src="/avatar.png" height={48} width={48} alt="Avatar" />
      </div>
    </div>
  );
};

import Image from "next/image";

const logos = ["/1.png", "/2.png", "/3.png", "/4.png"];

export const Footer = () => {
  return (
    <footer className="footer h-[50%]  p-10 bg-[url('/footer.svg')] text-primary-content">
      <aside className="flex flex-col gap-5 mt-24 md:ml-8">
        <h1 className="text-2xl font-bold">
          We are coding the world of tomorrow_
        </h1>
        <p className="max-w-5xl">
          DaCodes es una de las mejores empresas de desarrollo de software en
          México y LATAM. Lo que nos separa de los demás es el nivel de
          involucramiento que tenemos en nuestros proyectos y la pasión que
          tenemos por desarrollar productos digitales de calidad mundial. Somos
          un equipo de 220+ dacoders especializados en la planeación, diseño,
          desarrollo, implementación e innovación continua de productos
          digitales disruptivos.
        </p>
        <div className="flex flex-row gap-2">
          {logos.map((logo, index) => (
            <Image
              src={logo}
              height={48}
              width={64}
              sizes="100vw"
              style={{
                width: "auto",
                height: "auto",
              }}
              key={index}
              alt={logo}
            />
          ))}
        </div>
      </aside>
    </footer>
  );
};

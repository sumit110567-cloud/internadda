import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
}

export function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#0A2647] to-[#144272] overflow-hidden py-16 md:py-24">
      {/* Background decoration matching the main landing page style */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light">
              {subtitle}
            </p>
          </div>
          
          {/* Desktop height adjusted from h-96 to h-[320px] for a balanced look */}
          <div className="relative h-64 md:h-80 lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

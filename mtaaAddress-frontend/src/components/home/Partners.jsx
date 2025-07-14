const partners = [
  { name: "MapLibre", logo: "/logos/maplibre.png", url: "https://maplibre.org" },
  { name: "Stadia Maps", logo: "/logos/stadia-maps.png", url: "https://stadia.com/maps" },
  { name: "what3words", logo: "/logos/what3words.png", url: "https://what3words.com" },
  // Add more as needed
];

export default function Partners() {
  return (
    <section className="snap-start py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-8">Powered by</h3>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map(({ name, logo, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${name} website`}
              title={name}
              className="opacity-60 hover:opacity-100 hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <img
                src={logo}
                alt={`${name} logo`}
                className="h-12 mx-auto filter grayscale hover:filter-none transition duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

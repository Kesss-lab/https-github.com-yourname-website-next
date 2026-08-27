export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#08080A]/80" />
    </div>
  );
}

import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { GALLERY_IMAGES } from "@/lib/content";

export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 max-w-7xl mx-auto px-8 py-16 w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-10">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((image) => (
            <figure
              key={image.src}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            >
              <div className="relative w-full aspect-square">
                <Image src={image.src} alt={image.alt} fill className="object-contain" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-neutral-400">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

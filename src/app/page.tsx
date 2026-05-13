import { readdirSync } from "fs";
import { join } from "path";
import models from "@/data/models.json";
import { HeroCarousel } from "@/components/hero-carousel";
import { SocialLinks } from "@/components/social-links";
import { CtaButtons } from "@/components/cta-buttons";

const model = models[0];

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const gradients: Record<string, string> = {
  a: "from-[#3d1f4a] via-[#1a1a2e] to-[#2a1850]",
  b: "from-[#1a3d3d] via-[#1a1a2e] to-[#1a2d50]",
  c: "from-[#3d3a1a] via-[#1a1a2e] to-[#3d1f3d]",
  d: "from-[#1a3d28] via-[#1a1a2e] to-[#3d1a40]",
  e: "from-[#2a1a4a] via-[#1a1a2e] to-[#1a3d38]",
  f: "from-[#3d1a28] via-[#1a1a2e] to-[#1a3d3d]",
  g: "from-[#1a3d28] via-[#1a1a2e] to-[#1a2850]",
  h: "from-[#3d2a1a] via-[#1a1a2e] to-[#1a3d40]",
  i: "from-[#1a283d] via-[#1a1a2e] to-[#3d1a38]",
  j: "from-[#3d1a1a] via-[#1a1a2e] to-[#1a3d50]",
  k: "from-[#1a3d30] via-[#1a1a2e] to-[#3d1a3d]",
  l: "from-[#1a3d28] via-[#1a1a2e] to-[#1a2850]",
  m: "from-[#3d1a38] via-[#1a1a2e] to-[#1a3d30]",
  n: "from-[#1a3d3d] via-[#1a1a2e] to-[#3d1a28]",
  o: "from-[#281a3d] via-[#1a1a2e] to-[#1a3d40]",
  p: "from-[#3d281a] via-[#1a1a2e] to-[#1a303d]",
  q: "from-[#1a3d28] via-[#1a1a2e] to-[#3d1a40]",
  r: "from-[#3d1a30] via-[#1a1a2e] to-[#1a3d3d]",
  s: "from-[#1a303d] via-[#1a1a2e] to-[#3d1a28]",
  t: "from-[#3d3a1a] via-[#1a1a2e] to-[#1a283d]",
  u: "from-[#1a3d38] via-[#1a1a2e] to-[#3d1a30]",
  v: "from-[#301a3d] via-[#1a1a2e] to-[#1a3d28]",
  w: "from-[#1a3d1a] via-[#1a1a2e] to-[#3d1a3d]",
  x: "from-[#3d1a40] via-[#1a1a2e] to-[#1a3d28]",
  y: "from-[#1a383d] via-[#1a1a2e] to-[#3d2a1a]",
  z: "from-[#3d1a28] via-[#1a1a2e] to-[#1a3d38]",
};

function getModelPhotos(): string[] {
  try {
    const dir = join(process.cwd(), "public", "models", model.username);
    return readdirSync(dir)
      .filter((f) => SUPPORTED.has(f.slice(f.lastIndexOf(".")).toLowerCase()))
      .map((f) => `/models/${model.username}/${f}`);
  } catch {
    return [];
  }
}

export const metadata = {
  title: model.name,
  description: model.description,
};

export default function ModelPage() {
  const gradient = gradients[model.username.charAt(0).toLowerCase()] ?? gradients["a"];
  const photos = getModelPhotos();

  return (
    <main
      className={`flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br ${gradient} text-white min-h-screen`}
    >
      <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-center mb-2">
        {model.name}
      </h1>
      <p className="text-white/50 text-sm sm:text-base text-center mb-10 max-w-xs">
        {model.tagline}
      </p>

      <HeroCarousel photos={photos} name={model.name} />

      <h2 className="font-heading text-xl sm:text-2xl font-semibold text-center mt-10 mb-2">
        {model.heading}
      </h2>
      <p className="text-white/60 text-sm sm:text-base text-center max-w-sm leading-relaxed">
        {model.description}
      </p>

      <CtaButtons onlyfans={model.onlyfans} chatterbot={model.chatterbot} />

      <div className="mt-8">
        <SocialLinks socials={model.socials as Record<string, string>} />
      </div>
    </main>
  );
}

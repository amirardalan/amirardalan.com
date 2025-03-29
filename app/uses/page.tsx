'use client';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import UsesItemCard from '@/components/content/UsesItemCard';
import UsesItemGrid from '@/components/content/UsesItemGrid';

export default function Uses() {
  const computers = [
    {
      title: '14" M3 MacBook Pro',
      specs: [
        { label: 'Specs', value: 'Silver' },
        { value: 'M3 Pro' },
        { value: '12-core' },
        { value: 'CPU 18-core GPU' },
        { value: '36GB RAM' },
        { value: '1TB SSD' },
      ],
    },
    {
      title: 'Desktop',
      specs: [
        { label: 'Specs', value: 'Intel i7-14700KF 5.6GHz' },
        { value: 'Deepcool LT720 AIO' },
        { value: 'MSI PRO Z790-A MAX Wifi' },
        { value: 'Gigabyte RTX 4090 AERO OC 24GB' },
        { value: 'Corsair Vengeance DDR5-6400 CL32 64GB' },
        { value: 'Corsair RM1000x SHIFT 1000W' },
        { value: 'WD Black SN850X 4TB NVME' },
        { value: 'NZXT H7 Flow' },
        { value: 'ARCTIC P14 PST 72.8 CFM 140mm' },
      ],
    },
  ];

  const peripherals = [
    {
      title: 'Peripherals',
      specs: [
        { value: 'Alienware AW3423DW 34.2" 175Hz' },
        { value: 'Logitech G 502X Lightspeed' },
        { value: 'Keychron K2 HE' },
      ],
    },
  ];

  const audio = [
    {
      title: 'Interface & Monitors',
      specs: [{ value: 'MOTU Audio Express' }, { value: 'KRK VXT8' }],
    },
    {
      title: 'Headphones',
      specs: [
        { value: 'Beyerdynamic DT770Pro' },
        { value: 'Sennheiser HD25-1 II' },
        { value: 'Apple AirPods Pro (Gen 2)' },
      ],
    },
    {
      title: 'MIDI Controllers',
      specs: [{ value: 'Korg nanoKONTROL 1' }, { value: 'Korg nanoPAD 1' }],
    },
  ];

  const tools = [
    {
      title: 'IDE',
      subtitle: 'VS Code / Zen',
      specs: [
        { label: 'VS Code Extensions' },
        { value: 'GitHub Copilot' },
        { value: 'GitHub Copilot' },
        { value: 'Jetbrains Rider Dark Theme Improved' },
        { value: 'Material Icon Theme' },
        { value: 'Tailwind CSS IntelliSense' },
        { value: 'Color Picker Universal' },
        { value: 'Prisma' },
        { value: 'ESLint' },
        { value: 'GitLens' },
        { value: 'Prettier' },
      ],
    },
    {
      title: 'Web Browser',
      subtitle: 'Brave',
      specs: [
        { label: 'Chrome Extensions', value: 'React Developer Tools' },
        { value: 'uBlock Origin' },
        { value: 'Stylebot' },
      ],
    },
    {
      title: 'Testing',
      subtitle: 'Web / iOS',
      specs: [
        { label: 'React/JS', value: 'Jest' },
        { value: 'React Testing Library' },
        { label: 'iOS/Safari', value: 'Xcode Simulator' },
      ],
    },
  ];

  const stack = [
    {
      title: 'Web Dev',
      specs: [
        { value: 'Next.js' },
        { value: 'TypeScript' },
        { value: 'Emotion' },
        { value: 'Tailwind CSS' },
        { value: 'PostgreSQL' },
        { value: 'Supabase' },
        { value: 'Prisma' },
        { value: 'SWR' },
        { value: 'React-Markdown' },
        { value: 'React Syntax Highlighter' },
        { value: 'React Testing Library' },
        { value: 'Vercel' },
        { value: 'Cloudinary' },
      ],
    },
    {
      title: 'Shell',
      specs: [
        { value: 'macOS: Ghostty' },
        { value: 'Win: Powershell 7' },
        { value: 'Powerlevel10k' },
        { label: 'CLI', value: 'GitHub CLI' },
        { value: 'Vercel CLI' },
        { value: 'Supabase CLI' },
      ],
    },
    {
      title: 'AI',
      specs: [{ value: 'GitHub Copilot' }, { value: 'xAI Grok' }],
    },
  ];

  const software = [
    {
      title: 'Writing',
      subtitle: 'iA Writer',
    },
    {
      title: 'Notes',
      subtitle: 'Obsidian',
    },
    {
      title: 'Design / Photo',
      specs: [
        { value: 'Figma' },
        { value: 'Adobe Lightroom' },
        { value: 'Aseprite' },
        { value: 'Excalidraw' },
      ],
    },
    {
      title: 'Music Production',
      subtitle: 'Ableton Live 12',
      specs: [
        { label: 'VSTs', value: 'Synapse Audio Dune 3' },
        { value: 'Serum by Xfer Records' },
        { value: 'Waves API 2500' },
        { value: 'Waves C1 Compressor' },
        { value: 'Waves H-Delay' },
        { value: 'Waves L2 Ultramaximizer' },
        { value: 'Waves Renaissance Bass' },
        { value: 'Waves TrueVerb' },
        { value: 'FabFilter Pro-Q 2' },
        { value: 'Valhalla Super Massive' },
        { value: 'Valhalla VintageVerb' },
        { value: 'Sonic Academy Kick 2' },
      ],
    },
    {
      title: 'Listening',
      specs: [{ value: 'Apple Music' }, { value: 'Apple Podcasts' }],
    },
  ];

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Uses'} />

        <section className="mb-12">
          <h2 className="mb-4 text-xl uppercase text-dark dark:text-light">
            Computers
          </h2>
          <UsesItemGrid columns={2}>
            {computers.map((computer, index) => (
              <UsesItemCard
                key={index}
                title={computer.title}
                specs={computer.specs}
              />
            ))}
          </UsesItemGrid>

          <UsesItemGrid columns={2}>
            {peripherals.map((item, index) => (
              <UsesItemCard
                key={`periph-${index}`}
                title={item.title}
                specs={item.specs}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl uppercase text-dark dark:text-light">
            Audio
          </h2>
          <UsesItemGrid columns={2}>
            {audio.map((item, index) => (
              <UsesItemCard
                key={`audio-${index}`}
                title={item.title}
                specs={item.specs}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl uppercase text-dark dark:text-light">
            Tools
          </h2>
          <UsesItemGrid columns={2}>
            {tools.map((item, index) => (
              <UsesItemCard
                key={`tools-${index}`}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl uppercase text-dark dark:text-light">
            Stack
          </h2>
          <UsesItemGrid columns={2}>
            {stack.map((item, index) => (
              <UsesItemCard
                key={`stack-${index}`}
                title={item.title}
                specs={item.specs}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl uppercase text-dark dark:text-light">
            Software
          </h2>
          <UsesItemGrid columns={2}>
            {software.map((item, index) => (
              <UsesItemCard
                key={`software-${index}`}
                title={item.title}
                subtitle={item.subtitle}
                specs={item.specs}
              />
            ))}
          </UsesItemGrid>
        </section>
      </div>
    </Container>
  );
}

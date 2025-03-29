'use client';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import UsesItemCard from '@/components/content/UsesItemCard';
import UsesItemGrid from '@/components/content/UsesItemGrid';

export default function Uses() {
  const computers = [
    {
      title: 'Laptop',
      items: [
        { value: '14" MacBook Pro' },
        { value: 'Silver' },
        { value: 'M3 Pro' },
        { value: '12-core CPU' },
        { value: '18-core GPU' },
        { value: '36GB RAM' },
        { value: '1TB SSD' },
        { value: 'tomtoc 14" Sleeve' },
      ],
    },
    {
      title: 'Desktop',
      items: [
        { value: 'Intel i7-14700KF 5.6GHz' },
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
      title: 'PC',
      items: [
        { value: 'Alienware AW3423DW 34.2" 175Hz' },
        { value: 'Logitech G 502X Lightspeed' },
        { value: 'Keychron K2 HE' },
      ],
    },
    {
      title: 'Headphones',
      items: [
        { value: 'Beyerdynamic DT770Pro' },
        { value: 'Sennheiser HD25-1 II' },
        { value: 'Apple AirPods Pro (Gen 2)' },
      ],
    },
    {
      title: 'Interface & Monitors',
      items: [{ value: 'MOTU Audio Express' }, { value: 'KRK VXT8' }],
    },
    {
      title: 'MIDI Controllers',
      items: [{ value: 'Korg nanoKONTROL 1' }, { value: 'Korg nanoPAD 1' }],
    },
  ];

  const software = [
    {
      title: 'Writing',
      items: [{ value: 'iaWriter' }],
    },
    {
      title: 'Notes',
      items: [{ value: 'Obsidian' }],
    },
    {
      title: 'Code',
      items: [{ value: 'VS Code' }, { value: 'Zed' }],
    },
    {
      title: 'Design',
      items: [{ value: 'Figma' }, { value: 'Aseprite' }],
    },
    {
      title: 'Music',
      items: [{ value: 'Ableton Live 12' }],
    },
    {
      title: 'Listening',
      items: [{ value: 'Apple Music' }, { value: 'Apple Podcasts' }],
    },
  ];

  const stack = [
    {
      title: 'Web',
      items: [
        { value: 'TypeScript' },
        { value: 'Next.js' },
        { value: 'Tailwind' },
        { value: 'Postgres' },
        { value: 'Supabase' },
        { value: 'Drizzle' },
        { value: 'MDX' },
      ],
    },
    {
      title: 'Shell',
      items: [
        { value: 'Ghostty' },
        { value: 'Powerlevel10k' },
        { label: 'CLI', value: 'GitHub CLI' },
        { value: 'Vercel CLI' },
        { value: 'Supabase CLI' },
        { value: 'GitHub Copilot' },
        { value: 'xAI Grok' },
      ],
    },
  ];

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Uses'} />

        <div className="mb-10 max-w-7xl font-serif text-3xl leading-relaxed">
          <p className="mb-6 text-dark dark:text-light">
            Things I use to make things...
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-8 border-b-2 border-primary pb-4 text-xl uppercase text-dark dark:text-light">
            Computers
          </h2>
          <UsesItemGrid columns={2}>
            {computers.map((item, index) => (
              <UsesItemCard key={index} title={item.title} items={item.items} />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 border-b-2 border-primary pb-4 text-xl uppercase text-dark dark:text-light">
            Peripherals
          </h2>
          <UsesItemGrid columns={2}>
            {peripherals.map((item, index) => (
              <UsesItemCard
                key={`periph-${index}`}
                title={item.title}
                items={item.items}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 border-b-2 border-primary pb-4 text-xl uppercase text-dark dark:text-light">
            Software
          </h2>
          <UsesItemGrid columns={2}>
            {software.map((item, index) => (
              <UsesItemCard
                key={`software-${index}`}
                title={item.title}
                items={item.items}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 border-b-2 border-primary pb-4 text-xl uppercase text-dark dark:text-light">
            Stack
          </h2>
          <UsesItemGrid columns={2}>
            {stack.map((item, index) => (
              <UsesItemCard
                key={`stack-${index}`}
                title={item.title}
                items={item.items}
              />
            ))}
          </UsesItemGrid>
        </section>
      </div>
    </Container>
  );
}

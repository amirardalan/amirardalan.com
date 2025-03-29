'use client';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import ItemCard from '@/components/content/UsesItemCard';
import ItemGrid from '@/components/content/UsesItemGrid';

export default function Uses() {
  const computers = [
    {
      title: 'Laptop',
      subtitle: '14" M3 MacBook Pro',
      specs: [
        { label: 'Specs', value: 'Silver' },
        { value: 'M3 Pro' },
        { value: '12-core' },
        { value: 'CPU 18-core GPU' },
        { value: '36GB RAM' },
        { value: '1TB SSD' },
      ],
    },
  ];

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Uses'} />

        <h2 className="mb-2 text-xl uppercase text-dark dark:text-light">
          Computers
        </h2>

        <ItemGrid columns={2}>
          {computers.map((computer, index) => (
            <ItemCard
              key={index}
              title={computer.title}
              subtitle={computer.subtitle}
              specs={computer.specs}
            />
          ))}
        </ItemGrid>

        {/* You can add more sections here */}
      </div>
    </Container>
  );
}

import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CTABanner } from './CTABanner';
import { Section } from './Section';

export const CTA = () => {
  return (
    <Section>
      <CTABanner
        title="Ready to Submit Your Project?"
        description="Join GDG Fall Hackathon 2025 and showcase your innovative ideas. Get started today and compete for amazing prizes!"
        buttons={(
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href="/sign-up"
          >
            <RocketIcon className="mr-2 size-5" />
            Get Started Now
          </Link>
        )}
      />
    </Section>
  );
};

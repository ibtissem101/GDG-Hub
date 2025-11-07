import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { badgeVariants } from '@/components/ui/badgeVariants';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { AppConfig } from '@/utils/AppConfig';

import { CenteredHero } from './CenteredHero';
import { Section } from './Section';

export const Hero = () => {
  return (
    <Section className="py-36">
      <CenteredHero
        banner={(
          <div className={badgeVariants({ className: 'bg-[#1e1e1e] text-white border-none' })}>
            <RocketIcon className="mr-1 size-5" />
            {' '}
            {AppConfig.currentHackathonName}
          </div>
        )}
        title={(
          <>
            Streamline Your
            {' '}
            <span className="bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00] bg-clip-text text-transparent">
              Hackathon Submissions
            </span>
            {' '}
            and Evaluations
          </>
        )}
        description="A comprehensive platform for hackathon project submissions, team management, judge evaluations, and project archiving. Built specifically for GDG clubs and tech communities."
        buttons={(
          <>
            <Link
              className={buttonVariants({ size: 'lg', className: 'bg-[#1e1e1e] text-white hover:bg-black' })}
              href="/sign-up"
            >
              Submit Your Project
            </Link>

            <Link
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="#features"
            >
              Learn More
            </Link>
          </>
        )}
      />
    </Section>
  );
};

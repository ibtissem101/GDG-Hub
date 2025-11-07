import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttonVariants';

import { CenteredMenu } from './CenteredMenu';
import { Logo } from './Logo';
import { Section } from './Section';

export const Navbar = () => {
  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li>
              <Link className={buttonVariants()} href="/dashboard">
                Go to Dashboard
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="#features">Features</Link>
        </li>

        <li>
          <Link href="/archive">Projects</Link>
        </li>

        <li>
          <Link href="/leaderboard">Leaderboard</Link>
        </li>

        <li>
          <Link href="https://developers.google.com/community/gdg" target="_blank" rel="noopener noreferrer">About GDG</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};

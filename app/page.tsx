'use client';

import AppShell from '@/components/AppShell';
import HomePage from '@/components/pages/HomePage';
import { useNavigation } from '@/lib/navigation';

export default function Home() {
  const { navigateTo } = useNavigation();
  return (
    <AppShell>
      <HomePage navigateTo={navigateTo} />
    </AppShell>
  );
}

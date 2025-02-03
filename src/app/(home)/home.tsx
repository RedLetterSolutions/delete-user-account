import { copilotApi } from 'copilot-node-sdk';

import { Welcome } from '@/app/(home)/welcome';
import { TokenGate } from '@/components/TokenGate';
import { Container } from '@/components/Container';
import DeleteUserButton from '@/components/DeleteUserButton';

/**
 * The revalidate property determine's the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const { token } = searchParams;
  const copilot = copilotApi({
    apiKey: process.env.COPILOT_API_KEY ?? '',
    token: typeof token === 'string' ? token : undefined,
  });
  const workspace = await copilot.retrieveWorkspace();
  const session = await copilot.getTokenPayload?.();
  console.log({ workspace, session });
  return (
    <Container>
    <h1 className="text-2xl font-bold mb-4">Delete Your Account</h1>
    <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
    <DeleteUserButton apiKey={process.env.COPILOT_API_KEY ?? ''} clientId={session?.clientId ?? ''} />
  </Container>
  );
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
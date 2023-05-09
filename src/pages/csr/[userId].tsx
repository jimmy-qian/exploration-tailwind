import * as i from 'types';

import { useGetUser } from 'queries/example';
import { useRouter } from 'src/services/hooks';
import PrimeLayout from 'layouts/PrimeLayout';

/**
 * CSR (client-side rendering) renders the page on the client (the browser)
 * https://www.patterns.dev/posts/client-side-rendering/
 */
const Page: i.NextPageComponent = () => {
  const { query } = useRouter<Queries>();
  const { data: user, isLoading } = useGetUser(query.userId);

  return (
    <>
      <p>This page is to show how to use Client Side Rendering (CSR).</p>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          data: <pre>{JSON.stringify(user, null, 2)}</pre>
          query: <pre>{JSON.stringify(query)}</pre>
        </>
      )}
    </>
  );
};

type Queries = {
  userId: string;
};

export default Page;

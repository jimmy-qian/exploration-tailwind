import * as i from 'types';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { useRouter } from 'hooks';
import PrimeLayout from 'layouts/PrimeLayout';

/**
 * iSSG (incremental static site generation) is a mix of SSG and SSR
 * You can specify the known paths during build-time, and any new paths will be built on the server
 * and live as static paths from there on
 *
 * https://www.patterns.dev/posts/incremental-static-rendering/
 */
const Page: i.NextPageComponent<Props> = ({ params }) => {
  const router = useRouter<Queries>();

  return (
    <>
      <p>This page is to show how to use Incremental Static Site Generation iSSG.</p>
      {/* Show a loader while the page is being built and rendered */}
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <div>
          params: <pre>{JSON.stringify(params)}</pre>
        </div>
      )}
    </>
  );
};

Page.layout = (page) => {
  return <PrimeLayout>{page}</PrimeLayout>;
};

/**
 * Generate all the (known) static paths for this route during build-time
 */
export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // If a path is loaded that is not /1 or /2 (i.e. /3) then it will be built run-time
    // and from there on it will be a static page like /1 and /2
    fallback: true,
  };
};

/**
 * Get data from the backend during build-time
 */
export const getStaticProps = async (ctx: GetStaticPropsContext<Queries>) => {
  return {
    props: {
      params: ctx.params!,
    },
    revalidate: 300, // 5 minutes
  };
};

type Queries = {
  id: string;
};

// We can infer the returned props as a type from the server function
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default Page;

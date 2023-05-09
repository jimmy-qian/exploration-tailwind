import * as i from 'types';

import { Anchor } from 'common';
import PrimeLayout from 'layouts/PrimeLayout';

const Home: i.NextPageComponent = () => {
  return (
    <p>
      Created by <Anchor to="https://labela.nl/"> LabelA</Anchor>
    </p>
  );
};

/**
 * This pattern makes it possible to create layouts which only mount once. Useful for sidebars etc.
 * You should only see a single "Layout mounted!" log in the console.
 * This is a similar pattern to wrapping a layout around routes with react-router
 *
 * The `pageProps` prop contains everything you return from `getServerSideProps` or `getStaticProps`
 * By default, it's typed as `any`. You can change it to a more specific type if you want (e.g. `pageProps: string`)
 */
Home.layout = (page, pageProps) => {
  return <PrimeLayout>{page}</PrimeLayout>;
};

export default Home;

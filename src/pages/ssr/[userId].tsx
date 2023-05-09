import * as i from 'types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

import { fetchUser, useGetUser } from 'queries/example';
import { serverQueryFetch } from 'src/services';

const Page: i.NextPageComponent<Props, Queries> = ({ params }) => {
  const { data: user } = useGetUser(params.userId);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-4">
        <div className="shrink-0">
          <Image
            className="h-12 w-12 rounded"
            src="https://picsum.photos/200"
            width={200}
            height={200}
            alt="ChitChat Logo"
          />
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext<Queries>) => {
  const userId = ctx.params?.userId;

  const { state } = await serverQueryFetch([
    {
      key: ['user', userId],
      fetchFn: () => fetchUser(ctx.params!.userId),
    },
  ]);

  return {
    props: {
      params: ctx.params!,
      // Return dehydrateState to hydrate the data in _app.tsx
      dehydrateState: state,
    },
  };
};

type Queries = {
  userId: string;
};

// We can infer the returned props as a type from the server function
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default Page;

import NextError from 'next/error';
import Head from 'next/head';
import PageHead from '~/components/pageHead';
import { UserWithAvatar } from '~/components/userAvatar';
import BaseLayout from '~/layout/base';

import { api, type RouterOutputs } from '~/utils/api';

// Type definitions
type UserDetailsOutput = RouterOutputs["user"]["getDetailedUserData"];


function UserProfile(props: { userData: UserDetailsOutput }) {
    const { userData } = props;

    return (
        <>
            <Head>
                <title>Summary - Project Management App</title>
                <meta name="description" content="Overview of tasks and members - Project Management App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <div className="flex justify-between align-middle">
                    <PageHead>User Preferences</PageHead>
                    <div>
                        <UserWithAvatar userId={userData?.id || ''} name={userData?.name || ''} disableLink />
                    </div>
                </div>
            </BaseLayout>
        </>

    );
}

const ProfileViewPage = () => {
    const postQuery = api.user.getDetailedUserData.useQuery();

    if (postQuery.error) {
        return (
            <NextError
                title={postQuery.error.message}
                statusCode={postQuery.error.data?.httpStatus ?? 500}
            />
        );
    }

    if (postQuery.status !== 'success') {
        return (
            <div className="flex flex-col justify-center h-full px-8 ">
                <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
                <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

                <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
            </div>
        );
    }
    const { data } = postQuery;
    return <UserProfile userData={data} />;
};

export default ProfileViewPage;
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import UserPreferences from '~/components/userPreference';
import BaseLayout from '~/layout/base';
import { api } from '~/utils/api';

const ProfileEditPage = () => {
    const userId = useRouter().query.userId as string;
    const { data: sessionData } = useSession();

    if(sessionData?.user.id == userId)
        window.location.href = "/profile"
    
    const postQuery = api.user.getUserProfile.useQuery({ userId });

    const { data } = postQuery;

    return <>
        <Head>
            <title>Profile - Project Management App</title>
            <meta name="description" content="Overview of User Profile - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout apiDependency={postQuery}>
            {data && <UserPreferences data={data} />}
        </BaseLayout>
    </>
};

export default ProfileEditPage;
import Head from 'next/head';

import UserPreferences from '~/components/userPreference';
import BaseLayout from '~/layout/base';
import { api } from '~/utils/api';

const ProfileEditPage = () => {
    const postQuery = api.user.getDetailedUserData.useQuery();

    const { data } = postQuery;

    return <>
        <Head>
            <title>Profile Preferences - Project Management App</title>
            <meta name="description" content="Profile Overview and edit - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout apiDependency={postQuery}>
            {data && <UserPreferences data={data} blockEdit={false} />}
        </BaseLayout>
    </>
};

export default ProfileEditPage;
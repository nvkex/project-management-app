import Head from "next/head";
import BaseLayout from "~/layout/base";


export default function Dashboard() {
    return (<>
        <Head>
          <title>Dashboard - Project Management App</title>
          <meta name="description" content="Overview of tasks and members - Project Management App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout>
            Hello
        </BaseLayout>
    </>)
}
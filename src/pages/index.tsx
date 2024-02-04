import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState, type FunctionComponent } from "react";
import Button from "~/components/atomic/button";
import RegisterUser from "~/components/modals/registerUser";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Management App</title>
        <meta name="description" content="Sign in to Project management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-teal-50">
        <div className="container flex flex-col items-center justify-center gap-12 py-10 ">
          <h3 className="text-5xl font-bold tracking-tight text-white sm:text-[3rem]">
            <span className="text-[hsl(280,13.34%,24.04%)]">Project Management App</span>
          </h3>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 lg:gap-1 md:grid-cols-4 xl:grid-cols-5">
            <InfoCard>
              Create <span className="text-teal-500 text-[1.2rem]">Projects</span>
            </InfoCard>
            <InfoCard>
              Create <span className="text-teal-500 text-[1.2rem]">Tasks</span>
            </InfoCard>
            <InfoCard>
              <span className="text-teal-500 text-[1.2rem]">Assign Tasks</span> to members
            </InfoCard>
            <InfoCard>
              Set <span className="text-teal-500 text-[1.2rem]">Priorities</span>
            </InfoCard>
            <InfoCard>
              Chase <span className="text-teal-500 text-[1.2rem]">Deadlines</span>
            </InfoCard>
          </div>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

type Props = {
  children: React.ReactNode;
}

const InfoCard: FunctionComponent<Props> = ({ children }) => {
  return <div className="relative text-center bg-white px-4 py-4 shadow-sm ring-1 ring-gray-900/0 rounded-lg sm:mx-auto sm:max-w-lg sm:max-h-16 sm:px-10 hover:shadow-xl">
    <span className="text-gray-500 font-medium">{children}</span>
  </div>
}

function AuthShowcase() {
  const { data: sessionData } = useSession();
  const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] = useState(false)

  const goToDashboard = () => {
    window.location.href = '/projects'
  }

  const bannerText = sessionData ? `Signed in as ${sessionData.user?.name}` : "Start managing your tasks with just one-click"
  const buttonText = sessionData ? "Manage Projects" : "Sign in"
  const loggedIn = sessionData != null
  const buttonOnClick = loggedIn ? goToDashboard : () => void signIn()

  return (
    <>
      <RegisterUser isOpen={isRegisterUserModalOpen} setIsOpen={setIsRegisterUserModalOpen} />
      <div className="bg-teal-100 w-full text-center py-4 text-[hsl(280,13.34%,24.04%)] text-lg">
        {bannerText}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-4">
          {
            !loggedIn && <Button onClick={() => setIsRegisterUserModalOpen(true)}>Signup</Button>
          }
          <Button onClick={buttonOnClick}>{buttonText}</Button>
        </div>
      </div>
    </>
  );
}

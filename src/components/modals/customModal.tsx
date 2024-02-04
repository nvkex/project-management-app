import { Dialog, Transition } from '@headlessui/react'
import { Fragment, type FunctionComponent } from 'react'

type CustomModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: React.ReactNode | string;
  children: React.ReactNode | string;
}

const CustomModal: FunctionComponent<CustomModalProps> = ({ isOpen, setIsOpen, title, children }) => {
  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Transition for the modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* Overlay background */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          {/* Modal content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="relative flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Modal title */}
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[hsl(280,13.34%,24.04%)]">
                    {title}
                  </Dialog.Title>
                  {/* Modal content */}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomModal;

import { Menu, Transition } from '@headlessui/react'
import { Fragment, type FunctionComponent } from 'react'

type MenuItemType = (active: boolean) => React.ReactNode | string;

type CustomMenuProps = {
  children: React.ReactNode;
  id: string;
  menuItems: MenuItemType[];
};

const CustomMenu: FunctionComponent<CustomMenuProps> = ({ children, menuItems, id }) => {
  return (
    <Fragment>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {/* Menu button */}
          <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-black/30">
            {children}
          </Menu.Button>
        </div>
        {/* Transition for menu items */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* Menu items container */}
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              {/* Render each menu item */}
              {menuItems.map((item, idx: number) => (
                <Menu.Item key={`${id}-menu-item-${idx.toString()}`}>
                  {({ active }) => <Fragment>{item(active)}</Fragment>}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  );
};

export default CustomMenu;

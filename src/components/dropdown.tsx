import { Fragment, FunctionComponent } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export type DropdownOptionsType = {
    label: string,
    value: string,
    [key: string]: any
}

type SingleDropdownProps = {
    id: string,
    options: Array<DropdownOptionsType>,
    onSelect: (data: DropdownOptionsType) => void,
    selected?: DropdownOptionsType | null,
    selectedLabel: (data: DropdownOptionsType | null | undefined) => string | React.ReactNode,
    placeholder?: string,
    multiple?: false
}

type MultiDropdownProps = {
    id: string,
    options: Array<DropdownOptionsType>,
    onSelect: (data: DropdownOptionsType[]) => void,
    selected?: DropdownOptionsType[] | null,
    selectedLabel: (data: DropdownOptionsType | null | undefined) => string | React.ReactNode,
    placeholder?: string,
    multiple?: true
}

type DropdownProps = SingleDropdownProps | MultiDropdownProps

const Dropdown: FunctionComponent<DropdownProps> = ({ id, multiple = false, options, selected, selectedLabel, placeholder = "", onSelect }) => {

    const noOptions = options.length == 0

    const getLabels = () => {
        if (noOptions)
            return <span className='text-gray-400'>No Options Available</span>
        if (!selected || (multiple && selected?.length == 0))
            return placeholder

        const labels = multiple
            ? selected.map((s: DropdownOptionsType) => selectedLabel(s))
            : [selectedLabel(selected as DropdownOptionsType)];
        return labels
    }

    return (
        <div className="relative">
            <Listbox value={selected} onChange={onSelect} multiple={multiple} disabled={noOptions}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full px-4 cursor-default rounded-md bg-gray-50 py-2 pl-3 pr-10 text-[hsl(280,13.34%,24.04%)] text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
                        <span className="block truncate">{getLabels()}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {options.map((option, optionIdx) => (
                                <Listbox.Option
                                    key={`listbox-option-${id}-${optionIdx}`}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {option.label}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Dropdown

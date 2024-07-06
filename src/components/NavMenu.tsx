import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";
import { Affiliate } from "../types";
import BtnSignOff from "./BtnSignOff";

type NavMenuProps={
    firstName: Affiliate['firstName']
    lastName: Affiliate['lastName']
}

export default function NavMenu({firstName,lastName}:NavMenuProps) {

    return (
        <Popover className="relative">
            <Popover.Button
                className={`
                group inline-flex text-white items-center rounded-md bg-transparent px-3 py-2 text-base font-medium hover:text-blue-200 focus:outline-none lg:mr-5`}
            >
                <div className="flex flex-col items-end border-l-2 pl-6 gap-1">
                    <h3 className="font-semibold">Hello, {' '}<span className="font-extrabold">{firstName+' '+lastName}</span></h3>
                    <p className="text-sm font-medium">Affiliate</p>
                </div>
                <ChevronDownIcon
                    className={`ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-white-300/80`}
                    aria-hidden="true"
                />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-1 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-36">
                    <div className="w-full lg:w-56 shrink rounded-lg bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <BtnSignOff queryKey="affiliate"/>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

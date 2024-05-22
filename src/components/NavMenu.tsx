import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";
import { AuthAffiliate } from "../types";
import { useQueryClient } from "@tanstack/react-query";

type NavMenuProps={
    name: AuthAffiliate['name']
}

export default function NavMenu({name}:NavMenuProps) {

    const queryClient = useQueryClient()
    const logout =()=>{
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey:['affiliate']})
    }

    return (
        <Popover className="relative">
            <Popover.Button
                className={`
                group inline-flex text-white items-center rounded-md bg-transparent px-3 py-2 text-base font-medium hover:text-blue-200 focus:outline-none lg:mr-5`}
            >
                <div className="flex flex-col items-end border-l-2 pl-6 gap-1">
                    <h3 className="font-semibold">Hello, {' '}<span className="font-extrabold">{name}</span></h3>
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
                        <button
                            className='block p-2 hover:text-purple-950'
                            type='button'
                        onClick={logout}
                        >
                            <div className="flex gap-4 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                                Sign Off
                            </div>
                        </button>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

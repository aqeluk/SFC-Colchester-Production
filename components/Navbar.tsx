"use client";

import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { GiChicken } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import { MdOutlinePhonelink, MdRestaurantMenu } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
import UserLinks from "./UserLinks";
import { classNames } from "@/utils/utils";
import { TbDiscount } from "react-icons/tb";
import Basket from "./Basket";
import { Button } from "@nextui-org/react";

const about = [
  {
    name: "Southern Fried Chicken",
    description:
      "Learn more about our passion for Southern Fried Chicken and our commitment to quality and taste.",
    href: "/about-sfc",
    icon: GiChicken,
  },
  {
    name: "Halal Food",
    description:
      "Our menu includes Halal options, prepared according to Islamic dietary laws.",
    href: "/about-sfc/halal",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>food-halal</title>
        <path
          d="M7 5V15C7 16.11 6.11 17 5 17H4C3.45 17 3 16.55 3 16V13H1V16C1 17.66 2.34 19 4 19H5C7.21 19 9 17.21 9 15V5M23 13.38L21.77 12.15C21.03 11.41 20.04 11 19 11H17V13H19C19.5 13 20 13.2 20.35 13.56L20.7 13.91L19.5 14.6C19.04 14.86 18.53 15 18 15H17C16.44 15 16 14.56 16 14V6H14V9.81L13.38 9.12C12.7 8.37 11.6 8 10.59 8H10V10H10.59C11.23 10 11.84 10.25 12.29 10.71L14 12.41V14C14 15.12 13.12 16 12 16H10V18H12C13.37 18 14.5 17.3 15.17 16.24C15.63 16.71 16.25 17 17 17H18C18.88 17 19.74 16.77 20.5 16.33L23 14.89Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Jobs At SFC",
    description:
      "Join our team and be part of our growing Southern Fried Chicken family.",
    href: "/about-sfc/jobs",
    icon: UserGroupIcon,
  },
  {
    name: "Contact Us",
    description:
      "Find our contact details or leave us a message through our form",
    href: "/about-sfc/contact-us",
    icon: MdOutlinePhonelink,
  },
];
const mobileLinks = [
  {
    name: "Menu",
    description: "Explore our delicious offerings.",
    href: "/menu",
    icon: MdRestaurantMenu,
  },
  {
    name: "Find Us",
    description: "Locate our nearest outlet.",
    href: "/find-us",
    icon: RiRoadMapFill,
  },
  ...about,
];

export default function Navbar() {
  return (
    <Popover className="relative bg-white" as="nav">
      <div
        className="pointer-events-none absolute inset-0 z-30 shadow"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:justify-start lg:space-x-10 lg:px-8">
          <div className="-my-2 px-2 -mr-2 lg:hidden">
            <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>

          <div className="ml-auto mr-auto px-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/fullSFCLogo.png"
                alt="SFC Logo"
                priority
                loading="eager"
                width={125}
                height={125}
                className="flex-shrink-0 min-w-[75px]"
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
            <PopoverGroup
              as="nav"
              className="hidden md:flex justify-center flex-grow space-x-10"
            >
              <Link
                href="/menu"
                className="text-3xl font-bold text-sfc-blue hover:text-blue-900"
              >
                MENU
              </Link>
              <Link
                href="/find-us"
                className="text-3xl font-bold text-sfc-blue hover:text-blue-900"
              >
                FIND US
              </Link>
              <Popover>
                {({ open }) => (
                  <>
                    <PopoverButton
                      className={classNames(
                        open ? "text-blue-900" : "text-sfc-blue",
                        "group inline-flex items-center rounded-md bg-white text-3xl font-extrabold hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      )}
                    >
                      <span>ABOUT SFC</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-blue-900" : "text-sfc-blue",
                          "ml-2 h-5 w-5 group-hover:text-blue-700"
                        )}
                        aria-hidden="true"
                      />
                    </PopoverButton>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <PopoverPanel className="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg lg:block">
                        {({ close }) => (
                          <div className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                            {about.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-blue-50"
                                onClick={() => close()}
                              >
                                <div className="flex md:h-full lg:flex-col">
                                  <div className="flex-shrink-0">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                                      <item.icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </div>
                                  <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                    <div>
                                      <p className="text-xl font-medium text-sfc-blue">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-sfc-blue">
                                        {item.description}
                                      </p>
                                    </div>
                                    <p className="mt-2 text-lg font-medium text-blue-500 lg:mt-4 transform transition hover:scale-105">
                                      Learn more
                                      <span aria-hidden="true"> &rarr;</span>
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </PopoverPanel>
                    </Transition>
                  </>
                )}
              </Popover>
            </PopoverGroup>
          </div>
          <div className="flex items-center md:ml-12">
            <UserLinks />
            <Link
              href="/cart"
              className="ml-2 md:ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-700 px-2 md:px-4 py-1 md:py-2 font-medium text-white shadow-sm hover:bg-blue-900 md:transform md:transition md:hover:scale-105"
            >
              <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
              <Basket />
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition lg:hidden"
        >
          {({ close }) => (
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div className="-mr-2">
                    <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                  <div>
                    <Link
                      href="/"
                      onClick={() => close()}
                      className="flex items-center"
                    >
                      <Image
                        src="/SFCNoTitle.png"
                        alt="SFC Logo"
                        width={60}
                        height={60}
                        loading="eager"
                        className="flex-shrink-0 h-auto w-auto"
                      />
                    </Link>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      {mobileLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                          onClick={() => close()}
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-xl font-bold text-sfc-blue">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="flex justify-between mb-4 space-x-2">
                  <Button
                    className="flex w-1/2 items-center justify-center rounded-md border border-transparent bg-sfc-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900"
                    href="/sign-in"
                    onClick={() => close()}
                  >
                    Sign In
                  </Button>
                  <div className="w-1/2 text-center bg-blue-200 rounded-md border border-transparent shadow-sm">
                    <p className="text-base font-medium text-gray-500 ">
                      New Customer?
                    </p>
                    <Link
                      href="/sign-up"
                      onClick={() => close()}
                      className="flex items-center justify-center rounded-md border border-transparent bg-sfc-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
                <Link
                  href="/menu"
                  onClick={() => close()}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-sfc-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900"
                >
                  Order From Our Menu Now
                </Link>
              </div>
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

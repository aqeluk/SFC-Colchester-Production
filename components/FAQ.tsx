"use client";

import { classNames } from "@/utils/utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "What are your opening hours?", // Simplified, common phrasing
    answer:
      "We're open from 4pm to 2:30am weekdays and Sundays. On Fridays and Saturdays, we're open until 3:30am for deliveries and collections. Dine-in is available until the early hours on Fridays and Saturdays.",
  },
  {
    question: "Is your food halal?", // More direct
    answer:
      "Yes, all our food is halal except for the spare ribs. We keep this information up-to-date for your reference.",
  },
  {
    question: "Do you have vegetarian options?",
    answer:
      "Yes, we have several vegetarian choices on our menu. Please call us or send a query for a quick response.",
  },
  {
    question: "Do you offer gluten-free options?",
    answer: "Unfortunately, we don't currently offer gluten-free options.", // Clear and direct
  },
  {
    question: "How can I find out about allergens in your food?", // More specific wording
    answer:
      "Allergen information is available on our menu. Please also feel free to call the restaurant before ordering.",
  },
  {
    question: "Can I order online?", // Simpler
    answer: "Yes! You can order online through our improved ordering system.",
  },
  {
    question: "Do you sell alcoholic drinks?", // More conversational
    answer: "Yes, we offer a variety of beers, wines, spirits, and whiskies.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes, we deliver within a 5-mile radius of our restaurant. Orders within 3 miles are completely FREE.",
  },
  {
    question: "Is there a minimum order for delivery?",
    answer: "Yes, there's a £10 minimum order for delivery.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, as well as cash. You can use any of these for online orders, delivery, or collection.",
  },
  {
    question: "Do you have any discounts or promotions?", // More natural phrasing
    answer:
      "Yes, we often have special promotions and discounts. Check our website, social media, or sign up for our newsletter to stay updated.",
  },
  {
    question: "Can I reserve an order for collection?", // More focused on the action
    answer:
      "Yes, you can reserve an order through our website or by calling us directly.",
  },
  {
    question: "How do I find your restaurant?", //  'Find' is more common in the UK
    answer:
      "We're conveniently located in Colchester. Directions are available on our website.",
  },
];

export default function FAQ() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      className="bg-blue-100 rounded-xl border-sfc-blue border-large m-2 md:m-8"
      id="faq"
    >
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-bold tracking-tight text-sfc-blue sm:text-4xl underline">
            Frequently asked questions
          </h2>
          {isClient ? (
            <dl className="mt-6 space-y-6 divide-y-2 divide-sfc-blue">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </DisclosureButton>
                      </dt>
                      <Transition
                        show={open}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <DisclosurePanel as="dd" className="mt-2 pr-12">
                          <p className="text-base text-gray-500">
                            {faq.answer}
                          </p>
                        </DisclosurePanel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          ) : (
            <p className="text-center text-gray-500 mt-4">Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
}

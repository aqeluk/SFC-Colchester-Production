import Link from "next/link";
import {
  SiInstagram,
  SiFacebook,
} from "react-icons/si";

const navigation = {
  menu: [
    { name: "Our Menu", href: "/menu" },
    { name: "Find Us", href: "/find-us" },
    { name: "FAQs", href: "/about-sfc#faq" },
  ],
  aboutSFC: [
    {
      name: "About Southern Fried Chicken",
      href: "/about-sfc",
    },
    {
      name: "Halal Food",
      href: "/about-sfc/halal",
    },
    {
      name: "Jobs At SFC",
      href: "/about-sfc/jobs",
    },
    {
      name: "Contact Us",
      href: "/about-sfc/contact-us",
    },
  ],
  legal: [
    { name: "T&Cs", href: "/terms-conditions" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms-service" },
    { name: "Report Abuse", href: "/report/abuse" },
    { name: "Help/Support", href: "/report/bug" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/p/Southern-Fried-Chicken-Colchester-100063490240975/",
      icon: SiFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/southern.fried.chicken.col/?hl=en-gb",
      icon: SiInstagram,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* The Food Section */}
          <div>
            <h3 className="font-bold text-lg md:text-2xl text-sfc-blue transform transition hover:scale-105">
              The Food
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.menu.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text- md:text-xl text-blue-600 hover:text-blue-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* The Company Section */}
          <div>
            <h3 className="font-bold text-lg md:text-2xl text-sfc-blue transform transition hover:scale-105">
              The Company
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.aboutSFC.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text- md:text-xl text-blue-600 hover:text-blue-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal Section */}
          <div>
            <h3 className="font-bold text-lg md:text-2xl text-sfc-blue transform transition hover:scale-105">
              Legal
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text- md:text-xl text-blue-600 hover:text-blue-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Restaurant Section */}
          <div>
            <h3 className="font-bold text-lg md:text-2xl text-sfc-blue transform transition hover:scale-105">
              Visit Us
            </h3>
            <address className="mt-4 space-y-2 text-base md:text-xl text-gray-600 not-italic">
              <p className="text-blue-600 font-bold">
                Open Everyday 4pm - Late
              </p>
              <p className="text-blue-600">37A St Botolphs Street</p>
              <p className="text-blue-600">Colchester</p>
              <p className="text-blue-600">CO2 7EA</p>
              <p className="text-blue-600 py-4 font-extrabold">
                <Link href="tel:01206 769181">01206 769 181</Link>
                <br/>
                <Link href="tel:01206 762 767">01206 762 767</Link>
              </p>
            </address>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-200 flex items-center justify-between">
          <div className="flex space-x-6 md:order-2 pt-4">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-8 w-8" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 text-center px-8 md:px-0">
            &copy; {new Date().getFullYear()} Southern Fried Chicken Colchester <br className="md:hidden"/> All Rights Reserved - Developed
            by AQEL UK
          </p>
        </div>
      </div>
    </footer>
  );
}

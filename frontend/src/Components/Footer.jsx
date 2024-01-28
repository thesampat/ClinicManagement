import React from 'react';
import { BiLogoFacebook, BiLogoDiscordAlt } from 'react-icons/bi';
import { BsTwitter, BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className=" border-t-2 border-primary-500 bg-primary-400 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg"  className="h-8 mr-3" alt="FlowBite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary-50 ">LOGO</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-primary-500 uppercase ">Resources</h2>
              <ul className="text-secondry-300  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-primary-500 uppercase ">Follow us</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-primary-500 uppercase ">Legal</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-secondry-300 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary-50 ">
              <BiLogoFacebook />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-50 ">
              <BiLogoDiscordAlt />
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-50 ">
              <BsTwitter />
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

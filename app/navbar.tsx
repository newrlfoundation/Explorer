"use client"
import React from 'react'
import Image from 'next/image'
import NewrlLogo from "../public/assets/Newrl_Dark.svg"
import NewrlCoinLogo from "../public/assets/newrl_coin_logo.png"
import Link from 'next/link'

function Navbar() {
    return (
        <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 pt-5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <a href="https://newrl.net/" className="flex items-center">
                    <Image src={NewrlLogo} className="hidden md:block h-6 mr-3 sm:h-9 w-auto" alt="Newrl Logo" />
                    <Image src={NewrlCoinLogo} className="md:hidden h-8 mr-3 w-auto" alt="Newrl Coin Logo" />
                    <kbd className="px-1.5 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">BETA</kbd>
                </a>
                <button id="mega-menu-full-image-button" data-collapse-toggle="mega-menu-full-image" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full-image" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div id="mega-menu-full-image" className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col mt-4 text-sm font-medium md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                        </li>
                        <li>
                            <button id="mega-menu-full-cta-image-button" data-collapse-toggle="mega-menu-full-image-dropdown" className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Blockchain <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="mega-menu-full-image-dropdown" className="hidden z-10 mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600 absolute w-full transition duration-150 ease-in-out origin-top-left">
                <div className="grid py-5 px-4 mx-auto max-w-screen-xl text-sm text-gray-500 dark:text-gray-400 md:grid-cols-2 md:px-6 text-center">
                    <ul className="hidden mb-4 space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
                        <li>
                            <Link href="/transaction" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                View Transactions
                            </Link>
                        </li>
                        <li>
                            <Link href="/block" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                View Blocks
                            </Link>
                        </li>
                    </ul>
                    <ul className="mb-4 space-y-4 md:mb-0">
                        <li>
                            <a href="https://newrl.net/press.html" target={"_blank"} className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                Our Blog
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.newrl.net/" target={"_blank"} className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">Resources</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
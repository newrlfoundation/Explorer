'use client'
import React, { useState } from 'react'

const SearchButton = () => {
    const [searchValue, setSearchValue] = useState<null | any>(null)
    const handleSubmit = (e: any) => {
        e.preventDefault()

        // Swtich route based on Search Value
        if (searchValue.startsWith('0x')) {
            redirect('/wallet/' + searchValue)
        } else if (isNaN(searchValue)) {
            redirect('/transaction/' + searchValue)
        } else {
            redirect('/block/' + searchValue)
        }
    }

    const redirect = (url: string, newtab: boolean = false) => {
        if (newtab) {
            window.open(url)
        } else {
            window.open(url, '_self')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex md:w-1/2 mx-auto py-5">
                <div className="relative w-full">
                    <input type="search" onChange={(e) => { setSearchValue(e.target.value) }} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search by Block / Transaction / Wallet" required />
                    <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"><svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                </div>
            </div>
        </form>
    )
}

export default SearchButton
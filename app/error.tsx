'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import ErrorImg from '../public/assets/error.svg';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <Image alt='error' src={ErrorImg} className="w-1/2 mx-auto" />
            <div className='flex flex-col justify-center items-center p-10'>
                <p>Something went wrong!</p>
                <div className='p-5'>
                    <Link href={"/"}>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            <span className="sr-only">Return to Home</span>
                            Return to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
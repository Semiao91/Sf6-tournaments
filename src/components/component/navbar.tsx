import React from 'react';
import Image from 'next/image';


const Navbar = () => {

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image
                            src="/tourney.png"
                            width={70}
                            height={70}
                            alt="Picture of the author"
                        />
                        <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">SF6 Torneys</span>
                    </a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default"></div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;


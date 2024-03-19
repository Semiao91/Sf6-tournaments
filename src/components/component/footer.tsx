import React from 'react'

const Footer = () => {
    return (


        <footer className=" bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-2 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://semiao91.github.io/Semiao-portfolio/" className="hover:underline">Afrik™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <span>Suggestions or contributions are welcomed: </span>
                        <a href="https://github.com/Semiao91/Sf6-tournaments" className="hover:underline me-4 md:me-6  text-green-100"> Github</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer
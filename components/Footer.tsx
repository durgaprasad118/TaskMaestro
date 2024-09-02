import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="  w-[99vw] shadow ">
            <div className="w-full ">
                <div className="px-8 flex items-center justify-between">
                    <a
                        href=""
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <Image
                            src="/logo.png"
                            alt="Task Maestro Logo"
                            width={40}
                            height={40}
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Task Maestro
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
                <span className="block mb-5 text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © {new Date().getFullYear()}{' '}
                    <a href="" className="hover:underline">
                        Task Maestro™
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;

'use client';

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFilm, faHouse, faMagnifyingGlass, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathName = usePathname();

    function Hyperlink({ href, icon, text }: { href: string, icon: IconProp, text: string }) {
        return (
            <Link href={href} className={"flex flex-col items-center justify-center gap-2 hover:bg-gray-700 p-2 border-2 border-transparent hover:border-white rounded-md " + (pathName === href ? "border-white" : "")}>
                <FontAwesomeIcon icon={icon} className="text-2xl cursor-pointer w-10 h-10" />
                <span>{text}</span>
            </Link>
        );
    };

    return (
        <footer>
            <div className="fixed bottom-0 left-[50%] transform translate-x-[-50%] w-full md:container">
                <div className="flex justify-center items-center gap-7 h-24 bg-gray-800 text-white">
                    <Hyperlink href="/" icon={faHouse} text="Home" />
                    <Hyperlink href="/search" icon={faMagnifyingGlass} text="Search" />
                    <Hyperlink href="/reels" icon={faFilm} text="Reels" />
                    <Hyperlink href="/profile" icon={faUserCircle} text="Profile" />
                </div>
            </div>
        </footer>
    );
}
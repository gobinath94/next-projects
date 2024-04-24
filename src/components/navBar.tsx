"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {

    const pathname = usePathname();

    if (pathname.startsWith("/product")) {
        return (

            <nav className="bg-blue-900 p-4 lg:px-48">
                <ul className="flex gap-4  text-gray-100 text-lg">
                    <li><Link href="/">Home</Link></li>
                    {/* <li><Link href="/product">Product List</Link></li> */}
                    <li><Link href="#">Price List</Link></li>
                    {/* <li><Link href="/product-one">Product One API</Link></li> */}
                </ul>
            </nav>
        )
    } else {


        return (
            <nav className="bg-blue-900 p-4 lg:px-48 ">
                <div className="flex gap-4 text-gray-100 text-lg">
                    <Link href="/home">Home</Link>||
                    <Link href="/customer">Customer</Link>||
                    <Link href="/order">Order</Link>||
                    {/* <Link href="/product">Product</Link>||
                    <Link href="/product-one">Product One API</Link>|| */}
                    <Link href="/about">About</Link>
                </div>
            </nav>
        )
    }
}
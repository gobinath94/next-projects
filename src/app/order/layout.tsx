import Link from "next/link";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="bg-black p-4 lg:px-48">
        <div className="flex gap-4 text-gray-100 text-lg">
          <Link href="/order/normal">Normal Order</Link>||
          <Link href="/order/premium">Premium Order</Link>
        </div>
      </nav>
      {children}
    </>
  );
}
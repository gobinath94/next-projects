/* import Link from "next/link";
import ProductDelete from "./delete";
//SSR
async function getProducts() {
    const res = await fetch(`http://localhost:7001/product`, { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}


export default async function page(){

  
    const products = await getProducts()

  
    return(

        <div className="w-1/2 grid gap-4 mx-auto p-8">
            <Link href={'/product/add'} className="bg-green-700 text-gray-100 w-64 p-2 text-center">Add Product</Link>
            {products.map((product: any, i: number) => {
                return (
                    <div className="grid grid-cols-7 gap-2">
                        <div className="col-span-5">{i+1}. {product.name}</div>
                        <Link href={`/product/${product.id}`} className="font-bold border p-1 bg-red-700 text-gray-100">Edit</Link>
                      <ProductDelete id={product.id}/>  
                    </div>
                )
            })}
        </div>

    )
} */
// API can hit in 2 ways 1.1 server side client (useEffect in react)
// for Server side :-> API hit using next

import AllProduct from "@/actions/product/productAction";
import Link from "../../../node_modules/next/link";
import ProductDelete from "../product/delete";



export default async function page(){

  
    const products = await AllProduct()

  
    return(

        <div className="w-1/2 grid gap-4 mx-auto p-8">
            <Link href={'/product-one/add'} className="bg-green-700 text-gray-100 w-64 p-2 text-center">Add Product</Link>
            {products.map((product: any, i: number) => {
                return (
                    <div className="grid grid-cols-7 gap-2">
                        <div className="col-span-5">{i+1}. {product.name}</div>
                        <Link href={`/product-one/${product.id}`} className="font-bold border p-1 bg-red-700 text-gray-100">Edit</Link>
                      <ProductDelete id={product.id}/>  
                    </div>

                )
            })}
        </div>

    )
}
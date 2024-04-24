/* "use client"

import { DeleteProduct } from "@/actions/product/productAction"

export default function ProductDelete(props: { id: string }) {
    const productDelete = () => {
        DeleteProduct(props.id); 
        window.location.reload();
    };

    return (
        <button className="font-bold border p-1 bg-red-700 text-gray-100" onClick={productDelete}>Delete</button>
    );
} */
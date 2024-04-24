"use client"

import { useState } from "react";
import { useRouter } from "../../../../node_modules/next/navigation";

export default function Page() {
    const router = useRouter()
    const [productData, setProductData] = useState({
        id: "",
        price: "",
        name: "",
        description: "",
    });
    const handleChange = (event:any) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        fetch('http://localhost:7001/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        })
        router.push("/product")
        router.refresh()
    };



    return (
        <div className="w-1/2 mx-auto p-4 m-4">
            <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-1">
                    <label>ID</label>
                    <input className="col-span-2 border p-2" name="id" value={productData.id}  onChange={handleChange} required />
                </div>
                <div className="grid gap-1">
                    <label>Price</label>
                    <input className="col-span-2 border p-2" name="price" value={productData.price} onChange={handleChange} required />
                </div>
                <div className="grid gap-1">
                    <label>Name</label>
                    <input className="col-span-2 border p-2" name="name" value={productData.name} onChange={handleChange} required />
                </div>
                <div className="grid gap-1">
                    <label>Description</label>
                    <input className="col-span-2 border p-2" name="description" value={productData.description} onChange={handleChange} required />
                </div>
                <button type="submit" className="bg-green-700 text-gray-100 p-2">Submit</button>
            </form>
        </div>
    )
}
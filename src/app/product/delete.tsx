"use client"
export default function ProductDelete( props: {id: string }){
    const productDelete = (id:string) => {
        fetch(`http://localhost:7001/product/${id}`, {
            method: 'DELETE',
        })
        window.location.reload()
    };
    return(
        <button className=" font-bold border p-1 bg-red-700 text-gray-100" onClick={()=>productDelete(props.id)}>Delete</button>
    )
}

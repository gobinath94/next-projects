
export function AddProduct(productData: any) {
    fetch('http://localhost:3001/product-api/', {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify(productData)
    })
};

export  function DeleteProduct(id: string) {
    fetch(`http://localhost:3001/product-api/${id}`, {
        method: 'DELETE',
    })
};

export  async function GetAProduct(id: string) {
    const res = await fetch(`http://localhost:3001/product-api/${id}`)
    return res.json()
};


export function UpdateProduct(productData: any) {
    fetch(`http://localhost:3001/product-api/${productData.id}`, {
        method: 'PATCH',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify(productData)
    })
};

export default async function AllProduct() {
    const res = await fetch(`http://localhost:3001/product-api`, { cache: 'no-store' })
    return res.json()
}


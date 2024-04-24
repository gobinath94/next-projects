'use client'

import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`http://localhost:7001/product`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch the product details');
  }

  return res.json();
}

async function deleteProduct(productId: string): Promise<void> {
  const res = await fetch(`http://localhost:7001/product/${productId}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Failed to delete the product');
  }
}

async function createProduct(newProduct: Product): Promise<void> {
  const res = await fetch(`http://localhost:7001/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  });

  if (!res.ok) {
    throw new Error('Failed to create the product');
  }
}

async function updateProduct(updatedProduct: Product): Promise<void> {
  const { id, ...rest } = updatedProduct;
  const res = await fetch(`http://localhost:7001/product/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rest)
  });

  if (!res.ok) {
    throw new Error('Failed to update the product');
  }
}

export default function Product(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Product>({ id: "", name: "", price: "", description: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = (productId: string) => {
    setEditProductId(productId);
    const productToEdit = products.find(product => product.id === productId);
    if (productToEdit) {
      setFormData(productToEdit);
    }
  };

  const handleSave = async () => {
    try {
      const productId = editProductId || "";
      const updatedProduct = { ...formData, id: productId };
      await updateProduct(updatedProduct);
      const updatedProducts = products.map(product =>
        product.id === productId ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setEditProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const existingProduct = products.find(product => product.id === formData.id);
      if (existingProduct) {
        setErrorMessage("Product with this ID already exists.");
      } else {
        await createProduct(formData);
        setProducts([...products, formData]);
        setErrorMessage("");
        setFormData({ id: "", name: "", price: "", description: "" });
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="w-3/4 mx-auto p-8">
      <p className="text-xl font-bold mb-4">List of Products</p>
      <table className="table-auto border-collapse border border-green-800">
        <thead>
          <tr>
            <th className="border border-green-800 px-4 py-2">#</th>
            <th className="border border-green-800 px-4 py-2">Name</th>
            <th className="border border-green-800 px-4 py-2">Price</th>
            <th className="border border-green-800 px-4 py-2">Description</th>
            <th className="border border-green-800 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border border-green-800 px-4 py-2">{product.id}</td>
              <td className="border border-green-800 px-4 py-2">
                {editProductId === product.id ? (
                  <input
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    className="border border-green-600 px-4 py-2"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="border border-green-800 px-4 py-2">
                {editProductId === product.id ? (
                  <input
                    type="text"
                    value={formData.price}
                    name="price"
                    onChange={handleChange}
                    className="border border-green-600 px-4 py-2"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="border border-green-800 px-4 py-2">
                {editProductId === product.id ? (
                  <input
                    type="text"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    className="border border-green-600 px-4 py-2"
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {editProductId === product.id ? (
                  <>
                    <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={handleSave}>Save</button>
                    <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditProductId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleEdit(product.id)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 ml-2" onClick={() => handleDelete(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>


      </table>

      <div className="mt-8">
        <p className="text-xl font-bold mb-4">Create Product</p>
        <div className="flex items-center mb-4">
          <label htmlFor="id" className="mr-4">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="border border-gray-600 px-4 py-2 "
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="name" className="mr-4">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-600 px-4 py-2"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="price" className="mr-4">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-600 px-4 py-2"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="description" className="mr-4">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-600 px-4 py-2"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleCreate}>Create Product</button>
      </div>
    </div>
  );
}

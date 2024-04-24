"use client"

import React, { useState } from "react";

// Define initial customers with id and name
const initialCustomers = [
  { id: 1, name: "Amit" },
  { id: 2, name: "Sahil" },
  { id: 3, name: "Mani" },
  { id: 4, name: "Gopi" }
];

interface Customer {
  id: number;
  name: string;
}

export default function Customer(): JSX.Element {
  // State for managing customers
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  // State for managing form input
  const [formData, setFormData] = useState({ id: "", name: "" });
  // State for managing editing mode
  const [editId, setEditId] = useState<number | null>(null);
  // State for managing error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Clear error message when input changes
  };

  // Function to handle creating a new customer
  const handleCreate = () => {
    if (formData.id && formData.name) {
      const existingCustomer = customers.find(customer => customer.id === parseInt(formData.id));
      if (existingCustomer) {
        // Display error message if customer ID already exists
        setErrorMessage("Customer ID already exists. Please use a different ID.");
      } else {
        // Add new customer to the list
        setCustomers([
          ...customers,
          { id: parseInt(formData.id), name: formData.name }
        ]);
        // Clear form data
        setFormData({ id: "", name: "" });
        setEditId(null);
      }
    }
  };

  // Function to handle updating an existing customer name
  const handleUpdateName = () => {
    if (formData.name && editId !== null) {
      setCustomers(customers.map(customer => {
        if (customer.id === editId) {
          return { ...customer, name: formData.name };
        }
        return customer;
      }));
      // Clear form data
      setFormData({ ...formData, name: "" });
      setEditId(null);
    }
  };

  // Function to handle customer deletion
  const handleDelete = (customerId: number) => {
    // Filter out the customer with the given id
    setCustomers(customers.filter((customer) => customer.id !== customerId));
  };

  // Function to handle edit mode
  const handleEdit = (customerId: number) => {
    setEditId(customerId);
    const customerToEdit = customers.find(customer => customer.id === customerId);
    if (customerToEdit) {
      setFormData({ ...formData, name: customerToEdit.name });
    }
  };

  return (
    <div>
      <div>
        <p className="bg-blue-200 p-4 lg:px-48">List of customers</p>
      </div>
      <div className="mx-auto mt-4 lg:px-48">
      <table className="table-auto border-collapse border border-green-800">
        <thead>
          <tr>
            <th className="border border-green-600 px-4 py-2">ID</th>
            <th className="border border-green-600 px-4 py-2">Name</th>
            <th className="border border-green-600 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border border-green-600 px-4 py-2">{customer.id}</td>
              <td className="border border-green-600 px-4 py-2">{editId === customer.id ? (
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-green-600 px-4 py-2"
              />
              ) : (
                customer.name
              )}</td>
              <td className="border border-green-600 px-4 py-2">
                {editId === customer.id ? (
                  <>
                    <button className="bg-yellow-700 text-green-100 px-4 py-1 mr-2" onClick={() => handleUpdateName()}>Update</button>
                    <button className="bg-red-700 text-green-100 px-4 py-1" onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="bg-yellow-700 text-green-100 px-4 py-1 mr-2" onClick={() => handleEdit(customer.id)}>Edit</button>
                    <button className="bg-red-700 text-green-100 px-4 py-1" onClick={() => handleDelete(customer.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <form className="p-4 lg:px-48" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <div className="mb-4">
          <input
            type="number"
            name="id"
            value={formData.id}
            placeholder="Customer ID"
            onChange={handleChange}
            required
            className="border border-green-600 px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Customer Name"
            onChange={handleChange}
            required
            className="border border-green-600 px-4 py-2"
          />
        </div>
        <button className="bg-green-700 text-green-100 px-4 py-2" type="submit">Add Customer</button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}

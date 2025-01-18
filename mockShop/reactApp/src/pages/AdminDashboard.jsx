import { useState } from "react";

const AdminDashboard = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        categories: "",
        photos: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Product created successfully:", data);
        } catch (error) {
            console.error("Error creating product:", error.message);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Categories (comma-separated):
                    <input
                        type="text"
                        name="categories"
                        value={newProduct.categories}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Photos (comma-separated URLs):
                    <input
                        type="text"
                        name="photos"
                        value={newProduct.photos}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default AdminDashboard;

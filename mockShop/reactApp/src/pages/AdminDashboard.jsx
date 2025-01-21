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
        <div style={styles.mainContainer}>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit} style={styles.createContainer}>
                <label style={styles.formInputs}>
                    Product Name:
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.formInputs}>
                    Description:
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.formInputs}>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.formInputs}>
                    Categories (comma-separated):
                    <input
                        type="text"
                        name="categories"
                        value={newProduct.categories}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.formInputs}>
                    Photos (comma-separated URLs):
                    <input
                        type="text"
                        name="photos"
                        value={newProduct.photos}
                        onChange={handleInputChange}
                    />
                </label >
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

const styles = {

    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    createContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        width: '20vw',
        borderRadius: '0.2rem',
        boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.1)',

    },
    formInputs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },


};

export default AdminDashboard;

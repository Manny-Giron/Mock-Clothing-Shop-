import { useState } from "react";

const ProductCreateForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categories: "",
        photos: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    categories: formData.categories.split(",").map((c) => c.trim()),
                    photos: formData.photos.split(",").map((p) => p.trim()),
                }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log("Product created:", data);

        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <h2>Create Product</h2>
                <label style={styles.inputContainer}>
                    Name:
                    <input type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange} />
                </label>
                <label style={styles.inputContainer}>
                    Description:
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange} />
                </label>
                <label style={styles.inputContainer}>
                    Price:
                    <input
                        placeholder="Price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange} />
                </label>
                <label style={styles.inputContainer}>
                    Categories:
                    <input
                        style={styles.inputBox}
                        placeholder="(Comma seperated)"
                        type="text"
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.inputContainer}>
                    Photos: <input
                        placeholder="(comma-separated URLs):"
                        type="text"
                        name="photos"
                        value={formData.photos}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        borderRadius: '0.25rem',
        boxShadow: "5px 5px 10px rgb(0,0,0,0.3)",
        width: '25vw'
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    inputContainer: {
        width: '80%',
    },
    inputBox: {
        padding: '0.5rem',
        border: '1px solid black',
        borderRadius: '5px',
    }
}


export default ProductCreateForm;

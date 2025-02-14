import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Add this import

const ProductEditForm = ({ productId }) => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (!productId) {
            setFormData(null); // Clear the form if no product is selected
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    categories: data.categories.map((c) => c.name).join(", "),
                    photos: data.photos.map((p) => p.image_url).join(", "),
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/update/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    categories: formData.categories.split(",").map((c) => c.trim()),
                    photos: formData.photos.split(",").map((p) => p.trim()),
                }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log("Product updated:", data);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!formData) return <p>No product selected</p>;

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <label style={styles.inputContainer}>
                    <div>Item #: {productId}</div>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label style={styles.inputContainer}>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleInputChange} />
                </label>
                <label style={styles.inputContainer}>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </label>
                <label style={styles.inputContainer}>
                    Categories (comma-separated):
                    <input
                        type="text"
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.inputContainer}>
                    Photos (comma-separated URLs):
                    <input
                        type="text"
                        name="photos"
                        value={formData.photos}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

// Add PropTypes validation (THANKS DEEPSEEK)
ProductEditForm.propTypes = {
    productId: PropTypes.string.isRequired,
};

const styles = {
    container: {
        borderRadius: '0.25rem',
        boxShadow: "5px 5px 10px rgb(0,0,0,0.3)",
        width: '25vw'
    },
    formContainer: {
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
    },
    inputContainer: {
        padding: '0.5rem'
    }
};

export default ProductEditForm;
import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Add this import

const ProductEditForm = ({ productId, fetchProducts }) => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (!productId) {
            setFormData(null);
            return;
        }
        else {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
                    if (!response.ok) throw new Error(`Error: ${response.status}`);
                    const data = await response.json();
                    console.log("Product Data:", data);
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        categories: data.categories.map((c) => c.name).join(", "),
                        photos: data.photos.map((p) => p.image_url).join(", "),
                    });
                    console.log('Form Data:', {
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
        }
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
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!formData) return <p>No product selected</p>;

    return (
        <div style={styles.container}>
            <div className="leftFormSection" style={{ width: '50%', }}>
                <form onSubmit={handleSubmit} style={styles.formContainer}>
                    <label style={styles.inputContainer}>
                        <div>Item #: {productId}</div>
                        Name:
                        <input
                            style={styles.inputBox}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange} />
                    </label>
                    <label style={styles.inputContainer}>
                        Description:
                        <textarea
                            style={styles.inputBox}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange} />
                    </label>
                    <label style={styles.inputContainer}>
                        Price:
                        <input
                            style={styles.inputBox}
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange} />
                    </label>
                    <label style={styles.inputContainer}>
                        Categories (comma-separated):
                        <input
                            style={styles.inputBox}
                            type="text"
                            name="categories"
                            value={formData.categories}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label style={styles.inputContainer}>
                        Photos (comma-separated URLs):
                        <input
                            style={styles.inputBox}
                            type="text"
                            name="photos"
                            value={formData.photos}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button style={styles.submitbutton} className="submitButton"
                        type="submit">Update Product</button>
                </form>
            </div>
            <div className="rightImageSection" style={styles.rightImageSection}>
                <img
                    src={formData.photos.split(',')[0].trim()}
                    alt={"Product Image Unavailable"}
                    style={{ width: '100%', height: 'auto', margin: '1rem', objectFit: 'contain' }}

                />
            </div>
        </div>
    );
};

// Add PropTypes validation (THANKS DEEPSEEK)
ProductEditForm.propTypes = {
    productId: PropTypes.string.isRequired,
    fetchProducts: PropTypes.func.isRequired,
};


const styles = {

    rightImageSection: {
        maxWidth: '220px',
        display: 'flex',
        shrink: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        border: '2px solid black',
        borderRadius: '0.25rem',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
    },
    formContainer: {
        padding: '0.25rem 0',
        display: 'flex',
        alignItems: 'left',
        flexDirection: 'column',
        width: '100%',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.1rem'
    },
    inputBox: {
        width: '80%',
        padding: '0.5rem',
        /*border: '2px solid black',*/
        boxShadow: '4px 4px 8px 5px rgba(0, 0, 0, 0.)',
        borderRadius: '5px',
    },
    submitbutton: {
        width: '90%',
        marginTop: '1rem',
        padding: '.15rem',
        border: '2px solid black',
        borderRadius: '2rem',
        backgroundColor: 'white',
        fontSize: '1.25rem',
        cursor: 'pointer',
        transition: "0.25s",
    },
};

export default ProductEditForm;
import { useState } from "react";
import PropTypes from 'prop-types'; // Add this import

const ProductCreateForm = ({ fetchProducts, setIsCreating }) => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categories: "",
    });
    const [files, setFiles] = useState([]);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        if (selectedFiles.length > 0) {
            setPhotoPreview(URL.createObjectURL(selectedFiles[0]));
        }
    };

    const uploadPhotos = async (productId) => {
        const form = new FormData();
        form.append('product', productId);
        files.forEach((file) => {
            form.append('image', file);
        });

        const response = await fetch('http://127.0.0.1:8000/api/photos/multi-upload/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
            body: form
        });

        if (!response.ok) throw new Error('Photo upload failed');

        const data = await response.json();
        return data.photo_ids;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Create the product first (without photos)
            const productRes = await fetch("http://127.0.0.1:8000/api/products/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    categories: formData.categories.split(",").map((c) => c.trim()),
                    photos: [],
                }),
            });

            if (!productRes.ok) throw new Error(`Product creation failed: ${productRes.status}`);
            const product = await productRes.json();

            const photoIds = await uploadPhotos(product.id);
            await fetch(`http://127.0.0.1:8000/api/products/${product.id}/update/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ photos: photoIds }),
            });

            fetchProducts();
            setIsCreating(false);
        } catch (error) {
            console.error("Error creating product:", error);
            setError(true);
        }
    };

    return (
        <div className="Background" style={styles.containerBackground}>
            <div style={styles.container}>
                <div style={{ ...styles.errorMessage, display: error ? 'block' : 'none' }}>
                    Error Making New Product, Try Again
                </div>

                <div style={styles.exitButton} onClick={() => setIsCreating(false)}>X</div>

                <div className="leftProductForm" style={{ width: '50%' }}>
                    <form onSubmit={handleSubmit} style={styles.formContainer}>
                        <label style={styles.inputContainer}>
                            <input style={styles.inputBox} type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                        </label>
                        <label style={styles.inputContainer}>
                            <textarea style={{ ...styles.inputBox, maxWidth: '100%', minWidth: '100%' }} placeholder="Description" name="description" value={formData.description} onChange={handleInputChange} />
                        </label>
                        <label style={styles.inputContainer}>
                            <input style={styles.inputBox} placeholder="Price" type="number" name="price" value={formData.price} onChange={handleInputChange} />
                        </label>
                        <label style={styles.inputContainer}>
                            <input style={styles.inputBox} placeholder="Comma-separated category names" type="text" name="categories" value={formData.categories} onChange={handleInputChange} />
                        </label>
                        <label style={styles.inputContainer}>
                            <input style={styles.inputBox} type="file" multiple accept="image/*" onChange={handleFileChange} />
                        </label>
                        <button className="submitButton" style={styles.submitbutton} type="submit">Create Product</button>
                    </form>
                </div>

                <div className="rightImageSection" style={styles.rightImageSection}>
                    {photoPreview && <img src={photoPreview} style={{ width: '24vw', height: 'auto', objectFit: 'contain' }} alt="Preview" />}
                </div>
            </div>
        </div>
    );
};

ProductCreateForm.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    setIsCreating: PropTypes.func.isRequired,
};
const styles = {
    errorMessage: {
        position: 'fixed',
        zIndex: 100,
        top: '7rem',
        left: '40%',
        borderRadius: '0.25rem',
        backgroundColor: 'red',
        color: 'white',
        padding: '0.6rem',
        fontWeight: 'bold',
        fontSize: '1.25rem',

    },
    exitButton: {
        position: 'relative',
        top: '-1rem',
        left: '100%',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: 'black',
    },
    containerBackground: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100vw',
        height: '100vh',

        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '60vw',
        // border: '2px solid black',
        borderRadius: '0.25rem',
        display: 'flex',
        backgroundColor: 'white',
        padding: '2rem',
        maxHeight: '80vh',
        overflow: 'scroll',
    },
    formContainer: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0.5rem 0',
    },
    inputContainer: {
        margin: '0.5rem 0',
    },
    inputBox: {
        width: '100%',
        height: '2rem',
        marginLeft: '0.25rem',
        padding: '0.5rem',
        border: '2px solid black',
        borderRadius: '6px',
    },
    rightImageSection: {
        marginLeft: '8rem',
        maxWidth: '220px',
        display: 'flex',
        shrink: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitbutton: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '4rem',
        marginTop: '1rem',
        padding: '.15rem',
        border: '2px solid black',
        borderRadius: '2rem',
        backgroundColor: 'white',
        fontSize: '1.25rem',
        cursor: 'pointer',
        transition: "0.25s",
    }
}


export default ProductCreateForm;

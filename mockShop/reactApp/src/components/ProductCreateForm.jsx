import { useState } from "react";
import PropTypes from 'prop-types'; // Add this import

const ProductCreateForm = ({ fetchProducts, setIsCreating }) => {
    const [error, setError] = useState(null);
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
            fetchProducts();
            setIsCreating(false);

        } catch (error) {
            console.error("Error creating product:", error);
            setError(true);
        }
    };

    return (

        <div className="Background"
            style={styles.containerBackground}
        // onClick={() => {
        //     setIsCreating(false);
        // }}
        >
            <div style={styles.container}>
                <div
                    className="errorMessage"
                    style={{ ...styles.errorMessage, display: error ? 'block' : 'none' }}
                >
                    Error Making New Product, Try Again
                </div>

                <div className="exitButton"
                    style={styles.exitButton}
                    onClick={() => {
                        setIsCreating(false);
                    }}
                >X</div>
                <div className="leftProductForm" style={{ width: '50%', }}>
                    <form onSubmit={handleSubmit} style={styles.formContainer}>
                        <label style={styles.inputContainer}>
                            <input
                                style={styles.inputBox}
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange} />
                        </label>
                        <label style={styles.inputContainer}>
                            <textarea
                                style={{ ...styles.inputBox, maxWidth: '100%', minWidth: '100%' }}
                                placeholder="Description"
                                name="description"
                                value={formData.description}
                                onChange={{ handleInputChange }} />
                        </label>
                        <label style={styles.inputContainer}>
                            <input
                                style={styles.inputBox}
                                placeholder="Price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange} />
                        </label>
                        <label style={styles.inputContainer}>
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
                            <input
                                style={styles.inputBox}
                                placeholder="(comma-separated URLs):"
                                type="text"
                                name="photos"
                                value={formData.photos}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button className="submitButton" style={styles.submitbutton} type="submit">Create Product</button>
                    </form>
                </div>
                <div className="rightImageSection" style={styles.rightImageSection}>
                    <img
                        src={formData.photos.split(',')[0]?.trim()}
                        style={{ width: '24vw', height: 'auto', objectFit: 'contain', }}
                    />
                </div>
            </div>

        </div>
    );
};

ProductCreateForm.propTypes = {
    productId: PropTypes.string.isRequired,
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

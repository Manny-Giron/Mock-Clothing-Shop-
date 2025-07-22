import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ProductEditForm = ({ productId, fetchProducts, setUpdateOk, categories }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: [],
        categories: [],
    });
    const [photos, setPhotos] = useState([]);
    const [photoPreview, setPhotoPreview] = useState(null);

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
                    const categoryObjects = categories.filter(cat => data.categories.includes(cat.id));
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        categories: categoryObjects,
                    });
                    const imageUrl =
                        data.photos && data.photos.length > 0
                            ? data.photos[0].image  // or data.photos[0].image_url depending on your API
                            : null;

                    setPhotoPreview(imageUrl);
                    console.log(imageUrl)
                    console.log('Form Data:', {
                        name: data.name,
                        description: data.description,
                        price: data.price,
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
    const handleCategoryDelete = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.filter(cat => cat.id !== categoryId)
        }));
    };

    const handleAddCategory = (selectedName) => {
        const selectedCat = categories.find((cat) => cat.name === selectedName);
        if (selectedCat && !formData.categories.find(c => c.id === selectedCat.id)) {
            setFormData((prev) => ({
                ...prev,
                categories: [...prev.categories, selectedCat]
            }));
        }
    };

    const handlePhotoChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setPhotos(selectedFiles);
        if (selectedFiles.length > 0) {
            setPhotoPreview(URL.createObjectURL(selectedFiles[0]));
        }
    };
    const uploadPhotos = async (productId) => {
        if (photos.length === 0) return [];

        const form = new FormData();
        form.append('product', productId);
        photos.forEach((file) => {
            form.append('image', file);
        });
        const response = await fetch('http://127.0.0.1:8000/api/photos/multi-upload/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
            const photoIds = await uploadPhotos(productId);

            const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/update/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    categories: formData.categories.map(cat => cat.id),
                    photos: photoIds,
                }),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log("Product updated:", data);
            setUpdateOk(true);
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
                        Categories:
                        <select onChange={(e) => handleAddCategory(e.target.value)} value="" style={styles.dropDown}>
                            <option value="" disabled>Add Category</option>
                            {categories
                                .filter(cat => !formData.categories.find(c => c.id === cat.id))
                                .map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                        </select>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {formData.categories.map((category, index) => (
                                <div key={index} style={{ display: 'flex', padding: '0.25rem', margin: '0.25rem', backgroundColor: '#f0f0f0', borderRadius: '5px', fontSize: '.9rem', color: 'black', }}>
                                    {category.name}
                                    <div style={{ marginLeft: '0.5rem', color: 'White', backgroundColor: 'red', padding: '0.05rem 0.3rem', borderRadius: '10%', cursor: 'pointer', alignContent: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', }}
                                        onClick={() => handleCategoryDelete(category.id)}
                                    >
                                        X
                                    </div>
                                </div>
                            ))}
                        </div>
                    </label>
                    <label style={styles.inputContainer}>
                        Upload New Photos:
                        <input
                            style={styles.inputBox}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                        />
                    </label>

                    <button style={styles.submitbutton} className="submitButton"
                        type="submit">Update Product</button>
                </form>
            </div>
            <div className="rightImageSection" style={styles.rightImageSection}>
                {photoPreview && (
                    <img
                        src={`http://127.0.0.1:8000${photoPreview}`}
                        alt="Preview"
                        style={{ width: '100%', height: 'auto', margin: '1rem', objectFit: 'contain' }}
                    />)}
            </div>
        </div>
    );
};

// Add PropTypes validation (THANKS DEEPSEEK)
ProductEditForm.propTypes = {
    productId: PropTypes.number,
    fetchProducts: PropTypes.func.isRequired,
    setUpdateOk: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
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
        padding: '1rem',
        boxShadow: '4px 4px 8px 3px rgba(0, 0, 0, 0.2)',
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
        maxWidth: '80%',
        padding: '0.5rem',
        /*border: '2px solid black',*/
        boxShadow: '4px 4px 8px 3px rgba(0, 0, 0, 0.2)',
        border: '0px solid rgb(0,0,0,0)',
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
    dropDown: {
        width: '80%',
        padding: '0.5rem',
        border: '0px',
        boxShadow: '4px 4px 8px 3px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        margin: '0.5rem 0',
    }
};

export default ProductEditForm;
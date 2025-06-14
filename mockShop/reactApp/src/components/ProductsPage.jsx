import { useState, useEffect } from "react";
import ProductCreateForm from "../components/ProductCreateForm";
import ProductEditForm from "../components/ProductEditForm";

const ProductsPage = () => {
    const [updateOk, setUpdateOk] = useState(false);
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [categories, setCategories] = useState([]);
    // const [isEditing, setIsEditing] = useState(false);
    // const [isDeleting, setIsDeleting] = useState(false);
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const fetchCategories = async () => {
        try {
            console.log("Fetching Categories (Admin Page)");
            const response = await fetch('http://127.0.0.1:8000/api/categories/');
            if (!response.ok) {
                throw new Error("Fetching products failed.");
            }
            const data = await response.json();
            setCategories(data);
            console.log("Categories fetched successfully");
        }
        catch {
            console.log("Failed to fetch Categories (Admin Page)");
            return;
        };

    };

    useEffect(() => {
        fetchProducts();
        fetchCategories()
    }, []);
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log("Product deleted:", data);
            // Reload products in product list
            fetchProducts();
            // Reset selected product (if it was the one being edited)
            if (editProductId === productId) {
                setEditProductId(null);
            }
        }
        catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <main>
            <div className="pageHeader" style={styles.pageHeader}>
                <h2 style={styles.h2}>Products</h2>
                <div style={{ ...styles.updateOkHeader, display: updateOk ? 'flex' : 'none', }}>
                    <h3>Product Was Updated</h3>
                    <h3
                        onClick={() => setUpdateOk(false)}
                        style={{ color: "red", cursor: "pointer", marginLeft: "1rem" }}
                    >X</h3>
                </div>
            </div>
            <div className="viewContainer">
                <div className="productsSection">
                    {/* Left Section: Product List */}
                    <div className="leftSection">
                        <div className="prodListCont">
                            {products.length === 0 ? (
                                <p>No products available</p>
                            ) : (
                                <ul style={{ padding: 0 }}>
                                    {products.map((product) => (

                                        <li
                                            key={product.id}
                                            className={`prodContainer 
                        ${editProductId === product.id ? "selected" : ""} 
                        ${isHovered === product.id && editProductId !== product.id ? "hovered" : ""}`}
                                            onClick={() => setEditProductId(product.id)}
                                            onMouseEnter={() => setIsHovered(product.id)}
                                            onMouseLeave={() => setIsHovered(null)}
                                            style={styles.productContainer}
                                        >
                                            <div>{product.name} - ${product.price}</div>
                                            <div className="delButton">
                                                <button style={styles.deleteButton}
                                                    onClick={() => {
                                                        event.stopPropagation();
                                                        handleDeleteProduct(product.id)
                                                        editProductId === product.id ? setEditProductId(null) : null
                                                        console.log("Product deleted:", product.id);
                                                        console.log("Product editing:", editProductId);
                                                    }
                                                    }

                                                >X</button>
                                            </div>
                                        </li>


                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Forms */}
                    <div className="rightSection">
                        <button className={`CUD Button`}
                            onClick={() => {
                                setIsCreating(!isCreating);
                            }}
                            style={styles.CUDButton}
                        >Create Product</button>
                        {isCreating === true ? <ProductCreateForm
                            fetchProducts={fetchProducts}
                            setIsCreating={setIsCreating}
                        /> : null
                        }
                        <ProductEditForm
                            productId={editProductId}
                            fetchProducts={fetchProducts}
                            setUpdateOk={setUpdateOk}
                            categories={categories}
                        />
                    </div>
                </div>
            </div>

        </main>
    );
};

const styles = {
    pageHeader: {
        display: "flex",
        flexDirection: "row",
    },
    updateOkHeader: {
        marginLeft: "20vw",
        flexDirection: "row",
    },

    productContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    deleteButton: {
        position: "relative",
        right: "0",
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        borderRadius: "5px",
        boxShadow: '4px 4px 8px 3px rgba(0, 0, 0, 0.2)',
    },
    h2: {
        padding: "0 0 0 2rem",
    },
    CUDButton: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: "black",
        color: "white",
        padding: "1rem 4rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "5rem"
    }

}


export default ProductsPage;
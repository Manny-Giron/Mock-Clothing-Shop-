import { useState, useEffect } from "react";
import ProductCreateForm from "../components/ProductCreateForm";
import ProductEditForm from "../components/ProductEditForm";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
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

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <main>
            <h2>Products</h2>
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
                                        >
                                            {product.name} - ${product.price}
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
                        />
                    </div>
                </div>
            </div>

        </main>
    );
};

const styles = {
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
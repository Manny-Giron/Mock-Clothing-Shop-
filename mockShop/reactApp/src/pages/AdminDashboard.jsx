import { useState, useEffect } from "react";
import ProductCreateForm from "../components/ProductCreateForm";
import ProductEditForm from "../components/ProductEditForm";
import "../assets/adminPage.css";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [isHovered, setIsHovered] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/products/");
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            {/* Left Section: Product List */}
            <div style={{ flex: 1 }}>
                <h1>Admin Dashboard</h1>
                <div className="productCont">
                    <h2>Products</h2>
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
            </div>

            {/* Right Section: Forms */}
            <div className="rightSection">
                <ProductCreateForm />

                <h2>Update Product</h2>
                <ProductEditForm productId={editProductId} />
            </div>
        </div>
    );
};

export default AdminDashboard;
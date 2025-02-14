import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import "../assets/homePage.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from Django API
        fetch("http://127.0.0.1:8000/api/products/")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                setError(err.message);
            })
        // \/ Empty dependency array ensures this runs only once on load
    }, []);
    if (error) {
        return <div>Error Error: {error}</div>;
    }
    // Else (all good)
    return (
        <main>
            <Navbar />
            <div>
                <h2>All Products</h2>
                <div className="productsContainer">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", margin: "10px 1px", }}>
                        {products.map((product) => (
                            <div className="product" key={product.id} style={{ padding: ".5rem", width: '25vw', }} onClick={() => navigate(`/product/${product.id}`, '_blank')}>
                                {/* Check if photos exist and render the first image */}
                                {product.photos && product.photos.length > 0 ? (
                                    <img
                                        src={product.photos[0].image_url}
                                        alt={product.name}
                                        style={{ width: "25vw", height: "auto" }}
                                    />
                                ) : (
                                    <p>No image available</p>
                                )}
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>${product.price}</p>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </main>
    )
};


export default Home;
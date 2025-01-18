import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

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
                <h1>Products</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ padding: ".25rem" }}>
                            {/* Check if photos exist and render the first image */}
                            {product.photos && product.photos.length > 0 ? (
                                <img
                                    src={product.photos[0].image_url}
                                    alt={product.name}
                                    style={{ width: "100%", height: "auto" }}
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

        </main>
    )
};


export default Home;
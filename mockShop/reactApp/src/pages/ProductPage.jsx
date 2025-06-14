import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const navigate = useNavigate();
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoverAddProd, setHoverAddProd] = useState(false);
    const handleMouseEnterAddProd = () => setHoverAddProd(true);
    const handleMouseLeaveAddProd = () => setHoverAddProd(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [hoveredSize, setHoveredSize] = useState(null);
    const handleMouseEnter = (size) => setHoveredSize(size);
    const handleMouseLeave = () => setHoveredSize(null);


    const handleSizeSelection = (size) => {
        setSelectedSize(selectedSize === size ? null : size);
    };
    const styleSelectedSize = (size) => ({
        ...styles.sizeButton,
        ...(hoveredSize === size ? { border: '2px solid rgb(0,0,0)', } : {}),
        ...(selectedSize === size ? { border: '2px solid rgb(0,0,0)', } : {}),
    });
    const styleHoverAddProductButton = () => ({
        ...styles.addProductButton,
        ...(hoverAddProd ? { backgroundColor: 'black', color: 'white' } : {}),
    });



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${productID}/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Product Data:", data);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productID]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    return (
        <main>
            <Navbar />
            <div>
                <div key={product.id}>
                    <div className="topEdge" style={styles.topEdge}>
                        <p style={{ cursor: 'pointer', opacity: '0.6' }}
                            onClick={() => navigate("/")}>Home</p>
                        <p>&nbsp;/ {product.name}</p>
                    </div>
                    <div className="productContainer" style={styles.productContainer}>
                        {/* Left Side */}
                        <div className="LeftSide" style={styles.LeftSide}>
                            {Array.isArray(product.photos) && product.photos.length > 0 ? (
                                <img
                                    src={product.photos[0]?.image_url}
                                    alt={product.name}
                                    style={styles.mainImageContainer}
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        {/* Right Side */}
                        <div className="RightSide">
                            <div className="ProductHeader">
                                <h2 style={styles.textContainer}>{product.name}</h2>
                                {/*  <h3>{product.categories}</h3>    */}
                            </div>
                            <div>
                                <p style={styles.textContainer}>${product.price}</p>
                                <p style={styles.textContainer}>{product.description}</p>
                            </div>
                            <div className="sizesContainer" style={styles.sizesContainer}>
                                <button
                                    className="sizeButton"
                                    style={styleSelectedSize('S')}
                                    onMouseEnter={() => handleMouseEnter('S')}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleSizeSelection('S')}
                                >S</button>

                                <button
                                    className="sizeButton"
                                    style={styleSelectedSize('M')}
                                    onMouseEnter={() => handleMouseEnter('M')}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleSizeSelection('M')}
                                >M</button>

                                <button
                                    className="sizeButton"
                                    style={styleSelectedSize('L')}
                                    onMouseEnter={() => handleMouseEnter('L')}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleSizeSelection('L')}
                                >L</button>

                                <button
                                    className="sizeButton"
                                    style={styleSelectedSize('XL')}
                                    onMouseEnter={() => handleMouseEnter('XL')}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleSizeSelection('XL')}
                                >XL</button>


                            </div>
                            <button className="addProductButton"
                                style={styleHoverAddProductButton()}
                                onMouseEnter={handleMouseEnterAddProd}
                                onMouseLeave={handleMouseLeaveAddProd}
                            >Add to Cart</button>
                        </div> {/*END Right Side */}
                    </div>
                </div>
            </div>
        </main>
    );
};

const styles = {
    topEdge: {
        display: 'flex',
        padding: '2rem',
    },
    productContainer: {
        display: "flex",
        padding: ".5rem",
        margin: "2vh 15vw",
    },
    mainImageContainer: {
        width: '30vw',
        height: "auto",
    },
    LeftSide: {
        marginRight: "4vw",
    },
    textContainer: {
        margin: '1rem',
    },
    sizesContainer: {
        display: 'flex',
        gap: '1rem',
        margin: '5rem 0',
    },
    sizeButton: {
        padding: '1rem',
        border: '2px solid rgb(0,0,0,0.2)',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: "0.25s",
    },

    addProductButton: {
        marginTop: '2rem',
        width: '15rem',
        padding: '1rem',
        border: '2px solid black',
        borderRadius: '2rem',
        backgroundColor: 'white',
        fontSize: '1.25rem',
        cursor: 'pointer',
        transition: "0.25s",
    },
}

export default ProductPage;

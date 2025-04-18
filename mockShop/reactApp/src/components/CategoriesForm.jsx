import { useState, useEffect } from "react";
// http://127.0.0.1:8000/api/products/

const CategoriesForm = () => {
    // const [formData, setFormData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
    });

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
        fetchCategories();
    }, []);
    const handeDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/delete/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Failed to delete category.");
            }
            const data = await response.json();
            console.log("Category deleted successfully:", data);
            fetchCategories(); // Refresh categories
        }
        catch (error) {
            console.error("Error deleting category:", error);
        }

    };

    const handleAddCategory = async (e) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories/create/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: e.name,
                }),
            })
            if (!response.ok) {
                throw new Error("Failed to add category.");
            }
            else {
                const data = await response.json();
                console.log("Category added successfully:", data);
                setCategories((prevCategories) => [...prevCategories, data]);
                setFormData({ name: "" }); // Reset form data
                fetchCategories(); // Refresh categories
            }

        }
        catch (error) {
            console.error("Error adding category:", error);
        }
    };

    return (
        <main>
            <div>
                <h2 style={styles.h2}>Categories</h2>
            </div>
            <div className="UpperSection" style={{ display: "flex", justifyContent: "center" }}>
                <div className="topEdgeRow" style={styles.topEdgeRow}>
                    <input
                        style={styles.catInput}
                        type="text"
                        placeholder="Category Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    >
                    </input>
                    <button className="addCatButton"
                        style={styles.addCatButton}
                        onClick={() => { handleAddCategory(formData) }
                        }>Add Category</button>
                </div>

            </div>
            <div className="viewContainer" style={styles.container}>
                {categories.map((category) => (
                    <li
                        key={category.id}
                        style={styles.catLi}
                        className="catLi"
                    >
                        <div style={styles.catItem}>{category.name}</div>
                        <div
                            onClick={() => { handeDeleteCategory(category.id) }}
                            className="deleteButton"
                            style={styles.deleteButton}
                        >X</div>
                    </li>

                ))}
            </div>
        </main>
    );


};
const styles = {
    catInput: {
        padding: "0.5rem",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    deleteButton: {
        position: "relative",
        right: "0",
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "0.25rem 1rem",
        cursor: "pointer",
        borderRadius: "5px",
        boxShadow: '4px 4px 8px 3px rgba(0, 0, 0, 0.2)',
    },
    h2: {
        padding: "0 0 0 2rem",
    },
    container: {
        listStyleType: "none",
        display: "flex",
        flexDirection: "column",
    },
    topEdgeRow: {
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    addCatButton: {
        backgroundColor: "rgb(70, 167, 0)",
        color: "white",
        border: "none",
        borderRadius: "0.25rem",
        padding: "0.5rem 1rem",
        fontSize: "1.25rem",
        cursor: "pointer",
        marginBottom: "1rem",
    },
    catLi: {
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: "0.75rem",
    },
    catItem: {
        borderRadius: "0.25rem",
        minWidth: "12vw",
        fontSize: "1.25rem",
        padding: "0.5rem",
        margin: "0.5rem 0",
    },
}
export default CategoriesForm;
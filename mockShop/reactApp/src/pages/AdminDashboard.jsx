import { useState } from "react";
import ProductPage from "../components/ProductsPage";
import Categories from "../components/CategoriesForm";
import "../assets/adminPage.css";

// ALL CSS STYLES ARE IN adminPage.css !!!! 

const AdminDashboard = () => {
    const [sectionSelected, setSectionSelected] = useState("Products");

    return (<main>
        <div className="topEdge"></div>
        <div className="DashboardContainer">
            <div className="LeftNavBar">
                <div>
                    <h1 className="dashboardTitle">Admin Dashboard</h1>
                </div>

                <div
                    id="Products"
                    className={`navBarItem 
                    ${sectionSelected === "Products" ? 'selected' : ''}`}
                    onClick={() => {
                        setSectionSelected("Products");
                    }}
                >Products</div>
                <div
                    id="Categories"
                    className={`navBarItem 
                    ${sectionSelected === "Categories" ? 'selected' : ''}`}
                    onClick={() => {
                        setSectionSelected("Categories");
                    }}
                >Categories</div>
            </div>

            <div className="CurrentView">
                {sectionSelected === "Products" ? <ProductPage /> : null}
                {sectionSelected === "Categories" ? <Categories /> : null}
            </div>
        </div>
    </main>
    );
};

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductPage from "../components/ProductsPage";
import Categories from "../components/CategoriesForm";
import "../assets/adminPage.css";

// ALL CSS STYLES ARE IN adminPage.css !!!! 

const AdminDashboard = () => {
    const [sectionSelected, setSectionSelected] = useState("Products");
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleLogout = async () => {
        const refresh = localStorage.getItem('refresh');
        await fetch('http://localhost:8000/api/accounts/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify({ refresh })
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        navigate('/admin-login');

    }

    return (<main>
        <div className={`dashboard ${theme}`}>
            <div className="topEdge"></div>
            <div className="DashboardContainer">
                <div className="LeftNavBar">
                    <div id="container">
                        <div>
                            <h1 className="dashboardTitle">Admin Dashboard</h1>
                        </div>
                        <div className="themeToggle">
                            <button className={'themToggleButton'} onClick={() => toggleTheme()}>Toggle Theme</button>
                            <p>too much work to fix...</p>
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
                    <div>
                        <button className='LogoutButton' onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <div className="CurrentView">
                    {sectionSelected === "Products" ? <ProductPage /> : null}
                    {sectionSelected === "Categories" ? <Categories /> : null}
                </div>
            </div>
        </div>
    </main >
    );
};

export default AdminDashboard;
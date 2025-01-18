import cartImage from '../assets/CartImage.png';
import { useState } from 'react';

const Navbar = () => {
    const [hoveredOption, setHoveredOption] = useState(null); // Track which option is hovered

    // Handlers for hover logic
    const handleMouseEnter = (option) => setHoveredOption(option);
    const handleMouseLeave = () => setHoveredOption(null);

    // Function to dynamically style options
    const getOptionStyle = (option) => ({
        ...styles.Options,
        borderBottom: hoveredOption === option ? '2px solid transparent' : '2px solid black',
        cursor: 'pointer',
    });

    return (
        <div className="NavContainer" style={styles.NavContainer}>
            <div className="Logo-Container">
                {/* Add your logo here */}
            </div>
            <ul className="Options-Container" style={styles.OptionsContainer}>
                <li>
                    <div
                        style={getOptionStyle('Men')}
                        onMouseEnter={() => handleMouseEnter('Men')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Men
                    </div>
                </li>
                <li>
                    <div
                        style={getOptionStyle('Women')}
                        onMouseEnter={() => handleMouseEnter('Women')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Women
                    </div>
                </li>
                <li>
                    <div
                        style={getOptionStyle('Sale')}
                        onMouseEnter={() => handleMouseEnter('Sale')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Sale
                    </div>
                </li>
            </ul>
            <div className="Search-Container" style={styles.SearchContainer}>
                <input
                    className="Search-Input"
                    placeholder="Search"
                    style={styles.Search}
                />
                <div className="Search-Button"></div>
            </div>
            <img src={cartImage} style={styles.Cart} alt="Cart" />
        </div>
    );
};

// Styles
const styles = {
    NavContainer: {
        width: '100vw',
        height: '10vh',
        display: 'grid',
        alignItems: 'center', // Centers all items vertically
        gridTemplateColumns: 'auto auto auto auto',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',

    },
    OptionsContainer: {
        listStyleType: 'none',
        display: 'flex',
    },
    Options: {
        height: '2vh',
        margin: '1rem',
        padding: '0.5rem',
        transition: 'border-bottom 0.2s ease',
    },
    // FIX THE GRIDBOX ; ITS NOT SHOWING FULL HEIGHT
    SearchContainer: {
        display: 'flex',
        height: '40%',
    },
    Search: {
        border: '2px solid black',
        borderRadius: '0.1rem',
        height: '100%',
        maxWidth: '50vw',
        width: '20vw',
    },
    Cart: {
        justifySelf: 'end',
        margin: '1rem',
        height: '1rem',
        width: '1rem',
    },
};


export default Navbar;

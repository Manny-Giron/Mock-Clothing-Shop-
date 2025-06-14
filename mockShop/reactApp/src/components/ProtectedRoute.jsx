import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return <Navigate to="/admin-login" />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;

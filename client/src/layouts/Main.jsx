import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';

const Main = () => {
    return (
        <div className="font-sans">
            <Navbar />
            <div className="min-h-[calc(100vh-288px)]">
                <Outlet />
            </div>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Main;

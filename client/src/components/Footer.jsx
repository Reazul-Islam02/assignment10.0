import { FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-10">
            <aside>
                <h2 className="text-2xl font-bold text-primary">TravelEase</h2>
                <p>Providing reliable vehicle bookings since 2023.<br />Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav>
                <header className="footer-title">Social</header>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary transition-colors">
                        {/* New X Logo */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary transition-colors"><FaYoutube /></a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary transition-colors"><FaFacebook /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;

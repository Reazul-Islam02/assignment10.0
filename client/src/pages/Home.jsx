import { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSpring, animated } from 'react-spring';

const Home = () => {
    const [latestVehicles, setLatestVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/vehicles/latest')
            .then(res => {
                setLatestVehicles(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    // React Spring Animation for Hero Text
    const heroTextProps = useSpring({
        from: { opacity: 0, marginTop: -50 },
        to: { opacity: 1, marginTop: 0 },
        delay: 200,
        config: { tension: 280, friction: 60 }
    });

    return (
        <div className="space-y-20 mb-20">
            {/* Hero Section */}
            <div className="hero min-h-[600px]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <animated.div style={heroTextProps}>
                            <h1 className="mb-5 text-5xl font-bold">Drive Your Dream</h1>
                            <p className="mb-5">Experience the ultimate freedom with our premium vehicle rentals. From luxury sedans to rugged off-roaders.</p>
                            <Link to="/vehicles" className="btn btn-primary">Book Your Ride</Link>
                        </animated.div>
                    </div>
                </div>
            </div>

            {/* Latest Vehicles Section */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-2">Latest Arrivals</h2>
                    <p className="text-gray-500">Check out the newest additions to our fleet.</p>
                </div>

                {loading ? (
                    <div className="text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestVehicles.map(vehicle => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-10">
                    <Link to="/vehicles" className="btn btn-outline btn-wide">View All Vehicles</Link>
                </div>
            </div>

            {/* Top Categories Section - Optional Static/Dynamic */}
            <div className="bg-base-200 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['SUV', 'Sedan', 'Luxury', 'Electric'].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="card bg-base-100 shadow-md cursor-pointer hover:shadow-xl transition-all"
                            >
                                <div className="card-body items-center justify-center p-8">
                                    <h3 className="text-xl font-bold">{cat}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-2">Why Choose TravelEase?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 border rounded-box bg-base-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                        <p>We guarantee the best rates for your rental needs.</p>
                    </div>
                    <div className="p-6 border rounded-box bg-base-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-2">Trusted by Thousands</h3>
                        <p>We have a proven track record of satisfied customers.</p>
                    </div>
                    <div className="p-6 border rounded-box bg-base-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                        <p>Our support team is always available to assist you.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;

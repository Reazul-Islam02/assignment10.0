import { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    // Debounce search could be added for better performance, simpler version here
    useEffect(() => {
        setLoading(true);
        let url = `https://assignment10-0.vercel.app/vehicles?search=${search}`;
        if (sort) {
            url += `&sort=${sort}`;
        }

        axios.get(url)
            .then(res => {
                setVehicles(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [search, sort]);

    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.search.value);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">All Vehicles</h2>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-base-200 p-4 rounded-lg">
                <form onSubmit={handleSearch} className="join w-full md:w-auto">
                    <input className="input input-bordered join-item w-full" name="search" placeholder="Search vehicles..." onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn join-item rounded-r-full">Search</button>
                </form>

                <div className="flex items-center gap-2">
                    <span className="font-semibold">Sort By:</span>
                    <select className="select select-bordered" onChange={(e) => setSort(e.target.value)} value={sort}>
                        <option value="">Default</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                        <option value="latest">Latest Added</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {vehicles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {vehicles.map(vehicle => (
                                <VehicleCard key={vehicle._id} vehicle={vehicle} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold">No Vehicles Found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllVehicles;

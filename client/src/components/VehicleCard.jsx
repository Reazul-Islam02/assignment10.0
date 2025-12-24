import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VehicleCard = ({ vehicle }) => {
    const { _id, vehicleName, coverImage, pricePerDay, category, location, bookingCount } = vehicle;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="card bg-base-100 shadow-xl"
        >
            <figure className="px-5 pt-5">
                <img src={coverImage} alt={vehicleName} className="rounded-xl h-48 w-full object-cover" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{vehicleName}</h2>
                <div className="flex gap-2 my-2">
                    <div className="badge badge-secondary">{category}</div>
                    <div className="badge badge-outline">{location}</div>
                </div>
                <p className="text-lg font-semibold text-primary">${pricePerDay}/day</p>
                {bookingCount > 0 && <p className="text-xs text-gray-500">{bookingCount} Booked</p>}

                <div className="card-actions mt-4">
                    <Link to={`/vehicle/${_id}`}>
                        <button className="btn btn-primary">View Details</button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default VehicleCard;

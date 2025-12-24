import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import BookingModal from "../components/BookingModal";
import LoadingSpinner from "../components/LoadingSpinner";

const VehicleDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/vehicle/${id}`)
            .then(res => {
                setVehicle(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleBookClick = () => {
        if (user) {
            setIsModalOpen(true);
        } else {
            navigate('/login', { state: { from: location } });
        }
    }

    if (loading) return <LoadingSpinner />;
    if (!vehicle) return <div>Vehicle not found</div>;

    const { vehicleName, coverImage, pricePerDay, description, location, ownerName, category, bookingCount } = vehicle;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/2">
                    <img src={coverImage} alt={vehicleName} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-4xl mb-4">{vehicleName}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="badge badge-primary badge-lg">{category}</div>
                        <div className="badge badge-secondary badge-outline badge-lg">{location}</div>
                        {bookingCount > 0 && <div className="badge badge-accent badge-outline badge-lg">{bookingCount} Bookings</div>}
                    </div>

                    <p className="text-gray-600 mb-6">{description}</p>

                    <div className="stats shadow mb-6">
                        <div className="stat">
                            <div className="stat-title">Price Per Day</div>
                            <div className="stat-value text-primary">${pricePerDay}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Owner</div>
                            <div className="stat-value text-secondary text-2xl">{ownerName}</div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-auto">
                        <button onClick={handleBookClick} className="btn btn-primary btn-lg w-full">Book Now</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <BookingModal
                    vehicle={vehicle}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default VehicleDetails;

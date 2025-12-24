import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import LoadingSpinner from "../components/LoadingSpinner";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MyVehicles = () => {
    const { user } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchVehicles();
        }
    }, [user]);

    const fetchVehicles = () => {
        axios.get(`http://localhost:5000/my-vehicles/${user.email}`, { withCredentials: true })
            .then(res => {
                setVehicles(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/vehicle/${id}`, { withCredentials: true })
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your vehicle has been deleted.',
                                'success'
                            )
                            const remaining = vehicles.filter(v => v._id !== id);
                            setVehicles(remaining);
                        }
                    })
            }
        })
    }

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">My Vehicles</h2>

            {vehicles.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl mb-4">You haven't listed any vehicles yet.</p>
                    <Link to="/add-vehicle" className="btn btn-primary">Add a Vehicle</Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Bookings</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map(vehicle => (
                                <tr key={vehicle._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={vehicle.coverImage} alt="Vehicle" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{vehicle.vehicleName}</div>
                                        <div className="text-sm opacity-50">{vehicle.location}</div>
                                    </td>
                                    <td>{vehicle.category}</td>
                                    <td>${vehicle.pricePerDay}</td>
                                    <th>{vehicle.bookingCount}</th>
                                    <th className="flex gap-2">
                                        <Link to={`/vehicle/${vehicle._id}`} className="btn btn-ghost btn-xs text-info tooltip" data-tip="View"><FaEye /></Link>
                                        <Link to={`/update-vehicle/${vehicle._id}`} className="btn btn-ghost btn-xs text-warning tooltip" data-tip="Edit"><FaEdit /></Link>
                                        <button onClick={() => handleDelete(vehicle._id)} className="btn btn-ghost btn-xs text-error tooltip" data-tip="Delete"><FaTrash /></button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyVehicles;

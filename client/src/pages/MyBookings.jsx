import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { format } from "date-fns";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://assignment10-0.vercel.app/my-bookings/${user.email}`, { withCredentials: true })
                .then(res => {
                    setBookings(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                })
        }
    }, [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl">You have no bookings yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Vehicle</th>
                                <th>Dates</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={booking.coverImage} alt="Vehicle" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{booking.vehicleName}</div>
                                    </td>
                                    <td>
                                        <div>From: {format(new Date(booking.startDate), 'MMM dd, yyyy')}</div>
                                        <div>To: {format(new Date(booking.endDate), 'MMM dd, yyyy')}</div>
                                    </td>
                                    <td>${booking.totalPrice}</td>
                                    <td>
                                        <div className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-ghost'}`}>
                                            {booking.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBookings;

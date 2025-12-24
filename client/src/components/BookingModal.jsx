import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { format, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const BookingModal = ({ vehicle, closeModal }) => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Calculate total price
    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const days = differenceInCalendarDays(new Date(endDate), new Date(startDate));
        if (days < 0) return 0;
        return (days + 1) * vehicle.pricePerDay; // Include start day
    }

    const handleBooking = async (e) => {
        e.preventDefault();
        const total = calculateTotal();

        if (total <= 0) {
            toast.error("Invalid dates selected");
            return;
        }

        const bookingData = {
            vehicleId: vehicle._id,
            vehicleName: vehicle.vehicleName,
            coverImage: vehicle.coverImage,
            pricePerDay: vehicle.pricePerDay,
            userEmail: user.email,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice: total,
            status: 'pending'
        };

        try {
            const res = await axios.post('http://localhost:5000/bookings', bookingData, { withCredentials: true });
            if (res.data.insertedId || res.data._id) {
                toast.success('Booking Successful!');
                closeModal();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (
        <dialog id="booking_modal" className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Book {vehicle.vehicleName}</h3>
                <form onSubmit={handleBooking} className="py-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">Start Date</label>
                            <input type="date" className="input input-bordered" required onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label">End Date</label>
                            <input type="date" className="input input-bordered" required onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="text-xl font-bold text-center my-4">
                        Total: ${calculateTotal()}
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={closeModal}>Close</button>
                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default BookingModal;

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        const form = e.target;
        const vehicleData = {
            vehicleName: form.vehicleName.value,
            ownerName: form.ownerName.value,
            userEmail: user.email,
            category: form.category.value,
            pricePerDay: parseFloat(form.pricePerDay.value),
            location: form.location.value,
            description: form.description.value,
            coverImage: form.coverImage.value,
            availability: true,
            bookingCount: 0
        };

        try {
            const res = await axios.post('http://localhost:5000/vehicles', vehicleData, { withCredentials: true });
            if (res.data.insertedId || res.data._id) {
                toast.success('Vehicle Added Successfully');
                navigate('/my-vehicles');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">Add New Vehicle</h2>
            <div className="card bg-base-100 shadow-2xl">
                <form onSubmit={handleAddVehicle} className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">Vehicle Name</label>
                            <input type="text" name="vehicleName" placeholder="Tesla Model X" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Category</label>
                            <select name="category" className="select select-bordered" defaultValue="Select Category" required>
                                <option disabled>Select Category</option>
                                <option>SUV</option>
                                <option>Sedan</option>
                                <option>Luxury</option>
                                <option>Electric</option>
                                <option>Sports</option>
                                <option>Truck</option>
                                <option>Van</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">Price Per Day ($)</label>
                            <input type="number" name="pricePerDay" placeholder="100" className="input input-bordered" required min="0" />
                        </div>
                        <div className="form-control">
                            <label className="label">Location</label>
                            <input type="text" name="location" placeholder="New York, NY" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Owner Name</label>
                            <input type="text" name="ownerName" defaultValue={user?.displayName} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Owner Email</label>
                            <input type="email" name="userEmail" defaultValue={user?.email} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">Cover Image URL</label>
                            <input type="url" name="coverImage" placeholder="https://example.com/image.jpg" className="input input-bordered" required />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">Description</label>
                            <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Vehicle details..." required></textarea>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Vehicle</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;

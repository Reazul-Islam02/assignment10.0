import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateVehicle = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        axios.get(`https://assignment10-0.vercel.app/vehicle/${id}`)
            .then(res => {
                setVehicle(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleUpdateVehicle = async (e) => {
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
        };

        try {
            const res = await axios.put(`https://assignment10-0.vercel.app/vehicle/${id}`, vehicleData, { withCredentials: true });
            if (res.data.modifiedCount > 0) {
                toast.success('Vehicle Updated Successfully');
                navigate('/my-vehicles');
            } else {
                toast("No changes made");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">Update Vehicle</h2>
            <div className="card bg-base-100 shadow-2xl">
                <form onSubmit={handleUpdateVehicle} className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">Vehicle Name</label>
                            <input type="text" name="vehicleName" defaultValue={vehicle.vehicleName} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Category</label>
                            <select name="category" defaultValue={vehicle.category} className="select select-bordered" required>
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
                            <input type="number" name="pricePerDay" defaultValue={vehicle.pricePerDay} className="input input-bordered" required min="0" />
                        </div>
                        <div className="form-control">
                            <label className="label">Location</label>
                            <input type="text" name="location" defaultValue={vehicle.location} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Owner Name</label>
                            <input type="text" name="ownerName" defaultValue={vehicle.ownerName} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Owner Email</label>
                            <input type="email" name="userEmail" defaultValue={user?.email} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">Cover Image URL</label>
                            <input type="url" name="coverImage" defaultValue={vehicle.coverImage} className="input input-bordered" required />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">Description</label>
                            <textarea name="description" defaultValue={vehicle.description} className="textarea textarea-bordered h-24" required></textarea>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update Vehicle</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVehicle;

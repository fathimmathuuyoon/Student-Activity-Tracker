import { useState } from "react";
import axios from "axios";

function ActivityForm({
    fetchActivities,
    fetchSummary
}) {

    const [formData, setFormData] =
        useState({
            name: "",
            activity: "",
            hours: "",
        });

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.activity ||
            !formData.hours
        ) {

            setError(
                "All fields are required"
            );

            return;
        }

        if (formData.hours <= 0) {

            setError(
                "Hours must be greater than 0"
            );

            return;
        }

        try {

            setLoading(true);

            await axios.post(
                "http://127.0.0.1:8000/api/activities/add/",
                formData
            );

            setFormData({
                name: "",
                activity: "",
                hours: "",
            });

            setError("");

            fetchActivities();
            fetchSummary();

        } catch (error) {

            console.log(error);

            setError(
                "Something went wrong"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            <h2>Add Activity</h2>
            <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
            />
            <input
                type="text"
                name="activity"
                placeholder="Activity"
                value={formData.activity}
                onChange={handleChange}
                disabled={loading}
            />
            <input
                type="number"
                name="hours"
                placeholder="Hours"
                value={formData.hours}
                onChange={handleChange}
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Adding..."
                    : "Add Activity"}
            </button>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}
        </form>
    );
}

export default ActivityForm;
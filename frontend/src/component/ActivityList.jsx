import { useState } from "react";
import axios from "axios";

function ActivityList({
    activities,
    fetchActivities,
    fetchSummary,
}) {

    const [deleteLoading, setDeleteLoading] = useState(null);

    const handleDelete = async (id) => {

        try {

            setDeleteLoading(id);

            await axios.delete(
                `http://127.0.0.1:8000/api/activities/delete/${id}/`
            );

            fetchActivities();
            fetchSummary();

        } catch (error) {

            console.log(error);

        } finally {

            setDeleteLoading(null);
        }
    };

    return (
        <div className="card">
            <h2>Activities</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Activity</th>
                        <th>Hours</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.activity}</td>
                            <td>{item.hours}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(item.id)
                                    }
                                    disabled={
                                        deleteLoading === item.id
                                    }
                                >
                                    {deleteLoading === item.id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ActivityList;
function Summary({
    summary,
    loading
}) {

    if (loading) {
        return (
            <div className="summary">
                <p>Loading summary...</p>
            </div>
        );
    }

    return (
        <div className="summary">
            <div className="summary-card">
                <h3>Total Entries</h3>
                <p>{summary.total_entries}</p>
            </div>

            <div className="summary-card">
                <h3>Total Hours</h3>
                <p>{summary.total_hours}</p>
            </div>

            <div className="summary-card">
                <h3>Most Active User</h3>
                <p>{summary.most_active_user}</p>
            </div>
        </div>
    );
}

export default Summary;
import { useEffect, useState } from "react";
import axios from "axios";
import ActivityForm from "./component/ActivityForm";
import ActivityList from "./component/ActivityList";
import Summary from "./component/Summary";
import "./App.css";

function App() {

  const [activities, setActivities] = useState([]);

  const [summary, setSummary] = useState({});

  const [activitiesLoading, setActivitiesLoading] = useState(false);

  const [summaryLoading, setSummaryLoading] = useState(false);

  const fetchActivities = async () => {

    try {

      setActivitiesLoading(true);

      const response = await axios.get(
        "http://127.0.0.1:8000/api/activities/"
      );

      setActivities(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setActivitiesLoading(false);
    }
  };

  const fetchSummary = async () => {

    try {

      setSummaryLoading(true);

      const response = await axios.get(
        "http://127.0.0.1:8000/api/summary/"
      );

      setSummary(response.data);

    } catch (error) {

      console.log(error);

    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchSummary();
  }, []);

  return (
    <div className="container">

      <h1>Student Activity Tracker</h1>

      <ActivityForm
        fetchActivities={fetchActivities}
        fetchSummary={fetchSummary}
      />
      <Summary
        summary={summary}
        loading={summaryLoading}
      />
      {activitiesLoading ? (
        <p className="loading-text">
          Loading activities...
        </p>
      ) : (
        <ActivityList
          activities={activities}
          fetchActivities={fetchActivities}
          fetchSummary={fetchSummary}
        />
      )}
    </div>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { toast } from "react-toastify";

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    if (isLoading) return; // prevent double clicks / DDOS attempts

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/email-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contact submissions");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setSubmissions(data.data.users || []);
      toast.success("Fetched All Users");
    } catch (err) {
      setError(err.message || "An error occurred while fetching data");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="fetch-button" onClick={fetchSubmissions} disabled={isLoading}>
          {isLoading ? "Loading..." : "Fetch Contact Submissions"}
        </button>
      </div>

      {isLoading && <p>Loading submissions...</p>}
      {error && <div className="admin-error">{error}</div>}

      {!isLoading && !error && (
        <div className="submissions-container">
          {submissions.length === 0 ? (
            <p className="no-data">No submissions found.</p>
          ) : (
            <div className="table-responsive">
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index}>
                      <td>{submission.name}</td>
                      <td>
                        <a href={`mailto:${submission.email}`}>{submission.email}</a>
                      </td>
                      <td>
                        <div className="message-cell">{submission.message}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;

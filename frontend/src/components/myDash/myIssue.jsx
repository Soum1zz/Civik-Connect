import { useEffect, useState } from 'react';
import '../../styles/Citizen.css'
import { FaLeaf, FaPlus } from 'react-icons/fa';
import { getAllIssues } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

const statusClassMap = {
  OPEN: 'open',
  UNDER_REVIEW: 'review',
  VERIFIED: 'verified',
  IN_PROGRESS: 'progress',
  RESOLVED: 'completed',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

function getStatusClass(status = '') {
  return statusClassMap[status.toUpperCase()] || 'open';
}

function formatStatus(status = 'OPEN') {
  return status.replaceAll('_', ' ');
}

function formatIssueTime(value) {
  if (!value) return 'Recently';

  const createdDate = new Date(value);
  if (Number.isNaN(createdDate.getTime())) return value;

  const diffDays = Math.max(0, Math.floor((Date.now() - createdDate.getTime()) / 86400000));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

function getStatusMetrics(issues) {
  return issues.reduce(
    (metrics, issue) => {
      const status = issue.status?.toUpperCase();

      if (status === 'RESOLVED') {
        metrics.resolved += 1;
      } else if (status === 'REJECTED') {
        metrics.rejected += 1;
      } else {
        metrics.open += 1;
      }

      return metrics;
    },
    { open: 0, resolved: 0, rejected: 0 }
  );
}

export default function myIssues({user}) {

  const navigate= useNavigate()

  const [myIssues, setMyIssues]= useState([])
  const statusMetrics = getStatusMetrics(myIssues);

  useEffect(()=>{
    const getMyIssues= async()=>{

      try{
      const res = await getAllIssues();

      console.log(res.data);
      setMyIssues(res.data);

      }catch(e){
        console.log(e);
      }
    }

    getMyIssues()
  },[])
  return (
    <div className="citizen-main">
        <header className="citizen-header">
          <div>
            <h1>Welcome Back</h1>
          </div>
          <div className="citizen-user">
            <span>Hello, {user?.name.split(" ")[0]}</span>
            <div className="avatar">S</div>
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="quick-card">
            <h2>Let Us Solve Your Problems</h2>
            <a className="report-action" href="/issue-form">
              <FaPlus /> Report an Issue
            </a>
          </section>

          <section className="overview-card">
            <h2>My Issues Overview</h2>
            <div className="status-metrics">
              <div>
                <strong>{statusMetrics.open}</strong>
                <span>Open</span>
              </div>
              <div>
                <strong>{statusMetrics.resolved}</strong>
                <span>Resolved</span>
              </div>
              <div>
                <strong>{statusMetrics.rejected}</strong>
                <span>Rejected</span>
              </div>
            </div>
          </section>
        </div>

        <section className="activity-card">
          <h2>Your Issues</h2>
          <div className="activity-list"
          
          >
            {myIssues.map((issue) => (
              <article key={issue.issueId}
              onClick={navigate(`/issue-details/${issue.issueId}`)}
              >
                <div className={`activity-icon ${getStatusClass(issue.status)}`}>
                  <FaLeaf />
                </div>
                <div>
                  <h3>{issue.title}</h3>
                </div>
                <span className={`issue-chip ${getStatusClass(issue.status)}`}>
                  {formatStatus(issue.status)}
                </span>
                <time>{formatIssueTime(issue.time)}</time>
              </article>
            ))}
          </div>

        </section>
    </div>
  );
}

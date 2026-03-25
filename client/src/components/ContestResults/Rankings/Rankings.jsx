import React from 'react';
import './Rankings.scss';
import { FaDownload } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa6';
import { FaMedal } from 'react-icons/fa';

const Rankings = () => {
  return (
    <div className="section-rankings">
      <div className="rankings-header">
        <h3>Final Rankings</h3>
        <div className="action-button">
          <FaDownload />
          Export
        </div>
      </div>

      <table className="rankings-table">
        <tbody>
          <tr className="gray-background">
            <th>RANK</th>
            <th>PARTICIPANT</th>
            <th>SCORE</th>
            <th>PROBLEMS SOLVED</th>
            <th>TIME</th>
          </tr>
          <tr className="gray-background">
            <td>
              <div className="rank">
                <FaCrown />
                <p>1st</p>
              </div>
            </td>
            <td>
              <div className="participant">
                <div className="user-profile"></div>
                <div>
                  <p>John Doe</p>
                  <p>@john_doe</p>
                </div>
              </div>
            </td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
          <tr className="gray-background">
            <td>
              <div className="rank rank-secondary">
                <div className="rank-icon">
                  <FaMedal />
                </div>
                <p>2nd</p>
              </div>
            </td>
            <td>
              <div className="participant">
                <div className="user-profile"></div>
                <div>
                  <p>John Doe</p>
                  <p>@john_doe</p>
                </div>
              </div>
            </td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
          <tr className="gray-background">
            <td>
              <div className="rank rank-secondary">
                <div className="rank-icon">
                  <FaMedal />
                </div>
                <p>3rd</p>
              </div>
            </td>
            <td>
              <div className="participant">
                <div className="user-profile"></div>
                <div>
                  <p>John Doe</p>
                  <p>@john_doe</p>
                </div>
              </div>
            </td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
          <tr>
            <td>4th</td>
            <td>
              <div className="participant">
                <div className="user-profile"></div>
                <div>
                  <p>John Doe</p>
                  <p>@john_doe</p>
                </div>
              </div>
            </td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
          <tr>
            <td>5th</td>
            <td>
              <div className="participant">
                <div className="user-profile"></div>
                <div>
                  <p>John Doe</p>
                  <p>@john_doe</p>
                </div>
              </div>
            </td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;

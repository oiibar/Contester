import React from 'react';
import './Rankings.scss';

const Rankings = () => {
  return (
    <div className="section">
      <div>
        <h3>Final Rankings</h3>
        <button>Export</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>RANK</th>
            <th>PARTICIPANT</th>
            <th>SCORE</th>
            <th>PROBLEMS SOLVED</th>
            <th>TIME</th>
          </tr>
          <tr>
            <td>1st</td>
            <td>John Doe</td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
          <tr>
            <td>2nd</td>
            <td>John Doe</td>
            <td>1005</td>
            <td>6/7</td>
            <td>2h 34m</td>
          </tr>
          <tr>
            <td>3rd</td>
            <td>John Doe</td>
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

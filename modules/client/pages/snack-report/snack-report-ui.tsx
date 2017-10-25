import * as React from "react";

export const SnackReportUI: React.SFC = props => {
  return (
    <div className="snack-report">
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Votes</th>
            <th>Snack</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>8</td>
            <td>Cheese snack</td>
            <td />
          </tr>
          <tr>
            <td>2.</td>
            <td>7</td>
            <td>Guacamole</td>
            <td>Gluten-free, Vegan</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

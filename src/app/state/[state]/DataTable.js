import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa"; // Import the calendar icon from Font Awesome
import styles from './state.module.css';

const DataTable = ({ data }) => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });
      setDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.tableContainer}>
      <h6 className={styles.h6}>
        <FaCalendarAlt style={{ marginRight: "8px" }} /> {/* Calendar icon */}
        Last Updated: {dateTime}
      </h6>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Variety</th>
            <th>Min Price / Quintal</th>
            <th>Max Price / Quintal</th>
            <th>Modal Price / Quintal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Variety}</td>
              <td>{row.Min_Price}</td>
              <td>{row.Max_Price}</td>
              <td>{row.Modal_Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

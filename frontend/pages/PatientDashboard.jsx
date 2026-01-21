import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PatientDashboard() {
  const [data, setData] = useState([]);
  const [heartRate, setHeartRate] = useState(72);
  const [status, setStatus] = useState("Normal");
  const [alert, setAlert] = useState(false);

  const anomalyCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulated heart rate
      const hr = 55 + Math.floor(Math.random() * 60);
      setHeartRate(hr);

      // ECG signal
      setData((prev) => {
        const point = {
          time: prev.length,
          ecg: Math.sin(prev.length / 5) * 40 + hr + Math.random() * 5,
        };
        return [...prev.slice(-50), point];
      });

      // Detection logic
      if (hr < 55 || hr > 100) {
        anomalyCounter.current += 1;
        setStatus(hr > 100 ? "⚠️ Tachycardia" : "⚠️ Bradycardia");
      } else {
        anomalyCounter.current = Math.max(0, anomalyCounter.current - 1);
        setStatus("Normal");
      }

      // Persistent anomaly alert
      if (anomalyCounter.current >= 3) {
        setAlert(true);
      } else {
        setAlert(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Dashboard</h1>

      <h2>❤️ Heart Rate: {heartRate} bpm</h2>
      <h3>Status: {status}</h3>

      {alert && (
        <div style={styles.alert}>
          🚨 Critical Alert: Frequent Heart Anomaly Detected!
        </div>
      )}

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ecg" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles = {
  alert: {
    backgroundColor: "#ffdddd",
    color: "#900",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    fontWeight: "bold",
  },
};

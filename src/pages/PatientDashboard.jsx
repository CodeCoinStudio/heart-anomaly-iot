import { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PatientDashboard() {
  const [ecgData, setEcgData] = useState([]);
  const [heartRate, setHeartRate] = useState(72);
  const [status, setStatus] = useState("Normal");
  const [alert, setAlert] = useState("");

  // Store anomaly history (sliding window)
  const anomalyCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulated ECG
      setEcgData((prev) => {
        const next = {
          t: prev.length,
          v: Math.sin(prev.length / 5) * 40 + 70 + Math.random() * 8,
        };
        return [...prev.slice(-40), next];
      });

      // Simulated HR
      const hr = 55 + Math.floor(Math.random() * 70);
      setHeartRate(hr);

      // ----- LAYER 1: Threshold detection -----
      let abnormal = hr < 50 || hr > 110;

      if (abnormal) {
        anomalyCount.current += 1;
      } else {
        anomalyCount.current = Math.max(0, anomalyCount.current - 1);
      }

      // ----- LAYER 2: Frequency-based alert -----
      if (anomalyCount.current >= 3) {
        setStatus("⚠️ Critical Anomaly");
        setAlert("Repeated abnormal heart rhythm detected!");
      } else if (abnormal) {
        setStatus("⚠️ Mild Anomaly");
        setAlert("Abnormal heart rate detected");
      } else {
        setStatus("Normal");
        setAlert("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Dashboard</h1>

      <h3>❤️ Heart Rate: {heartRate} bpm</h3>
      <h3>Status: {status}</h3>
      {alert && <p style={{ color: "red" }}>{alert}</p>}

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={ecgData}>
            <XAxis hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="v"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

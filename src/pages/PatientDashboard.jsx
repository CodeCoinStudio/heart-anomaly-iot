export default function PatientDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Dashboard</h1>
      <p>Realtime ECG & Heart Rate will appear here</p>

      <ul>
        <li>❤️ Heart Rate: -- bpm</li>
        <li>📈 ECG Signal: --</li>
        <li>⚠️ Anomaly Status: Normal</li>
      </ul>
    </div>
  );
}

import React from "react";
import SettingsForm from "./components/SettingsForm";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <section aria-labelledby="app-title">
        <h1 id="app-title">Account settings</h1>
        <p>Keep your profile information up to date.</p>
      </section>

      <section aria-labelledby="settings-heading">
        <SettingsForm />
      </section>
    </main>
  );
}

export default App;

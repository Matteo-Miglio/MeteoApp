import "../App.css";

export default function Settings() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-500 via-blue-600 to-indigo-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="glass-card p-6 rounded-3xl">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <i className="fa-solid fa-gear text-sky-200"></i> Impostazioni
          </h1>
          <p className="text-sm opacity-80 mt-1">
            Sezione impostazioni in fase di sviluppo.
          </p>
        </header>
      </div>
    </div>
  );
}
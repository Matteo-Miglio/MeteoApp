import { Link } from "react-router";
import "../App.css";

export default function NavBar() {
  return (
    <div className="navbar bg-slate-950/85 backdrop-blur-xl border-b-2 border-sky-400/30 px-4 md:px-8 text-white sticky top-0 z-50 shadow-2xl">

      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl font-black tracking-wide text-white hover:bg-slate-800/80 border border-slate-700/50 rounded-xl gap-3 px-4 py-2 transition-all duration-200"
        >
          <i className="fa-solid fa-cloud-sun text-2xl icon-sereno-poco filter drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]"></i>
          
          <span className="text-white font-extrabold text-lg tracking-wider">
            MeteoApp<span className="text-sky-400">LO</span>
          </span>
        </Link>
      </div>

      <div className="flex-none">
        <Link
          to="/settings"
          aria-label="Impostazioni"
          className="btn btn-square bg-slate-800/90 hover:bg-sky-500 border-2 border-slate-700 hover:border-sky-300 text-amber-400 hover:text-white transition-all duration-200 rounded-xl shadow-md group"
        >
          <i className="fa-solid fa-gear text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
        </Link>
      </div>

    </div>
  );
}
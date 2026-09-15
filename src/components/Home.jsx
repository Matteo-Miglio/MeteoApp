import { useState, useEffect } from "react";
import "../App.css";

const getWmoDetails = (code) => {
  const wmoMap = {
    0: { label: "Sereno", icon: "fa-solid fa-sun icon-sereno" },
    1: { label: "Prevalentemente sereno", icon: "fa-solid fa-cloud-sun icon-sereno-poco" },
    2: { label: "Parzialmente nuvoloso", icon: "fa-solid fa-cloud-sun icon-nuvoloso" },
    3: { label: "Coperto", icon: "fa-solid fa-cloud icon-coperto" },
    45: { label: "Nebbia", icon: "fa-solid fa-smog icon-nebbia" },
    48: { label: "Nebbia con brina", icon: "fa-solid fa-smog icon-brina" },
    51: { label: "Pioggerella leggera", icon: "fa-solid fa-cloud-sun-rain icon-pioggerella-1" },
    53: { label: "Pioggerella moderata", icon: "fa-solid fa-cloud-rain icon-pioggerella-2" },
    55: { label: "Pioggerella intensa", icon: "fa-solid fa-cloud-showers-heavy icon-pioggerella-3" },
    61: { label: "Pioggia leggera", icon: "fa-solid fa-cloud-rain icon-pioggia-1" },
    63: { label: "Pioggia moderata", icon: "fa-solid fa-cloud-showers-heavy icon-pioggia-2" },
    65: { label: "Pioggia forte", icon: "fa-solid fa-cloud-showers-water icon-pioggia-3" },
    71: { label: "Neve leggera", icon: "fa-solid fa-snowflake icon-neve-1" },
    73: { label: "Neve moderata", icon: "fa-solid fa-snowflake icon-neve-2" },
    75: { label: "Neve forte", icon: "fa-regular fa-snowflake icon-neve-3" },
    80: { label: "Rovesci di pioggia", icon: "fa-solid fa-cloud-showers-heavy icon-rovesci" },
    95: { label: "Temporale", icon: "fa-solid fa-cloud-bolt icon-temporale" }
  };
  return wmoMap[code] || { label: "Variabile", icon: "fa-solid fa-cloud-sun icon-sereno-poco" };
};

export default function Home() {
  const [meteoData, setMeteoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const formatTemp = (celsiusVal) => {
    const unit = localStorage.getItem("weather_unit") || "celsius";
    if (unit === "fahrenheit") {
      const fahrenheit = Math.round((celsiusVal * 9) / 5 + 32);
      return `${fahrenheit}°F`;
    }
    return `${Math.round(celsiusVal)}°C`;
  };

  const fetchMeteo = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    
    const latitude = 45.3139;
    const longitude = 9.5032;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,uv_index,visibility&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe/Rome`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Errore Server: ${res.status}`);
      const data = await res.json();
      setMeteoData(data);
    } catch (err) {
      console.error("Errore fetch meteo:", err);
      setError("Impossibile caricare i dati meteo.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMeteo();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-xl">Caricamento meteo Lodi...</div>;
  if (error) return <div className="min-h-screen bg-slate-900 text-red-400 flex items-center justify-center text-xl">{error}</div>;

  const currentWeather = getWmoDetails(meteoData.current.weather_code);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-sky-500 via-blue-600 to-indigo-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 bg-blue-900/50 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fa-solid fa-location-dot text-rose-400"></i> Lodi (LO)
              </span>
              
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <h1 className="text-6xl sm:text-7xl font-light tracking-tight">
                  {formatTemp(meteoData.current.temperature_2m)}
                </h1>
                
                <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 max-w-full">
                  <i className={`${currentWeather.icon} text-3xl shrink-0`}></i>
                  <span className="text-base sm:text-lg font-medium leading-tight">
                    {currentWeather.label}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm opacity-80 pt-1">
                Max: {formatTemp(meteoData.daily.temperature_2m_max[0])} • Min: {formatTemp(meteoData.daily.temperature_2m_min[0])} • Percepita {formatTemp(meteoData.current.apparent_temperature)}
              </p>
            </div>

            <button 
              onClick={() => fetchMeteo(true)}
              disabled={refreshing}
              className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer border border-white/20 shrink-0"
            >
              <i className={`fa-solid fa-rotate-right ${refreshing ? "animate-spin" : ""}`}></i>
              {refreshing ? "Aggiornamento..." : "Aggiorna Dati"}
            </button>

          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6 w-full min-w-0">
            
            <section className="glass-card p-5 rounded-3xl w-full min-w-0">
              <h2 className="text-xs font-semibold uppercase opacity-70 mb-4 tracking-wider">Previsione Prossime Ore</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar w-full">
                {meteoData.hourly.time.slice(0, 24).map((timeStr, index) => {
                  const hour = new Date(timeStr).getHours().toString().padStart(2, '0');
                  const hourWmo = getWmoDetails(meteoData.hourly.weather_code[index]);
                  return (
                    <div key={timeStr} className="glass-item-hourly flex flex-col items-center shrink-0">
                      <span className="text-xs opacity-75">{hour}:00</span>
                      <i className={`${hourWmo.icon} text-2xl my-3`}></i>
                      <span className="font-semibold text-sm">{formatTemp(meteoData.hourly.temperature_2m[index])}</span>
                      <span className="text-[10px] text-sky-200 mt-1 flex items-center gap-1">
                        <i className="fa-solid fa-droplet text-[9px] icon-pioggerella-1"></i>
                        {meteoData.hourly.precipitation_probability[index]}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="glass-card-sm">
                <span className="text-xs opacity-75 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-sun icon-sereno"></i> Indice UV
                </span>
                <p className="text-2xl font-bold">{meteoData.current.uv_index}</p>
              </div>

              <div className="glass-card-sm">
                <span className="text-xs opacity-75 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-droplet icon-pioggerella-1"></i> Umidità
                </span>
                <p className="text-2xl font-bold">{meteoData.current.relative_humidity_2m}%</p>
              </div>

              <div className="glass-card-sm">
                <span className="text-xs opacity-75 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-wind text-teal-300"></i> Vento
                </span>
                <p className="text-2xl font-bold">{meteoData.current.wind_speed_10m} <span className="text-xs font-normal">km/h</span></p>
              </div>

              <div className="glass-card-sm">
                <span className="text-xs opacity-75 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-gauge text-indigo-300"></i> Pressione
                </span>
                <p className="text-2xl font-bold">{Math.round(meteoData.current.surface_pressure)} <span className="text-xs font-normal">hPa</span></p>
              </div>

              <div className="glass-card-sm">
                <span className="text-xs opacity-75 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-eye text-emerald-300"></i> Visibilità
                </span>
                <p className="text-2xl font-bold">{(meteoData.current.visibility / 1000).toFixed(1)} <span className="text-xs font-normal">km</span></p>
              </div>

              <div className="glass-card-sm">
                <span className="text-xs opacity-75 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-mountain-sun icon-sereno-poco"></i> Alba / Tramonto
                </span>
                <p className="text-xs font-medium flex items-center gap-1 mt-1">
                  <i className="fa-solid fa-sun icon-sereno"></i> {meteoData.daily.sunrise[0].split("T")[1]}
                </p>
                <p className="text-xs font-medium mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-moon text-indigo-200"></i> {meteoData.daily.sunset[0].split("T")[1]}
                </p>
              </div>
            </section>

          </div>

          <section className="glass-card p-5 rounded-3xl flex flex-col justify-between w-full">
            <div>
              <h2 className="text-xs font-semibold uppercase opacity-70 mb-4 tracking-wider">
                Previsioni per i prossimi {meteoData.daily.time.length} giorni
              </h2>

              <div className="flex flex-col divide-y divide-white/10">
                {meteoData.daily.time.map((giornoDate, index) => {
                  const dayWmo = getWmoDetails(meteoData.daily.weather_code[index]);
                  const dateObj = new Date(giornoDate);
                  
                  const dayName = index === 0 
                    ? "Oggi" 
                    : dateObj.toLocaleDateString("it-IT", { weekday: "short" });

                  return (
                    <div key={giornoDate} className="flex items-center justify-between py-3 text-sm gap-2">
                      <span className="w-14 font-medium capitalize shrink-0">{dayName}</span>
                      
                      <div className="flex items-center gap-1 w-12 shrink-0">
                        <i className="fa-solid fa-droplet text-xs icon-pioggerella-1"></i>
                        <span className="text-xs opacity-80">{meteoData.daily.precipitation_probability_max[index]}%</span>
                      </div>

                      <div className="w-8 text-center shrink-0">
                        <i className={`${dayWmo.icon} text-lg`}></i>
                      </div>

                      <div className="font-semibold text-right shrink-0">
                        <span>{formatTemp(meteoData.daily.temperature_2m_max[index])}</span>
                        <span className="opacity-40 ml-2">{formatTemp(meteoData.daily.temperature_2m_min[index])}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
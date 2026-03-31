"use client";

import { useState, useEffect } from "react";
import { getAllJainEvents, HINDU_MONTHS, getKalyanakTypes, type JainEvent } from "@/data/jain-events";
import { TIRTHANKARAS } from "@/data/tirthankaras";

type Filter = "all" | "panch_kalyanak" | "jain_parv";

const STORAGE_KEY = "pramanik_jain_events";

export default function EventsPage() {
  const [events, setEvents] = useState<JainEvent[]>([]);
  const [filter, setFilter] = useState<Filter>("jain_parv");
  const [search, setSearch] = useState("");
  const [selectedTirthankara, setSelectedTirthankara] = useState<number>(-1);
  const [editingEvent, setEditingEvent] = useState<JainEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch {
        setEvents(getAllJainEvents());
      }
    } else {
      setEvents(getAllJainEvents());
    }
  }, []);

  // Save to localStorage on change
  function saveEvents(updated: JainEvent[]) {
    setEvents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function handleUpdate(updatedEvent: JainEvent) {
    saveEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setEditingEvent(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    saveEvents(events.filter((e) => e.id !== id));
  }

  function handleAdd(newEvent: JainEvent) {
    saveEvents([...events, newEvent]);
    setShowAddModal(false);
  }

  function handleReset() {
    if (!confirm("Reset all events to defaults? Your edits will be lost.")) return;
    const defaults = getAllJainEvents();
    saveEvents(defaults);
  }

  const filtered = events.filter((e) => {
    if (filter !== "all" && e.category !== filter) return false;
    if (selectedTirthankara >= 0 && e.tirthankaraNumber !== selectedTirthankara) return false;
    if (search) {
      const s = search.toLowerCase();
      return e.nameHi.includes(s) || e.nameEn.toLowerCase().includes(s) || e.id.includes(s);
    }
    return true;
  });

  const parvCount = events.filter((e) => e.category === "jain_parv").length;
  const pkCount = events.filter((e) => e.category === "panch_kalyanak").length;
  const withRules = events.filter((e) => e.hinduMonth && e.hinduTithi > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Jain Events Master</h1>
          <p className="mt-1 text-sm text-gray-400">
            {events.length} events ({parvCount} Jain Parv + {pkCount} Panch Kalyanak) &middot; {withRules} with tithi rules
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAddModal(true)} className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
            + Add Event
          </button>
          <button onClick={handleReset} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-red-400 hover:border-red-500">
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-gray-700 overflow-hidden">
          {([["all", "All"], ["jain_parv", `Jain Parv (${parvCount})`], ["panch_kalyanak", `Panch Kalyanak (${pkCount})`]] as [Filter, string][]).map(([key, label]) => (
            <button key={key} onClick={() => { setFilter(key); setSelectedTirthankara(-1); }}
              className={`px-4 py-2 text-sm ${filter === key ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>

        {filter === "panch_kalyanak" && (
          <select value={selectedTirthankara} onChange={(e) => setSelectedTirthankara(parseInt(e.target.value))}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
            <option value={-1}>All Tirthankaras</option>
            {TIRTHANKARAS.map((t) => (
              <option key={t.number} value={t.number}>{t.number}. {t.nameHi} ({t.nameEn})</option>
            ))}
          </select>
        )}

        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search event..." className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none w-64" />
      </div>

      {/* Tirthankara Grid */}
      {filter === "panch_kalyanak" && selectedTirthankara < 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {TIRTHANKARAS.map((t) => (
            <button key={t.number} onClick={() => setSelectedTirthankara(t.number)}
              className="rounded-lg border border-gray-800 bg-gray-900 p-2 text-center hover:border-orange-500/50">
              <div className="text-lg font-bold" style={{ color: t.colorTheme }}>{t.number}</div>
              <div className="text-[10px] text-gray-300 truncate">{t.nameHi}</div>
            </button>
          ))}
        </div>
      )}

      {/* Events Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-800 bg-gray-900">
            <tr>
              <th className="px-3 py-2.5 text-left font-medium text-gray-400">Event</th>
              <th className="px-3 py-2.5 text-left font-medium text-gray-400">Category</th>
              <th className="px-3 py-2.5 text-left font-medium text-gray-400">Tithi Rule</th>
              <th className="px-3 py-2.5 text-left font-medium text-gray-400">Tirthankara</th>
              <th className="px-3 py-2.5 text-right font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filtered.map((event) => {
              const tirthankara = event.tirthankaraNumber ? TIRTHANKARAS.find((t) => t.number === event.tirthankaraNumber) : null;
              const monthHi = HINDU_MONTHS.find((m) => m.en === event.hinduMonth)?.hi || "";
              const pakshaHi = event.hinduPaksha === "Shukla" ? "शुक्ल" : event.hinduPaksha === "Krishna" ? "कृष्ण" : "";
              return (
                <tr key={event.id} className="hover:bg-gray-900/50">
                  <td className="px-3 py-2">
                    <div className="font-medium">{event.nameHi}</div>
                    <div className="text-xs text-gray-500">{event.nameEn}</div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${event.category === "jain_parv" ? "bg-purple-500/20 text-purple-400" : "bg-orange-500/20 text-orange-400"}`}>
                      {event.category === "jain_parv" ? "Jain Parv" : "Panch Kalyanak"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {event.hinduMonth && event.hinduTithi > 0 ? (
                      <span className="text-green-400">{monthHi} {pakshaHi} {event.hinduTithi}</span>
                    ) : (
                      <span className="text-yellow-500">No rule — add manually</span>
                    )}
                    {event.gregorianOverrides && Object.keys(event.gregorianOverrides).length > 0 && (
                      <div className="text-blue-400 mt-0.5">
                        Override: {Object.entries(event.gregorianOverrides).map(([y, d]) => `${y}: ${d}`).join(", ")}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {tirthankara ? (
                      <span style={{ color: tirthankara.colorTheme }}>{tirthankara.number}. {tirthankara.nameHi}</span>
                    ) : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditingEvent(event)} className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-800 hover:text-orange-400">Edit</button>
                      <button onClick={() => handleDelete(event.id)} className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-800 hover:text-red-400">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <EventModal event={editingEvent} onSave={handleUpdate} onClose={() => setEditingEvent(null)} title="Edit Event" />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <EventModal event={null} onSave={handleAdd} onClose={() => setShowAddModal(false)} title="Add New Event" />
      )}
    </div>
  );
}

function EventModal({
  event,
  onSave,
  onClose,
  title,
}: {
  event: JainEvent | null;
  onSave: (e: JainEvent) => void;
  onClose: () => void;
  title: string;
}) {
  const kalyanakTypes = getKalyanakTypes();
  const [form, setForm] = useState<JainEvent>(
    event || {
      id: `custom-${Date.now()}`,
      category: "jain_parv",
      tirthankaraNumber: null,
      kalyanakType: null,
      nameHi: "",
      nameEn: "",
      hinduMonth: "",
      hinduPaksha: "",
      hinduTithi: 0,
      colorTheme: "#D4AF37",
      isActive: true,
      gregorianOverrides: {},
    }
  );

  const [overrideYear, setOverrideYear] = useState("");
  const [overrideDate, setOverrideDate] = useState("");

  function addOverride() {
    if (!overrideYear || !overrideDate) return;
    setForm({
      ...form,
      gregorianOverrides: { ...(form.gregorianOverrides || {}), [overrideYear]: overrideDate },
    });
    setOverrideYear("");
    setOverrideDate("");
  }

  function removeOverride(year: string) {
    const overrides = { ...(form.gregorianOverrides || {}) };
    delete overrides[year];
    setForm({ ...form, gregorianOverrides: overrides });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-orange-500">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        <div className="space-y-3">
          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Name (Hindi)</label>
              <input value={form.nameHi} onChange={(e) => setForm({ ...form, nameHi: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Name (English)</label>
              <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as JainEvent["category"] })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                <option value="jain_parv">Jain Parv</option>
                <option value="panch_kalyanak">Panch Kalyanak</option>
              </select>
            </div>
            {form.category === "panch_kalyanak" && (
              <div>
                <label className="mb-1 block text-xs text-gray-400">Kalyanak Type</label>
                <select value={form.kalyanakType || ""} onChange={(e) => setForm({ ...form, kalyanakType: e.target.value || null })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  <option value="">Select...</option>
                  {kalyanakTypes.map((k) => <option key={k.key} value={k.key}>{k.hi} ({k.en})</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Tirthankara */}
          {form.category === "panch_kalyanak" && (
            <div>
              <label className="mb-1 block text-xs text-gray-400">Tirthankara</label>
              <select value={form.tirthankaraNumber || ""} onChange={(e) => setForm({ ...form, tirthankaraNumber: parseInt(e.target.value) || null })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                <option value="">Select...</option>
                {TIRTHANKARAS.map((t) => <option key={t.number} value={t.number}>{t.number}. {t.nameHi} ({t.nameEn})</option>)}
              </select>
            </div>
          )}

          {/* Tithi Rule */}
          <div className="rounded-lg border border-gray-700 p-3">
            <label className="mb-2 block text-xs font-medium text-gray-300">Tithi Rule (for auto-matching)</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-[10px] text-gray-500">Hindu Month</label>
                <select value={form.hinduMonth} onChange={(e) => setForm({ ...form, hinduMonth: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm focus:border-orange-500 focus:outline-none">
                  <option value="">None</option>
                  {HINDU_MONTHS.map((m) => <option key={m.en} value={m.en}>{m.hi} ({m.en})</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] text-gray-500">Paksha</label>
                <select value={form.hinduPaksha} onChange={(e) => setForm({ ...form, hinduPaksha: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm focus:border-orange-500 focus:outline-none">
                  <option value="">None</option>
                  <option value="Shukla">शुक्ल (Shukla)</option>
                  <option value="Krishna">कृष्ण (Krishna)</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] text-gray-500">Tithi (1-15)</label>
                <input type="number" min={0} max={15} value={form.hinduTithi} onChange={(e) => setForm({ ...form, hinduTithi: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm focus:border-orange-500 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Gregorian Overrides */}
          <div className="rounded-lg border border-gray-700 p-3">
            <label className="mb-2 block text-xs font-medium text-gray-300">
              Gregorian Date Overrides (when auto-computation is wrong)
            </label>
            {form.gregorianOverrides && Object.entries(form.gregorianOverrides).length > 0 && (
              <div className="mb-2 space-y-1">
                {Object.entries(form.gregorianOverrides).map(([year, date]) => (
                  <div key={year} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-400">{year}: {date}</span>
                    <button onClick={() => removeOverride(year)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input type="number" min={2025} max={2035} placeholder="Year" value={overrideYear}
                onChange={(e) => setOverrideYear(e.target.value)}
                className="w-20 rounded-lg border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm focus:border-orange-500 focus:outline-none" />
              <input type="date" value={overrideDate} onChange={(e) => setOverrideDate(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm focus:border-orange-500 focus:outline-none" />
              <button onClick={addOverride} disabled={!overrideYear || !overrideDate}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:opacity-50">
                Add
              </button>
            </div>
          </div>

          {/* Color + Active */}
          <div className="flex items-center gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Color</label>
              <input type="color" value={form.colorTheme} onChange={(e) => setForm({ ...form, colorTheme: e.target.value })} className="h-8 w-12 rounded border-0 bg-transparent" />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-orange-500" />
              Active
            </label>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
          <button onClick={() => onSave(form)} disabled={!form.nameHi}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">Save</button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Plus, Trash2 } from "lucide-react";
import AccountGate from "../AccountGate";
import { createAddress, deleteAddress, editAddress, getMyAddresses } from "../api";

const blankAddress = { recipient: "", phone: "", line1: "", line2: "", city: "", state: "", postalCode: "", country: "IN", isDefault: false };
const responseData = (result) => result?.data?.data;

function AddressesContent() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(blankAddress);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadAddresses = async () => {
    const result = await getMyAddresses();
    if (!result?.success) throw new Error(result?.message || "We couldn't load your addresses.");
    const rows = responseData(result);
    setAddresses(Array.isArray(rows) ? rows : []);
  };

  useEffect(() => {
    let active = true;
    getMyAddresses().then((result) => {
      if (!active) return;
      if (!result?.success) setError(result?.message || "We couldn't load your addresses.");
      else setAddresses(Array.isArray(responseData(result)) ? responseData(result) : []);
    }).catch((requestError) => active && setError(requestError.message || "We couldn't load your addresses.")).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const openNewForm = () => { setForm(blankAddress); setEditingId(null); setError(""); setFormOpen(true); };
  const openEditForm = (address) => { setForm({ ...blankAddress, ...address }); setEditingId(address.id); setError(""); setFormOpen(true); };

  const save = async (event) => {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      const payload = { ...form, isDefault: addresses.length === 0 || form.isDefault };
      const result = editingId ? await editAddress(editingId, payload) : await createAddress(payload);
      if (!result?.success) throw new Error(result?.message || "We couldn't save this address.");
      await loadAddresses();
      setFormOpen(false); setEditingId(null); setNotice("Address saved.");
    } catch (requestError) { setError(requestError.message || "We couldn't save this address."); }
    finally { setBusy(false); }
  };

  const remove = async (id) => {
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await deleteAddress(id);
      if (!result?.success) throw new Error(result?.message || "We couldn't remove this address.");
      setAddresses((current) => current.filter((address) => address.id !== id));
      setNotice("Address removed.");
    } catch (requestError) { setError(requestError.message || "We couldn't remove this address."); }
    finally { setBusy(false); }
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-9 text-[#171717] sm:px-7 sm:py-14">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"><ArrowLeft size={16} /> Back to shopping</Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-[#957b60]">Your account</p><h1 className="mt-2 text-3xl font-medium sm:text-4xl">Saved addresses</h1></div><Link to="/account/orders" className="text-sm underline underline-offset-4">View orders</Link></div>
      {notice && <p role="status" className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</p>}{error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading ? <div className="mt-8 h-40 animate-pulse rounded-2xl bg-neutral-200" aria-label="Loading addresses" /> : <>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">{addresses.map((address) => <article key={address.id} className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="flex items-start gap-3"><MapPin size={19} className="mt-0.5 shrink-0 text-[#957b60]" /><div><h2 className="font-medium">{address.recipient}</h2>{address.isDefault && <span className="mt-1 inline-block rounded-full bg-[#f2eee9] px-2.5 py-1 text-[10px] uppercase tracking-wide text-[#725d4b]">Default address</span>}</div></div><button disabled={busy} onClick={() => remove(address.id)} aria-label={`Delete address for ${address.recipient}`} className="rounded-full p-2 text-neutral-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-40"><Trash2 size={16} /></button></div><p className="mt-4 text-sm leading-6 text-neutral-600">{[address.line1, address.line2, address.city, address.state, address.postalCode].filter(Boolean).join(", ")}</p><p className="mt-1 text-sm text-neutral-600">{address.phone}</p><button disabled={busy} onClick={() => openEditForm(address)} className="mt-4 text-sm font-medium underline underline-offset-4 disabled:opacity-40">Edit address</button></article>)}</div>
        {!addresses.length && !formOpen && <section className="mt-8 rounded-2xl border border-black/10 bg-white px-6 py-12 text-center"><MapPin className="mx-auto text-neutral-400" size={30} /><h2 className="mt-4 text-xl font-medium">No saved addresses</h2><p className="mt-2 text-sm text-neutral-600">Add an address to make checkout faster.</p></section>}
        {!formOpen && <button onClick={openNewForm} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm text-white"><Plus size={16} /> Add address</button>}
        {formOpen && <form onSubmit={save} className="mt-8 rounded-2xl border border-black/10 bg-white p-5 sm:p-7"><h2 className="text-xl font-medium">{editingId ? "Edit address" : "Add an address"}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[["recipient","Full name"],["phone","Phone number"],["line1","Address line 1"],["line2","Address line 2 (optional)"],["city","City"],["state","State"],["postalCode","PIN code"]].map(([name,label]) => <label key={name} className={`text-sm font-medium ${["line1","line2"].includes(name) ? "sm:col-span-2" : ""}`}>{label}<input required={name !== "line2"} value={form[name] || ""} onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-3 font-normal outline-none focus:border-neutral-800" /></label>)}<label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={Boolean(form.isDefault)} onChange={(event) => setForm((current) => ({ ...current, isDefault: event.target.checked }))} className="accent-[#171717]" /> Set as default address</label></div><div className="mt-5 flex gap-3"><button disabled={busy} className="rounded-full bg-[#171717] px-6 py-3 text-sm text-white disabled:opacity-50">{busy ? "Saving…" : "Save address"}</button><button type="button" disabled={busy} onClick={() => { setFormOpen(false); setEditingId(null); setError(""); }} className="rounded-full border border-neutral-300 px-6 py-3 text-sm">Cancel</button></div></form>}
      </>}
    </main>
  );
}

export default function Addresses() {
  return <AccountGate><AddressesContent /></AccountGate>;
}

/**
 * OfferModal.jsx — Formulaire de création / édition d'une offre
 * Props :
 *   isOpen    : boolean
 *   onClose   : () => void
 *   onSubmit  : (offreData) => Promise<{success, message?}>
 *   offre     : offre à modifier (null = création)
 *
 * Données envoyées au POST /api/offres :
 * {
 *   titre, description, quantiteInitiale, prix,
 *   debutRetrait (ISO ou "HH:mm"), finRetrait, lieu
 * }
 */
import  { useState, useEffect } from "react";
import { ShieldAlert, PencilLine, CopyPlus } from "lucide-react";

const INITIAL = {
  titre: "",
  description: "",
  quantiteInitiale: "",
  prix: "",
  debutRetrait: "",
  finRetrait: "",
  lieu: "",
};

const OfferModal = ({ isOpen, onClose, onSubmit, offre = null }) => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pré-remplit si on est en mode édition
  useEffect(() => {
    if (offre) setForm({ ...offre });
    else setForm(INITIAL);
  }, [offre, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation minimale côté client
    if (
      !form.titre ||
      !form.quantiteInitiale ||
      !form.debutRetrait ||
      !form.finRetrait ||
      !form.lieu
    ) {
      setError("Tous les champs obligatoires (*) doivent être remplis.");
      setLoading(false);
      return;
    }

    const result = await onSubmit({
      ...form,
      quantiteInitiale: parseInt(form.quantiteInitiale, 10),
      prix: parseFloat(form.prix) || 0,
    });

    setLoading(false);
    if (result.success) onClose();
    else setError(result.message || "Erreur lors de la sauvegarde");
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #DDE8E2",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 12,
    outline: "none",
    fontFamily: "inherit",
    background: "#FFFFFF",
    color: "#1B4332",
    fontWeight: 500,
    caretColor: "#2D7A4F",
  };
  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    color: "#374151",
    display: "block",
    marginBottom: 4,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.2)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: 380,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1B4332" }}>
            {offre ? <PencilLine size={14} /> : <CopyPlus size={14} />}{" "}
            {offre ? "Modifier l'offre" : "Nouvelle offre"}
          </span>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: 18,
              cursor: "pointer",
              color: "#6B7280",
            }}
          >
            ✕
          </button>
        </div>

        {/* Erreur */}
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              color: "#EF4444",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12,
              marginBottom: 14,
            }}
          >
            <ShieldAlert style={{ marginRight: 8 }} />
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div>
            <label style={labelStyle}>Titre *</label>
            <input
              name="titre"
              value={form.titre}
              onChange={handleChange}
              placeholder="Ex : Plateau repas complet"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Contenu de l'offre…"
              rows={2}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}
          >
            <div>
              <label style={labelStyle}>Quantité *</label>
              <input
                type="number"
                name="quantiteInitiale"
                value={form.quantiteInitiale}
                onChange={handleChange}
                placeholder="Ex : 10"
                min={1}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Prix € (0 = don)</label>
              <input
                type="number"
                name="prix"
                value={form.prix}
                onChange={handleChange}
                placeholder="Ex : 1.50"
                min={0}
                step={0.5}
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}
          >
            <div>
              <label style={labelStyle}>Début retrait *</label>
              <input
                type="time"
                name="debutRetrait"
                value={form.debutRetrait}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Fin retrait *</label>
              <input
                type="time"
                name="finRetrait"
                value={form.finRetrait}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Lieu *</label>
            <input
              name="lieu"
              value={form.lieu}
              onChange={handleChange}
              placeholder="Ex : RU Pasteur, Cafét. B…"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#9CA3AF" : "#2D7A4F",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 4,
            }}
          >
            {loading ? "Envoi…" : offre ? "Sauvegarder" : "Publier l'offre →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferModal;

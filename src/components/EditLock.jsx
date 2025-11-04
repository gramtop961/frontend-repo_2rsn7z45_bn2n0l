import { useEffect, useState } from "react";
import { Lock, Unlock, KeyRound } from "lucide-react";

export default function EditLock({ isEdit, setIsEdit }) {
  const [open, setOpen] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [storedKey, setStoredKey] = useState("ANTARES");
  const [mode, setMode] = useState("unlock"); // unlock | set
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("afrh-lock-key");
    if (saved) {
      setStoredKey(saved);
    }
  }, []);

  const handleUnlock = () => {
    if (inputKey.trim() === storedKey) {
      setIsEdit(true);
      setMessage("Editing enabled");
      setTimeout(() => {
        setOpen(false);
        setMessage("");
        setInputKey("");
      }, 600);
    } else {
      setMessage("Invalid key");
    }
  };

  const handleSetNew = () => {
    const next = inputKey.trim();
    if (next.length < 4) {
      setMessage("Key must be at least 4 characters");
      return;
    }
    localStorage.setItem("afrh-lock-key", next);
    setStoredKey(next);
    setMessage("New key saved");
    setTimeout(() => {
      setOpen(false);
      setMessage("");
      setInputKey("");
    }, 600);
  };

  const handleLock = () => {
    setIsEdit(false);
  };

  return (
    <>
      {/* Floating lock button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => (isEdit ? handleLock() : (setOpen(true), setMode("unlock")))}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-lg border transition-colors ${
            isEdit
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]"
              : "bg-white text-[var(--color-primary)] border-[var(--color-primary)]/20 hover:bg-[var(--bg-soft)]"
          }`}
          aria-label={isEdit ? "Lock editing" : "Unlock editing"}
        >
          {isEdit ? <Unlock size={16} /> : <Lock size={16} />}
          <span className="text-sm font-medium">{isEdit ? "Editing" : "Locked"}</span>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl border border-black/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b">
              <KeyRound size={16} className="text-[var(--color-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {mode === "unlock" ? "Enter Edit Key" : "Set New Edit Key"}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="password"
                autoFocus
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder={mode === "unlock" ? "Enter key to enable editing" : "New key (min 4 chars)"}
                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              />
              {message ? (
                <p className="text-xs text-[var(--color-primary)]/80">{message}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-t bg-[var(--bg-soft)]/60">
              <button
                onClick={() => {
                  setOpen(false);
                  setMessage("");
                  setInputKey("");
                }}
                className="text-sm px-3 py-1.5 rounded-md border border-black/10 hover:bg-white"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode(mode === "unlock" ? "set" : "unlock")}
                  className="text-xs px-3 py-1.5 rounded-md border border-black/10 hover:bg-white"
                >
                  {mode === "unlock" ? "Set New Key" : "Use Existing Key"}
                </button>
                {mode === "unlock" ? (
                  <button
                    onClick={handleUnlock}
                    className="text-sm px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                  >
                    Unlock
                  </button>
                ) : (
                  <button
                    onClick={handleSetNew}
                    className="text-sm px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                  >
                    Save Key
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

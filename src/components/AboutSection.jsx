import { Leaf, GraduationCap, Edit3, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "ANTARES FATHUL RIZKI HARAHAP",
    tagline:
      "Renewable energy advocate • Green jobs enthusiast • Carbon markets explorer",
    bio:
      "I’m a university student driven by the mission to accelerate the just transition to a low-carbon economy. I explore how clean technologies, policy, and markets can unlock inclusive, future-proof careers while protecting our planet.",
    academic:
      "Academic focus: Energy systems, sustainability transitions, and environmental economics.",
    photo:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=80",
  });

  useEffect(() => {
    const saved = localStorage.getItem("afrh-profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({ ...p, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    localStorage.setItem("afrh-profile", JSON.stringify(profile));
    setEditing(false);
  };

  const resetChanges = () => {
    const saved = localStorage.getItem("afrh-profile");
    if (saved) setProfile(JSON.parse(saved));
    setEditing(false);
  };

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8e7ea] via-white to-white pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#6a0013]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
              <Leaf size={20} />
            </span>
            <span className="text-sm font-medium">Sustainability-forward profile</span>
          </div>
          <div className="flex items-center gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6a0013]/20 px-3 py-2 text-[#6a0013] hover:bg-[#6a0013] hover:text-white"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={saveChanges}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#6a0013] px-3 py-2 text-white hover:opacity-90"
                >
                  <Save size={16} /> Save
                </button>
                <button
                  onClick={resetChanges}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#6a0013]/20 px-3 py-2 text-[#6a0013] hover:bg-[#6a0013]/10"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            {!editing ? (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4a000e]">
                  {profile.name}
                </h1>
                <p className="mt-3 text-lg text-[#6a0013]/80">{profile.tagline}</p>
                <div className="mt-6 flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
                    <Leaf size={20} />
                  </span>
                  <p className="text-[#4a000e]/80 leading-relaxed">{profile.bio}</p>
                </div>
                <div className="mt-6 flex items-center gap-3 text-sm text-[#6a0013]">
                  <GraduationCap size={18} className="shrink-0" />
                  <span>{profile.academic}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#f3d6db] text-[#6a0013] text-sm">Renewables</span>
                  <span className="px-3 py-1 rounded-full bg-[#f3d6db] text-[#6a0013] text-sm">Green Jobs</span>
                  <span className="px-3 py-1 rounded-full bg-[#f3d6db] text-[#6a0013] text-sm">Carbon Trading</span>
                  <span className="px-3 py-1 rounded-full bg-[#f3d6db] text-[#6a0013] text-sm">Climate Policy</span>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4a000e]">Nama</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4a000e]">Tagline</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4a000e]">Bio</label>
                  <textarea
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4a000e]">Fokus Akademik</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                    value={profile.academic}
                    onChange={(e) => setProfile({ ...profile, academic: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4a000e]">Ubah Foto Profil</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-[#4a000e] file:mr-4 file:rounded-lg file:border-0 file:bg-[#6a0013] file:px-4 file:py-2 file:text-white hover:file:bg-[#4a000e]"
                  />
                  <p className="mt-1 text-xs text-[#6a0013]/70">Format: JPG, PNG. Perubahan disimpan di perangkat Anda.</p>
                </div>
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#f3d6db] via-[#f7e6e9] to-[#f3d6db] blur-2xl opacity-80" />
              <img
                src={profile.photo}
                alt="Professional portrait"
                className="relative aspect-[4/5] w-full object-cover rounded-3xl shadow-xl ring-1 ring-[#6a0013]/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Delete, Eye, Pencil, X } from "lucide-react";
import LinkStatusBadge from "../common/LinkStatusBadge";

export default function ClientInfoModal({ close, client }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 backdrop-blur-xs z-50">
      <div className="bg-zinc-950 relative flex flex-col rounded-xl shadow-2xl shadow-white/10 gap-6 p-12 max-w-[900px] max-h-[90vh] w-full overflow-y-auto scrollbar-dark overflow-hidden">
        {/* Close Icon */}
        <X
          onClick={close}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer z-10"
          size={22}
        />

        {/* Heading */}
        <h2 className="text-white text-xl text-center font-semibold">
          Client Info
        </h2>

        {/* Informational Block */}
        <div className="flex items-center p-6 gap-4 bg-zinc-900 rounded-xl mb-4">
          <Eye size={22} className="text-zinc-400" />
          <p className="text-sm text-zinc-400">
            You’re viewing this client’s data. To make changes, click "Edit
            Client Info" at the bottom of this screen.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {/* Column 1: General Info */}
          <div className="flex flex-col gap-3">
            <Section label="Client Name" value={client.name} />
            <Section label="Email" value={client.email} />
            <Section label="Phone" value={client.phone} />
            <Section label="Age" value={client.age} />
            <Section label="Address" value={client.address} />
            <Section label="Gym" value={client.gym} />
            <Section label="Date Joined" value={client.dateJoined} />
            <Section label="Position" value={client.position} />
            <div className="flex gap-2 items-center mt-2">
              <p className="text-sm text-zinc-400">Client Linked</p>
              <LinkStatusBadge isTemp={client.is_temp} size="large" />
            </div>
          </div>

          {/* Column 2: Fitness Info */}
          <div className="flex flex-col gap-3">
            <Section label="Height (cm)" value={client.height} />
            <Section label="Weight (kg)" value={client.weight} />
            <Section label="Fitness Goals" value={client.fitnessGoals} />
            <Section
              label="Fitness Experience"
              value={client.fitnessExperience}
            />
            <Section label="Fitness Level" value={client.fitnessLevel} />
            <Section label="Measurements" value={client.measurements} />
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm text-zinc-400">Workout Plan (Active)</p>
              <button className="flex items-center gap-2 bg-white text-black w-fit px-4 py-2 rounded text-sm">
                <Eye size={18} />
                <span>View Workout Plan</span>
              </button>
            </div>
          </div>

          {/* Column 3: Nutrition & Medical */}
          <div className="flex flex-col gap-3">
            <Section label="Food Likes" value={client.foodLikes} />
            <Section label="Food Dislikes" value={client.foodDislikes} />
            <Section label="Allergies" value={client.allergies} />
            <Section
              label="Medical Conditions"
              value={client.medicalConditions}
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-zinc-400">Notes</p>
              <p className="whitespace-pre-line text-sm">{client.notes}</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm text-zinc-400">Diet Plan (Active)</p>
              <button className="flex items-center gap-2 bg-white text-black w-fit px-4 py-2 rounded text-sm">
                <Eye size={18} />
                <span>View Diet Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center pt-4 border-zinc-800 mt-4">
          <div className="flex gap-4">
            <button
              onClick={close}
              className="flex items-center gap-2 bg-zinc-900 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-zinc-800 transition-colors"
            >
              <Pencil size={16} /> Edit Client Info
            </button>
            <button
              onClick={close}
              className="flex items-center gap-2 bg-red-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              <X size={18} /> Delete Client
            </button>
          </div>
          <button
            onClick={close}
            className="bg-zinc-900 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable section renderer
function Section({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

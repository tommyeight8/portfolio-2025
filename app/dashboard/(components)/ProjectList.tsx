"use client";
import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import { EllipsisVertical } from "lucide-react";
import { removeProject } from "@/app/actions/remove-project";

import { reorderProjects } from "@/app/actions/reorder-projects";
import ProjectSkeleton from "@/components/ProjectsSkeleton";

const categoryColorMap: Record<string, string> = {
  GRAPHIC_DESIGN: "bg-violet-400",
  FULL_STACK: "bg-blue-400",
  WEB_DESIGN: "bg-green-400",
  SHOPIFY_DEVELOPMENT: "bg-yellow-400",
  SHOPIFY_STORE_FRONT: "bg-pink-400",
};

export default function ProjectList() {
  const {
    projects,
    removeProjectLocally,
    editProject,
    setProjectBeingEdited,
    setIsModalOpen: setOpen,
    reorderProjectLocally,
    setProjects,
  } = useProjectContext();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [openReorderId, setOpenReorderId] = useState<string | null>(null);

  const confirmedRemove = async (id: string) => {
    try {
      await removeProject(id);
      removeProjectLocally(id); // local context update
    } catch (err) {
      alert("Failed to remove project.");
    } finally {
      setConfirmRemoveId(null);
    }
  };

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
    console.log(id);
  };

  const handleUpdate = (id: string) => {
    // Add update logic here
    console.log("Update project:", id);
    setOpenMenuId(null);
  };

  const handleRemove = (id: string) => {
    setConfirmRemoveId(id); // triggers confirm modal
    setOpenMenuId(null);
  };

  if (projects.length === 0) {
    // return <p className="text-gray-500">No projects yet.</p>;
    return <ProjectSkeleton />;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[900px] m-auto">
      {projects.map((project) => (
        <li
          key={project.id}
          className="p-3 relative flex flex-col h-full bg-white shadow-md rounded
            dark:bg-[#1a1a1a]"
        >
          <div className="h-54 md:h-64 overflow-hidden">
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
              {project.title}
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300 line-clamp-3 text-xs">
              {project.description}
            </p>
          </div>

          <div className="mt-auto p-2 pb-3 font-medium text-muted/50 capitalize tracking-wide flex justify-between items-center">
            <span
              className={`px-3 py-1 text-white rounded-4xl text-[9px] ${
                categoryColorMap[project.category] || "bg-gray-400"
              }`}
            >
              {project.category.replace(/_/g, " ")}
            </span>
            <div className="relative z-10">
              <EllipsisVertical
                size={21}
                className="text-zinc-600 cursor-pointer hover:text-zinc-400 transition duration-200"
                onClick={() => toggleMenu(project.id)}
              />
              {openMenuId === project.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded shadow-md shadow-zinc-600/20 dark:shadow-black/10 z-50">
                  <button
                    onClick={() => {
                      setOpenReorderId(project.id);
                      setOpenMenuId(null);
                    }}
                    className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-900"
                  >
                    Reorder
                  </button>

                  <button
                    onClick={() => {
                      editProject(project); // ✅ this sets the project for editing
                      setOpen(true); // ✅ this opens the shared modal
                      setOpenMenuId(null); // ✅ close the ellipsis menu
                    }}
                    className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-900"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleRemove(project.id)}
                    className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-zinc-900"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          {confirmRemoveId && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
              <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded shadow-xl">
                <p className="mb-4 text-zinc-700 dark:text-gray-200">
                  Are you sure you want to delete this project?
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => setConfirmRemoveId(null)}
                    className="text-gray-600 dark:text-gray-200 cursor-pointer hover:text-gray-800 dark:hover:text-white transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmedRemove(confirmRemoveId)}
                    className="text-red-400 font-medium cursor-pointer hover:text-red-500 transition duration-200"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {openReorderId && (
            <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
              <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded shadow-xl">
                <p className="mb-4 text-zinc-700 dark:text-gray-200">
                  Move project to which position?
                </p>
                <select
                  className="mb-4 w-full p-2 border rounded text-sm dark:bg-zinc-900 dark:text-white"
                  defaultValue={projects.findIndex(
                    (p) => p.id === openReorderId
                  )}
                  onChange={async (e) => {
                    const toIndex = parseInt(e.target.value, 10);

                    // Step 1: manually reorder the local array
                    const currentIndex = projects.findIndex(
                      (p) => p.id === openReorderId
                    );
                    if (currentIndex === -1) return;

                    const reordered = [...projects];
                    const [moved] = reordered.splice(currentIndex, 1);
                    reordered.splice(toIndex, 0, moved);

                    // Step 2: update local UI
                    setProjects(
                      reordered.map((proj, idx) => ({
                        ...proj,
                        position: idx,
                      }))
                    );

                    // Step 3: persist to DB
                    await reorderProjects(
                      reordered.map((proj, idx) => ({
                        id: proj.id,
                        position: idx,
                      }))
                    );

                    setOpenReorderId(null);
                  }}
                >
                  {projects.map((_, index) => (
                    <option key={index} value={index}>
                      Position {index + 1}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setOpenReorderId(null)}
                    className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

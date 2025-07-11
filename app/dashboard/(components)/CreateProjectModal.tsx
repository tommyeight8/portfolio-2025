"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";

import { createProject } from "@/app/actions/create-project";
import { updateProject } from "@/app/actions/update-project";
import { useProjectContext } from "@/context/ProjectContext";
import {
  ProjectFormValues,
  projectSchema,
} from "@/lib/validation/project-schema";
import SpinningLoader from "@/components/SpinningLoader";

export interface ProjectWithId extends ProjectFormValues {
  id: string;
}

const categories = [
  "GRAPHIC_DESIGN",
  "FULL_STACK",
  "WEB_DESIGN",
  "SHOPIFY_DEVELOPMENT",
  "SHOPIFY_STORE_FRONT",
] as const;

export default function CreateProjectModal() {
  const [submitting, setSubmitting] = useState(false);
  const {
    addProject,
    projectBeingEdited,
    setProjectBeingEdited,
    setProjects,
    isModalOpen: open,
    setIsModalOpen: setOpen,
    openCreateProjectModal,
    projects,
  } = useProjectContext();

  console.log(projectBeingEdited);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setSubmitting(true);

    try {
      if (projectBeingEdited) {
        // ✅ Edit existing project
        await updateProject(projectBeingEdited.id, data);

        // ✅ Optimistically update UI
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectBeingEdited.id ? { ...p, ...data } : p
          )
        );

        setProjectBeingEdited(null);
      } else {
        // ✅ Optimistic: generate temp ID
        const tempId = crypto.randomUUID();

        // Add locally with placeholder position (e.g. end of list)
        addProject({
          id: tempId,
          position: projects.length, // approximate local position
          ...data,
        });

        // Persist to DB
        const saved = await createProject(data);

        // Replace temp with real DB data
        setProjects((prev) => prev.map((p) => (p.id === tempId ? saved : p)));
      }
    } catch (err) {
      console.error(err);
      alert("Error saving project");
    } finally {
      reset();
      setOpen(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open && projectBeingEdited) {
      reset(projectBeingEdited); // ✅ edit mode
    } else if (open && !projectBeingEdited) {
      reset(); // ✅ create mode
    }
  }, [open, projectBeingEdited, reset]);

  return (
    <>
      <button
        onClick={openCreateProjectModal}
        className="bg-violet-600 cursor-pointer flex justify-center items-center rounded-full h-8 w-8 text-white
        hover:bg-violet-700 hover:scale-105 transition duration-200 fixed bottom-4 right-4 z-50"
      >
        <IconPlus size={16} className="text-white" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {projectBeingEdited ? "Update Project" : "Create Project"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium text-md mb-1">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full p-2 border rounded"
                />
                {errors.title && (
                  <p className="text-red-400 text-md">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-md mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  {...register("description")}
                  className="w-full p-2 border rounded"
                />
                {errors.description && (
                  <p className="text-red-400 text-md">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-md mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  {...register("imageUrl")}
                  className="w-full p-2 border rounded"
                />
                {errors.imageUrl && (
                  <p className="text-red-400 text-md">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-md mb-1">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full p-2 border rounded"
                >
                  <option value="" className="dark:bg-zinc-700">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-zinc-700">
                      {cat
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-md">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 items-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setProjectBeingEdited(null); // ⬅️ clear edit mode
                    reset({
                      title: "",
                      description: "",
                      imageUrl: "",
                      category: undefined,
                    });

                    setOpen(false); // ⬅️ close modal
                  }}
                  className="hover:opacity-80 transition duration-200 bg-gray-300 px-4 dark:text-zinc-900 py-2 rounded cursor-pointer w-24"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="hover:opacity-80 transition duration-200 bg-violet-600 text-white px-4 py-2 rounded cursor-pointer w-24"
                >
                  {submitting ? <SpinningLoader /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

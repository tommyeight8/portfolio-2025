"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Send this to API:", data);
    reset();
  };

  return (
    <footer
      id="contact"
      className="w-full bg-[#101010] p-8 text-white flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-[1100px] flex flex-col md:flex-row gap-12 border-t-0 dark:border-t-1 border-zinc-900 pt-12">
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Contact Me</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="w-full p-2 rounded bg-zinc-900 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full p-2 rounded bg-zinc-900 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("message")}
                placeholder="Message"
                className="w-full p-2 rounded bg-zinc-900 text-white border border-zinc-800 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-violet-600 hover:bg-violet-700 transition duration-200 ease-in-out text-white px-4 py-2 rounded shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {isSubmitSuccessful && (
              <p className="text-green-400 text-sm mt-2">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>

        <div className="w-full md:w-1/2">
          <ul className="flex justify-around gap-2 md:gap-8 text-gray-400">
            <li className="hover:text-white transition cursor-pointer text-xs md:text-sm">
              Home
            </li>
            <li className="hover:text-white transition cursor-pointer text-xs md:text-sm">
              About
            </li>
            <li className="hover:text-white transition cursor-pointer text-xs md:text-sm">
              Works
            </li>
            <li className="hover:text-white transition cursor-pointer text-xs md:text-sm">
              Contact
            </li>
            <li className="hover:text-white transition cursor-pointer text-xs md:text-sm">
              Resume
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-zinc-700 text-xs border-t-1 border-zinc-900 w-full max-w-[1100px] mt-8 pt-4">
        &copy; {new Date().getFullYear()} Tommy Vong.
      </div>
    </footer>
  );
}

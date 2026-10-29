import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="w-full bg-ink text-white/55">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/15 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Atif Shaikh</p>
        <ul className="flex gap-6">
          <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
          <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
          <li><a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Resume</a></li>
        </ul>
      </div>
    </footer>
  );
}

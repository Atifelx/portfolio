import { BOOKING_URL, EMAIL, LINKEDIN_URL, PHONE, PHONE_HREF, REMOTE } from "@/lib/profile";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-[16ch] text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] font-stretch-[87%]">
          Hiring a forward deployed or AI engineer?
        </h2>
        <p className="mt-6 max-w-[56ch] text-xl leading-snug text-white/75">
          I work remotely with teams in the US and Europe. Tell me about the problem and the team; a short call is
          the quickest way to see if I&apos;m the right fit.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cobalt px-6 py-3.5 text-lg font-medium text-white transition-colors hover:bg-cobalt-deep"
          >
            Book a call
          </a>
          <a href={`mailto:${EMAIL}`} className="text-lg font-medium underline decoration-white/30 decoration-2 underline-offset-[6px] hover:decoration-white">
            {EMAIL}
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-white/15 pt-8 text-white/75 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-white/55">Time zone</dt>
            <dd className="mt-1">India (IST). {REMOTE.hours}.</dd>
          </div>
          <div>
            <dt className="text-sm text-white/55">Work authorization</dt>
            <dd className="mt-1">{REMOTE.visa}. {REMOTE.relocation}.</dd>
          </div>
          <div>
            <dt className="text-sm text-white/55">How to hire</dt>
            <dd className="mt-1">{REMOTE.hire}.</dd>
          </div>
          <div>
            <dt className="text-sm text-white/55">LinkedIn</dt>
            <dd className="mt-1">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                linkedin.com/in/atif-shaikh
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-white/55">Phone</dt>
            <dd className="mt-1">
              <a href={PHONE_HREF} className="tabular-nums hover:text-white">{PHONE}</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

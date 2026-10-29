"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";

const models = [
  { role: "Printed text", base: "EasyOCR (CRAFT detector + english_g2 recogniser)", file: "craft_mlt_25k.pth + english_g2.pth", size: "79 MB + 14 MB", done: "Used as is" },
  { role: "Field finder (handwriting crops)", base: "Ultralytics yolo26n.pt (COCO)", file: "cheque_fields_v1.pt", size: "5 MB", done: "Full fine-tune" },
  { role: "Field finder (signature + account)", base: "cheque_fields_v1.pt", file: "cheque_fields_v2.pt", size: "5 MB", done: "Full fine-tune" },
  { role: "Handwriting reader", base: "microsoft/trocr-base-handwritten", file: "trocr-cheque-v1 / model.safetensors", size: "1.3 GB", done: "Full fine-tune" },
  { role: "Signature match", base: "Siamese ResNet-18 (contrastive)", file: "signature_best.pt", size: "128 MB", done: "Calibrated" },
  { role: "Whole-cheque reader (tested)", base: "Qwen/Qwen3-VL-4B-Instruct", file: "Not shipped", size: "8.9 GB", done: "Benchmark only" },
];

const comparison = [
  { label: "Amount in words, right / wrong", base: "1 / 0", synth: "12 / 2", ours: "16 / 1", qwen: "11 / 4" },
  { label: "Amount in figures, right / wrong", base: "0 / 0", synth: "8 / 0", ours: "13 / 0", qwen: "10 / 1" },
  { label: "Payee words found", base: "38%", synth: "56%", ours: "73%", qwen: "85%" },
  { label: "Model size", base: "1.3 GB", synth: "1.3 GB", ours: "1.3 GB", qwen: "8.9 GB" },
];

const doneStyle: Record<string, string> = {
  "Used as is": "text-ink-2 border-rule",
  "Full fine-tune": "text-cobalt border-cobalt/40 bg-cobalt/5",
  "Calibrated": "text-outcome border-outcome/40 bg-outcome/5",
  "Benchmark only": "text-ink-3 border-rule",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule py-8 first:border-t-0">
      <h3 className="mb-4 text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 leading-relaxed text-ink-2 marker:text-ink-3">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function Journey({ label, from, to, note }: { label: string; from: string; to: string; note: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-surface p-4">
      <div className="text-sm text-ink-3">{label}</div>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 font-semibold tabular-nums">
        <span className="text-lg text-ink-3">{from}</span>
        <span className="text-ink-3" aria-hidden>to</span>
        <span className="text-2xl text-outcome md:text-3xl">{to}</span>
      </div>
      <div className="mt-1 text-sm text-ink-2">{note}</div>
    </div>
  );
}

const code = "rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink";

function CaseStudy() {
  return (
    <>
      <Section title="Why I built it">
        <Bullets items={[
          "Checking a cheque is slow, manual work: a clerk reads the handwriting, finds the account and compares the signature by eye.",
          "The goal was to automate that first pass with the lightest models that run offline on a plain CPU: no GPU server, no paid API.",
          <>The app returns <b className="text-ink">validated</b> or <b className="text-ink">needs review</b> with every reason listed, so a person stays in control.</>,
        ]} />
      </Section>

      <Section title="The models">
        {/* Cards on phones, table from sm up */}
        <div className="space-y-3 sm:hidden">
          {models.map((m) => (
            <div key={m.role} className="rounded-lg border border-rule p-4">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <span className="font-semibold">{m.role}</span>
                <span className={clsx("whitespace-nowrap rounded-full border px-2 py-0.5 text-xs", doneStyle[m.done])}>{m.done}</span>
              </div>
              <div className="break-words font-mono text-xs text-ink-3">{m.base}</div>
              <div className="mt-1 break-words font-mono text-xs text-ink">{m.file} <span className="text-ink-3">({m.size})</span></div>
            </div>
          ))}
        </div>
        <div className="hidden overflow-x-auto rounded-lg border border-rule sm:block">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-surface text-left text-ink-3">
              <tr>
                <th className="px-4 py-3 font-medium">Job</th>
                <th className="px-4 py-3 font-medium">Starting model</th>
                <th className="px-4 py-3 font-medium">Shipped file</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">What I did</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.role} className="border-t border-rule align-top">
                  <td className="px-4 py-3 font-medium">{m.role}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-2">{m.base}</td>
                  <td className="px-4 py-3 font-mono text-xs">{m.file}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-3 tabular-nums">{m.size}</td>
                  <td className="px-4 py-3">
                    <span className={clsx("inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs", doneStyle[m.done])}>{m.done}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Why several vision models, not one">
        <Bullets items={[
          <>A cheque is four different problems: <b className="text-ink">printed text</b>, <b className="text-ink">where each field is</b>, <b className="text-ink">handwriting</b>, and <b className="text-ink">whose signature</b>.</>,
          <>EasyOCR reads what the bank printed, but got <b className="text-ink">0%</b> of handwritten amounts right. TrOCR reads what the customer wrote.</>,
          "A signature isn't text at all, so it needs a model that compares shapes (a Siamese network), not one that reads.",
          "Small specialists run fast on CPU, and each one can be tested and fixed on its own.",
        ]} />
      </Section>

      <Section title="How I compared models and chose">
        <p className="mb-4 text-ink-2">Handwriting was decided head-to-head on 17 cheques the models never saw:</p>
        <div className="mb-5 overflow-x-auto rounded-lg border border-rule">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-surface text-left text-ink-3">
              <tr>
                <th className="px-4 py-3 font-medium"><span className="sr-only">Measure</span></th>
                <th className="px-3 py-3 font-medium">TrOCR base</th>
                <th className="px-3 py-3 font-medium">Synthetic only</th>
                <th className="px-3 py-3 font-medium text-ink">trocr-cheque-v1</th>
                <th className="px-3 py-3 font-medium">Qwen3-VL-4B</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {comparison.map((row) => (
                <tr key={row.label} className="border-t border-rule">
                  <td className="px-4 py-3 text-ink-2">{row.label}</td>
                  <td className="px-3 py-3 text-ink-3">{row.base}</td>
                  <td className="px-3 py-3 text-ink-3">{row.synth}</td>
                  <td className="bg-outcome/5 px-3 py-3 font-semibold text-outcome">{row.ours}</td>
                  <td className="px-3 py-3 text-ink-3">{row.qwen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Bullets items={[
          <><b className="text-ink">TrOCR won.</b> Qwen found more payee words, but showed 4 wrong amounts and is 7× bigger. A wrong amount shown with confidence is the costliest mistake.</>,
          <><b className="text-ink">YOLO v1 vs v2.</b> v2 found the signature on 5 of 5 ICICI cheques (v1: 0 of 5), but its crops made handwriting slightly worse (107 to 104 amounts right). So each does the job it&apos;s better at.</>,
          <><b className="text-ink">YOLO nano</b> was picked for size: 5 MB, all 7 fields in about 0.1 s on CPU. It was not benchmarked against other detectors.</>,
        ]} />
      </Section>

      <Section title="Why full fine-tuning">
        <h4 className="mb-3 font-semibold">How I knew fine-tuning was needed</h4>
        <Bullets items={[
          <>Out of the box, <code className={code}>trocr-base-handwritten</code> read only <b className="text-ink">1 of 17</b> amounts in words.</>,
          <><code className={code}>yolo26n.pt</code> is trained on COCO, so it has no cheque field classes at all.</>,
          <><code className={code}>cheque_fields_v1.pt</code> missed <b className="text-ink">every</b> ICICI signature, so it was trained again into v2.</>,
        ]} />
        <h4 className="mb-3 mt-6 font-semibold">Why full (every weight) rather than LoRA</h4>
        <Bullets items={[
          "The models are small enough to train fully on a Mac GPU: YOLO in 8 minutes, TrOCR (~334M weights) in about 2.5 hours.",
          "The gap was large: cheque handwriting looks different (the image encoder) and the words are new, such as lakh and crore amounts and Indian names (the text decoder). So the whole model was trained, nothing frozen.",
          "Method: supervised fine-tuning with AdamW, 32-bit floats, on Apple MPS.",
        ]} />
        <h4 className="mb-3 mt-6 font-semibold">Data and the loss journey (TrOCR)</h4>
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Journey label="Round 1, 35,000 synthetic strips" from="4.68" to="0.02" note="Training loss over 2 epochs, 4,374 steps" />
          <Journey label="Round 1, synthetic error rate" from="87%" to="0.1%" note="Characters wrong on 400 unseen strips" />
          <Journey label="Round 2, 10k synthetic + 234 real" from="0.35" to="0.015" note="Training loss over 1 epoch, 917 steps" />
          <Journey label="Round 2, real error rate" from="15.3%" to="9.65%" note="Best checkpoint (step 600) shipped" />
        </div>
        <Bullets items={[
          "Only 336 real handwriting crops existed (112 cheques), so 36,000 synthetic ones were generated from 45 handwriting fonts.",
          "Real crops were split 234 to train, 51 to pick the checkpoint and 51 for the final score.",
          "YOLO v1: 78 cheques, 80 epochs. v2 added 10 synthetic ICICI cheques, and ICICI accuracy (mAP50-95) went from 0.31 to 0.78.",
        ]} />
      </Section>

      <Section title="Challenges and trade-offs">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="min-w-0">
            <h4 className="mb-3 font-semibold">Challenges</h4>
            <Bullets items={[
              "Tiny dataset: 112 cheques by 9 writers. Solved with synthetic data.",
              "No box labels: drafted from bank templates, every one checked by hand.",
              "Printed date boxes read as digits: removing the grid raised dates read from 10 to 62 of 112.",
              "The signature model reacted to pen thickness, not the person: fixed by normalising both signatures.",
              "Slow TrOCR, caused by a disabled cache: turning it on took it from 6.17 s to 2.78 s per cheque.",
            ]} />
          </div>
          <div className="min-w-0">
            <h4 className="mb-3 font-semibold">Trade-offs and open issues</h4>
            <Bullets items={[
              "Chose fewer wrong amounts over better payee reading (TrOCR over Qwen).",
              "A cautious signature threshold (0.276): fewer forgeries pass, but genuine cheques often go to review.",
              "A carefully copied signature (0.246) can still pass.",
              "Only 9 writers and synthetic data, so scores are optimistic; never tested on real bank cheques.",
            ]} />
          </div>
        </div>
      </Section>
    </>
  );
}

export default function ChequeCaseStudy({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Read the case study
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-stretch justify-center bg-ink/60 md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-full w-full max-w-4xl overflow-y-auto overscroll-contain bg-paper shadow-2xl md:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-rule bg-paper px-5 py-5 md:px-10">
              <div>
                <p className="text-sm text-ink-3">Case study</p>
                <h2 id="case-study-title" className="text-2xl font-bold tracking-tight md:text-3xl">Cheque verification AI</h2>
                <p className="text-sm text-ink-3">Project ICiCI-pixel</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close case study"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-5 pb-8 md:px-10">
              <CaseStudy />
              <p className="border-t border-rule pt-6 text-sm leading-relaxed text-ink-3">
                Portfolio research prototype built on synthetic test data. Not affiliated with ICICI Bank and not for payment decisions.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

# Atif Shaikh: portfolio

Personal site for Atif Shaikh, Forward Deployed AI Engineer. Built with Next.js, Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `app/page.tsx`: section order
- `components/`: one file per section (`Hero`, `Projects`, `Experience`, `About`, `Recommendations`, `Contact`)
- `lib/profile.ts`: email, phone, booking, LinkedIn, GitHub and resume links
- `app/api/chat/route.ts`: the chat assistant's knowledge and prompt (needs `OPEN_ROUTER` in the environment)
- `public/`: images, the resume (`Atif_Shaikh_Forward_Deployed_Engineer.pdf`) and the ICiCI-pixel demo video (`icicpixel/demo.mp4`)

## Tests

```bash
npx playwright test
```

The tests cover the chat assistant; three of them call the live chat API.

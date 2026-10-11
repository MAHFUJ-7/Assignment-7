# বাজার দর (BazarDor)

বাজার দর হলো একটি responsive Bengali marketplace dashboard যেখানে চাল, ডাল, তেল, সবজি, মাছ ও অন্যান্য প্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক মূল্য এবং দৈনিক পরিবর্তন দেখা যায়।

## Technologies

- Next.js App Router
- React
- Tailwind CSS
- HeroUI
- Better Auth
- MongoDB
- Vercel

## Features

1. Responsive navbar, category navigation এবং scrolling price ticker
2. Hero banner এবং একই পেজে সব পণ্যের anchor navigation
3. দাম বাড়া, দাম কমা এবং সব পণ্যের responsive card grid
4. Category page-এ default, low-to-high এবং high-to-low sorting
5. Protected product detail page with minimum, maximum, average এবং market-wise prices
6. Email/password এবং Google OAuth authentication
7. Profile page এবং আলাদা profile update route
8. Loading skeleton, custom 404 page এবং invalid route handling
9. Bengali number formatting এবং mobile-friendly layouts

## Routes

- `/` — Home
- `/categorywise/[slug]` — Category products
- `/product/[slug]` — Protected product details
- `/sign-in` — Sign in
- `/sign-up` — Sign up
- `/myProfile` — Protected profile
- `/profile/update` — Protected profile update

## Environment variables

```env
BETTER_AUTH_URL=https://assignment-7-sage-six.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://assignment-7-sage-six.vercel.app
BETTER_AUTH_DATABASE_URL=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_GOOGLE_CLIENT_ID=your-google-client-id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

For Google OAuth, register this callback URL:

`https://assignment-7-sage-six.vercel.app/api/auth/callback/google`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

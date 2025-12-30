# Projektni vprašalnik — Nastavitve

## EmailJS Konfiguracija

**Za podrobna navodila glej: [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)**

### Hitri Pregled:

1. Ustvari EmailJS račun na https://www.emailjs.com/
2. Nastavi Email Service (Gmail/Outlook)
3. Ustvari Email Template z naslednjimi spremenljivkami:
   - `{{to_email}}` - za To Email
   - `{{subject}}` - za Subject
   - `{{message}}` - za Content
4. Pridobi Public Key iz Account → General
5. Ustvari `.env.local` file v root direktoriju:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxx
NEXT_PUBLIC_RECIPIENT_EMAIL=tvoj-email@example.com
```

6. Restart development server: `npm run dev`

## Funkcionalnosti

- ✅ Shranjevanje v localStorage (avtomatsko ob vsaki spremembi)
- ✅ Obnovitev podatkov ob ponovnem obisku strani
- ✅ Pošiljanje emailov preko EmailJS
- ✅ Validacija in potrditvena sporočila
- ✅ Profesionalen, čist dizajn
- ✅ Responsive layout

## Dostop do strani

Stran je dostopna na: `/project-brief`


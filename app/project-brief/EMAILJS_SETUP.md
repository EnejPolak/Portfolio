# EmailJS Nastavitve - Navodila

## Kako nastaviti EmailJS, da bodo emaili prišli na tvoj mail

### KORAK 1: Ustvari EmailJS račun

1. Pojdi na: **https://www.emailjs.com/**
2. Klikni **Sign Up** (brezplačen račun)
3. Prijavi se z emailom

---

### KORAK 2: Nastavi Email Service

1. V Dashboard pojdite na **Email Services** (levi meni)
2. Klikni **Add New Service**
3. Izberi svoj email provider:
   - **Gmail** (priporočeno)
   - **Outlook**
   - **Yahoo**
   - ali drugi
4. Sledi navodilom za povezavo (OAuth avtorizacija)
5. **ZAPIŠI Service ID** (npr. `service_abc123`)

---

### KORAK 3: Ustvari Email Template

1. Pojdi na **Email Templates** (levi meni)
2. Klikni **Create New Template**
3. Izberi svoj Email Service (ki si ga pravkar ustvaril)
4. Nastavi template:

**To Email:**
```
{{to_email}}
```
⚠️ **POMEMBNO**: To polje mora biti nastavljeno na `{{to_email}}`, ne na fiksen email naslov!

**Subject:**
```
{{subject}}
```

**Content (Email Body):**
```
{{message}}
```

**From Name (neobvezno):**
```
{{from_name}}
```

**Reply To (neobvezno):**
```
{{reply_to}}
```

5. **ZAPIŠI Template ID** (npr. `template_xyz789`)

---

### KORAK 4: Pridobi Public Key

1. Pojdi na **Account** → **General** (vrh desno)
2. V razdelku **API Keys** kopiraj **Public Key**
3. **ZAPIŠI Public Key** (npr. `abcdefghijklmnop`)

---

### KORAK 5: Nastavi Environment Variables

1. V root direktoriju projekta (kjer je `package.json`) ustvari file: **`.env.local`**

2. Dodaj naslednje vrednosti (zamenjaj s svojimi):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
NEXT_PUBLIC_RECIPIENT_EMAIL=tvoj-email@example.com
```

**POMEMBNO:**
- Zamenjaj `service_abc123` s svojim Service ID
- Zamenjaj `template_xyz789` s svojim Template ID
- Zamenjaj `abcdefghijklmnop` s svojim Public Key
- Zamenjaj `tvoj-email@example.com` s svojim email naslovom (kamor želiš prejemati vprašalnike)

---

### KORAK 6: Restart Development Server

1. Ustavi trenutni server (Ctrl+C)
2. Zaženi znova:
```bash
npm run dev
```

---

### KORAK 7: Testiraj

1. Odpri: `http://localhost:3000/project-brief`
2. Izpolni vprašalnik
3. Klikni **Oddaj vprašalnik**
4. Preveri svoj email inbox

---

## Kaj mi moraš poslati:

Ko boš vse nastavil, mi pošlji te 4 vrednosti:

1. **Service ID**: `service_...`
2. **Template ID**: `template_...`
3. **Public Key**: `...`
4. **Tvoj email naslov**: `tvoj-email@example.com`

Jaz bom nato nastavil `.env.local` file z tvojimi vrednostmi.

---

## Troubleshooting

**Email ne pride?**
- Preveri, da so vse environment variables pravilno nastavljene
- Preveri EmailJS Dashboard → Logs (ali je bil email poslan)
- Preveri spam folder
- Preveri, da je Email Service pravilno povezan

**Napaka pri pošiljanju?**
- Preveri konzolo v browserju (F12) za error sporočila
- Preveri, da so vsi ID-ji pravilni
- Preveri, da je Public Key pravilen

---

## EmailJS Free Plan Limits

- 200 emailov/mesec
- Dovolj za portfolio stran

Za več emailov lahko nadgradiš na plačljiv plan.


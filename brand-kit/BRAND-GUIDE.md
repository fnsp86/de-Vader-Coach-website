

# De Vadercoach — Brand Kit

## Kleuren

### Primair
| Naam | Hex | Gebruik |
|------|-----|---------|
| **Amber** | `#F59E0B` | Primaire merkkleur, knoppen, accenten |
| **Amber Dark** | `#D97706` | Light mode tekst op wit (4.8:1 contrast) |
| **Amber Light** | `#FCD34D` | Hover states, lichte accenten |

### Achtergronden
| Naam | Hex | Gebruik |
|------|-----|---------|
| **Donker BG** | `#111318` | Dark mode achtergrond |
| **Donker Surface** | `#1A1F2B` | Dark mode kaarten/panels |
| **Licht BG** | `#F7F7F5` | Light mode achtergrond |
| **Wit** | `#FFFFFF` | Light mode kaarten |

### Tekst
| Naam | Dark mode | Light mode |
|------|-----------|------------|
| **Primair** | `#F0F2F8` | `#111827` |
| **Secundair** | `#A0AAC0` | `#4B5563` |
| **Tertiair** | `#7B8498` | `#6B7280` |

### Skill-kleuren (de 8 vaardigheden)
| Vaardigheid | Hex | Icoon |
|-------------|-----|-------|
| Aanwezigheid | `#667eea` | Eye |
| Emotiecoaching | `#EF4444` | Heart |
| Zelfregulatie | `#34D399` | Waves |
| Grenzen | `#FBBF24` | Shield |
| Autonomie | `#A78BFA` | Sprout |
| Herstel | `#FB923C` | RefreshCw |
| Verbinding | `#60A5FA` | Handshake |
| Reflectie | `#C084FC` | Brain |

---

## Typografie

**Font:** Inter (Google Fonts)
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap
```

| Gebruik | Gewicht | Grootte |
|---------|---------|---------|
| Koppen | 800 (ExtraBold) | 24-48px |
| Subkoppen | 700 (Bold) | 18-24px |
| Body tekst | 400-500 | 14-16px |
| Labels/badges | 600-700 | 11-13px |
| Knoppen | 700 (Bold) | 14-16px |

---

## Logo varianten

### Hart-icoon (vierkant)
| Bestand | Achtergrond | Hart | Gebruik |
|---------|-------------|------|---------|
| `logo-hart-amber` | Amber | Zwart | **Primair** — socials, app icon |
| `logo-hart-donker` | Donker | Amber | Dark mode, donkere achtergronden |
| `logo-hart-wit` | Wit | Zwart | Light mode, lichte achtergronden |
| `logo-hart-transparant-zwart` | Geen | Zwart | Op lichte foto's/achtergronden |
| `logo-hart-transparant-wit` | Geen | Wit | Op donkere foto's/achtergronden |
| `logo-hart-transparant-amber` | Geen | Amber | Op neutrale achtergronden |

### Logo + tekst (hart + "De Vadercoach")
| Bestand | Formaat | Gebruik |
|---------|---------|---------|
| `logo-tekst-donker` | Horizontaal | Donkere achtergrond — voor headers, socials |
| `logo-tekst-licht` | Horizontaal | Lichte achtergrond |
| `logo-tekst-transparant` | Horizontaal | Transparante achtergrond |
| `logo-tekst-gestapeld-donker` | Verticaal | Donkere achtergrond — voor vierkante formaten |
| `logo-tekst-gestapeld-licht` | Verticaal | Lichte achtergrond |

### Wordmark (groot, met tagline)
| Bestand | Gebruik |
|---------|---------|
| `wordmark-donker` | Donkere achtergrond met witte tekst + tagline |
| `wordmark-licht` | Lichte achtergrond met zwarte tekst + tagline |
| `wordmark-transparant` | Transparante achtergrond |

---

## Bestanden overzicht

```
brand-kit/
├── logos/
│   ├── svg/            ← Schaalbare vectoren (voor print & design)
│   │   ├── logo-hart-amber.svg
│   │   ├── logo-hart-donker.svg
│   │   ├── logo-hart-wit.svg
│   │   ├── logo-hart-transparant-zwart.svg
│   │   ├── logo-hart-transparant-wit.svg
│   │   ├── logo-hart-transparant-amber.svg
│   │   ├── logo-tekst-donker.svg
│   │   ├── logo-tekst-licht.svg
│   │   ├── logo-tekst-transparant.svg
│   │   ├── logo-tekst-gestapeld-donker.svg
│   │   ├── logo-tekst-gestapeld-licht.svg
│   │   ├── wordmark-donker.svg
│   │   ├── wordmark-licht.svg
│   │   └── wordmark-transparant.svg
│   └── png/            ← Pixel bestanden (voor web & socials)
│       ├── logo-hart-amber-512.png
│       ├── logo-hart-amber-1024.png
│       ├── logo-hart-donker-512.png
│       └── logo-hart-donker-1024.png
│
├── favicons/           ← Website iconen
│   ├── favicon.ico     (48x48, voor Google)
│   ├── icon.svg        (scaleable, modern browsers)
│   ├── apple-icon.png  (180x180, Apple apparaten)
│   ├── icon-192.png    (Android/PWA)
│   └── icon-512.png    (PWA splash)
│
├── social/             ← Kant-en-klare social templates
│   ├── profielfoto/
│   │   ├── profiel-amber.svg        (320x320)
│   │   ├── profiel-donker.svg       (320x320)
│   │   ├── profiel-amber-1080.svg   (1080x1080, Instagram)
│   │   └── profiel-donker-1080.svg  (1080x1080, Instagram)
│   ├── banner/
│   │   ├── banner-donker.svg    (1584x396, Facebook/LinkedIn)
│   │   ├── banner-amber.svg     (1584x396, Facebook/LinkedIn)
│   │   └── banner-twitter.svg   (1500x500, Twitter/X)
│   └── story/
│       ├── story-template-donker.svg  (1080x1920)
│       └── story-template-amber.svg   (1080x1920)
│
├── skill-iconen/       ← De 8 vaardigheid-iconen
│   ├── svg/
│   └── png/
│
└── BRAND-GUIDE.md      ← Dit bestand
```

---

## Social media formaten

| Platform | Profielfoto | Banner/Header | Post | Story/Reel |
|----------|-------------|---------------|------|------------|
| **Instagram** | 320x320 | — | 1080x1080 | 1080x1920 |
| **Facebook** | 170x170 | 1584x396 | 1200x630 | 1080x1920 |
| **LinkedIn** | 400x400 | 1584x396 | 1200x627 | — |
| **Twitter/X** | 400x400 | 1500x500 | 1200x675 | — |
| **TikTok** | 200x200 | — | — | 1080x1920 |

---

## Gebruik richtlijnen

### Do's
- Gebruik altijd het amber hart-logo als primaire herkenning
- Houd voldoende witruimte rondom het logo (minimaal 1/4 van logo-grootte)
- Gebruik Inter als font voor alle teksten
- Gebruik skill-kleuren alleen voor de bijbehorende vaardigheid

### Don'ts
- Verander de verhoudingen van het hart-icoon niet
- Gebruik het logo niet kleiner dan 32x32 pixels
- Combineer niet meer dan 2 skill-kleuren in één design
- Gebruik geen andere fonts dan Inter voor merkcommunicatie

### URL
- **Website:** devadercoach.nl
- **Email:** info@devadercoach.nl

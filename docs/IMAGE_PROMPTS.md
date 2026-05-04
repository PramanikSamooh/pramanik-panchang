# Image prompts for Book 1 — Pramanik Panchang

This file lists every figure used in the book, where it appears, what filename to save the generated image as, and the full Gemini prompt to generate it.

When you generate an image:

1. Copy the **STYLE ANCHOR** below (always paste it at the top of your Gemini prompt).
2. Append the prompt for the specific figure you want.
3. Save the resulting image as the **filename** noted, into `public/learn/`.
4. Once an image file exists at that path, replace the `FigurePlaceholder` call in the chapter source with a `Figure` call (or tell me which ones are ready and I'll wire them in).

---

## STYLE ANCHOR (paste at the top of every prompt)

> Modern, minimal educational infographic. Clean white background (#ffffff). Flat vector style with thin precise linework. Primary accents: saffron orange (#e8732c), indigo (#2a3f6b), muted gold (#c9a341). Generous white space. No textures, no manuscript feel, no decorative borders. Sans-serif typography. All labels appear in BOTH English and Devanagari Hindi/Sanskrit — English label first, Hindi/Sanskrit on the line below in slightly smaller size. Render Devanagari script accurately — do not invent characters. Diagram is responsive-friendly: keep the core illustration centered with breathing room so it reads on both laptop (landscape) and mobile (portrait crop). Aspect ratio 16:9.

If a Devanagari label comes out garbled in any image, regenerate that image without Devanagari text (English only). Tell me which one — I'll overlay accurate Devanagari labels in the page using HTML/CSS on top of the image.

---

# Batch 1 — Foundational figures (Chapters 1, 2, 3, 4, 7, 8, 9, 10)

---

### Figure 1.1 — Earth–Sun–Moon system

**Chapter:** Time and the Sky
**Filename:** `01-earth-sun-moon.png`
**Caption:** Earth–Sun–Moon system: rotation, revolution, and the Moon's orbit.

> Astronomical diagram, three bodies on a horizontal layout. Left: Sun (large saffron circle with subtle rays). Center: Earth (medium blue-green sphere with tilted axis line shown). Right of Earth: Moon (small grey sphere) on a dotted elliptical orbit around Earth. Earth's day/night terminator visible — half lit toward Sun, half dark. Three labeled arrows: (a) curved arrow on Earth = "Rotation / घूर्णन", (b) long curved arrow Earth-around-Sun = "Revolution / परिक्रमा", (c) curved arrow on Moon orbit = "Lunar orbit / चंद्र-कक्षा". Small footnote text: "Not to scale / मापन के अनुसार नहीं". Bilingual labels for Sun ("Sun / सूर्य"), Earth ("Earth / पृथ्वी"), Moon ("Moon / चंद्र").

---

### Figure 1.2 — Solar day vs Sidereal day

**Chapter:** Time and the Sky
**Filename:** `02-solar-vs-sidereal-day.png`
**Caption:** Solar day vs sidereal day: why a solar day is about 4 minutes longer.

> Two side-by-side panels with a thin vertical divider.
> Left panel header: "Sidereal Day / नक्षत्र दिन — 23h 56min". Show Earth at orbit position 1, an arrow pointing up to a distant star labeled "Reference star / संदर्भ नक्षत्र", and the Sun off to one side.
> Right panel header: "Solar Day / सौर दिन — 24h 00min". Show Earth slightly advanced along its orbit (position 2), the same star still overhead (sidereal rotation complete), but the Sun is NOT yet overhead — small arrow labeled "Earth must rotate ~1° more / पृथ्वी को ~1° अधिक घूमना पड़ता है".
> Bottom bilingual caption: "Why a solar day is ~4 minutes longer / सौर दिन ~4 मिनट लंबा क्यों होता है".

---

### Figure 1.3 — Precession of the equinoxes

**Chapter:** Time and the Sky
**Filename:** `03-precession.png`
**Caption:** Precession of the equinoxes: Earth's axis traces a slow cone over ~25,800 years.

> Earth at center with rotation axis shown as an arrow. The arrow's tip traces a circle (the precession cone) labelled "~25,800 years / ~25,800 वर्ष". Two zodiac rings are drawn around Earth — one fixed to stars (sidereal/nirayana) and one rotating with Earth's orientation (tropical/sayana). Show the gap of ~24° between the start of Aries in each ring, labelled "Ayanamsha ~24° / अयनांश ~24°". Bilingual labels for "Earth axis / पृथ्वी की धुरी", "Precession cone / अयन-शंकु", "Sidereal zodiac / निरयण राशि-चक्र", "Tropical zodiac / सायन राशि-चक्र".

---

### Figure 2.1 — Tithi formation (12° Sun-Moon angle)

**Chapter:** Tithi
**Filename:** `04-tithi-formation.png`
**Caption:** One tithi = a 12° angular separation between Moon and Sun, as seen from Earth.

> Top-down view of a circular zodiac belt as a thin ring. Earth at center (small blue dot, labeled "Earth / पृथ्वी"). Sun marked on the ring at 0° (saffron dot, labeled "Sun / सूर्य"). Moon marked at +12° ahead along the ring (grey dot with crescent, labeled "Moon / चंद्र"). A curved arc between them highlighted in gold, labeled "12° = 1 Tithi / एक तिथि".
> Faint inner ring divided into 30 equal 12° wedges, numbered 1 to 30. Top half labeled "Shukla Paksha / शुक्ल पक्ष" (waxing) with small filling-moon icons. Bottom half labeled "Krishna Paksha / कृष्ण पक्ष" (waning) with emptying-moon icons.
> Title at top: "How a Tithi is born / तिथि कैसे बनती है".

---

### Figure 2.2 — The 30 Tithis cycle

**Chapter:** Tithi
**Filename:** `05-thirty-tithis-cycle.png`
**Caption:** The 30 tithis of a lunar month — Shukla paksha (waxing) and Krishna paksha (waning).

> Horizontal infographic. Top row: Shukla Paksha — 15 small circles left-to-right, each showing a moon-phase icon growing from thin crescent (Pratipada / प्रतिपदा) to full moon (Purnima / पूर्णिमा). Each circle labeled with English name above and Devanagari name below. Bottom row: Krishna Paksha — 15 circles continuing from full moon shrinking to new moon (Amavasya / अमावस्या). Section headers: "Shukla Paksha — Waxing / शुक्ल पक्ष" above top row, "Krishna Paksha — Waning / कृष्ण पक्ष" above bottom row. Saffron tone for Shukla, indigo tone for Krishna.

---

### Figure 2.3 — Jain Udaya Tithi (6-ghati rule)

**Chapter:** Tithi
**Filename:** `06-jain-udaya-tithi.png`
**Caption:** Jain udaya tithi: the tithi prevailing in the first 6 ghatis after sunrise governs the entire day.

> Horizontal time-bar infographic. A long bar represents one civil day, with a sun-icon at the left edge labeled "Sunrise / सूर्योदय". The first 6 ghatis (~2h 24min) after sunrise highlighted as a glowing saffron band labeled "First 6 Ghati / पहली 6 घटी (≈ 2h 24m)".
> Two scenarios stacked vertically below the main bar:
>  Scenario A — "Tithi X active during 6-ghati window → Day = Tithi X / पूरा दिन तिथि X"
>  Scenario B — "Tithi X ends before window closes, Tithi Y takes over → Day = Tithi Y / पूरा दिन तिथि Y"
> Each scenario shown as a mini timeline with colored segments.
> Bottom bilingual caption box: "Jain rule: the tithi prevailing during the first 6 ghatis after sunrise governs the entire day. / जैन नियम: सूर्योदय के बाद पहली 6 घटी में जो तिथि हो, वही पूरे दिन की उदय तिथि होती है।"

---

### Figure 3.1 — Hora derivation of weekday sequence

**Chapter:** Vara
**Filename:** `07-hora-weekday-derivation.png`
**Caption:** The hora derivation: planets in Chaldean order, advancing 3 steps every 24 hours, generates the weekday sequence.

> A heptagon with the 7 planets at its vertices in the Chaldean order (Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon — slowest to fastest, going clockwise). Each vertex labelled with both English and Devanagari ("Saturn / शनि", "Jupiter / गुरु", "Mars / मंगल", "Sun / सूर्य", "Venus / शुक्र", "Mercury / बुध", "Moon / चंद्र"). Inside, draw arrows skipping 2 vertices at a time (i.e., advancing by 3 positions = 24 mod 7), creating a 7-pointed star pattern. Each arrow is labeled with the weekday transition: "Sun→Mon", "Mon→Tue", "Tue→Wed", "Wed→Thu", "Thu→Fri", "Fri→Sat", "Sat→Sun".
> Title at top: "Why the week is Sun-Mon-Tue-Wed-Thu-Fri-Sat / सप्ताह का क्रम क्यों ऐसा है".

---

### Figure 4.1 — The 27 Nakshatras belt

**Chapter:** Nakshatra
**Filename:** `08-twentyseven-nakshatras.png`
**Caption:** The 27 nakshatras as 13°20′ segments around the ecliptic, with the Moon's monthly path.

> Circular ring (ecliptic belt) divided into 27 equal segments of 13°20' each. Each segment contains the traditional symbol of that nakshatra as a simple flat-vector icon (e.g., horse-head for Ashwini, yoni for Bharani, razor for Krittika, cart for Rohini, deer-head for Mrigashira, etc.). Each segment labeled outside the ring: English name on top line, Devanagari below (e.g., "Ashwini / अश्विनी", "Bharani / भरणी", "Krittika / कृत्तिका", "Rohini / रोहिणी", "Mrigashira / मृगशिरा", "Ardra / आर्द्रा", "Punarvasu / पुनर्वसु", "Pushya / पुष्य", "Ashlesha / आश्लेषा", "Magha / मघा", "Purva Phalguni / पूर्व फाल्गुनी", "Uttara Phalguni / उत्तर फाल्गुनी", "Hasta / हस्त", "Chitra / चित्रा", "Swati / स्वाति", "Vishakha / विशाखा", "Anuradha / अनुराधा", "Jyeshtha / ज्येष्ठा", "Mula / मूल", "Purva Ashadha / पूर्वाषाढ़ा", "Uttara Ashadha / उत्तराषाढ़ा", "Shravana / श्रवण", "Dhanishta / धनिष्ठा", "Shatabhisha / शतभिषा", "Purva Bhadrapada / पूर्व भाद्रपदा", "Uttara Bhadrapada / उत्तर भाद्रपदा", "Revati / रेवती").
> Center: small Earth icon labelled "Earth / पृथ्वी". A small Moon icon on the ring with a curved dotted arrow tracing its monthly path through all 27.
> Title above: "The 27 Nakshatras / 27 नक्षत्र". Subtle thin gridlines, no starfield background — keep it minimal flat-vector.

---

### Figure 4.2 / 7.3 — Nakshatras within Rashis (108-pada principle)

**Chapter:** Nakshatra (and reused in Rashi & Nakshatra chapter)
**Filename:** `09-nakshatras-within-rashis.png`
**Caption:** The 27 nakshatras and 12 rashis on the same ecliptic. 27 × 4 padas = 12 × 9 padas = 108.

> Concentric ring diagram. Outer ring: 12 Rashis (30° each), each labeled bilingually (e.g., "Mesha / मेष", "Vrishabha / वृषभ", etc.). Inner ring: 27 Nakshatras (13°20' each), labeled bilingually. Thin radial lines drop from each nakshatra boundary to show how they overlap with rashi boundaries (e.g., Krittika is shown straddling the Mesha–Vrishabha boundary).
> Inset on the right: a zoomed-in single rashi (Mesha / मेष) showing exactly which nakshatras and padas (quarters) fall inside it — labeled "Mesha contains: Ashwini (4 padas) + Bharani (4 padas) + Krittika pada 1 / मेष में: अश्विनी + भरणी + कृत्तिका का प्रथम चरण".
> Bottom caption: "27 × 4 = 12 × 9 = 108 padas / 27 × 4 = 12 × 9 = 108 पाद".
> Title: "Nakshatras within Rashis / राशियों में नक्षत्र".

---

### Figure 7.1 — The 12 Rashis (zodiac wheel)

**Chapter:** Rashi & Nakshatra
**Filename:** `10-twelve-rashis.png`
**Caption:** The twelve rashis of the zodiac, each 30° wide, with their lords and elements.

> Circular zodiac wheel divided into 12 equal 30° segments. Each segment contains a flat-vector traditional Indian-style icon for the rashi (ram, bull, twins, crab, lion, virgin, scales, scorpion, archer, sea-goat/Makara, water-bearer, fishes). Each segment labeled with: English name on top, Devanagari on next line, ruling planet symbol/name below. Examples: "Aries / मेष — Mars / मंगल", "Taurus / वृषभ — Venus / शुक्र", "Gemini / मिथुन — Mercury / बुध", "Cancer / कर्क — Moon / चंद्र", "Leo / सिंह — Sun / सूर्य", "Virgo / कन्या — Mercury / बुध", "Libra / तुला — Venus / शुक्र", "Scorpio / वृश्चिक — Mars / मंगल", "Sagittarius / धनु — Jupiter / गुरु", "Capricorn / मकर — Saturn / शनि", "Aquarius / कुम्भ — Saturn / शनि", "Pisces / मीन — Jupiter / गुरु".
> Center: Earth, with Sun's apparent annual path drawn as a dotted circle through all 12 segments.
> Title above: "The 12 Rashis / 12 राशियाँ". Color each segment subtly by element: fire signs warm tone, earth signs muted green, air signs light blue, water signs aqua — but keep palette overall minimal.

---

### Figure 7.2 — Rashi rulerships symmetry

**Chapter:** Rashi & Nakshatra
**Filename:** `11-rashi-rulership-symmetry.png`
**Caption:** Rashi rulerships: the seven planets arranged symmetrically around the Karka-Simha axis.

> A circular zodiac wheel with all 12 rashis. Highlight the Karka-Simha pair at top (Moon's and Sun's only rashis) — these are at the apex of the symmetry axis. Then show the pairs symmetric around this axis using matching colours: Mithuna-Kanya in green (Mercury's two), Vrishabha-Tula in white (Venus's two), Mesha-Vrishchika in red (Mars's two), Meena-Dhanu in yellow (Jupiter's two), Kumbha-Makara in dark blue (Saturn's two). Each rashi labeled bilingually.
> Draw the symmetry axis as a vertical line through the Karka-Simha boundary at top and the Makara-Kumbha boundary at bottom, labelled "Symmetry axis / सममिति-अक्ष".
> Title: "The Symmetric Arrangement of Planetary Lords / ग्रहों के स्वामित्व का सममित विन्यास".

---

### Figure 8.1 — The 9 Grahas family

**Chapter:** Nine Grahas
**Filename:** `12-nine-grahas.png`
**Caption:** The nine grahas and their key associations.

> A symmetrical 3×3 grid of 9 cards. Each card contains a flat-vector minimalist icon (NOT photorealistic, NOT classical deity art — keep it modern flat-vector matching the rest of the book). Each card has: graha symbol icon at top, then English name, then Devanagari name, then a one-line role descriptor in both languages.
> Suggested icons:
>  • Surya / सूर्य — sun disc with rays — "Soul / आत्मा"
>  • Chandra / चंद्र — crescent moon — "Mind / मन"
>  • Mangal / मंगल — red triangle/spear — "Energy / ऊर्जा"
>  • Budh / बुध — green book/pen — "Intellect / बुद्धि"
>  • Guru / गुरु — yellow lotus / scripture — "Wisdom / ज्ञान"
>  • Shukra / शुक्र — white star — "Love & arts / प्रेम-कला"
>  • Shani / शनि — dark blue ring/saturn-glyph — "Discipline / अनुशासन"
>  • Rahu / राहु — shadowy serpent-head silhouette — "North node / उत्तर पात"
>  • Ketu / केतु — serpent-tail silhouette — "South node / दक्षिण पात"
> Card backgrounds in subtly different muted tints. Title at top: "The 9 Grahas / नवग्रह".

---

### Figure 9.1 — Vedic time hierarchy (vipal/pal/ghati/day)

**Chapter:** Time Units
**Filename:** `13-vedic-time-hierarchy.png`
**Caption:** The traditional Indian time hierarchy: vipal → pal → ghati → day.

> Vertical stacked-bar infographic, four levels nested visually (largest at top).
> Level 1 (full width): "1 Day / 1 दिन = 60 Ghati / 60 घटी = 24 hours"
> Level 2 (1/60 width segment highlighted): "1 Ghati / 1 घटी = 60 Pal / 60 पल = 24 minutes"
> Level 3 (1/60 of Ghati highlighted): "1 Pal / 1 पल = 60 Vipal / 60 विपल = 24 seconds"
> Level 4 (smallest highlighted): "1 Vipal / 1 विपल = 0.4 second / 0.4 सेकंड"
> Right-side column shows modern clock equivalents alongside each level. A small sundial icon as a decorative anchor in the corner. Title: "Vedic Time Units / वैदिक काल-गणना".

---

### Figure 9.2 — The 30 muhurtas of the day

**Chapter:** Time Units
**Filename:** `14-thirty-muhurtas.png`
**Caption:** The 30 muhurtas of the 24-hour day. Sunrise at 6 o'clock position, sunset at 12. Abhijit and Brahma muhurta highlighted.

> Circular 24-hour clock divided into 30 equal wedges (each = 48 min). Sunrise positioned at the 6 o'clock / east marker labeled "Sunrise / सूर्योदय". Sunset at the 12 o'clock / west marker labeled "Sunset / सूर्यास्त". Upper half (day, sunrise → sunset): wedges 1–15 in light saffron tones. Lower half (night, sunset → sunrise): wedges 16–30 in light indigo tones.
> Wedge 8 (solar noon) highlighted in gold and labeled "Abhijit / अभिजित्". Pre-dawn wedge 27 highlighted lightly with label "Brahma Muhurta / ब्रह्म मुहूर्त".
> Each wedge numbered 1–30. Outer ring label: "30 Muhurtas of a day / दिन के 30 मुहूर्त". Center label: "1 Muhurta = 48 min / एक मुहूर्त = 48 मिनट".

---

### Figure 10.1 — Choghadiya structure

**Chapter:** Choghadiya
**Filename:** `15-choghadiya-day-night.png`
**Caption:** Choghadiya structure: 8 day-periods, 8 night-periods, each colour-coded.

> Two horizontal bars stacked vertically.
> Top bar: "Day Choghadiya / दिन का चौघड़िया (Sunrise → Sunset / सूर्योदय → सूर्यास्त)" divided into 8 equal segments. Each segment color-coded: green = auspicious, red = inauspicious, yellow = neutral. Names labeled inside each segment in both scripts. Use Thursday's sequence as the example: "Shubh / शुभ" (green), "Rog / रोग" (red), "Udveg / उद्वेग" (red), "Char / चर" (yellow), "Labh / लाभ" (green), "Amrit / अमृत" (green), "Kaal / काल" (red), "Shubh / शुभ" (green).
> Bottom bar: "Night Choghadiya / रात का चौघड़िया (Sunset → Sunrise / सूर्यास्त → सूर्योदय)" — same 8-segment structure with the night-shifted starting position for Thursday: "Amrit / अमृत", "Char / चर", "Rog / रोग", "Kaal / काल", "Labh / लाभ", "Udveg / उद्वेग", "Shubh / शुभ", "Amrit / अमृत".
> Right side legend box: green dot "Auspicious / शुभ", red dot "Inauspicious / अशुभ", yellow dot "Neutral / सामान्य".
> Footnote: "Starting Choghadiya depends on weekday. Example shown: Thursday / शुरुआत वार पर निर्भर। उदाहरण: गुरुवार".

---

### Figure 11.1 — Day's malefic windows + auspicious muhurtas

**Chapter:** Muhurta + Rahu Kaal
**Filename:** `16-malefic-windows.png`
**Caption:** The day's malefic windows: Rahu Kaal, Yamaganda, Gulika, plus auspicious Abhijit and Brahma muhurta.

> Horizontal bar from sunrise (left) to sunset (right) divided into 8 equal numbered segments (1 through 8). Below the bar: a continuation of pre-dawn area labeled "Brahma Muhurta / ब्रह्म मुहूर्त" in soft gold (~96 minutes before sunrise).
> Highlight using Tuesday's assignments as an example:
>  Segment 7 in red — "Rahu Kaal / राहु काल"
>  Segment 3 in dark red — "Yamaganda / यमगण्ड"
>  Segment 5 in deep red — "Gulika / गुलिक"
> Highlight in gold the Abhijit muhurta at midday (between segments 4 and 5, ±24 min from solar noon) — "Abhijit / अभिजित्".
> Bilingual labels for "Sunrise / सूर्योदय" at left edge, "Sunset / सूर्यास्त" at right edge, "Solar noon / मध्याह्न" at center.
> Footer: "Example shown: Tuesday assignments / उदाहरण: मंगलवार".
> Title: "The Day's Sacred and Avoided Windows / दिन के शुभ और वर्ज्य काल".

---

# How to add an image once generated

When you save (for example) `01-earth-sun-moon.png` into `public/learn/`, the corresponding chapter still shows a placeholder. Either:

**Option A — tell me the filenames you've added** and I'll wire them up by replacing the `FigurePlaceholder` calls with `Figure` calls in the chapter source files.

**Option B — do it yourself**: open the chapter source file (e.g., `src/app/learn/time-and-sky/page.tsx`), find:

```tsx
import { FigurePlaceholder } from "@/components/learn/Figure";

<FigurePlaceholder
  number="1.1"
  caption="..."
  captionHi="..."
  promptHint="..."
/>
```

Replace with:

```tsx
import { Figure } from "@/components/learn/Figure";

<Figure
  number="1.1"
  src="/learn/01-earth-sun-moon.png"
  alt="Earth–Sun–Moon system showing rotation, revolution, and lunar orbit"
  caption="Earth–Sun–Moon system: rotation, revolution, and the Moon's orbit."
  captionHi="पृथ्वी–सूर्य–चंद्र: घूर्णन, परिक्रमा और चंद्रमा की कक्षा।"
/>
```

Both `Figure` and `FigurePlaceholder` are exported from the same file, so just changing the component name and adding `src` + `alt` is all you need.

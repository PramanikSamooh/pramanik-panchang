import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";
import { RASHIS } from "@/lib/learn/rashi-data";

const chapter = getChapter("rashi-and-nakshatra")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We have spent five chapters on the panchang&rsquo;s five
        limbs. Before we move into the derived topics — choghadiya,
        muhurta, and the rest — we need to lay one more piece of
        framework: the <strong>rashi</strong>{" "}
        <span lang="hi">(राशि)</span> system, the twelve-fold zodiac.
      </p>

      <p>
        Rashis are how the same ecliptic that we divided into 27
        nakshatras gets divided, alternatively, into 12 signs. Both
        divisions cover the same circle of 360°. Both are used
        simultaneously in Indian astronomy. They serve different
        purposes, and the relationship between them is one of the
        most useful pieces of knowledge in the field — the
        108-pada principle that we touched on briefly in the
        nakshatra chapter.
      </p>

      <h2>Where the rashi system came from</h2>

      <p>
        The 27-nakshatra system is older — it appears in Vedic
        literature dating back to at least 1000 BCE. The 12-rashi
        system arrived in India later, traceable through Greco-Indian
        contact in the Gupta period (~300–500 CE). The Sanskrit
        terminology, the symbols, and the elemental associations all
        show clear continuity with the Babylonian and Hellenistic
        zodiacs that India encountered during this period.
      </p>

      <p>
        This is not a problem. India absorbed the foreign material
        and integrated it with the existing nakshatra framework
        rather than replacing it. Modern Indian astronomy uses
        both — every rashi is, by construction, exactly two and a
        quarter nakshatras wide. The two systems are mathematical
        mirrors of each other on the same wheel.
      </p>

      <h2>The twelve rashis</h2>

      <p>
        Each rashi spans exactly <strong>30°</strong> of the
        ecliptic (12 × 30 = 360). The boundaries in the nirayana
        sidereal zodiac that this panchang uses are fixed against
        the background stars. Mesha (Aries) begins at 0° sidereal,
        Vrishabha (Taurus) at 30°, and so on through Meena (Pisces)
        ending at 360°.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Rashi</th>
              <th>देवनागरी</th>
              <th>English</th>
              <th>Symbol</th>
              <th>Element</th>
              <th>Quality</th>
              <th>Lord</th>
              <th>Span</th>
            </tr>
          </thead>
          <tbody>
            {RASHIS.map((r) => (
              <tr key={r.number}>
                <td>{r.number}</td>
                <td>
                  <strong>{r.name}</strong>
                </td>
                <td lang="hi">{r.nameHi}</td>
                <td>{r.english}</td>
                <td>{r.symbol}</td>
                <td>{r.element}</td>
                <td>{r.quality}</td>
                <td>
                  {r.lord}
                  <br />
                  <span lang="hi" className="text-gray-400">
                    {r.lordHi}
                  </span>
                </td>
                <td>{r.span}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FigurePlaceholder
        number="7.1"
        caption="The twelve rashis of the zodiac, each 30° wide, with their lords and elements."
        captionHi="राशि-चक्र की 12 राशियाँ, प्रत्येक 30°, स्वामी और तत्त्व सहित।"
        promptHint="See Batch 1 image #10 for the Gemini prompt."
      />

      <h2>Three classifications of rashis</h2>

      <h3>By element (tatva) <span className="hi" lang="hi">तत्त्व</span></h3>
      <p>
        The twelve rashis are sorted by four elements, three rashis
        per element — fire, earth, air, water — repeating
        cyclically.
      </p>
      <ul>
        <li>
          <strong>Fire</strong> <span lang="hi">(अग्नि)</span> —
          Mesha, Simha, Dhanu. Themes: action, will, energy,
          inspiration.
        </li>
        <li>
          <strong>Earth</strong> <span lang="hi">(पृथ्वी)</span> —
          Vrishabha, Kanya, Makara. Themes: stability, productivity,
          patience, the material.
        </li>
        <li>
          <strong>Air</strong> <span lang="hi">(वायु)</span> —
          Mithuna, Tula, Kumbha. Themes: communication, exchange,
          intellect, social organisation.
        </li>
        <li>
          <strong>Water</strong> <span lang="hi">(जल)</span> — Karka,
          Vrishchika, Meena. Themes: emotion, intuition, depth,
          the unconscious.
        </li>
      </ul>

      <h3>By quality (guna) <span className="hi" lang="hi">गुण</span></h3>
      <p>
        Three rashis per quality, four qualities — wait, no. There
        are three qualities and four rashis per quality. The
        classification is also called <em>chara</em> (movable),{" "}
        <em>sthira</em> (fixed), <em>dvisvabhava</em> (dual). The
        Western tradition calls these cardinal, fixed, and mutable.
      </p>
      <ul>
        <li>
          <strong>Movable / chara</strong>{" "}
          <span lang="hi">(चर)</span> — Mesha, Karka, Tula, Makara.
          Initiative, change, beginnings. These are the four rashis
          marking the cardinal points: 0° (Mesha = vernal equinox in
          the sayana view), 90° (Karka = summer solstice), 180°
          (Tula = autumnal equinox), 270° (Makara = winter solstice).
        </li>
        <li>
          <strong>Fixed / sthira</strong>{" "}
          <span lang="hi">(स्थिर)</span> — Vrishabha, Simha,
          Vrishchika, Kumbha. Stability, persistence, depth.
        </li>
        <li>
          <strong>Dual / dvisvabhava</strong>{" "}
          <span lang="hi">(द्विस्वभाव)</span> — Mithuna, Kanya,
          Dhanu, Meena. Adaptability, transition, flexibility.
        </li>
      </ul>

      <p>
        This is a very useful classification for muhurta:
        movable signs favour beginnings, fixed signs favour
        permanent installations, dual signs favour activities that
        require flexibility.
      </p>

      <h3>By gender / polarity</h3>
      <p>
        Odd-numbered rashis (Mesha, Mithuna, Simha, Tula, Dhanu,
        Kumbha) are classified as masculine / active / positive.
        Even-numbered rashis are feminine / receptive / negative.
        Note that &ldquo;masculine&rdquo; and &ldquo;feminine&rdquo;
        here are technical labels for the polarity, not statements
        about gender — they correspond roughly to the
        yang/yin distinction in Chinese cosmology, signalling
        whether a sign tends toward outward expression or inward
        consolidation.
      </p>

      <h2>The lords of the rashis — the seven planets&rsquo; rulerships</h2>

      <p>
        Each rashi has a ruling graha. The system uses only the
        seven classical visible bodies (Sun, Moon, and the five
        visible planets) — Rahu and Ketu do not own rashis. This
        gives 7 lords for 12 signs, so most of the lords own two
        rashis each. The exceptions are the Sun and Moon, which own
        only one each.
      </p>

      <ul>
        <li>
          <strong>Surya</strong> rules <strong>Simha (5)</strong> only.
        </li>
        <li>
          <strong>Chandra</strong> rules <strong>Karka (4)</strong> only.
        </li>
        <li>
          <strong>Mangala</strong> rules <strong>Mesha (1)</strong> and{" "}
          <strong>Vrishchika (8)</strong>.
        </li>
        <li>
          <strong>Budha</strong> rules <strong>Mithuna (3)</strong>{" "}
          and <strong>Kanya (6)</strong>.
        </li>
        <li>
          <strong>Guru</strong> rules <strong>Dhanu (9)</strong> and{" "}
          <strong>Meena (12)</strong>.
        </li>
        <li>
          <strong>Shukra</strong> rules <strong>Vrishabha (2)</strong>{" "}
          and <strong>Tula (7)</strong>.
        </li>
        <li>
          <strong>Shani</strong> rules <strong>Makara (10)</strong>{" "}
          and <strong>Kumbha (11)</strong>.
        </li>
      </ul>

      <p>
        Notice the geometric pattern. The Sun rules Simha (the
        single brightest sign in summer); the Moon rules Karka (the
        sign next to it). The other planets are arranged
        symmetrically outward: Mercury (Mithuna and Kanya — the
        signs immediately flanking Karka and Simha), Venus
        (Vrishabha and Tula — next out), Mars (Mesha and Vrishchika
        — next out), Jupiter (Meena and Dhanu — next out), Saturn
        (Kumbha and Makara — outermost). The pattern reflects each
        planet&rsquo;s &ldquo;distance&rdquo; in the Chaldean
        ordering and produces a striking mirror symmetry around the
        Karka-Simha axis (the &ldquo;summer-solstice axis&rdquo;
        in the sayana frame).
      </p>

      <FigurePlaceholder
        number="7.2"
        caption="Rashi rulerships: the seven planets arranged symmetrically around the Karka-Simha axis."
        captionHi="राशि-स्वामी: कर्क-सिंह अक्ष के चारों ओर सात ग्रहों का सममित विन्यास।"
        promptHint="A circular zodiac wheel with all 12 rashis. Highlight the Karka-Simha pair at top (Moon's and Sun's only rashis). Then show the pairs symmetric around this axis: Mithuna-Kanya (Mercury), Vrishabha-Tula (Venus), Mesha-Vrishchika (Mars), Meena-Dhanu (Jupiter), Kumbha-Makara (Saturn). Use a colour for each planet's pair, with the symmetry axis clearly drawn."
      />

      <h2>How the 27 nakshatras map onto the 12 rashis</h2>

      <p>
        Now the geometric punchline. Each rashi is 30°. Each
        nakshatra is 13°20′. Because 30 ÷ 13°20′ = 2.25, every
        rashi contains exactly <strong>2¼ nakshatras</strong>. Or,
        equivalently:
      </p>

      <ul>
        <li>1 rashi = 30° = 9 padas (since each pada is 3°20′)</li>
        <li>1 nakshatra = 13°20′ = 4 padas</li>
        <li>2¼ nakshatras = 9 padas = 1 rashi ✓</li>
        <li>27 nakshatras × 4 padas = 108 padas total</li>
        <li>12 rashis × 9 padas = 108 padas total</li>
      </ul>

      <KeyIdea
        title="The whole zodiac contains exactly 108 padas, divisible both ways."
        titleHi="पूरे राशि-चक्र में ठीक 108 पाद हैं, जो दोनों प्रकार से विभाज्य हैं"
      >
        108 = 27 × 4 = 12 × 9. This is why malas have 108 beads, why
        108 is sacred, and why the nakshatra and rashi systems align
        perfectly without remainder. The two divisions of the
        ecliptic — one ancient and indigenous (27), one inherited and
        adapted (12) — interlock through this single number.
      </KeyIdea>

      <h2>The boundary nakshatras — straddling two rashis</h2>

      <p>
        Because 27 does not divide 12 evenly, six of the nakshatras
        straddle a rashi boundary. Three padas in one rashi, one
        pada in the next, and so on. The detailed mapping:
      </p>

      <ul>
        <li>
          <strong>Krittika</strong> straddles Mesha and Vrishabha
          (1 pada in Mesha + 3 padas in Vrishabha).
        </li>
        <li>
          <strong>Mrigashira</strong> straddles Vrishabha and Mithuna
          (2 + 2 padas).
        </li>
        <li>
          <strong>Punarvasu</strong> straddles Mithuna and Karka
          (3 + 1 padas).
        </li>
        <li>
          <strong>Uttara Phalguni</strong> straddles Simha and Kanya
          (1 + 3 padas).
        </li>
        <li>
          <strong>Chitra</strong> straddles Kanya and Tula (2 + 2
          padas).
        </li>
        <li>
          <strong>Vishakha</strong> straddles Tula and Vrishchika
          (3 + 1 padas).
        </li>
        <li>
          <strong>Uttara Ashadha</strong> straddles Dhanu and Makara
          (1 + 3 padas).
        </li>
        <li>
          <strong>Dhanishta</strong> straddles Makara and Kumbha
          (2 + 2 padas).
        </li>
        <li>
          <strong>Purva Bhadrapada</strong> straddles Kumbha and Meena
          (3 + 1 padas).
        </li>
      </ul>

      <p>
        Nine such straddling nakshatras × 2 rashis each = 18
        nakshatra-rashi shared boundaries. The remaining 18
        nakshatras (27 − 9) sit cleanly inside one rashi each. Total
        nakshatra-rashi memberships = 18 × 1 + 9 × 2 = 36, which
        matches 12 rashis × 3 nakshatras each (where a straddling
        nakshatra counts as a partial member of each).
      </p>

      <h3>Why this matters: the Moon-rashi vs the Moon-nakshatra</h3>

      <p>
        When a panchang lists the &ldquo;Moon rashi&rdquo; for a
        person — colloquially called <em>rashi</em> in everyday
        speech, formally <em>chandra rashi</em>{" "}
        <span lang="hi">(चन्द्र राशि)</span> — it is just stating
        which 30° segment the Moon occupied at birth. The
        nakshatra at birth (the janma nakshatra) is the finer
        13°20′ segment within that range, and the pada is the
        even finer 3°20′ subdivision.
      </p>

      <p>
        Here is the practical consequence. Two people might be born
        in the same Moon rashi (say, Vrishabha) but in different
        nakshatras within it (say, one in Krittika padas 2-4, the
        other in Rohini, the third in Mrigashira padas 1-2). They
        share the Moon-rashi level reading, but their janma
        nakshatra — and therefore their Vimshottari dasha sequence,
        their gana-yoni-varna, and their detailed character profile
        in the classical scheme — differs significantly. This is
        why detailed Indian astrology cares more about the
        nakshatra than the rashi for individual analysis, even
        though casual conversation often references only the
        rashi.
      </p>

      <FigurePlaceholder
        number="7.3"
        caption="Detail: how the nakshatras map onto the 12 rashis, with straddling nakshatras highlighted."
        captionHi="विस्तार: 27 नक्षत्र 12 राशियों पर कैसे विभाजित होते हैं, सीमा-वर्ती नक्षत्र चिह्नित।"
        promptHint="See Batch 1 image #11 for the Gemini prompt."
      />

      <h2>Solar months vs lunar months — the Sun&rsquo;s journey through rashis</h2>

      <p>
        We have so far emphasised the Moon&rsquo;s position. But the
        Sun also moves through the rashis, taking about a month to
        cross each (since the Sun&rsquo;s annual journey is 360° ÷
        12 ≈ 30 days per rashi). Each Sun-into-rashi crossing is
        called a <em>sankranti</em>{" "}
        <span lang="hi">(संक्रान्ति)</span>.
      </p>

      <p>
        The most famous is <strong>Makar Sankranti</strong> —
        the Sun&rsquo;s entry into Makara (Capricorn), which falls
        around 14 January each year. This is celebrated as the
        beginning of the Sun&rsquo;s northward journey
        (uttarayana, a sayana concept) and is a major Hindu
        festival. Other notable sankrantis include Mesha
        Sankranti (Sun enters Aries, around 14 April — the solar
        new year in many regions of India and South-East Asia)
        and Karka Sankranti (Sun enters Cancer, marking the start
        of dakshinayana, the southward journey).
      </p>

      <p>
        The solar months derived from these sankrantis form the
        basis of one of the two main month-counting systems in
        India: the <em>solar calendar</em>{" "}
        <span lang="hi">(सौर पंचांग)</span>, used in Tamil Nadu,
        Kerala, Bengal, Odisha, Assam, and parts of Punjab. The
        other system — the <em>lunar calendar</em>{" "}
        <span lang="hi">(चान्द्र पंचांग)</span>, which counts months
        from new moon to new moon (or full moon to full moon) — is
        used in most of the rest of India. Both are valid; both are
        ancient; both are still in active use. This panchang uses
        the lunar amanta system primarily, with sankrantis flagged
        on the days they occur.
      </p>

      <h2>The natal Moon-rashi and life</h2>

      <p>
        The Moon-rashi at the moment of birth is one of the most
        often-cited single facts in everyday Indian astrology — it
        is what most people mean when they tell you their
        &ldquo;rashi.&rdquo; This is fundamentally different from
        the Western &ldquo;Sun-sign.&rdquo; Western astrology uses
        the Sun&rsquo;s sayana position (and so the same date in
        the Western system always gives the same Sun-sign).
        Classical Indian astrology uses the Moon&rsquo;s nirayana
        position — and since the Moon moves through all 12 rashis
        in 27 days, the Moon-rashi changes every two and a quarter
        days.
      </p>

      <p>
        So: a child born on 1 January 1990 has a fixed
        Western Sun-sign (Capricorn) but a Moon-rashi that depends
        on the time of birth that day. Two children born twelve
        hours apart on the same date might have different
        Moon-rashis. This is one reason a precise birth time is
        important for Indian astrology — much more important than
        for Western Sun-sign astrology.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>State that a rashi is 30° and there are 12.</li>
        <li>
          List the 12 rashis with their lord, element, and quality.
        </li>
        <li>
          Explain the symmetric arrangement of planetary lords
          around the Karka-Simha axis.
        </li>
        <li>
          Show that 12 rashis × 9 padas = 27 nakshatras × 4 padas =
          108 padas.
        </li>
        <li>
          Identify the nine nakshatras that straddle rashi
          boundaries.
        </li>
        <li>
          Distinguish chandra-rashi (Moon-rashi) from janma
          nakshatra and from sayana Sun-sign.
        </li>
        <li>
          Define sankranti and identify Makar, Mesha, and Karka
          sankrantis.
        </li>
        <li>
          Distinguish solar-month-based and lunar-month-based
          calendars in active Indian use.
        </li>
      </ul>

      <p>
        Open the daily panchang. The Moon-rashi (chandra rashi) is
        usually shown alongside the nakshatra. Note today&rsquo;s.
        Look up the Moon&rsquo;s longitude (you may have to compute
        from the nakshatra — if the Moon is in Krittika pada 3, that
        is roughly 33° sidereal, which is in early Vrishabha). Then
        the chapter closes by checking: the Moon&rsquo;s rashi from
        its longitude should match what the panchang reports.
      </p>

      <p>
        In the next chapter we look at the nine grahas — Sun, Moon,
        five visible planets, and the two lunar nodes Rahu and Ketu
        — in much more depth than we have so far. Each graha has its
        own personality, its own significations, its own friendships
        and enmities, and a host of derived effects in chart and
        panchang reading.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        हमने पंचांग के पाँच अंगों पर पाँच अध्याय बिताये हैं। व्युत्पन्न
        विषयों &mdash; चौघड़िया, मुहूर्त इत्यादि &mdash; की ओर बढ़ने से पहले
        हमें एक और ढाँचा खड़ा करना है: <strong>राशि</strong> प्रणाली, बारह-
        गुना राशि-चक्र।
      </p>

      <p>
        राशियाँ वही क्रान्तिवृत्त हैं जिसे हम 27 नक्षत्रों में बाँट चुके
        हैं &mdash; अब उसी को हम 12 राशियों में बाँटते हैं। दोनों विभाजन
        उसी 360° के वृत्त को ढकते हैं। दोनों भारतीय खगोल विज्ञान में एक
        साथ प्रयुक्त होते हैं। उनके प्रयोजन भिन्न हैं, और उन दोनों का
        पारस्परिक सम्बन्ध इस क्षेत्र की सबसे उपयोगी जानकारियों में से एक
        है &mdash; 108-पाद का सिद्धान्त, जिसका हमने नक्षत्र-अध्याय में
        संक्षेप में उल्लेख किया था।
      </p>

      <h2>राशि-प्रणाली कहाँ से आयी</h2>

      <p>
        27-नक्षत्र प्रणाली प्राचीनतर है &mdash; वैदिक साहित्य में जो कम-से-
        कम 1000 ईसा पूर्व का है, उसमें यह उपस्थित है। 12-राशि प्रणाली भारत
        में बाद में पहुँची, गुप्त-काल (~300–500 ई.) में ग्रीको-भारतीय
        सम्पर्क के माध्यम से। इस अवधि में भारत ने जो बेबीलोनी और हेलेनी
        राशि-चक्र देखे, उन्हीं से इसकी संस्कृत शब्दावली, चिह्न और तत्त्व-
        सम्बन्ध स्पष्ट निरन्तरता दिखाते हैं।
      </p>

      <p>
        यह कोई समस्या नहीं है। भारत ने विदेशी सामग्री को आत्मसात् किया और
        विद्यमान नक्षत्र-ढाँचे के साथ जोड़ दिया, उसका स्थान नहीं लिया।
        आधुनिक भारतीय खगोल विज्ञान दोनों का प्रयोग करता है &mdash; प्रत्येक
        राशि निर्माण से ही ठीक सवा-दो (2¼) नक्षत्र चौड़ी है। दोनों प्रणालियाँ
        एक ही चक्र पर एक-दूसरे का गणितीय प्रतिबिम्ब हैं।
      </p>

      <h2>बारह राशियाँ</h2>

      <p>
        प्रत्येक राशि क्रान्तिवृत्त के ठीक <strong>30°</strong> को घेरती है
        (12 × 30 = 360)। इस पंचांग में प्रयुक्त नाक्षत्र (निरयण) राशि-चक्र
        में सीमाएँ पृष्ठभूमि के तारों से बँधी हुई हैं। मेष नाक्षत्र 0° से
        प्रारम्भ होती है, वृषभ 30° से, और इसी प्रकार आगे मीन 360° पर
        समाप्त होती है।
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>राशि</th>
              <th>लिप्यन्तरण</th>
              <th>अंग्रेज़ी</th>
              <th>चिह्न</th>
              <th>तत्त्व</th>
              <th>गुण</th>
              <th>स्वामी</th>
              <th>देशांतर</th>
            </tr>
          </thead>
          <tbody>
            {RASHIS.map((r) => (
              <tr key={r.number}>
                <td>{r.number}</td>
                <td>
                  <strong lang="hi">{r.nameHi}</strong>
                </td>
                <td>{r.name}</td>
                <td>{r.english}</td>
                <td>{r.symbol}</td>
                <td>{r.element}</td>
                <td>{r.quality}</td>
                <td>
                  <span lang="hi">{r.lordHi}</span>
                  <br />
                  <span className="text-gray-400">{r.lord}</span>
                </td>
                <td>{r.span}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FigurePlaceholder
        number="7.1"
        caption="The twelve rashis of the zodiac, each 30° wide, with their lords and elements."
        captionHi="राशि-चक्र की 12 राशियाँ, प्रत्येक 30°, स्वामी और तत्त्व सहित।"
        promptHint="See Batch 1 image #10 for the Gemini prompt."
      />

      <h2>राशियों के तीन वर्गीकरण</h2>

      <h3>तत्त्व के अनुसार</h3>
      <p>
        बारह राशियाँ चार तत्त्वों में बँटी हैं, प्रति तत्त्व तीन-तीन
        राशियाँ &mdash; अग्नि, पृथ्वी, वायु, जल &mdash; चक्रीय रूप से।
      </p>
      <ul>
        <li>
          <strong>अग्नि</strong> &mdash; मेष, सिंह, धनु। विषय: कर्म,
          संकल्प, ऊर्जा, प्रेरणा।
        </li>
        <li>
          <strong>पृथ्वी</strong> &mdash; वृषभ, कन्या, मकर। विषय: स्थैर्य,
          उत्पादकता, धैर्य, भौतिक।
        </li>
        <li>
          <strong>वायु</strong> &mdash; मिथुन, तुला, कुम्भ। विषय: संवाद,
          विनिमय, बुद्धि, सामाजिक संगठन।
        </li>
        <li>
          <strong>जल</strong> &mdash; कर्क, वृश्चिक, मीन। विषय: भावना,
          अंतर्ज्ञान, गहराई, अवचेतन।
        </li>
      </ul>

      <h3>गुण के अनुसार</h3>
      <p>
        तीन गुणों में चार-चार राशियाँ। इन्हें <em>चर</em> (चलायमान),{" "}
        <em>स्थिर</em>, और <em>द्विस्वभाव</em> (दोहरा-स्वभाव) भी कहते हैं।
        पाश्चात्य परम्परा में इन्हें कार्डिनल, फिक्स्ड, म्यूटेबल कहा जाता
        है।
      </p>
      <ul>
        <li>
          <strong>चर / चलायमान</strong> &mdash; मेष, कर्क, तुला, मकर।
          पहल, परिवर्तन, आरम्भ। ये चार राशियाँ कार्डिनल बिन्दुओं को चिह्नित
          करती हैं: 0° (मेष = सायन दृष्टिकोण से वसन्त-विषुव), 90° (कर्क =
          ग्रीष्म-संक्रान्ति), 180° (तुला = शरद-विषुव), 270° (मकर = शीत-
          संक्रान्ति)।
        </li>
        <li>
          <strong>स्थिर</strong> &mdash; वृषभ, सिंह, वृश्चिक, कुम्भ।
          स्थैर्य, स्थिरता, गहराई।
        </li>
        <li>
          <strong>द्विस्वभाव</strong> &mdash; मिथुन, कन्या, धनु, मीन।
          अनुकूलन, संक्रमण, लचीलापन।
        </li>
      </ul>

      <p>
        यह वर्गीकरण मुहूर्त के लिए अत्यंत उपयोगी है &mdash; चर राशियाँ
        आरम्भ के लिए अनुकूल, स्थिर स्थायी प्रतिष्ठापन के लिए, द्विस्वभाव
        उन कार्यों के लिए जिनमें लचीलापन चाहिए।
      </p>

      <h3>लिङ्ग / ध्रुवता के अनुसार</h3>
      <p>
        विषम-संख्यांक राशियाँ (मेष, मिथुन, सिंह, तुला, धनु, कुम्भ) पुं /
        सक्रिय / धनात्मक मानी जाती हैं। सम-संख्यांक राशियाँ स्त्री / ग्राही
        / ऋणात्मक। ध्यान दीजिए, &ldquo;पुं&rdquo; और &ldquo;स्त्री&rdquo;
        यहाँ ध्रुवता के तकनीकी लेबल हैं, लिंग-वर्गीकरण नहीं &mdash; ये
        चीनी ब्रह्माण्डविद्या के यिन-यांग के समकक्ष हैं, यह बताते हुए कि
        राशि बहिर्मुख अभिव्यक्ति की ओर झुकती है या अंतर्मुख समेकन की।
      </p>

      <h2>राशियों के स्वामी &mdash; सात ग्रहों का स्वामित्व</h2>

      <p>
        प्रत्येक राशि का एक स्वामी ग्रह है। प्रणाली केवल सात शास्त्रीय
        दृश्य ज्योतिर्मानों (सूर्य, चन्द्र और पाँच दृश्य ग्रह) का प्रयोग
        करती है &mdash; राहु और केतु राशि नहीं रखते। इस प्रकार 12 राशियों
        के लिए 7 स्वामी हैं, अतः अधिकांश दो-दो राशियों के स्वामी हैं।
        अपवाद हैं सूर्य और चन्द्र, जो केवल एक-एक के स्वामी हैं।
      </p>

      <ul>
        <li><strong>सूर्य</strong> केवल <strong>सिंह (5)</strong> के।</li>
        <li><strong>चन्द्र</strong> केवल <strong>कर्क (4)</strong> के।</li>
        <li>
          <strong>मंगल</strong> <strong>मेष (1)</strong> और{" "}
          <strong>वृश्चिक (8)</strong> के।
        </li>
        <li>
          <strong>बुध</strong> <strong>मिथुन (3)</strong> और{" "}
          <strong>कन्या (6)</strong> के।
        </li>
        <li>
          <strong>गुरु</strong> <strong>धनु (9)</strong> और{" "}
          <strong>मीन (12)</strong> के।
        </li>
        <li>
          <strong>शुक्र</strong> <strong>वृषभ (2)</strong> और{" "}
          <strong>तुला (7)</strong> के।
        </li>
        <li>
          <strong>शनि</strong> <strong>मकर (10)</strong> और{" "}
          <strong>कुम्भ (11)</strong> के।
        </li>
      </ul>

      <p>
        ज्यामितीय पैटर्न पर ध्यान दीजिए। सूर्य सिंह का स्वामी है (ग्रीष्म
        का सबसे चमकीला राशि-चिह्न); चन्द्र कर्क का (उसी से जुड़ी राशि)।
        अन्य ग्रह सममित रूप से बाहर की ओर सजते हैं: बुध (मिथुन और कन्या,
        कर्क-सिंह से लगती हुई), शुक्र (वृषभ और तुला, अगली बाहरी), मंगल
        (मेष और वृश्चिक, अगली बाहरी), गुरु (मीन और धनु, अगली बाहरी),
        शनि (कुम्भ और मकर, सबसे बाहरी)। यह क्रम कैल्डियन क्रम में हर ग्रह
        की पृथ्वी से &ldquo;दूरी&rdquo; का प्रतिबिम्ब है, और कर्क-सिंह
        अक्ष (सायन ढाँचे में &ldquo;ग्रीष्म-संक्रान्ति-अक्ष&rdquo;) के
        चारों ओर एक प्रभावी दर्पण-सममिति उत्पन्न करता है।
      </p>

      <FigurePlaceholder
        number="7.2"
        caption="Rashi rulerships: the seven planets arranged symmetrically around the Karka-Simha axis."
        captionHi="राशि-स्वामी: कर्क-सिंह अक्ष के चारों ओर सात ग्रहों का सममित विन्यास।"
        promptHint="A circular zodiac wheel with all 12 rashis. Highlight the Karka-Simha pair at top (Moon's and Sun's only rashis). Then show the pairs symmetric around this axis: Mithuna-Kanya (Mercury), Vrishabha-Tula (Venus), Mesha-Vrishchika (Mars), Meena-Dhanu (Jupiter), Kumbha-Makara (Saturn). Use a colour for each planet's pair, with the symmetry axis clearly drawn."
      />

      <h2>27 नक्षत्र 12 राशियों पर कैसे सजते हैं</h2>

      <p>
        और अब ज्यामितीय निष्कर्ष। प्रत्येक राशि 30° की। प्रत्येक नक्षत्र
        13°20' का। 30 ÷ 13°20' = 2.25, अतः प्रत्येक राशि में ठीक{" "}
        <strong>सवा-दो (2¼) नक्षत्र</strong> समाते हैं। समतुल्य रूप से —
      </p>

      <ul>
        <li>1 राशि = 30° = 9 पाद (प्रत्येक पाद 3°20')</li>
        <li>1 नक्षत्र = 13°20' = 4 पाद</li>
        <li>2¼ नक्षत्र = 9 पाद = 1 राशि ✓</li>
        <li>27 नक्षत्र × 4 पाद = कुल 108 पाद</li>
        <li>12 राशि × 9 पाद = कुल 108 पाद</li>
      </ul>

      <KeyIdea
        title="पूरे राशि-चक्र में ठीक 108 पाद हैं, जो दोनों प्रकार से विभाज्य हैं"
        titleHi="The whole zodiac contains exactly 108 padas, divisible both ways."
      >
        108 = 27 × 4 = 12 × 9। यही कारण है कि माला में 108 मणकें होती हैं,
        108 पवित्र है, और नक्षत्र तथा राशि प्रणाली बिना किसी शेष के
        सम्पूर्ण रूप से मेल खाती हैं। क्रान्तिवृत्त के दो विभाजन &mdash;
        एक प्राचीन और स्वदेशी (27), एक प्राप्त और अनुकूलित (12) &mdash;
        इसी एक अंक से जुड़ते हैं।
      </KeyIdea>

      <h2>सीमा-वर्ती नक्षत्र &mdash; दो राशियों पर फैले</h2>

      <p>
        चूँकि 27 बारह से ठीक नहीं बँटता, नौ नक्षत्र राशि-सीमाओं पर पड़ते
        हैं। एक राशि में तीन पाद, अगली में एक &mdash; और इसी प्रकार आगे।
        विस्तृत मानचित्र —
      </p>

      <ul>
        <li><strong>कृत्तिका</strong> &mdash; मेष और वृषभ पर (1 + 3 पाद)।</li>
        <li><strong>मृगशिरा</strong> &mdash; वृषभ और मिथुन पर (2 + 2 पाद)।</li>
        <li><strong>पुनर्वसु</strong> &mdash; मिथुन और कर्क पर (3 + 1 पाद)।</li>
        <li><strong>उत्तर-फाल्गुनी</strong> &mdash; सिंह और कन्या पर (1 + 3 पाद)।</li>
        <li><strong>चित्रा</strong> &mdash; कन्या और तुला पर (2 + 2 पाद)।</li>
        <li><strong>विशाखा</strong> &mdash; तुला और वृश्चिक पर (3 + 1 पाद)।</li>
        <li><strong>उत्तराषाढ़ा</strong> &mdash; धनु और मकर पर (1 + 3 पाद)।</li>
        <li><strong>धनिष्ठा</strong> &mdash; मकर और कुम्भ पर (2 + 2 पाद)।</li>
        <li><strong>पूर्व-भाद्रपदा</strong> &mdash; कुम्भ और मीन पर (3 + 1 पाद)।</li>
      </ul>

      <p>
        ऐसे नौ सीमा-वर्ती नक्षत्र × 2 राशियाँ = 18 नक्षत्र-राशि साझा सीमाएँ।
        शेष 18 नक्षत्र (27 − 9) प्रत्येक एक ही राशि के भीतर हैं। कुल
        नक्षत्र-राशि सदस्यताएँ = 18 × 1 + 9 × 2 = 36, जो 12 राशियों × 3
        नक्षत्र प्रत्येक से मेल खाती है (जहाँ सीमा-वर्ती नक्षत्र दोनों
        राशियों का आंशिक सदस्य गिना जाता है)।
      </p>

      <h3>व्यावहारिक महत्त्व: चन्द्र-राशि बनाम जन्म-नक्षत्र</h3>

      <p>
        जब पंचांग किसी व्यक्ति की &ldquo;चन्द्र राशि&rdquo; बताता है &mdash;
        बोलचाल में जिसे केवल <em>राशि</em>, और औपचारिक रूप से <em>चन्द्र
        राशि</em> कहा जाता है &mdash; तो वह केवल यह बता रहा है कि जन्म के
        समय चन्द्र किस 30° खंड में था। उसी अवधि का जन्म-नक्षत्र (जन्म
        नक्षत्र) उसी सीमा में 13°20' का सूक्ष्मतर खंड है, और पाद उसका
        और भी सूक्ष्म 3°20' उपविभाजन।
      </p>

      <p>
        व्यावहारिक परिणाम यह है। दो लोग एक ही चन्द्र राशि में पैदा हो सकते
        हैं (मान लीजिए वृषभ), परन्तु उसमें भिन्न नक्षत्रों में (एक कृत्तिका
        के पाद 2-4 में, दूसरा रोहिणी में, तीसरा मृगशिरा के पाद 1-2 में)।
        वे चन्द्र-राशि स्तर पर साझेदार हैं, परन्तु उनका जन्म-नक्षत्र &mdash;
        और इसलिए विंशोत्तरी दशा का क्रम, गण-योनि-वर्ण, तथा शास्त्रीय योजना
        में उनका विस्तृत चरित्र-विवरण &mdash; महत्त्वपूर्ण रूप से भिन्न होगा।
        यही कारण है कि व्यक्तिगत विश्लेषण के लिए विस्तृत भारतीय ज्योतिष
        राशि से अधिक नक्षत्र पर ध्यान देता है, यद्यपि सामान्य बातचीत में
        केवल राशि का उल्लेख होता है।
      </p>

      <FigurePlaceholder
        number="7.3"
        caption="Detail: how the nakshatras map onto the 12 rashis, with straddling nakshatras highlighted."
        captionHi="विस्तार: 27 नक्षत्र 12 राशियों पर कैसे विभाजित होते हैं, सीमा-वर्ती नक्षत्र चिह्नित।"
        promptHint="See Batch 1 image #11 for the Gemini prompt."
      />

      <h2>सौर मास बनाम चन्द्र मास &mdash; सूर्य की राशियों में यात्रा</h2>

      <p>
        अब तक हमने चन्द्रमा की स्थिति पर ज़ोर दिया है। परन्तु सूर्य भी
        राशियों से होकर जाता है, प्रत्येक राशि में लगभग एक मास (सूर्य की
        वार्षिक यात्रा 360° ÷ 12 ≈ 30 दिन प्रति राशि)। सूर्य के एक राशि से
        दूसरी में प्रवेश के प्रत्येक क्षण को <em>संक्रान्ति</em> कहते हैं।
      </p>

      <p>
        सबसे प्रसिद्ध है <strong>मकर संक्रान्ति</strong> &mdash; सूर्य का
        मकर में प्रवेश, जो लगभग 14 जनवरी को होता है। यह सूर्य की उत्तर
        दिशा की यात्रा के आरम्भ (उत्तरायण, एक सायन अवधारणा) के रूप में
        मनाया जाता है और एक प्रमुख त्योहार है। अन्य उल्लेखनीय संक्रान्तियाँ
        हैं मेष संक्रान्ति (सूर्य का मेष में प्रवेश, लगभग 14 अप्रैल
        &mdash; भारत के अनेक भागों और दक्षिण-पूर्व एशिया में सौर नव वर्ष)
        और कर्क संक्रान्ति (सूर्य का कर्क में प्रवेश, दक्षिणायन का आरम्भ)।
      </p>

      <p>
        इन संक्रान्तियों से निकले सौर मास भारत की दो प्रमुख मास-गणना
        प्रणालियों में से एक का आधार बनते हैं: <em>सौर पंचांग</em>, जिसका
        प्रयोग तमिलनाडु, केरल, बंगाल, ओडिशा, असम और पंजाब के कुछ भागों में
        होता है। दूसरी प्रणाली &mdash; <em>चान्द्र पंचांग</em>, जो मासों
        को अमावस्या से अमावस्या तक (अथवा पूर्णिमा से पूर्णिमा तक) गिनती
        है &mdash; भारत के शेष अधिकांश भाग में प्रयुक्त है। दोनों ही वैध
        हैं; दोनों प्राचीन हैं; दोनों आज भी सक्रिय रूप से प्रयोग में हैं।
        यह पंचांग मुख्यतः चान्द्र अमान्त प्रणाली का प्रयोग करता है, और
        संक्रान्तियों को उनके दिन पर चिह्नित कर देता है।
      </p>

      <h2>जन्म-कालीन चन्द्र-राशि और जीवन</h2>

      <p>
        जन्म के क्षण की चन्द्र-राशि सामान्य भारतीय ज्योतिष में सबसे
        अधिक उद्धृत एकल तथ्य है &mdash; जब अधिकांश लोग अपनी
        &ldquo;राशि&rdquo; बताते हैं तो वे यही बताते हैं। यह पाश्चात्य
        &ldquo;सूर्य-राशि&rdquo; से मूलतः भिन्न है। पाश्चात्य ज्योतिष
        सूर्य की सायन स्थिति का प्रयोग करता है (और इस प्रणाली में एक ही
        तिथि सदा एक ही सूर्य-राशि देती है)। शास्त्रीय भारतीय ज्योतिष
        चन्द्र की निरयण स्थिति का प्रयोग करता है &mdash; और चूँकि चन्द्र
        सभी 12 राशियों से 27 दिनों में होकर गुज़रता है, चन्द्र-राशि हर
        सवा-दो दिन में बदलती है।
      </p>

      <p>
        अतः 1 जनवरी 1990 को जन्मे बच्चे की पाश्चात्य सूर्य-राशि स्थिर है
        (मकर), परन्तु चन्द्र-राशि उस दिन के जन्म-समय पर निर्भर है। एक ही
        तिथि के बारह घंटे के अंतर पर जन्मे दो बच्चों की चन्द्र-राशियाँ
        भिन्न हो सकती हैं। यही एक कारण है कि भारतीय ज्योतिष के लिए सटीक
        जन्म-समय महत्त्वपूर्ण है &mdash; पाश्चात्य सूर्य-राशि ज्योतिष से
        कहीं अधिक।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>बता सकें कि एक राशि 30° की है और कुल 12 हैं।</li>
        <li>12 राशियाँ अपने स्वामी, तत्त्व और गुण के साथ गिना सकें।</li>
        <li>
          कर्क-सिंह अक्ष के चारों ओर ग्रह-स्वामित्वों का सममित विन्यास
          समझा सकें।
        </li>
        <li>
          दिखा सकें कि 12 राशि × 9 पाद = 27 नक्षत्र × 4 पाद = 108 पाद।
        </li>
        <li>राशि-सीमाओं पर पड़ने वाले नौ नक्षत्र पहचान सकें।</li>
        <li>
          चन्द्र-राशि (राशि), जन्म-नक्षत्र और सायन सूर्य-राशि में भेद कर
          सकें।
        </li>
        <li>
          संक्रान्ति परिभाषित कर सकें और मकर, मेष तथा कर्क संक्रान्तियाँ
          पहचान सकें।
        </li>
        <li>
          सक्रिय भारतीय प्रयोग में सौर-मास-आधारित और चन्द्र-मास-आधारित
          कैलेंडरों में भेद कर सकें।
        </li>
      </ul>

      <p>
        दैनिक पंचांग खोलिए। चन्द्र-राशि सामान्यतः नक्षत्र के साथ दिखती है।
        आज की नोट कीजिए। चन्द्र-देशांतर निकालिए (नक्षत्र से अनुमान लगा
        सकते हैं &mdash; यदि चन्द्र कृत्तिका के पाद 3 में है, तो वह
        नाक्षत्र रूप से लगभग 33°, अर्थात् वृषभ के आरम्भ में)। फिर अध्याय
        का समापन यह जाँच कर होता है कि उस देशांतर से निकाली गयी चन्द्र-
        राशि पंचांग में दिखायी गयी से मेल खाती है या नहीं।
      </p>

      <p>
        अगले अध्याय में हम नौ ग्रहों की ओर बढ़ते हैं &mdash; सूर्य, चन्द्र,
        पाँच दृश्य ग्रह, और दो चन्द्र-पात राहु तथा केतु &mdash; अब तक से
        कहीं अधिक गहराई से। हर ग्रह का अपना व्यक्तित्व, अपनी कारकता, अपनी
        मित्रता-शत्रुता है, और कुण्डली और पंचांग-पठन में अनेक व्युत्पन्न
        प्रभाव।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

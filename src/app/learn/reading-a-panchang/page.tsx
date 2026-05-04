import { ChapterShell } from "@/components/learn/ChapterShell";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("reading-a-panchang")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We have come to the last chapter of Book 1. Across the
        previous twelve chapters we have built up every concept
        the daily panchang uses. The astronomy. The five limbs.
        The rashis and grahas. The time units. The schedules
        derived from them. The combination yogas. None of that
        was easy, and none of it was trivial. But it has all
        been preparation for one thing: <strong>being able to
        open a daily panchang and read it as a coherent
        whole</strong>, not as an intimidating table of foreign
        terms.
      </p>

      <p>
        That is what this final chapter does. We will take a
        single specific day, walk through every line of its
        panchang, and explain — using only the vocabulary
        we have built up — what each line says, where it comes
        from, and what to do with it.
      </p>

      <p>
        After this chapter, the daily panchang on this site
        should look like a well-organised paragraph rather
        than a wall of Sanskrit. That is the goal.
      </p>

      <h2>The case study: a real day</h2>

      <p>
        Open the Pramanik Panchang for any specific date — say,
        a randomly chosen <strong>Thursday in early May 2026
        in Ujjain</strong>. The exact date does not matter —
        what we are walking through is the structure of the
        information. Every daily panchang shows roughly the
        same fields, in roughly the same order. We will use
        this hypothetical Thursday throughout.
      </p>

      <p>
        Let us imagine the panchang shows the following:
      </p>

      <ul className="font-mono text-sm">
        <li>📅 Date: Thursday, 7 May 2026</li>
        <li>📍 Location: Ujjain (23.18°N, 75.78°E, IST +05:30)</li>
        <li>🌅 Sunrise: 05:54</li>
        <li>🌄 Sunset: 18:58</li>
        <li>🌙 Moonrise: 23:14 (next day)</li>
        <li>🌑 Moonset: 11:21</li>
      </ul>

      <ul className="font-mono text-sm">
        <li>Tithi: Krishna Pratipada (1) — until 14:38</li>
        <li>Vara: Guruvara (Thursday)</li>
        <li>Nakshatra: Anuradha — until 19:03</li>
        <li>Yoga: Variyana — until 11:42</li>
        <li>Karana: Kaulava → Taitila (changeover at 14:38)</li>
        <li>Sun in: Mesha (Aries) — sidereal</li>
        <li>Moon in: Vrishchika (Scorpio) — sidereal</li>
      </ul>

      <ul className="font-mono text-sm">
        <li>Rahu Kaal: 13:55 – 15:32</li>
        <li>Yamaganda: 05:54 – 07:32</li>
        <li>Gulika: 09:09 – 10:46</li>
        <li>Abhijit muhurta: 12:18 – 13:06</li>
        <li>Brahma muhurta: 04:18 – 05:06</li>
      </ul>

      <ul className="font-mono text-sm">
        <li>Choghadiya (day): Shubh, Rog, Udveg, Char, Labh, Amrit, Kaal, Shubh</li>
        <li>Special yoga: <strong>Sarvarth Siddhi Yoga</strong> (Anuradha + Thursday)</li>
        <li>Panchak: No</li>
        <li>Bhadra: No</li>
      </ul>

      <p>
        That is a typical daily panchang display. Looks like a
        wall of jargon. By the end of this walkthrough, you
        will read it as fluently as a weather report.
      </p>

      <h2>Step 1 — Sunrise and the day frame</h2>

      <p>
        Sunrise at <strong>05:54</strong>. This is the
        beginning of the panchang day. Everything else — tithi,
        vara, choghadiya, the malefic windows — is anchored to
        this moment. Sunset at <strong>18:58</strong>. Daylight
        duration: 18:58 − 05:54 = 13 hours 4 minutes. Night
        duration: 24:00 − 13:04 = 10 hours 56 minutes. We are
        in early May; days are getting longer (we are past the
        spring equinox in March and heading toward the summer
        solstice in June).
      </p>

      <h2>Step 2 — Identify the day and the season</h2>

      <p>
        Vara: <strong>Guruvara (Thursday)</strong>, ruled by
        Jupiter. From chapter 3, Thursday is generally
        auspicious — favoured for marriage, beginnings,
        spiritual practice, and dharmic undertakings. Good news.
      </p>

      <p>
        Sun in <strong>Mesha (Aries)</strong>. The Sun entered
        Mesha around 14 April (Mesha Sankranti) — so we are
        about 3 weeks into the solar month of Mesha (the solar
        month often called <em>Vaishakh</em> in some regional
        calendars). Spring season; the Sun is exalted in
        Mesha (recall from chapter 8 — Sun&rsquo;s exaltation
        is at 10° Mesha). The Sun is currently around 22°
        Mesha; past peak exaltation but still in its sign of
        exaltation. That contributes a subtly favourable
        background for this day.
      </p>

      <h2>Step 3 — Read the tithi and paksha</h2>

      <p>
        Tithi: <strong>Krishna Pratipada (1)</strong>, until
        14:38. The first tithi of the dark fortnight — meaning
        the Moon has just passed Purnima (full moon) and is
        beginning to wane. The previous day was Purnima.
        Today, the Moon has pulled 12° past the Sun on the
        far side, and is now 12° behind on the near side
        (technically, 12° in the &ldquo;past 360°&rdquo;
        sense — see chapter 2 for the exact definition).
      </p>

      <p>
        From the Jain udaya tithi rule: Krishna Pratipada was
        in effect at sunrise (05:54) and remained in effect
        until 14:38, well past the 6-ghati window of 05:54
        + 2h 24m = 08:18. So Krishna Pratipada is firmly the
        udaya tithi for today. The day is recorded as
        Krishna Pratipada.
      </p>

      <p>
        Pratipada is generally a routine tithi — neither
        especially auspicious nor inauspicious in itself. It
        is the &ldquo;first day&rdquo; of a fortnight, often
        used for beginning new fortnight-long observances
        (specifically, Krishna Pratipada in some regional
        calendars marks the start of Pitru Paksha or other
        ancestral observances).
      </p>

      <h2>Step 4 — Read the nakshatra</h2>

      <p>
        Nakshatra: <strong>Anuradha</strong>, until 19:03.
        Anuradha is the 17th nakshatra, in Vrishchika
        (Scorpio), ruled by Saturn (Shani), with Mitra as its
        deity. Looking up the master table from chapter 4:
        Deva gana, Deer yoni, Shudra varna. Theme:
        friendship, devotion, organisation.
      </p>

      <p>
        Important things to note about Anuradha:
      </p>

      <ul>
        <li>
          Auspicious for relationships, partnerships, alliances,
          and dharmic work.
        </li>
        <li>
          Saturn-ruled — pairs well with Saturday but the
          Saturn rulership gives it a stable, persistent
          quality even on other days.
        </li>
        <li>
          Mitra (the deity) brings the friendship-themed
          quality strongly.
        </li>
      </ul>

      <p>
        This is a good nakshatra for today. Combined with
        Thursday, what does it produce?
      </p>

      <h2>Step 5 — Identify the special yogas</h2>

      <p>
        From chapter 12: <strong>Anuradha + Thursday =
        Sarvarth Siddhi Yoga</strong>. Look at the table.
        Thursday&rsquo;s Sarvarth Siddhi nakshatras are
        Ashwini, Punarvasu, Pushya, Anuradha, Revati. We
        have Anuradha. Sarvarth Siddhi is in effect.
      </p>

      <p>
        This is the most consequential reading of the day.
        Sarvarth Siddhi means that almost any auspicious
        undertaking is supported, even if other indicators
        are mixed. The yoga is in effect for the duration of
        Anuradha — until 19:03 today.
      </p>

      <p>
        Yoga (the daily nitya yoga): <strong>Variyana</strong>{" "}
        (the 18th — &ldquo;excellent / superior&rdquo;), until
        11:42. From chapter 5, Variyana is one of the
        auspicious yogas. After 11:42 a different yoga begins
        (the next in sequence), but Variyana for the morning
        adds another layer of favourability. None of the
        flagged inauspicious yogas (Vyatipata, Vaidhriti, etc.)
        are in effect today.
      </p>

      <p>
        Karana: <strong>Kaulava</strong> until 14:38, then{" "}
        <strong>Taitila</strong>. Both are benign movable
        karanas (chapter 6). Bhadra is not in effect today —
        so no Vishti complications. Kaulava is suitable for
        relationship and family matters; Taitila for affection
        and pleasure.
      </p>

      <h2>Step 6 — Identify the avoidance windows</h2>

      <p>From chapter 11, today&rsquo;s malefic windows:</p>

      <ul>
        <li>
          <strong>Yamaganda: 05:54 – 07:32.</strong> First
          90-minute segment after sunrise (Thursday&rsquo;s
          Yamaganda is the 1st segment). Avoid new beginnings
          during this window. If you are starting a major
          undertaking today, you cannot do it in this slot.
        </li>
        <li>
          <strong>Gulika: 09:09 – 10:46.</strong> The 3rd
          segment. Also avoided.
        </li>
        <li>
          <strong>Rahu Kaal: 13:55 – 15:32.</strong> The 6th
          segment. Strongly avoided.
        </li>
      </ul>

      <p>
        Three malefic windows totalling about 4½ hours. The
        rest of the day is &ldquo;clear&rdquo; for ordinary
        purposes.
      </p>

      <p>
        Brahma muhurta: <strong>04:18 – 05:06</strong>{" "}
        (sunrise minus 96 minutes to sunrise minus 48
        minutes). This window is before sunrise, in the
        spiritually charged pre-dawn hour. Used for
        meditation, scripture recitation, study. Not for
        worldly beginnings.
      </p>

      <p>
        Abhijit muhurta: <strong>12:18 – 13:06</strong>{" "}
        (solar noon ± 24 minutes). On most days this is the
        single most auspicious 48-minute window. Today there
        is one wrinkle — recall from chapter 11 that{" "}
        <em>Wednesday</em> Abhijit is traditionally avoided.
        Today is Thursday, so Abhijit is fully active. It
        also does not overlap any malefic window today
        (Rahu Kaal starts at 13:55). Abhijit is available
        and unobstructed.
      </p>

      <h2>Step 7 — Read the choghadiya</h2>

      <p>
        From chapter 10, Thursday&rsquo;s first day-choghadiya
        is <strong>Shubh</strong> (Jupiter — same as the day
        ruler). The cycle continues: Shubh → Rog → Udveg →
        Char → Labh → Amrit → Kaal → Shubh.
      </p>

      <p>
        Each choghadiya is approximately (sunset − sunrise) ÷ 8
        = 13h 4m ÷ 8 ≈ 1h 38m long today. Let us compute the
        windows:
      </p>

      <table className="text-sm">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Window</th>
            <th>Choghadiya</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>05:54 – 07:32</td><td>Shubh</td><td className="text-green-400">Auspicious</td></tr>
          <tr><td>2</td><td>07:32 – 09:09</td><td>Rog</td><td className="text-red-400">Inauspicious</td></tr>
          <tr><td>3</td><td>09:09 – 10:46</td><td>Udveg</td><td className="text-red-400">Inauspicious</td></tr>
          <tr><td>4</td><td>10:46 – 12:23</td><td>Char</td><td className="text-yellow-400">Travel</td></tr>
          <tr><td>5</td><td>12:23 – 14:00</td><td>Labh</td><td className="text-green-400">Auspicious</td></tr>
          <tr><td>6</td><td>14:00 – 15:38</td><td>Amrit</td><td className="text-green-400">Highly auspicious</td></tr>
          <tr><td>7</td><td>15:38 – 17:15</td><td>Kaal</td><td className="text-red-400">Inauspicious</td></tr>
          <tr><td>8</td><td>17:15 – 18:53</td><td>Shubh</td><td className="text-green-400">Auspicious</td></tr>
        </tbody>
      </table>

      <p>
        Important overlap analysis:
      </p>

      <ul>
        <li>
          The first choghadiya (Shubh, 05:54–07:32) is fully
          inside Yamaganda. So even though it is named Shubh,
          new beginnings should not begin here. The Yamaganda
          flag overrides the choghadiya benefit.
        </li>
        <li>
          The 3rd choghadiya (Udveg, 09:09–10:46) coincides
          with Gulika. Already inauspicious; doubly avoided.
        </li>
        <li>
          The 5th and 6th choghadiyas (Labh and Amrit,
          12:23–15:38) — Labh extends to about 14:00, then
          Amrit begins. Rahu Kaal starts at 13:55.
          So the auspicious window 12:23–13:55 is the practical
          favourable slot in the early afternoon. After 13:55
          we run into Rahu Kaal.
        </li>
        <li>
          The 8th choghadiya (Shubh, 17:15–18:53) is fully
          clear. No malefic windows overlap.
        </li>
      </ul>

      <h2>Step 8 — Synthesise: when should you do what?</h2>

      <p>Here is the entire day in one summary:</p>

      <h3>Best windows on this day</h3>
      <ul>
        <li>
          <strong>04:18 – 05:06 (Brahma muhurta):</strong>{" "}
          meditation, scripture, study, dharmic practice.
        </li>
        <li>
          <strong>10:46 – 12:23 (Char choghadiya):</strong>{" "}
          travel, departures, mobility-related work.
        </li>
        <li>
          <strong>12:18 – 13:06 (Abhijit muhurta):</strong>{" "}
          general auspicious beginnings — the prime worldly
          window of the day. (Overlaps slightly with Char
          choghadiya at the start, then enters Labh.)
        </li>
        <li>
          <strong>12:23 – 13:55 (Labh choghadiya, ending at
          Rahu Kaal):</strong> commerce, financial work,
          contract signing.
        </li>
        <li>
          <strong>17:15 – 18:53 (Shubh choghadiya):</strong>{" "}
          religious, dharmic, ceremonial work in the
          afternoon-evening.
        </li>
      </ul>

      <h3>Avoidance windows on this day</h3>
      <ul>
        <li>
          <strong>05:54 – 07:32:</strong> Yamaganda and Shubh
          choghadiya overlap — net inauspicious.
        </li>
        <li>
          <strong>07:32 – 09:09:</strong> Rog choghadiya.
        </li>
        <li>
          <strong>09:09 – 10:46:</strong> Gulika and Udveg
          choghadiya — strongly avoided.
        </li>
        <li>
          <strong>13:55 – 15:32:</strong> Rahu Kaal — the
          single most-avoided window.
        </li>
        <li>
          <strong>15:38 – 17:15:</strong> Kaal choghadiya.
        </li>
      </ul>

      <h3>And the trump card</h3>
      <p>
        <strong>Sarvarth Siddhi Yoga is in effect from
        sunrise until 19:03.</strong> This means that, even
        outside the strictly-auspicious windows above,
        important undertakings are supported by this yoga
        provided they are not inside Rahu Kaal,
        Yamaganda, or Gulika. If something cannot wait for
        Abhijit muhurta or for Labh choghadiya, it can still
        proceed during a non-malefic window today on the
        strength of Sarvarth Siddhi.
      </p>

      <KeyIdea
        title="A real day's panchang reading is a synthesis."
        titleHi="वास्तविक पंचांग-पठन एक संश्लेषण है"
      >
        Five limbs (each contributing favourable or
        unfavourable signal). Three malefic windows. Eight
        choghadiya periods. Possibly one or more named
        combination yogas. The reader walks down the list,
        notes the overlaps, and identifies the windows where
        all the signals align favourably. There is no single
        formula — there is judgment, priority-setting, and
        the activity-specific question of which factors
        matter most for the task at hand.
      </KeyIdea>

      <h2>Activity-specific muhurta examples</h2>

      <p>
        Suppose three different people with three different
        plans look at this same panchang day. Each reads it
        differently.
      </p>

      <h3>Person A — beginning a new business</h3>
      <p>
        Wants Labh (commerce-favoured). Wants Sarvarth
        Siddhi support. Wants to avoid Rahu Kaal. The clear
        recommendation: <strong>start the office between
        12:30 and 13:55</strong>, in the Labh choghadiya, with
        Abhijit overlapping the early part. Sarvarth Siddhi
        Yoga is active. The activity has Mercury-favourable
        timing and Jupiter-favourable day. This is a strong
        muhurta for a business launch.
      </p>

      <h3>Person B — starting a long road journey south</h3>
      <p>
        Wants Char (travel-favoured). Wants to avoid Rahu
        Kaal and Gulika. The clear window:{" "}
        <strong>10:46 – 12:23</strong>, the Char
        choghadiya, fully clear of all malefic periods.
        Sarvarth Siddhi is active. Travel begins between
        these times. (Note: panchaka is not in effect today,
        so southward travel is not under panchaka prohibition
        either.)
      </p>

      <h3>Person C — beginning a daily meditation practice</h3>
      <p>
        Wants Brahma muhurta. <strong>04:18 – 05:06</strong> —
        the pre-dawn window, before the day&rsquo;s
        complications begin. The Brahma muhurta is its own
        recommendation; nothing else is needed.
      </p>

      <h2>What you have learned across the whole book</h2>

      <p>
        We started in the Foreword with a person who could
        not read a panchang at all. We are now ending with a
        person who can read every line of one and synthesise
        it into actionable recommendations.
      </p>

      <p>
        The path:
      </p>

      <ol>
        <li>
          <strong>Astronomy first.</strong> Earth, Sun, Moon,
          their motions, what a day really is, the sayana vs
          nirayana zodiacs, precession.
        </li>
        <li>
          <strong>The five limbs.</strong> Tithi, vara,
          nakshatra, yoga, karana — what each is, how it is
          computed, what it means.
        </li>
        <li>
          <strong>The framework.</strong> Twelve rashis, the
          27 nakshatras within them, the 108-pada matrix.
        </li>
        <li>
          <strong>The actors.</strong> The nine grahas, each
          with its character, signification, friendships, and
          period.
        </li>
        <li>
          <strong>Time units.</strong> Vipal, pal, ghati,
          muhurta, prahar — and how they map to the 24-hour
          clock.
        </li>
        <li>
          <strong>Daily schedules.</strong> Choghadiya, Rahu
          Kaal, Yamaganda, Gulika, the named auspicious
          muhurtas (Brahma, Abhijit, Godhuli).
        </li>
        <li>
          <strong>Combinations.</strong> Sarvarth Siddhi,
          Amrit Siddhi, Tripushkar, Dwipushkar, Panchaka,
          Bhadra positioning.
        </li>
        <li>
          <strong>Synthesis.</strong> Reading a complete day
          from top to bottom, identifying overlapping signals,
          and translating them into specific recommendations.
        </li>
      </ol>

      <h2>What comes next</h2>

      <p>
        Book 2 will be on <strong>kundli</strong> — the birth
        chart. Where Book 1 has answered the question
        &ldquo;what is happening in the sky right now,&rdquo;
        Book 2 will answer the question &ldquo;what was
        happening in the sky at the moment of someone&rsquo;s
        birth, and what does it mean for them?&rdquo; The
        chart types (Lagna, Rashi, Navamsa, Bhava). The
        twelve houses. Planetary aspects. Friendship and
        enmity in chart context. The Vimshottari dasha period
        cycle. How to actually read a chart. We will build on
        every concept of Book 1 — the grahas, the rashis, the
        nakshatras, the mathematics — and use them to make
        sense of the chart in front of us.
      </p>

      <p>
        For now, the daily panchang on this site has stopped
        being a wall of jargon. It is a coherent description
        of a specific astronomical day, with a specific set
        of derived schedules, in a tradition that has been
        refining the same approach for over three thousand
        years. The next time you open it, you should
        recognise everything on it.
      </p>

      <p>
        Welcome to literacy in the panchang. The first book
        is finished. Take your time before starting the
        second. Re-read chapters when concepts feel slippery.
        Open the daily panchang on a few days, of different
        weekdays and seasons, and read each one. After two
        weeks of doing this, the system will feel like
        familiar terrain, not foreign land.
      </p>

      <p className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500">
        End of Book 1. <span lang="hi">पुस्तक 1 समाप्त।</span>
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        हम पुस्तक 1 के अंतिम अध्याय में आये हैं। पिछले बारह अध्यायों में
        हमने हर वह अवधारणा एक-एक करके खड़ी की है जिसका दैनिक पंचांग प्रयोग
        करता है। खगोल विज्ञान। पाँच अंग। राशियाँ और ग्रह। काल-इकाइयाँ।
        उनसे निकलने वाली समय-सारणियाँ। संयोग योग। इनमें से कुछ भी सरल
        नहीं था, और कुछ भी तुच्छ नहीं। परन्तु यह सब एक ही उद्देश्य की
        तैयारी थी &mdash; <strong>एक दैनिक पंचांग को खोलकर उसे एक
        सुसंगत समग्र के रूप में पढ़ सकना</strong>, न कि विदेशी शब्दों की
        एक डराने वाली तालिका के रूप में।
      </p>

      <p>
        यही इस अंतिम अध्याय का कार्य है। हम एक विशिष्ट दिन लेंगे, उसके
        पंचांग की हर पंक्ति पर चलेंगे, और &mdash; अब तक बनायी गयी
        शब्दावली का प्रयोग करके &mdash; समझायेंगे कि हर पंक्ति क्या कहती
        है, कहाँ से आती है, और उसका क्या उपयोग है।
      </p>

      <p>
        इस अध्याय के बाद इस साइट का दैनिक पंचांग आपको संस्कृत की दीवार
        के बजाय एक सुसज्जित अनुच्छेद की तरह दिखना चाहिए। यही लक्ष्य है।
      </p>

      <h2>अध्ययन-स्थल: एक वास्तविक दिन</h2>

      <p>
        प्रामाणिक पंचांग को किसी विशिष्ट तिथि के लिए खोलिए &mdash; मान
        लीजिए, यादृच्छिक रूप से चुना गया <strong>उज्जैन में मई 2026 के
        प्रारम्भ का कोई गुरुवार</strong>। ठीक तिथि महत्त्वपूर्ण नहीं है
        &mdash; हम जो देख रहे हैं वह सूचना की संरचना है। प्रत्येक दैनिक
        पंचांग लगभग वही फ़ील्ड, लगभग उसी क्रम में दिखाता है। हम पूरे
        अध्याय में इस काल्पनिक गुरुवार का उपयोग करेंगे।
      </p>

      <p>मान लीजिए पंचांग ये दिखाता है —</p>

      <ul className="font-mono text-sm">
        <li>📅 तिथि: गुरुवार, 7 मई 2026</li>
        <li>📍 स्थान: उज्जैन (23.18°N, 75.78°E, IST +05:30)</li>
        <li>🌅 सूर्योदय: 05:54</li>
        <li>🌄 सूर्यास्त: 18:58</li>
        <li>🌙 चन्द्रोदय: 23:14 (अगले दिन)</li>
        <li>🌑 चन्द्रास्त: 11:21</li>
      </ul>

      <ul className="font-mono text-sm">
        <li>तिथि: कृष्ण प्रतिपदा (1) &mdash; 14:38 तक</li>
        <li>वार: गुरुवार</li>
        <li>नक्षत्र: अनुराधा &mdash; 19:03 तक</li>
        <li>योग: वरीयान् &mdash; 11:42 तक</li>
        <li>करण: कौलव → तैतिल (14:38 पर परिवर्तन)</li>
        <li>सूर्य: मेष में (नाक्षत्र)</li>
        <li>चन्द्र: वृश्चिक में (नाक्षत्र)</li>
      </ul>

      <ul className="font-mono text-sm">
        <li>राहु काल: 13:55 – 15:32</li>
        <li>यमगण्ड: 05:54 – 07:32</li>
        <li>गुलिक: 09:09 – 10:46</li>
        <li>अभिजित् मुहूर्त: 12:18 – 13:06</li>
        <li>ब्रह्म मुहूर्त: 04:18 – 05:06</li>
      </ul>

      <ul className="font-mono text-sm">
        <li>चौघड़िया (दिन): शुभ, रोग, उद्वेग, चर, लाभ, अमृत, काल, शुभ</li>
        <li>विशेष योग: <strong>सर्वार्थ सिद्धि योग</strong> (अनुराधा + गुरुवार)</li>
        <li>पंचक: नहीं</li>
        <li>भद्रा: नहीं</li>
      </ul>

      <p>
        यह एक प्रचलित दैनिक पंचांग प्रदर्शन है। पहली नज़र में जैसे शब्दों
        की दीवार। इस अध्याय के अंत तक आप इसे मौसम-समाचार जैसी सहजता से
        पढ़ सकेंगे।
      </p>

      <h2>चरण 1 &mdash; सूर्योदय और दिन का ढाँचा</h2>

      <p>
        सूर्योदय <strong>05:54</strong>। यह पंचांग-दिन का आरम्भ है। शेष
        सब &mdash; तिथि, वार, चौघड़िया, अशुभ अवधियाँ &mdash; इसी क्षण से
        बँधे हैं। सूर्यास्त <strong>18:58</strong>। दिन का काल: 18:58 −
        05:54 = 13 घंटे 4 मिनट। रात्रि का काल: 24:00 − 13:04 = 10 घंटे
        56 मिनट। हम मई के आरम्भ में हैं; दिन लंबे होते जा रहे हैं (मार्च
        के वसन्त-विषुव से आगे, जून के ग्रीष्म-संक्रान्ति की ओर)।
      </p>

      <h2>चरण 2 &mdash; दिन और ऋतु पहचानिए</h2>

      <p>
        वार: <strong>गुरुवार</strong>, गुरु से शासित। अध्याय 3 से, गुरुवार
        सामान्यतः शुभ है &mdash; विवाह, आरम्भ, आध्यात्मिक साधना, धार्मिक
        उद्यमों के लिए अनुकूल। शुभ संकेत।
      </p>

      <p>
        सूर्य <strong>मेष</strong> में। सूर्य ने मेष में लगभग 14 अप्रैल
        (मेष संक्रान्ति) पर प्रवेश किया था &mdash; अतः हम मेष के सौर मास
        में लगभग 3 सप्ताह आगे हैं (कुछ क्षेत्रीय कैलेंडरों में{" "}
        <em>वैशाख</em>)। वसन्त ऋतु; सूर्य मेष में उच्च है (अध्याय 8 का
        स्मरण &mdash; सूर्य का उच्च मेष 10° पर)। सूर्य अभी लगभग 22° मेष
        पर है; उच्चतम बिन्दु से आगे, परन्तु अब भी अपनी उच्च-राशि में।
        यह दिन के लिए सूक्ष्म रूप से अनुकूल पृष्ठभूमि देता है।
      </p>

      <h2>चरण 3 &mdash; तिथि और पक्ष पढ़िए</h2>

      <p>
        तिथि: <strong>कृष्ण प्रतिपदा (1)</strong>, 14:38 तक। कृष्ण पक्ष
        की प्रथम तिथि &mdash; अर्थात् चन्द्र अभी पूर्णिमा से आगे बढ़ चुका
        है और घटना प्रारम्भ कर चुका है। पिछला दिन पूर्णिमा था। आज, चन्द्र
        सूर्य से दूर 12° बढ़ चुका है, और अब निकट 12° पीछे है (तकनीकी
        रूप से, &ldquo;360° से आगे&rdquo; के अर्थ में &mdash; ठीक
        परिभाषा अध्याय 2 में देखें)।
      </p>

      <p>
        जैन उदय-तिथि नियम से: कृष्ण प्रतिपदा सूर्योदय (05:54) पर सक्रिय
        थी और 14:38 तक चलती रही, जो 6-घटी अवधि (05:54 + 2घ 24मि = 08:18)
        से बहुत आगे है। अतः कृष्ण प्रतिपदा निःसन्देह आज की उदय तिथि है।
        दिन कृष्ण प्रतिपदा के रूप में अंकित है।
      </p>

      <p>
        प्रतिपदा सामान्यतः एक नियमित तिथि है &mdash; न विशेष रूप से शुभ
        न अशुभ। यह पक्ष का &ldquo;प्रथम दिन&rdquo; है, जो प्रायः नये
        पक्ष-भर के व्रतों के आरम्भ के लिए प्रयुक्त होता है (विशेष रूप से,
        कृष्ण प्रतिपदा कुछ क्षेत्रीय कैलेंडरों में पितृ पक्ष अथवा अन्य
        पैतृक अनुष्ठानों के आरम्भ का सूचक है)।
      </p>

      <h2>चरण 4 &mdash; नक्षत्र पढ़िए</h2>

      <p>
        नक्षत्र: <strong>अनुराधा</strong>, 19:03 तक। अनुराधा 17वाँ
        नक्षत्र, वृश्चिक में, शनि से शासित, मित्र देव। अध्याय 4 की
        मास्टर तालिका देखिए: देव गण, मृग योनि, शूद्र वर्ण। विषय:
        मित्रता, भक्ति, संगठन।
      </p>

      <p>अनुराधा के बारे में महत्त्वपूर्ण बातें —</p>

      <ul>
        <li>
          सम्बन्धों, साझेदारियों, गठबंधनों और धर्म-कार्य के लिए शुभ।
        </li>
        <li>
          शनि-शासित &mdash; शनिवार के साथ अच्छा मेल, परन्तु शनि-स्वामित्व
          अन्य दिनों पर भी इसे स्थैर्य और निरन्तरता का गुण देता है।
        </li>
        <li>मित्र (देवता) मित्रता-विषय का प्रबल गुण लाते हैं।</li>
      </ul>

      <p>आज के लिए यह एक अच्छा नक्षत्र है। गुरुवार के साथ मिलकर यह क्या उत्पन्न करता है?</p>

      <h2>चरण 5 &mdash; विशेष योग पहचानिए</h2>

      <p>
        अध्याय 12 से: <strong>अनुराधा + गुरुवार = सर्वार्थ सिद्धि योग</strong>।
        तालिका देखिए। गुरुवार के सर्वार्थ सिद्धि नक्षत्र हैं अश्विनी,
        पुनर्वसु, पुष्य, अनुराधा, रेवती। हमारे पास अनुराधा है। सर्वार्थ
        सिद्धि सक्रिय है।
      </p>

      <p>
        यह दिन का सबसे महत्त्वपूर्ण पठन है। सर्वार्थ सिद्धि का अर्थ है कि
        लगभग कोई भी शुभ कार्य समर्थित है, चाहे अन्य संकेत मिश्रित हों।
        योग अनुराधा की पूरी अवधि-भर सक्रिय है &mdash; आज 19:03 तक।
      </p>

      <p>
        योग (दैनिक नित्य योग): <strong>वरीयान्</strong> (18वाँ &mdash;
        &ldquo;श्रेष्ठ&rdquo;), 11:42 तक। अध्याय 5 से, वरीयान् शुभ योगों
        में से एक है। 11:42 के बाद अगला योग प्रारम्भ होता है (अनुक्रम में
        अगला), परन्तु प्रातः के लिए वरीयान् एक और अनुकूल परत जोड़ता है।
        आज कोई चिह्नित अशुभ योग (व्यतीपात, वैधृति इत्यादि) सक्रिय नहीं।
      </p>

      <p>
        करण: <strong>कौलव</strong> 14:38 तक, फिर <strong>तैतिल</strong>।
        दोनों सौम्य चर करण (अध्याय 6)। आज भद्रा सक्रिय नहीं &mdash; अतः
        कोई विष्टि-जटिलता नहीं। कौलव सम्बन्ध और पारिवारिक मामलों के लिए
        उपयुक्त; तैतिल स्नेह और आनन्द के लिए।
      </p>

      <h2>चरण 6 &mdash; वर्जित अवधियाँ पहचानिए</h2>

      <p>अध्याय 11 से, आज की अशुभ अवधियाँ —</p>

      <ul>
        <li>
          <strong>यमगण्ड: 05:54 – 07:32।</strong> सूर्योदय के बाद का प्रथम
          90-मिनट खंड (गुरुवार का यमगण्ड 1ला खंड)। इस अवधि में नये आरम्भ
          टालिए। यदि आज कोई बड़ा उद्यम आरम्भ कर रहे हैं, तो वह इस
          स्थान पर नहीं हो सकता।
        </li>
        <li>
          <strong>गुलिक: 09:09 – 10:46।</strong> 3रा खंड। भी टाला जाता है।
        </li>
        <li>
          <strong>राहु काल: 13:55 – 15:32।</strong> 6ठा खंड। प्रबल रूप से
          टाला जाता है।
        </li>
      </ul>

      <p>
        तीन अशुभ अवधियाँ कुल लगभग 4½ घंटे की। दिन का शेष भाग सामान्य
        प्रयोजनों के लिए &ldquo;स्वच्छ&rdquo; है।
      </p>

      <p>
        ब्रह्म मुहूर्त: <strong>04:18 – 05:06</strong> (सूर्योदय से 96
        मिनट पहले से सूर्योदय से 48 मिनट पहले तक)। यह खण्ड सूर्योदय के
        पहले है, आध्यात्मिक रूप से आवेशित प्रात-पूर्व काल में। ध्यान,
        शास्त्र-पाठ, अध्ययन के लिए। भौतिक आरम्भों के लिए नहीं।
      </p>

      <p>
        अभिजित् मुहूर्त: <strong>12:18 – 13:06</strong> (सौर मध्याह्न ±
        24 मिनट)। अधिकांश दिनों में यह दिन का सर्वाधिक शुभ 48-मिनट खण्ड
        होता है। आज एक बात ध्यान देने योग्य &mdash; अध्याय 11 का स्मरण
        कीजिए कि <em>बुधवार</em> का अभिजित् पारम्परिक रूप से टाला जाता
        है। आज गुरुवार है, अतः अभिजित् पूर्णतः सक्रिय। यह आज किसी अशुभ
        अवधि से अतिव्यापी भी नहीं (राहु काल 13:55 पर शुरू होता है)।
        अभिजित् उपलब्ध और अबाधित है।
      </p>

      <h2>चरण 7 &mdash; चौघड़िया पढ़िए</h2>

      <p>
        अध्याय 10 से, गुरुवार का प्रथम दिन-चौघड़िया है <strong>शुभ</strong>{" "}
        (गुरु &mdash; वही जो दिन का स्वामी)। चक्र आगे: शुभ → रोग → उद्वेग
        → चर → लाभ → अमृत → काल → शुभ।
      </p>

      <p>
        प्रत्येक चौघड़िया लगभग (सूर्यास्त − सूर्योदय) ÷ 8 = 13घ 4मि ÷ 8 ≈
        1घ 38मि लंबा होगा। आइए खंड निकालें —
      </p>

      <table className="text-sm">
        <thead>
          <tr>
            <th>क्र.</th>
            <th>अंतराल</th>
            <th>चौघड़िया</th>
            <th>गुण</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>05:54 – 07:32</td><td>शुभ</td><td className="text-green-400">शुभ</td></tr>
          <tr><td>2</td><td>07:32 – 09:09</td><td>रोग</td><td className="text-red-400">अशुभ</td></tr>
          <tr><td>3</td><td>09:09 – 10:46</td><td>उद्वेग</td><td className="text-red-400">अशुभ</td></tr>
          <tr><td>4</td><td>10:46 – 12:23</td><td>चर</td><td className="text-yellow-400">यात्रा</td></tr>
          <tr><td>5</td><td>12:23 – 14:00</td><td>लाभ</td><td className="text-green-400">शुभ</td></tr>
          <tr><td>6</td><td>14:00 – 15:38</td><td>अमृत</td><td className="text-green-400">अति शुभ</td></tr>
          <tr><td>7</td><td>15:38 – 17:15</td><td>काल</td><td className="text-red-400">अशुभ</td></tr>
          <tr><td>8</td><td>17:15 – 18:53</td><td>शुभ</td><td className="text-green-400">शुभ</td></tr>
        </tbody>
      </table>

      <p>महत्त्वपूर्ण अतिव्यापी विश्लेषण —</p>

      <ul>
        <li>
          प्रथम चौघड़िया (शुभ, 05:54–07:32) पूर्णतः यमगण्ड के भीतर। अतः
          यद्यपि नाम शुभ है, नये आरम्भ यहाँ नहीं होने चाहिए। यमगण्ड का
          चिह्न चौघड़िया-लाभ को निरस्त कर देता है।
        </li>
        <li>
          तीसरा चौघड़िया (उद्वेग, 09:09–10:46) गुलिक से अतिव्यापी। पहले
          से अशुभ; दोहरी टालमटोल।
        </li>
        <li>
          5वाँ और 6ठा चौघड़िया (लाभ और अमृत, 12:23–15:38) &mdash; लाभ
          लगभग 14:00 तक चलता है, फिर अमृत प्रारम्भ। राहु काल 13:55 से
          आरम्भ। अतः 12:23–13:55 का शुभ अंतराल मध्याह्न-पश्चात् का
          व्यावहारिक अनुकूल खण्ड है। 13:55 के बाद हम राहु काल में आ
          जाते हैं।
        </li>
        <li>
          8वाँ चौघड़िया (शुभ, 17:15–18:53) पूर्णतः स्वच्छ। कोई अशुभ
          अवधि अतिव्यापी नहीं।
        </li>
      </ul>

      <h2>चरण 8 &mdash; संयोजन: कब क्या करें?</h2>

      <p>आज का पूरा दिन एक सारांश में &mdash;</p>

      <h3>आज के सर्वोत्तम खण्ड</h3>
      <ul>
        <li>
          <strong>04:18 – 05:06 (ब्रह्म मुहूर्त):</strong> ध्यान,
          शास्त्र-पाठ, अध्ययन, धर्म-साधना।
        </li>
        <li>
          <strong>10:46 – 12:23 (चर चौघड़िया):</strong> यात्रा, प्रस्थान,
          गति-सम्बन्धी कार्य।
        </li>
        <li>
          <strong>12:18 – 13:06 (अभिजित् मुहूर्त):</strong> सामान्य शुभ
          आरम्भ &mdash; आज का प्रमुख भौतिक खण्ड। (चर चौघड़िया के अंत के
          साथ हल्की अतिव्याप्ति, फिर लाभ में प्रवेश।)
        </li>
        <li>
          <strong>12:23 – 13:55 (लाभ चौघड़िया, राहु काल पर समाप्त):</strong>{" "}
          वाणिज्य, वित्तीय कार्य, अनुबंध-हस्ताक्षर।
        </li>
        <li>
          <strong>17:15 – 18:53 (शुभ चौघड़िया):</strong> मध्याह्न-
          पश्चात् और सायं में धार्मिक, धर्म-सम्बन्धी, अनुष्ठानिक कार्य।
        </li>
      </ul>

      <h3>आज के टालने वाले खण्ड</h3>
      <ul>
        <li>
          <strong>05:54 – 07:32:</strong> यमगण्ड और शुभ चौघड़िया अतिव्यापी
          &mdash; निवल अशुभ।
        </li>
        <li>
          <strong>07:32 – 09:09:</strong> रोग चौघड़िया।
        </li>
        <li>
          <strong>09:09 – 10:46:</strong> गुलिक और उद्वेग चौघड़िया
          &mdash; प्रबल रूप से टाला जाता है।
        </li>
        <li>
          <strong>13:55 – 15:32:</strong> राहु काल &mdash; सर्वाधिक टाला
          जाने वाला खण्ड।
        </li>
        <li>
          <strong>15:38 – 17:15:</strong> काल चौघड़िया।
        </li>
      </ul>

      <h3>और एक तुरुप</h3>
      <p>
        <strong>सर्वार्थ सिद्धि योग सूर्योदय से 19:03 तक सक्रिय है।</strong>{" "}
        इसका अर्थ है कि ऊपर के सख्ती से शुभ खण्डों के बाहर भी, यदि
        महत्त्वपूर्ण कार्य राहु काल, यमगण्ड अथवा गुलिक में न पड़े, तो वह
        इस योग की शक्ति पर समर्थित है। यदि कुछ अभिजित् मुहूर्त अथवा लाभ
        चौघड़िये की प्रतीक्षा नहीं कर सकता, तो आज वह किसी भी गैर-अशुभ
        खण्ड में सर्वार्थ सिद्धि के बल पर आगे बढ़ सकता है।
      </p>

      <KeyIdea
        title="वास्तविक पंचांग-पठन एक संश्लेषण है"
        titleHi="A real day's panchang reading is a synthesis."
      >
        पाँच अंग (हर एक का अनुकूल अथवा प्रतिकूल संकेत)। तीन अशुभ अवधियाँ।
        आठ चौघड़िया-काल। सम्भवतः एक या अधिक नामित संयोग योग। पाठक सूची
        पर नीचे चलता है, अतिव्यापियाँ नोट करता है, और वे खण्ड पहचानता
        है जहाँ सब संकेत अनुकूल बैठते हैं। कोई एक सूत्र नहीं है &mdash;
        विवेक है, प्राथमिकताओं का चयन है, और कार्य-विशिष्ट प्रश्न कि उस
        कार्य के लिए कौन-से कारक सबसे महत्त्वपूर्ण हैं।
      </KeyIdea>

      <h2>कार्य-विशिष्ट मुहूर्त उदाहरण</h2>

      <p>
        मान लीजिए तीन भिन्न लोग तीन भिन्न योजनाओं के साथ इसी पंचांग-दिन
        को देखते हैं। प्रत्येक उसे भिन्न रूप से पढ़ता है।
      </p>

      <h3>व्यक्ति क &mdash; नया व्यवसाय आरम्भ कर रहा है</h3>
      <p>
        लाभ (वाणिज्य-अनुकूल) चाहता है। सर्वार्थ सिद्धि का समर्थन चाहता
        है। राहु काल टालना चाहता है। स्पष्ट अनुशंसा: <strong>12:30
        और 13:55 के बीच कार्यालय आरम्भ कीजिए</strong>, लाभ चौघड़िये में,
        अभिजित् के प्रारम्भिक भाग के साथ अतिव्यापी। सर्वार्थ सिद्धि सक्रिय
        है। कार्य का बुध-अनुकूल समय और गुरु-अनुकूल दिन है। यह व्यवसाय-
        प्रवर्तन के लिए एक प्रबल मुहूर्त है।
      </p>

      <h3>व्यक्ति ख &mdash; दक्षिण की लंबी सड़क-यात्रा शुरू कर रहा है</h3>
      <p>
        चर (यात्रा-अनुकूल) चाहता है। राहु काल और गुलिक टालना चाहता है।
        स्पष्ट खण्ड: <strong>10:46 – 12:23</strong>, चर चौघड़िया,
        सब अशुभ अवधियों से पूर्णतः मुक्त। सर्वार्थ सिद्धि सक्रिय। यात्रा
        इस अंतराल में शुरू होती है। (टिप्पणी: आज पंचक नहीं, अतः दक्षिण-
        यात्रा पर पंचक का निषेध भी नहीं।)
      </p>

      <h3>व्यक्ति ग &mdash; दैनिक ध्यान-साधना का आरम्भ</h3>
      <p>
        ब्रह्म मुहूर्त चाहता है। <strong>04:18 – 05:06</strong> &mdash;
        प्रात-पूर्व का खण्ड, दिन की जटिलताओं के आरम्भ से पहले। ब्रह्म
        मुहूर्त अपनी ही अनुशंसा है; और किसी की आवश्यकता नहीं।
      </p>

      <h2>पूरी पुस्तक में आपने क्या सीखा</h2>

      <p>
        हमने प्राक्कथन में एक ऐसे व्यक्ति से शुरू किया था जो पंचांग
        बिल्कुल पढ़ नहीं सकता था। हम उस व्यक्ति के साथ समाप्त कर रहे हैं
        जो पंचांग की हर पंक्ति पढ़ सकता है और उन्हें कार्यान्वयन-योग्य
        अनुशंसाओं में संश्लेषित कर सकता है।
      </p>

      <p>मार्ग —</p>

      <ol>
        <li>
          <strong>पहले खगोल विज्ञान।</strong> पृथ्वी, सूर्य, चन्द्र, उनकी
          गतियाँ, &ldquo;दिन&rdquo; का वास्तविक अर्थ, सायन-निरयण राशि-
          चक्र, अयन-चलन।
        </li>
        <li>
          <strong>पाँच अंग।</strong> तिथि, वार, नक्षत्र, योग, करण
          &mdash; प्रत्येक क्या है, कैसे निकाला जाता है, क्या अर्थ देता है।
        </li>
        <li>
          <strong>ढाँचा।</strong> 12 राशियाँ, उनमें 27 नक्षत्र, 108-पाद
          की मातृ-संरचना।
        </li>
        <li>
          <strong>पात्र।</strong> नौ ग्रह, हर एक का चरित्र, कारकता,
          मित्रता, अवधि।
        </li>
        <li>
          <strong>काल-इकाइयाँ।</strong> विपल, पल, घटी, मुहूर्त, प्रहर
          &mdash; और 24-घंटे की घड़ी से उनका मेल।
        </li>
        <li>
          <strong>दैनिक समय-सारणियाँ।</strong> चौघड़िया, राहु काल,
          यमगण्ड, गुलिक, नामित शुभ मुहूर्त (ब्रह्म, अभिजित्, गोधूलि)।
        </li>
        <li>
          <strong>संयोग।</strong> सर्वार्थ सिद्धि, अमृत सिद्धि,
          त्रिपुष्कर, द्विपुष्कर, पंचक, भद्रा-स्थिति।
        </li>
        <li>
          <strong>संश्लेषण।</strong> एक पूरे दिन को आरम्भ से अंत तक
          पढ़ना, अतिव्यापी संकेत पहचानना, और उन्हें विशिष्ट अनुशंसाओं में
          रूपान्तरित करना।
        </li>
      </ol>

      <h2>आगे क्या</h2>

      <p>
        पुस्तक 2 <strong>कुण्डली</strong> पर होगी &mdash; जन्म-कुण्डली।
        जहाँ पुस्तक 1 ने इस प्रश्न का उत्तर दिया कि &ldquo;इस क्षण
        आकाश में क्या हो रहा है,&rdquo; पुस्तक 2 इस प्रश्न का उत्तर देगी
        कि &ldquo;किसी के जन्म के क्षण आकाश में क्या हो रहा था, और उसका
        उसके लिए क्या अर्थ है?&rdquo; चार्ट के प्रकार (लग्न, राशि, नवांश,
        भाव)। बारह भाव। ग्रहों की दृष्टि। चार्ट-सन्दर्भ में मित्रता-
        शत्रुता। विंशोत्तरी दशा-चक्र। कुण्डली कैसे वास्तव में पढ़ी जाये।
        हम पुस्तक 1 की हर अवधारणा &mdash; ग्रह, राशि, नक्षत्र, गणित
        &mdash; पर आधारित बनायेंगे, और अपने सामने के चार्ट को समझने में
        उनका प्रयोग करेंगे।
      </p>

      <p>
        अभी के लिए, इस साइट का दैनिक पंचांग शब्दों की दीवार होना बंद हो
        गया है। यह एक सुसंगत खगोलीय दिवस का विशिष्ट विवरण है, जिसके साथ
        एक विशिष्ट परम्परा की समय-सारणियाँ जुड़ी हैं &mdash; एक ऐसी
        परम्परा जो तीन हज़ार वर्षों से उसी पद्धति को परिमार्जित करती आ
        रही है। अगली बार आप जब इसे खोलेंगे, तो उसमें सब-कुछ पहचाना
        हुआ-सा लगेगा।
      </p>

      <p>
        पंचांग में साक्षरता में स्वागत है। पहली पुस्तक समाप्त। दूसरी
        प्रारम्भ करने से पहले समय लीजिए। जब अवधारणाएँ फिसलने लगें,
        अध्याय फिर पढ़िए। विभिन्न वारों और ऋतुओं के कुछ दिनों पर दैनिक
        पंचांग खोलिए, और हर एक को पढ़िए। दो सप्ताह तक यह करने के बाद
        प्रणाली विदेशी भूमि की तरह नहीं, परिचित भू-दृश्य की तरह लगेगी।
      </p>

      <p className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500">
        पुस्तक 1 समाप्त। <span lang="en">End of Book 1.</span>
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

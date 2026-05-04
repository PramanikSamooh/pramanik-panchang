import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";
import { NAKSHATRAS } from "@/lib/learn/nakshatra-data";

const chapter = getChapter("nakshatra")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We come now to the most ornate and the oldest of the five
        limbs — the <strong>nakshatra</strong>{" "}
        <span lang="hi">(नक्षत्र)</span>. The Sanskrit word means &ldquo;a
        star, a heavenly luminary,&rdquo; from the root <em>nakṣ</em>{" "}
        (to approach, to attain). In practice it refers to one of 27
        equal divisions of the ecliptic, each named after a
        constellation or star-cluster in that region of the sky.
      </p>

      <p>
        The nakshatra system is older than the twelve-rashi zodiac in
        Indian astronomy. It appears already in the{" "}
        <em>Atharvaveda</em> and the <em>Yajurveda</em> — texts dating
        to roughly 1000 BCE — long before the rashi (sign) framework
        was imported from Greco-Babylonian astronomy. The nakshatras
        are therefore the indigenous Indian sky-grid. The rashis came
        later. Where rashi astrology emphasises the Sun, nakshatra
        astrology has always emphasised the Moon. This is one of the
        deep distinguishing features of the Indian tradition compared
        to its Western counterpart.
      </p>

      <p>
        This chapter is long. There is no shortcut. There are 27
        nakshatras, each with its own profile. We will first build the
        framework — what a nakshatra is, how the math works, what
        attributes are layered on each — and then walk through the 27
        in a master table. Treat the table as a reference. You do not
        need to memorise it; you need to be able to look up any
        nakshatra and read its row.
      </p>

      <h2>The 27-fold division of the sky</h2>

      <p>
        The ecliptic — the apparent annual path of the Sun against the
        background stars, which the Moon and planets also closely
        follow — is a great circle, 360°. The nakshatra system divides
        this circle into <strong>27 equal segments</strong>, each
        measuring:
      </p>

      <blockquote>
        360° ÷ 27 = <strong>13°20′</strong> (thirteen degrees and
        twenty minutes of arc)
      </blockquote>

      <p>
        Each segment is a nakshatra. The Moon, in its 27.32-day
        sidereal orbit around the Earth, passes through one nakshatra
        roughly each day. (This is why there are 27 of them — the
        Moon has &ldquo;27 wives,&rdquo; in the mythological framing
        of the <em>Vishnu Purana</em>, with the Moon visiting one each
        night.) On any given night, the Moon is &ldquo;in&rdquo; one
        of the 27 nakshatras — meaning, its ecliptic longitude falls
        within that segment&rsquo;s 13°20′ range.
      </p>

      <p>
        The mathematical formula for the Moon&rsquo;s nakshatra at any
        moment is:
      </p>

      <blockquote>
        <strong>Nakshatra number</strong> = <code>floor(λ_M ÷ 13°20′)</code> + 1
      </blockquote>

      <p>
        where <code>λ_M</code> is the Moon&rsquo;s nirayana ecliptic
        longitude in degrees, and the result is taken modulo 27. The
        first nakshatra (Ashwini) starts at 0° of Mesha (Aries) in the
        sidereal zodiac, and the 27th (Revati) ends at 30° of Meena
        (Pisces).
      </p>

      <FigurePlaceholder
        number="4.1"
        caption="The 27 nakshatras as 13°20′ segments around the ecliptic, with the Moon's monthly path."
        captionHi="राशि-चक्र पर 27 नक्षत्रों के 13°20′ खंड और चंद्रमा का मासिक पथ।"
        promptHint="See Batch 1 image #9 for the Gemini prompt."
      />

      <h2>Why 27 and not 28?</h2>

      <p>
        Some of the oldest Indian texts mention 28 nakshatras, including
        an additional one called <em>Abhijit</em>{" "}
        <span lang="hi">(अभिजित्)</span> — the bright star Vega — placed
        between Uttara Ashadha and Shravana. The classical reduction
        to 27 happened because 360 divides evenly by 27 (giving 13°20′
        per nakshatra) but not by 28 (which would give an awkward
        12.857°). Abhijit was retained for special purposes — most
        notably, the auspicious noontime muhurta named after it — but
        dropped from the regular sky-grid.
      </p>

      <p>
        For the daily panchang, 27 is the operating number. We will
        meet Abhijit again in the muhurta chapter, where it has its
        own honoured slot.
      </p>

      <h2>The pada — quartering the nakshatra</h2>

      <p>
        Each nakshatra of 13°20′ is further divided into{" "}
        <strong>four equal padas</strong>{" "}
        <span lang="hi">(पाद)</span> — &ldquo;quarters&rdquo; or
        &ldquo;feet.&rdquo; Each pada is therefore 3°20′. Padas matter
        because while the nakshatra system uses 27 segments, the rashi
        (sign) system uses 12 segments — and 27 nakshatras × 4 padas =
        108 padas, while 12 rashis × 9 padas = 108 padas. This means
        each rashi contains exactly 9 padas, or 2¼ nakshatras.
      </p>

      <p>
        The number 108 — sacred in Indian tradition — is no
        coincidence: it is the natural product of these two
        complementary divisions of the same circle. Mala beads come in
        108. Pada-by-pada analysis is foundational to detailed
        kundli reading; we will return to it in Book 2.
      </p>

      <FigurePlaceholder
        number="4.2"
        caption="The 27 nakshatras and 12 rashis on the same ecliptic. 27 × 4 padas = 12 × 9 padas = 108."
        captionHi="एक ही राशि-चक्र पर 27 नक्षत्र और 12 राशियाँ। 27 × 4 = 12 × 9 = 108 पाद।"
        promptHint="See Batch 1 image #11 for the Gemini prompt."
      />

      <h2>The four classifications layered on each nakshatra</h2>

      <p>
        Each of the 27 nakshatras carries multiple labels that are used
        in muhurta selection, compatibility analysis (e.g., for
        marriage), and chart interpretation. The four most important
        classifications are:
      </p>

      <h3>Ruling lord (graha) <span className="hi" lang="hi">स्वामी</span></h3>
      <p>
        Each nakshatra is ruled by one of the nine grahas. The
        rulership cycles in a fixed order: Ketu, Shukra, Surya,
        Chandra, Mangala, Rahu, Guru, Shani, Budha — repeating three
        times to cover all 27. So Ashwini (1) is ruled by Ketu,
        Bharani (2) by Shukra, ..., Magha (10) by Ketu again, and so
        on. This rulership is the basis of the{" "}
        <strong>Vimshottari dasha</strong>{" "}
        <span lang="hi">(विंशोत्तरी दशा)</span> — the most widely-used
        planetary period system in Indian astrology, where the
        sequence of life periods is determined by the nakshatra of
        the Moon at birth. We will return to dasha in Book 2.
      </p>

      <h3>Gana — the temperamental category <span className="hi" lang="hi">गण</span></h3>
      <p>
        The 27 nakshatras are sorted into three gana types — three
        groups of nine.
      </p>
      <ul>
        <li>
          <strong>Deva gana</strong> <span lang="hi">(देव गण)</span> —
          divine. Light, refined, harmonious. (Ashwini, Mrigashira,
          Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati.)
        </li>
        <li>
          <strong>Manushya gana</strong>{" "}
          <span lang="hi">(मनुष्य गण)</span> — human. Mixed, balanced,
          pragmatic. (Bharani, Rohini, Ardra, Purva Phalguni, Uttara
          Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadrapada,
          Uttara Bhadrapada.)
        </li>
        <li>
          <strong>Rakshasa gana</strong>{" "}
          <span lang="hi">(राक्षस गण)</span> — demonic. Intense,
          fierce, transformative. (Krittika, Ashlesha, Magha, Chitra,
          Vishakha, Jyeshtha, Mula, Dhanishta, Shatabhisha.)
        </li>
      </ul>
      <p>
        Despite the names, none of these is &ldquo;good&rdquo; or
        &ldquo;bad&rdquo; in itself. They describe temperament. Gana
        compatibility is checked when matching horoscopes for
        marriage — Deva-Deva and Manushya-Manushya are considered
        compatible; Deva-Rakshasa pairings are flagged for
        scrutiny. Rakshasa nakshatras are powerful for endeavours
        requiring intensity (warfare, demolition, deep transformation)
        and less suited for delicate work.
      </p>

      <h3>Yoni — the animal nature <span className="hi" lang="hi">योनि</span></h3>
      <p>
        Each nakshatra is associated with one of fourteen animals.
        Yoni is used in marriage compatibility — friendly yoni pairs
        (cow-buffalo) score well, hostile yoni pairs (dog-deer,
        cat-rat) score poorly. The fourteen yonis are: horse,
        elephant, sheep, serpent, dog, cat, rat, cow, buffalo, tiger,
        deer, monkey, mongoose, lion. Two yonis are extra: there is
        one nakshatra (Hasta) with buffalo and one with cow as a
        complementary pair, and so on.
      </p>

      <h3>Varna — the caste-equivalent classification <span className="hi" lang="hi">वर्ण</span></h3>
      <p>
        Each nakshatra is also assigned one of the four varnas:
        Brahmin (priest, scholarly), Kshatriya (warrior, governing),
        Vaishya (trader, productive), Shudra (servant, supporting).
        These classifications come from classical texts and are used
        primarily in muhurta selection (matching the activity to the
        varna of the active nakshatra). They should not be confused
        with the social caste system — the varna-of-nakshatra
        terminology predates the rigid social hierarchy and refers
        to the mode of activity each nakshatra favours. Brahmin
        nakshatras favour study, ritual, and contemplation;
        Kshatriya nakshatras favour command, action, leadership;
        Vaishya nakshatras favour trade, accumulation, exchange;
        Shudra nakshatras favour service, craft, manual production.
      </p>

      <h2>Other classifications you will encounter</h2>

      <p>
        Beyond the four major classifications, classical texts assign
        each nakshatra additional attributes. We list them briefly so
        you recognise them in source texts.
      </p>

      <ul>
        <li>
          <strong>Tatva</strong> <span lang="hi">(तत्त्व)</span> — the
          element: prithvi (earth), apas (water), tejas (fire), vayu
          (air), or akasha (ether). Used in muhurta and ritual.
        </li>
        <li>
          <strong>Guna</strong> <span lang="hi">(गुण)</span> — sattva,
          rajas, or tamas. The fundamental quality.
        </li>
        <li>
          <strong>Direction</strong> — each nakshatra has an
          associated cardinal direction, used for vastu and travel
          muhurta.
        </li>
        <li>
          <strong>Shakti</strong> <span lang="hi">(शक्ति)</span> — the
          specific power or force the nakshatra embodies. (Ashwini =
          power to swiftly attain; Bharani = power to take away;
          Krittika = power to burn; etc.)
        </li>
      </ul>

      <h2>Special groupings: gandanta and panchaka</h2>

      <h3>Gandanta — the &ldquo;knot&rdquo; nakshatras <span className="hi" lang="hi">गण्डान्त</span></h3>
      <p>
        Three pairs of nakshatras occur at the boundary of a fire
        rashi and a water rashi: Revati-Ashwini, Ashlesha-Magha, and
        Jyeshtha-Mula. The transitional 3°20′ on either side of these
        boundaries is called <em>gandanta</em> — &ldquo;the end of a
        knot.&rdquo; Births and certain ritual undertakings during
        gandanta are flagged for careful attention; the transition
        between elements (water-fire-water-fire around the zodiac)
        creates astrologically charged moments.
      </p>

      <h3>Panchaka — the inauspicious five <span className="hi" lang="hi">पंचक</span></h3>
      <p>
        The last five nakshatras — Dhanishta (last half), Shatabhisha,
        Purva Bhadrapada, Uttara Bhadrapada, Revati — together form{" "}
        <em>panchaka</em>{" "}
        <span lang="hi">(पंचक)</span>. The Moon&rsquo;s transit
        through this five-nakshatra region (about 4 days each month)
        is traditionally inauspicious for activities like construction
        roof-laying, southward travel, gathering firewood, and bed
        purchase. The traditional reasoning involves the watery
        nature of these nakshatras and a series of myths in the
        <em>Skanda Purana</em>; the practical effect is that
        construction crews and traditional Hindu and Jain families
        often avoid certain undertakings during panchaka. Panchaka is
        flagged on this panchang when applicable.
      </p>

      <h2>The 27 nakshatras: master reference table</h2>

      <p>
        The table below gives, for each nakshatra: the number, the
        name in transliteration and Devanagari, the symbol, the
        presiding deity, the ruling graha, the longitude span in the
        nirayana zodiac, the gana, the yoni, and the varna. This is
        the reference table for the rest of the book; we will not
        repeat it.
      </p>

      <div className="overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Deity</th>
              <th>Lord</th>
              <th>Longitude</th>
              <th>Gana</th>
              <th>Yoni</th>
              <th>Varna</th>
              <th>Nature</th>
            </tr>
          </thead>
          <tbody>
            {NAKSHATRAS.map((n) => (
              <tr key={n.number}>
                <td>{n.number}</td>
                <td>
                  <strong>{n.name}</strong>
                  <br />
                  <span lang="hi" className="text-gray-400">
                    {n.nameHi}
                  </span>
                </td>
                <td>{n.symbol}</td>
                <td>
                  {n.deity}
                  <br />
                  <span lang="hi" className="text-gray-400">
                    {n.deityHi}
                  </span>
                </td>
                <td>
                  {n.lord}
                  <br />
                  <span lang="hi" className="text-gray-400">
                    {n.lordHi}
                  </span>
                </td>
                <td>{n.rashiSpan}</td>
                <td>{n.gana}</td>
                <td>{n.yoni}</td>
                <td>{n.varna}</td>
                <td>{n.nature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>A closer look at four important nakshatras</h2>

      <p>
        Twenty-seven detailed profiles would fill a book of their own.
        We will look at four in some depth — the most often-mentioned
        in panchang reading — to give you a model for how to read any
        nakshatra&rsquo;s row in the master table.
      </p>

      <h3>Pushya (8th) <span className="hi" lang="hi">पुष्य</span></h3>
      <p>
        Symbol: cow&rsquo;s udder. Deity: Brihaspati (Jupiter).
        Lord: Shani (Saturn). Longitude: Karka (Cancer) 3°20′ –
        16°40′. Pushya is widely considered the single most auspicious
        nakshatra in the zodiac — its name itself means
        &ldquo;nourishment.&rdquo; A muhurta begun under Pushya
        (especially when it falls on a Thursday — &ldquo;Guru
        Pushya&rdquo;) is regarded as nearly invincible for new
        undertakings: business beginnings, financial investments,
        education enrolment. The combination &ldquo;Ravi Pushya&rdquo;
        (Sunday + Pushya) is similarly powerful. The cow&rsquo;s udder
        symbol captures the sense: an inexhaustible source of
        nourishment.
      </p>

      <h3>Magha (10th) <span className="hi" lang="hi">मघा</span></h3>
      <p>
        Symbol: royal throne. Deity: the Pitris (departed
        ancestors). Lord: Ketu. Longitude: Simha (Leo) 0°00′ –
        13°20′. Magha&rsquo;s connection to ancestors makes it a
        primary nakshatra for shraddha rites and remembrance of the
        deceased. Its themes are lineage, inheritance, ancestral
        authority, and hidden continuities. Magha is one of the
        gandanta nakshatras (it begins right after the Ashlesha-Magha
        boundary at the end of Karka), and birth in early Magha is
        flagged. The throne symbol is significant — Magha-born
        natives are often associated with positions of inherited or
        bestowed authority.
      </p>

      <h3>Mula (19th) <span className="hi" lang="hi">मूल</span></h3>
      <p>
        Symbol: bunch of roots. Deity: Nirriti (the goddess of
        dissolution). Lord: Ketu. Longitude: Dhanu (Sagittarius) 0°00′
        – 13°20′. The name <em>mula</em> means &ldquo;root, source,
        original cause.&rdquo; This is an investigative, philosophical
        nakshatra — the temperament of one who digs to the bottom of
        a question. Its association with Nirriti gives it a
        dissolving, demolishing quality: Mula favours the destruction
        of false structures so that the true root can be reached. It
        is also a gandanta nakshatra (at the Vrischika-Dhanu
        boundary). Birth in the first pada of Mula is traditionally
        observed with particular ritual care.
      </p>

      <h3>Revati (27th) <span className="hi" lang="hi">रेवती</span></h3>
      <p>
        Symbol: a fish. Deity: Pushan (a solar deity, protector of
        travellers and herds). Lord: Budha (Mercury). Longitude:
        Meena (Pisces) 16°40′ – 30°00′. Revati is the last
        nakshatra — the completion of the cycle before it returns to
        Ashwini. It carries the theme of safe arrival after a long
        journey, of fulfilment, of pastoral abundance. It is part of
        panchaka and the final gandanta region. Revati natives are
        often drawn to caretaking, journeys (literal and
        metaphorical), and the consolation of those at endings.
      </p>

      <h2>How nakshatra appears in your panchang</h2>

      <p>
        Open the daily panchang on this site. The nakshatra line
        shows two things:
      </p>

      <ol>
        <li>
          <strong>The current nakshatra at sunrise</strong> — which
          one the Moon is in when the day begins. This is the
          &ldquo;day&rsquo;s nakshatra&rdquo; for muhurta and
          ritual purposes.
        </li>
        <li>
          <strong>The end-time of that nakshatra</strong> — the
          clock time at which the Moon will exit this nakshatra and
          enter the next. After that time, today&rsquo;s nakshatra
          is technically the next one in sequence — though the
          panchang convention is to label the day with the nakshatra
          present at sunrise (the &ldquo;udaya nakshatra&rdquo;
          analogue of udaya tithi).
        </li>
      </ol>

      <p>
        On any given day, one nakshatra usually dominates, but
        because the Moon takes about 27.32 ÷ 27 = 1.012 days per
        nakshatra, the nakshatra changes once every roughly 24
        hours, sometimes a little more, sometimes less.
      </p>

      <KeyIdea
        title="Nakshatra is determined by the Moon's longitude alone."
        titleHi="नक्षत्र चन्द्रमा के देशांतर से ही निर्धारित होता है"
      >
        Tithi requires the angle between Moon and Sun. Yoga requires
        their sum. Karana is half a tithi. But nakshatra needs only
        the Moon&rsquo;s position. This is why it can be used as a
        finer-grained sky-clock — every ~24 hours, a new nakshatra,
        regardless of what the Sun is doing.
      </KeyIdea>

      <h2>The Moon&rsquo;s nakshatra and personal astrology</h2>

      <p>
        While the day&rsquo;s tithi is the most important
        muhurta-determining factor in everyday observance, the
        nakshatra of the Moon at birth — called the{" "}
        <strong>janma nakshatra</strong>{" "}
        <span lang="hi">(जन्म नक्षत्र)</span> — is arguably the most
        important single fact in classical Indian astrology. The
        janma nakshatra:
      </p>

      <ul>
        <li>
          Determines the starting point of Vimshottari dasha — the
          120-year planetary period sequence that structures the
          entire predictive timeline of a kundli.
        </li>
        <li>
          Provides the namakarana (naming) syllable in the
          traditional Indian naming convention: each nakshatra has
          four padas, each pada associated with a Sanskrit syllable,
          and a child&rsquo;s formal name traditionally begins with
          the syllable of the pada in which their natal Moon falls.
        </li>
        <li>
          Is checked for marriage compatibility against the partner&rsquo;s
          janma nakshatra — the gana, yoni, varna, and other
          attributes are matched in a system called{" "}
          <em>ashta-koota</em>{" "}
          <span lang="hi">(अष्ट कूट)</span> — &ldquo;eight folds.&rdquo;
        </li>
        <li>
          Provides the natal &ldquo;tara&rdquo; — a sequence of nine
          tara categories (janma, sampat, vipat, kshema, pratyari,
          sadhaka, vadha, mitra, parama-mitra) that flag whether
          the current transiting nakshatra is favourable or not for
          a given native.
        </li>
      </ul>

      <p>
        We will not develop these in Book 1. They belong to the chart
        reading discussion in Book 2. We mention them so you
        understand how central nakshatra is to the larger system.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>State the size of one nakshatra (13°20′) and the formula for computing it from longitude.</li>
        <li>
          Explain why there are 27 nakshatras and what the 28th
          (Abhijit) is for.
        </li>
        <li>
          Define a pada (3°20′) and explain why 27 × 4 = 108 = 12 ×
          9.
        </li>
        <li>
          List the four major classifications layered on each
          nakshatra: lord, gana, yoni, varna.
        </li>
        <li>
          Use the master table to look up any nakshatra&rsquo;s
          attributes.
        </li>
        <li>
          Define gandanta and panchaka, and identify which
          nakshatras are involved in each.
        </li>
        <li>
          Explain how the Vimshottari dasha period is anchored to
          the natal nakshatra (janma nakshatra).
        </li>
        <li>
          Read the nakshatra line of a daily panchang and know
          what the end-time means.
        </li>
      </ul>

      <p>
        Open the daily panchang. Find today&rsquo;s nakshatra. Look
        it up in the master table — note its lord, gana, yoni, and
        varna. Now think about what activity you have planned today.
        Does it match the temperament of this nakshatra? You do not
        need to believe in the prescription to find the question
        interesting.
      </p>

      <p>
        In the next chapter we look at the third of the five limbs —{" "}
        <strong>yoga</strong>. Yoga is computed from the sum of Sun
        and Moon longitudes (rather than the difference, which gave
        us tithi). It is the least-discussed of the five limbs in
        common conversation but plays an important role in
        muhurta selection.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        अब हम पाँच अंगों में सबसे अलंकृत और सबसे प्राचीन तक आ पहुँचे हैं
        &mdash; <strong>नक्षत्र</strong>। संस्कृत मूल का अर्थ है &ldquo;तारा,
        आकाशीय ज्योतिर्मान&rdquo; &mdash; धातु <em>नक्ष्</em> से (समीप जाना,
        प्राप्त करना)। व्यवहार में यह क्रान्तिवृत्त के 27 बराबर भागों में से
        किसी एक का सूचक है, जिसका नाम उसी क्षेत्र के तारक-समूह पर रखा गया है।
      </p>

      <p>
        नक्षत्र-प्रणाली बारह-राशि चक्र से प्राचीन है। यह <em>अथर्ववेद</em>{" "}
        और <em>यजुर्वेद</em> में पहले से उपस्थित है &mdash; ग्रंथ जो लगभग
        1000 ईसा पूर्व के माने जाते हैं &mdash; इससे बहुत पहले कि राशि का
        ढाँचा ग्रीक-बेबीलोनी खगोल विज्ञान से आये। अतः नक्षत्र भारतीय मूल का
        आकाश-ग्रिड हैं। राशियाँ बाद में आयीं। जहाँ राशि-ज्योतिष सूर्य पर
        केन्द्रित है, वहाँ नक्षत्र-ज्योतिष में चन्द्रमा का केन्द्रीय
        महत्त्व है। यह भारतीय परम्परा को पाश्चात्य से अलग करने वाली एक
        गहरी विशेषता है।
      </p>

      <p>
        यह अध्याय दीर्घ है। शॉर्टकट नहीं है। 27 नक्षत्र हैं, हर एक का अपना
        विवरण। हम पहले ढाँचा बनायेंगे &mdash; नक्षत्र क्या है, गणना कैसे
        होती है, उस पर कौन-कौन से लक्षण लगते हैं &mdash; और फिर मास्टर-तालिका
        में 27 की झलक पायेंगे। तालिका को सन्दर्भ-ग्रंथ की तरह उपयोग कीजिए।
        उसे रटना नहीं है; आवश्यकता इतनी है कि किसी भी नक्षत्र की पंक्ति को
        देखकर पढ़ सकें।
      </p>

      <h2>आकाश का 27-गुना विभाजन</h2>

      <p>
        क्रान्तिवृत्त &mdash; सूर्य का प्रत्यक्ष वार्षिक मार्ग जिसके साथ
        चन्द्रमा और ग्रह भी निकटता से चलते हैं &mdash; एक महावृत्त है, 360°
        का। नक्षत्र-प्रणाली इस वृत्त को <strong>27 बराबर भागों</strong> में
        बाँटती है, प्रत्येक का माप —
      </p>

      <blockquote>
        360° ÷ 27 = <strong>13°20'</strong> (तेरह डिग्री बीस चाप-मिनट)
      </blockquote>

      <p>
        प्रत्येक भाग एक नक्षत्र है। चन्द्रमा अपनी 27.32-दिन की नाक्षत्र
        परिक्रमा में लगभग प्रति दिन एक नक्षत्र पार करता है। (इसी कारण इनकी
        संख्या 27 है &mdash; <em>विष्णु पुराण</em> की पौराणिक भाषा में
        चन्द्रमा की &ldquo;27 पत्नियाँ&rdquo; हैं, और वह प्रति रात्रि एक के
        पास जाता है।) किसी भी रात्रि चन्द्रमा 27 में से किसी एक नक्षत्र
        में &ldquo;होता है&rdquo; &mdash; अर्थात् उसका क्रान्तिवृत्तीय
        देशांतर उस नक्षत्र के 13°20' अंतराल में पड़ता है।
      </p>

      <p>
        किसी भी क्षण चन्द्रमा का नक्षत्र निकालने का गणितीय सूत्र है —
      </p>

      <blockquote>
        <strong>नक्षत्र-संख्या</strong> = <code>floor(λ_M ÷ 13°20')</code> + 1
      </blockquote>

      <p>
        जहाँ <code>λ_M</code> चन्द्रमा का निरयण क्रान्तिवृत्तीय देशांतर
        है (डिग्री में), और परिणाम 27 के अवशेष में लिया जाता है। प्रथम
        नक्षत्र (अश्विनी) नाक्षत्र राशि-चक्र में मेष के 0° पर आरम्भ होता है,
        और 27वाँ (रेवती) मीन के 30° पर समाप्त होता है।
      </p>

      <FigurePlaceholder
        number="4.1"
        caption="The 27 nakshatras as 13°20′ segments around the ecliptic, with the Moon's monthly path."
        captionHi="राशि-चक्र पर 27 नक्षत्रों के 13°20' खंड और चन्द्रमा का मासिक पथ।"
        promptHint="See Batch 1 image #9 for the Gemini prompt."
      />

      <h2>27 ही क्यों, 28 क्यों नहीं?</h2>

      <p>
        सबसे प्राचीन भारतीय ग्रंथों में 28 नक्षत्रों का उल्लेख है, जिसमें
        एक अतिरिक्त <em>अभिजित्</em> सम्मिलित है &mdash; तारा वेगा, उत्तरषाढ़ा
        और श्रवण के बीच। शास्त्रीय रूप से 27 पर सीमित करने का कारण यह है कि
        360 का 27 से भाग पूर्ण आता है (13°20' प्रति नक्षत्र), परन्तु 28
        से नहीं (12.857° का असुविधाजनक भाग)। अभिजित् को विशेष प्रयोजनों के
        लिए रखा गया &mdash; विशेषतः मध्याह्न के शुभ मुहूर्त के नाम के रूप
        में &mdash; परन्तु नियमित आकाश-ग्रिड से हटा दिया गया।
      </p>

      <p>
        दैनिक पंचांग में 27 ही प्रचलित संख्या है। हम अभिजित् से मुहूर्त-
        अध्याय में पुनः मिलेंगे, जहाँ उसका अपना सम्मानित स्थान है।
      </p>

      <h2>पाद &mdash; नक्षत्र का चतुर्थांश</h2>

      <p>
        प्रत्येक 13°20' के नक्षत्र को आगे{" "}
        <strong>चार बराबर पादों</strong> में बाँटा गया है &mdash; पाद
        अर्थात् &ldquo;चरण&rdquo; या &ldquo;पैर&rdquo;। प्रत्येक पाद 3°20'
        का। पाद महत्त्वपूर्ण हैं क्योंकि नक्षत्र-प्रणाली 27 खंडों का प्रयोग
        करती है, परन्तु राशि-प्रणाली 12 का &mdash; और 27 नक्षत्र × 4 पाद =
        108 पाद, जबकि 12 राशि × 9 पाद = 108 पाद। अर्थात् प्रत्येक राशि में
        ठीक 9 पाद, या सवा-दो (2¼) नक्षत्र समाते हैं।
      </p>

      <p>
        भारतीय परम्परा में पवित्र अंक 108 कोई संयोग नहीं है &mdash; यह उसी
        वृत्त के दो पूरक विभाजनों का स्वाभाविक गुणनफल है। जप-माला में 108
        मणकें होते हैं। पाद-दर-पाद विश्लेषण कुण्डली के विस्तृत पठन का आधार
        है; इस पर हम पुस्तक 2 में लौटेंगे।
      </p>

      <FigurePlaceholder
        number="4.2"
        caption="The 27 nakshatras and 12 rashis on the same ecliptic. 27 × 4 padas = 12 × 9 padas = 108."
        captionHi="एक ही राशि-चक्र पर 27 नक्षत्र और 12 राशियाँ। 27 × 4 = 12 × 9 = 108 पाद।"
        promptHint="See Batch 1 image #11 for the Gemini prompt."
      />

      <h2>प्रत्येक नक्षत्र पर लगायी गयी चार वर्गीकरण-परतें</h2>

      <p>
        प्रत्येक 27 नक्षत्र पर अनेक लक्षण लगते हैं, जिनका उपयोग मुहूर्त-
        चयन, अनुकूलता-विश्लेषण (जैसे विवाह के लिए) और कुण्डली के पठन में
        होता है। चार सबसे महत्त्वपूर्ण वर्गीकरण ये हैं —
      </p>

      <h3>स्वामी (ग्रह)</h3>
      <p>
        प्रत्येक नक्षत्र का स्वामी नौ ग्रहों में से एक है। स्वामित्व नियत
        क्रम में चक्रीय है: केतु, शुक्र, सूर्य, चन्द्र, मंगल, राहु, गुरु,
        शनि, बुध &mdash; और तीन बार दोहराया जाकर सभी 27 को ढक लेता है। अतः
        अश्विनी (1) का स्वामी केतु, भरणी (2) का शुक्र, ..., मघा (10) का
        फिर केतु, और इसी प्रकार आगे। यही स्वामित्व{" "}
        <strong>विंशोत्तरी दशा</strong> का आधार है &mdash; भारतीय ज्योतिष
        में सर्वाधिक प्रयुक्त ग्रह-दशा प्रणाली, जिसमें जन्म के समय चन्द्रमा
        जिस नक्षत्र में हो, उसी से जीवन-दशा का क्रम निर्धारित होता है। दशा
        पर हम पुस्तक 2 में लौटेंगे।
      </p>

      <h3>गण &mdash; स्वभाव-वर्ग</h3>
      <p>
        27 नक्षत्र तीन गण-प्रकारों में बाँटे गये हैं &mdash; नौ-नौ के तीन
        समूह।
      </p>
      <ul>
        <li>
          <strong>देव गण</strong> &mdash; दिव्य। हल्का, परिष्कृत, सामंजस्यपूर्ण।
          (अश्विनी, मृगशिरा, पुनर्वसु, पुष्य, हस्त, स्वाति, अनुराधा, श्रवण,
          रेवती।)
        </li>
        <li>
          <strong>मनुष्य गण</strong> &mdash; मानवीय। मिश्रित, संतुलित,
          व्यावहारिक। (भरणी, रोहिणी, आर्द्रा, पूर्व-फाल्गुनी, उत्तर-फाल्गुनी,
          पूर्वाषाढ़ा, उत्तराषाढ़ा, पूर्व-भाद्रपदा, उत्तर-भाद्रपदा।)
        </li>
        <li>
          <strong>राक्षस गण</strong> &mdash; उग्र, तीव्र, परिवर्तनकारी।
          (कृत्तिका, आश्लेषा, मघा, चित्रा, विशाखा, ज्येष्ठा, मूल, धनिष्ठा,
          शतभिषा।)
        </li>
      </ul>
      <p>
        नामों के बावजूद, इनमें कोई स्वयं में &ldquo;शुभ&rdquo; या
        &ldquo;अशुभ&rdquo; नहीं है। ये स्वभाव बताते हैं। विवाह के लिए
        कुण्डली-मेलापक में गण-अनुकूलता देखी जाती है &mdash; देव-देव और
        मनुष्य-मनुष्य अनुकूल माने जाते हैं; देव-राक्षस मेल को विशेष
        ध्यान से परखा जाता है। राक्षस गण के नक्षत्र तीव्रता-सापेक्ष
        प्रयोजनों (युद्ध, ध्वंस, गहरा परिवर्तन) के लिए शक्तिशाली हैं, और
        सूक्ष्म-नाजुक कार्यों के लिए कम उपयुक्त।
      </p>

      <h3>योनि &mdash; पशु-स्वरूप</h3>
      <p>
        प्रत्येक नक्षत्र चौदह पशुओं में से किसी एक से जुड़ा है। योनि का
        उपयोग विवाह-अनुकूलता में होता है &mdash; मित्र-योनि-युग्म (गाय-भैंस)
        अधिक अंक पाता है, शत्रु-योनि-युग्म (श्वान-मृग, बिल्ली-मूषक) कम।
        चौदह योनियाँ हैं &mdash; अश्व, हस्ति, मेष, सर्प, श्वान, मार्जार,
        मूषक, गौ, महिषी, व्याघ्र, मृग, वानर, नकुल, सिंह।
      </p>

      <h3>वर्ण &mdash; जाति-तुल्य वर्गीकरण</h3>
      <p>
        प्रत्येक नक्षत्र को चार वर्णों में से एक भी सौंपा गया है &mdash;
        ब्राह्मण (पुरोहित, ज्ञान-निष्ठ), क्षत्रिय (योद्धा, शासन), वैश्य
        (व्यापारी, उत्पादक), शूद्र (सेवक, सहायक)। ये वर्गीकरण शास्त्रीय
        ग्रंथों से आते हैं और मुहूर्त-चयन में मुख्यतः प्रयोग होते हैं
        (कार्य का स्वरूप उस नक्षत्र के वर्ण से मिलाकर)। इन्हें सामाजिक
        जाति-व्यवस्था से नहीं मिलाना चाहिए &mdash; नक्षत्र-वर्ण की शब्दावली
        उस कठोर सामाजिक स्तरीकरण से पुरानी है, और किसी नक्षत्र-काल में किस
        प्रकार के कार्य अनुकूल हैं, इसका सूचक है। ब्राह्मण नक्षत्र अध्ययन,
        अनुष्ठान और चिन्तन को अनुकूल हैं; क्षत्रिय नक्षत्र आज्ञा, क्रिया,
        नेतृत्व को; वैश्य नक्षत्र व्यापार, संचय, विनिमय को; शूद्र नक्षत्र
        सेवा, शिल्प, श्रम-उत्पादन को।
      </p>

      <h2>अन्य वर्गीकरण जिनसे आप मिलेंगे</h2>

      <p>
        चार प्रमुख वर्गीकरणों के अतिरिक्त शास्त्रीय ग्रंथ प्रत्येक नक्षत्र
        को और भी लक्षण देते हैं। हम संक्षेप में बताते हैं ताकि स्रोत-ग्रंथों
        में आप उन्हें पहचान सकें।
      </p>

      <ul>
        <li>
          <strong>तत्त्व</strong> &mdash; पृथ्वी, आपः (जल), तेजस् (अग्नि),
          वायु, या आकाश। मुहूर्त और अनुष्ठान में।
        </li>
        <li>
          <strong>गुण</strong> &mdash; सत्त्व, रजस्, या तमस्। मूल गुण।
        </li>
        <li>
          <strong>दिशा</strong> &mdash; प्रत्येक नक्षत्र की एक मुख्य दिशा,
          वास्तु और यात्रा-मुहूर्त में प्रयुक्त।
        </li>
        <li>
          <strong>शक्ति</strong> &mdash; वह विशिष्ट शक्ति या ऊर्जा जिसका
          नक्षत्र प्रतीक है। (अश्विनी = शीघ्र-प्राप्ति की शक्ति; भरणी =
          अपहरण की शक्ति; कृत्तिका = दहन की शक्ति; इत्यादि।)
        </li>
      </ul>

      <h2>विशेष समूह &mdash; गण्डान्त और पंचक</h2>

      <h3>गण्डान्त &mdash; &ldquo;गाँठ&rdquo; नक्षत्र</h3>
      <p>
        तीन नक्षत्र-युग्म ऐसे हैं जो किसी अग्नि-राशि और जल-राशि की सीमा पर
        पड़ते हैं: रेवती-अश्विनी, आश्लेषा-मघा, और ज्येष्ठा-मूल। इन सीमाओं
        के दोनों ओर के 3°20' को <em>गण्डान्त</em> कहते हैं &mdash;
        &ldquo;गाँठ का अंत।&rdquo; गण्डान्त-काल में जन्म और कुछ अनुष्ठानिक
        प्रयोजनों पर विशेष ध्यान देने का संकेत होता है; तत्त्वों का यह
        संक्रमण (राशि-चक्र में जल-अग्नि-जल-अग्नि का क्रम) ज्योतिषीय रूप से
        आवेशित क्षण उत्पन्न करता है।
      </p>

      <h3>पंचक &mdash; अशुभ पाँच</h3>
      <p>
        अंतिम पाँच नक्षत्र &mdash; धनिष्ठा (अंतिम आधा), शतभिषा, पूर्व-
        भाद्रपदा, उत्तर-भाद्रपदा, रेवती &mdash; मिलकर{" "}
        <em>पंचक</em> बनाते हैं। चन्द्रमा का इन पाँच नक्षत्रों में संक्रमण
        (प्रत्येक मास लगभग 4 दिन) पारम्परिक रूप से कुछ कार्यों के लिए अशुभ
        माना जाता है &mdash; जैसे छत-छादन, दक्षिण-यात्रा, ईंधन-संग्रह, पलंग
        का क्रय। पारम्परिक तर्क इन नक्षत्रों के जलीय स्वरूप और{" "}
        <em>स्कन्द पुराण</em> की कथाओं पर आधारित है; व्यावहारिक प्रभाव यह
        है कि निर्माण-कर्मचारी और पारम्परिक हिन्दू तथा जैन परिवार पंचक के
        दौरान कुछ कार्य टाल देते हैं। पंचक होने पर यह पंचांग उसे चिह्नित
        कर देता है।
      </p>

      <h2>27 नक्षत्र &mdash; मास्टर सन्दर्भ-तालिका</h2>

      <p>
        नीचे की तालिका हर नक्षत्र की संख्या, नाम (लिप्यन्तरण और देवनागरी
        दोनों), चिह्न, अधिष्ठाता देव, स्वामी ग्रह, निरयण देशांतर का विस्तार,
        गण, योनि और वर्ण देती है। यही पुस्तक की सन्दर्भ-तालिका है; हम इसे
        पुनः नहीं दोहरायेंगे।
      </p>

      <div className="overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>नाम</th>
              <th>चिह्न</th>
              <th>देव</th>
              <th>स्वामी</th>
              <th>देशांतर</th>
              <th>गण</th>
              <th>योनि</th>
              <th>वर्ण</th>
              <th>स्वभाव</th>
            </tr>
          </thead>
          <tbody>
            {NAKSHATRAS.map((n) => (
              <tr key={n.number}>
                <td>{n.number}</td>
                <td>
                  <strong lang="hi">{n.nameHi}</strong>
                  <br />
                  <span className="text-gray-400">{n.name}</span>
                </td>
                <td>{n.symbol}</td>
                <td>
                  <span lang="hi">{n.deityHi}</span>
                  <br />
                  <span className="text-gray-400">{n.deity}</span>
                </td>
                <td>
                  <span lang="hi">{n.lordHi}</span>
                  <br />
                  <span className="text-gray-400">{n.lord}</span>
                </td>
                <td>{n.rashiSpan}</td>
                <td>{n.gana}</td>
                <td>{n.yoni}</td>
                <td>{n.varna}</td>
                <td>{n.nature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>चार महत्त्वपूर्ण नक्षत्रों का गहन परिचय</h2>

      <p>
        सत्ताईस विस्तृत प्रोफ़ाइल अपने आप में एक पूरी पुस्तक भर देंगी। हम
        चार पर ध्यान से देखेंगे &mdash; जो पंचांग-पठन में सबसे अधिक उल्लेख
        में आते हैं &mdash; ताकि आप मास्टर तालिका की किसी भी पंक्ति को इसी
        प्रकार पढ़ने का प्रतिमान पा सकें।
      </p>

      <h3>पुष्य (8वाँ)</h3>
      <p>
        चिह्न: गाय का स्तन। देव: बृहस्पति। स्वामी: शनि। देशांतर: कर्क
        3°20' &mdash; 16°40'। पुष्य को राशि-चक्र का सबसे शुभ नक्षत्र माना
        जाता है &mdash; नाम का अर्थ ही &ldquo;पोषण&rdquo; है। पुष्य में
        आरम्भ किया गया मुहूर्त (विशेषकर जब वह गुरुवार पर पड़े &mdash;
        &ldquo;गुरु पुष्य&rdquo;) नये उद्यमों के लिए लगभग अजेय माना जाता
        है: व्यवसाय का प्रारम्भ, वित्तीय निवेश, शिक्षा का आरम्भ। &ldquo;रवि
        पुष्य&rdquo; (रविवार + पुष्य) भी समान रूप से प्रबल है। गाय के स्तन
        का चिह्न इसी अर्थ को दर्शाता है &mdash; पोषण का अक्षय स्रोत।
      </p>

      <h3>मघा (10वाँ)</h3>
      <p>
        चिह्न: राजसिंहासन। देव: पितर (दिवंगत पूर्वज)। स्वामी: केतु। देशांतर:
        सिंह 0°00' &mdash; 13°20'। मघा का पितरों से जुड़ाव इसे श्राद्ध-
        कर्मों और स्वर्गीयों के स्मरण के लिए मुख्य नक्षत्र बनाता है। इसके
        विषय हैं &mdash; वंश, उत्तराधिकार, पैतृक अधिकार, छिपे हुए
        सातत्य। मघा गण्डान्त नक्षत्रों में से एक है (यह आश्लेषा-मघा सीमा के
        ठीक बाद, कर्क के अंत में आरम्भ होता है), और मघा के आरम्भ में जन्म
        विशेष चिह्नित किया जाता है। राजसिंहासन का चिह्न महत्त्वपूर्ण है
        &mdash; मघा-जात व्यक्ति प्रायः उत्तराधिकार में या प्रदत्त रूप से
        प्राप्त सत्ता-स्थानों से जुड़े मिलते हैं।
      </p>

      <h3>मूल (19वाँ)</h3>
      <p>
        चिह्न: जड़ों का गुच्छ। देव: निरृति (विघटन की देवी)। स्वामी: केतु।
        देशांतर: धनु 0°00' &mdash; 13°20'। नाम <em>मूल</em> का अर्थ
        &ldquo;जड़, स्रोत, मूल कारण&rdquo; है। यह अनुसन्धानप्रिय,
        दार्शनिक नक्षत्र है &mdash; उस व्यक्ति का स्वभाव जो प्रश्न की तह
        तक खुदाई करता है। निरृति से इसका सम्बन्ध इसे एक विघटनकारी, ध्वंसक
        गुण देता है: मूल असत्य संरचनाओं के विनाश का पक्षधर है ताकि सच्ची
        जड़ तक पहुँचा जा सके। यह भी गण्डान्त नक्षत्र है (वृश्चिक-धनु सीमा
        पर)। मूल के प्रथम पाद में जन्म पारम्परिक रूप से विशेष अनुष्ठानिक
        सावधानी से देखा जाता है।
      </p>

      <h3>रेवती (27वाँ)</h3>
      <p>
        चिह्न: मछली। देव: पूषन् (एक सूर्य-स्वरूप देव, यात्रियों और पशुधन
        के संरक्षक)। स्वामी: बुध। देशांतर: मीन 16°40' &mdash; 30°00'।
        रेवती अंतिम नक्षत्र है &mdash; अश्विनी पर लौटने से पहले चक्र की
        पूर्णता। यह दीर्घ यात्रा के बाद कुशल-समापन, संतोष, ग्राम्य-समृद्धि
        का वहन करता है। यह पंचक का अंग है, और अंतिम गण्डान्त-क्षेत्र भी।
        रेवती-जात व्यक्ति प्रायः सेवा-कार्य, यात्राएँ (वास्तविक और
        प्रतीकात्मक) और अंत के निकट रहने वालों को सान्त्वना देने की ओर
        प्रवृत्त होते हैं।
      </p>

      <h2>आपके पंचांग में नक्षत्र कैसे आता है</h2>

      <p>
        इसी साइट का दैनिक पंचांग खोलिए। नक्षत्र की पंक्ति दो बातें बताती है —
      </p>

      <ol>
        <li>
          <strong>सूर्योदय के समय वर्तमान नक्षत्र</strong> &mdash; दिन के
          आरम्भ पर चन्द्रमा जिसमें है। यही मुहूर्त और अनुष्ठानिक प्रयोजनों
          के लिए &ldquo;दिन का नक्षत्र&rdquo; है।
        </li>
        <li>
          <strong>उस नक्षत्र की समाप्ति का समय</strong> &mdash; वह घड़ी-समय
          जिस पर चन्द्रमा वर्तमान नक्षत्र को छोड़कर अगले में जायेगा। उस
          समय के बाद तकनीकी रूप से अगला नक्षत्र चल रहा है &mdash; यद्यपि
          पंचांग-परिपाटी सूर्योदय पर उपस्थित नक्षत्र (उदय-तिथि का समकक्ष,
          &ldquo;उदय नक्षत्र&rdquo;) से ही दिन को नामित करती है।
        </li>
      </ol>

      <p>
        किसी एक दिन में सामान्यतः एक नक्षत्र प्रबल रहता है, परन्तु चूँकि
        चन्द्रमा 27.32 ÷ 27 = 1.012 दिन प्रति नक्षत्र लेता है, नक्षत्र हर
        लगभग 24 घंटे में बदलता है &mdash; कभी कुछ अधिक, कभी कुछ कम।
      </p>

      <KeyIdea
        title="नक्षत्र चन्द्रमा के देशांतर से ही निर्धारित होता है"
        titleHi="Nakshatra is determined by the Moon's longitude alone."
      >
        तिथि के लिए चन्द्र-सूर्य का अंतर चाहिए। योग के लिए उनका योग। करण
        तिथि का आधा। परन्तु नक्षत्र के लिए केवल चन्द्रमा की स्थिति। इसी
        कारण इसे एक सूक्ष्मतर आकाश-घड़ी की तरह उपयोग किया जा सकता है
        &mdash; हर लगभग 24 घंटे में नया नक्षत्र, चाहे सूर्य कुछ भी कर रहा
        हो।
      </KeyIdea>

      <h2>चन्द्रमा का नक्षत्र और व्यक्तिगत ज्योतिष</h2>

      <p>
        जहाँ दिन की तिथि सबसे महत्त्वपूर्ण मुहूर्त-निर्धारक है व्यवहार में,
        वहीं जन्म के समय चन्द्रमा का नक्षत्र &mdash; <strong>जन्म नक्षत्र</strong>{" "}
        &mdash; शास्त्रीय भारतीय ज्योतिष का सबसे महत्त्वपूर्ण एकल तथ्य है।
        जन्म नक्षत्र —
      </p>

      <ul>
        <li>
          विंशोत्तरी दशा का प्रारम्भ-बिन्दु निर्धारित करता है &mdash; वह
          120-वर्षीय ग्रह-अवधि क्रम जो कुण्डली की पूरी भविष्यकाल-रेखा को
          ढाँचा देता है।
        </li>
        <li>
          पारम्परिक भारतीय नामकरण-प्रथा में नामाक्षर देता है: हर नक्षत्र
          के चार पाद हैं, हर पाद से एक संस्कृत अक्षर जुड़ा है, और बच्चे
          का औपचारिक नाम उसी पाद के अक्षर से प्रारम्भ होता है जिसमें उसका
          जन्मकालीन चन्द्र पड़ा।
        </li>
        <li>
          विवाह-अनुकूलता में जीवनसाथी के जन्म-नक्षत्र से मिलाकर देखा जाता
          है &mdash; गण, योनि, वर्ण और अन्य लक्षण <em>अष्ट कूट</em>{" "}
          प्रणाली में मिलाये जाते हैं।
        </li>
        <li>
          प्राकृतिक &ldquo;तारा&rdquo; देता है &mdash; नौ तारा-वर्गों
          (जन्म, सम्पत्, विपत्, क्षेम, प्रत्यरि, साधक, वध, मित्र, परम-
          मित्र) का क्रम, जो वर्तमान में चलता हुआ नक्षत्र किसी जातक के
          लिए अनुकूल है या नहीं &mdash; इसका संकेत देता है।
        </li>
      </ul>

      <p>
        इन्हें हम पुस्तक 1 में विकसित नहीं करेंगे। ये पुस्तक 2 के
        कुण्डली-पठन-विमर्श में आते हैं। यहाँ केवल इतना उल्लेख ताकि आप
        समझें कि बड़े तंत्र में नक्षत्र कितना केन्द्रीय है।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>
          एक नक्षत्र का माप (13°20') बता सकें और देशांतर से उसकी गणना का
          सूत्र।
        </li>
        <li>
          नक्षत्र 27 ही क्यों हैं और 28वाँ (अभिजित्) किसके लिए है, यह
          समझा सकें।
        </li>
        <li>
          पाद की परिभाषा (3°20') दे सकें और बता सकें कि 27 × 4 = 108 = 12 × 9।
        </li>
        <li>
          प्रत्येक नक्षत्र पर लगायी गयी चार प्रमुख वर्गीकरण-परतें: स्वामी,
          गण, योनि, वर्ण &mdash; गिना सकें।
        </li>
        <li>
          मास्टर तालिका से किसी भी नक्षत्र के लक्षण निकाल सकें।
        </li>
        <li>
          गण्डान्त और पंचक की परिभाषा दे सकें, और इनमें सम्मिलित नक्षत्र
          पहचान सकें।
        </li>
        <li>
          विंशोत्तरी दशा-अवधि जन्म-नक्षत्र से कैसे जुड़ी है, यह समझा सकें।
        </li>
        <li>
          दैनिक पंचांग की नक्षत्र-पंक्ति पढ़कर समाप्ति-समय का अर्थ समझ
          सकें।
        </li>
      </ul>

      <p>
        दैनिक पंचांग खोलिए। आज का नक्षत्र देखिए। मास्टर तालिका में उसे
        ढूँढिए &mdash; उसका स्वामी, गण, योनि, वर्ण नोट कीजिए। अब विचार
        कीजिए कि आज आपने कौन-सा कार्य निर्धारित किया है। क्या वह इस
        नक्षत्र के स्वभाव से मेल खाता है? आपको इस निर्देश में विश्वास करने
        की आवश्यकता नहीं &mdash; प्रश्न ही दिलचस्प लगेगा।
      </p>

      <p>
        अगले अध्याय में हम पाँच अंगों में से तीसरे को लेंगे &mdash;{" "}
        <strong>योग</strong>। योग सूर्य और चन्द्र के देशांतरों के योग से
        निकाला जाता है (तिथि की तरह अंतर से नहीं)। आम बातचीत में पाँच
        अंगों में सबसे कम चर्चित, परन्तु मुहूर्त-चयन में महत्त्वपूर्ण
        भूमिका निभाने वाला।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

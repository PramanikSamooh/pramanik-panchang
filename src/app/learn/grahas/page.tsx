import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("grahas")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We have been talking about grahas{" "}
        <span lang="hi">(ग्रह)</span> in every chapter so far. The
        weekday is ruled by a graha. The nakshatra is ruled by a
        graha. The rashi is ruled by a graha. We have used them as
        background, but never given them their own treatment.
      </p>

      <p>
        This chapter is that treatment. We will look at all nine
        grahas — the seven luminaries plus the two lunar nodes —
        with enough depth that you can read any classical reference
        to a graha and know what is meant. The chapter is long.
        Treat it as nine short chapters back to back; each graha
        section can be read independently after the framework
        introduction.
      </p>

      <h2>Why nine?</h2>

      <p>
        The Sanskrit word <em>graha</em> literally means
        &ldquo;seizer&rdquo; or &ldquo;grasper&rdquo; — from the
        root <em>grah</em>, &ldquo;to grasp.&rdquo; The grahas are
        called this because they were thought to grasp the
        consciousness of a person, influencing thought and action.
        It is not the same word as the modern English
        &ldquo;planet&rdquo; (Greek <em>planētēs</em>,
        &ldquo;wanderer&rdquo;) — though both words describe the
        same celestial bodies, and both reflect a metaphor for
        observed motion.
      </p>

      <p>
        The classical list is the <em>navagraha</em>{" "}
        <span lang="hi">(नवग्रह)</span> — the nine grahas:
      </p>

      <ol>
        <li>
          <strong>Surya</strong> <span lang="hi">(सूर्य)</span> — the
          Sun
        </li>
        <li>
          <strong>Chandra</strong> <span lang="hi">(चन्द्र)</span> — the
          Moon
        </li>
        <li>
          <strong>Mangala</strong> <span lang="hi">(मंगल)</span> — Mars
        </li>
        <li>
          <strong>Budha</strong> <span lang="hi">(बुध)</span> —
          Mercury
        </li>
        <li>
          <strong>Guru / Brihaspati</strong>{" "}
          <span lang="hi">(गुरु / बृहस्पति)</span> — Jupiter
        </li>
        <li>
          <strong>Shukra</strong> <span lang="hi">(शुक्र)</span> —
          Venus
        </li>
        <li>
          <strong>Shani</strong> <span lang="hi">(शनि)</span> —
          Saturn
        </li>
        <li>
          <strong>Rahu</strong> <span lang="hi">(राहु)</span> — the
          northern lunar node
        </li>
        <li>
          <strong>Ketu</strong> <span lang="hi">(केतु)</span> — the
          southern lunar node
        </li>
      </ol>

      <p>
        Notice what is and is not on this list. The Sun and the Moon
        are grahas — even though, by modern astronomy, the Sun is a
        star and the Moon is a satellite of Earth, neither is
        technically a planet. Rahu and Ketu are grahas — even
        though they are not bodies at all, only the two
        intersection points where the Moon&rsquo;s orbit crosses the
        ecliptic. And conspicuously absent: Uranus, Neptune, and
        Pluto. These were unknown to the ancient world, since they
        are invisible to the naked eye. They are not part of the
        traditional navagraha system.
      </p>

      <p>
        Some modern Vedic astrologers have proposed including
        Uranus, Neptune, and Pluto as adjuncts to the classical
        nine. This is a contested move. The classical texts and
        all traditional ritual practice use the nine, and we will
        too.
      </p>

      <h2>The framework: how to read each graha&rsquo;s entry</h2>

      <p>
        For each graha we will note:
      </p>

      <ul>
        <li>
          <strong>Identity</strong> — Sanskrit name, common
          alternate names, what the body actually is in modern
          astronomy.
        </li>
        <li>
          <strong>Nature (svabhava)</strong>{" "}
          <span lang="hi">(स्वभाव)</span> — what kind of force the
          tradition associates with this graha.
        </li>
        <li>
          <strong>Karaka</strong> <span lang="hi">(कारक)</span> —
          significator. The areas of life this graha represents.
        </li>
        <li>
          <strong>Rashi rulership</strong>{" "}
          <span lang="hi">(राशि स्वामित्व)</span>.
        </li>
        <li>
          <strong>Exaltation and debilitation</strong>{" "}
          <span lang="hi">(उच्च-नीच)</span> — the rashi and degree
          where the graha is at its strongest, and where it is at
          its weakest.
        </li>
        <li>
          <strong>Friendships</strong>{" "}
          <span lang="hi">(मैत्री)</span> — with which other grahas
          this one is friendly, neutral, or hostile.
        </li>
        <li>
          <strong>Day, colour, gem, metal, direction</strong> — the
          ritual associations.
        </li>
        <li>
          <strong>Mythological identity</strong> — the deity
          identified with the graha and the major story arcs.
        </li>
      </ul>

      <h2>Surya — the Sun <span lang="hi">सूर्य</span></h2>

      <p>
        <strong>Identity:</strong> Surya is the Sun. Other names:
        Ravi, Bhanu, Aditya, Bhaskar, Pushan. Modern astronomy: the
        star at the centre of our solar system.
      </p>

      <p>
        <strong>Nature:</strong> Royal, fiery, masculine, sattvic
        (quality of clarity and goodness), authoritative.
      </p>

      <p>
        <strong>Karaka — significator of:</strong> the soul (atman),
        the self, the father, vitality, leadership, the spine,
        the heart, government, kings and rulers, the ego, fame,
        legitimate authority. In medical astrology Surya governs
        the heart and the eyes (especially the right eye in men,
        left eye in women).
      </p>

      <p>
        <strong>Rashi rulership:</strong> Simha (Leo) — only one
        rashi.
      </p>

      <p>
        <strong>Exaltation:</strong> 10° Mesha (Aries).{" "}
        <strong>Debilitation:</strong> 10° Tula (Libra). The
        Sun is strongest in the springtime fire-sign and weakest
        in the air-sign opposite.
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Moon, Mars,
        Jupiter. Neutral with Mercury. Hostile with Venus, Saturn,
        Rahu, Ketu.
      </p>

      <p>
        <strong>Day:</strong> Sunday (Ravivara).{" "}
        <strong>Colour:</strong> red, copper, saffron.{" "}
        <strong>Gem:</strong> ruby (manik).{" "}
        <strong>Metal:</strong> copper, gold.{" "}
        <strong>Direction:</strong> east. <strong>Element:</strong>{" "}
        fire (agni). <strong>Number:</strong> 1.
      </p>

      <p>
        <strong>Mythology:</strong> Surya is one of the principal
        Vedic deities, traversing the sky in a chariot drawn by
        seven horses (representing the seven days of the week, or
        the seven colours of the spectrum). He is the father of
        Yama (death), Yamuna (the river), Karna (the Mahabharata
        hero), Saturn (Shani), and the Ashwin twins. The
        <em> Aditya Hridaya Stotram</em> from the{" "}
        <em>Ramayana</em> is the principal hymn of praise to
        Surya, recited at sunrise.
      </p>

      <p>
        <strong>Astronomical period:</strong> apparent annual
        motion of 360° / year ≈ 1° per day. The Sun spends about
        30 days in each rashi.
      </p>

      <h2>Chandra — the Moon <span lang="hi">चन्द्र</span></h2>

      <p>
        <strong>Identity:</strong> Chandra is the Moon. Other names:
        Soma, Indu, Shashi, Mriganka. Modern astronomy: Earth&rsquo;s
        natural satellite.
      </p>

      <p>
        <strong>Nature:</strong> Watery, feminine, sattvic, cool,
        receptive, changing.
      </p>

      <p>
        <strong>Karaka:</strong> the mind (manas), emotions, the
        mother, feminine fertility, water and fluids, the public,
        memory, taste, peace, comfort, milk, liquids, beverages.
        Medically Chandra governs the lungs, the breasts, the
        stomach and digestive fluids, body fluids generally, and
        the left eye in men / right eye in women.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Karka (Cancer) — only one
        rashi.
      </p>

      <p>
        <strong>Exaltation:</strong> 3° Vrishabha (Taurus).{" "}
        <strong>Debilitation:</strong> 3° Vrishchika (Scorpio).
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Sun, Mercury.
        Neutral with Mars, Jupiter, Venus, Saturn. Hostile with
        Rahu, Ketu (because Rahu and Ketu are the eclipse-points
        that &ldquo;swallow&rdquo; the Moon).
      </p>

      <p>
        <strong>Day:</strong> Monday (Somavara).{" "}
        <strong>Colour:</strong> white, silver, pale.{" "}
        <strong>Gem:</strong> pearl (moti).{" "}
        <strong>Metal:</strong> silver. <strong>Direction:</strong>{" "}
        north-west. <strong>Element:</strong> water (jala).{" "}
        <strong>Number:</strong> 2.
      </p>

      <p>
        <strong>Mythology:</strong> Chandra is the deva of the
        Moon, said to have 27 wives — the 27 nakshatras, daughters
        of Daksha — but to favour Rohini, which led to a curse from
        Daksha causing the Moon to wax and wane. Soma is also the
        sacred Vedic plant from which the elixir of immortality
        was extracted; this conflation of plant, drink, and Moon
        is one of the oldest associations in Indian thought.
      </p>

      <p>
        <strong>Astronomical period:</strong> sidereal month 27.32
        days. The Moon traverses one nakshatra (~13°20′) per day on
        average — though, as we have seen, this varies.
      </p>

      <h2>Mangala — Mars <span lang="hi">मंगल</span></h2>

      <p>
        <strong>Identity:</strong> Mangala is Mars. Other names:
        Bhauma, Kuja, Angaraka. Modern astronomy: the fourth
        planet from the Sun.
      </p>

      <p>
        <strong>Nature:</strong> Fiery, masculine, tamasic
        (quality of inertia and force), sharp, energetic, hot.
      </p>

      <p>
        <strong>Karaka:</strong> energy, courage, willpower, anger,
        siblings (especially younger brothers), warriors and
        soldiers, surgeons, engineers, athletes, blood, muscles,
        red things, weapons, accidents, surgery, real estate
        (land). Mars is also the karaka for marriage in some
        traditions — if afflicted, a person is said to be{" "}
        <em>mangalik</em>, requiring careful matching in
        marriage astrology.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Mesha (Aries) and
        Vrishchika (Scorpio).
      </p>

      <p>
        <strong>Exaltation:</strong> 28° Makara (Capricorn).{" "}
        <strong>Debilitation:</strong> 28° Karka (Cancer).
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Sun, Moon,
        Jupiter. Neutral with Venus, Saturn. Hostile with
        Mercury (and Rahu, Ketu in some lists).
      </p>

      <p>
        <strong>Day:</strong> Tuesday (Mangalavara).{" "}
        <strong>Colour:</strong> red. <strong>Gem:</strong> red
        coral (moonga). <strong>Metal:</strong> copper.{" "}
        <strong>Direction:</strong> south.{" "}
        <strong>Element:</strong> fire (agni).{" "}
        <strong>Number:</strong> 9.
      </p>

      <p>
        <strong>Mythology:</strong> Mangala is the deva of war,
        often identified with Kartikeya / Skanda / Subramanya. He
        is also called Bhauma (&ldquo;earth-born&rdquo;) because
        of a myth in which he was born from a drop of
        Shiva&rsquo;s sweat falling on the earth. Hanuman is
        considered the protector against Mars&rsquo;s afflictions
        and is worshipped on Tuesdays.
      </p>

      <p>
        <strong>Astronomical period:</strong> sidereal year 687
        days. Mars goes retrograde once every ~26 months for
        approximately 60–80 days.
      </p>

      <h2>Budha — Mercury <span lang="hi">बुध</span></h2>

      <p>
        <strong>Identity:</strong> Budha is Mercury. The Sanskrit
        name shares its root with <em>buddhi</em>{" "}
        (intellect) and the Buddha (&ldquo;the awakened one&rdquo;)
        — though the deity Budha and the Buddha are distinct
        figures.
      </p>

      <p>
        <strong>Nature:</strong> Earthy and airy mixed, neutral
        gender, rajasic-with-sattva, quick, communicative,
        adaptable. Mercury takes on the qualities of whichever
        planets it associates with — it is the most
        &ldquo;influenced&rdquo; of the grahas.
      </p>

      <p>
        <strong>Karaka:</strong> intellect, speech, communication,
        commerce, writing, accounting, scholarship, wit, humour,
        teenagers and young adults, cousins, friends-as-equals,
        merchants, mathematicians, programmers, journalists,
        translators. Medically: nervous system, skin, voice,
        speech-related anatomy.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Mithuna (Gemini) and
        Kanya (Virgo).
      </p>

      <p>
        <strong>Exaltation:</strong> 15° Kanya (Virgo) — Mercury is
        unique in being exalted in its own rashi.{" "}
        <strong>Debilitation:</strong> 15° Meena (Pisces).
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Sun, Venus.
        Neutral with Mars, Jupiter, Saturn. Hostile with Moon
        (because the Moon is mythologically associated with
        Tara, Budha&rsquo;s mother in the most well-known myth).
      </p>

      <p>
        <strong>Day:</strong> Wednesday (Budhavara).{" "}
        <strong>Colour:</strong> green.{" "}
        <strong>Gem:</strong> emerald (panna).{" "}
        <strong>Metal:</strong> brass, bronze.{" "}
        <strong>Direction:</strong> north.{" "}
        <strong>Element:</strong> earth (prithvi).{" "}
        <strong>Number:</strong> 5.
      </p>

      <p>
        <strong>Mythology:</strong> Budha&rsquo;s origin myth is one of
        the most dramatic in the puranic literature. Tara, the wife
        of Brihaspati (Jupiter), was abducted by Chandra (Moon).
        The resulting child was Budha — caught in the middle of a
        feud between his biological father (Moon) and his
        adoptive father (Jupiter). The myth captures Mercury&rsquo;s
        adaptability and dual nature.
      </p>

      <p>
        <strong>Astronomical period:</strong> sidereal year 88
        days. Mercury goes retrograde three times per year for
        ~24 days each — the most frequent retrograde of any
        graha, source of the popular &ldquo;Mercury retrograde&rdquo;
        observation.
      </p>

      <h2>Guru / Brihaspati — Jupiter <span lang="hi">गुरु / बृहस्पति</span></h2>

      <p>
        <strong>Identity:</strong> Guru is Jupiter. The name{" "}
        <em>guru</em> means &ldquo;heavy, weighty&rdquo; (and also
        &ldquo;teacher&rdquo;). Brihaspati means &ldquo;lord of
        prayer.&rdquo; Both names refer to the same body. Modern
        astronomy: largest planet in the solar system.
      </p>

      <p>
        <strong>Nature:</strong> Sattvic, masculine, expansive,
        benevolent, wise. Jupiter is considered the most beneficial
        of all the grahas.
      </p>

      <p>
        <strong>Karaka:</strong> wisdom, knowledge, dharma
        (righteous duty), teachers, gurus, religion, philosophy,
        the law, judges, priests, children (especially the first
        child), husband (in a woman&rsquo;s chart), wealth and
        fortune, gold, expansion, abundance, optimism. Medically:
        liver, fat, the pancreas.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Dhanu (Sagittarius) and
        Meena (Pisces).
      </p>

      <p>
        <strong>Exaltation:</strong> 5° Karka (Cancer).{" "}
        <strong>Debilitation:</strong> 5° Makara (Capricorn).
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Sun, Moon,
        Mars. Neutral with Saturn. Hostile with Mercury, Venus.
      </p>

      <p>
        <strong>Day:</strong> Thursday (Guruvara).{" "}
        <strong>Colour:</strong> yellow, gold.{" "}
        <strong>Gem:</strong> yellow sapphire (pukhraj).{" "}
        <strong>Metal:</strong> gold.{" "}
        <strong>Direction:</strong> north-east.{" "}
        <strong>Element:</strong> ether (akasha).{" "}
        <strong>Number:</strong> 3.
      </p>

      <p>
        <strong>Mythology:</strong> Brihaspati is the preceptor of
        the devas — the celestial guru — counterpart to Shukra,
        the preceptor of the asuras. The dynamic between
        Brihaspati and Shukra is a recurring theme in puranic
        literature, representing the tension between the
        principles each represents.
      </p>

      <p>
        <strong>Astronomical period:</strong> sidereal year ~12
        years. Jupiter spends about 1 year in each rashi —
        making Jupiter&rsquo;s transit one of the most
        commonly-tracked annual astronomical events.
      </p>

      <h2>Shukra — Venus <span lang="hi">शुक्र</span></h2>

      <p>
        <strong>Identity:</strong> Shukra is Venus. The name comes
        from the root meaning &ldquo;bright, white,
        radiant.&rdquo; Modern astronomy: the second planet from
        the Sun, brightest natural object in the night sky after
        the Moon.
      </p>

      <p>
        <strong>Nature:</strong> Watery, feminine, rajasic with
        sattvic overtone, sensual, harmonious, refined.
      </p>

      <p>
        <strong>Karaka:</strong> love, marriage, romance, the wife
        (in a man&rsquo;s chart), beauty, art, music, dance,
        poetry, luxury, vehicles, jewellery, perfume, sexuality,
        feminine companionship, wine, sweets, comfort. Medically:
        reproductive system, kidneys, semen, the throat.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Vrishabha (Taurus) and
        Tula (Libra).
      </p>

      <p>
        <strong>Exaltation:</strong> 27° Meena (Pisces).{" "}
        <strong>Debilitation:</strong> 27° Kanya (Virgo).
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Mercury,
        Saturn. Neutral with Mars, Jupiter. Hostile with Sun,
        Moon.
      </p>

      <p>
        <strong>Day:</strong> Friday (Shukravara).{" "}
        <strong>Colour:</strong> white, light blue, pastel.{" "}
        <strong>Gem:</strong> diamond (heera).{" "}
        <strong>Metal:</strong> silver, platinum.{" "}
        <strong>Direction:</strong> south-east.{" "}
        <strong>Element:</strong> water (jala).{" "}
        <strong>Number:</strong> 6.
      </p>

      <p>
        <strong>Mythology:</strong> Shukracharya is the preceptor
        of the asuras (the &ldquo;anti-gods&rdquo;) and possessor
        of the <em>mritasanjivani vidya</em> — the knowledge to
        revive the dead. The asura-deva struggle, with Shukra
        and Brihaspati on opposite sides, structures much of
        puranic narrative.
      </p>

      <p>
        <strong>Astronomical period:</strong> sidereal year ~225
        days. Venus has the most regular retrograde cycle of
        any planet — once every 584 days for ~40 days.
      </p>

      <h2>Shani — Saturn <span lang="hi">शनि</span></h2>

      <p>
        <strong>Identity:</strong> Shani is Saturn. The name comes
        from the root <em>shanaih</em> &ldquo;slowly&rdquo; — for
        Saturn moves the slowest of all the visible grahas.
        Modern astronomy: the sixth planet from the Sun, with the
        prominent ring system.
      </p>

      <p>
        <strong>Nature:</strong> Airy, dark, tamasic, slow, cold,
        masculine.
      </p>

      <p>
        <strong>Karaka:</strong> longevity, discipline, hard
        work, patience, suffering, restriction, justice, karma,
        old age, servants, the working class, the marginalised,
        machinery, iron, oil, leather, the dead, asceticism,
        renunciation. Medically: bones, joints, teeth, the
        knees, chronic disease, anything degenerative.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Makara (Capricorn) and
        Kumbha (Aquarius).
      </p>

      <p>
        <strong>Exaltation:</strong> 20° Tula (Libra).{" "}
        <strong>Debilitation:</strong> 20° Mesha (Aries).
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Mercury,
        Venus. Neutral with Jupiter. Hostile with Sun, Moon,
        Mars.
      </p>

      <p>
        <strong>Day:</strong> Saturday (Shanivara).{" "}
        <strong>Colour:</strong> dark blue, black.{" "}
        <strong>Gem:</strong> blue sapphire (neelam).{" "}
        <strong>Metal:</strong> iron, steel.{" "}
        <strong>Direction:</strong> west.{" "}
        <strong>Element:</strong> air (vayu).{" "}
        <strong>Number:</strong> 8.
      </p>

      <p>
        <strong>Mythology:</strong> Shani is the son of Surya
        (Sun) and Chhaya (Sun&rsquo;s shadow-wife). His piercing
        gaze is said to bring suffering wherever it falls; the
        Sun himself is said to have suffered at his
        son&rsquo;s gaze. Shani is paradoxically a stern teacher
        — those who pass through Saturn&rsquo;s difficult
        periods are said to emerge with deep capacity for
        endurance and wisdom. The 7.5-year transit of Saturn
        through the Moon-rashi (and the rashis on either side
        of it) is called <em>sade sati</em>{" "}
        <span lang="hi">(साढ़े साती)</span> and is one of the
        most-discussed astrological periods.
      </p>

      <p>
        <strong>Astronomical period:</strong> sidereal year ~29.5
        years. Saturn spends about 2.5 years in each rashi —
        producing Sade Sati when it transits the rashi before,
        the same as, and the rashi after the natal Moon-rashi.
      </p>

      <h2>Rahu — the northern lunar node <span lang="hi">राहु</span></h2>

      <p>
        <strong>Identity:</strong> Rahu is one of the two
        intersection points where the Moon&rsquo;s orbit crosses
        the ecliptic — the northern (ascending) node. Unlike the
        other grahas, Rahu is not a body. It is a geometric
        point. But in classical Indian astronomy and astrology
        it is treated as a graha and given equal weight.
      </p>

      <p>
        <strong>Nature:</strong> Shadowy, tamasic, foreign,
        amplifying, intoxicating, misleading.
      </p>

      <p>
        <strong>Karaka:</strong> obsession, illusion, foreign
        influences, technology, drugs and intoxicants,
        outsiders, sudden gains, scandals, unconventional
        behaviour, eclipses, snakes, things hidden in shadow.
        In modern interpretation: the internet, electronics,
        space travel, artificial intelligence — anything
        boundary-crossing or unprecedented.
      </p>

      <p>
        <strong>Rashi rulership:</strong> Rahu does not own a
        rashi formally. Some traditions assign Rahu rulership
        of Kumbha (Aquarius) by analogy with Saturn.
      </p>

      <p>
        <strong>Exaltation:</strong> traditionally Vrishabha
        (some say Mithuna). <strong>Debilitation:</strong>{" "}
        traditionally Vrishchika (some say Dhanu). Sources
        differ.
      </p>

      <p>
        <strong>Friendships:</strong> Friendly with Saturn,
        Venus, Mercury. Hostile with Sun, Moon, Mars. (Reflects
        the eclipse mythology — Rahu &ldquo;swallows&rdquo; the
        Sun and Moon.)
      </p>

      <p>
        <strong>Day:</strong> no specific day, but Saturday
        treated as ruling day for purposes of Rahu remedy.{" "}
        <strong>Colour:</strong> dark blue, smoky.{" "}
        <strong>Gem:</strong> hessonite (gomed).{" "}
        <strong>Metal:</strong> lead. <strong>Direction:</strong>{" "}
        south-west.
      </p>

      <p>
        <strong>Mythology:</strong> Rahu was an asura who, during
        the churning of the ocean, disguised himself as a deva
        to drink the amrita (nectar of immortality). Vishnu
        beheaded him, but because the nectar had reached his
        throat he could not die — his head and body separated
        but both became immortal. The head is Rahu, the body is
        Ketu. Rahu pursues the Sun and Moon in revenge for
        their having identified him at the moment of the
        beheading; when he catches them, an eclipse occurs.
      </p>

      <p>
        <strong>Astronomical period:</strong> Rahu (and Ketu)
        complete one cycle of the zodiac in ~18.6 years,
        moving in <em>retrograde</em> (opposite direction to
        the planets) through the rashis. This means the nodal
        cycle is reverse-direction — Rahu goes from Mesha to
        Meena (not Mesha to Vrishabha as the planets do).
      </p>

      <h2>Ketu — the southern lunar node <span lang="hi">केतु</span></h2>

      <p>
        <strong>Identity:</strong> Ketu is the southern (descending)
        lunar node, exactly 180° opposite to Rahu at all times.
        Like Rahu, it is a geometric point, not a body.
      </p>

      <p>
        <strong>Nature:</strong> Shadowy, tamasic, detaching,
        spiritual, dissolving.
      </p>

      <p>
        <strong>Karaka:</strong> spirituality, moksha
        (liberation), occult knowledge, past-life karma,
        renunciation, things lost, accidents, hidden wisdom,
        introspection. Where Rahu pulls outward into
        attachment, Ketu pulls inward into detachment. In a
        sense Ketu is the photographic negative of Rahu — both
        liminal, both unconventional, but in opposite
        directions.
      </p>

      <p>
        <strong>Rashi rulership:</strong> some traditions
        assign Ketu the rulership of Vrishchika (Scorpio) by
        analogy with Mars.
      </p>

      <p>
        <strong>Exaltation:</strong> traditionally Vrishchika.{" "}
        <strong>Debilitation:</strong> traditionally Vrishabha.
        Again, sources differ.
      </p>

      <p>
        <strong>Friendships:</strong> similar pattern to Rahu —
        friendly with Saturn, Venus, Mercury; hostile with
        Sun, Moon, Mars.
      </p>

      <p>
        <strong>Colour:</strong> red-brown, smoky.{" "}
        <strong>Gem:</strong> cat&rsquo;s eye (lehsunia).{" "}
        <strong>Metal:</strong> lead, bronze.
      </p>

      <p>
        <strong>Mythology:</strong> Ketu is the body of the
        beheaded asura whose head is Rahu. The body, like the
        head, became immortal because the amrita had touched
        it. Ketu is therefore associated with the headless,
        the bodily-without-mind, the karmic remainder.
      </p>

      <p>
        <strong>Astronomical period:</strong> exactly the same
        as Rahu; they move together as a fixed pair, always
        180° apart.
      </p>

      <FigurePlaceholder
        number="8.1"
        caption="The nine grahas and their key associations."
        captionHi="नवग्रह और उनके मुख्य संबंध।"
        promptHint="See Batch 1 image #12 for the Gemini prompt."
      />

      <h2>Beneficial vs malefic grahas</h2>

      <p>
        Classical texts sort the nine grahas into two groups by
        general nature:
      </p>

      <ul>
        <li>
          <strong>Natural benefics</strong>{" "}
          <span lang="hi">(शुभ ग्रह)</span>: Jupiter, Venus, Mercury
          (when not afflicted), waxing Moon. These tend to give
          favourable results.
        </li>
        <li>
          <strong>Natural malefics</strong>{" "}
          <span lang="hi">(पाप ग्रह)</span>: Saturn, Mars, Sun,
          waning Moon, Rahu, Ketu. These tend to give
          challenging results.
        </li>
      </ul>

      <p>
        These are <em>natural</em> classifications. In a specific
        chart, the same graha can become a <em>functional</em>{" "}
        benefic or malefic depending on which houses it owns and
        occupies. A natural benefic can become functionally
        malefic for a particular ascendant; a natural malefic can
        become a yogakaraka (combiner of benefic effects). This
        functional analysis is a Book 2 topic.
      </p>

      <h2>Mahadasha — life periods ruled by grahas</h2>

      <p>
        The most consequential framework that emerges from this
        list is the <strong>Vimshottari Mahadasha</strong>{" "}
        <span lang="hi">(विंशोत्तरी महादशा)</span> — the 120-year
        cycle in which each graha rules a specific number of
        years of a person&rsquo;s life:
      </p>

      <table>
        <thead>
          <tr>
            <th>Graha</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Ketu</td><td>7</td></tr>
          <tr><td>Venus</td><td>20</td></tr>
          <tr><td>Sun</td><td>6</td></tr>
          <tr><td>Moon</td><td>10</td></tr>
          <tr><td>Mars</td><td>7</td></tr>
          <tr><td>Rahu</td><td>18</td></tr>
          <tr><td>Jupiter</td><td>16</td></tr>
          <tr><td>Saturn</td><td>19</td></tr>
          <tr><td>Mercury</td><td>17</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>120</strong></td></tr>
        </tbody>
      </table>

      <p>
        The starting graha for an individual is determined by
        the nakshatra of their natal Moon (the janma nakshatra)
        — recall the rulership cycle Ketu, Venus, Sun, Moon,
        Mars, Rahu, Jupiter, Saturn, Mercury that we mentioned
        in the nakshatra chapter. The total length of the cycle
        is 120 years, which is also the maximum natural lifespan
        in the classical Indian view. We will develop dasha
        properly in Book 2.
      </p>

      <KeyIdea
        title="Each graha is a personality, a role, and a clock."
        titleHi="हर ग्रह एक व्यक्तित्व है, एक भूमिका है, और एक काल-सूचक है"
      >
        Reading a chart well requires you to feel each graha as
        a character with a temperament — not just as a list of
        attributes. Surya is the king. Chandra is the mother.
        Mangala is the soldier. Budha is the scribe. Guru is
        the teacher. Shukra is the lover. Shani is the
        disciplinarian. Rahu is the obsessive. Ketu is the
        renunciant. Once these archetypes settle, every chart
        is a story populated by familiar figures.
      </KeyIdea>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>
          Name the nine grahas in order and identify what each is
          in modern astronomical terms.
        </li>
        <li>
          For each graha, recall its rashi rulership, exaltation,
          debilitation, day, colour, and gem.
        </li>
        <li>
          Distinguish natural benefics from natural malefics.
        </li>
        <li>
          Explain why Rahu and Ketu are grahas despite not being
          bodies.
        </li>
        <li>
          State the years assigned to each graha in the
          Vimshottari Mahadasha cycle.
        </li>
        <li>
          Read a panchang reference to a graha&rsquo;s transit
          and know which rashis the graha is moving between
          (e.g., &ldquo;Saturn enters Kumbha&rdquo;).
        </li>
      </ul>

      <p>
        Open the daily panchang. The planetary positions are
        usually shown — each graha&rsquo;s current rashi, sometimes
        with degree. Note where each graha is today. Are any of
        them in their own rashi? In their exaltation? In
        debilitation? Are any retrograde? These are the daily
        astronomical facts that your daily panchang is reporting.
      </p>

      <p>
        From here, the next chapters move from the underlying
        astronomy and mythology into the practical schedules that
        a panchang produces — time units, choghadiya, muhurta,
        and the inauspicious periods like Rahu Kaal. We have laid
        all the foundation we need.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        अब तक हम हर अध्याय में ग्रहों की बात करते आये हैं। वार का स्वामी
        ग्रह। नक्षत्र का स्वामी ग्रह। राशि का स्वामी ग्रह। हमने उन्हें
        पृष्ठभूमि के रूप में प्रयोग किया है, परन्तु उनका अपना उपचार कभी
        नहीं किया।
      </p>

      <p>
        यही अध्याय वह उपचार है। हम सभी नौ ग्रहों को इतनी गहराई से देखेंगे
        कि आप किसी शास्त्रीय सन्दर्भ में किसी ग्रह का उल्लेख देखकर समझ
        सकें कि अभिप्राय क्या है। अध्याय लंबा है। इसे एक के बाद एक नौ छोटे
        अध्यायों की तरह पढ़िए; ढाँचे के परिचय के बाद हर ग्रह-खंड स्वतंत्र
        रूप से पढ़ा जा सकता है।
      </p>

      <h2>नौ ही क्यों?</h2>

      <p>
        संस्कृत शब्द <em>ग्रह</em> का अर्थ है &ldquo;पकड़ने वाला&rdquo;
        अथवा &ldquo;ग्रहण करने वाला&rdquo; &mdash; धातु <em>ग्रह्</em> से,
        &ldquo;पकड़ना।&rdquo; ग्रहों को यह नाम इसलिए मिला, क्योंकि माना
        जाता था कि ये व्यक्ति की चेतना को पकड़ते हैं और विचार-कर्म को
        प्रभावित करते हैं। यह आधुनिक अंग्रेज़ी &ldquo;planet&rdquo; (ग्रीक{" "}
        <em>planētēs</em>, &ldquo;विचरण करने वाला&rdquo;) के समान शब्द नहीं
        है &mdash; यद्यपि दोनों शब्द उन्हीं आकाशीय पिंडों का वर्णन करते
        हैं, और दोनों प्रत्यक्ष-दृष्टि-गति के लिए एक रूपक हैं।
      </p>

      <p>शास्त्रीय सूची है <em>नवग्रह</em> &mdash; नौ ग्रह —</p>

      <ol>
        <li><strong>सूर्य</strong></li>
        <li><strong>चन्द्र</strong></li>
        <li><strong>मंगल</strong></li>
        <li><strong>बुध</strong></li>
        <li><strong>गुरु / बृहस्पति</strong></li>
        <li><strong>शुक्र</strong></li>
        <li><strong>शनि</strong></li>
        <li><strong>राहु</strong> &mdash; उत्तर चन्द्र-पात</li>
        <li><strong>केतु</strong> &mdash; दक्षिण चन्द्र-पात</li>
      </ol>

      <p>
        ध्यान दीजिए, इस सूची में क्या है और क्या नहीं। सूर्य और चन्द्रमा
        ग्रह हैं &mdash; यद्यपि आधुनिक खगोल विज्ञान में सूर्य एक तारा है
        और चन्द्र पृथ्वी का उपग्रह, दोनों में से कोई तकनीकी रूप से ग्रह
        नहीं। राहु और केतु ग्रह हैं &mdash; यद्यपि वे पिंड ही नहीं, केवल
        वे दो प्रतिच्छेदन-बिन्दु हैं जहाँ चन्द्रमा की कक्षा क्रान्तिवृत्त
        को काटती है। और स्पष्ट रूप से अनुपस्थित हैं अरुण, वरुण और प्लूटो।
        ये प्राचीन जगत् को ज्ञात नहीं थे, क्योंकि वे नंगी आँख से नहीं
        दिखते। वे पारम्परिक नवग्रह में नहीं हैं।
      </p>

      <p>
        कुछ आधुनिक वैदिक ज्योतिषियों ने अरुण, वरुण और प्लूटो को शास्त्रीय
        नवग्रह में जोड़ने का प्रस्ताव दिया है। यह विवादित है। शास्त्रीय
        ग्रंथ और सम्पूर्ण पारम्परिक अनुष्ठानिक व्यवहार नौ का ही प्रयोग
        करते हैं, और हम भी।
      </p>

      <h2>ढाँचा &mdash; प्रत्येक ग्रह की प्रविष्टि कैसे पढ़ें</h2>

      <p>हर ग्रह के लिए हम लिखेंगे —</p>

      <ul>
        <li>
          <strong>परिचय</strong> &mdash; संस्कृत नाम, अन्य नाम, और आधुनिक
          खगोल विज्ञान में पिंड क्या है।
        </li>
        <li>
          <strong>स्वभाव</strong> &mdash; परम्परा इस ग्रह से किस प्रकार
          की शक्ति को जोड़ती है।
        </li>
        <li>
          <strong>कारक</strong> &mdash; जीवन के वे क्षेत्र जिनका यह
          ग्रह सूचक है।
        </li>
        <li>
          <strong>राशि-स्वामित्व</strong>।
        </li>
        <li>
          <strong>उच्च और नीच</strong> &mdash; जिस राशि और अंश पर ग्रह
          प्रबलतम है, और जहाँ निर्बलतम।
        </li>
        <li>
          <strong>मैत्री</strong> &mdash; अन्य ग्रहों के साथ मित्रता,
          तटस्थता, अथवा शत्रुता।
        </li>
        <li>
          <strong>दिन, रंग, रत्न, धातु, दिशा</strong> &mdash; अनुष्ठानिक
          संगतियाँ।
        </li>
        <li>
          <strong>पौराणिक परिचय</strong> &mdash; ग्रह से जुड़ा देव और
          प्रमुख कथा-धारा।
        </li>
      </ul>

      <h2>सूर्य</h2>

      <p>
        <strong>परिचय:</strong> सूर्य। अन्य नाम: रवि, भानु, आदित्य, भास्कर,
        पूषन्। आधुनिक खगोल विज्ञान: हमारे सौर मण्डल के केन्द्र का तारा।
      </p>
      <p>
        <strong>स्वभाव:</strong> राजसी, अग्नि-तत्त्वीय, पुं, सात्त्विक
        (स्पष्टता और साधुता का गुण), अधिकारी।
      </p>
      <p>
        <strong>कारक:</strong> आत्मा, स्व, पिता, ओज, नेतृत्व, मेरुदण्ड,
        हृदय, सरकार, राजा, अहं, कीर्ति, विधिसम्मत अधिकार। चिकित्सा-ज्योतिष
        में सूर्य हृदय और नेत्र (विशेषतः पुरुषों में दायाँ, स्त्रियों में
        बायाँ) को शासित करता है।
      </p>
      <p><strong>राशि-स्वामित्व:</strong> केवल सिंह।</p>
      <p>
        <strong>उच्च:</strong> मेष 10°। <strong>नीच:</strong> तुला 10°।
        सूर्य वसन्त की अग्नि-राशि में प्रबलतम और उसके सामने वायु-राशि में
        निर्बलतम।
      </p>
      <p>
        <strong>मैत्री:</strong> चन्द्र, मंगल, गुरु से मित्र। बुध तटस्थ।
        शुक्र, शनि, राहु, केतु से शत्रु।
      </p>
      <p>
        <strong>दिन:</strong> रविवार। <strong>रंग:</strong> लाल, ताम्र,
        केसरिया। <strong>रत्न:</strong> माणिक्य। <strong>धातु:</strong>{" "}
        ताम्र, स्वर्ण। <strong>दिशा:</strong> पूर्व।{" "}
        <strong>तत्त्व:</strong> अग्नि।{" "}
        <strong>संख्या:</strong> 1।
      </p>
      <p>
        <strong>पौराणिक:</strong> सूर्य प्रमुख वैदिक देवों में से एक हैं,
        जो सात अश्वों से खींचे जाने वाले रथ पर आकाश को पार करते हैं (सात
        वार, अथवा वर्णक्रम के सात रंग)। वे यम (मृत्यु), यमुना, कर्ण,
        शनि और अश्विन-कुमारों के पिता हैं। <em>रामायण</em> का{" "}
        <em>आदित्य हृदय स्तोत्र</em> सूर्य की प्रमुख प्रशस्ति है, जिसका
        पाठ सूर्योदय पर होता है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> प्रत्यक्ष वार्षिक गति 360° / वर्ष ≈
        1° प्रति दिन। सूर्य प्रत्येक राशि में लगभग 30 दिन रहता है।
      </p>

      <h2>चन्द्र</h2>

      <p>
        <strong>परिचय:</strong> चन्द्र। अन्य नाम: सोम, इन्दु, शशि,
        मृगांक। आधुनिक खगोल विज्ञान: पृथ्वी का प्राकृतिक उपग्रह।
      </p>
      <p>
        <strong>स्वभाव:</strong> जलीय, स्त्री, सात्त्विक, शीतल, ग्राही,
        परिवर्तनशील।
      </p>
      <p>
        <strong>कारक:</strong> मन, भावनाएँ, माता, स्त्री-उर्वरता, जल और
        तरल, जन-समूह, स्मृति, स्वाद, शान्ति, सुख, दुग्ध, पेय। चिकित्सा में
        फेफड़े, स्तन, आमाशय और पाचन-तरल, सामान्य शरीर-तरल, और पुरुषों में
        बायाँ नेत्र / स्त्रियों में दायाँ।
      </p>
      <p><strong>राशि-स्वामित्व:</strong> केवल कर्क।</p>
      <p>
        <strong>उच्च:</strong> वृषभ 3°। <strong>नीच:</strong> वृश्चिक 3°।
      </p>
      <p>
        <strong>मैत्री:</strong> सूर्य, बुध से मित्र। मंगल, गुरु, शुक्र,
        शनि तटस्थ। राहु, केतु से शत्रु (क्योंकि राहु-केतु ग्रहण-बिन्दु हैं,
        जो चन्द्र को &ldquo;निगलते&rdquo; हैं)।
      </p>
      <p>
        <strong>दिन:</strong> सोमवार। <strong>रंग:</strong> श्वेत, रजत,
        फीका। <strong>रत्न:</strong> मोती। <strong>धातु:</strong> रजत।{" "}
        <strong>दिशा:</strong> उत्तर-पश्चिम। <strong>तत्त्व:</strong> जल।{" "}
        <strong>संख्या:</strong> 2।
      </p>
      <p>
        <strong>पौराणिक:</strong> चन्द्र वह देव हैं जिनकी 27 पत्नियाँ
        बतायी गयी हैं &mdash; दक्ष की पुत्रियाँ, 27 नक्षत्र &mdash; परन्तु
        जिन्होंने रोहिणी को विशेष स्नेह दिया, जिससे दक्ष का शाप मिला और
        चन्द्र को कलाओं में बढ़ना-घटना पड़ा। सोम वह वैदिक पवित्र पौधा भी
        है जिससे अमरता का रस निकाला जाता था; पौधे, पेय और चन्द्र का यह
        सम्मिश्रण भारतीय चिन्तन के सबसे प्राचीन सम्बन्धों में से एक है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> नाक्षत्र मास 27.32 दिन। चन्द्र
        औसतन एक नक्षत्र (~13°20') प्रति दिन पार करता है &mdash; यद्यपि
        यह झूलता रहता है।
      </p>

      <h2>मंगल</h2>

      <p>
        <strong>परिचय:</strong> मंगल। अन्य नाम: भौम, कुज, अंगारक। आधुनिक
        खगोल विज्ञान: सूर्य से चौथा ग्रह।
      </p>
      <p>
        <strong>स्वभाव:</strong> अग्नि-तत्त्वीय, पुं, तामसिक (जड़ता और
        बल का गुण), तीक्ष्ण, ऊर्जावान, उष्ण।
      </p>
      <p>
        <strong>कारक:</strong> ऊर्जा, साहस, संकल्प, क्रोध, भाई-बहन
        (विशेषकर छोटे भाई), योद्धा, सैनिक, शल्य-चिकित्सक, अभियन्ता,
        खिलाड़ी, रक्त, पेशियाँ, लाल वस्तुएँ, शस्त्र, दुर्घटना, शल्यक्रिया,
        भूमि-सम्पत्ति। मंगल कुछ परम्पराओं में विवाह का कारक भी है &mdash;
        यदि पीड़ित हो तो व्यक्ति <em>मांगलिक</em> कहलाता है, और विवाह में
        मेलापक की सावधानी आवश्यक होती है।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> मेष और वृश्चिक।
      </p>
      <p>
        <strong>उच्च:</strong> मकर 28°। <strong>नीच:</strong> कर्क 28°।
      </p>
      <p>
        <strong>मैत्री:</strong> सूर्य, चन्द्र, गुरु से मित्र। शुक्र, शनि
        तटस्थ। बुध से शत्रु (और कुछ सूचियों में राहु, केतु)।
      </p>
      <p>
        <strong>दिन:</strong> मंगलवार। <strong>रंग:</strong> लाल।{" "}
        <strong>रत्न:</strong> मूँगा। <strong>धातु:</strong> ताम्र।{" "}
        <strong>दिशा:</strong> दक्षिण। <strong>तत्त्व:</strong> अग्नि।{" "}
        <strong>संख्या:</strong> 9।
      </p>
      <p>
        <strong>पौराणिक:</strong> मंगल युद्ध के देव हैं, जिन्हें प्रायः
        कार्तिकेय / स्कन्द / सुब्रह्मण्य से एकीकृत किया जाता है। उन्हें
        भौम (&ldquo;पृथ्वी से जन्मा&rdquo;) भी कहते हैं, क्योंकि एक कथा
        में शिव के स्वेद-बिन्दु के पृथ्वी पर गिरने से उनका जन्म हुआ।
        हनुमान को मंगल की पीड़ा से रक्षा करने वाला माना जाता है, और
        मंगलवार को उनकी विशेष पूजा होती है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> नाक्षत्र वर्ष 687 दिन। मंगल हर
        ~26 मास में लगभग 60–80 दिन वक्री होता है।
      </p>

      <h2>बुध</h2>

      <p>
        <strong>परिचय:</strong> बुध। संस्कृत नाम का मूल वही है जो{" "}
        <em>बुद्धि</em> और बुद्ध (&ldquo;जागे हुए&rdquo;) का &mdash;
        यद्यपि देव बुध और बुद्ध भिन्न हैं।
      </p>
      <p>
        <strong>स्वभाव:</strong> मिश्रित पृथ्वी-वायु, तटस्थ-लिंग, राजसिक-
        सत्त्व-मिश्रित, तीव्र, संवादात्मक, अनुकूलनशील। बुध अपने सहचर
        ग्रहों के गुण ग्रहण कर लेता है &mdash; ग्रहों में सर्वाधिक
        &ldquo;प्रभावित होने वाला&rdquo;।
      </p>
      <p>
        <strong>कारक:</strong> बुद्धि, वाणी, संवाद, वाणिज्य, लेखन, लेखा,
        विद्या, हास्य, किशोर और युवा, चचेरे भाई, समकक्ष मित्र, व्यापारी,
        गणितज्ञ, प्रोग्रामर, पत्रकार, अनुवादक। चिकित्सा में: स्नायु-तंत्र,
        त्वचा, स्वर, वाणी से सम्बन्धित अंग।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> मिथुन और कन्या।
      </p>
      <p>
        <strong>उच्च:</strong> कन्या 15° &mdash; बुध इस दृष्टि से अनूठा
        है कि अपनी ही राशि में उच्च होता है। <strong>नीच:</strong> मीन
        15°।
      </p>
      <p>
        <strong>मैत्री:</strong> सूर्य, शुक्र से मित्र। मंगल, गुरु, शनि
        तटस्थ। चन्द्र से शत्रु (क्योंकि सबसे प्रसिद्ध कथा में चन्द्र, बुध
        की माता तारा से जुड़े हैं)।
      </p>
      <p>
        <strong>दिन:</strong> बुधवार। <strong>रंग:</strong> हरा।{" "}
        <strong>रत्न:</strong> पन्ना। <strong>धातु:</strong> पीतल, काँस्य।
        <strong>दिशा:</strong> उत्तर। <strong>तत्त्व:</strong> पृथ्वी।{" "}
        <strong>संख्या:</strong> 5।
      </p>
      <p>
        <strong>पौराणिक:</strong> बुध की उत्पत्ति-कथा पुराण-साहित्य की
        सबसे नाटकीय में से एक है। बृहस्पति (गुरु) की पत्नी तारा का अपहरण
        चन्द्र ने किया। उनसे जन्मा बच्चा बुध था &mdash; जो जैविक पिता
        (चन्द्र) और गोद-पिता (गुरु) के मध्य के संघर्ष में पैदा हुआ। यह
        कथा बुध की अनुकूलनशीलता और द्विमुखी स्वभाव को पकड़ती है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> नाक्षत्र वर्ष 88 दिन। बुध वर्ष में
        तीन बार वक्री होता है, हर बार लगभग 24 दिन &mdash; किसी भी ग्रह
        का सबसे अधिक बार वक्र, जिसे लोकप्रिय &ldquo;मर्क्यूरी रेट्रोग्रेड&rdquo;
        कहा जाता है।
      </p>

      <h2>गुरु / बृहस्पति</h2>

      <p>
        <strong>परिचय:</strong> गुरु, बृहस्पति। <em>गुरु</em> का अर्थ है
        &ldquo;भारी, गम्भीर&rdquo; (और &ldquo;शिक्षक&rdquo; भी)।{" "}
        <em>बृहस्पति</em> का अर्थ है &ldquo;प्रार्थना का स्वामी।&rdquo;
        दोनों नाम एक ही पिंड के लिए। आधुनिक खगोल विज्ञान: सौर मण्डल का
        सबसे बड़ा ग्रह।
      </p>
      <p>
        <strong>स्वभाव:</strong> सात्त्विक, पुं, विस्तारशील, उदार, ज्ञानी।
        सब ग्रहों में सबसे शुभ माना जाता है।
      </p>
      <p>
        <strong>कारक:</strong> ज्ञान, विद्या, धर्म, गुरु, शिक्षक, धर्म,
        दर्शन, विधि, न्यायाधीश, पुरोहित, सन्तान (विशेष पहली), स्त्री की
        कुण्डली में पति, धन और भाग्य, स्वर्ण, विस्तार, समृद्धि,
        आशावादिता। चिकित्सा: यकृत, मेद, अग्न्याशय।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> धनु और मीन।
      </p>
      <p>
        <strong>उच्च:</strong> कर्क 5°। <strong>नीच:</strong> मकर 5°।
      </p>
      <p>
        <strong>मैत्री:</strong> सूर्य, चन्द्र, मंगल से मित्र। शनि तटस्थ।
        बुध, शुक्र से शत्रु।
      </p>
      <p>
        <strong>दिन:</strong> गुरुवार। <strong>रंग:</strong> पीला, स्वर्ण।{" "}
        <strong>रत्न:</strong> पुखराज। <strong>धातु:</strong> स्वर्ण।{" "}
        <strong>दिशा:</strong> उत्तर-पूर्व। <strong>तत्त्व:</strong> आकाश।{" "}
        <strong>संख्या:</strong> 3।
      </p>
      <p>
        <strong>पौराणिक:</strong> बृहस्पति देवों के गुरु हैं &mdash;
        देव-पुरोहित &mdash; जो असुरों के गुरु शुक्र के समकक्ष हैं।
        बृहस्पति और शुक्र की द्वन्द्वात्मक गतिकी पुराण-साहित्य में
        बार-बार आती है, जो प्रत्येक के सिद्धान्तों के बीच के तनाव का
        प्रतिनिधित्व करती है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> नाक्षत्र वर्ष ~12 वर्ष। गुरु प्रति
        राशि लगभग 1 वर्ष व्यतीत करता है &mdash; जिससे गुरु की संक्रान्ति
        सबसे अधिक चर्चित वार्षिक खगोलीय घटनाओं में से एक है।
      </p>

      <h2>शुक्र</h2>

      <p>
        <strong>परिचय:</strong> शुक्र। नाम धातु से आता है &ldquo;चमकीला,
        श्वेत, उज्ज्वल।&rdquo; आधुनिक खगोल विज्ञान: सूर्य से दूसरा ग्रह,
        चन्द्र के बाद रात्रि-आकाश का सबसे चमकीला प्राकृतिक पिंड।
      </p>
      <p>
        <strong>स्वभाव:</strong> जलीय, स्त्री, सात्त्विक-स्वर के साथ
        राजसिक, ऐन्द्रिक, सौम्य, परिष्कृत।
      </p>
      <p>
        <strong>कारक:</strong> प्रेम, विवाह, प्रणय, पुरुष की कुण्डली में
        पत्नी, सौन्दर्य, कला, संगीत, नृत्य, काव्य, विलास, वाहन, आभूषण,
        सुगन्ध, यौनिकता, स्त्री-संग, मद्य, मिष्टान्न, सुख। चिकित्सा:
        प्रजनन-तंत्र, गुर्दे, वीर्य, कण्ठ।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> वृषभ और तुला।
      </p>
      <p>
        <strong>उच्च:</strong> मीन 27°। <strong>नीच:</strong> कन्या 27°।
      </p>
      <p>
        <strong>मैत्री:</strong> बुध, शनि से मित्र। मंगल, गुरु तटस्थ।
        सूर्य, चन्द्र से शत्रु।
      </p>
      <p>
        <strong>दिन:</strong> शुक्रवार। <strong>रंग:</strong> श्वेत, हल्के
        नीले, पस्तेल। <strong>रत्न:</strong> हीरा।{" "}
        <strong>धातु:</strong> रजत, प्लेटिनम। <strong>दिशा:</strong>{" "}
        दक्षिण-पूर्व। <strong>तत्त्व:</strong> जल।{" "}
        <strong>संख्या:</strong> 6।
      </p>
      <p>
        <strong>पौराणिक:</strong> शुक्राचार्य असुरों के गुरु हैं और{" "}
        <em>मृतसंजीवनी विद्या</em> के स्वामी &mdash; मृतकों को पुनर्जीवित
        करने का ज्ञान। शुक्र और बृहस्पति के विपरीत पक्षों पर असुर-देव
        संघर्ष पुराण-कथा का बहुत-कुछ ढाँचा है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> नाक्षत्र वर्ष ~225 दिन। शुक्र की
        वक्री-अवधि सबसे नियमित होती है &mdash; प्रति 584 दिन में एक बार,
        लगभग 40 दिन के लिए।
      </p>

      <h2>शनि</h2>

      <p>
        <strong>परिचय:</strong> शनि। नाम <em>शनैः</em>{" "}
        (&ldquo;धीरे-धीरे&rdquo;) से आता है &mdash; क्योंकि शनि सब दृश्य
        ग्रहों में सबसे धीमा चलता है। आधुनिक खगोल विज्ञान: सूर्य से
        छठा ग्रह, सुप्रसिद्ध वलय-तंत्र वाला।
      </p>
      <p>
        <strong>स्वभाव:</strong> वायवीय, श्याम, तामसिक, धीमा, शीतल, पुं।
      </p>
      <p>
        <strong>कारक:</strong> आयु, अनुशासन, परिश्रम, धैर्य, कष्ट,
        प्रतिबन्ध, न्याय, कर्म, वृद्धावस्था, सेवक, श्रमिक-वर्ग,
        उपेक्षित जन, मशीनें, लोह, तेल, चर्म, मृतक, संन्यास, त्याग।
        चिकित्सा: अस्थि, सन्धि, दाँत, घुटने, चिरकारी रोग, कोई भी
        अपक्षयी।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> मकर और कुम्भ।
      </p>
      <p>
        <strong>उच्च:</strong> तुला 20°। <strong>नीच:</strong> मेष 20°।
      </p>
      <p>
        <strong>मैत्री:</strong> बुध, शुक्र से मित्र। गुरु तटस्थ।
        सूर्य, चन्द्र, मंगल से शत्रु।
      </p>
      <p>
        <strong>दिन:</strong> शनिवार। <strong>रंग:</strong> गहरा नीला,
        काला। <strong>रत्न:</strong> नीलम। <strong>धातु:</strong> लोह,
        इस्पात। <strong>दिशा:</strong> पश्चिम। <strong>तत्त्व:</strong>{" "}
        वायु। <strong>संख्या:</strong> 8।
      </p>
      <p>
        <strong>पौराणिक:</strong> शनि सूर्य और छाया (सूर्य की छाया-पत्नी)
        के पुत्र हैं। उनकी तीक्ष्ण दृष्टि जहाँ पड़े वहाँ कष्ट लाती है;
        स्वयं सूर्य भी अपने पुत्र की दृष्टि से पीड़ित बताए गये हैं। शनि
        विरोधाभासी रूप से कठोर शिक्षक हैं &mdash; जो शनि के कठिन काल
        से होकर निकलते हैं, वे गहरी सहनशीलता और बुद्धि के सामर्थ्य के
        साथ आगे आते हैं। चन्द्र-राशि में और उसके दोनों ओर की राशियों
        में शनि की 7.5 वर्ष की पारगति को{" "}
        <em>साढ़े साती</em> कहते हैं, जो सबसे अधिक चर्चित ज्योतिषीय
        अवधियों में से एक है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> नाक्षत्र वर्ष ~29.5 वर्ष। शनि
        प्रत्येक राशि में लगभग 2.5 वर्ष व्यतीत करता है &mdash; और जब
        वह जन्म-कालीन चन्द्र-राशि से पहले की, उसी, और अगली राशि से होकर
        जाता है, तब साढ़े साती बनती है।
      </p>

      <h2>राहु</h2>

      <p>
        <strong>परिचय:</strong> राहु वह दो प्रतिच्छेदन-बिन्दुओं में से
        एक है जहाँ चन्द्र-कक्षा क्रान्तिवृत्त को काटती है &mdash; उत्तरी
        (आरोही) पात। अन्य ग्रहों की तरह राहु पिंड नहीं है। वह एक ज्यामितीय
        बिन्दु है। परन्तु शास्त्रीय भारतीय खगोल विज्ञान और ज्योतिष में
        उसे ग्रह माना जाता है और बराबर भार दिया जाता है।
      </p>
      <p>
        <strong>स्वभाव:</strong> छाया-तुल्य, तामसिक, विदेशी, बढ़ाने वाला,
        भ्रामक, दिग्भ्रमित करने वाला।
      </p>
      <p>
        <strong>कारक:</strong> ग्रस्ति, माया, विदेशी प्रभाव, तकनीक, मद्य
        और नशीले पदार्थ, बाहरी जन, अकस्मात् लाभ, घोटाले, अपरम्परागत
        आचरण, ग्रहण, सर्प, छाया में छिपी वस्तुएँ। आधुनिक व्याख्या में:
        अंतर्जाल, इलेक्ट्रॉनिकी, अंतरिक्ष-यात्रा, कृत्रिम बुद्धिमत्ता
        &mdash; ऐसी कोई भी वस्तु जो सीमा-पार अथवा अभूतपूर्व हो।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> राहु को औपचारिक रूप से कोई राशि-
        स्वामित्व प्राप्त नहीं है। कुछ परम्पराएँ शनि के साथ समानता से
        राहु को कुम्भ का स्वामित्व देती हैं।
      </p>
      <p>
        <strong>उच्च:</strong> पारम्परिक रूप से वृषभ (कुछ कहते हैं
        मिथुन)। <strong>नीच:</strong> पारम्परिक रूप से वृश्चिक (कुछ कहते
        हैं धनु)। स्रोत भिन्न-भिन्न।
      </p>
      <p>
        <strong>मैत्री:</strong> शनि, शुक्र, बुध से मित्र। सूर्य, चन्द्र,
        मंगल से शत्रु। (ग्रहण-कथा का प्रतिबिम्ब &mdash; राहु सूर्य-चन्द्र
        को &ldquo;निगलता&rdquo; है।)
      </p>
      <p>
        <strong>दिन:</strong> कोई विशिष्ट नहीं, परन्तु शनिवार राहु के
        उपायों के लिए शासित दिन। <strong>रंग:</strong> गहरा नीला, धुएँ-
        जैसा। <strong>रत्न:</strong> गोमेद।{" "}
        <strong>धातु:</strong> सीसा। <strong>दिशा:</strong> दक्षिण-
        पश्चिम।
      </p>
      <p>
        <strong>पौराणिक:</strong> राहु एक असुर थे, जिन्होंने समुद्र-मन्थन
        के समय देव का वेश धरकर अमृत पीना चाहा। विष्णु ने उनका सिर काट
        दिया, परन्तु अमृत कण्ठ तक पहुँच चुका था, अतः मृत्यु नहीं हुई
        &mdash; सिर और धड़ अलग हो गये, परन्तु दोनों अमर। सिर है राहु,
        धड़ है केतु। राहु सूर्य-चन्द्र से वैर रखता है (क्योंकि उन्होंने
        ही उसकी पहचान करा दी थी); जब वह उन्हें पकड़ता है, तब ग्रहण होता
        है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> राहु (और केतु) ~18.6 वर्षों में
        राशि-चक्र का एक पूरा चक्र पूरा करते हैं, और राशियों में{" "}
        <em>वक्री</em> (ग्रहों के विपरीत दिशा में) चलते हैं। अर्थात्
        नोडल चक्र विपरीत-दिशा का है &mdash; राहु मेष से मीन की ओर जाता है
        (मेष से वृषभ की ओर नहीं, जैसा ग्रह जाते हैं)।
      </p>

      <h2>केतु</h2>

      <p>
        <strong>परिचय:</strong> केतु दक्षिणी (अवरोही) चन्द्र-पात है, और
        सदा राहु के ठीक 180° सामने रहता है। राहु की तरह यह भी ज्यामितीय
        बिन्दु है, पिंड नहीं।
      </p>
      <p>
        <strong>स्वभाव:</strong> छाया-तुल्य, तामसिक, विरक्त-कर्ता,
        आध्यात्मिक, विघटनशील।
      </p>
      <p>
        <strong>कारक:</strong> अध्यात्म, मोक्ष, गूढ़ ज्ञान, पूर्व-जन्मों
        का कर्म, संन्यास, खोयी वस्तुएँ, दुर्घटना, छिपा ज्ञान, अंतर्मुखता।
        जहाँ राहु बाहर की ओर आसक्ति में खींचता है, वहाँ केतु भीतर की ओर
        विरक्ति में। एक अर्थ में केतु राहु का छाया-निषेधी है &mdash; दोनों
        सीमा-स्थानीय, दोनों अपरम्परागत, परन्तु विपरीत दिशाओं में।
      </p>
      <p>
        <strong>राशि-स्वामित्व:</strong> कुछ परम्पराएँ मंगल के साथ
        समानता से केतु को वृश्चिक का स्वामित्व देती हैं।
      </p>
      <p>
        <strong>उच्च:</strong> पारम्परिक रूप से वृश्चिक।{" "}
        <strong>नीच:</strong> पारम्परिक रूप से वृषभ। फिर, स्रोत भिन्न।
      </p>
      <p>
        <strong>मैत्री:</strong> राहु के समान &mdash; शनि, शुक्र, बुध से
        मित्र; सूर्य, चन्द्र, मंगल से शत्रु।
      </p>
      <p>
        <strong>रंग:</strong> लाल-भूरा, धुएँ-जैसा।{" "}
        <strong>रत्न:</strong> लहसुनिया।{" "}
        <strong>धातु:</strong> सीसा, काँस्य।
      </p>
      <p>
        <strong>पौराणिक:</strong> केतु उस सिर-कटे असुर का धड़ है जिसका
        सिर राहु है। धड़ भी सिर के समान अमर हो गया, क्योंकि अमृत उसे
        स्पर्श कर चुका था। केतु इस प्रकार बिना-सिर के, बिना-मन के शरीर
        का, और कर्म-शेष का प्रतीक है।
      </p>
      <p>
        <strong>खगोलीय अवधि:</strong> राहु के समान ही; वे एक स्थिर
        जोड़े के रूप में चलते हैं, सदा 180° का अंतर रखते हुए।
      </p>

      <FigurePlaceholder
        number="8.1"
        caption="The nine grahas and their key associations."
        captionHi="नवग्रह और उनके मुख्य संबंध।"
        promptHint="See Batch 1 image #12 for the Gemini prompt."
      />

      <h2>शुभ बनाम पाप ग्रह</h2>

      <p>
        शास्त्रीय ग्रंथ नौ ग्रहों को सामान्य स्वभाव से दो वर्गों में
        बाँटते हैं —
      </p>

      <ul>
        <li>
          <strong>स्वाभाविक शुभ ग्रह</strong>: गुरु, शुक्र, बुध (जब
          अप्रभावित), बढ़ता हुआ चन्द्र। ये अनुकूल फल देने की प्रवृत्ति
          रखते हैं।
        </li>
        <li>
          <strong>स्वाभाविक पाप ग्रह</strong>: शनि, मंगल, सूर्य, घटता
          हुआ चन्द्र, राहु, केतु। ये चुनौतीपूर्ण फल देने की प्रवृत्ति
          रखते हैं।
        </li>
      </ul>

      <p>
        ये <em>स्वाभाविक</em> वर्गीकरण हैं। किसी विशिष्ट कुण्डली में वही
        ग्रह जिस भाव का स्वामित्व रखे और जिस भाव में बैठे, उसके अनुसार
        <em>कार्यात्मक</em> शुभ या पाप बन सकता है। एक स्वाभाविक शुभ ग्रह
        किसी विशिष्ट लग्न के लिए कार्यात्मक रूप से पाप बन सकता है; एक
        स्वाभाविक पाप ग्रह योगकारक (शुभ-संयोजक) बन सकता है। यह कार्यात्मक
        विश्लेषण पुस्तक 2 का विषय है।
      </p>

      <h2>महादशा &mdash; ग्रहों से शासित जीवन-अवधियाँ</h2>

      <p>
        इस सूची से जो सबसे महत्त्वपूर्ण ढाँचा निकलता है वह है{" "}
        <strong>विंशोत्तरी महादशा</strong> &mdash; 120-वर्षीय चक्र, जिसमें
        प्रत्येक ग्रह जीवन के एक विशिष्ट संख्या के वर्षों का स्वामी होता
        है —
      </p>

      <table>
        <thead>
          <tr>
            <th>ग्रह</th>
            <th>वर्ष</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>केतु</td><td>7</td></tr>
          <tr><td>शुक्र</td><td>20</td></tr>
          <tr><td>सूर्य</td><td>6</td></tr>
          <tr><td>चन्द्र</td><td>10</td></tr>
          <tr><td>मंगल</td><td>7</td></tr>
          <tr><td>राहु</td><td>18</td></tr>
          <tr><td>गुरु</td><td>16</td></tr>
          <tr><td>शनि</td><td>19</td></tr>
          <tr><td>बुध</td><td>17</td></tr>
          <tr><td><strong>कुल</strong></td><td><strong>120</strong></td></tr>
        </tbody>
      </table>

      <p>
        किसी जातक के लिए प्रारम्भ-ग्रह जन्म के समय चन्द्र के नक्षत्र
        (जन्म-नक्षत्र) से निर्धारित होता है &mdash; नक्षत्र-अध्याय में
        उल्लिखित केतु, शुक्र, सूर्य, चन्द्र, मंगल, राहु, गुरु, शनि, बुध
        का स्वामित्व-चक्र स्मरण कीजिए। पूरी अवधि 120 वर्ष है, जो
        शास्त्रीय भारतीय दृष्टि में अधिकतम स्वाभाविक आयु भी है। दशा को
        हम पुस्तक 2 में ठीक से विकसित करेंगे।
      </p>

      <KeyIdea
        title="हर ग्रह एक व्यक्तित्व है, एक भूमिका है, और एक काल-सूचक है"
        titleHi="Each graha is a personality, a role, and a clock."
      >
        अच्छी कुण्डली पढ़ने के लिए हर ग्रह को विशेषताओं की सूची नहीं,
        अपितु एक व्यक्तित्व-स्वरूप के रूप में अनुभव करना आवश्यक है।
        सूर्य राजा है। चन्द्र माता है। मंगल सैनिक। बुध लेखक। गुरु
        शिक्षक। शुक्र प्रेमी। शनि अनुशासक। राहु आसक्ति-ग्रस्त। केतु
        विरक्त। एक बार ये पात्र मन में बैठ जायें, तो हर कुण्डली एक कथा
        बन जाती है जिसके पात्र परिचित हैं।
      </KeyIdea>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>
          नौ ग्रहों के क्रम में नाम बता सकें और प्रत्येक आधुनिक खगोलीय
          दृष्टिकोण से क्या है, यह पहचान सकें।
        </li>
        <li>
          हर ग्रह की राशि-स्वामित्व, उच्च, नीच, दिन, रंग और रत्न स्मरण
          कर सकें।
        </li>
        <li>स्वाभाविक शुभ और पाप ग्रहों में भेद कर सकें।</li>
        <li>
          राहु और केतु पिंड न होते हुए भी ग्रह क्यों कहलाते हैं, समझा
          सकें।
        </li>
        <li>
          विंशोत्तरी महादशा चक्र में हर ग्रह को आबंटित वर्ष बता सकें।
        </li>
        <li>
          पंचांग में किसी ग्रह की संक्रान्ति का सन्दर्भ पढ़कर समझ सकें कि
          वह किन राशियों के बीच चल रहा है (जैसे &ldquo;शनि कुम्भ में
          प्रवेश&rdquo;)।
        </li>
      </ul>

      <p>
        दैनिक पंचांग खोलिए। ग्रह-स्थितियाँ सामान्यतः दिखती हैं &mdash;
        प्रत्येक ग्रह की वर्तमान राशि, कभी-कभी अंश के साथ। आज प्रत्येक
        ग्रह कहाँ है, ध्यान दीजिए। क्या कोई अपनी ही राशि में है? अपने
        उच्च में? अपने नीच में? कोई वक्री है? ये वही दैनिक खगोलीय तथ्य
        हैं जिन्हें आपका दैनिक पंचांग रिपोर्ट कर रहा है।
      </p>

      <p>
        आगे के अध्यायों में हम मूल खगोल विज्ञान और पुराण-कथा से व्यावहारिक
        समय-सारणियों की ओर बढ़ते हैं &mdash; काल-इकाइयाँ, चौघड़िया,
        मुहूर्त, और राहु काल जैसी अशुभ अवधियाँ। पूरी आधार-शिला अब हमारे
        पास है।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

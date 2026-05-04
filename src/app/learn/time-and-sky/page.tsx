import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("time-and-sky")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        Before we can talk about tithi or nakshatra or any of the five limbs,
        we have to talk about something simpler — something so simple we
        normally do not think about it. <strong>What is a day?</strong>
      </p>

      <p>
        You probably want to answer &ldquo;24 hours.&rdquo; That is true,
        and it is also incomplete. There are at least three different
        things in the sky that we use to measure a &ldquo;day,&rdquo; and
        they do not agree with each other exactly. There are also two
        different things called a &ldquo;year&rdquo; in Indian astronomy,
        and they too do not agree exactly. The Indian calendar uses several
        of these definitions at different points, which is one of the
        reasons it can feel complicated. Untangling them is the entire
        purpose of this chapter, and once they are untangled, everything
        afterwards becomes much easier.
      </p>

      <h2>The three motions you need to remember</h2>

      <p>
        Stand outside on a clear day. Three things are happening that are
        relevant to us, even though you cannot feel any of them.
      </p>

      <ol>
        <li>
          <strong>Earth is spinning on its own axis.</strong> One full spin
          takes about 24 hours. This is what makes the Sun appear to rise
          and set, and it is the basis of the civil day.
        </li>
        <li>
          <strong>Earth is orbiting the Sun.</strong> One full orbit takes
          about 365.25 days. This is what gives us a year, and what makes
          the Sun appear to move slowly through different background stars
          over the course of the year. This apparent annual path of the Sun
          is called the <em>ecliptic</em> <span lang="hi">(क्रान्तिवृत्त)</span>.
        </li>
        <li>
          <strong>The Moon is orbiting the Earth.</strong> One full orbit
          relative to the stars takes about 27.32 days (the{" "}
          <em>sidereal month</em>). But because the Earth is also moving
          around the Sun during that time, the cycle of Moon phases — new
          moon to new moon — takes a bit longer, about 29.53 days (the{" "}
          <em>synodic month</em>). Hold on to this distinction; it shows up
          again immediately.
        </li>
      </ol>

      <FigurePlaceholder
        number="1.1"
        caption="Earth–Sun–Moon system: rotation, revolution, and the Moon's orbit."
        captionHi="पृथ्वी–सूर्य–चंद्र: घूर्णन, परिक्रमा और चंद्रमा की कक्षा।"
        promptHint="See Batch 1 image #1 for the Gemini prompt."
      />

      <p>
        Almost everything in the panchang comes out of those three motions
        and how they line up with each other on a given day. Tithi is
        about the Moon&rsquo;s position relative to the Sun. Nakshatra is
        about the Moon&rsquo;s position against the background stars.
        Vara — the weekday — is about Earth&rsquo;s spin. Yoga and karana
        are arithmetic combinations of the same two angles. So really, the
        panchang is a careful, repeatable answer to the question{" "}
        <em>where is everything in the sky right now, and what does that
        combination mean?</em>
      </p>

      <h2>Why a &ldquo;day&rdquo; has more than one definition</h2>

      <p>
        Here is something most people never notice. There are two different
        ways to measure how long it takes Earth to spin once on its axis,
        and they give two different answers.
      </p>

      <h3>The solar day <span className="hi" lang="hi">सावन / सौर दिन</span></h3>

      <p>
        A <strong>solar day</strong> is from one solar noon to the next
        solar noon — that is, the time between the Sun being directly
        overhead (or, more precisely, on the local meridian) and the Sun
        being on the meridian again. Averaged over a year, it is exactly
        24 hours. This is called the <em>mean solar day</em>{" "}
        <span lang="hi">(सावन दिन)</span>. It is what our wristwatches
        measure.
      </p>

      <h3>The sidereal day <span className="hi" lang="hi">नक्षत्र दिन</span></h3>

      <p>
        A <strong>sidereal day</strong> is from a particular distant star
        being on the meridian to the same star being on the meridian
        again. This is approximately <strong>23 hours, 56 minutes, and
        4 seconds</strong> — about four minutes shorter than a solar day.
      </p>

      <p>Why are they different?</p>

      <p>
        Because Earth does two things at once. While it is spinning on its
        axis, it is also moving along its orbit around the Sun. After one
        full spin (which takes a sidereal day), the Earth has moved a
        little bit along its orbit — about 1° (since 360° in a year ÷ 365
        days). The distant star is back overhead, but the Sun is not quite
        overhead yet, because we have changed position relative to it.
        Earth has to spin for about four more minutes to bring the Sun back
        overhead. That extra rotation is the difference between a sidereal
        day and a solar day.
      </p>

      <FigurePlaceholder
        number="1.2"
        caption="Solar day vs sidereal day: why a solar day is about 4 minutes longer."
        captionHi="सौर दिन और नक्षत्र दिन: सौर दिन ~4 मिनट लंबा क्यों होता है।"
        promptHint="See Batch 1 image #2 for the Gemini prompt."
      />

      <KeyIdea
        title="A day is not one thing — it depends on what you measure against."
        titleHi="‘दिन’ क्या है यह इस पर निर्भर करता है कि आप किसके सापेक्ष माप रहे हैं"
      >
        Solar day = same Sun overhead again ≈ 24 hours. Sidereal day = same
        star overhead again ≈ 23h 56m 4s. Both are real. The Indian
        calendar cares about both, because some calculations follow the
        Sun (vara, choghadiya, muhurta) while others follow the
        Moon&rsquo;s position against the stars (nakshatra).
      </KeyIdea>

      <h3>The equation of time</h3>

      <p>
        We just said the average solar day is 24 hours. The word{" "}
        <em>average</em> is doing some work there. In any given week the
        Sun does not actually return to the meridian at exactly 24-hour
        intervals. Sometimes it is a few minutes early, sometimes a few
        minutes late. The cumulative discrepancy between &ldquo;real Sun
        time&rdquo; and &ldquo;clock time&rdquo; is called the{" "}
        <strong>equation of time</strong>{" "}
        <span lang="hi">(काल-समीकरण)</span>, and over the course of the
        year it ranges roughly from −14 minutes to +16 minutes. There are
        two reasons:
      </p>

      <ol>
        <li>
          <strong>Earth&rsquo;s orbit is an ellipse, not a circle.</strong>{" "}
          By Kepler&rsquo;s second law, Earth moves a bit faster when it
          is closer to the Sun (early January) and a bit slower when it is
          farther (early July). This makes the apparent solar day slightly
          longer or shorter than 24 hours.
        </li>
        <li>
          <strong>Earth&rsquo;s axis is tilted.</strong> The Sun&rsquo;s
          motion along the ecliptic does not project onto the celestial
          equator at a uniform rate. Even if Earth&rsquo;s orbit were a
          perfect circle, this alone would create a smaller wobble in the
          equation of time.
        </li>
      </ol>

      <p>
        The classical Indian astronomers were aware of these effects.
        Aryabhata in 499 CE computes corrections of exactly the same kind,
        called <em>manda</em> <span lang="hi">(मन्द)</span> and{" "}
        <em>shighra</em> <span lang="hi">(शीघ्र)</span> corrections, in
        order to get from a body&rsquo;s mean position to its true
        position. We mention this because the panchang you are reading
        uses these same corrections — under modern names — to compute
        accurate sunrise, sunset, and tithi end-times for your location.
      </p>

      <h2>Sunrise as the anchor</h2>

      <p>
        Here is the part that surprises most people. In the Western
        calendar, a day begins at midnight — an arbitrary moment when
        nothing visible is happening. In the Indian tradition,{" "}
        <strong>a day begins at sunrise</strong>{" "}
        <span lang="hi">(सूर्योदय)</span>. This single choice changes a
        lot of how the panchang works.
      </p>

      <p>
        Why sunrise? Because sunrise is something you can actually see.
        Before clocks, before time zones, before atomic time — sunrise is
        the one moment everyone in a region can agree on without
        instruments. Anchoring the day to sunrise meant the calendar was
        always verifiable.
      </p>

      <p>
        It also has a practical consequence: the panchang for any given
        location depends on <em>where that location is</em>, because
        sunrise happens at different clock times in different places. The
        panchang for Ujjain at 6:32 AM is not the panchang for Mumbai at
        6:32 AM, even on the same date. We will come back to this when we
        talk about choghadiya and muhurta, which slice the time between
        sunrise and sunset into pieces.
      </p>

      <p>
        There is a small subtlety even in &ldquo;sunrise.&rdquo; The
        traditional astronomical definition is the moment when the centre
        of the Sun&rsquo;s disc crosses the local horizon, refraction
        accounted for. Some traditions instead use the moment when the
        upper limb (top edge) of the Sun first becomes visible. The two
        differ by about a minute or two depending on latitude. This
        panchang uses the standard centre-of-disc definition.
      </p>

      <h2>The day, the month, the year</h2>

      <p>
        With those three motions in hand, we can sketch the calendar.
      </p>

      <ul>
        <li>
          <strong>The day</strong> is one rotation of the Earth — measured
          from sunrise to next sunrise.
        </li>
        <li>
          <strong>The month</strong> in the Indian calendar is one cycle
          of the Moon — typically from one new moon to the next new moon
          (this is the{" "}
          <em>amanta <span lang="hi">(अमान्त)</span></em> system used in
          most of South India and the Jain tradition), or in some regions
          from one full moon to the next full moon (the{" "}
          <em>purnimanta <span lang="hi">(पूर्णिमान्त)</span></em> system
          used in much of North India). About 29.53 days. Both systems
          agree on which days are which tithi; they only disagree on which
          tithi marks the boundary of the month.
        </li>
        <li>
          <strong>The year</strong> is one orbit of the Earth around the
          Sun. About 365.25 days.
        </li>
      </ul>

      <p>
        And immediately you see the problem. 12 lunar months × 29.53 days =
        354.36 days, which is about 11 days short of a solar year. So if we
        only counted lunar months, our seasons would drift. After three
        years we would be a full month off. After thirty-three years we
        would be a full year off.
      </p>

      <p>
        The Indian calendar solves this by occasionally inserting an extra
        month — called <em>adhik maas</em>{" "}
        <span lang="hi">(अधिक मास)</span> — roughly every 32–33 months, to
        keep lunar months and solar years in sync. The rule is precise: an
        adhik maas occurs when a lunar month begins and ends without the
        Sun crossing into a new sign of the zodiac during it. The opposite
        case — a lunar month during which the Sun crosses two zodiac
        signs — is called <em>kshaya maas</em>{" "}
        <span lang="hi">(क्षय मास)</span> and is removed from the count.
        Kshaya maas is rare; adhik maas is the common case. We will not
        need this detail until much later, but it is good to know it is
        there.
      </p>

      <h2>Two different &ldquo;years&rdquo; — sidereal and tropical</h2>

      <p>
        Just as there are two definitions of a day, there are two
        definitions of a year, and they differ by an amount that is small
        but cumulative. This is a topic that confuses even experienced
        readers, and the difference is one of the central debates in
        modern Indian calendar reform. We will be brief here and revisit
        it whenever it matters.
      </p>

      <h3>Sidereal year <span className="hi" lang="hi">नाक्षत्र वर्ष</span></h3>

      <p>
        The <strong>sidereal year</strong> is the time it takes Earth to
        return to the same position relative to the fixed background
        stars. It is approximately <strong>365.2564 days</strong>. This is
        the year as the ancient observers measured it: by watching when a
        particular star (say, Spica or Aldebaran) returns to the same
        position at sunset.
      </p>

      <h3>Tropical year <span className="hi" lang="hi">सायन वर्ष</span></h3>

      <p>
        The <strong>tropical year</strong> is the time it takes Earth to
        return to the same position relative to the seasons — for example,
        from one spring equinox to the next. It is approximately{" "}
        <strong>365.2422 days</strong>. This is the year that the Western
        Gregorian calendar tracks, because keeping seasons aligned with
        calendar dates is what civic life cares about.
      </p>

      <h3>Why they differ — precession of the equinoxes</h3>

      <p>
        The sidereal year is about <strong>20 minutes longer</strong> than
        the tropical year. Why? Because Earth&rsquo;s rotational axis is
        not perfectly fixed in space. It wobbles, very slowly, in a circle
        — like a spinning top whose axis traces a cone over time. One full
        wobble takes about 25,800 years. This wobble is called the{" "}
        <strong>precession of the equinoxes</strong>{" "}
        <span lang="hi">(अयन-चलन)</span>, and it means the position where
        the Sun crosses the equator each spring drifts slowly backwards
        through the zodiac at about 50.3 arcseconds per year — roughly{" "}
        <strong>1° every 72 years</strong>.
      </p>

      <p>
        The classical Indian astronomers knew about precession.
        Bhaskara II discusses it. Some siddhantas use it; some do not. The
        practical consequence today is that the Indian zodiac and the
        Western zodiac, which once started at the same point, have drifted
        apart by about <strong>24°</strong>. We are about 1700 years past
        the moment they coincided.
      </p>

      <FigurePlaceholder
        number="1.3"
        caption="Precession of the equinoxes: Earth's axis traces a slow cone over ~25,800 years."
        captionHi="अयनांश: पृथ्वी की धुरी ~25,800 वर्षों में एक धीमा शंकु बनाती है।"
        promptHint="Earth at center with rotation axis shown as an arrow. The arrow's tip traces a circle (the precession cone) labelled '~25,800 years'. Two zodiac rings are drawn — one fixed to stars (sidereal) and one rotating with Earth's orientation (tropical). Show the gap of ~24° between them. Bilingual labels."
      />

      <h3>Sayana and Nirayana zodiacs</h3>

      <p>
        This drift produces the most consequential split in modern Indian
        astrology and astronomy. The <em>nirayana</em>{" "}
        <span lang="hi">(निरयण)</span> system fixes the zodiac to the
        stars — so that the Aries-Taurus boundary, for example, is always
        in the same place against the background of distant suns. The{" "}
        <em>sayana</em> <span lang="hi">(सायन)</span> system fixes the
        zodiac to the seasons — so that the Aries-Taurus boundary moves
        slowly with precession, but the spring equinox is always at 0°
        Aries. The Western tropical astrology tradition uses sayana.
        Classical Indian astronomy uses nirayana. This is why a person
        born &ldquo;under the sign of Capricorn&rdquo; in a Western
        horoscope might be told they are actually a Sagittarius in an
        Indian horoscope — both calculations are correct; they are using
        different zodiac conventions. The difference between them is the
        precession amount, called <em>ayanamsha</em>{" "}
        <span lang="hi">(अयनांश)</span>, currently about 24° and growing
        about a degree every 72 years.
      </p>

      <p>
        This panchang uses the <strong>nirayana sidereal zodiac</strong>{" "}
        with the standard Lahiri ayanamsha, which is the most widely used
        modern convention in Indian astronomy. We will mention nirayana
        again when we get to nakshatras and rashis.
      </p>

      <KeyIdea
        title="Two zodiacs, both consistent."
        titleHi="दो राशि-चक्र, दोनों सही"
      >
        Sayana = fixed to seasons; sidereal/nirayana = fixed to stars. The
        gap between them grows by about one degree every 72 years because
        of axial precession. Indian classical astronomy uses nirayana.
        This is not a contradiction — it is two different reference
        frames.
      </KeyIdea>

      <h2>Putting it together — what does a single date describe?</h2>

      <p>
        Suppose you ask, &ldquo;What was happening in the sky at sunrise on
        15 August 2026 in Mumbai?&rdquo; Here is what the panchang has to
        compute.
      </p>

      <ol>
        <li>
          The exact local sunrise time, accounting for Mumbai&rsquo;s
          latitude/longitude and the equation of time.
        </li>
        <li>
          The Sun&rsquo;s longitude on the ecliptic at that moment, in the
          nirayana zodiac.
        </li>
        <li>
          The Moon&rsquo;s longitude on the ecliptic at that moment, in
          the same zodiac.
        </li>
        <li>
          From those two longitudes, several derived quantities:
          <ul>
            <li>
              The angular separation Moon − Sun, modulo 360, divided by
              12° → tells us the <strong>tithi</strong>.
            </li>
            <li>
              The Moon&rsquo;s longitude divided by 13°20&rsquo; → tells
              us the <strong>nakshatra</strong>.
            </li>
            <li>
              (Moon longitude + Sun longitude) divided by 13°20&rsquo; →
              tells us the <strong>yoga</strong>.
            </li>
            <li>
              Half the tithi → tells us the <strong>karana</strong>.
            </li>
          </ul>
        </li>
        <li>
          The day of the week (vara) is just counted from a reference
          epoch.
        </li>
      </ol>

      <p>
        That is the entire panchang in one sentence: it is the result of
        computing two angles (Sun&rsquo;s longitude and Moon&rsquo;s
        longitude) at the moment of local sunrise, and then dividing those
        angles by the appropriate sub-divisions. Every other column you
        will see in the daily panchang is either one of these primary
        values or a derived schedule of time-windows based on them. We
        will spend the next several chapters making each step concrete.
      </p>

      <h2>What we have so far</h2>

      <p>
        At the end of this chapter, you should be comfortable with a few
        ideas:
      </p>

      <ul>
        <li>
          The panchang is reading the sky. Three motions matter: Earth
          spinning, Earth orbiting Sun, Moon orbiting Earth.
        </li>
        <li>
          A &ldquo;day&rdquo; can mean a solar day (24h average) or a
          sidereal day (23h 56m 4s), and the difference is real and matters.
        </li>
        <li>
          The Indian day starts at sunrise, not midnight — and this is
          why panchang is location-dependent.
        </li>
        <li>
          The equation of time (a non-trivial daily wobble) and
          precession of the equinoxes (a 25,800-year wobble) are real
          astronomical effects already accounted for in classical Indian
          astronomy.
        </li>
        <li>
          There are two zodiacs. Sayana follows the seasons, nirayana
          follows the fixed stars. Indian astronomy uses nirayana.
        </li>
        <li>
          Lunar months and solar years do not divide evenly, so the
          calendar uses an extra month occasionally to stay in step.
        </li>
      </ul>

      <p>
        That is the foundation. In the next chapter we tackle the first of
        the five limbs — <strong>tithi</strong>, the lunar day. This is
        also where we meet the Jain six-ghati rule that defines the
        tradition this panchang follows.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        तिथि, नक्षत्र या पंचांग के अन्य पाँच अंगों की चर्चा से पहले हमें एक
        अधिक मूलभूत प्रश्न पर रुकना होगा — एक ऐसा प्रश्न जो इतना सरल लगता है
        कि हम उसके बारे में कभी सोचते ही नहीं। <strong>एक दिन क्या होता है?</strong>
      </p>

      <p>
        आप कहना चाहेंगे &mdash; &ldquo;24 घंटे।&rdquo; यह सच है, परन्तु अधूरा
        है। आकाश में कम से कम तीन ऐसी वस्तुएँ हैं जिनके सापेक्ष हम
        &ldquo;दिन&rdquo; मापते हैं, और तीनों के उत्तर ठीक एक-दूसरे से मेल नहीं
        खाते। ठीक इसी प्रकार भारतीय खगोल विज्ञान में &ldquo;वर्ष&rdquo; की भी
        दो अलग परिभाषाएँ हैं, और वे भी पूर्णतः नहीं मिलतीं। भारतीय कैलेंडर
        भिन्न-भिन्न प्रसंगों में इन सभी परिभाषाओं का उपयोग करता है &mdash; यही
        कारण है कि यह कभी-कभी जटिल लगता है। इन्हें खोलकर समझना ही इस अध्याय का
        उद्देश्य है, और एक बार ये सुलझ जायें तो आगे का बहुत-कुछ सरल हो
        जाता है।
      </p>

      <h2>तीन गतियाँ — जिन्हें याद रखना है</h2>

      <p>
        किसी स्वच्छ दिन बाहर खड़े होकर देखिए। तीन ऐसी गतियाँ चल रही हैं जो
        हमारे लिए महत्त्वपूर्ण हैं &mdash; यद्यपि आप किसी का अनुभव नहीं कर रहे
        होंगे।
      </p>

      <ol>
        <li>
          <strong>पृथ्वी अपनी धुरी पर घूम रही है।</strong> एक पूरा घूर्णन
          लगभग 24 घंटे में होता है। इसी से सूर्य उदय और अस्त होता प्रतीत होता
          है, और यही सावन दिवस का आधार है।
        </li>
        <li>
          <strong>पृथ्वी सूर्य की परिक्रमा कर रही है।</strong> एक पूरी परिक्रमा
          लगभग 365.25 दिन में होती है। यही हमें वर्ष देती है, और इसी कारण
          सूर्य वर्ष-भर में पृष्ठभूमि के विभिन्न नक्षत्रों के सामने से गुजरता
          प्रतीत होता है। सूर्य के इस प्रत्यक्ष वार्षिक मार्ग को{" "}
          <em>क्रान्तिवृत्त</em> <span lang="en">(ecliptic)</span> कहते हैं।
        </li>
        <li>
          <strong>चन्द्रमा पृथ्वी की परिक्रमा कर रहा है।</strong> नक्षत्रों के
          सापेक्ष एक पूरा चक्र लगभग 27.32 दिन में पूरा होता है (यह{" "}
          <em>नाक्षत्र मास</em> है)। परन्तु चूँकि पृथ्वी भी इस बीच सूर्य के
          चारों ओर आगे बढ़ चुकी होती है, अतः चन्द्र-कलाओं का चक्र &mdash;
          अमावस्या से अमावस्या तक &mdash; कुछ अधिक, लगभग 29.53 दिन में पूरा
          होता है (यह <em>सावन मास</em> या <em>तिथि-मास</em> है)। इस अंतर को
          ध्यान में रखिए, क्योंकि यह अभी आगे ही प्रकट होगा।
        </li>
      </ol>

      <FigurePlaceholder
        number="1.1"
        caption="Earth–Sun–Moon system: rotation, revolution, and the Moon's orbit."
        captionHi="पृथ्वी–सूर्य–चन्द्र: घूर्णन, परिक्रमा और चन्द्रमा की कक्षा।"
        promptHint="See Batch 1 image #1 for the Gemini prompt."
      />

      <p>
        पंचांग का लगभग सब कुछ इन्हीं तीन गतियों और किसी एक दिन में उनके
        पारस्परिक संयोग से निकलता है। तिथि चन्द्रमा की सूर्य के सापेक्ष स्थिति
        है। नक्षत्र चन्द्रमा की पृष्ठभूमि के तारों के सापेक्ष स्थिति है। वार
        &mdash; सप्ताह का दिन &mdash; पृथ्वी के घूर्णन की गिनती है। योग और करण
        उन्हीं दो कोणों के अंकगणितीय संयोग हैं। इसलिए वस्तुतः पंचांग एक ही
        प्रश्न का सावधान, पुनरावर्तनीय उत्तर है &mdash; <em>इस क्षण आकाश में
        सब-कुछ कहाँ है, और उस संयोजन का क्या अर्थ है?</em>
      </p>

      <h2>&ldquo;दिन&rdquo; की एक से अधिक परिभाषाएँ क्यों हैं</h2>

      <p>
        अधिकांश लोग इस बारीकी पर ध्यान नहीं देते। पृथ्वी अपनी धुरी पर एक बार
        घूमने में कितना समय लेती है &mdash; यह नापने के दो भिन्न तरीके हैं, और
        वे दो भिन्न उत्तर देते हैं।
      </p>

      <h3>सावन / सौर दिवस <span className="hi" lang="en">solar day</span></h3>

      <p>
        <strong>सावन दिवस</strong> है एक मध्याह्न से अगले मध्याह्न तक का काल
        &mdash; अर्थात् सूर्य के स्थानीय रेखांश पर आने और पुनः उसी रेखांश पर
        लौटने के बीच की अवधि। वर्ष-भर के औसत के रूप में यह ठीक 24 घंटे होती
        है। इसी को <em>मध्यम सावन दिवस</em>{" "}
        <span lang="en">(mean solar day)</span> कहते हैं। हमारी कलाई की घड़ी
        इसी समय को नापती है।
      </p>

      <h3>नक्षत्र दिवस <span className="hi" lang="en">sidereal day</span></h3>

      <p>
        <strong>नक्षत्र दिवस</strong> है किसी एक दूरस्थ तारे के स्थानीय
        रेखांश पर आने और उसी तारे के पुनः उसी रेखांश पर आने के बीच की अवधि।
        यह लगभग <strong>23 घंटे, 56 मिनट और 4 सेकंड</strong> होता है &mdash;
        सावन दिवस से लगभग चार मिनट कम।
      </p>

      <p>दोनों में अंतर क्यों है?</p>

      <p>
        क्योंकि पृथ्वी एक साथ दो काम कर रही है। अपनी धुरी पर घूमने के साथ-साथ
        वह सूर्य के चारों ओर अपनी कक्षा में भी आगे बढ़ रही है। एक पूरे घूर्णन
        (अर्थात् एक नक्षत्र दिवस) के बाद पृथ्वी अपनी कक्षा में लगभग 1° आगे जा
        चुकी होती है (क्योंकि वर्ष में 360° ÷ 365 दिन ≈ 1° प्रति दिन)। दूरस्थ
        तारा फिर से ठीक उसी रेखांश पर है, परन्तु सूर्य अभी ठीक रेखांश पर नहीं
        आया &mdash; क्योंकि उसके सापेक्ष हमारी स्थिति बदल गयी है। पृथ्वी को
        लगभग चार मिनट और घूमना पड़ता है ताकि सूर्य फिर रेखांश पर पहुँचे। यही
        अतिरिक्त घूर्णन सावन और नक्षत्र दिवस का अंतर है।
      </p>

      <FigurePlaceholder
        number="1.2"
        caption="Solar day vs sidereal day: why a solar day is about 4 minutes longer."
        captionHi="सौर दिन और नक्षत्र दिन: सौर दिन ~4 मिनट लंबा क्यों होता है।"
        promptHint="See Batch 1 image #2 for the Gemini prompt."
      />

      <KeyIdea
        title="‘दिन’ क्या है यह इस पर निर्भर करता है कि आप किसके सापेक्ष माप रहे हैं"
        titleHi="A day is not one thing — it depends on what you measure against."
      >
        सावन दिवस = वही सूर्य पुनः रेखांश पर ≈ 24 घंटे। नक्षत्र दिवस = वही तारा
        पुनः रेखांश पर ≈ 23 घ. 56 मि. 4 से.। दोनों वास्तविक हैं। भारतीय
        कैलेंडर दोनों का ध्यान रखता है &mdash; कुछ गणनाएँ सूर्य के अनुसार चलती
        हैं (वार, चौघड़िया, मुहूर्त), और कुछ चन्द्रमा की तारों के सापेक्ष
        स्थिति के अनुसार (नक्षत्र)।
      </KeyIdea>

      <h3>काल-समीकरण <span className="hi" lang="en">equation of time</span></h3>

      <p>
        अभी हमने कहा कि औसत सावन दिवस 24 घंटे का होता है। &ldquo;औसत&rdquo;
        शब्द यहाँ सजावटी नहीं है। किसी भी सप्ताह में सूर्य ठीक 24-घंटे के
        अंतराल पर रेखांश पर नहीं आता। कभी कुछ मिनट पहले, कभी कुछ मिनट बाद।
        &ldquo;वास्तविक सूर्य-काल&rdquo; और &ldquo;घड़ी-काल&rdquo; के इस
        संचयी अंतर को <strong>काल-समीकरण</strong>{" "}
        <span lang="en">(equation of time)</span> कहते हैं, और वर्ष-भर में यह
        लगभग −14 मिनट से +16 मिनट तक झूलता रहता है। इसके दो कारण हैं —
      </p>

      <ol>
        <li>
          <strong>पृथ्वी की कक्षा वृत्त नहीं, दीर्घवृत्त है।</strong> केप्लर
          के द्वितीय नियम के अनुसार पृथ्वी जब सूर्य के समीप होती है (जनवरी के
          आरम्भ में) तब कुछ तेज़ चलती है, और जब दूर होती है (जुलाई के आरम्भ
          में) तब कुछ धीमी। इसके कारण प्रत्यक्ष सावन दिवस 24 घंटे से किंचित्
          अधिक या कम हो जाता है।
        </li>
        <li>
          <strong>पृथ्वी की धुरी झुकी हुई है।</strong> सूर्य की क्रान्तिवृत्त
          पर गति खगोलीय भूमध्य-वृत्त पर एकसमान दर से प्रक्षेपित नहीं होती।
          यदि पृथ्वी की कक्षा शुद्ध वृत्त भी होती, तब भी अकेला यह कारण काल-
          समीकरण में एक छोटा-सा झूलाव पैदा कर देता।
        </li>
      </ol>

      <p>
        शास्त्रीय भारतीय खगोलशास्त्री इन प्रभावों से परिचित थे। 499 ईस्वी में
        आर्यभट इसी प्रकार की संशोधनात्मक मात्राएँ निकालते हैं &mdash; जिन्हें
        वे <em>मन्द</em> और <em>शीघ्र</em> संस्कार कहते हैं &mdash; ताकि किसी
        ग्रह की मध्य-स्थिति से उसकी स्पष्ट स्थिति निकाली जा सके। हम इसका
        उल्लेख इसलिए कर रहे हैं क्योंकि आज जो पंचांग आप पढ़ रहे हैं, वह आपके
        स्थान के अनुसार सटीक सूर्योदय, सूर्यास्त और तिथि-समाप्ति निकालने के
        लिए ठीक इन्हीं प्रकार के संशोधन (आधुनिक नामों से) प्रयोग करता है।
      </p>

      <h2>सूर्योदय &mdash; दिन का आधार-बिन्दु</h2>

      <p>
        यह वह बात है जो प्रायः लोगों को आश्चर्यचकित करती है। पाश्चात्य
        कैलेंडर में दिन मध्यरात्रि से प्रारम्भ होता है &mdash; एक मनमाना क्षण,
        जब आकाश में कुछ भी प्रत्यक्ष नहीं हो रहा। भारतीय परम्परा में{" "}
        <strong>दिन सूर्योदय से प्रारम्भ होता है।</strong> यह एक चयन है, परन्तु
        यह अकेला चयन पंचांग की बहुत-सी बातें तय कर देता है।
      </p>

      <p>
        सूर्योदय ही क्यों? क्योंकि सूर्योदय ऐसा क्षण है जिसे आप वस्तुतः देख
        सकते हैं। घड़ी से पहले, समय-क्षेत्रों से पहले, परमाण्विक काल से पहले
        &mdash; सूर्योदय ही वह एक क्षण है जिस पर किसी भी क्षेत्र के सब लोग बिना
        किसी यंत्र के सहमत हो सकते हैं। दिन को सूर्योदय से जोड़ने का अर्थ था
        कि कैलेंडर सदा प्रत्यक्ष-सत्यापित रहे।
      </p>

      <p>
        इसका एक व्यावहारिक परिणाम भी है &mdash; किसी भी स्थान का पंचांग{" "}
        <em>उस स्थान-विशेष पर</em> निर्भर करता है, क्योंकि सूर्योदय भिन्न-भिन्न
        स्थानों पर भिन्न-भिन्न घड़ी-समय पर होता है। उज्जैन का सुबह 6:32 का
        पंचांग मुम्बई के सुबह 6:32 का पंचांग नहीं है, चाहे तिथि एक ही हो। जब
        हम चौघड़िया और मुहूर्त की बात करेंगे &mdash; जो सूर्योदय और सूर्यास्त
        के बीच के समय को टुकड़ों में बाँटते हैं &mdash; तब यह बात फिर सामने
        आयेगी।
      </p>

      <p>
        सूर्योदय में भी एक छोटी-सी बारीकी है। पारम्परिक खगोलीय परिभाषा यह है
        कि वह क्षण जब सूर्य-बिम्ब का केन्द्र स्थानीय क्षितिज को पार करता है,
        वायुमण्डलीय वक्रीभवन का संशोधन सहित। कुछ परम्पराएँ इसके स्थान पर वह
        क्षण लेती हैं जब सूर्य का ऊपरी किनारा सबसे पहले दिखाई देता है। दोनों
        में अक्षांश के अनुसार लगभग एक-दो मिनट का अंतर हो सकता है। यह पंचांग
        मानक केन्द्र-बिम्ब परिभाषा का प्रयोग करता है।
      </p>

      <h2>दिन, मास, वर्ष</h2>

      <p>
        अब इन तीन गतियों के साथ हम कैलेंडर का ढाँचा खींच सकते हैं।
      </p>

      <ul>
        <li>
          <strong>दिन</strong> पृथ्वी का एक घूर्णन है &mdash; सूर्योदय से अगले
          सूर्योदय तक नापा जाता है।
        </li>
        <li>
          <strong>मास</strong> भारतीय कैलेंडर में चन्द्रमा का एक चक्र है
          &mdash; सामान्यतः अमावस्या से अगली अमावस्या तक (यह{" "}
          <em>अमान्त</em> पद्धति है, जिसका अनुसरण दक्षिण भारत और जैन परम्परा
          में होता है), अथवा कुछ क्षेत्रों में पूर्णिमा से अगली पूर्णिमा तक
          (यह <em>पूर्णिमान्त</em> पद्धति है, जिसका अनुसरण उत्तर भारत के
          अधिकांश भाग में होता है)। लगभग 29.53 दिन। दोनों पद्धतियाँ इस बात पर
          सहमत हैं कि किस दिन कौन-सी तिथि है; अंतर केवल इस पर है कि मास का
          आरम्भ कौन-सी तिथि से माना जाये।
        </li>
        <li>
          <strong>वर्ष</strong> पृथ्वी की सूर्य के चारों ओर एक परिक्रमा है।
          लगभग 365.25 दिन।
        </li>
      </ul>

      <p>
        यहीं समस्या स्पष्ट हो जाती है। 12 चन्द्र-मास × 29.53 = 354.36 दिन,
        जो सौर वर्ष से लगभग 11 दिन कम है। यदि हम केवल चन्द्र-मास गिनते रहें,
        तो ऋतुएँ खिसकती जायेंगी। तीन वर्ष में एक पूरा मास का अंतर हो जायेगा।
        तैंतीस वर्ष में पूरा एक वर्ष का।
      </p>

      <p>
        भारतीय कैलेंडर इस समस्या का समाधान बीच-बीच में एक अतिरिक्त मास जोड़कर
        करता है &mdash; <em>अधिक मास</em>{" "}
        <span lang="en">(adhik maas)</span> &mdash; प्रायः हर 32–33 मास में
        एक बार। नियम सटीक है &mdash; अधिक मास तब होता है जब कोई चन्द्र-मास
        ऐसे आरम्भ हो और समाप्त हो कि उस पूरे मास के दौरान सूर्य किसी भी राशि
        में संक्रमण न करे। इसका विपरीत भी सम्भव है &mdash; जब किसी चन्द्र-मास
        में सूर्य दो राशियों में संक्रमण कर ले, तो उसे <em>क्षय मास</em>{" "}
        कहते हैं और गणना से हटा दिया जाता है। क्षय मास दुर्लभ है, अधिक मास
        सामान्य। यह विवरण अभी हमें नहीं चाहिए, परन्तु इसका उल्लेख ज्ञातव्य है।
      </p>

      <h2>दो भिन्न &ldquo;वर्ष&rdquo; &mdash; नाक्षत्र और सायन</h2>

      <p>
        जैसे दिन की दो परिभाषाएँ हैं, वैसे ही वर्ष की भी दो परिभाषाएँ हैं, और
        उनमें छोटा परन्तु संचयी अंतर है। यह विषय अनुभवी पाठकों को भी उलझा देता
        है, और आधुनिक भारतीय कैलेंडर-सुधार की बहसों का केन्द्र-बिन्दु है।
        यहाँ हम संक्षिप्त रहेंगे, और जब आगे आवश्यक होगा तब लौटेंगे।
      </p>

      <h3>नाक्षत्र वर्ष <span className="hi" lang="en">sidereal year</span></h3>

      <p>
        <strong>नाक्षत्र वर्ष</strong> वह काल है जिसमें पृथ्वी पृष्ठभूमि के
        स्थिर तारों के सापेक्ष पुनः उसी स्थिति में पहुँचती है। लगभग{" "}
        <strong>365.2564 दिन</strong>। यही वह वर्ष है जिसे प्राचीन
        अवलोकनकर्ताओं ने मापा था &mdash; किसी विशेष तारे (जैसे चित्रा या
        रोहिणी) को सूर्यास्त के समय फिर उसी स्थान पर देखकर।
      </p>

      <h3>सायन वर्ष <span className="hi" lang="en">tropical year</span></h3>

      <p>
        <strong>सायन वर्ष</strong> वह काल है जिसमें पृथ्वी ऋतुओं के सापेक्ष
        पुनः उसी स्थिति में पहुँचती है &mdash; उदाहरण के लिए, एक वसन्त-विषुव
        से अगले वसन्त-विषुव तक। लगभग <strong>365.2422 दिन</strong>। यही वह
        वर्ष है जिसका हिसाब पाश्चात्य ग्रेगोरियन कैलेंडर रखता है, क्योंकि
        लोक-जीवन की चिन्ता यह है कि ऋतुएँ कैलेंडर की तिथियों के साथ बनी रहें।
      </p>

      <h3>अंतर का कारण &mdash; अयन-चलन</h3>

      <p>
        नाक्षत्र वर्ष सायन वर्ष से लगभग{" "}
        <strong>20 मिनट अधिक</strong> लंबा है। क्यों? क्योंकि पृथ्वी की
        घूर्णन-धुरी अंतरिक्ष में पूर्णतः स्थिर नहीं है। वह अति धीमी गति से
        एक वृत्त में लड़खड़ाती है &mdash; जैसे कोई घूमता हुआ लट्टू, जिसकी
        धुरी समय के साथ एक शंकु खींचती है। एक पूर्ण लड़खड़ाहट लगभग 25,800
        वर्ष में पूरी होती है। इसी को <strong>अयन-चलन</strong>{" "}
        <span lang="en">(precession of the equinoxes)</span> कहते हैं, और
        इसके कारण वसन्त में सूर्य के भूमध्य-वृत्त पार करने का बिन्दु राशि-चक्र
        में धीरे-धीरे पीछे की ओर खिसकता रहता है &mdash; लगभग 50.3
        चाप-सेकंड प्रति वर्ष, अर्थात्{" "}
        <strong>हर 72 वर्ष में लगभग 1°</strong>।
      </p>

      <p>
        शास्त्रीय भारतीय खगोलशास्त्रियों को अयन-चलन का ज्ञान था। भास्कर
        द्वितीय इस पर विचार करते हैं। कुछ सिद्धान्त-ग्रंथ इसे प्रयोग करते हैं,
        कुछ नहीं। आज इसका व्यावहारिक परिणाम यह है कि भारतीय राशि-चक्र और
        पाश्चात्य राशि-चक्र, जो किसी समय एक ही बिन्दु से प्रारम्भ होते थे,
        अब लगभग <strong>24°</strong> खिसक चुके हैं। जिस क्षण ये एक थे, उससे
        हम लगभग 1700 वर्ष आगे आ चुके हैं।
      </p>

      <FigurePlaceholder
        number="1.3"
        caption="Precession of the equinoxes: Earth's axis traces a slow cone over ~25,800 years."
        captionHi="अयनांश: पृथ्वी की धुरी ~25,800 वर्षों में एक धीमा शंकु बनाती है।"
        promptHint="Earth at center with rotation axis shown as an arrow. The arrow's tip traces a circle (the precession cone) labelled '~25,800 years'. Two zodiac rings are drawn — one fixed to stars (sidereal) and one rotating with Earth's orientation (tropical). Show the gap of ~24° between them. Bilingual labels."
      />

      <h3>सायन और निरयण राशि-चक्र</h3>

      <p>
        यह खिसकाव आधुनिक भारतीय ज्योतिष और खगोल विज्ञान का सबसे महत्त्वपूर्ण
        विभाजन उत्पन्न करता है। <em>निरयण</em>{" "}
        <span lang="en">(nirayana)</span> पद्धति राशि-चक्र को तारों से जोड़े
        रखती है &mdash; अर्थात् मेष-वृषभ की सीमा सदा पृष्ठभूमि के उन्हीं तारों
        के सामने रहती है। <em>सायन</em>{" "}
        <span lang="en">(sayana)</span> पद्धति राशि-चक्र को ऋतुओं से जोड़े
        रखती है &mdash; अर्थात् मेष-वृषभ की सीमा अयन-चलन के साथ धीरे-धीरे
        खिसकती है, परन्तु वसन्त-विषुव सदा 0° मेष पर रहता है। पाश्चात्य
        सायन ज्योतिष परम्परा सायन का प्रयोग करती है। शास्त्रीय भारतीय खगोल
        विज्ञान निरयण का। इसी कारण कोई व्यक्ति जो पाश्चात्य कुण्डली में
        &ldquo;मकर राशि का&rdquo; है, वही भारतीय कुण्डली में
        &ldquo;धनु राशि का&rdquo; निकल सकता है &mdash; दोनों गणनाएँ ठीक हैं;
        वे केवल भिन्न-भिन्न राशि-संपाटी का प्रयोग कर रही हैं। दोनों के बीच
        का यह अंतर ही <em>अयनांश</em>{" "}
        <span lang="en">(ayanamsha)</span> कहलाता है, जो वर्तमान में लगभग 24°
        है और हर 72 वर्ष में लगभग 1° बढ़ता रहता है।
      </p>

      <p>
        यह पंचांग मानक लाहिड़ी अयनांश के साथ{" "}
        <strong>निरयण राशि-चक्र</strong> का प्रयोग करता है &mdash; जो आधुनिक
        भारतीय खगोल विज्ञान की सर्वाधिक प्रचलित परिपाटी है। नक्षत्र और राशि के
        अध्याय में हम निरयण की चर्चा फिर करेंगे।
      </p>

      <KeyIdea
        title="दो राशि-चक्र, दोनों सही"
        titleHi="Two zodiacs, both consistent."
      >
        सायन = ऋतुओं से जुड़ा; नाक्षत्र / निरयण = तारों से जुड़ा। पृथ्वी की
        धुरी के अयन-चलन के कारण इन दोनों के बीच का अंतर हर 72 वर्ष में लगभग
        एक डिग्री बढ़ता है। शास्त्रीय भारतीय खगोल विज्ञान निरयण का प्रयोग
        करता है। यह विरोधाभास नहीं है &mdash; यह एक ही आकाश को दो भिन्न
        सन्दर्भ-तंत्रों में देखने का अंतर है।
      </KeyIdea>

      <h2>एक तिथि का पूरा वर्णन क्या है?</h2>

      <p>
        मान लीजिए आप पूछते हैं &mdash; &ldquo;15 अगस्त 2026 को मुम्बई में
        सूर्योदय के समय आकाश में क्या हो रहा था?&rdquo; पंचांग को क्या-क्या
        गणना करनी होगी?
      </p>

      <ol>
        <li>
          मुम्बई के अक्षांश-देशांतर और काल-समीकरण का ध्यान रखते हुए सटीक
          स्थानीय सूर्योदय।
        </li>
        <li>
          उस क्षण क्रान्तिवृत्त पर सूर्य का देशांतर, निरयण राशि-चक्र में।
        </li>
        <li>उसी क्षण उसी राशि-चक्र में चन्द्रमा का देशांतर।</li>
        <li>
          इन दो देशांतरों से कई व्युत्पन्न मात्राएँ —
          <ul>
            <li>
              चन्द्र − सूर्य का कोण, 360 के अवशेष में, 12° से भाग देकर{" "}
              &mdash; यह <strong>तिथि</strong> देता है।
            </li>
            <li>
              चन्द्रमा का देशांतर 13°20' से भाग देकर &mdash; यह{" "}
              <strong>नक्षत्र</strong> देता है।
            </li>
            <li>
              (चन्द्र देशांतर + सूर्य देशांतर) को 13°20' से भाग देकर &mdash;
              यह <strong>योग</strong> देता है।
            </li>
            <li>
              तिथि का आधा &mdash; यह <strong>करण</strong> देता है।
            </li>
          </ul>
        </li>
        <li>
          सप्ताह का दिन (वार) एक नियत प्रसंग-बिन्दु से गिन लिया जाता है।
        </li>
      </ol>

      <p>
        यही पूरा पंचांग एक वाक्य में है &mdash; यह स्थानीय सूर्योदय के क्षण
        दो कोणों (सूर्य का देशांतर और चन्द्र का देशांतर) की गणना का परिणाम
        है, और फिर उन कोणों को उपयुक्त उप-विभाजनों से भाग देकर निकाले गये
        मान। दैनिक पंचांग में आप जो भी अन्य स्तम्भ देखते हैं, वह या तो इन्हीं
        प्राथमिक मानों में से एक है, अथवा इन्हीं पर आधारित कोई समय-सारणी।
        अगले कई अध्यायों में हम प्रत्येक चरण को मूर्त रूप देंगे।
      </p>

      <h2>अब तक का सार</h2>

      <p>
        इस अध्याय के अंत में आपको कुछ बातें सहज लगनी चाहिए —
      </p>

      <ul>
        <li>
          पंचांग आकाश का पठन है। तीन गतियाँ महत्त्वपूर्ण हैं &mdash; पृथ्वी का
          घूर्णन, पृथ्वी की सूर्य के चारों ओर परिक्रमा, चन्द्रमा की पृथ्वी
          के चारों ओर परिक्रमा।
        </li>
        <li>
          &ldquo;दिन&rdquo; का अर्थ हो सकता है सावन दिवस (औसत 24 घंटे) अथवा
          नक्षत्र दिवस (23 घंटे 56 मिनट 4 सेकंड); और यह अंतर वास्तविक है तथा
          महत्त्व रखता है।
        </li>
        <li>
          भारतीय दिन सूर्योदय से प्रारम्भ होता है, मध्यरात्रि से नहीं
          &mdash; इसी कारण पंचांग स्थान-निर्भर होता है।
        </li>
        <li>
          काल-समीकरण (दैनिक छोटा झूलाव) और अयन-चलन (25,800 वर्षीय बड़ा
          झूलाव) &mdash; दोनों वास्तविक खगोलीय प्रभाव हैं, और शास्त्रीय
          भारतीय खगोल विज्ञान में पहले से सम्मिलित हैं।
        </li>
        <li>
          दो राशि-चक्र हैं। सायन ऋतुओं का अनुसरण करता है, निरयण स्थिर तारों
          का। भारतीय खगोल विज्ञान निरयण का उपयोग करता है।
        </li>
        <li>
          चन्द्र-मास और सौर वर्ष पूर्ण रूप से नहीं बँटते, इसलिए कैलेंडर
          तालमेल बनाये रखने के लिए कभी-कभी एक अतिरिक्त मास जोड़ता है।
        </li>
      </ul>

      <p>
        यह आधार है। अगले अध्याय में हम पाँच अंगों में से पहले को लेते हैं
        &mdash; <strong>तिथि</strong>, चन्द्र दिवस। यहीं हम जैन छह-घटी के
        उस नियम से भी मिलेंगे, जो इस पंचांग की परम्परा को परिभाषित करता है।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

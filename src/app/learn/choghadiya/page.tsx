import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("choghadiya")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        Choghadiya <span lang="hi">(चौघड़िया)</span> is the
        panchang feature that ordinary people use most. Tradition
        runs deep here: an Indian household traveller, before
        starting a long journey, will check the choghadiya. A
        merchant signing a deal will check it. A priest fixing a
        small ceremony with no full muhurta will check it. The
        question is always the same: <strong>is this time good
        for what I want to do?</strong>
      </p>

      <p>
        The answer is given as a colour-coded label — &ldquo;this
        ninety-minute window is Amrit&rdquo; (auspicious),
        &ldquo;the next is Kaal&rdquo; (inauspicious),
        &ldquo;then Shubh&rdquo; (auspicious) — and people plan
        accordingly. By the end of this chapter you will
        understand exactly how those labels are computed,
        what each one means, and how the choghadiya relates to
        the hora system we met in the vara chapter.
      </p>

      <h2>The structure: 8 periods of day, 8 periods of night</h2>

      <p>
        The choghadiya divides the time from sunrise to sunset
        into <strong>8 equal periods</strong>, and likewise the
        time from sunset to next sunrise into 8 equal periods.
        Total: 16 choghadiya periods in a 24-hour day, plus or
        minus the seasonal shift.
      </p>

      <p>
        Each period is approximately one and a half hours long —
        in equinox conditions, exactly 12 hours / 8 = 1 hour 30
        minutes — but in summer the daytime periods are longer
        (perhaps 1 hour 50 minutes) and the nighttime periods
        shorter; in winter the reverse. The system follows the
        unequal-hora principle we discussed in the vara chapter.
      </p>

      <p>
        The Sanskrit name <em>chau-ghadiya</em>{" "}
        <span lang="hi">(चौ-घड़िया)</span> literally means
        &ldquo;four-ghati&rdquo; — because each period is
        approximately four ghatis (4 × 24 minutes = 96 minutes,
        or 1 hour 36 minutes) on an equinox day. The name is
        descriptive of length, but the actual length varies with
        the season.
      </p>

      <FigurePlaceholder
        number="10.1"
        caption="Choghadiya structure: 8 day-periods, 8 night-periods, each colour-coded."
        captionHi="चौघड़िया की संरचना: 8 दिन-काल, 8 रात्रि-काल, प्रत्येक रंग-संकेत सहित।"
        promptHint="See Batch 1 image #8 for the Gemini prompt."
      />

      <h2>The seven names</h2>

      <p>
        Although there are 16 periods (8 day + 8 night), only{" "}
        <strong>seven names</strong> are used. They cycle. The
        names, with their qualities:
      </p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>देवनागरी</th>
            <th>Meaning</th>
            <th>Quality</th>
            <th>Ruling graha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Udveg</strong></td>
            <td lang="hi">उद्वेग</td>
            <td>Anxiety, agitation</td>
            <td className="text-red-400">Inauspicious</td>
            <td>Sun (Surya)</td>
          </tr>
          <tr>
            <td><strong>Char</strong></td>
            <td lang="hi">चर</td>
            <td>Movable, transient</td>
            <td className="text-yellow-400">Neutral / Good</td>
            <td>Venus (Shukra)</td>
          </tr>
          <tr>
            <td><strong>Labh</strong></td>
            <td lang="hi">लाभ</td>
            <td>Profit, gain</td>
            <td className="text-green-400">Auspicious</td>
            <td>Mercury (Budh)</td>
          </tr>
          <tr>
            <td><strong>Amrit</strong></td>
            <td lang="hi">अमृत</td>
            <td>Nectar, immortality</td>
            <td className="text-green-400">Highly auspicious</td>
            <td>Moon (Chandra)</td>
          </tr>
          <tr>
            <td><strong>Kaal</strong></td>
            <td lang="hi">काल</td>
            <td>Time, death</td>
            <td className="text-red-400">Inauspicious</td>
            <td>Saturn (Shani)</td>
          </tr>
          <tr>
            <td><strong>Shubh</strong></td>
            <td lang="hi">शुभ</td>
            <td>Auspicious, good</td>
            <td className="text-green-400">Auspicious</td>
            <td>Jupiter (Guru)</td>
          </tr>
          <tr>
            <td><strong>Rog</strong></td>
            <td lang="hi">रोग</td>
            <td>Disease, illness</td>
            <td className="text-red-400">Inauspicious</td>
            <td>Mars (Mangala)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Of the seven, three are clearly inauspicious (Udveg,
        Kaal, Rog), three are clearly auspicious (Labh, Amrit,
        Shubh), and one is neutral-leaning-good (Char — useful
        for travel and mobility-related work specifically).
      </p>

      <h2>The connection to the hora system</h2>

      <p>
        Recall the hora system from chapter 3. Each of the 24
        horas of a day is ruled by one of the seven planets, in
        Chaldean order (Saturn-Jupiter-Mars-Sun-Venus-Mercury-Moon).
        The choghadiya names are derived from a remixing of this
        same planetary cycle.
      </p>

      <p>
        Specifically: the choghadiya names map to grahas as we
        listed above. The <strong>first choghadiya of each
        day</strong> is the one ruled by the same graha that
        rules the day:
      </p>

      <ul>
        <li>Sunday (Sun&rsquo;s day) — first day-choghadiya = Udveg (Sun-ruled).</li>
        <li>Monday (Moon&rsquo;s day) — first day-choghadiya = Amrit (Moon-ruled).</li>
        <li>Tuesday (Mars-ruled) — first day-choghadiya = Rog.</li>
        <li>Wednesday (Mercury-ruled) — first day-choghadiya = Labh.</li>
        <li>Thursday (Jupiter-ruled) — first day-choghadiya = Shubh.</li>
        <li>Friday (Venus-ruled) — first day-choghadiya = Char.</li>
        <li>Saturday (Saturn-ruled) — first day-choghadiya = Kaal.</li>
      </ul>

      <p>
        From the first day-choghadiya, the rest cycle in a fixed
        order: Udveg → Char → Labh → Amrit → Kaal → Shubh →
        Rog → Udveg → ... — and continue cycling for all 8 day
        periods.
      </p>

      <p>
        The night-choghadiyas use a <em>different</em> starting
        graha-association — the night cycle starts not from the
        day&rsquo;s ruler but from the graha that is 5 places
        ahead in the cycle (a quirk of the hora-mathematics
        applied across the day-night boundary). The result is:
      </p>

      <ul>
        <li>Sunday — first night-choghadiya = Shubh.</li>
        <li>Monday — first night-choghadiya = Char.</li>
        <li>Tuesday — first night-choghadiya = Kaal.</li>
        <li>Wednesday — first night-choghadiya = Udveg.</li>
        <li>Thursday — first night-choghadiya = Amrit.</li>
        <li>Friday — first night-choghadiya = Rog.</li>
        <li>Saturday — first night-choghadiya = Labh.</li>
      </ul>

      <p>
        From the first night-choghadiya, the cycle continues in
        the same order as before: Udveg → Char → Labh → Amrit →
        Kaal → Shubh → Rog → Udveg → ...
      </p>

      <KeyIdea
        title="The first choghadiya of the day matches the day's ruling graha."
        titleHi="दिन का पहला चौघड़िया उसी ग्रह का होता है जो वार का स्वामी है"
      >
        Sunday day starts with Udveg (Sun). Monday day starts
        with Amrit (Moon). And so on. The cycle is fixed:
        Udveg-Char-Labh-Amrit-Kaal-Shubh-Rog. Day and night
        sequences both follow this order, but they start at
        different points based on the weekday.
      </KeyIdea>

      <h2>The seven choghadiyas in detail</h2>

      <h3>Udveg (Sun-ruled) — anxiety <span lang="hi">उद्वेग</span></h3>
      <p>
        Inauspicious for almost all undertakings. Particularly
        bad for journeys and beginnings. The Sun&rsquo;s
        intensity here translates to restlessness and worry. If
        you must do something during Udveg, it should be
        government-related work (paying taxes, dealing with
        authorities) — Udveg is not so bad for that, since the
        Sun rules authority.
      </p>

      <h3>Char (Venus-ruled) — movable <span lang="hi">चर</span></h3>
      <p>
        Specifically good for travel — the name <em>char</em>{" "}
        means &ldquo;moving.&rdquo; If you are starting a
        journey, Char is one of the best windows. It is not
        especially good for static or rooted activities (signing
        permanent contracts, beginning long-term construction),
        but for setting out, going somewhere, opening a
        movement-of-goods business — Char is the choghadiya
        you want.
      </p>

      <h3>Labh (Mercury-ruled) — profit <span lang="hi">लाभ</span></h3>
      <p>
        Auspicious for all material gain — business, trade,
        signing contracts, opening a shop, starting a financial
        venture, lending or borrowing money, commercial
        transactions. Mercury&rsquo;s commercial nature is the
        through-line here.
      </p>

      <h3>Amrit (Moon-ruled) — nectar <span lang="hi">अमृत</span></h3>
      <p>
        The most auspicious of all the choghadiyas. The name
        means &ldquo;immortality nectar.&rdquo; Suitable for
        anything important: starting any new venture, marriage
        ceremonies, religious observances, important meetings,
        critical decisions. If you must pick a single window
        for an important task and the regular muhurta is
        unfavourable, Amrit is the safest fallback.
      </p>

      <h3>Kaal (Saturn-ruled) — death/time <span lang="hi">काल</span></h3>
      <p>
        Strongly inauspicious. Avoid all new beginnings and
        important undertakings. The Saturn rulership gives this
        period a heavy, restrictive, slowing quality. Routine
        maintenance work and rest are acceptable; nothing else.
      </p>

      <h3>Shubh (Jupiter-ruled) — auspicious <span lang="hi">शुभ</span></h3>
      <p>
        Highly auspicious for marriage, religious ceremonies,
        beginning education, learning, philosophical and
        spiritual work, charitable acts, anything dharmic. The
        Jupiter rulership makes this the best choghadiya for
        ceremonial undertakings specifically.
      </p>

      <h3>Rog (Mars-ruled) — disease <span lang="hi">रोग</span></h3>
      <p>
        Inauspicious for new ventures and most ceremonies.
        Curiously, Rog is sometimes considered acceptable for
        military or aggressive undertakings — surgical
        operations (literally, Mars-ruled work), starting a
        legal dispute that requires force, or actions that
        involve struggle by their nature. But for ordinary
        beginnings, avoid.
      </p>

      <h2>How to read your panchang&rsquo;s choghadiya display</h2>

      <p>
        The Pramanik Panchang displays the choghadiya as a
        vertical or horizontal strip of eight periods for the
        day and another eight for the night, each labelled with
        the choghadiya name and colour-coded:
      </p>

      <ul>
        <li>Green for auspicious (Labh, Amrit, Shubh)</li>
        <li>Red for inauspicious (Udveg, Kaal, Rog)</li>
        <li>Yellow / mixed for neutral (Char)</li>
      </ul>

      <p>
        Each period shows its start and end time. To use the
        display:
      </p>

      <ol>
        <li>
          Look at the current time. Find the choghadiya it falls
          inside.
        </li>
        <li>
          Note the colour and name. If green, you are good. If
          red, consider deferring.
        </li>
        <li>
          For a future undertaking, look at the choghadiyas
          covering the planned time. Pick a green one. If your
          activity is a journey, pick Char. If it is finance,
          pick Labh. If it is religious, pick Shubh.
        </li>
      </ol>

      <h2>Choghadiya combined with vara</h2>

      <p>
        A traditional rule of thumb: <strong>combine vara and
        choghadiya</strong> for a finer reading. A graha
        ruling the choghadiya in alignment with the vara&rsquo;s
        own graha amplifies that graha&rsquo;s influence.
      </p>

      <p>
        So for example: <em>Amrit choghadiya on Monday</em> is
        an exceptionally favourable time, because Amrit is
        Moon-ruled and Monday is Moon-ruled — double Moon
        amplification. <em>Labh on Wednesday</em> is similarly
        emphatic — Mercury-on-Mercury, a strong commercial
        window. <em>Shubh on Thursday</em> — Jupiter-on-Jupiter,
        the most auspicious religious moment of the week.
      </p>

      <p>
        Conversely, <em>Kaal on Saturday</em> is
        Saturn-on-Saturn and is generally avoided for any
        beginning. <em>Rog on Tuesday</em> is Mars-on-Mars and
        considered particularly aggressive.
      </p>

      <h2>Choghadiya in Jain practice</h2>

      <p>
        Jain ritual life uses choghadiya in much the same way
        as the Vedic-Hindu tradition. Specific Jain
        observances — beginning a paushadha vrata, taking a
        new vow, undertaking a long pilgrimage to a tirtha — are
        often timed to Amrit, Shubh, or Labh. The
        Jain panchang flags the choghadiya on every day.
      </p>

      <p>
        One observation: because Jain ritual life puts heavy
        emphasis on the lunar tithi, the choghadiya is a
        secondary factor — used to fine-tune within a day
        already determined by tithi suitability rather than as
        the primary muhurta determinant.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>Name the seven choghadiyas and their qualities.</li>
        <li>Identify which graha rules each choghadiya.</li>
        <li>
          State the cycling order
          (Udveg-Char-Labh-Amrit-Kaal-Shubh-Rog) and find the
          first day-choghadiya for any given vara.
        </li>
        <li>
          Read your panchang&rsquo;s choghadiya display and
          identify the colour and name of the current period.
        </li>
        <li>
          Match a planned activity to an appropriate choghadiya
          (Char for travel, Labh for commerce, Shubh for
          religious work, Amrit for general important
          beginnings).
        </li>
        <li>
          Identify particularly favourable or unfavourable
          combinations of vara and choghadiya.
        </li>
      </ul>

      <p>
        Open your panchang now. Find the current choghadiya. Is
        it green or red? Look ahead — what does the next two
        hours look like? The next planned task you are going
        to do — does it fit the current choghadiya?
      </p>

      <p>
        In the next chapter we look at the panchang&rsquo;s most
        rigid daily windows — <strong>Rahu Kaal</strong>,{" "}
        <strong>Yamaganda</strong>, <strong>Gulika</strong>, and
        the formal <strong>muhurta</strong> selection. Where
        choghadiya is the everyday tool, these are the windows
        that classical muhurta texts treat with the greatest
        seriousness.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        चौघड़िया वह पंचांग-विशेषता है जिसका सामान्य लोग सबसे अधिक उपयोग
        करते हैं। यहाँ परम्परा गहरी है: एक भारतीय गृहस्थ यात्री किसी लंबी
        यात्रा से पहले चौघड़िया देखेगा। एक व्यापारी कोई सौदा तय करने से
        पहले देखेगा। एक पुरोहित किसी छोटे समारोह को बिना पूर्ण मुहूर्त के
        निर्धारित करने से पहले देखेगा। प्रश्न सदा वही है &mdash;{" "}
        <strong>क्या यह समय इस कार्य के लिए शुभ है?</strong>
      </p>

      <p>
        उत्तर एक रंग-संकेत और लेबल के रूप में दिया जाता है &mdash;
        &ldquo;यह डेढ़ घंटे का खण्ड अमृत है&rdquo; (शुभ), &ldquo;अगला काल
        है&rdquo; (अशुभ), &ldquo;फिर शुभ&rdquo; (शुभ) &mdash; और लोग उसी
        के अनुसार योजना बनाते हैं। इस अध्याय के अंत तक आप ठीक-ठीक समझ
        सकेंगे कि वे लेबल कैसे निकाले जाते हैं, उनमें से प्रत्येक का
        क्या अर्थ है, और वार-अध्याय में मिली होरा-पद्धति से चौघड़िया का
        क्या सम्बन्ध है।
      </p>

      <h2>संरचना &mdash; दिन के 8 खंड, रात्रि के 8 खंड</h2>

      <p>
        चौघड़िया सूर्योदय से सूर्यास्त तक के काल को{" "}
        <strong>8 बराबर खंडों</strong> में बाँटता है, और इसी प्रकार
        सूर्यास्त से अगले सूर्योदय तक को 8 बराबर खंडों में। कुल: 24 घंटे
        में 16 चौघड़िया-खंड, ऋतु के अनुसार थोड़ा झूलाव।
      </p>

      <p>
        प्रत्येक खंड लगभग डेढ़ घंटे का &mdash; विषुव पर ठीक 12 घंटे / 8 =
        1 घंटा 30 मिनट &mdash; परन्तु ग्रीष्म में दिन के खंड लंबे होते
        हैं (शायद 1 घंटा 50 मिनट) और रात्रि के छोटे; शीत में विपरीत।
        प्रणाली असमान-होरा सिद्धान्त का अनुसरण करती है, जिसकी हमने
        वार-अध्याय में चर्चा की।
      </p>

      <p>
        संस्कृत नाम <em>चौ-घड़िया</em> का शाब्दिक अर्थ है
        &ldquo;चार-घटी&rdquo; &mdash; क्योंकि विषुव पर प्रत्येक खंड लगभग
        चार घटी (4 × 24 = 96 मिनट, अथवा 1 घंटा 36 मिनट) का होता है। नाम
        लंबाई का सूचक है, परन्तु वास्तविक लंबाई ऋतु के साथ बदलती है।
      </p>

      <FigurePlaceholder
        number="10.1"
        caption="Choghadiya structure: 8 day-periods, 8 night-periods, each colour-coded."
        captionHi="चौघड़िया की संरचना: 8 दिन-काल, 8 रात्रि-काल, प्रत्येक रंग-संकेत सहित।"
        promptHint="See Batch 1 image #8 for the Gemini prompt."
      />

      <h2>सात नाम</h2>

      <p>
        यद्यपि 16 खंड हैं (8 दिन + 8 रात्रि), केवल <strong>सात नाम</strong>{" "}
        प्रयोग होते हैं। वे चक्रीय रूप से दोहराये जाते हैं। नाम और उनके
        गुण —
      </p>

      <table>
        <thead>
          <tr>
            <th>नाम</th>
            <th>लिप्यन्तरण</th>
            <th>अर्थ</th>
            <th>गुण</th>
            <th>स्वामी</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>उद्वेग</strong></td>
            <td>Udveg</td>
            <td>व्याकुलता, चिन्ता</td>
            <td className="text-red-400">अशुभ</td>
            <td>सूर्य</td>
          </tr>
          <tr>
            <td><strong>चर</strong></td>
            <td>Char</td>
            <td>चलने वाला, क्षणिक</td>
            <td className="text-yellow-400">तटस्थ / शुभ</td>
            <td>शुक्र</td>
          </tr>
          <tr>
            <td><strong>लाभ</strong></td>
            <td>Labh</td>
            <td>लाभ, प्राप्ति</td>
            <td className="text-green-400">शुभ</td>
            <td>बुध</td>
          </tr>
          <tr>
            <td><strong>अमृत</strong></td>
            <td>Amrit</td>
            <td>अमृत, अमरत्व</td>
            <td className="text-green-400">अति शुभ</td>
            <td>चन्द्र</td>
          </tr>
          <tr>
            <td><strong>काल</strong></td>
            <td>Kaal</td>
            <td>समय, मृत्यु</td>
            <td className="text-red-400">अशुभ</td>
            <td>शनि</td>
          </tr>
          <tr>
            <td><strong>शुभ</strong></td>
            <td>Shubh</td>
            <td>शुभ, अनुकूल</td>
            <td className="text-green-400">शुभ</td>
            <td>गुरु</td>
          </tr>
          <tr>
            <td><strong>रोग</strong></td>
            <td>Rog</td>
            <td>रोग, व्याधि</td>
            <td className="text-red-400">अशुभ</td>
            <td>मंगल</td>
          </tr>
        </tbody>
      </table>

      <p>
        सात में से तीन स्पष्टतः अशुभ हैं (उद्वेग, काल, रोग), तीन स्पष्टतः
        शुभ हैं (लाभ, अमृत, शुभ), और एक तटस्थ-झुकाव-शुभ (चर &mdash;
        विशेष रूप से यात्रा और गति-सम्बन्धी कार्यों के लिए उपयोगी)।
      </p>

      <h2>होरा-पद्धति से सम्बन्ध</h2>

      <p>
        अध्याय 3 की होरा-पद्धति का स्मरण कीजिए। दिन की 24 होराओं में से
        प्रत्येक का स्वामी सात ग्रहों में से एक है, कैल्डियन क्रम (शनि-
        गुरु-मंगल-सूर्य-शुक्र-बुध-चन्द्र) में। चौघड़िया-नाम इसी ग्रह-चक्र
        के पुनर्मिश्रण से निकले हैं।
      </p>

      <p>
        विशेष रूप से &mdash; चौघड़िया-नाम ऊपर सूचीबद्ध ग्रहों पर
        प्रतिचित्रित हैं। हर दिन का{" "}
        <strong>प्रथम दिन-चौघड़िया</strong> वही ग्रह से शासित होता है जो
        दिन का स्वामी है —
      </p>

      <ul>
        <li>रविवार (सूर्य का दिन) &mdash; प्रथम दिन-चौघड़िया = उद्वेग (सूर्य)।</li>
        <li>सोमवार (चन्द्र) &mdash; प्रथम दिन-चौघड़िया = अमृत (चन्द्र)।</li>
        <li>मंगलवार (मंगल) &mdash; प्रथम दिन-चौघड़िया = रोग।</li>
        <li>बुधवार (बुध) &mdash; प्रथम दिन-चौघड़िया = लाभ।</li>
        <li>गुरुवार (गुरु) &mdash; प्रथम दिन-चौघड़िया = शुभ।</li>
        <li>शुक्रवार (शुक्र) &mdash; प्रथम दिन-चौघड़िया = चर।</li>
        <li>शनिवार (शनि) &mdash; प्रथम दिन-चौघड़िया = काल।</li>
      </ul>

      <p>
        प्रथम दिन-चौघड़िया से शेष नियत क्रम में चलते हैं: उद्वेग → चर →
        लाभ → अमृत → काल → शुभ → रोग → उद्वेग → ... और सब 8 दिन-खंडों के
        लिए चक्रीय रूप से चलते रहते हैं।
      </p>

      <p>
        रात्रि के चौघड़िये एक <em>भिन्न</em> प्रारम्भिक ग्रह-संगति प्रयोग
        करते हैं &mdash; रात्रि-चक्र दिन के स्वामी से नहीं, बल्कि चक्र में
        5 स्थान आगे के ग्रह से प्रारम्भ होता है (दिन-रात की सीमा पर लगाये
        गये होरा-गणित का परिणाम)। फलस्वरूप —
      </p>

      <ul>
        <li>रविवार &mdash; प्रथम रात्रि-चौघड़िया = शुभ।</li>
        <li>सोमवार &mdash; प्रथम रात्रि-चौघड़िया = चर।</li>
        <li>मंगलवार &mdash; प्रथम रात्रि-चौघड़िया = काल।</li>
        <li>बुधवार &mdash; प्रथम रात्रि-चौघड़िया = उद्वेग।</li>
        <li>गुरुवार &mdash; प्रथम रात्रि-चौघड़िया = अमृत।</li>
        <li>शुक्रवार &mdash; प्रथम रात्रि-चौघड़िया = रोग।</li>
        <li>शनिवार &mdash; प्रथम रात्रि-चौघड़िया = लाभ।</li>
      </ul>

      <p>
        रात्रि का प्रथम चौघड़िया जो भी हो, चक्र वही उद्वेग → चर → लाभ →
        अमृत → काल → शुभ → रोग → उद्वेग → ... के क्रम में आगे बढ़ता है।
      </p>

      <KeyIdea
        title="दिन का पहला चौघड़िया उसी ग्रह का होता है जो वार का स्वामी है"
        titleHi="The first choghadiya of the day matches the day's ruling graha."
      >
        रविवार का दिन उद्वेग (सूर्य) से शुरू होता है। सोमवार का दिन अमृत
        (चन्द्र) से। और इसी प्रकार। चक्र नियत है: उद्वेग-चर-लाभ-अमृत-
        काल-शुभ-रोग। दिन और रात्रि दोनों के क्रम इसी क्रम का पालन करते
        हैं, परन्तु वे वार के अनुसार भिन्न बिन्दुओं से प्रारम्भ होते हैं।
      </KeyIdea>

      <h2>सात चौघड़ियों का विस्तृत परिचय</h2>

      <h3>उद्वेग (सूर्य) &mdash; व्याकुलता</h3>
      <p>
        लगभग सभी कार्यों के लिए अशुभ। यात्रा और नये आरम्भ के लिए विशेष
        रूप से प्रतिकूल। सूर्य की तीव्रता यहाँ अशान्ति और चिन्ता के रूप
        में बदल जाती है। यदि आपको उद्वेग में कुछ करना ही पड़े, तो वह
        सरकारी कार्य (कर भुगतान, अधिकारियों से वार्ता) हो &mdash; उद्वेग
        उसके लिए उतना अशुभ नहीं, क्योंकि सूर्य अधिकार का स्वामी है।
      </p>

      <h3>चर (शुक्र) &mdash; चलने वाला</h3>
      <p>
        यात्रा के लिए विशेष रूप से शुभ &mdash; <em>चर</em> का अर्थ ही
        &ldquo;चलना&rdquo; है। यदि आप यात्रा प्रारम्भ कर रहे हैं, तो चर
        सर्वोत्तम खण्डों में से एक है। यह स्थिर और जड़ कार्यों (स्थायी
        अनुबंधों पर हस्ताक्षर, दीर्घ-कालिक निर्माण के आरम्भ) के लिए
        विशेष रूप से शुभ नहीं, परन्तु प्रस्थान, गमन, माल-गति-व्यवसाय के
        उद्घाटन के लिए &mdash; चर वही चौघड़िया है जिसकी आपको आवश्यकता है।
      </p>

      <h3>लाभ (बुध) &mdash; प्राप्ति</h3>
      <p>
        सब प्रकार के भौतिक लाभ के लिए शुभ &mdash; व्यवसाय, व्यापार,
        अनुबंधों पर हस्ताक्षर, दुकान का उद्घाटन, वित्तीय उद्यम का प्रारम्भ,
        उधार देना अथवा लेना, वाणिज्यिक लेन-देन। बुध का व्यापारिक स्वभाव
        यहाँ का सूत्र है।
      </p>

      <h3>अमृत (चन्द्र) &mdash; अमृत</h3>
      <p>
        सब चौघड़ियों में सबसे शुभ। नाम का अर्थ &ldquo;अमरत्व का
        अमृत।&rdquo; किसी भी महत्त्वपूर्ण कार्य के लिए उपयुक्त: किसी भी
        नये उद्यम का आरम्भ, विवाह-समारोह, धार्मिक अनुष्ठान, महत्त्वपूर्ण
        बैठकें, निर्णायक निर्णय। यदि किसी महत्त्वपूर्ण कार्य के लिए एक
        ही खण्ड चुनना हो और नियमित मुहूर्त प्रतिकूल हो, तो अमृत सबसे
        सुरक्षित विकल्प है।
      </p>

      <h3>काल (शनि) &mdash; मृत्यु / समय</h3>
      <p>
        प्रबल अशुभ। सभी नये आरम्भ और महत्त्वपूर्ण उद्यमों से बचें। शनि
        का स्वामित्व इस अवधि को भारी, प्रतिबन्धात्मक, मन्द-गुण देता है।
        नियमित अनुरक्षण-कार्य और विश्राम स्वीकार्य; अन्य कुछ नहीं।
      </p>

      <h3>शुभ (गुरु) &mdash; शुभ</h3>
      <p>
        विवाह, धार्मिक समारोह, शिक्षा का आरम्भ, अध्ययन, दार्शनिक और
        आध्यात्मिक कार्य, दानी कर्म, धर्म-सम्बन्धी सब कुछ &mdash; इन सबके
        लिए अति शुभ। गुरु का स्वामित्व इसे विशेष रूप से समारोहिक उद्यमों
        का सर्वोत्तम चौघड़िया बनाता है।
      </p>

      <h3>रोग (मंगल) &mdash; व्याधि</h3>
      <p>
        नये उद्यमों और अधिकांश समारोहों के लिए अशुभ। जिज्ञासाजनक रूप से,
        रोग सैनिक अथवा आक्रामक उद्यमों के लिए कभी-कभी स्वीकार्य माना जाता
        है &mdash; शल्यक्रिया (जो शाब्दिक रूप से मंगल-शासित कार्य है),
        बल-आवश्यक विधिक विवाद का प्रारम्भ, अथवा वे क्रियाएँ जिनमें
        स्वभाव से ही संघर्ष है। परन्तु सामान्य आरम्भों के लिए वर्जित।
      </p>

      <h2>आपके पंचांग का चौघड़िया-प्रदर्शन कैसे पढ़ें</h2>

      <p>
        प्रामाणिक पंचांग चौघड़िया को दिन के लिए आठ खंडों की एक ऊर्ध्वाधर
        अथवा क्षैतिज पट्टी और रात्रि के लिए और आठ की पट्टी के रूप में
        प्रदर्शित करता है, हर एक चौघड़िया-नाम और रंग-संकेत के साथ —
      </p>

      <ul>
        <li>शुभ के लिए हरा (लाभ, अमृत, शुभ)</li>
        <li>अशुभ के लिए लाल (उद्वेग, काल, रोग)</li>
        <li>तटस्थ के लिए पीला / मिश्रित (चर)</li>
      </ul>

      <p>हर खंड का प्रारम्भ और समाप्ति-समय दिखाया जाता है। प्रदर्शन का प्रयोग —</p>

      <ol>
        <li>वर्तमान समय देखिए। उसमें कौन-सा चौघड़िया चल रहा है, ढूँढिए।</li>
        <li>
          रंग और नाम नोट कीजिए। यदि हरा, तो आप सुरक्षित हैं। यदि लाल, तो
          टालने पर विचार कीजिए।
        </li>
        <li>
          भावी कार्य के लिए, नियोजित समय के चौघड़िये देखिए। एक हरा चुनिए।
          यदि कार्य यात्रा है, चर चुनिए। यदि वित्तीय, लाभ। यदि धार्मिक,
          शुभ।
        </li>
      </ol>

      <h2>चौघड़िया वार के साथ मिलाकर</h2>

      <p>
        एक पारम्परिक नियम है &mdash; <strong>वार और चौघड़िया मिलाकर</strong>{" "}
        देखें, अधिक सूक्ष्म पठन के लिए। चौघड़िया का स्वामी ग्रह यदि वार
        के स्वामी ग्रह से मेल खाये, तो उस ग्रह का प्रभाव बढ़ जाता है।
      </p>

      <p>
        उदाहरण &mdash; <em>सोमवार का अमृत</em> असाधारण रूप से अनुकूल काल
        है, क्योंकि अमृत चन्द्र-शासित और सोमवार चन्द्र-शासित &mdash; दोहरा
        चन्द्र। <em>बुधवार का लाभ</em> इसी प्रकार स्पष्ट है &mdash;
        बुध-पर-बुध, एक प्रबल वाणिज्यिक खण्ड। <em>गुरुवार का शुभ</em>{" "}
        &mdash; गुरु-पर-गुरु, सप्ताह का सर्वाधिक शुभ धार्मिक क्षण।
      </p>

      <p>
        विपरीत रूप से, <em>शनिवार का काल</em> शनि-पर-शनि है और किसी भी
        आरम्भ के लिए सामान्यतः टाल दिया जाता है। <em>मंगलवार का रोग</em>{" "}
        मंगल-पर-मंगल है और विशेष रूप से आक्रामक माना जाता है।
      </p>

      <h2>जैन व्यवहार में चौघड़िया</h2>

      <p>
        जैन अनुष्ठान-जीवन चौघड़िया का प्रयोग वैदिक-हिन्दू परम्परा की तरह
        ही करता है। विशिष्ट जैन क्रियाएँ &mdash; पौषध-व्रत का आरम्भ, नया
        व्रत-संकल्प, किसी तीर्थ की दीर्घ यात्रा &mdash; प्रायः अमृत, शुभ
        अथवा लाभ चौघड़िये पर निर्धारित की जाती हैं। जैन पंचांग प्रत्येक
        दिन का चौघड़िया चिह्नित करता है।
      </p>

      <p>
        एक अवलोकन &mdash; चूँकि जैन अनुष्ठान-जीवन चन्द्र-तिथि पर अधिक
        भार देता है, चौघड़िया एक द्वितीयक कारक है &mdash; उस दिन के भीतर
        सूक्ष्म-समायोजन के लिए जिसकी तिथि-अनुकूलता पहले निर्धारित हो चुकी
        हो, न कि प्राथमिक मुहूर्त-निर्धारक के रूप में।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>सात चौघड़ियों के नाम और उनके गुण बता सकें।</li>
        <li>हर चौघड़िये का स्वामी ग्रह पहचान सकें।</li>
        <li>
          चक्र-क्रम (उद्वेग-चर-लाभ-अमृत-काल-शुभ-रोग) बता सकें और किसी भी
          वार का प्रथम दिन-चौघड़िया निकाल सकें।
        </li>
        <li>
          पंचांग का चौघड़िया-प्रदर्शन पढ़कर वर्तमान खण्ड का रंग और नाम
          पहचान सकें।
        </li>
        <li>
          नियोजित कार्य को उपयुक्त चौघड़िये से मिला सकें (यात्रा के लिए
          चर, वाणिज्य के लिए लाभ, धार्मिक कार्य के लिए शुभ, सामान्य
          महत्त्वपूर्ण आरम्भ के लिए अमृत)।
        </li>
        <li>
          वार और चौघड़िये के विशेष रूप से अनुकूल अथवा प्रतिकूल संयोग
          पहचान सकें।
        </li>
      </ul>

      <p>
        अभी अपना पंचांग खोलिए। वर्तमान चौघड़िया देखिए। हरा है या लाल?
        आगे देखिए &mdash; अगले दो घंटों में क्या आता है? अगला कार्य जो
        आप करने वाले हैं &mdash; क्या वह वर्तमान चौघड़िये से मेल खाता
        है?
      </p>

      <p>
        अगले अध्याय में हम पंचांग की सबसे कठोर दैनिक अवधियों को देखेंगे
        &mdash; <strong>राहु काल</strong>, <strong>यमगण्ड</strong>,{" "}
        <strong>गुलिक</strong>, और औपचारिक <strong>मुहूर्त</strong>-चयन।
        जहाँ चौघड़िया सामान्य उपयोग का साधन है, वहाँ ये वे अवधियाँ हैं
        जिन्हें शास्त्रीय मुहूर्त-ग्रंथ सर्वाधिक गम्भीरता से लेते हैं।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

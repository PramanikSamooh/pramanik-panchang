import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("vara")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        At first glance, vara <span lang="hi">(वार)</span> — the weekday —
        seems like the easiest of the five limbs. Today is Tuesday. Tomorrow
        is Wednesday. What more is there to say?
      </p>

      <p>
        Quite a lot, as it turns out. The order of the days of the week
        is not an arbitrary cultural convention. It is the answer to a
        specific astronomical question, and the answer involves a small
        but very satisfying piece of arithmetic that every literate
        person before the modern age knew, and almost nobody learns
        today. By the end of this chapter, you will know why the
        sequence is Sun → Moon → Mars → Mercury → Jupiter → Venus →
        Saturn — and why this same order shows up in calendars across
        India, Babylon, Greece, and Rome.
      </p>

      <h2>Seven days, seven grahas</h2>

      <p>
        The Indian week, like the Western one, has seven days. Each day
        is named for one of the seven luminaries — that is, the five
        classical planets visible to the naked eye plus the Sun and the
        Moon. (Rahu and Ketu, the lunar nodes, do not get weekdays of
        their own. They are not luminaries; they are the points where the
        Moon&rsquo;s orbit crosses the ecliptic. We will meet them in the
        chapter on grahas.)
      </p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Vara</th>
            <th>देवनागरी</th>
            <th>Ruling graha</th>
            <th>English</th>
            <th>Etymology</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ravivara</td>
            <td lang="hi">रविवार</td>
            <td>Surya / Sun <span lang="hi">सूर्य</span></td>
            <td>Sunday</td>
            <td>&ldquo;Sun&rsquo;s day&rdquo; (Old English Sunnandæg)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Somavara</td>
            <td lang="hi">सोमवार</td>
            <td>Chandra / Moon <span lang="hi">चन्द्र</span></td>
            <td>Monday</td>
            <td>&ldquo;Moon&rsquo;s day&rdquo;</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mangalavara</td>
            <td lang="hi">मंगलवार</td>
            <td>Mangala / Mars <span lang="hi">मंगल</span></td>
            <td>Tuesday</td>
            <td>&ldquo;Tiw&rsquo;s day&rdquo; — Tiw was the Norse war god, equivalent to Mars</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Budhavara</td>
            <td lang="hi">बुधवार</td>
            <td>Budha / Mercury <span lang="hi">बुध</span></td>
            <td>Wednesday</td>
            <td>&ldquo;Woden&rsquo;s day&rdquo; — Woden / Odin = Mercury</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Guruvara / Brihaspativara</td>
            <td lang="hi">गुरुवार / बृहस्पतिवार</td>
            <td>Guru / Jupiter <span lang="hi">गुरु, बृहस्पति</span></td>
            <td>Thursday</td>
            <td>&ldquo;Thor&rsquo;s day&rdquo; — Thor = Jupiter</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Shukravara</td>
            <td lang="hi">शुक्रवार</td>
            <td>Shukra / Venus <span lang="hi">शुक्र</span></td>
            <td>Friday</td>
            <td>&ldquo;Frigg&rsquo;s day&rdquo; — Frigg = Venus</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Shanivara</td>
            <td lang="hi">शनिवार</td>
            <td>Shani / Saturn <span lang="hi">शनि</span></td>
            <td>Saturday</td>
            <td>&ldquo;Saturn&rsquo;s day&rdquo; — directly preserved from Latin</td>
          </tr>
        </tbody>
      </table>

      <p>
        Notice that the correspondence between Indian and Western
        weekdays is exact. Both traditions associate the same day with
        the same graha. Sunday is the Sun&rsquo;s day in Sanskrit,
        English, Latin, and Greek. Tuesday is Mars&rsquo;s day in all of
        them, even though the names of the war-god change between
        cultures (Mangala, Mars, Tiw, Ares). This is not a coincidence
        and not a borrowing in either direction. The seven-day week with
        this specific planetary order is one of the most widely
        documented cross-cultural inheritances in human history,
        appearing independently in Babylonian astronomical records, the
        Hellenistic world, and Indian texts roughly contemporaneously.
      </p>

      <h2>Why this particular order?</h2>

      <p>
        Here is the puzzle. Suppose you wanted to put the seven
        luminaries in some order. You could pick any order. Why
        specifically Sun → Moon → Mars → Mercury → Jupiter → Venus →
        Saturn?
      </p>

      <p>
        Note that this order is not the order of distance from Earth.
        That order, in the geocentric system used by all classical
        astronomy (Indian and Greek alike), is — from closest to Earth
        outward — Moon, Mercury, Venus, Sun, Mars, Jupiter, Saturn. This
        sequence reflects the apparent speed of each body across the
        sky: the Moon completes its cycle in ~29 days, Mercury in ~88,
        Venus in ~225, the Sun in ~365, Mars in ~687, Jupiter in ~12
        years, Saturn in ~29 years. Slower-moving bodies were inferred
        to be more distant, since something farther away takes longer
        to traverse a given angle.
      </p>

      <p>
        So the Chaldean order (the geocentric order by orbital period)
        is:
      </p>

      <blockquote>
        Saturn → Jupiter → Mars → Sun → Venus → Mercury → Moon
      </blockquote>

      <p>
        Slowest to fastest. But the days of the week are not in this
        order. They jump around: Sun, Moon, Mars, Mercury, Jupiter,
        Venus, Saturn. The pattern is hidden, but it is exact.
      </p>

      <h2>The hora system: hours of the day are also planetary</h2>

      <p>
        Here is the key idea. In the classical scheme, the day from
        sunrise to next sunrise is divided into <strong>24 hours</strong>{" "}
        (the <em>hora</em>{" "}
        <span lang="hi">(होरा)</span> — the same word that gives us the
        English &ldquo;hour&rdquo;), and <em>each hour is also ruled by
        one of the seven grahas</em>, in the Chaldean order, repeating
        cyclically.
      </p>

      <p>
        The first hour of any day is ruled by the same graha that rules
        that day — that is the definition of the day&rsquo;s ruling
        graha. So:
      </p>

      <ul>
        <li>
          On Sunday (Sun&rsquo;s day), hour 1 is ruled by the Sun.
        </li>
        <li>
          Hour 2 is the next graha in the Chaldean order after the Sun
          — counting outward from the slowest. The Chaldean order from
          slowest is Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon
          — and we cycle through it. After Sun comes Venus. So hour 2 is
          Venus.
        </li>
        <li>
          Hour 3 is Mercury. Hour 4 is the Moon. Hour 5 is Saturn.
          Hour 6 is Jupiter. Hour 7 is Mars. Hour 8 cycles back to the
          Sun. And so on.
        </li>
      </ul>

      <p>
        After 24 hours we have looped through the seven planets{" "}
        <strong>three full times</strong> (3 × 7 = 21) and{" "}
        <strong>three more steps</strong> beyond that. So:
      </p>

      <ul>
        <li>Hour 1 of Sunday: Sun</li>
        <li>Hour 22 of Sunday (= hour 1 of cycle 4): Sun</li>
        <li>Hour 23: Venus</li>
        <li>Hour 24: Mercury</li>
        <li>
          <strong>Hour 1 of the next day:</strong> the graha after
          Mercury in the Chaldean order, which is{" "}
          <strong>the Moon</strong>.
        </li>
      </ul>

      <p>
        And so the day after Sunday is Monday — the Moon&rsquo;s day.
        The same calculation, repeated:
      </p>

      <ul>
        <li>
          Monday hour 1: Moon. Hour 24 falls on Mars (count 24 steps
          through the Chaldean cycle starting from Moon). Hour 1 of the
          next day: <strong>Mars</strong>. Tuesday.
        </li>
        <li>
          Tuesday hour 1: Mars. Hour 24 + 1 lands on{" "}
          <strong>Mercury</strong>. Wednesday.
        </li>
        <li>
          Wednesday → <strong>Jupiter</strong>. Thursday.
        </li>
        <li>
          Thursday → <strong>Venus</strong>. Friday.
        </li>
        <li>
          Friday → <strong>Saturn</strong>. Saturday.
        </li>
        <li>
          Saturday → <strong>Sun</strong>. Sunday again.
        </li>
      </ul>

      <p>And the cycle closes.</p>

      <KeyIdea
        title="The weekday order is not arbitrary — it is generated by the hora rule."
        titleHi="वारों का क्रम मनमाना नहीं है — यह होरा-नियम से बनता है"
      >
        Take the seven planets in geocentric order from slowest (Saturn)
        to fastest (Moon). Assign them to hours of the day, cycling.
        After 24 hours you will have advanced by{" "}
        <strong>24 mod 7 = 3 steps</strong>. The graha three steps after
        the day&rsquo;s ruling graha (in the Chaldean order) becomes the
        ruler of the next day. That is why Sunday → Monday → Tuesday →
        Wednesday → Thursday → Friday → Saturday is the sequence it is.
      </KeyIdea>

      <p>
        This derivation is preserved in classical Indian texts (the{" "}
        <em>Brihat Samhita</em> of Varahamihira, ~550 CE, and earlier),
        in Greek texts (Vettius Valens, ~150 CE), and in Babylonian
        astronomical tablets even earlier. It is a piece of pure
        arithmetic that yielded the same answer to multiple
        civilisations, because the underlying mathematics is universal.
      </p>

      <FigurePlaceholder
        number="3.1"
        caption="The hora derivation: planets in Chaldean order, advancing 3 steps every 24 hours, generates the weekday sequence."
        captionHi="होरा से वार: 24 होरा बीतने पर 3 स्थान आगे — यही वार-क्रम बनाता है।"
        promptHint="A heptagon with the 7 planets at its vertices in the Chaldean order (Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon — slowest to fastest, going clockwise). Inside, draw arrows skipping 2 vertices at a time (i.e., advancing by 3 positions = 24 mod 7), creating a 7-pointed star pattern. Each arrow is labeled Sunday→Monday, Monday→Tuesday, etc. Bilingual labels for each planet."
      />

      <h2>The day starts at sunrise — but the hora starts at sunrise too</h2>

      <p>
        The 24 horas of a day do not all have to be of equal length. In
        the strict classical scheme, there are two sub-traditions.
      </p>

      <ul>
        <li>
          <strong>Equal horas.</strong> Sunrise to next sunrise is
          divided into 24 hours of 60 minutes each. Used for routine
          calculation.
        </li>
        <li>
          <strong>Day-night unequal horas.</strong> The interval from
          sunrise to sunset is divided into 12 daytime horas, and
          sunset to next sunrise into 12 nighttime horas. In summer,
          when the day is longer, daytime horas are longer than 60
          minutes and nighttime horas are shorter; in winter the
          reverse. This is the classical &ldquo;temporal hour&rdquo; of
          the Greek and Indian texts. It produces the same hora
          assignment to each hour-slot, just with different real
          durations.
        </li>
      </ul>

      <p>
        For the purpose of weekday assignment, both schemes give the
        same answer, because the 24-hour sum is the same either way.
        For finer-grained electional astrology — &ldquo;during which
        hour of today is Jupiter most favourable for starting a new
        venture?&rdquo; — the unequal-hora scheme is what is
        traditionally used.
      </p>

      <h2>What each vara is associated with</h2>

      <p>
        Once you know which graha rules a day, the qualities associated
        with that graha colour the day. We will go into the grahas in
        detail in their own chapter; this is a quick preview.
      </p>

      <h3>Ravivara — Sunday <span lang="hi">रविवार</span></h3>
      <p>
        Ruled by Surya (Sun). Associated with vitality, leadership,
        authority, the soul, the father. Worship of the Sun is
        traditional on Sundays. The colour is red or saffron. Foods
        avoided by some traditions on Sunday include salt and oil.
        Rituals like Surya Namaskar and the chanting of the Aditya
        Hridayam stotra are associated with this day.
      </p>

      <h3>Somavara — Monday <span lang="hi">सोमवार</span></h3>
      <p>
        Ruled by Chandra (Moon). Associated with the mind, emotions,
        peace, water, the mother. Worship of Shiva is associated with
        Mondays — especially during the month of Shravana — because
        Shiva wears the crescent moon. The colour is white. Mondays in
        Shravana are observed as a fast in many regions; the
        sixteen-Monday vow (<em>Solah Somvar</em>) is taken by women
        seeking marriage or marital harmony.
      </p>

      <h3>Mangalavara — Tuesday <span lang="hi">मंगलवार</span></h3>
      <p>
        Ruled by Mangala (Mars). Associated with energy, courage,
        siblings, conflict, blood, surgery. Worship of Hanuman is
        associated with Tuesdays in much of North India — Hanuman is
        considered an aspect of, or under the protection of, Mars. The
        colour is red. The day is considered inauspicious for certain
        activities (cutting hair, starting a journey westward) by
        some traditions but auspicious for activities requiring
        courage.
      </p>

      <h3>Budhavara — Wednesday <span lang="hi">बुधवार</span></h3>
      <p>
        Ruled by Budha (Mercury). Associated with intellect,
        communication, commerce, learning, scholars. Worship of
        Ganesha is associated with Wednesdays — Ganesha is the deity of
        wisdom and removes obstacles to clear thinking. The colour is
        green. The day is considered auspicious for academic
        beginnings, business launches, and signing contracts.
      </p>

      <h3>Guruvara — Thursday <span lang="hi">गुरुवार</span></h3>
      <p>
        Ruled by Guru (Jupiter, also called Brihaspati). Associated with
        wisdom, teachers, religion, dharma, expansion, gold. Worship of
        Vishnu is traditional on Thursdays, as is the worship of
        one&rsquo;s personal guru. The colour is yellow. Thursday is
        considered universally auspicious — for marriages, beginning
        spiritual practices, taking vows, and launching long-term
        endeavours.
      </p>

      <h3>Shukravara — Friday <span lang="hi">शुक्रवार</span></h3>
      <p>
        Ruled by Shukra (Venus). Associated with love, marriage, the
        arts, beauty, vehicles, luxury, women, the goddess. Worship of
        Lakshmi and Durga is traditional on Fridays. The colour is
        white or light pastel. Friday is considered auspicious for
        marriage, romance, artistic undertakings, purchasing
        ornaments and clothing, and devotional worship of female
        deities.
      </p>

      <h3>Shanivara — Saturday <span lang="hi">शनिवार</span></h3>
      <p>
        Ruled by Shani (Saturn). Associated with discipline, slow but
        permanent gains, justice, suffering, hard work, longevity,
        servants, the marginalised, machinery, and karma. Worship of
        Shani himself, of Hanuman (who is said to protect against
        Shani&rsquo;s harshness), and of Bhairava is traditional on
        Saturdays. The colour is black or dark blue. Saturday is
        considered inauspicious for new ventures by some traditions
        but ideal for deeply considered, long-term commitments — the
        opposite of impulsive starts.
      </p>

      <p>
        These associations are not arbitrary either. They follow from
        the Sanskrit semantic field around each graha, the visual
        appearance of the body (Mars looks red; the Moon looks pale;
        Saturn moves slowly and is dim), and centuries of ritual
        accretion. Whether you accept the predictive layer or not, the
        associations are coherent and well-documented.
      </p>

      <h2>The vara starts at sunrise — and the boundary case</h2>

      <p>
        In the modern civil calendar, a day begins at midnight. In the
        Indian tradition, as we have seen, a day begins at sunrise. So
        what about the period between midnight and sunrise — say, 2 AM
        on what your phone calls Tuesday? In the panchang sense, that
        is still <strong>Monday</strong> (Somavara), because Tuesday
        does not begin until sunrise.
      </p>

      <p>
        This matters when reading classical texts. A statement like
        &ldquo;the eclipse occurred on Saturday at the second prahar
        of the night&rdquo; is talking about the night that{" "}
        <em>follows</em> Saturday daytime — so it is what your modern
        clock would call Sunday morning, perhaps 1 AM Sunday. The
        traditional vara has not yet rolled over because the sun has
        not yet risen.
      </p>

      <KeyIdea
        title="A panchang day = sunrise to next sunrise."
        titleHi="पंचांग का दिन = सूर्योदय से अगले सूर्योदय तक"
      >
        Pre-dawn hours belong to the previous vara. If you are reading
        a tradition text that names a vara and a time-of-night, do not
        translate it as &ldquo;that night by the modern calendar&rdquo;
        — translate it as &ldquo;the night that comes after that
        vara&rsquo;s daytime,&rdquo; even if the modern clock has
        rolled past midnight.
      </KeyIdea>

      <h2>Vara and the seven-day cycle in Jain tradition</h2>

      <p>
        Jain texts adopt the same seven-vara cycle and the same graha
        rulerships, but Jain ritual life often foregrounds the lunar
        calendar (tithi, paksha, month) more strongly than the
        weekday. Major Jain observances are pinned to tithis, not
        varas. The vara features in the panchang as one of the five
        limbs and as a factor in determining choghadiya (which we will
        see in a later chapter), but it does not carry the same
        festival weight that tithi does.
      </p>

      <p>
        Some Jain communities do observe particular practices on
        specific varas — for example, the avoidance of certain foods on
        certain days as part of dietary discipline. These conventions
        vary by region and sect.
      </p>

      <h2>Why is the week seven days at all?</h2>

      <p>
        We often take seven for granted, but it is worth asking. There
        is no astronomical event with a seven-day period. The Moon does
        not return to anything every seven days. Earth does not. There
        is no observational astronomical reason for a seven-fold week.
      </p>

      <p>
        The most likely answer is that seven was chosen because it is
        roughly a quarter of the synodic month: 29.5 ÷ 4 ≈ 7.4 days.
        The four phases of the Moon — new, first quarter, full, last
        quarter — are roughly seven-day intervals, and watching the
        Moon&rsquo;s phase is the simplest naked-eye calendar a
        non-literate community can keep. This connection to the lunar
        phases is preserved in many cultures: the Babylonian seven-day
        week, the Hebrew Sabbath cycle, the Greco-Roman planetary
        week, and the Indian saptaha all share roots that very likely
        go back to a lunar phase observation.
      </p>

      <p>
        Then, on top of the seven-day count, the seven luminaries
        (Sun, Moon, five visible planets) provided seven natural
        objects to assign to each day — a remarkable coincidence
        that fixes the system across cultures.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>Name the seven varas and the graha that rules each.</li>
        <li>
          State the Chaldean order (Saturn-Jupiter-Mars-Sun-Venus-Mercury-Moon
          from slowest to fastest geocentric apparent motion).
        </li>
        <li>
          Derive the weekday sequence from the hora rule: 24 hours mod
          7 planets = 3 steps forward in the Chaldean order each day.
        </li>
        <li>
          Explain why the vara matches between Indian and Western
          calendars day-by-day, and why this is not coincidence.
        </li>
        <li>
          State the qualitative association of each graha with its
          vara (vitality for Sun, mind for Moon, etc.).
        </li>
        <li>
          Distinguish equal-hora vs day-night unequal-hora schemes,
          and know which is used for vara determination.
        </li>
        <li>
          Correctly read a classical reference like &ldquo;the second
          prahar of Saturday night&rdquo; and identify what civil
          clock time it points to.
        </li>
      </ul>

      <p>
        Open the daily panchang on this site. Today&rsquo;s vara is at
        the top. Note its ruling graha. Now check tomorrow&rsquo;s
        vara — its graha should be the one you reach by counting three
        steps forward in the Chaldean order from today&rsquo;s ruler.
        If today is Tuesday (Mars), three steps forward in
        Saturn-Jupiter-Mars-Sun-Venus-Mercury-Moon should give you
        Mercury. And tomorrow is indeed Wednesday — Mercury&rsquo;s
        day. The mathematics works.
      </p>

      <p>
        In the next chapter we move from the simplest of the five
        limbs to the most ornate — the <strong>nakshatra</strong>, the
        27 lunar mansions. Each nakshatra has a name, a symbol, a
        deity, and a character; together they form the most ancient
        layer of Indian sky-mapping, predating even the twelve-rashi
        zodiac.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        प्रथम दृष्टि में वार &mdash; सप्ताह का दिन &mdash; पाँच अंगों में
        सबसे सरल लगता है। आज मंगलवार है। कल बुधवार होगा। और क्या कहना है?
      </p>

      <p>
        वस्तुतः बहुत कुछ। सप्ताह के दिनों का क्रम कोई मनमानी सांस्कृतिक
        परिपाटी नहीं है। यह एक विशिष्ट खगोलीय प्रश्न का उत्तर है, और उत्तर
        में एक छोटा परन्तु अत्यंत संतोषजनक अंकगणितीय युक्ति निहित है &mdash;
        ऐसी जो आधुनिक काल से पहले प्रत्येक शिक्षित व्यक्ति को ज्ञात थी, और
        आज लगभग किसी को नहीं सिखायी जाती। इस अध्याय के अंत तक आप समझ सकेंगे
        कि क्रम क्यों रवि → सोम → मंगल → बुध → गुरु → शुक्र → शनि है &mdash;
        और यही क्रम भारत, बेबीलोन, ग्रीस तथा रोम के कैलेंडरों में क्यों
        प्रकट होता है।
      </p>

      <h2>सात दिन, सात ग्रह</h2>

      <p>
        भारतीय सप्ताह में, पाश्चात्य की तरह, सात दिन हैं। प्रत्येक दिन का
        नाम सात ज्योतिर्मानों में से एक के नाम पर है &mdash; अर्थात् नंगी
        आँख से दिखने वाले पाँच ग्रह तथा सूर्य और चन्द्रमा। (राहु और केतु,
        जो चन्द्र-पात हैं, अपने वार नहीं रखते। वे ज्योतिर्मान नहीं हैं;
        वे चन्द्रमा की कक्षा के क्रान्तिवृत्त को काटने के बिन्दु हैं। हम
        उनसे ग्रहों के अध्याय में मिलेंगे।)
      </p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>वार</th>
            <th>स्वामी ग्रह</th>
            <th>अंग्रेज़ी</th>
            <th>व्युत्पत्ति</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>रविवार</td><td>सूर्य / Surya</td><td>Sunday</td><td>&ldquo;सूर्य का दिन&rdquo; (पुरानी अंग्रेज़ी Sunnandæg)</td></tr>
          <tr><td>2</td><td>सोमवार</td><td>चन्द्र / Chandra</td><td>Monday</td><td>&ldquo;चन्द्र का दिन&rdquo;</td></tr>
          <tr><td>3</td><td>मंगलवार</td><td>मंगल / Mangala</td><td>Tuesday</td><td>&ldquo;तिऊ का दिन&rdquo; &mdash; तिऊ नॉर्स युद्ध-देव, मंगल का समकक्ष</td></tr>
          <tr><td>4</td><td>बुधवार</td><td>बुध / Budha</td><td>Wednesday</td><td>&ldquo;वोडन का दिन&rdquo; &mdash; वोडन / ओडिन = बुध</td></tr>
          <tr><td>5</td><td>गुरुवार / बृहस्पतिवार</td><td>गुरु / Brihaspati</td><td>Thursday</td><td>&ldquo;थोर का दिन&rdquo; &mdash; थोर = बृहस्पति</td></tr>
          <tr><td>6</td><td>शुक्रवार</td><td>शुक्र / Shukra</td><td>Friday</td><td>&ldquo;फ्रिग का दिन&rdquo; &mdash; फ्रिग = शुक्र</td></tr>
          <tr><td>7</td><td>शनिवार</td><td>शनि / Shani</td><td>Saturday</td><td>&ldquo;सटर्न का दिन&rdquo; &mdash; सीधे लैटिन से</td></tr>
        </tbody>
      </table>

      <p>
        ध्यान दीजिए, भारतीय और पाश्चात्य वारों का संगति-मेल बिल्कुल सटीक है।
        दोनों परम्पराएँ एक ही दिन को एक ही ग्रह से जोड़ती हैं। संस्कृत,
        अंग्रेज़ी, लैटिन और ग्रीक &mdash; सभी में रविवार सूर्य का दिन है।
        सभी में मंगलवार युद्ध-देव का दिन है, चाहे युद्ध-देव का नाम बदलता
        जाये (मंगल, मार्स, तिऊ, अरेस)। यह न तो संयोग है, न ही किसी एक से
        दूसरे का उधार। इस विशिष्ट क्रम के साथ सात-दिवसीय सप्ताह मानव इतिहास
        की सबसे व्यापक रूप से प्रलेखित अंतर-संस्कृति विरासतों में से एक है,
        जो लगभग समकालीन रूप से बेबीलोनी खगोलीय अभिलेखों, ग्रीको-रोमी जगत्
        और भारतीय ग्रंथों में स्वतंत्र रूप से प्रकट हुआ।
      </p>

      <h2>यही विशिष्ट क्रम क्यों?</h2>

      <p>
        पहेली यह है &mdash; मान लीजिए आपको सात ज्योतिर्मानों को किसी क्रम
        में रखना है। कोई भी क्रम चुना जा सकता है। तो ठीक रवि → सोम → मंगल →
        बुध → गुरु → शुक्र → शनि ही क्यों?
      </p>

      <p>
        ध्यान दीजिए, यह क्रम पृथ्वी से दूरी के अनुसार नहीं है। पृथ्वी-केन्द्रित
        प्रणाली में &mdash; जिसका शास्त्रीय खगोल विज्ञान (भारतीय और ग्रीक
        दोनों) उपयोग करता था &mdash; पृथ्वी से बाहर की ओर क्रम है: चन्द्र,
        बुध, शुक्र, सूर्य, मंगल, गुरु, शनि। यह क्रम प्रत्येक ज्योतिर्मान की
        आकाश में प्रत्यक्ष गति का प्रतिबिम्ब है &mdash; चन्द्रमा अपना चक्र
        ~29 दिन में, बुध ~88 दिन, शुक्र ~225 दिन, सूर्य ~365, मंगल ~687,
        गुरु ~12 वर्ष, शनि ~29 वर्ष में पूरा करता है। धीमे चलने वाले को
        अधिक दूर अनुमानित किया गया, क्योंकि अधिक दूर की वस्तु को किसी कोण
        को पार करने में अधिक समय लगता है।
      </p>

      <p>
        अतः <strong>कैल्डियन क्रम</strong> (पृथ्वी-केन्द्रित कक्षीय अवधि से
        सबसे धीमे से सबसे तेज़) है —
      </p>

      <blockquote>
        शनि → गुरु → मंगल → सूर्य → शुक्र → बुध → चन्द्र
      </blockquote>

      <p>
        सबसे धीमे से सबसे तेज़। परन्तु सप्ताह के दिन इस क्रम में नहीं हैं।
        वे कूदते हैं &mdash; रवि, सोम, मंगल, बुध, गुरु, शुक्र, शनि। पैटर्न
        छिपा है, परन्तु सटीक है।
      </p>

      <h2>होरा-पद्धति &mdash; दिन के घंटे भी ग्रहीय हैं</h2>

      <p>
        यही मूल विचार है। शास्त्रीय योजना में सूर्योदय से अगले सूर्योदय
        तक का दिन <strong>24 घंटों</strong> में बाँटा जाता है (<em>होरा</em>{" "}
        &mdash; वही शब्द जो अंग्रेज़ी &ldquo;hour&rdquo; का जनक है), और
        <em>प्रत्येक होरा का भी एक स्वामी ग्रह होता है</em> &mdash; कैल्डियन
        क्रम में, चक्रीय पुनरावृत्ति के साथ।
      </p>

      <p>
        किसी भी दिन की प्रथम होरा का स्वामी वही ग्रह है जो उस दिन (वार) का
        स्वामी है &mdash; यही उस दिन के स्वामी ग्रह की परिभाषा है। अतः —
      </p>

      <ul>
        <li>
          रविवार (सूर्य का दिन) पर 1ली होरा का स्वामी सूर्य।
        </li>
        <li>
          2री होरा का स्वामी कैल्डियन क्रम में सूर्य के बाद वाला &mdash;
          सबसे धीमे से गिनते हुए शनि, गुरु, मंगल, सूर्य, शुक्र, बुध, चन्द्र,
          और हम चक्रीय रूप से चलते हैं। सूर्य के बाद शुक्र। अतः 2री होरा
          शुक्र की।
        </li>
        <li>
          3री होरा बुध की। 4थी चन्द्र की। 5वीं शनि की। 6ठी गुरु की। 7वीं
          मंगल की। 8वीं फिर सूर्य पर लौटती है। और इसी प्रकार आगे।
        </li>
      </ul>

      <p>
        24 होरा के बाद हम सात ग्रहों के <strong>तीन पूर्ण चक्र</strong>{" "}
        (3 × 7 = 21) और <strong>तीन और स्थान</strong> चल चुके हैं। अतः —
      </p>

      <ul>
        <li>रविवार की होरा 1: सूर्य</li>
        <li>रविवार की होरा 22 (= चक्र 4 की होरा 1): सूर्य</li>
        <li>होरा 23: शुक्र</li>
        <li>होरा 24: बुध</li>
        <li>
          <strong>अगले दिन की होरा 1:</strong> कैल्डियन क्रम में बुध के
          बाद का ग्रह &mdash; <strong>चन्द्रमा</strong>।
        </li>
      </ul>

      <p>
        और रविवार के बाद का दिन सोमवार है &mdash; चन्द्र का दिन। यही गणना
        दोहराई जाती है —
      </p>

      <ul>
        <li>
          सोमवार की होरा 1: चन्द्र। होरा 24 कैल्डियन चक्र में चन्द्र से 24
          स्थान आगे &mdash; मंगल पर पड़ती है। अगले दिन की होरा 1:{" "}
          <strong>मंगल</strong>। मंगलवार।
        </li>
        <li>
          मंगलवार की होरा 1: मंगल। 24 + 1 स्थान आगे &mdash;{" "}
          <strong>बुध</strong>। बुधवार।
        </li>
        <li>बुधवार → <strong>गुरु</strong>। गुरुवार।</li>
        <li>गुरुवार → <strong>शुक्र</strong>। शुक्रवार।</li>
        <li>शुक्रवार → <strong>शनि</strong>। शनिवार।</li>
        <li>शनिवार → <strong>सूर्य</strong>। फिर रविवार।</li>
      </ul>

      <p>और चक्र पूरा हो जाता है।</p>

      <KeyIdea
        title="वारों का क्रम मनमाना नहीं है — यह होरा-नियम से बनता है"
        titleHi="The weekday order is not arbitrary — it is generated by the hora rule."
      >
        सात ग्रहों को पृथ्वी-केन्द्रित क्रम में सबसे धीमे (शनि) से सबसे तेज़
        (चन्द्र) तक रखिए। इन्हें दिन के होराओं को चक्रीय रूप से सौंपिए। 24
        घंटों के बाद आप <strong>24 mod 7 = 3 स्थान</strong> आगे बढ़ चुके
        हैं। कैल्डियन क्रम में दिन के स्वामी ग्रह से तीन स्थान आगे का ग्रह
        अगले दिन का स्वामी बन जाता है। यही कारण है कि क्रम रवि → सोम →
        मंगल → बुध → गुरु → शुक्र → शनि है।
      </KeyIdea>

      <p>
        यह व्युत्पत्ति शास्त्रीय भारतीय ग्रंथों में सुरक्षित है (वराहमिहिर
        की <em>बृहत् संहिता</em>, ~550 ई., और उससे पहले के ग्रंथ), ग्रीक
        ग्रंथों में (वेत्तियस वालेन्स, ~150 ई.), और इससे भी प्राचीन
        बेबीलोनी खगोलीय पट्टिकाओं में। यह शुद्ध अंकगणित का एक टुकड़ा है
        जिसने अनेक सभ्यताओं को एक ही उत्तर दिया, क्योंकि अंतर्निहित गणित
        सार्वभौम है।
      </p>

      <FigurePlaceholder
        number="3.1"
        caption="The hora derivation: planets in Chaldean order, advancing 3 steps every 24 hours, generates the weekday sequence."
        captionHi="होरा से वार: 24 होरा बीतने पर 3 स्थान आगे — यही वार-क्रम बनाता है।"
        promptHint="See Batch 1 image #7 for the Gemini prompt."
      />

      <h2>दिन सूर्योदय से प्रारम्भ होता है &mdash; होरा भी सूर्योदय से</h2>

      <p>
        दिन की 24 होराओं की लंबाई बराबर हो, यह आवश्यक नहीं है। शास्त्रीय
        योजना में दो उप-परम्पराएँ हैं —
      </p>

      <ul>
        <li>
          <strong>समान होरा।</strong> सूर्योदय से अगले सूर्योदय तक 24
          बराबर 60 मिनट के घंटों में बाँटा जाता है। दैनिक गणना के लिए।
        </li>
        <li>
          <strong>दिन-रात असमान होरा।</strong> सूर्योदय से सूर्यास्त तक के
          अंतराल को 12 बराबर दिन-होराओं में, और सूर्यास्त से अगले सूर्योदय
          तक को 12 बराबर रात्रि-होराओं में बाँटा जाता है। ग्रीष्म में, जब
          दिन लंबा होता है, दिन की होराएँ 60 मिनट से बड़ी और रात्रि की
          होराएँ छोटी होती हैं; शीत में उल्टा। यह ग्रीक और भारतीय ग्रंथों
          की शास्त्रीय &ldquo;कालीन होरा&rdquo; है। यह वही ग्रह-वितरण
          प्रत्येक होरा-स्थान को देता है, बस वास्तविक अवधि भिन्न होती है।
        </li>
      </ul>

      <p>
        वार-निर्धारण के लिए दोनों योजनाएँ एक ही उत्तर देती हैं, क्योंकि
        24-होरा का योग दोनों में बराबर है। सूक्ष्म मुहूर्त-चयन के लिए
        &mdash; जैसे &ldquo;आज की किस होरा में गुरु किसी नये उद्यम के लिए
        सर्वाधिक अनुकूल है?&rdquo; &mdash; पारम्परिक रूप से असमान-होरा
        योजना का उपयोग होता है।
      </p>

      <h2>प्रत्येक वार किससे जुड़ा है</h2>

      <p>
        जब आप जान लेते हैं कि दिन का स्वामी ग्रह कौन-सा है, तो उस ग्रह के
        गुण उस दिन को रंग देते हैं। ग्रहों पर हम विस्तार से अलग अध्याय में
        जायेंगे; यह संक्षिप्त परिचय है।
      </p>

      <h3>रविवार</h3>
      <p>
        स्वामी सूर्य। ओज, नेतृत्व, अधिकार, आत्मा, पिता &mdash; इनसे
        सम्बन्धित। सूर्य की आराधना पारम्परिक रूप से रविवार को होती है। रंग
        लाल या केसरिया। कुछ परम्पराओं में रविवार को नमक और तेल का त्याग
        किया जाता है। सूर्य नमस्कार और आदित्य हृदय स्तोत्र इस दिन से
        जुड़े हैं।
      </p>

      <h3>सोमवार</h3>
      <p>
        स्वामी चन्द्र। मन, भावना, शान्ति, जल, माता &mdash; इनसे सम्बन्धित।
        शिव की पूजा सोमवार को विशेष रूप से होती है &mdash; विशेषकर श्रावण
        मास में &mdash; क्योंकि शिव अर्ध-चन्द्र धारण करते हैं। रंग श्वेत।
        श्रावण के सोमवार को कई क्षेत्रों में उपवास होता है; <em>सोलह
        सोमवार</em> का व्रत विवाह की कामना करने वाली अथवा वैवाहिक सुख
        चाहने वाली स्त्रियों द्वारा लिया जाता है।
      </p>

      <h3>मंगलवार</h3>
      <p>
        स्वामी मंगल। ऊर्जा, साहस, भाई-बहन, संघर्ष, रक्त, शल्यक्रिया से
        सम्बन्धित। उत्तर भारत में हनुमान की पूजा मंगलवार से जुड़ी है
        &mdash; हनुमान को मंगल का अंश अथवा संरक्षक माना जाता है। रंग लाल।
        कुछ कामों (जैसे केश-कर्तन, पश्चिम की यात्रा) के लिए कुछ परम्पराएँ
        इसे अशुभ मानती हैं, परन्तु साहस की अपेक्षा वाले कार्यों के लिए शुभ।
      </p>

      <h3>बुधवार</h3>
      <p>
        स्वामी बुध। बुद्धि, संवाद, वाणिज्य, विद्या, विद्वान् &mdash; इनसे
        सम्बन्धित। गणेश की पूजा बुधवार से जुड़ी है &mdash; गणेश बुद्धि के
        देव हैं और स्पष्ट विचार में बाधाओं को दूर करते हैं। रंग हरा।
        शैक्षणिक आरम्भ, व्यवसाय का प्रवर्तन, अनुबंधों पर हस्ताक्षर के लिए
        शुभ माना जाता है।
      </p>

      <h3>गुरुवार</h3>
      <p>
        स्वामी गुरु (बृहस्पति)। ज्ञान, शिक्षक, धर्म, विस्तार, स्वर्ण से
        सम्बन्धित। विष्णु की पूजा गुरुवार को पारम्परिक है, और अपने व्यक्तिगत
        गुरु की भी। रंग पीला। गुरुवार सार्वभौम रूप से शुभ माना जाता है
        &mdash; विवाह, आध्यात्मिक साधना का आरम्भ, व्रत-संकल्प और दीर्घ-
        कालिक उद्यमों के प्रवर्तन के लिए।
      </p>

      <h3>शुक्रवार</h3>
      <p>
        स्वामी शुक्र। प्रेम, विवाह, कला, सौन्दर्य, वाहन, विलास, स्त्री,
        देवी &mdash; इनसे सम्बन्धित। लक्ष्मी और दुर्गा की पूजा शुक्रवार को
        पारम्परिक है। रंग श्वेत या हल्के पस्तेल। विवाह, प्रणय, कलात्मक
        उद्यम, आभूषण और वस्त्र क्रय, और देवी-उपासना के लिए शुभ।
      </p>

      <h3>शनिवार</h3>
      <p>
        स्वामी शनि। अनुशासन, धीमे परन्तु स्थायी लाभ, न्याय, संघर्ष,
        परिश्रम, आयु, सेवक, उपेक्षित वर्ग, मशीनरी, और कर्म &mdash; इनसे
        सम्बन्धित। शनिदेव, हनुमान (जो शनि के कठोर प्रभाव से रक्षा करते
        हैं), और भैरव की पूजा शनिवार को पारम्परिक है। रंग काला या गहरा
        नीला। कुछ परम्पराएँ नये उद्यमों के लिए इसे प्रतिकूल मानती हैं,
        परन्तु गहराई से विचारित दीर्घकालिक प्रतिबद्धताओं के लिए आदर्श
        &mdash; आवेगपूर्ण आरम्भ का विपरीत।
      </p>

      <p>
        ये सम्बन्ध भी मनमाने नहीं हैं। ये प्रत्येक ग्रह के संस्कृत
        अर्थ-क्षेत्र से, बिम्ब के दृश्य रूप (मंगल लाल दिखता है, चन्द्र
        श्वेत, शनि धीमा और मलिन), और शताब्दियों के अनुष्ठान-संचय से उपजते
        हैं। आप भविष्यवाणी की परत मानें या न मानें, ये सम्बन्ध स्वयं में
        सुसंगत और सुप्रलेखित हैं।
      </p>

      <h2>वार सूर्योदय से प्रारम्भ होता है &mdash; और सीमा-स्थिति</h2>

      <p>
        आधुनिक नागरिक कैलेंडर में दिन मध्यरात्रि से प्रारम्भ होता है।
        भारतीय परम्परा में, जैसा हम देख चुके, दिन सूर्योदय से। तो
        मध्यरात्रि और सूर्योदय के बीच के समय का क्या &mdash; मान लीजिए जो
        आपके फ़ोन पर मंगलवार 2 बजे का है? पंचांग की दृष्टि से वह अब भी{" "}
        <strong>सोमवार</strong> है &mdash; क्योंकि मंगलवार सूर्योदय तक
        प्रारम्भ ही नहीं हुआ।
      </p>

      <p>
        शास्त्रीय ग्रंथों को पढ़ते समय यह बात महत्त्वपूर्ण है। &ldquo;ग्रहण
        शनिवार को रात्रि के द्वितीय प्रहर में हुआ&rdquo; &mdash; यह कथन
        शनिवार के <em>दिन</em> के बाद की रात्रि की बात कर रहा है &mdash;
        अर्थात् आधुनिक घड़ी जिसे रविवार प्रातः, शायद 1 बजे रविवार, कहेगी।
        पारम्परिक वार अभी नहीं बदला, क्योंकि सूर्य अभी उदित नहीं हुआ।
      </p>

      <KeyIdea
        title="पंचांग का दिन = सूर्योदय से अगले सूर्योदय तक"
        titleHi="A panchang day = sunrise to next sunrise."
      >
        प्रातः-पूर्व के घंटे पिछले वार के होते हैं। यदि आप किसी परम्परा-ग्रंथ
        में वार और रात्रि-काल का उल्लेख देखें, तो उसे &ldquo;आधुनिक
        कैलेंडर के अनुसार उस रात्रि&rdquo; के रूप में अनुवादित न करें
        &mdash; उसे &ldquo;उस वार के दिन के बाद की रात्रि&rdquo; के रूप में
        अनुवादित करें, चाहे आधुनिक घड़ी मध्यरात्रि पार कर चुकी हो।
      </KeyIdea>

      <h2>जैन परम्परा में वार और सात-दिवसीय चक्र</h2>

      <p>
        जैन ग्रंथ इसी सात-वार चक्र और इन्हीं ग्रह-स्वामित्वों को अपनाते
        हैं, परन्तु जैन अनुष्ठान-जीवन सामान्यतः वार की अपेक्षा चन्द्र-कैलेंडर
        (तिथि, पक्ष, मास) पर अधिक ज़ोर देता है। प्रमुख जैन व्रत और
        त्योहार तिथियों से बँधे हैं, वारों से नहीं। वार पंचांग में पाँच
        अंगों में से एक के रूप में और चौघड़िया-निर्धारण के एक तत्त्व के रूप
        में आता है (जिसे हम बाद के अध्याय में देखेंगे), परन्तु वह त्योहार-
        सम्बन्धी वजन उतना नहीं रखता जितना तिथि।
      </p>

      <p>
        कुछ जैन समुदाय विशिष्ट वारों पर विशिष्ट आचार रखते हैं &mdash; जैसे
        आहार-विधि के अंग के रूप में किसी वार पर किसी आहार का त्याग। ये
        परिपाटियाँ क्षेत्र और सम्प्रदाय के अनुसार बदलती हैं।
      </p>

      <h2>सप्ताह सात दिनों का ही क्यों?</h2>

      <p>
        हम सात को बिना सोचे-समझे स्वीकार कर लेते हैं, परन्तु पूछना उचित
        है। सात-दिन की कोई खगोलीय घटना नहीं है। चन्द्रमा हर सात दिन में
        किसी स्थिति में नहीं लौटता। पृथ्वी भी नहीं। सात-गुना सप्ताह का
        कोई प्रत्यक्ष खगोलीय कारण नहीं है।
      </p>

      <p>
        सबसे संभावित उत्तर यह है कि सात इसलिए चुना गया क्योंकि वह सावन-मास
        का लगभग एक-चौथाई है: 29.5 ÷ 4 ≈ 7.4 दिन। चन्द्र की चार कलाएँ
        &mdash; अमावस्या, प्रथम चतुर्थी, पूर्णिमा, अंतिम चतुर्थी &mdash;
        लगभग सात-दिन के अंतराल पर पड़ती हैं, और चन्द्र की कला देखना ही वह
        सरलतम नंगी-आँख का कैलेंडर है जिसे कोई अनपढ़ समुदाय भी रख सकता है।
        यह चन्द्र-कलाओं से सम्बन्ध अनेक संस्कृतियों में संरक्षित है &mdash;
        बेबीलोनी सात-दिन का सप्ताह, यहूदी शब्बात-चक्र, ग्रीको-रोमी ग्रहीय
        सप्ताह, और भारतीय सप्ताह &mdash; इन सब के मूल किसी प्राचीन
        चन्द्र-कला अवलोकन की ओर जाते हैं।
      </p>

      <p>
        फिर सात-दिन की गिनती के ऊपर, सात ज्योतिर्मानों (सूर्य, चन्द्र,
        पाँच दृश्य ग्रह) ने प्रत्येक दिन को सौंपने के लिए सात स्वाभाविक
        वस्तुएँ प्रदान कीं &mdash; एक ऐसा अद्भुत संयोग जो प्रणाली को
        संस्कृतियों के पार स्थिर कर देता है।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>सात वारों के नाम और प्रत्येक के स्वामी ग्रह बता सकें।</li>
        <li>
          कैल्डियन क्रम (शनि-गुरु-मंगल-सूर्य-शुक्र-बुध-चन्द्र, सबसे धीमे से
          सबसे तेज़ प्रत्यक्ष पृथ्वी-केन्द्रित गति) बता सकें।
        </li>
        <li>
          होरा-नियम से वार-क्रम निकाल सकें: 24 घंटे mod 7 ग्रह = प्रति दिन
          कैल्डियन क्रम में 3 स्थान आगे।
        </li>
        <li>
          भारतीय और पाश्चात्य कैलेंडर में वार दिन-दर-दिन क्यों मेल खाते
          हैं, और यह संयोग क्यों नहीं &mdash; समझा सकें।
        </li>
        <li>
          प्रत्येक ग्रह का अपने वार के साथ गुणात्मक सम्बन्ध (सूर्य के लिए
          ओज, चन्द्र के लिए मन, इत्यादि) बता सकें।
        </li>
        <li>
          समान-होरा और दिन-रात असमान-होरा योजनाओं में भेद कर सकें, और बता
          सकें कि वार-निर्धारण के लिए कौन-सी प्रयुक्त होती है।
        </li>
        <li>
          &ldquo;शनिवार रात्रि के द्वितीय प्रहर&rdquo; जैसे शास्त्रीय
          सन्दर्भ को सही पढ़ सकें, और बता सकें कि वह आधुनिक घड़ी के किस
          समय की ओर संकेत है।
        </li>
      </ul>

      <p>
        इसी साइट का दैनिक पंचांग खोलिए। ऊपर आज का वार है। उसका स्वामी ग्रह
        ध्यान में रखिए। अब कल का वार देखिए &mdash; उसका स्वामी वही ग्रह
        होगा जो कैल्डियन क्रम में आज के स्वामी से तीन स्थान आगे है। यदि
        आज मंगलवार (मंगल) है, तो शनि-गुरु-मंगल-सूर्य-शुक्र-बुध-चन्द्र में
        तीन स्थान आगे बुध मिलेगा। और कल वस्तुतः बुधवार &mdash; बुध का दिन
        &mdash; है। गणित खरा है।
      </p>

      <p>
        अगले अध्याय में हम पाँच अंगों में सबसे सरल से सबसे अलंकृत की ओर
        जाते हैं &mdash; <strong>नक्षत्र</strong>, 27 चन्द्र-मण्डल। प्रत्येक
        नक्षत्र का अपना नाम, अपना चिह्न, अपना अधिष्ठाता देव और अपना स्वभाव
        है; ये सब मिलकर भारतीय आकाश-मानचित्रण की सबसे प्राचीन परत बनाते हैं
        &mdash; जो बारह-राशि चक्र से भी पुरानी है।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

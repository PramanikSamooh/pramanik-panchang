import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("time-units")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        Now that we have seen all five limbs of the panchang and the
        framework of rashis and grahas, we move into the practical
        schedules — choghadiya, muhurta, rahu kaal — that a daily
        panchang produces. But before any of those, we need a
        precise understanding of the time units they use.
      </p>

      <p>
        Modern life uses hours, minutes, and seconds. Indian
        traditional time uses a different system, with its own
        names and its own units. They are mathematically equivalent
        — we can convert freely between them — but the traditional
        units are the ones in which classical texts are written, in
        which the panchang flags its windows, and in which the
        six-ghati rule is stated. By the end of this chapter you
        will be fluent in both.
      </p>

      <h2>The hierarchy of traditional time units</h2>

      <p>
        Indian traditional time uses a sexagesimal (base-60) system,
        much like our minutes and seconds. The smallest practical
        unit and the largest day-unit are linked by a clean chain
        of 60s.
      </p>

      <table>
        <thead>
          <tr>
            <th>Unit</th>
            <th>देवनागरी</th>
            <th>Equivalent</th>
            <th>Modern equivalent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 day (ahoratra)</td>
            <td lang="hi">अहोरात्र</td>
            <td>60 ghatis</td>
            <td>24 hours</td>
          </tr>
          <tr>
            <td>1 ghati</td>
            <td lang="hi">घटी</td>
            <td>60 pal / 1/60 of a day</td>
            <td>24 minutes</td>
          </tr>
          <tr>
            <td>1 pal</td>
            <td lang="hi">पल</td>
            <td>60 vipal / 1/60 of a ghati</td>
            <td>24 seconds</td>
          </tr>
          <tr>
            <td>1 vipal</td>
            <td lang="hi">विपल</td>
            <td>1/60 of a pal</td>
            <td>0.4 second</td>
          </tr>
        </tbody>
      </table>

      <p>
        The pattern is exact: 60 vipals per pal, 60 pals per
        ghati, 60 ghatis per day. The system is consistent and
        easy to compute by hand, which is one reason it survived.
        Notice how differently the day is partitioned: 60 ghatis
        of 24 minutes each, rather than 24 hours of 60 minutes
        each. Same total time, different factor breakdown.
      </p>

      <FigurePlaceholder
        number="9.1"
        caption="The traditional Indian time hierarchy: vipal → pal → ghati → day."
        captionHi="वैदिक कालमान: विपल → पल → घटी → दिन।"
        promptHint="See Batch 1 image #6 for the Gemini prompt."
      />

      <h2>Why ghati instead of hour?</h2>

      <p>
        The ghati is named after a literal device — the{" "}
        <em>ghati-yantra</em>{" "}
        <span lang="hi">(घटी-यन्त्र)</span>, a water clock
        consisting of a metal bowl with a small hole in the
        bottom, floating in a larger water vessel. The bowl
        sinks and fills with water, and at a precisely calibrated
        moment it submerges entirely — at which point a watcher
        strikes a bell. The bowl is then re-floated. The interval
        between strikes is one ghati. Indian astronomical
        observatories used these throughout the medieval period
        to keep precise time.
      </p>

      <p>
        The water-clock origin explains why a ghati is exactly
        24 minutes: the bowls were made to that size by
        convention. The choice of 60 ghatis per day (rather than,
        say, 24 hours) reflects the sexagesimal preference
        common in early astronomy from Mesopotamia onward — the
        same preference that gives us 60 minutes per hour.
      </p>

      <h2>The muhurta — a coarser unit</h2>

      <p>
        Above the ghati, but below the day, sits the{" "}
        <strong>muhurta</strong>{" "}
        <span lang="hi">(मुहूर्त)</span>. A muhurta is exactly{" "}
        <strong>2 ghatis</strong> = 48 minutes. There are{" "}
        <strong>30 muhurtas in a day</strong> (60 ghatis ÷ 2 =
        30). Each muhurta has a name in classical texts, and
        each governs a particular type of activity.
      </p>

      <p>
        The word <em>muhurta</em> has migrated into general use
        to mean &ldquo;an auspicious moment&rdquo; — as in
        &ldquo;What is the muhurta for the wedding?&rdquo; This
        usage is broader than the technical 48-minute unit; it
        refers to any propitious time-window, often less than 48
        minutes, computed from the panchang. The two senses
        coexist in modern Sanskrit-influenced Indian languages.
      </p>

      <h2>The prahar (yama) — a quarter of half a day</h2>

      <p>
        Above the muhurta, the day is divided into eight
        <strong> prahars</strong>{" "}
        <span lang="hi">(प्रहर)</span>, also called{" "}
        <em>yamas</em> <span lang="hi">(याम)</span>. Each prahar
        is 3 hours, or 7.5 ghatis, or 3.75 muhurtas.
      </p>

      <ul>
        <li>4 prahars in the day (sunrise to sunset)</li>
        <li>4 prahars in the night (sunset to next sunrise)</li>
        <li>8 prahars total in 24 hours</li>
      </ul>

      <p>
        Like the choghadiya we will meet next, prahars are
        traditionally <em>unequal</em> — calculated from actual
        sunrise to actual sunset, then divided into 4 equal
        parts for daytime, and similarly for nighttime. So a
        daytime prahar in summer (long days) is longer than 3
        hours, and a daytime prahar in winter is shorter; the
        opposite for nighttime prahars.
      </p>

      <p>
        Classical Indian poetry and drama is full of references
        to specific prahars. &ldquo;The first prahar of the
        night&rdquo; is the early evening (roughly 6 PM to 9
        PM). &ldquo;The fourth prahar of the night&rdquo; is the
        period before dawn (roughly 3 AM to sunrise). &ldquo;The
        second prahar of the day&rdquo; is mid-morning. These
        time-references appear constantly in classical
        literature and in muhurta texts.
      </p>

      <h2>Special muhurtas of the day</h2>

      <p>
        Several specific muhurta-windows are named and observed
        across the day. We have already met some of them; others
        come up in the next chapters. A summary now will be
        useful.
      </p>

      <h3>Brahma muhurta <span lang="hi">ब्रह्म मुहूर्त</span></h3>
      <p>
        The 14th muhurta from the end of the night, i.e., the
        muhurta beginning roughly 1 hour 36 minutes before
        sunrise (3 muhurtas × 48 min = 144 min before sunrise),
        and lasting 48 minutes until 48 minutes before sunrise.
        Brahma muhurta is universally recognised as the most
        sattvic, peaceful, and spiritually charged window of the
        day — recommended for meditation, recitation of
        scripture, study, and quiet creative work. The
        Ayurvedic and yogic traditions enjoin rising during this
        muhurta as a discipline.
      </p>

      <h3>Abhijit muhurta <span lang="hi">अभिजित् मुहूर्त</span></h3>
      <p>
        The 8th muhurta of the day, occupying 24 minutes on
        either side of solar noon — total 48 minutes. Abhijit
        is the &ldquo;invincible&rdquo; muhurta and is
        considered universally auspicious for new
        undertakings. (Recall from the nakshatra chapter that
        Abhijit was the &ldquo;28th nakshatra&rdquo; that was
        dropped from the regular nakshatra count; it survives
        as this midday muhurta.) Auspicious work that cannot
        find a clean muhurta in the daily panchang can default
        to Abhijit. The exception is Wednesday — Abhijit
        muhurta on Budhavara is traditionally avoided because
        of an old prescription.
      </p>

      <h3>Godhuli muhurta <span lang="hi">गोधूलि मुहूर्त</span></h3>
      <p>
        Literally &ldquo;cow-dust time&rdquo; — the period when
        cattle return home in the evening, raising dust on the
        village paths. Roughly the half-hour before to the
        half-hour after sunset (sunset itself sits at the
        midpoint). This is a traditionally auspicious window for
        certain rituals, especially weddings — a number of
        regional Hindu wedding traditions schedule the
        ceremony during godhuli specifically.
      </p>

      <h3>Sandhya — the twilights <span lang="hi">सन्ध्या</span></h3>
      <p>
        Three sandhyas are traditionally observed: <em>pratah
        sandhya</em> (morning twilight, beginning before
        sunrise), <em>madhyana sandhya</em> (midday), and{" "}
        <em>sayam sandhya</em> (evening twilight, beginning at
        sunset). The brahmanical sandhyavandanam ritual is
        performed at each. Sandhyas are transitional periods —
        powerful for spiritual practice but generally avoided
        for material undertakings.
      </p>

      <h2>The 30 muhurtas with their names</h2>

      <p>
        Here are the 30 named muhurtas of the day, in order
        from sunrise. Each lasts 48 minutes (2 ghatis). The
        list comes from classical muhurta texts; minor name
        variants exist between sources.
      </p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>देवनागरी</th>
            <th>Quality</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Rudra</td><td lang="hi">रुद्र</td><td>Inauspicious</td><td>First muhurta after sunrise</td></tr>
          <tr><td>2</td><td>Ahi</td><td lang="hi">अहि</td><td>Inauspicious</td><td></td></tr>
          <tr><td>3</td><td>Mitra</td><td lang="hi">मित्र</td><td>Auspicious</td><td></td></tr>
          <tr><td>4</td><td>Pitri</td><td lang="hi">पितृ</td><td>Inauspicious</td><td>For ancestor rites</td></tr>
          <tr><td>5</td><td>Vasu</td><td lang="hi">वसु</td><td>Auspicious</td><td></td></tr>
          <tr><td>6</td><td>Vara (Apa)</td><td lang="hi">वार / आप</td><td>Auspicious</td><td></td></tr>
          <tr><td>7</td><td>Vishvedeva</td><td lang="hi">विश्वेदेव</td><td>Auspicious</td><td></td></tr>
          <tr><td>8</td><td><strong>Abhijit</strong></td><td lang="hi">अभिजित्</td><td>Highly auspicious</td><td>Solar noon ± 24 min</td></tr>
          <tr><td>9</td><td>Vidhi</td><td lang="hi">विधि</td><td>Auspicious</td><td></td></tr>
          <tr><td>10</td><td>Vishnu</td><td lang="hi">विष्णु</td><td>Auspicious</td><td></td></tr>
          <tr><td>11</td><td>Yamya</td><td lang="hi">याम्य</td><td>Inauspicious</td><td>Yama&rsquo;s muhurta</td></tr>
          <tr><td>12</td><td>Vayu</td><td lang="hi">वायु</td><td>Mixed</td><td></td></tr>
          <tr><td>13</td><td>Hutashana</td><td lang="hi">हुताशन</td><td>Auspicious</td><td></td></tr>
          <tr><td>14</td><td>Indra</td><td lang="hi">इन्द्र</td><td>Auspicious</td><td></td></tr>
          <tr><td>15</td><td>Apa</td><td lang="hi">आप</td><td>Auspicious</td><td>Last muhurta before sunset</td></tr>
          <tr><td>16</td><td>Vidhata</td><td lang="hi">विधाता</td><td>Auspicious</td><td>First muhurta after sunset</td></tr>
          <tr><td>17</td><td>Aja</td><td lang="hi">अज</td><td>Inauspicious</td><td></td></tr>
          <tr><td>18</td><td>Brahma</td><td lang="hi">ब्रह्म</td><td>Auspicious</td><td></td></tr>
          <tr><td>19</td><td>Soma</td><td lang="hi">सोम</td><td>Auspicious</td><td></td></tr>
          <tr><td>20</td><td>Aditi</td><td lang="hi">अदिति</td><td>Auspicious</td><td></td></tr>
          <tr><td>21</td><td>Jiva</td><td lang="hi">जीव</td><td>Auspicious</td><td></td></tr>
          <tr><td>22</td><td>Vishnu</td><td lang="hi">विष्णु</td><td>Auspicious</td><td></td></tr>
          <tr><td>23</td><td>Yuma</td><td lang="hi">युम</td><td>Mixed</td><td></td></tr>
          <tr><td>24</td><td>Varuna</td><td lang="hi">वरुण</td><td>Auspicious</td><td></td></tr>
          <tr><td>25</td><td>Aryama</td><td lang="hi">अर्यमा</td><td>Auspicious</td><td></td></tr>
          <tr><td>26</td><td>Bhaga</td><td lang="hi">भग</td><td>Inauspicious</td><td></td></tr>
          <tr><td>27</td><td><strong>Brahma</strong></td><td lang="hi">ब्रह्म मुहूर्त</td><td>Highly auspicious</td><td>Pre-dawn (3 muhurtas before sunrise)</td></tr>
          <tr><td>28</td><td>Pushan</td><td lang="hi">पूषन्</td><td>Auspicious</td><td></td></tr>
          <tr><td>29</td><td>Ashwin</td><td lang="hi">अश्विन्</td><td>Auspicious</td><td></td></tr>
          <tr><td>30</td><td>Yama</td><td lang="hi">यम</td><td>Inauspicious</td><td>Last muhurta before sunrise</td></tr>
        </tbody>
      </table>

      <FigurePlaceholder
        number="9.2"
        caption="The 30 muhurtas of the 24-hour day. Sunrise at 6 o'clock position, sunset at 12. Abhijit and Brahma muhurta highlighted."
        captionHi="दिन-रात के 30 मुहूर्त। सूर्योदय 6 बजे की दिशा में, सूर्यास्त 12 की दिशा में। अभिजित् और ब्रह्म मुहूर्त चिह्नित।"
        promptHint="See Batch 1 image #7 for the Gemini prompt."
      />

      <h2>Equal-time vs unequal-time muhurtas</h2>

      <p>
        There are two computational schemes for the 30 daily
        muhurtas:
      </p>

      <ul>
        <li>
          <strong>Equal scheme:</strong> the 24 hours are divided
          into 30 equal muhurtas of 48 minutes each. The 30
          slots always have the same length regardless of
          season.
        </li>
        <li>
          <strong>Unequal scheme:</strong> the daytime (sunrise
          to sunset) is divided into 15 equal day-muhurtas, and
          the nighttime (sunset to sunrise) is divided into 15
          equal night-muhurtas. Day-muhurtas in summer are
          longer than 48 minutes; night-muhurtas in summer are
          shorter; the relationship inverts in winter.
        </li>
      </ul>

      <p>
        For most muhurta-selection purposes, the unequal scheme is
        used — it is the classical Indian convention. The
        choghadiya system, which we will study next, follows the
        same logic: divide actual day and actual night
        separately. This panchang follows the unequal scheme
        throughout.
      </p>

      <h2>The big picture in modern numbers</h2>

      <p>
        For quick mental conversion when reading a panchang:
      </p>

      <ul>
        <li>1 vipal = 0.4 second</li>
        <li>1 pal = 24 seconds</li>
        <li>1 ghati = 24 minutes</li>
        <li>1 muhurta = 48 minutes (2 ghatis)</li>
        <li>1 prahar / yama = 3 hours (7.5 ghatis = 3.75 muhurtas)</li>
        <li>1 day-and-night (ahoratra) = 24 hours = 60 ghatis = 30 muhurtas = 8 prahars</li>
      </ul>

      <p>
        The cleanest unit-conversion is between ghati and
        minute: divide by 1.5 (rough) or multiply by 24/60 = 0.4
        (exact). 5 ghatis = 2 hours; 6 ghatis = 2 hours 24
        minutes (the udaya tithi window of the Jain rule);
        15 ghatis = 6 hours; 60 ghatis = 24 hours.
      </p>

      <KeyIdea
        title="Six ghatis = 2h 24m = 144 minutes."
        titleHi="6 घटी = 2 घंटे 24 मिनट = 144 मिनट"
      >
        This is the udaya tithi window we have been referring to
        since chapter 2. It is also the typical duration of a
        choghadiya period (sunrise-to-sunset divided by 8 ≈ 1.5
        hours in equinox; in summer and winter it varies by
        location). Six ghatis is also exactly three muhurtas.
      </KeyIdea>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>
          State the four basic time units (vipal, pal, ghati,
          day) and their conversions.
        </li>
        <li>
          Convert ghatis to minutes and vice versa fluently.
        </li>
        <li>
          State the duration of a muhurta (48 min) and a prahar
          (3 hours).
        </li>
        <li>
          Identify Brahma muhurta and Abhijit muhurta in the
          daily schedule.
        </li>
        <li>
          Distinguish equal-time and unequal-time muhurta
          schemes.
        </li>
        <li>
          Read a classical reference like &ldquo;the second
          prahar of the night&rdquo; and identify the
          corresponding civil clock time.
        </li>
      </ul>

      <p>
        With time units in hand we are ready for the most
        practical of the panchang&rsquo;s daily outputs — the{" "}
        <strong>choghadiya</strong>. Choghadiya divides the day
        into eight periods, each of about four ghatis (one and a
        half hours), each labelled auspicious or inauspicious for
        general use. It is the panchang feature that ordinary
        people consult most often: &ldquo;is this a good time to
        go?&rdquo; That chapter is next.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        अब जब हम पंचांग के पाँच अंगों, राशि-ग्रह के ढाँचे को देख चुके हैं,
        तब हम व्यावहारिक समय-सारणियों की ओर बढ़ते हैं &mdash; चौघड़िया,
        मुहूर्त, राहु काल। परन्तु इनमें से किसी पर भी जाने से पहले हमें
        उन काल-इकाइयों की सटीक समझ चाहिए जिनका वे प्रयोग करती हैं।
      </p>

      <p>
        आधुनिक जीवन घंटे, मिनट और सेकंड का प्रयोग करता है। पारम्परिक
        भारतीय काल-गणना अपनी अलग प्रणाली का &mdash; अपने नामों और इकाइयों
        के साथ। ये गणितीय रूप से समतुल्य हैं &mdash; हम स्वतंत्रता से
        दोनों के बीच परिवर्तित कर सकते हैं &mdash; परन्तु पारम्परिक
        इकाइयाँ ही वे हैं जिनमें शास्त्रीय ग्रंथ लिखे हैं, पंचांग अपनी
        अवधियाँ चिह्नित करता है, और जैन छह-घटी का नियम कहा गया है। इस
        अध्याय के अंत तक आप दोनों में निपुण होंगे।
      </p>

      <h2>पारम्परिक काल-इकाइयों का स्तर-क्रम</h2>

      <p>
        भारतीय पारम्परिक काल षष्टि-आधारी (60 के आधार पर) प्रणाली है,
        बहुत-कुछ हमारे मिनटों और सेकंडों की तरह। सबसे छोटी व्यावहारिक
        इकाई और सबसे बड़ी दैनिक इकाई 60 की एक स्वच्छ श्रृंखला से जुड़ी हैं।
      </p>

      <table>
        <thead>
          <tr>
            <th>इकाई</th>
            <th>लिप्यन्तरण</th>
            <th>समतुल्यता</th>
            <th>आधुनिक मान</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>अहोरात्र</td>
            <td>1 day</td>
            <td>60 घटी</td>
            <td>24 घंटे</td>
          </tr>
          <tr>
            <td>घटी</td>
            <td>1 ghati</td>
            <td>60 पल / दिन का 1/60</td>
            <td>24 मिनट</td>
          </tr>
          <tr>
            <td>पल</td>
            <td>1 pal</td>
            <td>60 विपल / घटी का 1/60</td>
            <td>24 सेकंड</td>
          </tr>
          <tr>
            <td>विपल</td>
            <td>1 vipal</td>
            <td>पल का 1/60</td>
            <td>0.4 सेकंड</td>
          </tr>
        </tbody>
      </table>

      <p>
        पैटर्न सटीक है: प्रति पल 60 विपल, प्रति घटी 60 पल, प्रति दिन 60
        घटी। यह प्रणाली सुसंगत है और हस्त-गणना से सरल है &mdash; यही एक
        कारण इसके बने रहने का। ध्यान दीजिए कि दिन का विभाजन कितना भिन्न
        है: 60 घटी प्रति 24 मिनट, बजाय 24 घंटे प्रति 60 मिनट के। कुल समय
        वही, परन्तु गुणनखंड भिन्न।
      </p>

      <FigurePlaceholder
        number="9.1"
        caption="The traditional Indian time hierarchy: vipal → pal → ghati → day."
        captionHi="वैदिक कालमान: विपल → पल → घटी → दिन।"
        promptHint="See Batch 1 image #6 for the Gemini prompt."
      />

      <h2>घंटे की जगह घटी क्यों?</h2>

      <p>
        घटी का नाम एक वास्तविक यंत्र पर रखा गया &mdash; <em>घटी-यंत्र</em>,
        एक जल-घड़ी जिसमें एक धातु का कटोरा होता था जिसकी तली में छोटा
        छिद्र होता है, और जो एक बड़े जल-पात्र पर तैरता है। कटोरा डूबता
        जाता है और जल से भर जाता है, और एक सुनिश्चित क्षण पर पूरी तरह
        जलमग्न हो जाता है &mdash; जिस पर पर्यवेक्षक एक घंटा बजाता है।
        फिर कटोरे को पुनः तैरा दिया जाता है। दो घंटाओं के बीच का अंतराल
        एक घटी है। मध्ययुगीन काल में भारतीय खगोलीय वेधशालाएँ इन्हीं का
        प्रयोग करती थीं।
      </p>

      <p>
        जल-घड़ी की उत्पत्ति यह बताती है कि एक घटी ठीक 24 मिनट की क्यों
        है: कटोरे परिपाटी से इसी आकार के बनाये गये। और एक दिन में 60
        घटी (24 घंटों के बजाय) का चयन प्रारम्भिक मेसोपोटामिया से आगे की
        खगोल विज्ञान की षष्टि-आधारी पसन्द का प्रतिबिम्ब है &mdash; वही
        पसन्द जो हमें प्रति घंटे 60 मिनट देती है।
      </p>

      <h2>मुहूर्त &mdash; एक मोटी इकाई</h2>

      <p>
        घटी से ऊपर, परन्तु दिन से नीचे, बैठता है <strong>मुहूर्त</strong>।
        एक मुहूर्त ठीक <strong>2 घटी</strong> = 48 मिनट। एक दिन में{" "}
        <strong>30 मुहूर्त</strong> (60 घटी ÷ 2 = 30)। शास्त्रीय ग्रंथों
        में हर मुहूर्त का नाम है, और हर एक एक विशिष्ट प्रकार के कार्य का
        अधिष्ठाता है।
      </p>

      <p>
        शब्द <em>मुहूर्त</em> सामान्य प्रयोग में &ldquo;एक शुभ क्षण&rdquo;
        के अर्थ में स्थानांतरित हो गया है &mdash; जैसे &ldquo;विवाह का
        मुहूर्त क्या है?&rdquo;। यह प्रयोग 48-मिनट की तकनीकी इकाई से
        व्यापक है; यह पंचांग से निकाले गये किसी भी अनुकूल समय-खण्ड को
        कहता है, प्रायः 48 मिनट से कम। आधुनिक संस्कृत-प्रभावित भारतीय
        भाषाओं में दोनों अर्थ साथ-साथ चलते हैं।
      </p>

      <h2>प्रहर (याम) &mdash; आधे दिन का चौथाई</h2>

      <p>
        मुहूर्त से ऊपर, दिन को आठ <strong>प्रहरों</strong> में बाँटा जाता
        है, जिन्हें <em>याम</em> भी कहते हैं। प्रत्येक प्रहर 3 घंटे, या
        7.5 घटी, या 3.75 मुहूर्त।
      </p>

      <ul>
        <li>दिन (सूर्योदय से सूर्यास्त) में 4 प्रहर</li>
        <li>रात्रि (सूर्यास्त से अगले सूर्योदय) में 4 प्रहर</li>
        <li>24 घंटों में कुल 8 प्रहर</li>
      </ul>

      <p>
        चौघड़िया की तरह, जिसे हम आगे देखेंगे, प्रहर भी पारम्परिक रूप से{" "}
        <em>असमान</em> होते हैं &mdash; वास्तविक सूर्योदय से वास्तविक
        सूर्यास्त तक की अवधि को 4 बराबर भागों में बाँटकर दिन के प्रहर,
        और इसी प्रकार रात्रि के। अतः ग्रीष्म में दिन-प्रहर 3 घंटे से
        लंबे होते हैं, शीत में छोटे; रात्रि-प्रहर के लिए विपरीत।
      </p>

      <p>
        शास्त्रीय भारतीय काव्य और नाटक विशिष्ट प्रहरों के सन्दर्भों से
        भरे हैं। &ldquo;रात्रि का प्रथम प्रहर&rdquo; प्रारम्भिक सायंकाल
        है (लगभग 6 PM से 9 PM)। &ldquo;रात्रि का चतुर्थ प्रहर&rdquo;
        प्रात-पूर्व का काल है (लगभग 3 AM से सूर्योदय)।
        &ldquo;दिन का द्वितीय प्रहर&rdquo; मध्य-प्रातः है। ये समय-सन्दर्भ
        शास्त्रीय साहित्य और मुहूर्त-ग्रंथों में निरन्तर आते हैं।
      </p>

      <h2>दिन के विशेष मुहूर्त</h2>

      <p>
        पूरे दिन में कई विशिष्ट मुहूर्त-अवधियाँ नामित और मानी जाती हैं।
        कुछ से हम पहले मिल चुके हैं; अन्य अगले अध्यायों में आयेंगे। यहाँ
        एक संक्षिप्त सार उपयोगी होगा।
      </p>

      <h3>ब्रह्म मुहूर्त</h3>
      <p>
        रात्रि के अंत से 14वाँ मुहूर्त, अर्थात् सूर्योदय से लगभग 1 घंटा
        36 मिनट पहले प्रारम्भ होने वाला (3 मुहूर्त × 48 मिनट = 144 मिनट
        पूर्व), और सूर्योदय से 48 मिनट पहले तक चलने वाला 48 मिनट का
        मुहूर्त। ब्रह्म मुहूर्त को सार्वभौम रूप से दिन का सबसे सात्त्विक,
        शान्त, और आध्यात्मिक रूप से आवेशित खंड माना जाता है &mdash;
        ध्यान, स्वाध्याय, शास्त्र-पाठ, और मौन रचनात्मक कार्य के लिए
        अनुकूल। आयुर्वेदिक और योगिक परम्परा अनुशासन के रूप में इस मुहूर्त
        में उठने का निर्देश देती है।
      </p>

      <h3>अभिजित् मुहूर्त</h3>
      <p>
        दिन का 8वाँ मुहूर्त, सौर मध्याह्न के दोनों ओर 24-24 मिनट का
        &mdash; कुल 48 मिनट। अभिजित् &ldquo;अजेय&rdquo; मुहूर्त है और
        सार्वभौम रूप से नये उद्यमों के लिए शुभ माना जाता है। (नक्षत्र-
        अध्याय का स्मरण कीजिए &mdash; अभिजित् वही &ldquo;28वाँ
        नक्षत्र&rdquo; था जो नियमित नक्षत्र-गणना से हटा दिया गया; वह इस
        मध्याह्न-मुहूर्त के रूप में बच गया।) जिस शुभ कार्य के लिए दैनिक
        पंचांग में स्वच्छ मुहूर्त नहीं मिलता, वह अभिजित् पर लौट सकता
        है। अपवाद बुधवार है &mdash; बुधवार का अभिजित् किसी पुराने
        निर्देश के कारण पारम्परिक रूप से टाल दिया जाता है।
      </p>

      <h3>गोधूलि मुहूर्त</h3>
      <p>
        शाब्दिक अर्थ &ldquo;गाय की धूल का समय&rdquo; &mdash; वह काल जब
        सायंकाल पशुधन घर लौटते हैं, ग्राम्य मार्गों पर धूल उड़ाते हुए।
        लगभग सूर्यास्त से आधा घंटा पहले से आधा घंटा बाद तक (सूर्यास्त
        स्वयं मध्य-बिन्दु पर)। यह कुछ अनुष्ठानों के लिए, विशेषकर विवाह
        के लिए, पारम्परिक रूप से शुभ खण्ड है &mdash; अनेक क्षेत्रीय
        हिन्दू विवाह-परम्पराएँ विशेष रूप से गोधूलि में ही समारोह
        निर्धारित करती हैं।
      </p>

      <h3>सन्ध्या &mdash; तीन सन्धि-काल</h3>
      <p>
        तीन सन्ध्याएँ पारम्परिक रूप से मनायी जाती हैं: <em>प्रातः
        सन्ध्या</em> (प्रातः-काल का सन्धि, सूर्योदय से पहले प्रारम्भ),{" "}
        <em>माध्याह्न सन्ध्या</em>, और <em>सायं सन्ध्या</em> (सायं-काल
        का सन्धि, सूर्यास्त पर प्रारम्भ)। ब्राह्मणीय <em>सन्ध्या-वन्दन</em>{" "}
        प्रत्येक पर किया जाता है। सन्ध्याएँ संक्रमण-काल हैं &mdash;
        आध्यात्मिक साधना के लिए शक्तिशाली, परन्तु भौतिक उद्यमों के लिए
        सामान्यतः वर्जित।
      </p>

      <h2>30 मुहूर्तों के नाम</h2>

      <p>
        यहाँ सूर्योदय से क्रम में दिन के 30 नामित मुहूर्त हैं। हर एक 48
        मिनट (2 घटी)। यह सूची शास्त्रीय मुहूर्त-ग्रंथों से है; स्रोतों
        में नामों के छोटे-मोटे भेद मिलते हैं।
      </p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>नाम</th>
            <th>लिप्यन्तरण</th>
            <th>गुण</th>
            <th>विशेष</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>रुद्र</td><td>Rudra</td><td>अशुभ</td><td>सूर्योदय के बाद का प्रथम मुहूर्त</td></tr>
          <tr><td>2</td><td>अहि</td><td>Ahi</td><td>अशुभ</td><td></td></tr>
          <tr><td>3</td><td>मित्र</td><td>Mitra</td><td>शुभ</td><td></td></tr>
          <tr><td>4</td><td>पितृ</td><td>Pitri</td><td>अशुभ</td><td>पैतृक कर्मों के लिए</td></tr>
          <tr><td>5</td><td>वसु</td><td>Vasu</td><td>शुभ</td><td></td></tr>
          <tr><td>6</td><td>वार / आप</td><td>Vara</td><td>शुभ</td><td></td></tr>
          <tr><td>7</td><td>विश्वेदेव</td><td>Vishvedeva</td><td>शुभ</td><td></td></tr>
          <tr><td>8</td><td><strong>अभिजित्</strong></td><td>Abhijit</td><td>अति शुभ</td><td>सौर मध्याह्न ± 24 मिनट</td></tr>
          <tr><td>9</td><td>विधि</td><td>Vidhi</td><td>शुभ</td><td></td></tr>
          <tr><td>10</td><td>विष्णु</td><td>Vishnu</td><td>शुभ</td><td></td></tr>
          <tr><td>11</td><td>याम्य</td><td>Yamya</td><td>अशुभ</td><td>यम का मुहूर्त</td></tr>
          <tr><td>12</td><td>वायु</td><td>Vayu</td><td>मिश्रित</td><td></td></tr>
          <tr><td>13</td><td>हुताशन</td><td>Hutashana</td><td>शुभ</td><td></td></tr>
          <tr><td>14</td><td>इन्द्र</td><td>Indra</td><td>शुभ</td><td></td></tr>
          <tr><td>15</td><td>आप</td><td>Apa</td><td>शुभ</td><td>सूर्यास्त से पहले अंतिम मुहूर्त</td></tr>
          <tr><td>16</td><td>विधाता</td><td>Vidhata</td><td>शुभ</td><td>सूर्यास्त के बाद प्रथम</td></tr>
          <tr><td>17</td><td>अज</td><td>Aja</td><td>अशुभ</td><td></td></tr>
          <tr><td>18</td><td>ब्रह्म</td><td>Brahma</td><td>शुभ</td><td></td></tr>
          <tr><td>19</td><td>सोम</td><td>Soma</td><td>शुभ</td><td></td></tr>
          <tr><td>20</td><td>अदिति</td><td>Aditi</td><td>शुभ</td><td></td></tr>
          <tr><td>21</td><td>जीव</td><td>Jiva</td><td>शुभ</td><td></td></tr>
          <tr><td>22</td><td>विष्णु</td><td>Vishnu</td><td>शुभ</td><td></td></tr>
          <tr><td>23</td><td>युम</td><td>Yuma</td><td>मिश्रित</td><td></td></tr>
          <tr><td>24</td><td>वरुण</td><td>Varuna</td><td>शुभ</td><td></td></tr>
          <tr><td>25</td><td>अर्यमा</td><td>Aryama</td><td>शुभ</td><td></td></tr>
          <tr><td>26</td><td>भग</td><td>Bhaga</td><td>अशुभ</td><td></td></tr>
          <tr><td>27</td><td><strong>ब्रह्म मुहूर्त</strong></td><td>Brahma</td><td>अति शुभ</td><td>प्रात-पूर्व (सूर्योदय से 3 मुहूर्त पहले)</td></tr>
          <tr><td>28</td><td>पूषन्</td><td>Pushan</td><td>शुभ</td><td></td></tr>
          <tr><td>29</td><td>अश्विन्</td><td>Ashwin</td><td>शुभ</td><td></td></tr>
          <tr><td>30</td><td>यम</td><td>Yama</td><td>अशुभ</td><td>सूर्योदय से पहले अंतिम</td></tr>
        </tbody>
      </table>

      <FigurePlaceholder
        number="9.2"
        caption="The 30 muhurtas of the 24-hour day. Sunrise at 6 o'clock position, sunset at 12. Abhijit and Brahma muhurta highlighted."
        captionHi="दिन-रात के 30 मुहूर्त। सूर्योदय 6 बजे की दिशा में, सूर्यास्त 12 की दिशा में। अभिजित् और ब्रह्म मुहूर्त चिह्नित।"
        promptHint="See Batch 1 image #7 for the Gemini prompt."
      />

      <h2>समान-काल बनाम असमान-काल मुहूर्त</h2>

      <p>दैनिक 30 मुहूर्तों के लिए दो गणनीय योजनाएँ हैं —</p>

      <ul>
        <li>
          <strong>समान योजना:</strong> 24 घंटों को 30 बराबर 48-मिनट के
          मुहूर्तों में बाँटा जाता है। 30 स्थान सदा एक ही लंबाई के, ऋतु
          के अनुसार बदले बिना।
        </li>
        <li>
          <strong>असमान योजना:</strong> दिन (सूर्योदय से सूर्यास्त) को
          15 बराबर दिन-मुहूर्तों में, और रात्रि (सूर्यास्त से सूर्योदय)
          को 15 बराबर रात्रि-मुहूर्तों में बाँटा जाता है। ग्रीष्म में
          दिन-मुहूर्त 48 मिनट से लंबे, रात्रि-मुहूर्त छोटे; शीत में
          सम्बन्ध उल्टा।
        </li>
      </ul>

      <p>
        अधिकांश मुहूर्त-चयन के प्रयोजनों के लिए असमान योजना का प्रयोग
        होता है &mdash; यह शास्त्रीय भारतीय परिपाटी है। चौघड़िया
        प्रणाली, जिसे हम अगले अध्याय में देखेंगे, इसी तर्क का अनुसरण
        करती है: वास्तविक दिन और वास्तविक रात्रि को अलग-अलग बाँटकर। यह
        पंचांग पूरे में असमान योजना का अनुसरण करता है।
      </p>

      <h2>आधुनिक संख्याओं में पूर्ण चित्र</h2>

      <p>पंचांग पढ़ते समय शीघ्र मानसिक रूपांतरण के लिए —</p>

      <ul>
        <li>1 विपल = 0.4 सेकंड</li>
        <li>1 पल = 24 सेकंड</li>
        <li>1 घटी = 24 मिनट</li>
        <li>1 मुहूर्त = 48 मिनट (2 घटी)</li>
        <li>1 प्रहर / याम = 3 घंटे (7.5 घटी = 3.75 मुहूर्त)</li>
        <li>1 अहोरात्र = 24 घंटे = 60 घटी = 30 मुहूर्त = 8 प्रहर</li>
      </ul>

      <p>
        सबसे स्वच्छ इकाई-परिवर्तन घटी और मिनट के बीच है: 1.5 से भाग
        (मोटे अनुमान के लिए) अथवा 24/60 = 0.4 से गुणा (सटीक के लिए)।
        5 घटी = 2 घंटे; 6 घटी = 2 घंटे 24 मिनट (जैन नियम का उदय-तिथि
        अंतराल); 15 घटी = 6 घंटे; 60 घटी = 24 घंटे।
      </p>

      <KeyIdea
        title="6 घटी = 2 घंटे 24 मिनट = 144 मिनट"
        titleHi="Six ghatis = 2h 24m = 144 minutes."
      >
        यह वही उदय-तिथि अंतराल है जिसका हम अध्याय 2 से उल्लेख करते आ रहे
        हैं। यह एक चौघड़िया-अवधि की भी प्रचलित लंबाई है (विषुव पर
        सूर्योदय-से-सूर्यास्त ÷ 8 ≈ 1.5 घंटे; ग्रीष्म और शीत में
        स्थान-अनुसार झूलाव)। छह घटी ठीक तीन मुहूर्त के बराबर भी है।
      </KeyIdea>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>
          चार मूल काल-इकाइयाँ (विपल, पल, घटी, दिन) और उनके परिवर्तन बता
          सकें।
        </li>
        <li>घटी और मिनट में स्वतंत्रता से परिवर्तन कर सकें।</li>
        <li>
          मुहूर्त की अवधि (48 मिनट) और प्रहर की (3 घंटे) बता सकें।
        </li>
        <li>
          ब्रह्म मुहूर्त और अभिजित् मुहूर्त को दैनिक समय-सारणी में पहचान
          सकें।
        </li>
        <li>समान-काल और असमान-काल योजनाओं में भेद कर सकें।</li>
        <li>
          &ldquo;रात्रि के द्वितीय प्रहर&rdquo; जैसे शास्त्रीय सन्दर्भ
          को पढ़कर सम्बद्ध आधुनिक घड़ी-समय पहचान सकें।
        </li>
      </ul>

      <p>
        काल-इकाइयाँ हाथ में लेकर अब हम पंचांग के सबसे व्यावहारिक दैनिक
        उत्पादनों में से एक तक तैयार हैं &mdash; <strong>चौघड़िया</strong>।
        चौघड़िया दिन को आठ अवधियों में बाँटता है, हर एक लगभग चार घटी
        (डेढ़ घंटा) की, हर एक सामान्य प्रयोजन के लिए शुभ या अशुभ
        लेबल की हुई। यह पंचांग की वह विशेषता है जिसे आम लोग सबसे अधिक
        देखते हैं &mdash; &ldquo;क्या यह जाने का अच्छा समय है?&rdquo;
        अगला अध्याय वही है।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

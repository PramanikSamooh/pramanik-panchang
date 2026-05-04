import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";
import { YOGAS } from "@/lib/learn/yoga-data";

const chapter = getChapter("yoga")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We have looked at three of the five limbs so far. Tithi tells
        us where the Moon is relative to the Sun, by{" "}
        <em>subtracting</em> their longitudes. Vara tells us the
        weekday. Nakshatra tells us where the Moon is against the
        background stars.
      </p>

      <p>
        We come now to the fourth limb — the <strong>yoga</strong>{" "}
        <span lang="hi">(योग)</span>. The Sanskrit word <em>yoga</em>{" "}
        literally means &ldquo;union&rdquo; or &ldquo;joining,&rdquo;
        from the root <em>yuj</em>, &ldquo;to yoke.&rdquo; In this
        context, the union being joined is between Sun and Moon — but
        unlike tithi, which considers their separation, yoga
        considers their <em>combined longitude</em>.
      </p>

      <KeyIdea
        title="Yoga is computed by adding Sun and Moon longitudes."
        titleHi="योग की गणना सूर्य और चन्द्र के देशांतरों को जोड़कर होती है"
      >
        Tithi = (λ_Moon − λ_Sun) mod 360°, divided by 12°. <br />
        Yoga = (λ_Moon + λ_Sun) mod 360°, divided by 13°20′.<br />
        Same two numbers (Sun longitude and Moon longitude); different
        operation. From them we get two completely different daily
        readings.
      </KeyIdea>

      <p>
        A note before we begin. The word &ldquo;yoga&rdquo; in
        Sanskrit has many other technical meanings — the spiritual
        discipline of yoga, planetary conjunction yogas in a kundli
        (gajakesari yoga, dhana yoga, etc.), and special panchang
        combinations like Amrit Siddhi yoga and Tripushkar yoga. The
        nityayoga of the panchang is yet another usage — the one we
        treat in this chapter. Each of these uses the same Sanskrit
        word for a different specific concept. Context disambiguates.
        We will explicitly call this one <em>nitya yoga</em>{" "}
        <span lang="hi">(नित्य योग)</span> — &ldquo;daily
        yoga&rdquo; — when there is risk of confusion.
      </p>

      <h2>The mathematics of yoga</h2>

      <p>
        There are 27 yogas. The full ecliptic of 360° is divided into
        27 equal segments, each of <strong>13°20′</strong> — exactly
        the same span as a nakshatra. But the quantity being divided
        is different.
      </p>

      <blockquote>
        <strong>Yoga number</strong> = <code>floor(((λ_Moon + λ_Sun) mod 360°) ÷ 13°20′)</code> + 1
      </blockquote>

      <p>
        Why divide the sum of longitudes? The astronomical motivation
        is subtle. The sum (λ_Moon + λ_Sun) advances at the combined
        rate of the Moon and the Sun together — about 13.18° per day
        (Moon&rsquo;s daily motion) + 0.99° per day (Sun&rsquo;s
        daily motion) ≈ 14.17° per day. So the yoga changes about
        every 13.20° ÷ 14.17° ≈ 22.4 hours — a bit faster than a
        tithi, which advances at 12.18° per day (the differential
        rate) and so changes every ~23.6 hours.
      </p>

      <p>
        Yoga is thus a refinement that captures a different aspect of
        the Sun-Moon configuration than tithi does. Where tithi
        encodes the <em>phase</em> of the Moon (waxing or waning, how
        far separated), yoga encodes a different angular relationship
        — one that has historically been used for fine-grained
        muhurta selection.
      </p>

      <h2>Why 27 again? — the parallel to nakshatra</h2>

      <p>
        It is no accident that the number 27 appears for both the
        nakshatra (which divides the Moon&rsquo;s longitude by 13°20′)
        and the yoga (which divides the Sun-plus-Moon longitude by
        13°20′). The framework was reused for symmetry: 27
        nakshatras of 13°20′ on the ecliptic, 27 yogas of 13°20′ on
        the combined-longitude scale.
      </p>

      <p>
        Both yogas and nakshatras share names with ancient Vedic
        roots, though the lists are completely different. The 27
        yogas have names like Vishkambha (obstruction), Priti
        (affection), Ayushman (long-lived) — these names directly
        encode the yoga&rsquo;s nature, unlike nakshatra names which
        are mostly descriptive of the constellation.
      </p>

      <h2>The 27 yogas with their qualities</h2>

      <p>
        Below is the master table of all 27 yogas with their
        traditional natures. Out of 27, fourteen are explicitly
        auspicious, eight are explicitly inauspicious, and a few
        are mixed or context-dependent.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>देवनागरी</th>
              <th>Meaning</th>
              <th>Nature</th>
            </tr>
          </thead>
          <tbody>
            {YOGAS.map((y) => (
              <tr key={y.number}>
                <td>{y.number}</td>
                <td>
                  <strong>{y.name}</strong>
                </td>
                <td lang="hi">{y.nameHi}</td>
                <td>{y.meaning}</td>
                <td>
                  <span
                    className={
                      y.nature === "Auspicious"
                        ? "text-green-400"
                        : y.nature === "Inauspicious"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }
                  >
                    {y.nature}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The seven inauspicious yogas to know</h2>

      <p>
        For practical panchang reading, the most important thing is
        to recognise the inauspicious yogas, which are flagged for
        avoidance during important new beginnings. These are
        traditionally listed as:
      </p>

      <ol>
        <li>
          <strong>Vishkambha (1)</strong>{" "}
          <span lang="hi">(विष्कम्भ)</span> — &ldquo;obstruction.&rdquo;
          Only the first 5 ghatis (~2 hours) of this yoga are
          considered inauspicious; the rest is normal.
        </li>
        <li>
          <strong>Atiganda (6)</strong>{" "}
          <span lang="hi">(अतिगण्ड)</span> — &ldquo;great
          obstacle.&rdquo; First 6 ghatis flagged.
        </li>
        <li>
          <strong>Shula (9)</strong> <span lang="hi">(शूल)</span> —
          &ldquo;spear, piercing pain.&rdquo; First 5 ghatis flagged.
        </li>
        <li>
          <strong>Ganda (10)</strong> <span lang="hi">(गण्ड)</span> —
          &ldquo;knot, obstruction.&rdquo; First 6 ghatis flagged.
        </li>
        <li>
          <strong>Vyaghata (13)</strong>{" "}
          <span lang="hi">(व्याघात)</span> — &ldquo;striking.&rdquo;
          First 9 ghatis flagged.
        </li>
        <li>
          <strong>Vajra (15)</strong> <span lang="hi">(वज्र)</span> —
          &ldquo;thunderbolt.&rdquo; First 9 ghatis flagged. Mixed
          nature; powerful for strong actions, harsh for delicate
          ones.
        </li>
        <li>
          <strong>Vyatipata (17)</strong>{" "}
          <span lang="hi">(व्यतीपात)</span> — &ldquo;sudden
          fall.&rdquo; The entire yoga is considered inauspicious
          and is one of the most strongly flagged panchang elements.
          Auspicious work is traditionally avoided throughout this
          yoga.
        </li>
        <li>
          <strong>Parigha (19)</strong>{" "}
          <span lang="hi">(परिघ)</span> — &ldquo;iron bar,
          obstruction.&rdquo; First 5 ghatis flagged.
        </li>
        <li>
          <strong>Vaidhriti (27)</strong>{" "}
          <span lang="hi">(वैधृति)</span> —
          &ldquo;disconnection.&rdquo; The entire yoga is
          inauspicious — the second of the two strongly flagged
          full-yoga inauspicious periods alongside Vyatipata.
        </li>
      </ol>

      <p>
        Of these, <strong>Vyatipata</strong> and{" "}
        <strong>Vaidhriti</strong> are the two flagged through their
        entire duration; the others have only an initial unfavourable
        window of a few ghatis. The panchang on this site flags
        these when active.
      </p>

      <h2>The auspicious yogas of greatest weight</h2>

      <p>
        Three yogas are noted in classical texts as particularly
        favourable for new beginnings, and worth specifically
        choosing for muhurta:
      </p>

      <ul>
        <li>
          <strong>Siddhi (16)</strong>{" "}
          <span lang="hi">(सिद्धि)</span> — &ldquo;accomplishment.&rdquo;
          Strongly favours endeavours that require completion of a
          difficult task.
        </li>
        <li>
          <strong>Shubha (23)</strong>{" "}
          <span lang="hi">(शुभ)</span> — &ldquo;auspicious.&rdquo; A
          general-purpose favourable yoga.
        </li>
        <li>
          <strong>Brahma (25)</strong>{" "}
          <span lang="hi">(ब्रह्म)</span> — favours scholarly,
          philosophical, ritual, and spiritual undertakings.
        </li>
      </ul>

      <p>
        When Brahma yoga falls on a Thursday (Guru-vara) and the
        nakshatra is Pushya, the combination is one of the highest
        muhurtas in the entire calendar — a confluence of three
        favourable currents.
      </p>

      <h2>Yoga in muhurta selection</h2>

      <p>
        In strict muhurta practice, the panchang is consulted to find
        a moment when several factors line up favourably:
      </p>

      <ul>
        <li>The tithi is auspicious for the activity.</li>
        <li>The vara&rsquo;s graha is favourable.</li>
        <li>The nakshatra is favourable for the activity type.</li>
        <li>The yoga is auspicious or at least not actively inauspicious.</li>
        <li>The karana is favourable.</li>
      </ul>

      <p>
        The yoga is essentially a fifth filter, used to rule out
        moments when an otherwise fine confluence happens to fall
        within Vyatipata or Vaidhriti, or in the unfavourable opening
        ghatis of one of the other inauspicious yogas. Many marriage
        and major-ceremony muhurtas are explicitly checked against
        the yoga in addition to the other limbs.
      </p>

      <h2>Reading yoga in your panchang</h2>

      <p>
        On the daily panchang of this site, the yoga line shows the
        current yoga at sunrise and the time at which it ends. After
        that time, the next yoga in sequence begins.
      </p>

      <p>
        If today&rsquo;s yoga is Vyatipata or Vaidhriti, the entire
        day is flagged. If it is one of the other inauspicious
        yogas, the panchang notes the unfavourable opening ghati
        window. If today&rsquo;s yoga is Siddhi, Shubha, or Brahma,
        the day is highlighted as particularly favourable.
      </p>

      <KeyIdea
        title="Yoga is the least-discussed but always-checked of the five limbs."
        titleHi="योग पाँच अंगों में सबसे कम चर्चित है, पर मुहूर्त में सदा देखा जाता है"
      >
        In casual conversation, people speak of tithi (&ldquo;today is
        Ekadashi&rdquo;) and nakshatra (&ldquo;Moon is in Rohini&rdquo;)
        but rarely yoga. In serious muhurta practice, however, yoga
        is a non-negotiable filter. Vyatipata and Vaidhriti are the
        two everyone learns to avoid first.
      </KeyIdea>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>State the formula for nitya yoga (sum of Sun and Moon longitudes ÷ 13°20′).</li>
        <li>Distinguish nitya yoga from the other meanings of &ldquo;yoga&rdquo; in Sanskrit astrology.</li>
        <li>Name the seven traditional inauspicious yogas.</li>
        <li>
          Identify Vyatipata and Vaidhriti as the two yogas inauspicious
          throughout their entire duration.
        </li>
        <li>Name the three highly auspicious yogas (Siddhi, Shubha, Brahma).</li>
        <li>Read the yoga line of a daily panchang.</li>
      </ul>

      <p>
        In the next chapter we look at the last of the five limbs —{" "}
        <strong>karana</strong> — which is simply half a tithi, but
        with a structure that is unexpectedly rich.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        अब तक हमने पाँच अंगों में से तीन देखे हैं। तिथि बताती है कि चन्द्र
        सूर्य के सापेक्ष कहाँ है, उनके देशांतरों के <em>अंतर</em> से। वार
        बताता है सप्ताह का दिन। नक्षत्र बताता है कि चन्द्र पृष्ठभूमि के
        तारों के सापेक्ष कहाँ है।
      </p>

      <p>
        अब हम चौथे अंग पर आते हैं &mdash; <strong>योग</strong>। संस्कृत में
        <em>योग</em> का अर्थ ही है &ldquo;मिलन&rdquo; या &ldquo;जोड़&rdquo;,
        धातु <em>युज्</em> से, &ldquo;जोतना।&rdquo; इस सन्दर्भ में जो जोड़ा
        जा रहा है वह है सूर्य और चन्द्र &mdash; परन्तु तिथि के विपरीत, जो
        उनके अंतर पर विचार करती है, योग उनके{" "}
        <em>संयुक्त देशांतर</em> पर विचार करता है।
      </p>

      <KeyIdea
        title="योग की गणना सूर्य और चन्द्र के देशांतरों को जोड़कर होती है"
        titleHi="Yoga is computed by adding Sun and Moon longitudes."
      >
        तिथि = (λ_चन्द्र − λ_सूर्य) mod 360°, 12° से भाग। <br />
        योग = (λ_चन्द्र + λ_सूर्य) mod 360°, 13°20' से भाग। <br />
        दोनों मात्राएँ (सूर्य का देशांतर और चन्द्र का देशांतर) वही हैं;
        क्रिया भिन्न है। एक ही जोड़े से दो पूर्णतः भिन्न दैनिक मान निकलते
        हैं।
      </KeyIdea>

      <p>
        एक स्पष्टीकरण आरम्भ में आवश्यक है। संस्कृत में &ldquo;योग&rdquo; शब्द
        के अनेक तकनीकी अर्थ हैं &mdash; योग की आध्यात्मिक साधना, कुण्डली में
        ग्रह-योग (गजकेसरी योग, धन योग, इत्यादि), और अमृत-सिद्धि योग एवं
        त्रिपुष्कर योग जैसे विशेष पंचांग-संयोग। पंचांग का नित्ययोग एक और
        प्रयोग है &mdash; जिसकी चर्चा हम इस अध्याय में कर रहे हैं। इन सब
        में एक ही संस्कृत शब्द भिन्न-भिन्न अवधारणाओं के लिए प्रयुक्त होता
        है। सन्दर्भ से अर्थ स्पष्ट होता है। जब भ्रम की सम्भावना होगी, हम
        स्पष्ट रूप से इसे <em>नित्य योग</em> कहेंगे।
      </p>

      <h2>योग का गणित</h2>

      <p>
        27 योग हैं। 360° का पूरा क्रान्तिवृत्त 27 बराबर भागों में बाँटा गया
        है, प्रत्येक <strong>13°20'</strong> का &mdash; ठीक एक नक्षत्र के
        समान। परन्तु जिस मात्रा को बाँटा जा रहा है, वह भिन्न है।
      </p>

      <blockquote>
        <strong>योग-संख्या</strong> ={" "}
        <code>floor(((λ_चन्द्र + λ_सूर्य) mod 360°) ÷ 13°20')</code> + 1
      </blockquote>

      <p>
        देशांतरों का योग ही क्यों? खगोलीय कारण सूक्ष्म है। (λ_चन्द्र +
        λ_सूर्य) चन्द्र और सूर्य की संयुक्त गति की दर से बढ़ता है &mdash;
        लगभग 13.18° प्रति दिन (चन्द्र की दैनिक गति) + 0.99° प्रति दिन
        (सूर्य की दैनिक गति) ≈ 14.17° प्रति दिन। अतः योग प्रति 13.20° ÷
        14.17° ≈ 22.4 घंटे में बदलता है &mdash; तिथि से कुछ तेज़, जो
        12.18° प्रति दिन की अंतर-दर से बढ़कर ~23.6 घंटे में बदलती है।
      </p>

      <p>
        अतः योग एक ऐसा परिशोधन है जो सूर्य-चन्द्र के विन्यास का तिथि से
        भिन्न पहलू पकड़ता है। तिथि चन्द्रमा का <em>कला-स्वरूप</em> (बढ़ता
        या घटता, कितना दूर) अंकित करती है, योग एक भिन्न कोणीय सम्बन्ध
        अंकित करता है &mdash; जिसका उपयोग ऐतिहासिक रूप से सूक्ष्म मुहूर्त-
        चयन में होता रहा है।
      </p>

      <h2>फिर 27 ही क्यों? &mdash; नक्षत्र से समानांतरता</h2>

      <p>
        यह कोई संयोग नहीं कि 27 की संख्या नक्षत्र (जो चन्द्र के देशांतर को
        13°20' से भाग देता है) और योग (जो सूर्य-चन्द्र संयुक्त देशांतर को
        13°20' से भाग देता है) &mdash; दोनों के लिए आती है। ढाँचा सममिति
        के लिए पुनर्प्रयुक्त किया गया: क्रान्तिवृत्त पर 13°20' के 27
        नक्षत्र, संयुक्त-देशांतर पैमाने पर 13°20' के 27 योग।
      </p>

      <p>
        दोनों के नाम वैदिक धातुओं से निकले हैं, यद्यपि सूचियाँ पूर्णतः
        भिन्न हैं। 27 योगों के नाम विष्कम्भ (बाधा), प्रीति (स्नेह),
        आयुष्मान् (दीर्घायु) जैसे हैं &mdash; ये नाम योग के स्वभाव को सीधे
        अंकित करते हैं, नक्षत्र-नामों की तरह नक्षत्र-रूप के वर्णन भर नहीं।
      </p>

      <h2>27 योग और उनके गुण</h2>

      <p>
        नीचे की मास्टर-तालिका में सभी 27 योग और उनके पारम्परिक स्वभाव हैं।
        27 में से चौदह स्पष्टतः शुभ हैं, आठ स्पष्टतः अशुभ, और कुछ मिश्रित या
        सन्दर्भ-निर्भर।
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>नाम</th>
              <th>लिप्यन्तरण</th>
              <th>अर्थ</th>
              <th>स्वभाव</th>
            </tr>
          </thead>
          <tbody>
            {YOGAS.map((y) => (
              <tr key={y.number}>
                <td>{y.number}</td>
                <td>
                  <strong lang="hi">{y.nameHi}</strong>
                </td>
                <td>{y.name}</td>
                <td>{y.meaning}</td>
                <td>
                  <span
                    className={
                      y.nature === "Auspicious"
                        ? "text-green-400"
                        : y.nature === "Inauspicious"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }
                  >
                    {y.nature === "Auspicious"
                      ? "शुभ"
                      : y.nature === "Inauspicious"
                        ? "अशुभ"
                        : "मिश्रित"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>सात प्रमुख अशुभ योग जिन्हें पहचानना है</h2>

      <p>
        व्यावहारिक पंचांग-पठन के लिए सबसे महत्त्वपूर्ण है अशुभ योगों को
        पहचानना, जो किसी महत्त्वपूर्ण नये आरम्भ के लिए वर्जित किये जाते
        हैं। शास्त्रीय रूप से ये सूचीबद्ध हैं —
      </p>

      <ol>
        <li>
          <strong>विष्कम्भ (1)</strong> &mdash; &ldquo;बाधा।&rdquo; इस योग
          की केवल प्रथम 5 घटियाँ (~ 2 घंटे) अशुभ; शेष सामान्य।
        </li>
        <li>
          <strong>अतिगण्ड (6)</strong> &mdash; &ldquo;बड़ी बाधा।&rdquo; प्रथम
          6 घटियाँ चिह्नित।
        </li>
        <li>
          <strong>शूल (9)</strong> &mdash; &ldquo;शूल, तीव्र वेदना।&rdquo;
          प्रथम 5 घटियाँ चिह्नित।
        </li>
        <li>
          <strong>गण्ड (10)</strong> &mdash; &ldquo;गाँठ, बाधा।&rdquo; प्रथम
          6 घटियाँ चिह्नित।
        </li>
        <li>
          <strong>व्याघात (13)</strong> &mdash; &ldquo;प्रहार।&rdquo; प्रथम
          9 घटियाँ चिह्नित।
        </li>
        <li>
          <strong>वज्र (15)</strong> &mdash; &ldquo;वज्र।&rdquo; प्रथम 9
          घटियाँ चिह्नित। मिश्रित स्वभाव; प्रबल कार्यों के लिए उपयोगी,
          नाजुकों के लिए कठोर।
        </li>
        <li>
          <strong>व्यतीपात (17)</strong> &mdash; &ldquo;अकस्मात् पतन।&rdquo;
          पूरा योग अशुभ माना जाता है, और यह पंचांग के सर्वाधिक प्रबलता से
          चिह्नित किये जाने वाले तत्त्वों में से एक है। शुभ कार्य पूरे योग
          में पारम्परिक रूप से वर्जित।
        </li>
        <li>
          <strong>परिघ (19)</strong> &mdash; &ldquo;लोह-दण्ड, बाधा।&rdquo;
          प्रथम 5 घटियाँ चिह्नित।
        </li>
        <li>
          <strong>वैधृति (27)</strong> &mdash; &ldquo;विच्छेद।&rdquo; पूरा
          योग अशुभ &mdash; व्यतीपात के साथ दूसरा वह पूर्ण-योग अशुभ काल जो
          प्रबलता से चिह्नित होता है।
        </li>
      </ol>

      <p>
        इनमें से <strong>व्यतीपात</strong> और <strong>वैधृति</strong>{" "}
        ही ऐसे दो हैं जो पूरी अवधि-भर अशुभ माने जाते हैं; शेष की केवल
        प्रारम्भिक कुछ घटियाँ प्रतिकूल हैं। यह पंचांग सक्रिय होने पर इन
        सभी को चिह्नित कर देता है।
      </p>

      <h2>सर्वाधिक भार रखने वाले शुभ योग</h2>

      <p>
        शास्त्रीय ग्रंथ तीन योगों को नये आरम्भ के लिए विशेष रूप से अनुकूल
        बताते हैं, और मुहूर्त के लिए विशेष रूप से चुनने योग्य —
      </p>

      <ul>
        <li>
          <strong>सिद्धि (16)</strong> &mdash; &ldquo;सिद्धि।&rdquo; जिन
          कार्यों में किसी कठिन उद्यम की पूर्णता आवश्यक हो, उनके लिए विशेष
          रूप से अनुकूल।
        </li>
        <li>
          <strong>शुभ (23)</strong> &mdash; &ldquo;शुभ।&rdquo; एक सामान्य-
          प्रयोजन अनुकूल योग।
        </li>
        <li>
          <strong>ब्रह्म (25)</strong> &mdash; ज्ञान-प्रधान, दार्शनिक,
          अनुष्ठानिक और आध्यात्मिक उद्यमों के लिए अनुकूल।
        </li>
      </ul>

      <p>
        जब ब्रह्म योग गुरुवार पर पड़े और नक्षत्र पुष्य हो, तो यह संयोग
        वर्ष के सर्वोच्च मुहूर्तों में से एक होता है &mdash; तीन अनुकूल
        धाराओं का एक स्थान पर मिलन।
      </p>

      <h2>मुहूर्त-चयन में योग की भूमिका</h2>

      <p>
        कठोर मुहूर्त-व्यवहार में पंचांग को इस उद्देश्य से देखा जाता है कि
        वह क्षण मिले जिसमें अनेक कारक अनुकूल हों —
      </p>

      <ul>
        <li>तिथि कार्य के लिए शुभ हो।</li>
        <li>वार का स्वामी ग्रह अनुकूल हो।</li>
        <li>नक्षत्र कार्य-प्रकार के लिए अनुकूल हो।</li>
        <li>योग शुभ हो, या कम से कम सक्रिय रूप से अशुभ न हो।</li>
        <li>करण अनुकूल हो।</li>
      </ul>

      <p>
        योग अनिवार्य रूप से एक पाँचवीं छानन है, जो उन क्षणों को बाहर रखती
        है जब अन्यथा शुभ संयोग व्यतीपात या वैधृति में पड़ रहा हो, अथवा
        किसी अन्य अशुभ योग की प्रतिकूल आरम्भिक घटियों में। विवाह और बड़े
        समारोहों के अनेक मुहूर्त अन्य अंगों के साथ-साथ योग को भी विशेष
        रूप से देखकर निकाले जाते हैं।
      </p>

      <h2>अपने पंचांग में योग पढ़ना</h2>

      <p>
        इस साइट के दैनिक पंचांग में योग की पंक्ति सूर्योदय के समय का
        वर्तमान योग और उसकी समाप्ति का समय बताती है। उसके बाद अगला योग
        प्रारम्भ होता है।
      </p>

      <p>
        यदि आज का योग व्यतीपात या वैधृति है, तो पूरा दिन चिह्नित होता है।
        यदि वह अन्य कोई अशुभ योग है, तो पंचांग उसकी प्रतिकूल आरम्भिक घटी-
        अवधि अंकित करता है। यदि आज का योग सिद्धि, शुभ या ब्रह्म है, तो
        दिन को विशेष रूप से अनुकूल चिह्नित किया जाता है।
      </p>

      <KeyIdea
        title="योग पाँच अंगों में सबसे कम चर्चित है, पर मुहूर्त में सदा देखा जाता है"
        titleHi="Yoga is the least-discussed but always-checked of the five limbs."
      >
        सामान्य बातचीत में लोग तिथि (&ldquo;आज एकादशी है&rdquo;) और नक्षत्र
        (&ldquo;चन्द्र रोहिणी में है&rdquo;) की बात करते हैं, परन्तु योग की
        शायद ही। गम्भीर मुहूर्त-व्यवहार में योग एक अनिवार्य छानन है।
        व्यतीपात और वैधृति वह दो हैं जिन्हें टालना सभी पहले सीखते हैं।
      </KeyIdea>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>
          नित्य योग का सूत्र (सूर्य और चन्द्र के देशांतरों का योग ÷ 13°20')
          बता सकें।
        </li>
        <li>
          संस्कृत में &ldquo;योग&rdquo; के अन्य अर्थों से नित्य योग को
          अलग कर सकें।
        </li>
        <li>सात पारम्परिक अशुभ योगों के नाम बता सकें।</li>
        <li>
          व्यतीपात और वैधृति को पूरी अवधि-भर अशुभ रहने वाले दो योगों के
          रूप में पहचान सकें।
        </li>
        <li>तीन अत्यधिक शुभ योग (सिद्धि, शुभ, ब्रह्म) नाम कर सकें।</li>
        <li>दैनिक पंचांग की योग-पंक्ति पढ़ सकें।</li>
      </ul>

      <p>
        अगले अध्याय में हम पाँच अंगों में अंतिम लेते हैं &mdash;{" "}
        <strong>करण</strong> &mdash; जो वस्तुतः तिथि का आधा है, परन्तु
        जिसकी संरचना अप्रत्याशित रूप से समृद्ध है।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("karana")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We come to the last of the five limbs — the{" "}
        <strong>karana</strong> <span lang="hi">(करण)</span>. The
        Sanskrit word means &ldquo;doing, making, instrument.&rdquo; A
        karana is the smallest of the time-divisions in the daily
        panchang, and the simplest to define: it is{" "}
        <strong>half a tithi</strong>.
      </p>

      <p>
        Since each tithi is 12° of Sun-Moon angular separation, each
        karana is <strong>6°</strong>. There are 30 tithis in a lunar
        month, so there are <strong>60 karanas</strong> in a lunar
        month — two karanas per tithi. The simple definition. The
        twist comes from how the 60 karanas are named.
      </p>

      <h2>Eleven karana names, sixty slots</h2>

      <p>
        You might expect 60 different karana names. Instead, there
        are only <strong>eleven</strong>. Seven of them are{" "}
        <em>chara</em> <span lang="hi">(चर)</span> —
        &ldquo;moving&rdquo; — and recur cyclically through the
        month. Four of them are <em>sthira</em>{" "}
        <span lang="hi">(स्थिर)</span> — &ldquo;fixed&rdquo; — and
        appear only once each in specific positions. The arrangement
        is precise.
      </p>

      <h3>The four fixed karanas</h3>
      <p>
        The four fixed karanas occupy the four slots immediately
        bracketing the new moon (Amavasya):
      </p>
      <ul>
        <li>
          <strong>Shakuni</strong> <span lang="hi">(शकुनि)</span> —
          &ldquo;bird, omen.&rdquo; Second half of Krishna Chaturdashi
          (the 14th tithi of the dark fortnight).
        </li>
        <li>
          <strong>Chatushpada</strong>{" "}
          <span lang="hi">(चतुष्पाद)</span> —
          &ldquo;four-footed.&rdquo; First half of Amavasya (the
          new moon tithi).
        </li>
        <li>
          <strong>Naga</strong> <span lang="hi">(नाग)</span> —
          &ldquo;serpent.&rdquo; Second half of Amavasya.
        </li>
        <li>
          <strong>Kimstughna</strong>{" "}
          <span lang="hi">(किंस्तुघ्न)</span> —
          &ldquo;destroyer-of-what?&rdquo; First half of Shukla
          Pratipada (the 1st tithi of the next bright fortnight).
        </li>
      </ul>

      <p>
        These four span the &ldquo;dark&rdquo; transition from the end
        of one lunar month to the beginning of the next — across the
        new moon. They are unique to that monthly transition. Outside
        of these four positions, you will never see Shakuni,
        Chatushpada, Naga, or Kimstughna.
      </p>

      <h3>The seven movable karanas</h3>
      <p>
        The remaining 56 karana slots (60 − 4) are filled by seven
        names, repeating cyclically eight times each (8 × 7 = 56). In
        traditional listing order:
      </p>
      <ol>
        <li>
          <strong>Bava</strong> <span lang="hi">(बव)</span> — the
          first movable karana.
        </li>
        <li>
          <strong>Balava</strong> <span lang="hi">(बालव)</span>.
        </li>
        <li>
          <strong>Kaulava</strong> <span lang="hi">(कौलव)</span>.
        </li>
        <li>
          <strong>Taitila</strong> <span lang="hi">(तैतिल)</span>.
        </li>
        <li>
          <strong>Gara</strong> <span lang="hi">(गर)</span>.
        </li>
        <li>
          <strong>Vanija</strong> <span lang="hi">(वणिज)</span>.
        </li>
        <li>
          <strong>Vishti</strong> <span lang="hi">(विष्टि)</span> —
          also called <strong>Bhadra</strong>{" "}
          <span lang="hi">(भद्रा)</span>.
        </li>
      </ol>

      <p>
        The cycle starts in the second half of Shukla Pratipada and
        runs for the next 56 half-tithi positions, completing eight
        full Bava-to-Vishti cycles before reaching Krishna Chaturdashi
        where the fixed-karana sequence begins. The structure is
        rigorous and entirely predictable from the position within
        the lunar month.
      </p>

      <h2>The position of every karana, schematically</h2>

      <p>
        The full assignment is:
      </p>

      <table>
        <thead>
          <tr>
            <th>Tithi</th>
            <th>First half</th>
            <th>Second half</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shukla Pratipada (1)</td>
            <td>Kimstughna (fixed)</td>
            <td>Bava</td>
          </tr>
          <tr>
            <td>Shukla 2 to Krishna 14, half-by-half</td>
            <td colSpan={2}>
              Cycling: Bava → Balava → Kaulava → Taitila → Gara →
              Vanija → Vishti → Bava → ... (8 full cycles of 7)
            </td>
          </tr>
          <tr>
            <td>Krishna Chaturdashi (14)</td>
            <td>Vishti</td>
            <td>Shakuni (fixed)</td>
          </tr>
          <tr>
            <td>Amavasya (15)</td>
            <td>Chatushpada (fixed)</td>
            <td>Naga (fixed)</td>
          </tr>
        </tbody>
      </table>

      <h2>Vishti / Bhadra — the karana to know</h2>

      <p>
        The seventh movable karana, <strong>Vishti</strong>{" "}
        <span lang="hi">(विष्टि)</span> — better known as{" "}
        <strong>Bhadra</strong> <span lang="hi">(भद्रा)</span> — is
        the most important karana for daily panchang reading, because
        it is the only one with strong inauspicious associations and
        therefore the only one routinely flagged.
      </p>

      <p>
        Bhadra is personified in classical mythology as the daughter
        of Surya (the Sun) and Chhaya (the Sun&rsquo;s second wife,
        the goddess of shadow). She is fierce-tempered. To prevent
        her from disrupting auspicious activities, the gods assigned
        her the responsibility of presiding over a specific time
        window — and during that window, all important undertakings
        are paused. The mythological device captures the practical
        recommendation: avoid new beginnings during Vishti karana.
      </p>

      <p>
        Bhadra occurs eight times a lunar month — once in each of the
        eight cycles of the seven movable karanas — and lasts roughly
        half a tithi each time, or about 6–13 hours. In a 30-day
        lunar month, the cumulative Bhadra time is therefore around
        90 hours, distributed in eight chunks. The panchang flags
        each Bhadra interval explicitly with start and end times.
      </p>

      <h3>Bhadra-mukha and Bhadra-puchha</h3>

      <p>
        Within each Bhadra period, classical texts further distinguish
        the <em>face</em> (mukha) and the <em>tail</em> (puchha) of
        Bhadra. The mukha is the more harmful first portion, the
        puchha is the gentler ending portion. Some traditions
        prescribe avoiding only the mukha, allowing routine activity
        during the puchha. The distribution of mukha and puchha
        within Bhadra depends on whether Bhadra falls in the daytime
        or the nighttime, and on which paksha — making this one of
        the more elaborate corners of panchang reading. For most
        practical purposes, the daily panchang simply marks the
        Bhadra interval as a whole and allows the reader to consult
        their own tradition for finer distinctions.
      </p>

      <h3>Bhadra in daylight vs Bhadra at night</h3>

      <p>
        A widely-cited rule says: <em>Bhadra of the day spoils the
        night, and Bhadra of the night spoils the day</em>{" "}
        <span lang="hi">(दिन की भद्रा रात्रि को दूषित करती है, और रात्रि
        की भद्रा दिन को दूषित करती है)</span>. The mythological
        framing is that night-Bhadra in heaven equals day-Bhadra on
        earth, and vice versa. The practical effect is that some
        Bhadra periods are considered &ldquo;harmless on earth&rdquo;
        because their inauspicious force is directed at the divine
        realm. This is one of the more subtle distinctions and does
        not enter into the core panchang display, but you may
        encounter it in detailed muhurta texts.
      </p>

      <KeyIdea
        title="Vishti = Bhadra. Avoid new beginnings during this karana."
        titleHi="विष्टि करण = भद्रा। इस अवधि में नये कार्य न आरंभ करें।"
      >
        Of the eleven karanas, ten are routine and one — Vishti —
        carries strong inauspicious weight. Bhadra occurs eight
        times a lunar month, lasting about 6–13 hours each time, and
        is always flagged on a careful panchang. Important
        decisions, journeys, ceremonies, and inaugurations are
        traditionally postponed past the end of Bhadra.
      </KeyIdea>

      <h2>The other movable karanas — qualities</h2>

      <p>
        The other six movable karanas (Bava, Balava, Kaulava,
        Taitila, Gara, Vanija) are mostly auspicious or neutral.
        Each carries traditional associations:
      </p>

      <ul>
        <li>
          <strong>Bava</strong> — beginnings, governance,
          stable enterprises.
        </li>
        <li>
          <strong>Balava</strong> — strength, education, ritual.
        </li>
        <li>
          <strong>Kaulava</strong> — friendship, alliances, family
          matters.
        </li>
        <li>
          <strong>Taitila</strong> — pleasure, marital affection,
          ornaments.
        </li>
        <li>
          <strong>Gara</strong> — agriculture, building, settled
          domestic activity.
        </li>
        <li>
          <strong>Vanija</strong> — trade, commerce, financial
          dealings (the name literally means &ldquo;trader&rdquo;).
        </li>
      </ul>

      <p>
        These associations are used in detailed muhurta selection. A
        wedding muhurta might prefer Taitila; a business launch might
        prefer Vanija; an agricultural undertaking might prefer Gara.
        At the level of daily panchang reading, the distinctions
        among the six benign karanas are rarely the deciding factor —
        the tithi, nakshatra, yoga, and avoidance of Bhadra carry
        most of the weight.
      </p>

      <h2>The four fixed karanas and their associations</h2>

      <p>
        The four fixed karanas surrounding Amavasya carry their own
        traditional associations, reflecting the transitional
        &ldquo;dark&rdquo; nature of that part of the month:
      </p>

      <ul>
        <li>
          <strong>Shakuni</strong> — divination, omens, contemplation
          of beginnings. Some auspicious purposes.
        </li>
        <li>
          <strong>Chatushpada</strong> — concerning four-footed
          beings (cattle, by extension domestic livelihood).
          Routine.
        </li>
        <li>
          <strong>Naga</strong> — serpents, hidden things, ancestral
          rites. Often inauspicious for new ventures.
        </li>
        <li>
          <strong>Kimstughna</strong> — &ldquo;the destroyer of
          what?&rdquo; — generally auspicious for the start of a
          new lunar fortnight.
        </li>
      </ul>

      <h2>Reading karana in your panchang</h2>

      <p>
        On the daily panchang of this site, the karana line shows the
        karana(s) active during the day. Because karanas change every
        half-tithi (about 12 hours on average), most days have two
        karanas listed — the one active at sunrise and the one that
        takes over later in the day. The end-times of each are
        given.
      </p>

      <p>
        If Vishti / Bhadra is one of the day&rsquo;s karanas, it is
        flagged distinctly with start and end times. New beginnings
        are typically scheduled outside this window.
      </p>

      <h2>Putting the five limbs together</h2>

      <p>
        We now have all five. Let us pause and look at how they fit
        together as a single description of a day.
      </p>

      <ul>
        <li>
          <strong>Vara</strong> — the day of the week. Ruled by a
          graha. Generates choghadiya periods.
        </li>
        <li>
          <strong>Tithi</strong> — the lunar day, defined by the 12°
          Sun-Moon separation. Determines fasts, festivals, and
          paksha.
        </li>
        <li>
          <strong>Nakshatra</strong> — the lunar mansion (Moon&rsquo;s
          longitude ÷ 13°20′). Determines janma nakshatra in
          horoscopes; carries gana, yoni, varna labels.
        </li>
        <li>
          <strong>Yoga</strong> — the combined Sun-Moon longitude
          divided by 13°20′. Filters muhurta selection; flags
          Vyatipata and Vaidhriti.
        </li>
        <li>
          <strong>Karana</strong> — half a tithi. Eleven names,
          sixty slots. Flags Bhadra.
        </li>
      </ul>

      <p>
        Tithi and karana share their underlying number (Sun-Moon
        difference); yoga uses the Sun-Moon sum; nakshatra uses the
        Moon alone; vara uses Earth&rsquo;s rotation count. Five
        limbs, three astronomical inputs (Sun longitude, Moon
        longitude, weekday counter), all derivable for any moment
        from a modern ephemeris and a sunrise calculation.
      </p>

      <KeyIdea
        title="The five limbs are five views of two angles."
        titleHi="पंचांग के पाँच अंग — दो कोणों के पाँच रूप"
      >
        Sun longitude and Moon longitude. From their difference comes
        tithi (and karana, half a tithi). From their sum comes yoga.
        From the Moon&rsquo;s longitude alone comes nakshatra. The
        weekday is just a count. Five outputs, three inputs, two
        underlying angles. The whole panchang is built on this
        compact arithmetic.
      </KeyIdea>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>State that a karana is half a tithi (6°).</li>
        <li>
          Name the eleven karanas — four fixed and seven movable.
        </li>
        <li>
          Locate the four fixed karanas in their unique positions
          surrounding Amavasya.
        </li>
        <li>
          Identify Vishti as Bhadra and explain why it is flagged.
        </li>
        <li>
          Distinguish Bhadra-mukha from Bhadra-puchha at a high
          level.
        </li>
        <li>Read the karana line of a daily panchang.</li>
        <li>
          Summarise how all five limbs are derived from Sun and Moon
          longitudes.
        </li>
      </ul>

      <p>
        With the five limbs in hand, we now turn to the framework
        they sit inside — the rashi (zodiac signs) and how the 27
        nakshatras map onto the 12 rashis. After that, we will
        spend a full chapter on each of the nine grahas, and then
        move into the derived concepts: time units, choghadiya,
        muhurta, rahu kaal, and the auspicious-inauspicious
        combinations. By the end of Book 1 we will reassemble all of
        this around a worked example of reading a single day&rsquo;s
        panchang from top to bottom.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        हम पाँच अंगों में अंतिम तक आये &mdash; <strong>करण</strong>। संस्कृत
        शब्द का अर्थ है &ldquo;करना, बनाना, साधन।&rdquo; करण पंचांग का सबसे
        छोटा समय-विभाजन है, और परिभाषित करना सबसे सरल &mdash; यह है{" "}
        <strong>तिथि का आधा भाग</strong>।
      </p>

      <p>
        चूँकि प्रत्येक तिथि सूर्य-चन्द्र के 12° कोणीय अंतर की होती है,
        प्रत्येक करण <strong>6°</strong> का होगा। चन्द्र-मास में 30 तिथियाँ
        हैं, अतः 60 करण &mdash; प्रति तिथि दो करण। सीधी परिभाषा। मोड़ इसमें
        है कि 60 करणों के नाम कैसे रखे जाते हैं।
      </p>

      <h2>ग्यारह नाम, साठ स्थान</h2>

      <p>
        आप अपेक्षा करेंगे कि 60 भिन्न करण-नाम होंगे। परन्तु ऐसा नहीं है। केवल{" "}
        <strong>ग्यारह</strong> नाम हैं। उनमें सात <em>चर</em> &mdash;
        &ldquo;चलते हुए&rdquo; &mdash; हैं और मास-भर चक्रीय रूप से दोहराये
        जाते हैं। चार <em>स्थिर</em> हैं और केवल विशिष्ट स्थानों पर एक-एक
        बार आते हैं। व्यवस्था सटीक है।
      </p>

      <h3>चार स्थिर करण</h3>
      <p>
        चार स्थिर करण ठीक उन चार स्थानों पर पड़ते हैं जो अमावस्या को घेरे
        हुए हैं —
      </p>
      <ul>
        <li>
          <strong>शकुनि</strong> &mdash; &ldquo;पक्षी, शकुन।&rdquo; कृष्ण
          चतुर्दशी का उत्तरार्ध।
        </li>
        <li>
          <strong>चतुष्पाद</strong> &mdash; &ldquo;चार पैरों वाला।&rdquo;
          अमावस्या का पूर्वार्ध।
        </li>
        <li>
          <strong>नाग</strong> &mdash; &ldquo;सर्प।&rdquo; अमावस्या का
          उत्तरार्ध।
        </li>
        <li>
          <strong>किंस्तुघ्न</strong> &mdash; &ldquo;किसका विनाशक?&rdquo;
          अगले शुक्ल पक्ष की प्रतिपदा का पूर्वार्ध।
        </li>
      </ul>

      <p>
        ये चारों एक चन्द्र-मास के अंत और अगले के आरम्भ के बीच &mdash;
        अमावस्या के पार &mdash; के &ldquo;श्याम&rdquo; संक्रमण को कवर करते
        हैं। ये उसी मासिक संधि-काल के लिए विशिष्ट हैं। इन चार स्थानों के
        बाहर शकुनि, चतुष्पाद, नाग या किंस्तुघ्न कभी नहीं मिलेंगे।
      </p>

      <h3>सात चर करण</h3>
      <p>
        शेष 56 करण-स्थानों (60 − 4) को सात नामों से भरा जाता है, जो आठ-आठ
        बार चक्रीय रूप से आते हैं (8 × 7 = 56)। पारम्परिक सूची-क्रम में —
      </p>
      <ol>
        <li><strong>बव</strong> &mdash; प्रथम चर करण।</li>
        <li><strong>बालव</strong></li>
        <li><strong>कौलव</strong></li>
        <li><strong>तैतिल</strong></li>
        <li><strong>गर</strong></li>
        <li><strong>वणिज</strong></li>
        <li>
          <strong>विष्टि</strong> &mdash; इसी को <strong>भद्रा</strong>{" "}
          भी कहते हैं।
        </li>
      </ol>

      <p>
        यह चक्र शुक्ल प्रतिपदा के उत्तरार्ध से प्रारम्भ होता है और अगले 56
        अर्ध-तिथि स्थानों तक चलता है, जब तक बव से विष्टि के आठ पूर्ण चक्र
        पूरे न हो जायें &mdash; और तब कृष्ण चतुर्दशी आ जाती है, जहाँ से
        स्थिर-करण क्रम प्रारम्भ होता है। संरचना कठोर है और चन्द्र-मास में
        स्थान से पूर्णतः अनुमेय।
      </p>

      <h2>हर करण की स्थिति, संक्षिप्त रूप में</h2>

      <table>
        <thead>
          <tr>
            <th>तिथि</th>
            <th>पूर्वार्ध</th>
            <th>उत्तरार्ध</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>शुक्ल प्रतिपदा (1)</td>
            <td>किंस्तुघ्न (स्थिर)</td>
            <td>बव</td>
          </tr>
          <tr>
            <td>शुक्ल 2 से कृष्ण 14, अर्ध-दर-अर्ध</td>
            <td colSpan={2}>
              चक्र: बव → बालव → कौलव → तैतिल → गर → वणिज → विष्टि → बव → ...
              (7 के 8 पूर्ण चक्र)
            </td>
          </tr>
          <tr>
            <td>कृष्ण चतुर्दशी (14)</td>
            <td>विष्टि</td>
            <td>शकुनि (स्थिर)</td>
          </tr>
          <tr>
            <td>अमावस्या (15)</td>
            <td>चतुष्पाद (स्थिर)</td>
            <td>नाग (स्थिर)</td>
          </tr>
        </tbody>
      </table>

      <h2>विष्टि / भद्रा &mdash; जिस करण को पहचानना है</h2>

      <p>
        सातवाँ चर करण <strong>विष्टि</strong> &mdash; जिसे{" "}
        <strong>भद्रा</strong> के नाम से अधिक जाना जाता है &mdash; दैनिक
        पंचांग-पठन के लिए सबसे महत्त्वपूर्ण करण है, क्योंकि यह एकमात्र है
        जिसका अशुभ-भार प्रबल है, और इसी कारण नियमित रूप से चिह्नित किया
        जाता है।
      </p>

      <p>
        शास्त्रीय पुराण-कथा में भद्रा को सूर्य और छाया (सूर्य की द्वितीय
        पत्नी, छाया-देवी) की पुत्री बताया गया है। उसका स्वभाव उग्र है। शुभ
        कार्यों में उसके विघ्न से बचने के लिए देवों ने उसे एक विशिष्ट
        समय-विशेष का अधिकार दिया &mdash; और उसी अवधि में सब महत्त्वपूर्ण
        उद्यम रोक दिये जाते हैं। पौराणिक रूपक व्यावहारिक संकेत को पकड़ता है
        &mdash; विष्टि करण में नये आरम्भ टालिए।
      </p>

      <p>
        भद्रा एक चन्द्र-मास में आठ बार आती है &mdash; सात चर करणों के आठ
        चक्रों में से प्रत्येक में एक &mdash; और प्रत्येक बार लगभग 6–13
        घंटे चलती है। 30-दिन के चन्द्र-मास में कुल भद्रा-काल लगभग 90 घंटे
        होता है, आठ टुकड़ों में बँटा हुआ। पंचांग प्रत्येक भद्रा-अवधि को
        प्रारम्भ और समाप्ति के समय के साथ स्पष्ट रूप से अंकित करता है।
      </p>

      <h3>भद्रा-मुख और भद्रा-पुच्छ</h3>

      <p>
        प्रत्येक भद्रा-काल के भीतर शास्त्रीय ग्रंथ भद्रा के <em>मुख</em>{" "}
        और <em>पुच्छ</em> में और अन्तर करते हैं। मुख प्रथम, अधिक हानिकारक
        भाग है; पुच्छ अंत का कोमलतर। कुछ परम्पराएँ केवल मुख से बचने का
        निर्देश देती हैं, और पुच्छ में नियमित कार्य की अनुमति। मुख और
        पुच्छ का वितरण इस पर निर्भर है कि भद्रा दिन में पड़ रही है या
        रात्रि में, और कौन-से पक्ष में &mdash; यह पंचांग-पठन का अधिक
        अलंकृत क्षेत्र है। व्यावहारिक प्रयोजनों के लिए दैनिक पंचांग
        सम्पूर्ण भद्रा-अवधि को चिह्नित कर देता है, और पाठक अपनी परम्परा से
        सूक्ष्म भेद देख सकते हैं।
      </p>

      <h3>दिन की भद्रा बनाम रात्रि की भद्रा</h3>

      <p>
        एक व्यापक रूप से उद्धृत नियम है &mdash; <em>दिन की भद्रा रात्रि को
        दूषित करती है, और रात्रि की भद्रा दिन को दूषित करती है</em>।
        पौराणिक रूपक यह है कि स्वर्ग में रात्रि-भद्रा पृथ्वी पर दिन-भद्रा
        के बराबर, और इसके विपरीत। व्यावहारिक प्रभाव यह है कि कुछ भद्रा-अवधियाँ
        &ldquo;पृथ्वी पर निर्दोष&rdquo; मानी जाती हैं, क्योंकि उनकी अशुभ
        शक्ति देव-लोक की ओर निर्देशित है। यह सूक्ष्म भेद है और मुख्य
        पंचांग-प्रदर्शन में प्रायः नहीं आता, परन्तु विस्तृत मुहूर्त-ग्रंथों
        में आपको मिलेगा।
      </p>

      <KeyIdea
        title="विष्टि करण = भद्रा। इस अवधि में नये कार्य न आरम्भ करें।"
        titleHi="Vishti = Bhadra. Avoid new beginnings during this karana."
      >
        ग्यारह करणों में से दस सामान्य हैं, और एक &mdash; विष्टि &mdash;
        प्रबल अशुभ भार रखता है। भद्रा एक चन्द्र-मास में आठ बार आती है,
        प्रत्येक बार लगभग 6–13 घंटे, और सावधान पंचांग में सदा चिह्नित होती
        है। महत्त्वपूर्ण निर्णय, यात्राएँ, समारोह और उद्घाटन भद्रा की समाप्ति
        के बाद टाल दिये जाते हैं।
      </KeyIdea>

      <h2>अन्य चर करण &mdash; गुण</h2>

      <p>
        शेष छह चर करण (बव, बालव, कौलव, तैतिल, गर, वणिज) प्रायः शुभ अथवा
        सामान्य हैं। हर एक की पारम्परिक संगति है —
      </p>

      <ul>
        <li><strong>बव</strong> &mdash; आरम्भ, शासन, स्थायी उद्यम।</li>
        <li><strong>बालव</strong> &mdash; बल, शिक्षा, अनुष्ठान।</li>
        <li><strong>कौलव</strong> &mdash; मित्रता, संधि, पारिवारिक मामले।</li>
        <li><strong>तैतिल</strong> &mdash; आनन्द, वैवाहिक स्नेह, आभूषण।</li>
        <li><strong>गर</strong> &mdash; कृषि, निर्माण, स्थिर गृहस्थ कार्य।</li>
        <li>
          <strong>वणिज</strong> &mdash; व्यापार, वाणिज्य, वित्तीय लेन-देन
          (नाम का अर्थ ही &ldquo;व्यापारी&rdquo; है)।
        </li>
      </ul>

      <p>
        इन संगतियों का उपयोग विस्तृत मुहूर्त-चयन में होता है। विवाह-मुहूर्त
        में तैतिल पसन्द किया जा सकता है; व्यवसाय-प्रवर्तन में वणिज; कृषि-
        उद्यम में गर। दैनिक पंचांग-पठन के स्तर पर इन छह सौम्य करणों के
        बीच का भेद प्रायः निर्णायक नहीं होता &mdash; तिथि, नक्षत्र, योग
        और भद्रा का बचाव अधिक भार रखते हैं।
      </p>

      <h2>चार स्थिर करणों की संगतियाँ</h2>

      <p>
        अमावस्या को घेरे हुए चार स्थिर करणों की भी अपनी पारम्परिक संगतियाँ
        हैं, जो उस मास के &ldquo;श्याम&rdquo; संक्रमण-स्वरूप का प्रतिबिम्ब
        करती हैं —
      </p>

      <ul>
        <li>
          <strong>शकुनि</strong> &mdash; शकुन-विचार, आरम्भ का चिन्तन। कुछ
          शुभ प्रयोजनों के लिए।
        </li>
        <li>
          <strong>चतुष्पाद</strong> &mdash; चार-पैरों वाले प्राणियों
          (पशुधन, और विस्तार से घरेलू जीविका) से सम्बन्धित। सामान्य।
        </li>
        <li>
          <strong>नाग</strong> &mdash; सर्प, छिपी हुई वस्तुएँ, पैतृक-कर्म।
          प्रायः नये उद्यमों के लिए अशुभ।
        </li>
        <li>
          <strong>किंस्तुघ्न</strong> &mdash; नये पक्ष के आरम्भ के लिए
          प्रायः शुभ।
        </li>
      </ul>

      <h2>अपने पंचांग में करण पढ़ना</h2>

      <p>
        इस साइट के दैनिक पंचांग में करण की पंक्ति दिन में सक्रिय करण(रों)
        को बताती है। चूँकि करण हर अर्ध-तिथि (औसत लगभग 12 घंटे) पर बदलते
        हैं, अधिकांश दिनों में दो करण सूचीबद्ध मिलेंगे &mdash; एक जो
        सूर्योदय पर सक्रिय है, और दूसरा जो दिन में बाद में लेगा। प्रत्येक
        की समाप्ति का समय भी दिया रहता है।
      </p>

      <p>
        यदि आज का कोई करण विष्टि / भद्रा है, तो उसे प्रारम्भ-समाप्ति-समय
        सहित अलग से चिह्नित किया जाता है। नये आरम्भ इस अवधि से बाहर
        निर्धारित किये जाते हैं।
      </p>

      <h2>पाँच अंगों को मिलाकर देखें</h2>

      <p>
        अब हमारे पास सब पाँच हैं। कुछ क्षण रुककर देखें कि वे एक दिन के
        विवरण के रूप में कैसे जुड़ते हैं —
      </p>

      <ul>
        <li>
          <strong>वार</strong> &mdash; सप्ताह का दिन। एक ग्रह से शासित।
          चौघड़िया उत्पन्न करता है।
        </li>
        <li>
          <strong>तिथि</strong> &mdash; चन्द्र दिवस, सूर्य-चन्द्र के 12°
          अंतर से। उपवास, त्योहार और पक्ष निर्धारित करती है।
        </li>
        <li>
          <strong>नक्षत्र</strong> &mdash; चन्द्र-मण्डल (चन्द्र देशांतर ÷
          13°20')। कुण्डली में जन्म-नक्षत्र; गण, योनि, वर्ण के लक्षण
          वहन करता है।
        </li>
        <li>
          <strong>योग</strong> &mdash; सूर्य-चन्द्र संयुक्त देशांतर ÷
          13°20'। मुहूर्त-चयन की छानन; व्यतीपात और वैधृति को चिह्नित
          करता है।
        </li>
        <li>
          <strong>करण</strong> &mdash; तिथि का आधा। ग्यारह नाम, साठ स्थान।
          भद्रा को चिह्नित करता है।
        </li>
      </ul>

      <p>
        तिथि और करण का अंतर्निहित मान एक ही है (सूर्य-चन्द्र अंतर); योग
        सूर्य-चन्द्र का योग प्रयोग करता है; नक्षत्र अकेले चन्द्र को; वार
        पृथ्वी के घूर्णन की गिनती को। पाँच अंग, तीन खगोलीय आदान (सूर्य का
        देशांतर, चन्द्र का देशांतर, वार-गिनती), जो किसी भी क्षण के लिए
        आधुनिक इफेमेरिस और सूर्योदय-गणना से निकाले जा सकते हैं।
      </p>

      <KeyIdea
        title="पंचांग के पाँच अंग — दो कोणों के पाँच रूप"
        titleHi="The five limbs are five views of two angles."
      >
        सूर्य का देशांतर और चन्द्र का देशांतर। उनके अंतर से तिथि (और करण,
        तिथि का आधा)। उनके योग से नित्य योग। केवल चन्द्र के देशांतर से
        नक्षत्र। वार सिर्फ़ एक गिनती। पाँच परिणाम, तीन आदान, मूल में दो
        कोण। पूरा पंचांग इसी संक्षिप्त अंकगणित पर खड़ा है।
      </KeyIdea>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>बता सकें कि करण तिथि का आधा (6°) है।</li>
        <li>ग्यारह करणों के नाम &mdash; चार स्थिर और सात चर &mdash; गिना सकें।</li>
        <li>
          चार स्थिर करणों को अमावस्या के चारों ओर के उनके विशिष्ट स्थानों
          पर पहचान सकें।
        </li>
        <li>विष्टि को भद्रा के रूप में पहचान सकें और बता सकें कि वह क्यों चिह्नित होती है।</li>
        <li>भद्रा-मुख और भद्रा-पुच्छ में उच्च-स्तरीय भेद कर सकें।</li>
        <li>दैनिक पंचांग की करण-पंक्ति पढ़ सकें।</li>
        <li>संक्षेप में बता सकें कि सब पाँच अंग सूर्य और चन्द्र के देशांतरों से कैसे निकलते हैं।</li>
      </ul>

      <p>
        पाँच अंगों के साथ अब हम उस ढाँचे की ओर बढ़ते हैं जिसमें वे बैठते
        हैं &mdash; राशि (राशि-चक्र) और 27 नक्षत्र 12 राशियों पर कैसे
        सजते हैं। उसके बाद हम नौ ग्रहों में से प्रत्येक पर एक पूरा अध्याय
        देंगे, और फिर व्युत्पन्न अवधारणाओं की ओर बढ़ेंगे &mdash; काल-इकाइयाँ,
        चौघड़िया, मुहूर्त, राहु काल, और शुभ-अशुभ संयोग। पुस्तक 1 के अंत तक
        हम इन सबको एक वास्तविक दिन के पंचांग के पठन के रूप में पुनः जोड़ेंगे।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

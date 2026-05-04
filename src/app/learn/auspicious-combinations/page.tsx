import { ChapterShell } from "@/components/learn/ChapterShell";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("auspicious-combinations")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We have looked at the five limbs separately and at the
        practical schedules they produce. There remains one more
        category of panchang feature: the named{" "}
        <strong>combination yogas</strong>{" "}
        <span lang="hi">(संयोग)</span> that emerge when specific
        tithis, varas, and nakshatras align in particular ways.
        These combinations are not part of the five primary
        limbs — they are derived. But they are flagged
        prominently on a careful panchang because they
        substantially modify the day&rsquo;s overall reading.
      </p>

      <p>
        The word <em>yoga</em> here is being used in its
        broadest sense — &ldquo;a combination, a coming
        together&rdquo; — distinct from both the technical
        nitya yoga of chapter 5 and from the spiritual yoga
        path. Context distinguishes them.
      </p>

      <p>
        We will cover the most-flagged combinations: the
        powerful auspicious yogas (Sarvarth Siddhi, Amrit
        Siddhi, Tripushkar, Dwipushkar) and the cautioned
        periods (Panchaka, Bhadra positioning, Mrityu Yoga,
        and a few others).
      </p>

      <h2>Sarvarth Siddhi Yoga — &ldquo;all-purpose success&rdquo; <span lang="hi">सर्वार्थ सिद्धि योग</span></h2>

      <p>
        <strong>Sarvarth Siddhi</strong>{" "}
        <span lang="hi">(सर्वार्थ सिद्धि)</span> means &ldquo;the
        accomplishment of all purposes.&rdquo; It is one of the
        most strongly auspicious combination yogas in the
        panchang, and it appears regularly throughout the year
        — usually several times per month.
      </p>

      <p>
        The yoga forms when a specific weekday combines with a
        specific nakshatra. The classical tabulation is:
      </p>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Nakshatra(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sunday</td><td>Hasta, Mula, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Pushya</td></tr>
          <tr><td>Monday</td><td>Shravana, Rohini, Mrigashira, Pushya, Anuradha</td></tr>
          <tr><td>Tuesday</td><td>Ashwini, Krittika, Ashlesha, Uttara Bhadrapada</td></tr>
          <tr><td>Wednesday</td><td>Krittika, Rohini, Mrigashira, Hasta, Anuradha</td></tr>
          <tr><td>Thursday</td><td>Ashwini, Punarvasu, Pushya, Anuradha, Revati</td></tr>
          <tr><td>Friday</td><td>Ashwini, Punarvasu, Anuradha, Shravana, Revati</td></tr>
          <tr><td>Saturday</td><td>Shravana, Rohini, Swati</td></tr>
        </tbody>
      </table>

      <p>
        When the day&rsquo;s nakshatra at sunrise is in the
        list for that vara, Sarvarth Siddhi yoga is in effect
        for the duration of that nakshatra. It overrides — or
        at least substantially mitigates — most other
        unfavourable indicators for the activity in question.
      </p>

      <p>
        The traditional usage is: if you cannot find a
        formally clean muhurta but Sarvarth Siddhi is in
        effect, it is acceptable to proceed with auspicious
        new beginnings.
      </p>

      <h2>Amrit Siddhi Yoga — the immortal accomplishment <span lang="hi">अमृत सिद्धि योग</span></h2>

      <p>
        <strong>Amrit Siddhi</strong>{" "}
        <span lang="hi">(अमृत सिद्धि)</span> means &ldquo;the
        accomplishment of immortality.&rdquo; This is a more
        restricted combination than Sarvarth Siddhi, applying
        only to specific day-nakshatra pairings:
      </p>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Nakshatra</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sunday</td><td>Hasta</td></tr>
          <tr><td>Monday</td><td>Mrigashira</td></tr>
          <tr><td>Tuesday</td><td>Ashwini</td></tr>
          <tr><td>Wednesday</td><td>Anuradha</td></tr>
          <tr><td>Thursday</td><td>Pushya</td></tr>
          <tr><td>Friday</td><td>Revati</td></tr>
          <tr><td>Saturday</td><td>Rohini</td></tr>
        </tbody>
      </table>

      <p>
        Amrit Siddhi is one of the most powerful combination
        yogas. The most famous of these is{" "}
        <strong>Guru Pushya Yoga</strong> — Thursday with
        Pushya nakshatra. This combination is held to be
        among the very best moments in the entire year for
        making major financial commitments, beginning study,
        starting spiritual practice, and any major
        undertaking with long-term implications.
      </p>

      <KeyIdea
        title="Guru Pushya Yoga is the most-celebrated muhurta of the year."
        titleHi="गुरु पुष्य योग वर्ष का सबसे प्रशंसित मुहूर्त है"
      >
        Pushya nakshatra falling on a Thursday (Guru-vara) is
        a confluence of three favourable indicators: Pushya
        is the most auspicious nakshatra; Thursday is
        Jupiter-ruled; and the resulting Amrit Siddhi yoga is
        one of the strongest. People specifically wait for
        Guru Pushya days to make significant financial
        purchases, particularly gold and property.
      </KeyIdea>

      <h2>Tripushkar and Dwipushkar Yogas <span lang="hi">त्रिपुष्कर / द्विपुष्कर योग</span></h2>

      <p>
        These two yogas have an unusual property: they
        <em> multiply</em> the effect of whatever happens during
        them — multiplying it three times (Tripushkar) or two
        times (Dwipushkar). This means they amplify both good
        and bad effects, and traditional advice is to use them
        only for clearly auspicious activities, never for
        anything ambiguous.
      </p>

      <h3>Tripushkar Yoga <span lang="hi">त्रिपुष्कर योग</span></h3>
      <p>
        Forms when three conditions coincide:
      </p>
      <ul>
        <li>
          Tithi is Bhadra-tithi (2nd, 7th, or 12th of either
          paksha — these are also called bhadraja tithis)
        </li>
        <li>
          Vara is Sunday, Tuesday, or Saturday
        </li>
        <li>
          Nakshatra is Krittika, Punarvasu, Uttara Phalguni,
          Vishakha, Uttara Ashadha, or Purva Bhadrapada (the
          six nakshatras whose names imply &ldquo;triple&rdquo;
          or which fall in trika positions)
        </li>
      </ul>

      <p>
        When all three coincide, Tripushkar is in effect.
        Material gains acquired during Tripushkar are
        multiplied threefold. Property purchased in Tripushkar
        is said to bring three times the expected wealth. But
        debts contracted in Tripushkar will also need to be
        paid back three times — and losses accrued during this
        yoga are tripled. So choose only auspicious actions.
      </p>

      <h3>Dwipushkar Yoga <span lang="hi">द्विपुष्कर योग</span></h3>
      <p>
        Same general structure but with different
        eligibility — the multiplication is twofold rather
        than threefold. Tithis: 2nd, 7th, 12th; Days: Sunday,
        Tuesday, Saturday; Nakshatras: Mrigashira,
        Chitra, Dhanishta. When all three coincide, Dwipushkar
        is in effect.
      </p>

      <p>
        Both yogas are flagged on the panchang when they occur.
        They are rare — sometimes only a handful of days per
        year produce them — and represent prized moments for
        major auspicious purchases.
      </p>

      <h2>Ravi Pushya Yoga — the Sun-Pushya combination <span lang="hi">रवि पुष्य योग</span></h2>

      <p>
        Sunday with Pushya nakshatra. This is another instance
        of Amrit Siddhi but specifically called out by name in
        many regional traditions because of the special quality
        of Sun + Pushya. Sunday is the first day of the week, the
        Sun&rsquo;s day; Pushya is the most nourishing
        nakshatra. The combination is held to be ideal for
        starting any work that requires both authority and
        nourishment — government work, leadership ventures,
        political launches, and similar undertakings.
      </p>

      <h2>Panchaka — the inauspicious five-day window <span lang="hi">पंचक</span></h2>

      <p>
        We mentioned panchaka briefly in the nakshatra chapter.
        It deserves its own treatment here.
      </p>

      <p>
        Panchaka is the period during which the Moon transits
        the last five nakshatras of the zodiac:
      </p>

      <ol>
        <li>Dhanishta (the second half — padas 3 and 4)</li>
        <li>Shatabhisha</li>
        <li>Purva Bhadrapada</li>
        <li>Uttara Bhadrapada</li>
        <li>Revati</li>
      </ol>

      <p>
        Total span: 4½ nakshatras × 13°20′ = 60° = 4 days
        approximately, since the Moon moves through 13°20′
        per day on average. Panchaka occurs once each lunar
        month, lasting about 4–5 days, when the Moon is
        traversing this five-nakshatra region (which falls in
        the rashis Kumbha and Meena).
      </p>

      <p>
        Five activities are traditionally avoided during
        panchaka, captured in a Sanskrit verse:
      </p>

      <ol>
        <li>
          <strong>Kashta-grahanam</strong>{" "}
          <span lang="hi">(काष्ठ-ग्रहण)</span> — gathering
          firewood. By extension, gathering wood for major
          construction.
        </li>
        <li>
          <strong>Shava-pradhanam</strong>{" "}
          <span lang="hi">(शव-प्रदहन)</span> — cremation. If a
          death occurs during panchaka, traditional
          observance includes additional rituals to
          counteract the multiplying effect of panchaka
          (since panchaka multiplies — the fear is that a
          single death during panchaka may be followed by
          four more in the family within a short period).
        </li>
        <li>
          <strong>Kati-bandhanam</strong>{" "}
          <span lang="hi">(खाट-बन्धन)</span> — bed-making /
          purchasing of beds.
        </li>
        <li>
          <strong>Griha-chhadanam</strong>{" "}
          <span lang="hi">(गृह-छादन)</span> — roof-laying on
          a new building.
        </li>
        <li>
          <strong>Dakshina-prayanam</strong>{" "}
          <span lang="hi">(दक्षिण-प्रयाण)</span> — travel
          southward.
        </li>
      </ol>

      <p>
        These five prohibitions are traditional. Modern
        observance varies. Construction crews in many parts of
        India still do not lay roofs during panchaka.
        Wood-gathering for major timber-frame work is
        deferred. The cremation prohibition is largely
        symbolic — funerals do happen during panchaka, with
        additional ritual mitigations.
      </p>

      <h2>Mrityu Yoga and similar inauspicious combinations <span lang="hi">मृत्यु योग</span></h2>

      <p>
        Several combinations of vara and tithi produce yogas
        called <em>Mrityu</em> (death), <em>Yamaghanta</em>{" "}
        (Yama&rsquo;s bell), <em>Vishaghata</em> (poison strike),
        and other ominously-named combinations. They are
        flagged on a careful panchang. Their general use is to
        warn against new beginnings; any auspicious work begun
        during them is held to suffer in the long term.
      </p>

      <p>
        These yogas form when specific tithi-vara or
        nakshatra-vara combinations occur — for example,
        Saptami (7th tithi) on Tuesday is one classical Mrityu
        Yoga combination. The complete enumeration is in the
        muhurta literature; for everyday panchang reading, the
        important practice is simply to recognise when one is
        flagged on your panchang and consider deferring
        important work past its window.
      </p>

      <h2>The Bhadra positioning rules <span lang="hi">भद्रा-वास नियम</span></h2>

      <p>
        We met Bhadra in the karana chapter as the
        inauspicious 7th karana (Vishti). Bhadra has additional
        positional rules that affect its severity. The
        traditional dictum is: <em>Bhadra in heaven spoils
        nothing on earth. Bhadra in the netherworld spoils
        nothing on earth. Only Bhadra on earth itself causes
        harm.</em>{" "}
        <span lang="hi">(स्वर्ग की भद्रा हानि नहीं करती; पाताल
        की भद्रा हानि नहीं करती; पृथ्वी पर ही भद्रा हानि करती
        है।)</span>
      </p>

      <p>
        Where does the Bhadra reside on a given day? Tradition
        prescribes specific positions for each tithi-paksha
        combination. The detailed scheme is in classical
        muhurta texts; the practical observance is that some
        Bhadra-occurrences are flagged as &ldquo;effective on
        earth&rdquo; (avoid) and others as &ldquo;not on
        earth&rdquo; (proceed cautiously).
      </p>

      <p>
        For everyday use, a careful panchang flags Bhadra with
        its position (heaven, earth, or netherworld), and
        readers can consult their tradition for the
        appropriate response.
      </p>

      <h2>Holashtak — the eight days before Holi <span lang="hi">होलाष्टक</span></h2>

      <p>
        A regional convention worth knowing: in many North
        Indian traditions, the eight days from Phalguna Shukla
        Ashtami to Phalguna Purnima (the day of Holi) are
        called <em>Holashtak</em> — &ldquo;the eight days of
        Holi.&rdquo; These days are traditionally inauspicious
        for marriage, beginning a new business, or making
        major purchases. The reasoning is mythological — these
        are the days during which Bhakta Prahlad endured his
        father Hiranyakashipu&rsquo;s torments in the
        Hiranyakashipu story — and the inauspiciousness is
        carried forward as a regional observance.
      </p>

      <p>
        Holashtak is observed mostly in Uttar Pradesh,
        Madhya Pradesh, Bihar, and Rajasthan; not all regions
        observe it.
      </p>

      <h2>Anala-yoga, Shashthi-vara combinations, and others</h2>

      <p>
        Beyond the major yogas above, classical muhurta texts
        catalogue dozens of further combinations — some
        auspicious (e.g., <em>Vridhi Yoga</em>, <em>Ekargala
        Yoga</em>, <em>Brahma Yoga</em>), some inauspicious
        (<em>Krakacha Yoga</em>, <em>Visha Yoga</em>,
        <em>Hutasana Yoga</em>). The full list runs to hundreds
        of named yogas. For a beginner, the ones in this
        chapter cover the bulk of what a daily panchang flags.
        For a serious student of muhurta, the{" "}
        <em>Muhurta Chintamani</em> and the{" "}
        <em>Muhurta Martanda</em> are the standard reference
        texts.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>
          Define Sarvarth Siddhi Yoga, Amrit Siddhi Yoga, and
          state the day-nakshatra combinations that produce
          each.
        </li>
        <li>
          Identify Guru Pushya Yoga as the most celebrated
          combination of the year.
        </li>
        <li>
          Distinguish Tripushkar and Dwipushkar yogas and
          state that they multiply effects (good and bad).
        </li>
        <li>
          Define Panchaka, identify its five constituent
          nakshatras, and recall the five activities
          traditionally avoided during it.
        </li>
        <li>
          State that Mrityu Yoga and similar combinations
          are inauspicious and to be avoided for new
          beginnings.
        </li>
        <li>
          Identify Holashtak as a regional eight-day
          inauspicious window.
        </li>
        <li>
          Read a panchang&rsquo;s combination yoga line and
          know what each named yoga implies.
        </li>
      </ul>

      <p>
        Now we have all the elements. In the final chapter of
        Book 1, we will read a complete daily panchang from
        top to bottom — taking a real day in the calendar,
        identifying every panchang feature on it, and
        synthesising them into a complete picture. After that,
        the panchang on this site will look like a
        well-arranged paragraph rather than an opaque table.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        हम पाँच अंगों को अलग-अलग देख चुके हैं और उनसे निकलने वाली व्यावहारिक
        समय-सारणियों को भी। पंचांग की एक और श्रेणी अभी शेष है &mdash; नामित
        <strong> संयोग योग</strong>, जो विशिष्ट तिथियों, वारों और नक्षत्रों
        के विशिष्ट तरीकों से एक स्थान पर आने पर प्रकट होते हैं। ये संयोग
        पाँच प्राथमिक अंगों का अंग नहीं हैं &mdash; ये उनसे व्युत्पन्न हैं।
        परन्तु एक सावधान पंचांग पर ये प्रमुखता से चिह्नित होते हैं, क्योंकि
        वे दिन के समग्र पठन को महत्त्वपूर्ण रूप से संशोधित करते हैं।
      </p>

      <p>
        यहाँ <em>योग</em> शब्द अपने व्यापकतम अर्थ में &mdash; &ldquo;मिलन,
        एक स्थान पर आना&rdquo; &mdash; प्रयुक्त है, जो अध्याय 5 के तकनीकी
        नित्य योग और आध्यात्मिक योग-मार्ग दोनों से भिन्न है। सन्दर्भ ही
        अर्थ स्पष्ट करता है।
      </p>

      <p>
        हम सर्वाधिक चिह्नित संयोगों को देखेंगे: प्रबल शुभ योग (सर्वार्थ
        सिद्धि, अमृत सिद्धि, त्रिपुष्कर, द्विपुष्कर) और सावधानी वाले काल
        (पंचक, भद्रा-स्थिति, मृत्यु योग, और कुछ अन्य)।
      </p>

      <h2>सर्वार्थ सिद्धि योग &mdash; &ldquo;सब प्रयोजनों की सिद्धि&rdquo;</h2>

      <p>
        <strong>सर्वार्थ सिद्धि</strong> का अर्थ है &ldquo;सब प्रयोजनों की
        प्राप्ति।&rdquo; यह पंचांग के सर्वाधिक प्रबल शुभ संयोग योगों में
        से एक है, और वर्ष-भर में नियमित रूप से प्रकट होता है &mdash;
        सामान्यतः प्रति मास कई बार।
      </p>

      <p>
        यह योग तब बनता है जब कोई विशिष्ट वार किसी विशिष्ट नक्षत्र के साथ
        संयुक्त हो। शास्त्रीय तालिका —
      </p>

      <table>
        <thead>
          <tr>
            <th>वार</th>
            <th>नक्षत्र</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>रविवार</td><td>हस्त, मूल, उत्तर-फाल्गुनी, उत्तराषाढ़ा, उत्तर-भाद्रपदा, पुष्य</td></tr>
          <tr><td>सोमवार</td><td>श्रवण, रोहिणी, मृगशिरा, पुष्य, अनुराधा</td></tr>
          <tr><td>मंगलवार</td><td>अश्विनी, कृत्तिका, आश्लेषा, उत्तर-भाद्रपदा</td></tr>
          <tr><td>बुधवार</td><td>कृत्तिका, रोहिणी, मृगशिरा, हस्त, अनुराधा</td></tr>
          <tr><td>गुरुवार</td><td>अश्विनी, पुनर्वसु, पुष्य, अनुराधा, रेवती</td></tr>
          <tr><td>शुक्रवार</td><td>अश्विनी, पुनर्वसु, अनुराधा, श्रवण, रेवती</td></tr>
          <tr><td>शनिवार</td><td>श्रवण, रोहिणी, स्वाति</td></tr>
        </tbody>
      </table>

      <p>
        जब दिन का सूर्योदय-कालीन नक्षत्र उस वार की सूची में हो, तो उस
        नक्षत्र की पूरी अवधि-भर सर्वार्थ सिद्धि योग सक्रिय रहता है। यह
        अधिकांश अन्य प्रतिकूल संकेतों को विशिष्ट कार्य के लिए दबा देता है
        &mdash; अथवा कम-से-कम महत्त्वपूर्ण रूप से कम कर देता है।
      </p>

      <p>
        पारम्परिक प्रयोग है: यदि कोई औपचारिक रूप से स्वच्छ मुहूर्त नहीं
        मिल रहा परन्तु सर्वार्थ सिद्धि सक्रिय है, तो शुभ नये आरम्भ
        स्वीकार्य हैं।
      </p>

      <h2>अमृत सिद्धि योग &mdash; अमर सिद्धि</h2>

      <p>
        <strong>अमृत सिद्धि</strong> का अर्थ है &ldquo;अमरत्व की सिद्धि।
        &rdquo; यह सर्वार्थ सिद्धि से अधिक प्रतिबन्धित संयोग है, जो केवल
        विशिष्ट वार-नक्षत्र युग्मों पर लागू होता है —
      </p>

      <table>
        <thead>
          <tr>
            <th>वार</th>
            <th>नक्षत्र</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>रविवार</td><td>हस्त</td></tr>
          <tr><td>सोमवार</td><td>मृगशिरा</td></tr>
          <tr><td>मंगलवार</td><td>अश्विनी</td></tr>
          <tr><td>बुधवार</td><td>अनुराधा</td></tr>
          <tr><td>गुरुवार</td><td>पुष्य</td></tr>
          <tr><td>शुक्रवार</td><td>रेवती</td></tr>
          <tr><td>शनिवार</td><td>रोहिणी</td></tr>
        </tbody>
      </table>

      <p>
        अमृत सिद्धि सबसे प्रबल संयोग योगों में से एक है। इनमें सबसे
        प्रसिद्ध है <strong>गुरु पुष्य योग</strong> &mdash; गुरुवार के साथ
        पुष्य नक्षत्र। यह संयोग पूरे वर्ष के सर्वोत्तम क्षणों में माना
        जाता है &mdash; प्रमुख वित्तीय प्रतिबद्धताएँ करने, अध्ययन का
        आरम्भ, आध्यात्मिक साधना की शुरुआत, और कोई भी दीर्घकालिक प्रभाव
        वाला बड़ा उद्यम।
      </p>

      <KeyIdea
        title="गुरु पुष्य योग वर्ष का सबसे प्रशंसित मुहूर्त है"
        titleHi="Guru Pushya Yoga is the most-celebrated muhurta of the year."
      >
        गुरुवार पर पुष्य नक्षत्र तीन शुभ संकेतकों का संगम है: पुष्य
        सर्वाधिक शुभ नक्षत्र है; गुरुवार गुरु-शासित है; और परिणामी अमृत
        सिद्धि योग सबसे प्रबल में से एक। लोग गुरु पुष्य के दिनों की
        प्रतीक्षा करते हैं ताकि महत्त्वपूर्ण वित्तीय खरीदें कर सकें,
        विशेषतः स्वर्ण और सम्पत्ति।
      </KeyIdea>

      <h2>त्रिपुष्कर और द्विपुष्कर योग</h2>

      <p>
        इन दो योगों की एक असामान्य विशेषता है &mdash; ये अपने भीतर हो रहे
        फल को <em>गुणित</em> कर देते हैं &mdash; तीन गुना (त्रिपुष्कर)
        अथवा दो गुना (द्विपुष्कर)। इसका अर्थ है कि वे शुभ और अशुभ दोनों
        प्रभावों को बढ़ा देते हैं, और पारम्परिक सलाह है कि इनका प्रयोग
        केवल स्पष्ट रूप से शुभ कार्यों के लिए हो, संदिग्ध कार्यों के
        लिए कभी नहीं।
      </p>

      <h3>त्रिपुष्कर योग</h3>
      <p>तीन शर्तों के एक साथ होने पर बनता है —</p>
      <ul>
        <li>
          तिथि भद्रा-तिथि हो (किसी भी पक्ष की 2री, 7वीं अथवा 12वीं &mdash;
          इन्हें भद्रजा तिथियाँ भी कहते हैं)
        </li>
        <li>वार रविवार, मंगलवार, अथवा शनिवार हो</li>
        <li>
          नक्षत्र कृत्तिका, पुनर्वसु, उत्तर-फाल्गुनी, विशाखा, उत्तराषाढ़ा
          अथवा पूर्व-भाद्रपदा हो (वे छह नक्षत्र जिनके नाम
          &ldquo;त्रि&rdquo; का संकेत देते हैं अथवा त्रिक स्थानों में
          पड़ते हैं)
        </li>
      </ul>

      <p>
        जब तीनों एक साथ हों, त्रिपुष्कर सक्रिय है। त्रिपुष्कर में अर्जित
        भौतिक लाभ तीन गुना हो जाते हैं। इस काल में खरीदी गयी सम्पत्ति
        अपेक्षित धन से तीन गुना देती है, ऐसा कहा जाता है। परन्तु
        त्रिपुष्कर में लिया गया ऋण भी तीन गुना चुकाना पड़ेगा &mdash; और
        इस योग में अर्जित हानियाँ भी तिगुनी होती हैं। अतः केवल शुभ कार्य
        ही चुनिए।
      </p>

      <h3>द्विपुष्कर योग</h3>
      <p>
        सामान्य संरचना वही है, परन्तु पात्रता-शर्तें अलग &mdash; गुणन
        तीन गुना के स्थान पर दो गुना। तिथियाँ: 2री, 7वीं, 12वीं; वार:
        रविवार, मंगलवार, शनिवार; नक्षत्र: मृगशिरा, चित्रा, धनिष्ठा। जब
        तीनों एक साथ हों, द्विपुष्कर सक्रिय है।
      </p>

      <p>
        दोनों योग पंचांग पर सक्रिय होने पर चिह्नित होते हैं। ये दुर्लभ
        हैं &mdash; कभी-कभी पूरे वर्ष में कुछ ही दिन ऐसे होते हैं
        &mdash; और प्रमुख शुभ खरीदों के लिए मूल्यवान् क्षण माने जाते हैं।
      </p>

      <h2>रवि पुष्य योग &mdash; सूर्य-पुष्य संयोग</h2>

      <p>
        रविवार के साथ पुष्य नक्षत्र। यह भी अमृत सिद्धि का ही एक प्रकार
        है, परन्तु अनेक क्षेत्रीय परम्पराओं में अपने नाम से इसका विशेष
        उल्लेख होता है &mdash; क्योंकि सूर्य + पुष्य की संगति विशेष है।
        रविवार सप्ताह का प्रथम दिन, सूर्य का दिन; पुष्य सबसे पोषक
        नक्षत्र। संगति आदर्श मानी जाती है उन कार्यों के आरम्भ के लिए
        जिनमें अधिकार और पोषण दोनों आवश्यक हों &mdash; सरकारी कार्य,
        नेतृत्व-उद्यम, राजनीतिक प्रवर्तन, इत्यादि।
      </p>

      <h2>पंचक &mdash; अशुभ पाँच-दिन का अंतराल</h2>

      <p>
        हमने नक्षत्र-अध्याय में पंचक का संक्षिप्त उल्लेख किया था। यह यहाँ
        अपने स्वतंत्र विवेचन का अधिकारी है।
      </p>

      <p>
        पंचक वह काल है जब चन्द्रमा राशि-चक्र के अंतिम पाँच नक्षत्रों से
        होकर जा रहा हो —
      </p>

      <ol>
        <li>धनिष्ठा (उत्तरार्ध &mdash; पाद 3 और 4)</li>
        <li>शतभिषा</li>
        <li>पूर्व-भाद्रपदा</li>
        <li>उत्तर-भाद्रपदा</li>
        <li>रेवती</li>
      </ol>

      <p>
        कुल विस्तार: 4½ नक्षत्र × 13°20' = 60° = लगभग 4 दिन (चूँकि चन्द्र
        औसतन 13°20' प्रति दिन चलता है)। पंचक प्रत्येक चन्द्र-मास में एक
        बार आता है, लगभग 4–5 दिन का, जब चन्द्र पाँच-नक्षत्र क्षेत्र
        (कुम्भ और मीन राशियों में) से गुजर रहा हो।
      </p>

      <p>
        पंचक में पाँच कार्य पारम्परिक रूप से वर्जित हैं, जो एक संस्कृत
        श्लोक में बद्ध हैं —
      </p>

      <ol>
        <li>
          <strong>काष्ठ-ग्रहण</strong> &mdash; ईंधन का संग्रह। विस्तार
          से, बड़े निर्माण के लिए लकड़ी का संग्रह।
        </li>
        <li>
          <strong>शव-प्रदहन</strong> &mdash; अंत्येष्टि। यदि पंचक में
          मृत्यु हो, तो पारम्परिक रूप से अतिरिक्त अनुष्ठान किये जाते
          हैं ताकि पंचक के गुणन-प्रभाव का प्रत्युत्तर हो (भय यह है कि
          पंचक में एक मृत्यु के बाद परिवार में अल्प समय में चार और हो
          जायें)।
        </li>
        <li>
          <strong>खाट-बन्धन</strong> &mdash; पलंग बनाना अथवा खरीदना।
        </li>
        <li>
          <strong>गृह-छादन</strong> &mdash; नये भवन की छत-छादन।
        </li>
        <li>
          <strong>दक्षिण-प्रयाण</strong> &mdash; दक्षिण की यात्रा।
        </li>
      </ol>

      <p>
        ये पाँच निषेध पारम्परिक हैं। आधुनिक पालन भिन्न-भिन्न है। भारत के
        अनेक भागों में निर्माण-कर्मी अब भी पंचक में छत नहीं डालते। बड़े
        लकड़ी-ढाँचे के काम के लिए लकड़ी-संग्रह टाल दिया जाता है।
        अंत्येष्टि-निषेध का अर्थ अधिकतर प्रतीकात्मक है &mdash; अंत्येष्टि
        पंचक में होती हैं, अतिरिक्त अनुष्ठानिक प्रत्युत्तर के साथ।
      </p>

      <h2>मृत्यु योग और इसी प्रकार के अन्य अशुभ संयोग</h2>

      <p>
        वार और तिथि के कई संयोग ऐसे हैं जो <em>मृत्यु</em> (मृत्यु),{" "}
        <em>यमघण्ट</em> (यम की घंटा), <em>विषघटी</em> (विष-प्रहार) आदि
        भयप्रद नामों के योगों को जन्म देते हैं। एक सावधान पंचांग पर ये
        चिह्नित होते हैं। उनका सामान्य उपयोग नये आरम्भों के विरुद्ध
        चेतावनी देना है; इन योगों में आरम्भ किया गया कोई भी शुभ कार्य
        दीर्घकाल में पीड़ित होता है, ऐसा माना जाता है।
      </p>

      <p>
        ये योग तब बनते हैं जब विशिष्ट तिथि-वार अथवा नक्षत्र-वार संयोग
        होते हैं &mdash; उदाहरण के लिए, मंगलवार पर सप्तमी (7वीं तिथि)
        एक शास्त्रीय मृत्यु योग संयोग है। पूरी सूची मुहूर्त-साहित्य में
        है; दैनिक पंचांग-पठन के लिए महत्त्वपूर्ण व्यवहार बस यह है कि
        जब आपके पंचांग पर ऐसा कोई योग चिह्नित हो, तो उसे पहचान सकें और
        महत्त्वपूर्ण कार्य उसकी अवधि-समाप्ति के बाद टालें।
      </p>

      <h2>भद्रा-वास नियम</h2>

      <p>
        करण-अध्याय में हम भद्रा से अशुभ 7वें करण (विष्टि) के रूप में
        मिले थे। भद्रा के और भी स्थान-नियम हैं जो उसकी कठोरता को
        प्रभावित करते हैं। पारम्परिक उक्ति है &mdash; <em>स्वर्ग की
        भद्रा पृथ्वी पर हानि नहीं करती; पाताल की भद्रा पृथ्वी पर हानि
        नहीं करती; पृथ्वी की भद्रा ही पृथ्वी पर हानि करती है।</em>
      </p>

      <p>
        किसी विशिष्ट दिन भद्रा कहाँ निवास करती है? परम्परा प्रत्येक
        तिथि-पक्ष संयोजन के लिए विशिष्ट स्थान निर्धारित करती है। विस्तृत
        योजना शास्त्रीय मुहूर्त-ग्रंथों में है; व्यावहारिक पालन यह है कि
        कुछ भद्रा-घटनाएँ &ldquo;पृथ्वी पर प्रभावी&rdquo; (टालें) और कुछ
        &ldquo;पृथ्वी पर नहीं&rdquo; (सावधानी से आगे बढ़ें) के रूप में
        चिह्नित होती हैं।
      </p>

      <p>
        दैनिक उपयोग के लिए, एक सावधान पंचांग भद्रा को उसके स्थान (स्वर्ग,
        पृथ्वी अथवा पाताल) सहित चिह्नित करता है, और पाठक अपनी परम्परा
        से उपयुक्त प्रतिक्रिया देख सकते हैं।
      </p>

      <h2>होलाष्टक &mdash; होली से पहले के आठ दिन</h2>

      <p>
        एक क्षेत्रीय परिपाटी ज्ञातव्य है: उत्तर भारत की कई परम्पराओं में
        फाल्गुन शुक्ल अष्टमी से फाल्गुन पूर्णिमा (होली का दिन) तक के आठ
        दिनों को <em>होलाष्टक</em> &mdash; &ldquo;होली के आठ दिन&rdquo;
        &mdash; कहा जाता है। ये दिन पारम्परिक रूप से विवाह, नये व्यवसाय
        के आरम्भ, अथवा बड़ी खरीदों के लिए अशुभ माने जाते हैं। तर्क
        पौराणिक है &mdash; ये वे दिन हैं जिनमें भक्त प्रह्लाद ने अपने
        पिता हिरण्यकशिपु के अत्याचार सहन किये &mdash; और इसका अशुभ-भाव
        एक क्षेत्रीय आचार के रूप में आगे चला आया।
      </p>

      <p>
        होलाष्टक मुख्यतः उत्तर प्रदेश, मध्य प्रदेश, बिहार और राजस्थान में
        मनाया जाता है; सब क्षेत्रों में नहीं।
      </p>

      <h2>अनल योग, षष्ठी-वार संयोग, और अन्य</h2>

      <p>
        ऊपर दिये गये प्रमुख योगों के अलावा शास्त्रीय मुहूर्त-ग्रंथ दर्जनों
        अन्य संयोगों को सूचीबद्ध करते हैं &mdash; कुछ शुभ (जैसे{" "}
        <em>वृद्धि योग</em>, <em>एकार्गल योग</em>, <em>ब्रह्म योग</em>),
        कुछ अशुभ (<em>क्रकच योग</em>, <em>विष योग</em>,{" "}
        <em>हुताशन योग</em>)। नामित योगों की पूरी सूची सैकड़ों तक जाती
        है। शुरुआती पाठक के लिए, इस अध्याय में दिये गये योग दैनिक पंचांग
        में चिह्नित होने वाले अधिकांश योगों को समेट लेते हैं। मुहूर्त के
        गम्भीर विद्यार्थी के लिए <em>मुहूर्त चिन्तामणि</em> और{" "}
        <em>मुहूर्त मार्तण्ड</em> मानक सन्दर्भ-ग्रंथ हैं।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>
          सर्वार्थ सिद्धि योग और अमृत सिद्धि योग को परिभाषित कर सकें, और
          उनके वार-नक्षत्र संयोग बता सकें।
        </li>
        <li>
          गुरु पुष्य योग को वर्ष के सर्वाधिक प्रशंसित संयोग के रूप में
          पहचान सकें।
        </li>
        <li>
          त्रिपुष्कर और द्विपुष्कर में भेद कर सकें और बता सकें कि वे
          प्रभाव (शुभ और अशुभ) को गुणित करते हैं।
        </li>
        <li>
          पंचक को परिभाषित कर सकें, उसके पाँच घटक नक्षत्र पहचान सकें, और
          पारम्परिक रूप से वर्जित पाँच कार्य स्मरण कर सकें।
        </li>
        <li>
          बता सकें कि मृत्यु योग और इसी प्रकार के संयोग नये आरम्भों के
          लिए अशुभ माने जाते हैं।
        </li>
        <li>
          होलाष्टक को क्षेत्रीय आठ-दिवसीय अशुभ अंतराल के रूप में पहचान
          सकें।
        </li>
        <li>
          पंचांग की संयोग-योग पंक्ति पढ़ सकें और हर नामित योग का अर्थ
          समझ सकें।
        </li>
      </ul>

      <p>
        अब हमारे पास सब तत्त्व हैं। पुस्तक 1 के अंतिम अध्याय में हम एक
        सम्पूर्ण दैनिक पंचांग को आरम्भ से अंत तक पढ़ेंगे &mdash; कैलेंडर
        का एक वास्तविक दिन लेकर, उस पर हर पंचांग-विशेषता को पहचानकर,
        और इन सबको एक सम्पूर्ण चित्र में सम्मिलित करके। उसके बाद इसी
        साइट का पंचांग आपको अपारदर्शी तालिका के बजाय एक सुसज्जित
        अनुच्छेद की तरह दिखेगा।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

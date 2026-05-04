import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("muhurta")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We have met the muhurta as a unit of time (48 minutes,
        chapter 9) and the choghadiya as a daily schedule of
        eight 96-minute periods (chapter 10). We come now to the
        most rigorously avoided windows of the day — the periods
        that classical muhurta texts treat with the highest
        seriousness, never to be ignored when scheduling
        important undertakings.
      </p>

      <p>
        These are the three classical malefic periods —{" "}
        <strong>Rahu Kaal</strong>,{" "}
        <strong>Yamaganda</strong>, and <strong>Gulika
        Kaal</strong> — together with the broader subject of
        formal muhurta selection that uses all the panchang
        tools we have learned.
      </p>

      <h2>The structure: 8 segments of the day</h2>

      <p>
        All three of the malefic periods are computed by
        dividing the time from <strong>sunrise to sunset</strong>{" "}
        (the daylight portion only) into{" "}
        <strong>8 equal segments</strong>. Each segment is
        therefore one and a half hours on an equinox day —
        slightly longer in summer, slightly shorter in winter,
        following the unequal-hora principle.
      </p>

      <p>
        The 8 day-segments are numbered 1 through 8 starting
        from sunrise. On any given day, three of these segments
        carry malefic associations:
      </p>

      <ul>
        <li>
          <strong>Rahu Kaal</strong> — the segment ruled by Rahu.
        </li>
        <li>
          <strong>Yamaganda</strong> — the segment ruled by
          Yama (death).
        </li>
        <li>
          <strong>Gulika Kaal</strong> — the segment ruled by
          Gulika (a son of Saturn, also called Mandi).
        </li>
      </ul>

      <p>
        Which numbered segment is which depends on the vara.
        The assignment is fixed and tabulated below.
      </p>

      <h2>Rahu Kaal — the strongest of the three</h2>

      <p>
        Rahu Kaal <span lang="hi">(राहु काल)</span> is the most
        widely-known and most rigidly avoided malefic window in
        the daily panchang. The 8 day-segments are numbered 1–8,
        and Rahu Kaal falls on a specific segment for each
        vara:
      </p>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Rahu Kaal segment (of 8)</th>
            <th>Approximate clock window (equinox)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Monday</td><td>2nd</td><td>~7:30 AM – 9:00 AM</td></tr>
          <tr><td>Tuesday</td><td>7th</td><td>~3:00 PM – 4:30 PM</td></tr>
          <tr><td>Wednesday</td><td>5th</td><td>~12:00 PM – 1:30 PM</td></tr>
          <tr><td>Thursday</td><td>6th</td><td>~1:30 PM – 3:00 PM</td></tr>
          <tr><td>Friday</td><td>4th</td><td>~10:30 AM – 12:00 PM</td></tr>
          <tr><td>Saturday</td><td>3rd</td><td>~9:00 AM – 10:30 AM</td></tr>
          <tr><td>Sunday</td><td>8th</td><td>~4:30 PM – 6:00 PM</td></tr>
        </tbody>
      </table>

      <p>
        These clock windows assume sunrise at 6:00 AM and sunset
        at 6:00 PM. In actual practice the segments are computed
        from real local sunrise and sunset for the date and
        location — the panchang on this site does this
        automatically.
      </p>

      <p>
        A useful mnemonic for the Rahu Kaal sequence by weekday
        is: &ldquo;<strong>Mother Saw Father Wearing The
        Turban Sunday</strong>&rdquo; → 2-7-5-6-4-3-8 for
        Monday through Sunday. Old Indian astrologers memorise
        this; if you check enough panchangs, you will start
        recognising the pattern.
      </p>

      <h3>What Rahu Kaal is for</h3>

      <p>
        During Rahu Kaal, the traditional injunction is to{" "}
        <strong>avoid all auspicious new beginnings</strong>:
        starting a journey, beginning a new business, signing
        contracts, marriage, naming ceremonies, religious vows.
        Routine work — eating, working at one&rsquo;s normal
        job, passive activities — is acceptable. The window is
        approximately 90 minutes long.
      </p>

      <p>
        Some traditions hold that Rahu Kaal is not malefic for
        activities aligned with Rahu&rsquo;s own nature —
        unconventional ventures, occult and tantric practice,
        snake worship, observances related to Kala Bhairava.
        For ordinary purposes, however, the recommendation is
        avoidance.
      </p>

      <KeyIdea
        title="Rahu Kaal is a fixed segment per weekday, computed from real local sunrise and sunset."
        titleHi="राहु काल वार के अनुसार निश्चित होता है, जो स्थानीय सूर्योदय-सूर्यास्त से गिना जाता है"
      >
        Approximately 90 minutes once per day. The
        Sunday-through-Saturday sequence of segments is
        2-7-5-6-4-3-8. Avoid new beginnings during this window.
      </KeyIdea>

      <h2>Yamaganda Kaal — the second malefic period</h2>

      <p>
        Yamaganda <span lang="hi">(यमगण्ड)</span> means
        &ldquo;Yama&rsquo;s knot.&rdquo; Yama is the deva of
        death, and his governance of this segment makes it
        traditionally inauspicious for the same set of new
        beginnings as Rahu Kaal — though Yamaganda is held to
        be slightly less severe than Rahu Kaal.
      </p>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Yamaganda segment (of 8)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Monday</td><td>4th</td></tr>
          <tr><td>Tuesday</td><td>3rd</td></tr>
          <tr><td>Wednesday</td><td>2nd</td></tr>
          <tr><td>Thursday</td><td>1st</td></tr>
          <tr><td>Friday</td><td>7th</td></tr>
          <tr><td>Saturday</td><td>6th</td></tr>
          <tr><td>Sunday</td><td>5th</td></tr>
        </tbody>
      </table>

      <p>
        The Sunday-Saturday sequence: 5-4-3-2-1-7-6.
      </p>

      <h2>Gulika Kaal — the third malefic period</h2>

      <p>
        Gulika <span lang="hi">(गुलिक)</span>, also called
        Mandi, is described in classical texts as a son of
        Saturn — a sub-period within Saturn&rsquo;s broader
        rulership, with effects similar to Saturn&rsquo;s but
        sometimes considered subtler and more pervasive.
      </p>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Gulika segment (of 8)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Monday</td><td>6th</td></tr>
          <tr><td>Tuesday</td><td>5th</td></tr>
          <tr><td>Wednesday</td><td>4th</td></tr>
          <tr><td>Thursday</td><td>3rd</td></tr>
          <tr><td>Friday</td><td>2nd</td></tr>
          <tr><td>Saturday</td><td>1st</td></tr>
          <tr><td>Sunday</td><td>7th</td></tr>
        </tbody>
      </table>

      <p>
        The Sunday-Saturday sequence: 7-6-5-4-3-2-1.
      </p>

      <p>
        Gulika is taken seriously in classical texts and is
        used in some specialised astrology calculations
        (gulika-kundali). For everyday muhurta purposes, the
        ordinary panchang user pays primary attention to Rahu
        Kaal, secondary to Yamaganda, and Gulika as a
        third filter.
      </p>

      <h2>What is a &ldquo;muhurta&rdquo; in the formal sense?</h2>

      <p>
        Outside the technical 48-minute unit, the word
        <em>muhurta</em> is used in everyday speech to mean
        &ldquo;an auspicious moment chosen for an
        undertaking.&rdquo; In this sense, computing a muhurta
        is the act of finding a moment that simultaneously
        satisfies all the relevant panchang criteria:
      </p>

      <ul>
        <li>
          The <strong>tithi</strong> is favourable for the
          activity.
        </li>
        <li>
          The <strong>vara</strong> is favourable.
        </li>
        <li>
          The <strong>nakshatra</strong> is favourable for the
          activity type. (Marriage, for example, traditionally
          requires Rohini, Mrigashira, Magha, Hasta, Anuradha,
          Mula, Uttara Phalguni, Uttara Ashadha, or Uttara
          Bhadrapada nakshatras — a specific list.)
        </li>
        <li>
          The <strong>yoga</strong> is auspicious or at least
          not Vyatipata or Vaidhriti.
        </li>
        <li>
          The <strong>karana</strong> is not Vishti (Bhadra).
        </li>
        <li>
          The moment does not fall in <strong>Rahu Kaal</strong>,{" "}
          <strong>Yamaganda</strong>, or{" "}
          <strong>Gulika Kaal</strong>.
        </li>
        <li>
          The <strong>choghadiya</strong> is appropriate for
          the activity (Amrit, Shubh, Labh; or Char for
          travel).
        </li>
        <li>
          The <strong>Moon&rsquo;s rashi</strong> in transit is
          not adverse for the actor (in some traditions, the
          Moon&rsquo;s position relative to the natal Moon is
          checked using the <em>tara</em> system — the 9
          tara-classifications of janma, sampat, vipat, kshema,
          pratyari, sadhaka, vadha, mitra, parama-mitra).
        </li>
        <li>
          The day does not fall in panchaka (for activities
          panchaka prohibits) and is not gandanta.
        </li>
      </ul>

      <p>
        For routine activities — opening a small business,
        starting a course, beginning a journey — only the first
        few of these matter. For high-stakes activities like
        marriage or major real-estate transactions, all are
        traditionally checked. The classical text on this
        subject is the <em>Muhurta Chintamani</em>{" "}
        <span lang="hi">(मुहूर्त चिन्तामणि)</span> by
        Rama Daivajna (16th century), which catalogues the
        muhurta requirements for over a hundred categories of
        activity in painstaking detail.
      </p>

      <FigurePlaceholder
        number="11.1"
        caption="The day's malefic windows: Rahu Kaal, Yamaganda, Gulika, plus auspicious Abhijit and Brahma muhurta."
        captionHi="दिन के अशुभ काल: राहु काल, यमगण्ड, गुलिक, और शुभ अभिजित् व ब्रह्म मुहूर्त।"
        promptHint="Horizontal bar from sunrise (left) to sunset (right) divided into 8 numbered segments. Highlight in red the segment for Rahu Kaal, in dark red for Yamaganda, in deep red for Gulika (using the Tuesday assignments as example: segments 7, 3, 5). Highlight in gold the Abhijit muhurta at midpoint. Bilingual labels."
      />

      <h2>Computing a muhurta — a worked example</h2>

      <p>
        Suppose you want to begin a new business venture. Let
        us walk through what a careful traditional
        practitioner would check. Take any random day, say a
        Friday. The panchang shows:
      </p>

      <ul>
        <li>Tithi: Shukla Panchami (the 5th — generally auspicious)</li>
        <li>Vara: Shukravara (Friday — Venus-ruled, generally auspicious for prosperity)</li>
        <li>Nakshatra: Hasta (one of the auspicious nakshatras for business)</li>
        <li>Yoga: Saubhagya (auspicious — &ldquo;good fortune&rdquo;)</li>
        <li>Karana: Bava (auspicious for beginnings)</li>
        <li>Rahu Kaal: 10:30 AM – 12:00 PM (avoid this window)</li>
        <li>Yamaganda: 3:00 PM – 4:30 PM (avoid this window)</li>
        <li>Gulika: 7:30 AM – 9:00 AM (avoid this window)</li>
        <li>Abhijit muhurta: 11:42 AM – 12:18 PM (auspicious — but falls inside Rahu Kaal today!)</li>
        <li>Choghadiya: Char (7:30–9:00, but Gulika!), Labh (9:00–10:30 — auspicious!), Amrit (10:30–12:00, but Rahu Kaal!), ...</li>
      </ul>

      <p>
        Reading the example: the day itself is favourable in
        all five panchang limbs and shows several auspicious
        features. But the auspicious Abhijit muhurta falls
        inside Rahu Kaal — so Abhijit is unavailable today.
        The auspicious Amrit choghadiya also falls inside Rahu
        Kaal — Amrit is also unavailable.
      </p>

      <p>
        The good window is <strong>Labh choghadiya, 9:00 AM
        – 10:30 AM</strong>: it is after Gulika ends, before
        Rahu Kaal begins, on a favourable nakshatra and yoga,
        with auspicious tithi and vara. That is your business
        muhurta for the day. Begin between 9:00 and 10:30 AM.
      </p>

      <KeyIdea
        title="Muhurta selection is the synthesis of all panchang criteria into a specific time window."
        titleHi="मुहूर्त-निर्णय पंचांग के सब अंगों को मिलाकर एक निश्चित समय निकालना है"
      >
        The five limbs (tithi, vara, nakshatra, yoga, karana)
        determine whether the day is favourable. The malefic
        windows (Rahu Kaal, Yamaganda, Gulika) carve out the
        avoidance zones within the day. The choghadiya and the
        named muhurtas (Abhijit, Brahma) suggest the
        favourable moments. Combine these to find your window.
      </KeyIdea>

      <h2>The auspicious named muhurtas to keep in mind</h2>

      <p>Three named muhurtas stand out:</p>

      <ul>
        <li>
          <strong>Brahma muhurta</strong> — the 96-minute
          window before sunrise (specifically, from sunrise
          minus 96 minutes to sunrise minus 48 minutes is
          Brahma muhurta proper). For meditation, study,
          spiritual practice, scripture recitation. Not for
          worldly beginnings.
        </li>
        <li>
          <strong>Abhijit muhurta</strong> — solar noon ± 24
          minutes. For all worldly auspicious beginnings unless
          it falls within Rahu Kaal or another malefic period
          (in which case the special status is overridden).
          Wednesday Abhijit is traditionally avoided due to a
          specific prescription. Otherwise universally
          favourable.
        </li>
        <li>
          <strong>Godhuli muhurta</strong> — sunset ± 24
          minutes. Especially auspicious for marriage
          ceremonies in some traditions.
        </li>
      </ul>

      <h2>Rahu Kaal in modern practice</h2>

      <p>
        How seriously should you take Rahu Kaal? In modern
        urban Indian life, observance varies enormously. Most
        people follow it for high-stakes events (marriage,
        starting a business, major purchases) and ignore it
        for routine activity (going to office, eating).
        Traditional families avoid even routine new beginnings
        — making purchases, signing letters, leaving for a
        journey — during Rahu Kaal.
      </p>

      <p>
        The convention is well-defined and easy to check, so
        most panchangs prominently flag the Rahu Kaal window of
        the current day. Even if you do not personally observe
        it, knowing what your panchang is referring to is part
        of being literate in the system.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>
          Define Rahu Kaal, Yamaganda, and Gulika Kaal, and
          state that all three are computed by dividing
          sunrise-to-sunset into 8 equal segments.
        </li>
        <li>
          Recall the segment number for each malefic period on
          each weekday (Rahu Kaal: 7-2-7-5-6-4-3-8 starting
          Sunday, etc.).
        </li>
        <li>
          List the panchang criteria checked for a formal
          muhurta selection.
        </li>
        <li>
          Identify Abhijit, Brahma, and Godhuli as the
          named auspicious daily muhurtas.
        </li>
        <li>
          Walk through a worked example of finding an
          auspicious time window for a new beginning.
        </li>
        <li>
          State why Wednesday Abhijit is traditionally avoided.
        </li>
      </ul>

      <p>
        Open the daily panchang. Find today&rsquo;s Rahu Kaal,
        Yamaganda, and Gulika windows. Find Abhijit muhurta.
        Are any of them overlapping? If you had to pick a
        favourable two-hour window for a new beginning today,
        when would it be?
      </p>

      <p>
        In the next chapter we look at the special{" "}
        <strong>auspicious and inauspicious yogas</strong>{" "}
        beyond the daily five limbs — Tripushkar, Dwipushkar,
        Amrit Siddhi, Sarvarth Siddhi (the &ldquo;all
        success&rdquo; yoga), Panchak, and the special
        positioning of Bhadra. These are the patterns that, when
        they appear, override or amplify the day&rsquo;s
        ordinary reading.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        हम मुहूर्त से एक काल-इकाई के रूप में मिल चुके हैं (48 मिनट, अध्याय
        9), और चौघड़िया से आठ 96-मिनट के दैनिक खण्डों की एक समय-सारणी के
        रूप में (अध्याय 10)। अब हम दिन की उन सबसे कठोरतम वर्जित अवधियों
        तक पहुँचे हैं &mdash; जिन्हें शास्त्रीय मुहूर्त-ग्रंथ सर्वाधिक
        गम्भीरता से लेते हैं, और किसी महत्त्वपूर्ण उद्यम के निर्धारण में
        कभी अनदेखा नहीं किया जाता।
      </p>

      <p>
        ये हैं तीन शास्त्रीय अशुभ अवधियाँ &mdash; <strong>राहु काल</strong>,{" "}
        <strong>यमगण्ड</strong>, और <strong>गुलिक काल</strong> &mdash;
        और इनके साथ औपचारिक मुहूर्त-चयन का व्यापक विषय, जो हमने अब तक
        सीखे हुए सब पंचांग-साधनों का प्रयोग करता है।
      </p>

      <h2>संरचना &mdash; दिन के 8 खंड</h2>

      <p>
        तीनों अशुभ अवधियाँ <strong>सूर्योदय से सूर्यास्त तक</strong>{" "}
        (केवल दिन-काल) के समय को <strong>8 बराबर खंडों</strong> में
        बाँटकर निकाली जाती हैं। प्रत्येक खंड विषुव पर डेढ़ घंटे का
        &mdash; ग्रीष्म में लंबा, शीत में छोटा, असमान-होरा सिद्धान्त के
        अनुसार।
      </p>

      <p>
        दिन के ये 8 खंड सूर्योदय से 1 से 8 तक क्रमांकित होते हैं। किसी भी
        दिन इनमें से तीन खंड अशुभ-संगति वहन करते हैं —
      </p>

      <ul>
        <li><strong>राहु काल</strong> &mdash; राहु से शासित खंड।</li>
        <li>
          <strong>यमगण्ड</strong> &mdash; यम (मृत्यु) से शासित खंड।
        </li>
        <li>
          <strong>गुलिक काल</strong> &mdash; गुलिक (शनि के एक पुत्र, जिसे
          मन्दि भी कहते हैं) से शासित खंड।
        </li>
      </ul>

      <p>
        कौन-सा क्रमांकित खंड कौन-सा है, यह वार पर निर्भर है। आबंटन निश्चित
        और तालिकाबद्ध है।
      </p>

      <h2>राहु काल &mdash; तीनों में सबसे प्रबल</h2>

      <p>
        राहु काल दैनिक पंचांग की सबसे व्यापक रूप से ज्ञात और सबसे कठोरता
        से वर्जित अशुभ अवधि है। दिन के 8 खंडों को 1–8 तक क्रमांकित किया
        जाता है, और राहु काल हर वार के लिए एक विशिष्ट खंड पर पड़ता है —
      </p>

      <table>
        <thead>
          <tr>
            <th>वार</th>
            <th>राहु काल खंड (8 में से)</th>
            <th>लगभग घड़ी-समय (विषुव)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>सोमवार</td><td>2रा</td><td>~7:30 AM – 9:00 AM</td></tr>
          <tr><td>मंगलवार</td><td>7वाँ</td><td>~3:00 PM – 4:30 PM</td></tr>
          <tr><td>बुधवार</td><td>5वाँ</td><td>~12:00 PM – 1:30 PM</td></tr>
          <tr><td>गुरुवार</td><td>6ठा</td><td>~1:30 PM – 3:00 PM</td></tr>
          <tr><td>शुक्रवार</td><td>4था</td><td>~10:30 AM – 12:00 PM</td></tr>
          <tr><td>शनिवार</td><td>3रा</td><td>~9:00 AM – 10:30 AM</td></tr>
          <tr><td>रविवार</td><td>8वाँ</td><td>~4:30 PM – 6:00 PM</td></tr>
        </tbody>
      </table>

      <p>
        ये घड़ी-समय यह मानकर हैं कि सूर्योदय 6:00 AM और सूर्यास्त 6:00 PM
        पर हो। वास्तविक प्रयोग में खंड स्थान के वास्तविक स्थानीय
        सूर्योदय और सूर्यास्त से निकाले जाते हैं &mdash; इस साइट का
        पंचांग यह स्वतः कर देता है।
      </p>

      <p>
        वार-क्रम में राहु काल का स्मरण-सूत्र है: रविवार से शनिवार के लिए
        अनुक्रम 8-2-7-5-6-4-3। पुराने भारतीय ज्योतिषी इसे रट लेते थे; यदि
        आप पर्याप्त पंचांग देखें, तो आप पैटर्न पहचानने लगेंगे।
      </p>

      <h3>राहु काल किसके लिए है</h3>

      <p>
        राहु काल के दौरान पारम्परिक निर्देश है &mdash;{" "}
        <strong>सब शुभ नये आरम्भ टालिए</strong>: यात्रा का प्रारम्भ, नये
        व्यवसाय का आरम्भ, अनुबंधों पर हस्ताक्षर, विवाह, नामकरण, धार्मिक
        व्रत-संकल्प। नियमित कार्य &mdash; भोजन, अपने सामान्य व्यवसाय में
        काम, निष्क्रिय गतिविधियाँ &mdash; स्वीकार्य हैं। अवधि लगभग 90
        मिनट की है।
      </p>

      <p>
        कुछ परम्पराएँ मानती हैं कि राहु की अपनी प्रकृति से मेल खाते कार्यों
        के लिए राहु काल अशुभ नहीं है &mdash; अपरम्परागत उद्यम, गूढ़ और
        तांत्रिक साधना, सर्प-पूजा, काल-भैरव से सम्बन्धित अनुष्ठान। सामान्य
        प्रयोजनों के लिए, अनुशंसा है टालने की।
      </p>

      <KeyIdea
        title="राहु काल वार के अनुसार निश्चित खंड पर पड़ता है, स्थानीय सूर्योदय-सूर्यास्त से निकाला जाता है"
        titleHi="Rahu Kaal is a fixed segment per weekday, computed from real local sunrise and sunset."
      >
        दिन में लगभग 90 मिनट, एक बार। रविवार-से-शनिवार खंड-अनुक्रम
        8-2-7-5-6-4-3। इस अवधि में नये आरम्भ टालिए।
      </KeyIdea>

      <h2>यमगण्ड काल &mdash; द्वितीय अशुभ अवधि</h2>

      <p>
        यमगण्ड का अर्थ है &ldquo;यम की गाँठ।&rdquo; यम मृत्यु के देव हैं,
        और इस खंड पर उनका शासन इसे राहु काल जैसे ही नये आरम्भों के लिए
        पारम्परिक रूप से अशुभ बनाता है &mdash; यद्यपि यमगण्ड को राहु काल
        से किंचित् कम कठोर माना जाता है।
      </p>

      <table>
        <thead>
          <tr>
            <th>वार</th>
            <th>यमगण्ड खंड (8 में से)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>सोमवार</td><td>4था</td></tr>
          <tr><td>मंगलवार</td><td>3रा</td></tr>
          <tr><td>बुधवार</td><td>2रा</td></tr>
          <tr><td>गुरुवार</td><td>1ला</td></tr>
          <tr><td>शुक्रवार</td><td>7वाँ</td></tr>
          <tr><td>शनिवार</td><td>6ठा</td></tr>
          <tr><td>रविवार</td><td>5वाँ</td></tr>
        </tbody>
      </table>

      <p>रविवार-से-शनिवार अनुक्रम: 5-4-3-2-1-7-6।</p>

      <h2>गुलिक काल &mdash; तृतीय अशुभ अवधि</h2>

      <p>
        गुलिक &mdash; जिसे मन्दि भी कहते हैं &mdash; शास्त्रीय ग्रंथों में
        शनि के पुत्र के रूप में वर्णित है &mdash; शनि के व्यापक शासन के
        भीतर एक उप-अवधि, जिसके प्रभाव शनि के समान, परन्तु कभी-कभी
        सूक्ष्मतर और अधिक व्याप्त माने जाते हैं।
      </p>

      <table>
        <thead>
          <tr>
            <th>वार</th>
            <th>गुलिक खंड (8 में से)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>सोमवार</td><td>6ठा</td></tr>
          <tr><td>मंगलवार</td><td>5वाँ</td></tr>
          <tr><td>बुधवार</td><td>4था</td></tr>
          <tr><td>गुरुवार</td><td>3रा</td></tr>
          <tr><td>शुक्रवार</td><td>2रा</td></tr>
          <tr><td>शनिवार</td><td>1ला</td></tr>
          <tr><td>रविवार</td><td>7वाँ</td></tr>
        </tbody>
      </table>

      <p>रविवार-से-शनिवार अनुक्रम: 7-6-5-4-3-2-1।</p>

      <p>
        गुलिक को शास्त्रीय ग्रंथ गम्भीरता से लेते हैं और कुछ विशिष्ट
        ज्योतिषीय गणनाओं (गुलिक-कुण्डली) में प्रयोग करते हैं। दैनिक
        मुहूर्त-प्रयोजनों के लिए सामान्य पंचांग-पाठक राहु काल पर प्राथमिक
        ध्यान देता है, यमगण्ड पर द्वितीयक, और गुलिक तृतीय छानन के रूप
        में।
      </p>

      <h2>औपचारिक अर्थ में &ldquo;मुहूर्त&rdquo; क्या है?</h2>

      <p>
        48-मिनट की तकनीकी इकाई से बाहर, <em>मुहूर्त</em> शब्द दैनिक
        भाषा में &ldquo;किसी उद्यम के लिए चुना गया शुभ क्षण&rdquo; के
        अर्थ में प्रयुक्त होता है। इस अर्थ में, मुहूर्त निकालना वह क्रिया
        है जिसमें एक ऐसा क्षण ढूँढा जाता है जो एक साथ सब प्रासंगिक पंचांग-
        मानदण्डों को संतुष्ट करे —
      </p>

      <ul>
        <li><strong>तिथि</strong> कार्य के लिए शुभ हो।</li>
        <li><strong>वार</strong> शुभ हो।</li>
        <li>
          <strong>नक्षत्र</strong> कार्य-प्रकार के लिए शुभ हो। (विवाह
          के लिए पारम्परिक रूप से रोहिणी, मृगशिरा, मघा, हस्त, अनुराधा,
          मूल, उत्तर-फाल्गुनी, उत्तराषाढ़ा अथवा उत्तर-भाद्रपदा &mdash;
          एक विशिष्ट सूची आवश्यक है।)
        </li>
        <li>
          <strong>योग</strong> शुभ हो, अथवा कम से कम व्यतीपात या वैधृति
          न हो।
        </li>
        <li><strong>करण</strong> विष्टि (भद्रा) न हो।</li>
        <li>
          क्षण <strong>राहु काल</strong>, <strong>यमगण्ड</strong>, अथवा{" "}
          <strong>गुलिक काल</strong> में न पड़े।
        </li>
        <li>
          <strong>चौघड़िया</strong> कार्य के लिए उपयुक्त हो (अमृत, शुभ,
          लाभ; अथवा यात्रा के लिए चर)।
        </li>
        <li>
          संक्रमणकालीन <strong>चन्द्र-राशि</strong> कर्ता के लिए
          प्रतिकूल न हो (कुछ परम्पराओं में जन्म-कालीन चन्द्र के सापेक्ष
          वर्तमान चन्द्र की स्थिति <em>तारा</em>-प्रणाली से देखी जाती
          है &mdash; नौ तारा-वर्ग: जन्म, सम्पत्, विपत्, क्षेम, प्रत्यरि,
          साधक, वध, मित्र, परम-मित्र)।
        </li>
        <li>
          दिन पंचक में न पड़े (उन कार्यों के लिए जिन्हें पंचक वर्जित
          करता है) और गण्डान्त न हो।
        </li>
      </ul>

      <p>
        सामान्य कार्यों &mdash; छोटा व्यवसाय खोलना, पाठ्यक्रम का आरम्भ,
        यात्रा का प्रारम्भ &mdash; के लिए केवल कुछ प्रथम मानदण्ड महत्त्वपूर्ण
        हैं। उच्च-दाँव वाले कार्यों जैसे विवाह अथवा बड़े सम्पत्ति-लेन-
        देन के लिए, सब का परम्परागत रूप से अवलोकन होता है। इस विषय का
        शास्त्रीय ग्रंथ है राम-दैवज्ञ का{" "}
        <em>मुहूर्त चिन्तामणि</em> (16वीं शताब्दी), जो सौ से अधिक प्रकार
        के कार्यों की मुहूर्त-आवश्यकताओं को बारीकी से सूचीबद्ध करता है।
      </p>

      <FigurePlaceholder
        number="11.1"
        caption="The day's malefic windows: Rahu Kaal, Yamaganda, Gulika, plus auspicious Abhijit and Brahma muhurta."
        captionHi="दिन के अशुभ काल: राहु काल, यमगण्ड, गुलिक, और शुभ अभिजित् व ब्रह्म मुहूर्त।"
        promptHint="Horizontal bar from sunrise (left) to sunset (right) divided into 8 numbered segments. Highlight in red the segment for Rahu Kaal, in dark red for Yamaganda, in deep red for Gulika (using the Tuesday assignments as example: segments 7, 3, 5). Highlight in gold the Abhijit muhurta at midpoint. Bilingual labels."
      />

      <h2>मुहूर्त निकालना &mdash; एक उदाहरण</h2>

      <p>
        मान लीजिए आप कोई नया व्यवसाय शुरू करना चाहते हैं। एक सावधान
        पारम्परिक अभ्यासकर्ता क्या-क्या जाँचेगा &mdash; देखें। मान लीजिए
        कोई शुक्रवार है। पंचांग दिखाता है —
      </p>

      <ul>
        <li>तिथि: शुक्ल पंचमी (5वीं &mdash; सामान्यतः शुभ)</li>
        <li>
          वार: शुक्रवार (शुक्र-शासित, समृद्धि के लिए सामान्यतः शुभ)
        </li>
        <li>नक्षत्र: हस्त (व्यवसाय के लिए शुभ नक्षत्रों में से)</li>
        <li>योग: सौभाग्य (शुभ &mdash; &ldquo;सुख-भाग्य&rdquo;)</li>
        <li>करण: बव (आरम्भ के लिए शुभ)</li>
        <li>राहु काल: 10:30 AM – 12:00 PM (इसे टालें)</li>
        <li>यमगण्ड: 3:00 PM – 4:30 PM (इसे टालें)</li>
        <li>गुलिक: 7:30 AM – 9:00 AM (इसे टालें)</li>
        <li>
          अभिजित् मुहूर्त: 11:42 AM – 12:18 PM (शुभ &mdash; परन्तु आज
          राहु काल के भीतर पड़ रहा है!)
        </li>
        <li>
          चौघड़िया: चर (7:30–9:00, परन्तु गुलिक!), लाभ (9:00–10:30 &mdash;
          शुभ!), अमृत (10:30–12:00, परन्तु राहु काल!), ...
        </li>
      </ul>

      <p>
        उदाहरण का पठन: दिन सब पाँच पंचांग-अंगों में अनुकूल है और कई शुभ
        विशेषताएँ दिखाता है। परन्तु शुभ अभिजित् मुहूर्त राहु काल के भीतर
        पड़ रहा है &mdash; अतः अभिजित् आज उपलब्ध नहीं। शुभ अमृत चौघड़िया
        भी राहु काल के भीतर पड़ रहा है &mdash; अमृत भी उपलब्ध नहीं।
      </p>

      <p>
        शुभ खण्ड है <strong>लाभ चौघड़िया, 9:00 AM – 10:30 AM</strong>:
        गुलिक की समाप्ति के बाद, राहु काल के पहले, शुभ नक्षत्र और योग
        पर, शुभ तिथि और वार के साथ। यही आज का व्यवसाय-मुहूर्त है। 9:00
        और 10:30 AM के बीच आरम्भ कीजिए।
      </p>

      <KeyIdea
        title="मुहूर्त-निर्णय पंचांग के सब अंगों को मिलाकर एक निश्चित समय निकालना है"
        titleHi="Muhurta selection is the synthesis of all panchang criteria into a specific time window."
      >
        पाँच अंग (हर एक का अनुकूल अथवा प्रतिकूल संकेत) यह तय करते हैं कि
        दिन शुभ है या नहीं। अशुभ अवधियाँ (राहु काल, यमगण्ड, गुलिक) दिन
        के भीतर वर्जित खण्ड बनाती हैं। चौघड़िया और नामित मुहूर्त
        (अभिजित्, ब्रह्म) शुभ क्षणों का संकेत देते हैं। इन्हें मिलाकर
        अपना खण्ड ढूँढ़िए।
      </KeyIdea>

      <h2>स्मरण योग्य शुभ नामित मुहूर्त</h2>

      <p>तीन नामित मुहूर्त मुख्य हैं —</p>

      <ul>
        <li>
          <strong>ब्रह्म मुहूर्त</strong> &mdash; सूर्योदय से 96 मिनट
          पूर्व का खण्ड (विशेष रूप से, सूर्योदय−96 मिनट से सूर्योदय−48
          मिनट तक का काल ब्रह्म मुहूर्त है)। ध्यान, स्वाध्याय, आध्यात्मिक
          साधना, शास्त्र-पाठ के लिए। भौतिक आरम्भों के लिए नहीं।
        </li>
        <li>
          <strong>अभिजित् मुहूर्त</strong> &mdash; सौर मध्याह्न ± 24
          मिनट। सब भौतिक शुभ आरम्भों के लिए, यदि वह राहु काल अथवा अन्य
          अशुभ अवधि में न पड़े (जिस स्थिति में विशेष स्थिति समाप्त हो
          जाती है)। बुधवार का अभिजित् किसी विशिष्ट निर्देश के कारण
          पारम्परिक रूप से टाला जाता है। अन्यथा सार्वभौम रूप से अनुकूल।
        </li>
        <li>
          <strong>गोधूलि मुहूर्त</strong> &mdash; सूर्यास्त ± 24 मिनट।
          कुछ परम्पराओं में विवाह-समारोहों के लिए विशेष शुभ।
        </li>
      </ul>

      <h2>आधुनिक व्यवहार में राहु काल</h2>

      <p>
        राहु काल को कितनी गम्भीरता से लेना चाहिए? आधुनिक नगरीय भारतीय
        जीवन में पालन बहुत भिन्न है। अधिकांश लोग उच्च-दाँव वाले अवसरों
        (विवाह, व्यवसाय का आरम्भ, बड़ी खरीद) के लिए इसका पालन करते हैं
        और नियमित गतिविधि (कार्यालय जाना, भोजन) के लिए अनदेखा कर देते
        हैं। पारम्परिक परिवार नियमित नये आरम्भ &mdash; खरीद, पत्र-
        हस्ताक्षर, यात्रा का प्रस्थान &mdash; भी राहु काल में टाल देते
        हैं।
      </p>

      <p>
        परिपाटी सुपरिभाषित है और जाँचना सरल है, अतः अधिकांश पंचांग वर्तमान
        दिन के राहु काल की अवधि स्पष्ट रूप से चिह्नित कर देते हैं। आप
        स्वयं इसका पालन करें या नहीं, यह जानना कि आपका पंचांग किस ओर
        संकेत कर रहा है &mdash; इस प्रणाली में साक्षरता का अंग है।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह कर सकेंगे —</p>

      <ul>
        <li>
          राहु काल, यमगण्ड और गुलिक काल को परिभाषित कर सकें, और बता सकें
          कि तीनों सूर्योदय-से-सूर्यास्त को 8 बराबर खंडों में बाँटकर
          निकाले जाते हैं।
        </li>
        <li>
          हर वार पर हर अशुभ अवधि का खंड-क्रमांक स्मरण कर सकें (राहु काल:
          रविवार-से-शनिवार 8-2-7-5-6-4-3, इत्यादि)।
        </li>
        <li>
          औपचारिक मुहूर्त-चयन में देखे जाने वाले पंचांग-मानदण्डों की सूची
          दे सकें।
        </li>
        <li>
          अभिजित्, ब्रह्म और गोधूलि को नामित शुभ दैनिक मुहूर्तों के रूप
          में पहचान सकें।
        </li>
        <li>
          नये आरम्भ के लिए शुभ समय-खण्ड ढूँढने का एक उदाहरण-गणना कर
          सकें।
        </li>
        <li>
          बता सकें कि बुधवार का अभिजित् पारम्परिक रूप से क्यों टाला
          जाता है।
        </li>
      </ul>

      <p>
        दैनिक पंचांग खोलिए। आज का राहु काल, यमगण्ड और गुलिक देखिए। अभिजित्
        मुहूर्त ढूँढिए। क्या वे एक-दूसरे से अतिव्यापी हैं? यदि आज नये
        आरम्भ के लिए दो घंटे का शुभ खण्ड चुनना पड़े, तो वह कब होगा?
      </p>

      <p>
        अगले अध्याय में हम पंचांग के दैनिक पाँच अंगों के परे विशेष{" "}
        <strong>शुभ और अशुभ संयोग</strong> देखेंगे &mdash; त्रिपुष्कर,
        द्विपुष्कर, अमृत-सिद्धि, सर्वार्थ-सिद्धि, पंचक, और भद्रा का विशेष
        स्थान-निर्धारण। ये वे पैटर्न हैं जो जब प्रकट होते हैं तो दिन के
        सामान्य पठन को संशोधित या प्रवर्धित करते हैं।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

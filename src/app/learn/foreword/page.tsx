import { ChapterShell } from "@/components/learn/ChapterShell";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("foreword")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
      <p>
        If you have ever opened a panchang and felt like everyone else in the
        room knew a language you did not — this book is for you. Words like{" "}
        <em>tithi</em>, <em>nakshatra</em>, <em>yoga</em>, <em>karana</em>,{" "}
        <em>choghadiya</em>, <em>rahu kaal</em> get used as if everyone
        understands them. Most of us nod along. We do not. That is fine. Almost
        nobody is taught this in school, and the books that do explain it
        usually assume you already know half the answer.
      </p>

      <p>
        We are going to start from absolute zero. No prerequisite. No prior
        Sanskrit. No prior astronomy. By the time you finish Book 1, you will
        be able to open the panchang for any day of the year and say — out
        loud, in your own words — what each line means, where the number came
        from, which calculation it represents, and whether the timing it
        describes is good for what you want to do.
      </p>

      <h2>Who I am writing this for</h2>

      <p>
        This book is for four kinds of readers, and for me as the fifth.
      </p>

      <ul>
        <li>
          <strong>The curious beginner.</strong> You grew up around panchang.
          Your grandmother checked it before family decisions. You always
          wanted to ask but it felt rude to interrupt, and now there is no one
          left to ask.
        </li>
        <li>
          <strong>The student of jyotish.</strong> You are studying jyotish,
          vastu, ayurveda, or Jain ritual practice and you need a clean,
          in-order foundation that does not skip steps and does not paper
          over disagreements between traditions.
        </li>
        <li>
          <strong>The third generation in the diaspora.</strong> Your
          English is good, your Hindi is rusty, and your Sanskrit is a
          handful of festival names. You want a real bridge, not a
          condescending summary.
        </li>
        <li>
          <strong>The skeptic.</strong> You do not necessarily believe in
          predictions, but you are interested in how an entire civilisation
          built a calendar from the sky, and what the underlying math
          actually is. That is a legitimate reason to read this. You can
          take the astronomy and leave the rest. Several of the world&rsquo;s
          best-preserved ancient astronomical observations come out of the
          Indian tradition; whether or not you accept the ritual layer, the
          observational record is a real artefact of human science.
        </li>
        <li>
          <strong>And me.</strong> I am writing this because I did not know
          most of it either. Each chapter is what I learned when I sat down
          and worked through the question myself.
        </li>
      </ul>

      <h2>Astronomy and astrology — they are not the same</h2>

      <p>
        Before we start, one separation that will save us a lot of confusion
        later.
      </p>

      <p>
        <strong>Astronomy</strong> is the study of where things in the sky
        actually are. The Sun rises in the east. The Moon goes through phases
        in roughly 29.5 days. Mars takes about 687 days to go around the Sun.
        These are facts you can verify with a telescope or a clock, and they
        do not depend on what anyone believes.
      </p>

      <p>
        <strong>Astrology</strong> is a layer of meaning placed on top of
        those facts. It says: the Moon being in a certain part of the sky on
        the day you were born influences your temperament; this hour is good
        for starting a journey; that hour is not. Whether you accept that
        layer or not is up to you. But you cannot evaluate astrology
        intelligently if you do not first understand the astronomy underneath
        it. Most arguments about astrology are really arguments where one
        person knows the astronomy and the other does not, or both sides do
        not.
      </p>

      <p>
        A panchang is, in essence, a daily report from astronomy, with
        astrological and ritual commentary attached. <strong>This book
        teaches the astronomy first.</strong> Once you know that, the
        astrological layer becomes a separate question you can ask honestly.
      </p>

      <KeyIdea
        title="Astronomy is the floor. Astrology is built on top of it."
        titleHi="ज्योतिष का आधार खगोल विज्ञान है"
      >
        Whatever you eventually believe about predictions, the calculations in
        a panchang are real astronomical events. We will treat them that way.
        When tradition and observation differ, we will say so. When two
        traditions disagree, we will explain why each makes the choice it
        makes.
      </KeyIdea>

      <h2>What a panchang actually is</h2>

      <p>
        The word <em>panchang</em> means &ldquo;five limbs&rdquo;{" "}
        <span lang="hi">(पंच + अंग)</span>. It refers to the five pieces of
        information that, taken together, fully describe a day in the Indian
        traditional calendar:
      </p>

      <ol>
        <li>
          <strong>Tithi</strong> <span lang="hi">(तिथि)</span> — the lunar
          day, defined by the angle between Sun and Moon.
        </li>
        <li>
          <strong>Vara</strong> <span lang="hi">(वार)</span> — the weekday,
          ruled by one of seven grahas.
        </li>
        <li>
          <strong>Nakshatra</strong> <span lang="hi">(नक्षत्र)</span> — the
          lunar mansion the Moon currently occupies (one of 27).
        </li>
        <li>
          <strong>Yoga</strong> <span lang="hi">(योग)</span> — a specific
          combination derived from the longitudes of Sun and Moon.
        </li>
        <li>
          <strong>Karana</strong> <span lang="hi">(करण)</span> — half of a
          tithi.
        </li>
      </ol>

      <p>
        Five things. That is the entire skeleton. Everything else you see in a
        panchang — choghadiya, muhurta, rahu kaal, abhijit, the various
        auspicious yogas — is either derived from these five or layered on
        top of them. We will take each one in its own chapter, and by the end
        you will see how a single day&rsquo;s panchang is just the same five
        questions answered for that date.
      </p>

      <h2>A short history of Indian astronomy and calendar-making</h2>

      <p>
        It helps to understand that the panchang you are reading today is the
        end-point of a continuous tradition stretching back at least three
        thousand years. The vocabulary, the divisions, the calculation
        rules — none of them were invented at once. They were refined,
        checked against the sky, debated between schools, and revised
        repeatedly. The system is alive, and disagreements between modern
        panchangs almost always trace back to a real historical fork.
      </p>

      <p>
        The earliest layer is the <em>Vedanga Jyotisha</em>{" "}
        <span lang="hi">(वेदाङ्ग ज्योतिष)</span>, attributed to the sage
        Lagadha and dated by most scholars to roughly 1400–1200 BCE. It is
        not really a textbook of astronomy; it is a manual for fixing the
        timing of Vedic rituals. Already in this text we find the 27
        nakshatras, a five-year yuga cycle, the lunar month divided into
        tithis, and rules for inserting an extra month to keep lunar and
        solar reckoning in step. The ideas are all there in seed form.
      </p>

      <p>
        The classical synthesis comes more than a thousand years later, in
        the <strong>Siddhanta period</strong> (roughly 400–1200 CE). Texts
        like the <em>Surya Siddhanta</em>{" "}
        <span lang="hi">(सूर्य सिद्धान्त)</span>, the works of Aryabhata
        (Aryabhatiya, 499 CE), Varahamihira (Pancha-Siddhantika and Brihat
        Samhita, ~550 CE), Brahmagupta (Brahmasphutasiddhanta, 628 CE), and
        Bhaskara II (Siddhanta Shiromani, 1150 CE) develop the geometry
        and arithmetic that makes systematic prediction possible. Aryabhata
        proposes that Earth rotates on its axis. Brahmagupta works out
        rules for negative numbers and zero in the same volumes where he
        computes planetary positions. The astronomy is mathematically
        rigorous and observation-checked.
      </p>

      <p>
        In parallel — and this is critical for our particular panchang —
        the <strong>Jain karaṇa tradition</strong> develops its own
        calendrical literature. Jain texts such as the{" "}
        <em>Suryaprajnapti</em> <span lang="hi">(सूर्यप्रज्ञप्ति)</span>,
        the <em>Chandraprajnapti</em>{" "}
        <span lang="hi">(चन्द्रप्रज्ञप्ति)</span>, and later karaṇa works
        codify time reckoning, including the <em>udaya tithi</em> rule with
        the six-ghati condition that this very panchang follows. The Jain
        tradition is meticulous about astronomy because precise time
        reckoning is required for the strict observance of vows, fasts, and
        ritual practice. When we get to the tithi chapter you will see why
        this rule, in particular, matters.
      </p>

      <p>
        Different regions of India also developed their own panchang
        styles. Today there are several living traditions — broadly the{" "}
        <em>Surya-siddhanta</em>-based panchangs of the south, the{" "}
        <em>Drik</em> (modern observational) panchangs that use current
        astronomical data, the <em>Vakya</em> panchangs preserved in
        Tamil-speaking regions, and various Jain and Vaishnava and regional
        Shaiva calendars. They use the same astronomy. They differ on small
        choices — which epoch to anchor calculations to, whether to use the
        sidereal or tropical zodiac, how to resolve a tithi that changes
        mid-day, and a few similar conventions. Two panchangs disagreeing by
        a day on a festival date is almost always one of these conventions
        in action, not a calculation error.
      </p>

      <h2>About this particular panchang</h2>

      <p>
        The tool you are reading on follows the <strong>Jain
        tradition</strong>, with the <em>udaya tithi</em> rule applied at
        the <strong>six-ghati threshold</strong>: the tithi prevailing
        during the first six ghatis (about two hours and twenty-four minutes)
        after sunrise is the tithi for the entire civil day. We use modern
        astronomical (drik) calculations for planetary and lunar positions,
        not the older karaṇa approximations, because for the level of
        precision we now demand they are simply more accurate. Where Jain
        siddhantic convention prescribes a rule (such as the six-ghati
        threshold), we follow that convention; where the underlying number
        is just &ldquo;the position of the Moon at this instant,&rdquo; we
        compute it from current astronomy.
      </p>

      <p>
        We will spend a full section on the six-ghati rule in the tithi
        chapter, because it is the single biggest source of confusion when
        people compare two different panchang sources and find they
        disagree by one day on a festival.
      </p>

      <h2>How the book is organised</h2>

      <p>The book has two parts. You are reading Part 1.</p>

      <p>
        <strong>Book 1 — Panchang.</strong> Time and sky, the five limbs in
        depth, the derived concepts (choghadiya, muhurta, rahu kaal,
        yamaganda, gulika), the auspicious and inauspicious combinations
        (tripushkar, dwipushkar, amrit-siddhi, sarvarth-siddhi, panchak,
        bhadra), and at the end, a worked example of reading a real day
        end-to-end.
      </p>

      <p>
        <strong>Book 2 — Kundli.</strong> Once you can read a panchang, the
        natural next step is the birth chart. We will cover the major chart
        types (Lagna, Rashi, Navamsa, and the divisional vargas), the
        twelve houses (bhāva), planetary aspects and friendships, the
        Vimshottari dasha system, and how to actually read a kundli without
        faking understanding. That book will come after this one is
        finished.
      </p>

      <h2>How to read this book</h2>

      <p>
        A few suggestions, in order of importance.
      </p>

      <ul>
        <li>
          <strong>Read in order.</strong> Each chapter relies on the
          previous one. If you skip ahead you will hit a word you do not
          know.
        </li>
        <li>
          <strong>Read each chapter twice.</strong> Once to get the shape,
          once to actually understand it. The figures are the spine — if
          the prose is unclear, the figure is the answer.
        </li>
        <li>
          <strong>Cross-check with the live tool.</strong> When a chapter
          introduces a concept, open the daily panchang on this site and
          find that concept on a real day. Concepts that feel abstract on
          the page often click instantly when you see them as today&rsquo;s
          number.
        </li>
        <li>
          <strong>Sanskrit terms always come paired.</strong> Every
          tradition-specific word appears with both English transliteration
          and Devanagari (<span lang="hi">देवनागरी</span>) script. This is
          not decoration — many of these words have meaningful roots that
          get lost in transliteration. Even if you cannot read Devanagari
          yet, seeing the same word the same way every time will start to
          feel familiar, and that familiarity is the first step.
        </li>
        <li>
          <strong>Stop and look up unfamiliar words.</strong> If a sentence
          contains a Sanskrit word you have not seen, search this site for
          it. We try to never use a term before introducing it, but the web
          is full of cross-references and one will eventually slip past.
        </li>
      </ul>

      <h2>What this book is not</h2>

      <p>
        This is not a book of predictions. We will not tell you what colour
        to wear on Wednesday or which gem to buy. We will explain the
        underlying logic of why a particular tradition associates Wednesday
        with Mercury and Mercury with the colour green — so that if you
        choose to participate in those associations, you do so
        knowingly.
      </p>

      <p>
        It is also not an academic text. There are excellent scholarly
        works on Indian astronomy — David Pingree&rsquo;s catalogue and
        Kim Plofker&rsquo;s history are the standards in English. We will
        occasionally point at them in the further-reading notes. This book
        is closer to an honest beginner&rsquo;s explanation by someone who
        recently was a beginner, with enough depth that a serious student
        can use it as their first foundation before going to the primary
        sources.
      </p>

      <p>
        Take your time. Re-read paragraphs. Look at the diagrams twice.
        Open the daily panchang on this site and find the thing you just
        read about on today&rsquo;s page. Reading about a tithi and seeing
        today&rsquo;s tithi side by side is what makes it stick.
      </p>

      <p>Let us begin.</p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        अगर आपने कभी पंचांग खोला हो और लगा हो कि कमरे में बैठे बाकी सब लोग कोई
        ऐसी भाषा जानते हैं जो आपको नहीं आती — तो यह पुस्तक आपके लिए है।{" "}
        <em>तिथि</em>, <em>नक्षत्र</em>, <em>योग</em>, <em>करण</em>,{" "}
        <em>चौघड़िया</em>, <em>राहु काल</em> — ये शब्द ऐसे प्रयोग होते हैं
        जैसे सब को इनका अर्थ मालूम हो। अधिकतर लोग बस सिर हिला देते हैं। समझते
        नहीं हैं। इसमें कोई बात नहीं — स्कूल में यह विषय किसी को नहीं पढ़ाया
        जाता, और जो पुस्तकें इसे समझाती भी हैं वे प्रायः मान लेती हैं कि आधा
        उत्तर तो आपको पहले से ज्ञात है।
      </p>

      <p>
        हम बिल्कुल शून्य से शुरू करेंगे। कोई पूर्व-शर्त नहीं। संस्कृत का कोई
        ज्ञान आवश्यक नहीं। खगोल विज्ञान का कोई पूर्व अनुभव नहीं। पुस्तक 1 के
        अंत तक आप वर्ष के किसी भी दिन का पंचांग खोलकर — अपनी ही भाषा में, खुलकर
        — बता सकेंगे कि उसकी प्रत्येक पंक्ति का क्या अर्थ है, उसके आँकड़े कहाँ
        से आये, वे किस गणना का परिणाम हैं, और जो समय वहाँ बताया गया है वह आपके
        प्रयोजन के लिए शुभ है या नहीं।
      </p>

      <h2>यह पुस्तक किनके लिए है</h2>

      <p>
        यह पुस्तक चार प्रकार के पाठकों के लिए है — और पाँचवें के रूप में, स्वयं
        मेरे लिए।
      </p>

      <ul>
        <li>
          <strong>जिज्ञासु शुरुआती पाठक के लिए।</strong> आप पंचांग के माहौल
          में पले-बढ़े हैं। आपकी दादी पारिवारिक निर्णयों से पहले पंचांग देखती
          थीं। आप पूछना चाहते थे, पर बीच में टोकना अनुचित लगता था; और अब पूछने
          को कोई शेष नहीं रहा।
        </li>
        <li>
          <strong>ज्योतिष के विद्यार्थी के लिए।</strong> आप ज्योतिष, वास्तु,
          आयुर्वेद या जैन क्रियाविधि का अध्ययन कर रहे हैं और आपको एक स्वच्छ,
          क्रमबद्ध आधार चाहिए — जो किसी चरण को न छोड़े और परम्पराओं के बीच
          मतभेदों को छिपाए नहीं।
        </li>
        <li>
          <strong>प्रवासी तीसरी पीढ़ी के लिए।</strong> आपकी अंग्रेज़ी अच्छी है,
          हिन्दी कुछ रूखी हो गयी है, और संस्कृत बस कुछ त्योहारों के नामों तक
          सीमित है। आपको चाहिए एक वास्तविक सेतु — कोई संक्षिप्त, ऊपरी सारांश
          नहीं।
        </li>
        <li>
          <strong>संशयी पाठक के लिए।</strong> भविष्यवाणियों पर शायद आपका
          विश्वास न हो, परन्तु आप यह जानना चाहते हैं कि एक पूरी सभ्यता ने आकाश
          से कैलेंडर कैसे बनाया, और इसके पीछे का गणित वस्तुतः क्या है। यह
          पुस्तक पढ़ने का यह पूर्णतः वैध कारण है। आप खगोल विज्ञान को ले लीजिए
          और शेष को छोड़ दीजिए। विश्व की कुछ सबसे अच्छी प्रकार से सुरक्षित
          प्राचीन खगोलीय अभिलेख भारतीय परम्परा से ही आते हैं; अनुष्ठानिक परत
          चाहे आप मानें या न मानें, वह अवलोकन-संग्रह स्वयं में मानवीय विज्ञान
          की एक वास्तविक धरोहर है।
        </li>
        <li>
          <strong>और स्वयं मेरे लिए।</strong> मैं यह पुस्तक इसलिए लिख रहा हूँ
          क्योंकि अधिकांश विषय मुझे भी ज्ञात नहीं था। हर अध्याय वही है जो मैंने
          स्वयं बैठकर प्रश्न-दर-प्रश्न समझा।
        </li>
      </ul>

      <h2>खगोल विज्ञान और ज्योतिष — दोनों एक नहीं हैं</h2>

      <p>
        प्रारम्भ करने से पहले एक भेद स्पष्ट कर लेना चाहिए, जो आगे की बहुत-सी
        उलझनों से हमें बचा लेगा।
      </p>

      <p>
        <strong>खगोल विज्ञान</strong> यह अध्ययन है कि आकाश में कौन-सी वस्तु
        वास्तव में कहाँ है। सूर्य पूर्व में उगता है। चन्द्रमा लगभग 29.5 दिन में
        अपने कलाओं का चक्र पूरा करता है। मंगल लगभग 687 दिन में सूर्य की
        परिक्रमा पूरी करता है। ये तथ्य हैं जिन्हें आप दूरबीन या घड़ी से सत्यापित
        कर सकते हैं — किसी की मान्यता पर निर्भर नहीं।
      </p>

      <p>
        <strong>ज्योतिष</strong> इन्हीं तथ्यों पर लगायी गयी अर्थ की एक परत है।
        यह कहता है कि आपके जन्म-दिवस पर चन्द्रमा आकाश के जिस भाग में था, वह
        आपके स्वभाव को प्रभावित करता है; यह घड़ी यात्रा प्रारम्भ के लिए शुभ
        है, वह नहीं। इस परत को मानें या न मानें — यह आप पर है। पर ज्योतिष का
        मूल्यांकन तभी विवेक से सम्भव है जब आप उसके नीचे का खगोल विज्ञान पहले
        समझ लें। ज्योतिष पर अधिकांश बहसें वस्तुतः उन लोगों के बीच होती हैं जहाँ
        एक पक्ष को खगोल विज्ञान आता है और दूसरे को नहीं — या किसी को नहीं आता।
      </p>

      <p>
        पंचांग, अपने मूल में, खगोल विज्ञान की एक दैनिक रिपोर्ट है, जिस पर
        ज्योतिषीय और अनुष्ठानिक टिप्पणी जुड़ी होती है। <strong>यह पुस्तक पहले
        खगोल विज्ञान सिखाती है।</strong> उसके बाद ज्योतिषीय परत आपके सामने एक
        स्वतंत्र प्रश्न के रूप में आती है, जिसे आप ईमानदारी से पूछ सकते हैं।
      </p>

      <KeyIdea
        title="ज्योतिष का आधार खगोल विज्ञान है"
        titleHi="Astronomy is the floor. Astrology is built on top of it."
      >
        भविष्यवाणियों के बारे में आपकी अन्ततः जो भी राय बने, पंचांग की गणनाएँ
        वास्तविक खगोलीय घटनाएँ हैं। हम उन्हें उसी रूप में देखेंगे। जहाँ
        परम्परा और प्रत्यक्ष अवलोकन में अंतर है, वहाँ हम उसका उल्लेख करेंगे।
        जहाँ दो परम्पराएँ अलग कहती हैं, वहाँ हम स्पष्ट करेंगे कि प्रत्येक ने वह
        विकल्प क्यों चुना।
      </KeyIdea>

      <h2>पंचांग वस्तुतः क्या है</h2>

      <p>
        <em>पंचांग</em> शब्द का अर्थ है &ldquo;पाँच अंग&rdquo; (पंच + अंग)। यह
        उन पाँच सूचनाओं का संदर्भ देता है, जो मिलकर भारतीय पारम्परिक कैलेंडर
        में किसी भी दिन का पूरा वर्णन कर देती हैं —
      </p>

      <ol>
        <li>
          <strong>तिथि</strong> — चन्द्र दिवस, जिसकी परिभाषा सूर्य और चन्द्रमा
          के बीच के कोण से होती है।
        </li>
        <li>
          <strong>वार</strong> — सप्ताह का दिन, जिसका स्वामी सात ग्रहों में से
          एक होता है।
        </li>
        <li>
          <strong>नक्षत्र</strong> — चन्द्रमा वर्तमान में जिस चन्द्र-मण्डल में
          हो (कुल 27 में से एक)।
        </li>
        <li>
          <strong>योग</strong> — सूर्य और चन्द्रमा के देशांतरों के संयोग से बना
          एक विशिष्ट विभाजन।
        </li>
        <li>
          <strong>करण</strong> — एक तिथि का आधा भाग।
        </li>
      </ol>

      <p>
        बस पाँच चीज़ें — यही पूरी संरचना का ढाँचा है। पंचांग में आप जो शेष सब
        कुछ देखते हैं — चौघड़िया, मुहूर्त, राहु काल, अभिजित्, और विभिन्न शुभ
        योग — वह या तो इन्हीं पाँचों से व्युत्पन्न है, या इन्हीं पर रखी हुई एक
        अतिरिक्त परत है। हम प्रत्येक को एक स्वतंत्र अध्याय में लेंगे, और अंत में
        आप देखेंगे कि एक दिन का पंचांग वस्तुतः उसी तिथि पर लगाये गये इन्हीं
        पाँच प्रश्नों के उत्तर हैं।
      </p>

      <h2>भारतीय खगोल विज्ञान और कैलेंडर का संक्षिप्त इतिहास</h2>

      <p>
        यह समझना उपयोगी है कि आज आप जो पंचांग पढ़ रहे हैं, वह कम से कम तीन
        हज़ार वर्षों की अविच्छिन्न परम्परा का अंतिम बिन्दु है। यह शब्दावली, ये
        विभाजन, ये गणना के नियम — कोई भी एक ही समय में नहीं बने। इन्हें
        परिमार्जित किया गया, आकाश से मिलाकर परखा गया, विभिन्न शाखाओं के बीच
        विवादित किया गया, और बार-बार सुधारा गया। यह प्रणाली जीवित है, और आधुनिक
        पंचांगों के बीच के मतभेद प्रायः किसी न किसी ऐतिहासिक शाखाभेद से आते
        हैं।
      </p>

      <p>
        सबसे प्राचीन परत है <em>वेदाङ्ग ज्योतिष</em>, जिसकी रचना ऋषि लगध को
        श्रेय दी जाती है, और अधिकांश विद्वान् इसे लगभग 1400–1200 ईसा पूर्व में
        रखते हैं। यह वस्तुतः खगोल विज्ञान का पाठ्य-ग्रंथ नहीं है — यह वैदिक
        अनुष्ठानों के समय निर्धारण की पुस्तिका है। फिर भी इसी ग्रंथ में हमें 27
        नक्षत्र, पाँच-वर्षीय युग चक्र, चन्द्र मास का तिथियों में विभाजन, और
        चन्द्र-सौर गणना को समायोजित रखने के लिए अधिक मास का नियम बीज-रूप में
        मिल जाते हैं।
      </p>

      <p>
        शास्त्रीय संश्लेषण इसके एक हज़ार वर्ष बाद, <strong>सिद्धान्त-काल</strong>{" "}
        में आता है (लगभग 400–1200 ईस्वी)। <em>सूर्य सिद्धान्त</em> जैसे ग्रंथ,
        आर्यभट का <em>आर्यभटीय</em> (499 ई.), वराहमिहिर की{" "}
        <em>पञ्च-सिद्धान्तिका</em> और <em>बृहत् संहिता</em> (~550 ई.),
        ब्रह्मगुप्त का <em>ब्रह्मस्फुटसिद्धान्त</em> (628 ई.), और भास्कर
        द्वितीय का <em>सिद्धान्त शिरोमणि</em> (1150 ई.) — ये उस ज्यामिति और
        अंकगणित का विकास करते हैं जो व्यवस्थित भविष्यकथन सम्भव बनाता है।
        आर्यभट यह प्रस्तावित करते हैं कि पृथ्वी अपनी धुरी पर घूमती है। उन्हीं
        खंडों में जहाँ वे ग्रहों की स्थितियों की गणना कर रहे हैं, ब्रह्मगुप्त
        ऋणात्मक संख्याओं और शून्य के नियम सिद्ध कर रहे हैं। यह खगोल विज्ञान
        गणितीय रूप से कठोर है और प्रत्यक्ष अवलोकन से जाँचा हुआ है।
      </p>

      <p>
        समानान्तर रूप से — और यह हमारे विशिष्ट पंचांग के लिए विशेष महत्त्व
        रखता है — <strong>जैन करण-परम्परा</strong> अपना स्वतंत्र काल-गणना
        साहित्य विकसित करती है। <em>सूर्यप्रज्ञप्ति</em>,{" "}
        <em>चन्द्रप्रज्ञप्ति</em>, और परवर्ती करण-ग्रंथ काल-गणना के नियम संहिता
        में बद्ध करते हैं — जिसमें <em>उदय तिथि</em> का वह 6-घटी का नियम भी
        सम्मिलित है, जिसका पालन यह पंचांग करता है। जैन परम्परा खगोल विज्ञान के
        प्रति विशेष सूक्ष्मता रखती है, क्योंकि व्रत, उपवास और क्रिया-विधि के
        कठोर पालन के लिए सटीक काल-गणना अनिवार्य है। तिथि वाले अध्याय में आप
        देखेंगे कि यह नियम विशेष रूप से क्यों महत्त्वपूर्ण है।
      </p>

      <p>
        भारत के विभिन्न क्षेत्रों ने अपनी-अपनी पंचांग शैलियाँ भी विकसित कीं।
        आज कई जीवित परम्पराएँ हैं — दक्षिण के <em>सूर्य-सिद्धान्त</em>-आधारित
        पंचांग, समकालीन खगोलीय आँकड़ों पर आधारित <em>दृक्</em> पंचांग,
        तमिलभाषी क्षेत्रों में संरक्षित <em>वाक्य</em> पंचांग, और विभिन्न जैन,
        वैष्णव तथा क्षेत्रीय शैव कैलेंडर। ये सब वही खगोल विज्ञान प्रयोग करते
        हैं। अंतर छोटे विकल्पों में है — गणना के लिए आधार-युग कौन-सा माना
        जाये, सायन या निरयण राशि-चक्र में से कौन-सा प्रयोग हो, मध्य-दिन में
        बदलने वाली तिथि का निर्णय किस नियम से हो, इत्यादि। दो पंचांगों का किसी
        त्योहार पर एक दिन के अंतर से असहमत होना प्रायः इन्हीं किसी एक परिपाटी
        का परिणाम होता है, गणना की त्रुटि नहीं।
      </p>

      <h2>इस विशिष्ट पंचांग के बारे में</h2>

      <p>
        जिस उपकरण पर आप यह पढ़ रहे हैं, वह <strong>जैन परम्परा</strong> का
        अनुसरण करता है — <em>उदय तिथि</em> का नियम{" "}
        <strong>छह-घटी की सीमा</strong> पर लगाया जाता है: सूर्योदय के बाद की
        प्रथम छह घटियों (लगभग दो घंटे चौबीस मिनट) में जो तिथि चल रही हो, वही
        उस पूरे दिन की उदय तिथि होती है। ग्रह और चन्द्र की स्थितियों के लिए
        हम आधुनिक खगोलीय (दृक्) गणनाओं का प्रयोग करते हैं, न कि पुराने करण-
        सन्निकटन — क्योंकि आज की अपेक्षित परिशुद्धता पर ये अधिक सटीक हैं।
        जहाँ जैन सैद्धान्तिक परिपाटी कोई नियम निर्धारित करती है (जैसे छह-घटी की
        सीमा), वहाँ हम उसी का पालन करते हैं; जहाँ अंतर्निहित संख्या मात्र{" "}
        &ldquo;इस क्षण में चन्द्रमा की स्थिति&rdquo; है, वहाँ हम उसे आधुनिक
        खगोल विज्ञान से ही निकालते हैं।
      </p>

      <p>
        छह-घटी के नियम पर हम तिथि-अध्याय में पूरा एक खंड देंगे, क्योंकि जब लोग
        दो भिन्न पंचांगों को मिलाकर देखते हैं और उन्हें त्योहार की तिथि एक दिन
        के अंतर से दिखती है — तो उसका सबसे बड़ा कारण यही नियम होता है।
      </p>

      <h2>पुस्तक की संरचना</h2>

      <p>
        पुस्तक के दो भाग हैं। आप अभी भाग 1 पढ़ रहे हैं।
      </p>

      <p>
        <strong>पुस्तक 1 — पंचांग।</strong> काल और आकाश, पाँच अंगों का गहन
        विवेचन, उनसे व्युत्पन्न अवधारणाएँ (चौघड़िया, मुहूर्त, राहु काल, यमगण्ड,
        गुलिक), शुभ और अशुभ योग (त्रिपुष्कर, द्विपुष्कर, अमृत-सिद्धि, सर्वार्थ-
        सिद्धि, पंचक, भद्रा), और अंत में एक वास्तविक दिन के पंचांग का पूरा,
        आरम्भ से अंत तक का पठन।
      </p>

      <p>
        <strong>पुस्तक 2 — कुण्डली।</strong> जब आप पंचांग पढ़ने में निपुण हो
        जायेंगे, अगला स्वाभाविक चरण है जन्म-कुण्डली। इसमें हम मुख्य चार्ट
        प्रकार (लग्न, राशि, नवांश और भिन्न-भिन्न वर्ग), बारह भावों, ग्रहों की
        दृष्टि और मित्रता-शत्रुता, विंशोत्तरी दशा प्रणाली, और &mdash; बिना
        दिखावे के, ईमानदारी से &mdash; कुण्डली पढ़ने की पद्धति को लेंगे। वह
        पुस्तक इस के पूर्ण होने के बाद आरम्भ होगी।
      </p>

      <h2>इस पुस्तक को कैसे पढ़ें</h2>

      <p>
        कुछ सुझाव — महत्त्व के क्रम में।
      </p>

      <ul>
        <li>
          <strong>क्रम में पढ़ें।</strong> प्रत्येक अध्याय अपने पूर्व अध्याय
          पर आधारित है। यदि आप कोई अध्याय छोड़ देंगे, तो आगे कोई शब्द ऐसा
          मिलेगा जो आपको ज्ञात नहीं होगा।
        </li>
        <li>
          <strong>हर अध्याय दो बार पढ़ें।</strong> पहली बार रूपरेखा समझने के
          लिए, दूसरी बार वस्तुतः समझने के लिए। चित्र इस पुस्तक की रीढ़ हैं —
          यदि वर्णन अस्पष्ट लगे, तो उत्तर चित्र में मिलेगा।
        </li>
        <li>
          <strong>जीवित उपकरण से मिलाकर देखिए।</strong> जब अध्याय कोई अवधारणा
          प्रस्तुत करे, तो इसी वेबसाइट का दैनिक पंचांग खोलिए और उसी अवधारणा को
          किसी वास्तविक दिन में पहचानिए। जो अवधारणा कागज़ पर अमूर्त लगती है, वह
          प्रायः आज की संख्या के रूप में सामने आते ही स्पष्ट हो जाती है।
        </li>
        <li>
          <strong>संस्कृत शब्द सदैव युग्म में आते हैं।</strong> प्रत्येक
          परम्परा-विशेष शब्द दोनों रूपों में मिलेगा — रोमन लिप्यन्तर और
          देवनागरी। यह सजावट नहीं है — कई शब्दों की मूल धातु अर्थपूर्ण है, जो
          लिप्यन्तर में लुप्त हो जाती है। यदि आप अभी देवनागरी पढ़ नहीं सकते, तब
          भी एक ही शब्द को बार-बार उसी रूप में देखकर वह परिचित होने लगेगा — और
          यह परिचय ही पहला कदम है।
        </li>
        <li>
          <strong>अपरिचित शब्दों को रुककर देखिए।</strong> यदि किसी वाक्य में
          ऐसा संस्कृत शब्द आ जाये जो आपने नहीं देखा, तो इसी साइट पर उसे खोजिए।
          हम कोशिश करते हैं कि कोई शब्द बिना परिचय के प्रयोग न हो — पर वेब
          आपस में जुड़ा हुआ है, और कभी-कभार कोई शब्द सीमा पार कर जायेगा।
        </li>
      </ul>

      <h2>यह पुस्तक क्या नहीं है</h2>

      <p>
        यह भविष्यवाणियों की पुस्तक नहीं है। हम आपको नहीं बतायेंगे कि बुधवार को
        कौन-सा रंग पहनना है या कौन-सा रत्न खरीदना है। हम वह तर्क समझायेंगे जिस
        कारण किसी विशिष्ट परम्परा में बुधवार बुध से और बुध हरे रंग से जोड़ा
        जाता है — ताकि यदि आप इन सम्बन्धों को मानना चाहें, तो जानकर मानें।
      </p>

      <p>
        यह कोई शोध-ग्रन्थ भी नहीं है। भारतीय खगोल विज्ञान पर उत्कृष्ट विद्वत्ता-
        ग्रन्थ उपलब्ध हैं — डेविड पिंगरी का सूचि-संग्रह और किम प्लोफ़कर का
        इतिहास अंग्रेज़ी में मानक माने जाते हैं। हम कभी-कभार उनकी ओर भी संकेत
        करेंगे। यह पुस्तक उस ईमानदार शुरुआती समझ के निकट है, जो ऐसे व्यक्ति की
        है जो अभी तक स्वयं शुरुआती ही था — पर इस गहराई पर लिखी है कि एक
        गम्भीर विद्यार्थी इसे आधार-ग्रन्थ की तरह उपयोग कर सके, और तत्पश्चात्
        मूल स्रोतों की ओर बढ़े।
      </p>

      <p>
        समय लीजिए। अनुच्छेदों को दोबारा पढ़िए। चित्रों को दो बार देखिए। इसी
        साइट का दैनिक पंचांग खोलिए, और जो अभी-अभी पढ़ा है उसे आज के पन्ने में
        पहचानिए। तिथि के बारे में पढ़ना और आज की तिथि को साथ-साथ देखना — यही
        वह क्रिया है जो ज्ञान को दृढ़ करती है।
      </p>

      <p>आइए, आरम्भ करें।</p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

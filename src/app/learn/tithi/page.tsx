import { ChapterShell } from "@/components/learn/ChapterShell";
import { FigurePlaceholder } from "@/components/learn/Figure";
import { KeyIdea } from "@/components/learn/Term";
import { getChapter } from "@/lib/learn/chapters";

const chapter = getChapter("tithi")!;

export const metadata = {
  title: `${chapter.title} — Learn Panchang`,
  description: chapter.summary,
};

function EnglishContent() {
  return (
    <>
<p>
        We are now ready for the first of the five limbs of panchang. It is
        the most important one, the one most often used in everyday life —
        the one your grandmother was checking when she said &ldquo;today is
        Ekadashi&rdquo; or &ldquo;Purnima is on Tuesday this month.&rdquo; It
        is called <strong>tithi</strong> <span lang="hi">(तिथि)</span>, and
        it is the lunar day.
      </p>

      <p>
        Tithi is not the same as a regular day. A regular day, as we saw,
        is about Earth&rsquo;s rotation. A tithi is about the Moon —
        specifically, about the angle between the Sun and the Moon as
        seen from Earth. That sounds technical, but the idea is very
        simple, and once you see it, you cannot un-see it. By the end of
        this chapter we will have computed an actual tithi by hand, walked
        through the Jain six-ghati rule on a real date, and understood why
        a single tithi can be 20 hours long one week and 26 hours long the
        next.
      </p>

      <h2>The 12° rule</h2>

      <p>
        Imagine you are standing on Earth, looking up. The Sun and the
        Moon are both somewhere in the sky. The Moon is moving around the
        Earth. That means, from our point of view, the Moon is gradually
        moving away from the Sun&rsquo;s position in the sky each day,
        getting further ahead, then catching up again on the other side,
        in a 29.53-day cycle. (This is the synodic month we met in the
        previous chapter.)
      </p>

      <p>
        The Indian calendar takes this cycle and divides it into 30 equal
        parts. The full circle around the sky is 360°. Divide that by 30
        and you get 12°. <strong>Each 12° gap between the
        Moon&rsquo;s position and the Sun&rsquo;s position is one
        tithi.</strong>
      </p>

      <FigurePlaceholder
        number="2.1"
        caption="One tithi = a 12° angular separation between Moon and Sun, as seen from Earth."
        captionHi="एक तिथि = पृथ्वी से देखने पर सूर्य और चंद्र के बीच 12° का कोणीय अंतर।"
        promptHint="See Batch 1 image #3 for the Gemini prompt."
      />

      <p>
        More formally, if we denote the Moon&rsquo;s ecliptic longitude as{" "}
        <code>λ_M</code> and the Sun&rsquo;s as <code>λ_S</code>, the
        tithi index at any moment is:
      </p>

      <blockquote>
        <strong>Tithi number</strong> = <code>floor((λ_M − λ_S) mod 360 ÷ 12)</code> + 1
      </blockquote>

      <p>
        That single formula, with the 12° spacing, is the entire
        astronomical definition. Everything else — naming, paksha, festival
        timings — is interpretation.
      </p>

      <KeyIdea
        title="A tithi is a 12° gap between Moon and Sun."
        titleHi="तिथि = सूर्य और चंद्र के बीच 12° का अंतर"
      >
        When the Moon is exactly with the Sun, that is the new moon —
        Amavasya. When the Moon has pulled ahead by 12°, the first tithi
        (Pratipada) is complete. By 180°, the Moon is opposite the Sun —
        full moon, Purnima. By 360°, we are back to new moon. Thirty
        tithis. One lunar month.
      </KeyIdea>

      <h2>The 30 tithis: Shukla and Krishna paksha</h2>

      <p>Those 30 tithis are split into two halves of 15 each.</p>

      <ul>
        <li>
          <strong>Shukla Paksha</strong>{" "}
          <span lang="hi">(शुक्ल पक्ष)</span> — the bright fortnight. From
          new moon to full moon. The Moon is <em>waxing</em>, getting
          fuller every night.
        </li>
        <li>
          <strong>Krishna Paksha</strong>{" "}
          <span lang="hi">(कृष्ण पक्ष)</span> — the dark fortnight. From
          full moon to next new moon. The Moon is <em>waning</em>, getting
          thinner every night.
        </li>
      </ul>

      <p>
        Within each paksha, the 15 tithis have names. The first 14 share
        the same names in both halves — they are simply numbered. The
        15th has a special name in each half: <em>Purnima</em> for the
        full moon at the end of Shukla, <em>Amavasya</em> for the new moon
        at the end of Krishna.
      </p>

      <FigurePlaceholder
        number="2.2"
        caption="The 30 tithis of a lunar month — Shukla paksha (waxing) and Krishna paksha (waning)."
        captionHi="चंद्र मास की 30 तिथियाँ — शुक्ल पक्ष (बढ़ता चंद्र) और कृष्ण पक्ष (घटता चंद्र)।"
        promptHint="See Batch 1 image #4 for the Gemini prompt."
      />

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tithi name</th>
            <th>देवनागरी</th>
            <th>Sanskrit meaning</th>
            <th>Festivals associated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Pratipada</td>
            <td lang="hi">प्रतिपदा</td>
            <td>&ldquo;The first&rdquo;</td>
            <td>Gudi Padwa, Ugadi (Chaitra Shukla)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Dwitiya</td>
            <td lang="hi">द्वितीया</td>
            <td>&ldquo;Second&rdquo;</td>
            <td>Bhai Dooj (Kartika Shukla)</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Tritiya</td>
            <td lang="hi">तृतीया</td>
            <td>&ldquo;Third&rdquo;</td>
            <td>Akshaya Tritiya (Vaishakh Shukla)</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Chaturthi</td>
            <td lang="hi">चतुर्थी</td>
            <td>&ldquo;Fourth&rdquo;</td>
            <td>Ganesh Chaturthi, Sankashti Chaturthi</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Panchami</td>
            <td lang="hi">पंचमी</td>
            <td>&ldquo;Fifth&rdquo;</td>
            <td>Vasant Panchami, Naga Panchami</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Shashthi</td>
            <td lang="hi">षष्ठी</td>
            <td>&ldquo;Sixth&rdquo;</td>
            <td>Skanda Shashthi, Chhath Puja</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Saptami</td>
            <td lang="hi">सप्तमी</td>
            <td>&ldquo;Seventh&rdquo;</td>
            <td>Ratha Saptami</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Ashtami</td>
            <td lang="hi">अष्टमी</td>
            <td>&ldquo;Eighth&rdquo;</td>
            <td>Janmashtami (Shravana Krishna)</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Navami</td>
            <td lang="hi">नवमी</td>
            <td>&ldquo;Ninth&rdquo;</td>
            <td>Ram Navami, Maha Navami</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Dashami</td>
            <td lang="hi">दशमी</td>
            <td>&ldquo;Tenth&rdquo;</td>
            <td>Vijaya Dashami / Dussehra (Ashwin Shukla)</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Ekadashi</td>
            <td lang="hi">एकादशी</td>
            <td>&ldquo;Eleventh&rdquo;</td>
            <td>Observed as a fasting day across both pakshas</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Dwadashi</td>
            <td lang="hi">द्वादशी</td>
            <td>&ldquo;Twelfth&rdquo;</td>
            <td>Vaman Dwadashi, Govatsa Dwadashi</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Trayodashi</td>
            <td lang="hi">त्रयोदशी</td>
            <td>&ldquo;Thirteenth&rdquo;</td>
            <td>Pradosh, Dhanteras</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Chaturdashi</td>
            <td lang="hi">चतुर्दशी</td>
            <td>&ldquo;Fourteenth&rdquo;</td>
            <td>Narak Chaturdashi, Maha Shivaratri (Phalgun Krishna)</td>
          </tr>
          <tr>
            <td>15</td>
            <td>
              <strong>Purnima</strong> / <strong>Amavasya</strong>
            </td>
            <td lang="hi">पूर्णिमा / अमावस्या</td>
            <td>&ldquo;Full / no Moon&rdquo;</td>
            <td>Guru Purnima, Sharad Purnima / Diwali Amavasya</td>
          </tr>
        </tbody>
      </table>

      <p>
        So if someone says &ldquo;Krishna Ashtami&rdquo;, they mean the
        8th tithi of the dark fortnight — that is the day we call
        Janmashtami, the birth of Krishna. &ldquo;Shukla Chaturthi&rdquo;
        means the 4th tithi of the bright fortnight. The naming is
        regular and predictable once you have the pattern. A festival
        date in the Indian calendar is always &ldquo;month + paksha +
        tithi&rdquo;: <em>Vaishakh Shukla Tritiya</em> means &ldquo;the
        third tithi of the bright fortnight in the month of
        Vaishakh.&rdquo; That is Akshaya Tritiya.
      </p>

      <h2>The Jain Tirthankara connection</h2>

      <p>
        For Jain readers, tithi has a particular weight. The five
        kalyanakas — chyavan (descent), janma (birth), diksha
        (renunciation), kevalajnana (omniscience), and nirvana
        (liberation) — of each Tirthankara are recorded as month + paksha
        + tithi. The Pramanik Panchang Events Master maintains these for
        all 24 Tirthankaras. When you see &ldquo;Mahavir Janma
        Kalyanak&rdquo; on a date, it is because <em>Chaitra Shukla
        Trayodashi</em> falls on that civil day. Festivals are not
        attached to fixed calendar dates; they are attached to lunar
        coordinates that recur each year as the Sun and Moon revisit the
        relevant configuration.
      </p>

      <h2>Why tithis are not equal in clock-time</h2>

      <p>
        Here is the subtle part. A tithi is defined by a 12° angular gap
        between Sun and Moon — not by a fixed amount of time. The Moon
        does not move at a constant speed across the sky. Sometimes it is
        a bit faster, sometimes a bit slower. So one tithi might take{" "}
        <strong>about 20 hours</strong> to complete, and the next might
        take <strong>about 26 hours</strong>.
      </p>

      <p>
        Why does the Moon&rsquo;s apparent speed change? Two reasons,
        both stated cleanly by Kepler in 1609 and known qualitatively to
        Indian astronomers many centuries earlier under the names{" "}
        <em>manda</em> and <em>shighra</em>.
      </p>

      <ol>
        <li>
          <strong>The Moon&rsquo;s orbit is an ellipse, not a circle.</strong>{" "}
          When it is closer to Earth (at perigee, near a point called the
          lunar <em>apsis</em>) it moves faster across the sky; when
          farther (at apogee) it moves slower. This effect alone produces a
          variation of about ±13% from the mean speed.
        </li>
        <li>
          <strong>The Sun is also moving in apparent longitude</strong>{" "}
          (because Earth is moving around the Sun). The Sun&rsquo;s motion
          is also slightly non-uniform, by Kepler&rsquo;s second law
          applied to Earth&rsquo;s orbit, but this is a much smaller
          effect — about 1° variation across the year.
        </li>
      </ol>

      <p>
        On average, a tithi is about <strong>23 hours and 37
        minutes</strong> long — slightly less than a regular solar day
        (the synodic month is 29.53 days ÷ 30 tithis = 23.62 hours).
        This is why a tithi can begin and end at any time of day or
        night. Two tithis can occur within a single 24-hour day, or one
        tithi can span across two days.
      </p>

      <p>
        And that creates a question. <strong>If a tithi can change in
        the middle of the day, which tithi does the day &ldquo;belong
        to&rdquo;?</strong>
      </p>

      <h2>How different traditions answer the question</h2>

      <p>
        This is the central question that splits panchang traditions, and
        understanding it is what allows you to compare two panchangs
        intelligently when they disagree on a festival date.
      </p>

      <p>
        The basic puzzle: imagine the morning of 15th of some month.
        Sunrise is at 6:30 AM. Tithi 5 (Panchami) is in effect at 6:30 AM
        but ends at 8:00 AM, after which Tithi 6 (Shashthi) takes over
        and remains until tomorrow morning. <strong>Is today
        Panchami, or Shashthi?</strong>
      </p>

      <p>
        Different traditions give different answers, and each answer is
        defensible.
      </p>

      <ul>
        <li>
          <strong>Sunrise rule (general Smarta tradition).</strong>{" "}
          Whichever tithi is current at the moment of sunrise is the
          tithi for the day, regardless of how briefly. By this rule,
          today would be Panchami, even though it ends 90 minutes after
          sunrise.
        </li>
        <li>
          <strong>Daytime majority rule (some Vaishnava traditions for
          fast days).</strong> Whichever tithi covers more than half the
          time between sunrise and sunset is the tithi for the day.
        </li>
        <li>
          <strong>Sunset rule (some southern regional panchangs for
          specific observances).</strong> Whichever tithi is current at
          sunset.
        </li>
        <li>
          <strong>Six-ghati rule (Jain udaya tithi, used by this
          panchang).</strong> The tithi must be in effect for at least the
          first six ghatis (~2h 24m) after sunrise to count as the
          udaya tithi. If it ends sooner, the next tithi takes over the
          day.
        </li>
      </ul>

      <p>
        None of these are &ldquo;wrong.&rdquo; They are different
        conventions for handling the same astronomical fact (a tithi
        change near sunrise). The Jain six-ghati rule has a particular
        logic to it that we explain next.
      </p>

      <h2>The Jain rule — Udaya tithi with six ghatis</h2>

      <p>
        The Jain tradition specifies: <strong>the tithi that is active
        during the first 6 ghatis (about 2 hours and 24 minutes) after
        sunrise is the tithi for the entire day.</strong> This is
        called <em>udaya tithi</em>{" "}
        <span lang="hi">(उदय तिथि)</span> — the &ldquo;rising
        tithi&rdquo; — because it is the tithi that prevails as the day
        rises.
      </p>

      <p>
        Why specifically six ghatis? A ghati is{" "}
        <span lang="hi">(घटी)</span> 24 minutes; six of them is 144
        minutes, or 2 hours 24 minutes. In the classical Jain
        scheme, this corresponds to the first <em>muhurta</em> after
        sunrise plus the morning twilight period, traditionally
        considered the most ritually significant window of the day —
        the time of <em>navakar mantra</em> and morning observances.
        Tying tithi-determination to this window aligns the calendar
        with ritual life: the tithi that holds during morning
        observances should be the tithi attributed to the day. The
        rule is also clean, deterministic, and fully computable —
        properties that matter when you are running a calendar for an
        entire community across many locations and times.
      </p>

      <FigurePlaceholder
        number="2.3"
        caption="Jain udaya tithi: the tithi prevailing in the first 6 ghatis after sunrise governs the entire day."
        captionHi="जैन उदय तिथि नियम: सूर्योदय के बाद पहली 6 घटी में जो तिथि हो, वही पूरे दिन की उदय तिथि होती है।"
        promptHint="See Batch 1 image #5 for the Gemini prompt."
      />

      <h3>Worked example A — tithi survives the window</h3>

      <p>
        Suppose Tithi 5 (Panchami) began yesterday at 10:00 PM and ends
        today at 10:00 AM. Sunrise today is at 6:30 AM. The first six
        ghatis run from 6:30 AM to 8:54 AM. Is Panchami in effect for
        that entire window?
      </p>

      <p>
        Yes — Panchami is active from 6:30 AM all the way until 10:00 AM,
        which is well after 8:54 AM. So Panchami is the udaya tithi.
        Today, from midnight to midnight, is recorded as Panchami in the
        Jain panchang. Even though Panchami ends at 10:00 AM and the
        rest of the day is technically Shashthi, that does not change the
        label. The day is Panchami.
      </p>

      <h3>Worked example B — tithi fails the window</h3>

      <p>
        Suppose Tithi 5 began yesterday at 4:00 AM and ends today at 7:00
        AM. Sunrise is again at 6:30 AM. The first six ghatis run from
        6:30 AM to 8:54 AM. Is Panchami in effect throughout that
        window?
      </p>

      <p>
        No — Panchami is active from 6:30 AM to 7:00 AM (only 30 minutes),
        and then Shashthi takes over from 7:00 AM through 8:54 AM and
        beyond. Panchami did <em>not</em> hold the window. Therefore the
        udaya tithi for today is <strong>Shashthi</strong>. Today is
        Shashthi from midnight to midnight, even though it
        &ldquo;started&rdquo; technically as Panchami.
      </p>

      <h3>Worked example C — boundary case</h3>

      <p>
        What if Panchami ends at exactly 8:54 AM, on the boundary?
        Different acharyas have given slightly different rulings on the
        boundary case. The conservative Jain reading, and the one this
        panchang follows, is that the tithi must be present{" "}
        <em>throughout</em> the six-ghati window — strictly. If the
        change happens at the boundary or before, the next tithi wins.
        This means a tithi must be active <em>at the start of the seventh
        ghati</em> to be the udaya tithi.
      </p>

      <KeyIdea
        title="The 6-ghati rule resolves a real ambiguity in the calendar."
        titleHi="6-घटी का नियम कैलेंडर की एक वास्तविक उलझन को सुलझाता है"
      >
        Other traditions have other rules — some take whichever tithi
        was active at sunrise regardless of how briefly; some take the
        majority of daylight. None of them is &ldquo;wrong&rdquo; — they
        are different conventions for the same astronomical reality. The
        Jain choice is the six-ghati rule, and it is what this panchang
        follows.
      </KeyIdea>

      <h2>Tithi vriddhi and tithi kshaya</h2>

      <p>Two more terms you will eventually run into.</p>

      <p>
        Because tithis are uneven in length, sometimes a single tithi is
        long enough to stretch across two consecutive sunrises. In that
        case, two consecutive days both get labelled with the same
        tithi. This is called <strong>tithi vriddhi</strong>{" "}
        <span lang="hi">(तिथि वृद्धि)</span> — &ldquo;tithi growth.&rdquo;
        A tithi that takes two days to be observed.
      </p>

      <p>
        The opposite also happens. Sometimes a tithi is so short, and
        positioned so unfortunately, that it begins and ends entirely
        between two sunrises — meaning it never &ldquo;rises&rdquo; on
        its own day. The calendar simply skips it. This is called{" "}
        <strong>tithi kshaya</strong>{" "}
        <span lang="hi">(तिथि क्षय)</span> — &ldquo;tithi loss.&rdquo; A
        tithi that gets dropped from the calendar.
      </p>

      <p>
        On average these mostly cancel out and a lunar month still has
        30 tithis spread across roughly 29–30 civil days. But it is why
        two people in different traditions can sometimes disagree by one
        day on when a festival falls — and now you understand why. When
        a tithi like Mahashivaratri (Phalgun Krishna Chaturdashi) is
        either vriddhi (lasts two days) or near-vriddhi, different rules
        about &ldquo;which day to observe it on&rdquo; produce
        divergent festival dates. The disagreement is real; the
        astronomy is unambiguous.
      </p>

      <h2>The mean tithi vs the true tithi</h2>

      <p>
        One last technical point that you may encounter in older texts.
        Classical Indian astronomy distinguishes between the{" "}
        <em>mean tithi</em>{" "}
        <span lang="hi">(मध्यम तिथि)</span> — computed assuming the Sun
        and Moon move at constant average speeds — and the{" "}
        <em>true tithi</em>{" "}
        <span lang="hi">(स्पष्ट तिथि)</span> — computed using their
        actual non-uniform motion. The siddhanta texts contain
        elaborate corrections to convert mean to true. Modern panchangs
        always use the true tithi, computed from current astronomical
        ephemerides. We mention this only so that if you read a
        nineteenth-century almanac and see the term, you know what the
        author meant.
      </p>

      <h2>What you should be able to do now</h2>

      <p>After this chapter, you should be able to:</p>

      <ul>
        <li>State the 12° rule in one sentence.</li>
        <li>
          Compute, given Sun and Moon longitudes, which tithi is in
          effect.
        </li>
        <li>
          Name the two pakshas and what is happening to the Moon in
          each.
        </li>
        <li>
          Explain why tithi length varies by 20–26 hours, and connect it
          to the Moon&rsquo;s elliptical orbit.
        </li>
        <li>
          List the four major rules different traditions use to assign a
          tithi to a civil day.
        </li>
        <li>
          State the Jain udaya-tithi six-ghati rule and apply it to a
          sample day.
        </li>
        <li>
          Define tithi vriddhi and tithi kshaya, and explain why they
          cause inter-tradition festival-date disagreement.
        </li>
      </ul>

      <p>
        Open the daily panchang on this site. Find today&rsquo;s tithi
        at the top, along with the time at which it ends. Notice that
        the tithi is named for the entire day, even if it ends in the
        morning — that is the udaya rule in action. Now go to a date a
        few months ahead, find a day with a long tithi-end time (say,
        late evening), and check what the tithi is. Predict, using the
        rule, what tomorrow&rsquo;s tithi will be. Then verify.
      </p>

      <p>
        In the next chapter we look at the simplest of the five limbs —{" "}
        <strong>vara</strong>, the weekday — and find that even
        Monday-Tuesday-Wednesday has a deeper structure than we usually
        notice. The order of the days of the week is not arbitrary; it
        is the answer to a specific astronomical question, and the
        seven-fold cycle is older than any of the modern calendars
        that use it.
      </p>
    </>
  );
}

function HindiContent() {
  return (
    <>
      <p>
        अब हम पंचांग के पाँच अंगों में से पहले के लिए तैयार हैं। यह सबसे
        महत्त्वपूर्ण अंग है, दैनिक जीवन में सबसे अधिक प्रयुक्त होने वाला
        &mdash; वही जिसे आपकी दादी पारिवारिक निर्णयों से पहले देखती थीं, जब वे
        कहती थीं &ldquo;आज एकादशी है&rdquo; या &ldquo;इस मास पूर्णिमा मंगलवार
        को है।&rdquo; यह है <strong>तिथि</strong>, चन्द्र दिवस।
      </p>

      <p>
        तिथि साधारण दिवस के समान नहीं है। साधारण दिवस, जैसा हमने देखा, पृथ्वी
        के घूर्णन से सम्बन्धित है। तिथि चन्द्रमा से सम्बन्धित है &mdash;
        विशेष रूप से, पृथ्वी से देखने पर सूर्य और चन्द्रमा के बीच के कोण से।
        यह तकनीकी लग सकता है, परन्तु विचार अत्यंत सरल है, और एक बार समझ में
        आ जाये तो भुलाया नहीं जा सकता। इस अध्याय के अंत तक हम एक तिथि की हस्त-
        गणना कर चुके होंगे, जैन छह-घटी नियम को एक वास्तविक दिन पर लगाकर देख
        चुके होंगे, और यह भी समझ चुके होंगे कि एक तिथि किसी सप्ताह 20 घंटे
        और अगले सप्ताह 26 घंटे की क्यों हो सकती है।
      </p>

      <h2>12° का नियम</h2>

      <p>
        कल्पना कीजिए आप पृथ्वी पर खड़े होकर ऊपर देख रहे हैं। सूर्य और चन्द्रमा
        दोनों आकाश में कहीं हैं। चन्द्रमा पृथ्वी की परिक्रमा कर रहा है। हमारे
        दृष्टिकोण से इसका अर्थ यह है कि चन्द्रमा प्रत्येक दिन सूर्य की
        स्थिति से धीरे-धीरे आगे बढ़ रहा है, अधिकाधिक दूर होता जा रहा है, और
        फिर दूसरी ओर से वापस आकर सूर्य से मिल रहा है &mdash; एक 29.53-दिन के
        चक्र में। (यह वही सावन मास है जिसका उल्लेख पिछले अध्याय में हुआ था।)
      </p>

      <p>
        भारतीय कैलेंडर इस चक्र को 30 बराबर भागों में बाँटता है। आकाश का पूरा
        वृत्त 360° का है। 30 से भाग देने पर 12° मिलते हैं।{" "}
        <strong>चन्द्रमा की स्थिति और सूर्य की स्थिति के बीच का प्रत्येक 12°
        का अंतर एक तिथि है।</strong>
      </p>

      <FigurePlaceholder
        number="2.1"
        caption="One tithi = a 12° angular separation between Moon and Sun, as seen from Earth."
        captionHi="एक तिथि = पृथ्वी से देखने पर सूर्य और चन्द्र के बीच 12° का कोणीय अंतर।"
        promptHint="See Batch 1 image #3 for the Gemini prompt."
      />

      <p>
        औपचारिक रूप से, यदि चन्द्रमा का क्रान्तिवृत्तीय देशांतर{" "}
        <code>λ_M</code> और सूर्य का <code>λ_S</code> है, तो किसी क्षण की
        तिथि-संख्या होगी —
      </p>

      <blockquote>
        <strong>तिथि-संख्या</strong> ={" "}
        <code>floor((λ_M − λ_S) mod 360 ÷ 12)</code> + 1
      </blockquote>

      <p>
        यही एक सूत्र, और 12° का यह अन्तराल &mdash; यही तिथि की सम्पूर्ण
        खगोलीय परिभाषा है। शेष सब &mdash; नामकरण, पक्ष, त्योहारों का काल
        &mdash; उसी पर लगायी हुई व्याख्या है।
      </p>

      <KeyIdea
        title="तिथि = सूर्य और चन्द्र के बीच 12° का अंतर"
        titleHi="A tithi is a 12° gap between Moon and Sun."
      >
        जब चन्द्रमा ठीक सूर्य के साथ हो, तो वह अमावस्या है। जब चन्द्रमा 12°
        आगे बढ़ चुका हो, तब प्रथम तिथि (प्रतिपदा) पूरी हुई। 180° पर चन्द्रमा
        सूर्य के सामने है &mdash; पूर्णिमा। 360° पर हम फिर अमावस्या पर आ गये।
        तीस तिथियाँ। एक चन्द्र-मास।
      </KeyIdea>

      <h2>30 तिथियाँ &mdash; शुक्ल और कृष्ण पक्ष</h2>

      <p>उन 30 तिथियों को 15-15 के दो भागों में बाँटा गया है।</p>

      <ul>
        <li>
          <strong>शुक्ल पक्ष</strong> &mdash; चमकीला पक्ष। अमावस्या से
          पूर्णिमा तक। चन्द्रमा <em>बढ़ता</em> रहता है, हर रात अधिक भरा
          हुआ।
        </li>
        <li>
          <strong>कृष्ण पक्ष</strong> &mdash; अँधेरा पक्ष। पूर्णिमा से अगली
          अमावस्या तक। चन्द्रमा <em>घटता</em> रहता है, हर रात अधिक पतला।
        </li>
      </ul>

      <p>
        प्रत्येक पक्ष में 15 तिथियों के नाम हैं। पहले 14 के नाम दोनों पक्षों
        में एक ही हैं &mdash; वे केवल क्रमांक हैं। पन्द्रहवीं तिथि का दोनों
        पक्षों में अलग नाम है &mdash; शुक्ल के अंत में{" "}
        <em>पूर्णिमा</em> (पूर्ण चन्द्र), कृष्ण के अंत में{" "}
        <em>अमावस्या</em> (अदृश्य चन्द्र)।
      </p>

      <FigurePlaceholder
        number="2.2"
        caption="The 30 tithis of a lunar month — Shukla paksha (waxing) and Krishna paksha (waning)."
        captionHi="चन्द्र मास की 30 तिथियाँ — शुक्ल पक्ष (बढ़ता चन्द्र) और कृष्ण पक्ष (घटता चन्द्र)।"
        promptHint="See Batch 1 image #4 for the Gemini prompt."
      />

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>तिथि</th>
            <th>संस्कृत-अर्थ</th>
            <th>सम्बद्ध त्योहार</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>प्रतिपदा</td><td>&ldquo;प्रथम&rdquo;</td><td>गुड़ी पाड़वा, उगादि (चैत्र शुक्ल)</td></tr>
          <tr><td>2</td><td>द्वितीया</td><td>&ldquo;दूसरी&rdquo;</td><td>भाई दूज (कार्तिक शुक्ल)</td></tr>
          <tr><td>3</td><td>तृतीया</td><td>&ldquo;तीसरी&rdquo;</td><td>अक्षय तृतीया (वैशाख शुक्ल)</td></tr>
          <tr><td>4</td><td>चतुर्थी</td><td>&ldquo;चौथी&rdquo;</td><td>गणेश चतुर्थी, संकष्टी चतुर्थी</td></tr>
          <tr><td>5</td><td>पंचमी</td><td>&ldquo;पाँचवीं&rdquo;</td><td>वसन्त पंचमी, नाग पंचमी</td></tr>
          <tr><td>6</td><td>षष्ठी</td><td>&ldquo;छठी&rdquo;</td><td>स्कन्द षष्ठी, छठ पूजा</td></tr>
          <tr><td>7</td><td>सप्तमी</td><td>&ldquo;सातवीं&rdquo;</td><td>रथ सप्तमी</td></tr>
          <tr><td>8</td><td>अष्टमी</td><td>&ldquo;आठवीं&rdquo;</td><td>जन्माष्टमी (श्रावण कृष्ण)</td></tr>
          <tr><td>9</td><td>नवमी</td><td>&ldquo;नौवीं&rdquo;</td><td>राम नवमी, महानवमी</td></tr>
          <tr><td>10</td><td>दशमी</td><td>&ldquo;दसवीं&rdquo;</td><td>विजयादशमी / दशहरा (आश्विन शुक्ल)</td></tr>
          <tr><td>11</td><td>एकादशी</td><td>&ldquo;ग्यारहवीं&rdquo;</td><td>दोनों पक्षों में उपवास का दिन</td></tr>
          <tr><td>12</td><td>द्वादशी</td><td>&ldquo;बारहवीं&rdquo;</td><td>वामन द्वादशी, गोवत्स द्वादशी</td></tr>
          <tr><td>13</td><td>त्रयोदशी</td><td>&ldquo;तेरहवीं&rdquo;</td><td>प्रदोष, धनतेरस</td></tr>
          <tr><td>14</td><td>चतुर्दशी</td><td>&ldquo;चौदहवीं&rdquo;</td><td>नरक चतुर्दशी, महा शिवरात्रि (फाल्गुन कृष्ण)</td></tr>
          <tr><td>15</td><td><strong>पूर्णिमा / अमावस्या</strong></td><td>&ldquo;पूर्ण / नव चन्द्र&rdquo;</td><td>गुरु पूर्णिमा, शरद पूर्णिमा / दीपावली अमावस्या</td></tr>
        </tbody>
      </table>

      <p>
        अतः जब कोई कहता है &ldquo;कृष्ण अष्टमी&rdquo;, तो उसका अर्थ है कृष्ण
        पक्ष की 8वीं तिथि &mdash; यही वह दिन है जिसे हम जन्माष्टमी कहते हैं,
        श्रीकृष्ण का जन्म-दिवस। &ldquo;शुक्ल चतुर्थी&rdquo; का अर्थ है शुक्ल
        पक्ष की 4थी तिथि। एक बार पैटर्न समझ में आ जाये तो नामकरण नियमित और
        अनुमेय है। भारतीय कैलेंडर में किसी त्योहार का दिन सदा &ldquo;मास +
        पक्ष + तिथि&rdquo; से बताया जाता है &mdash; <em>वैशाख शुक्ल तृतीया</em>{" "}
        का अर्थ है &ldquo;वैशाख मास के शुक्ल पक्ष की तीसरी तिथि।&rdquo; यह है
        अक्षय तृतीया।
      </p>

      <h2>जैन तीर्थंकरों से सम्बन्ध</h2>

      <p>
        जैन पाठकों के लिए तिथि का विशेष महत्त्व है। प्रत्येक तीर्थंकर के पाँच
        कल्याणक &mdash; च्यवन (अवतरण), जन्म, दीक्षा (निष्क्रमण), केवलज्ञान
        (सर्वज्ञता) और निर्वाण (मोक्ष) &mdash; मास + पक्ष + तिथि के रूप में
        ही अंकित हैं। प्रामाणिक पंचांग का इवेंट्स मास्टर सभी 24 तीर्थंकरों के
        लिए ये तिथियाँ संरक्षित रखता है। जब आप किसी तिथि को &ldquo;महावीर
        जन्म कल्याणक&rdquo; देखते हैं, तो उसका कारण यह है कि{" "}
        <em>चैत्र शुक्ल त्रयोदशी</em> उस सावन तिथि पर पड़ रही है। त्यौहार
        स्थिर कैलेंडर तिथियों से नहीं जुड़े &mdash; वे चन्द्र-निर्देशांकों
        से जुड़े हैं, जो प्रत्येक वर्ष सूर्य और चन्द्र के उसी संयोजन पर
        लौटते हैं।
      </p>

      <h2>तिथियाँ घड़ी के समय में बराबर क्यों नहीं हैं</h2>

      <p>
        यहाँ बारीकी आती है। तिथि सूर्य और चन्द्रमा के बीच 12° के कोणीय अंतर
        से परिभाषित है &mdash; न कि किसी निश्चित समय से। चन्द्रमा आकाश में
        एकसमान गति से नहीं चलता। कभी कुछ तेज़, कभी कुछ धीमा। अतः कोई एक तिथि
        लगभग <strong>20 घंटे</strong> में पूरी हो सकती है, और अगली{" "}
        <strong>26 घंटे</strong> में।
      </p>

      <p>
        चन्द्रमा की प्रत्यक्ष गति बदलती क्यों है? दो कारण &mdash; जिन्हें
        केप्लर ने 1609 में स्पष्ट रूप से कहा, परन्तु जिनकी गुणात्मक समझ
        भारतीय खगोलशास्त्रियों को कई शताब्दियाँ पहले <em>मन्द</em> और{" "}
        <em>शीघ्र</em> संस्कारों के रूप में पहले से थी।
      </p>

      <ol>
        <li>
          <strong>चन्द्रमा की कक्षा वृत्त नहीं, दीर्घवृत्त है।</strong> जब
          वह पृथ्वी के समीप होता है (उपभू, या चन्द्र-कक्षा के{" "}
          <em>अप्सिस</em> के पास), तब आकाश में तेज़ चलता है; दूर होने पर
          (अपोभू पर) धीमा। केवल इस प्रभाव से ही औसत गति में लगभग ±13% का
          झूलाव आ जाता है।
        </li>
        <li>
          <strong>सूर्य का देशांतर भी बदल रहा है</strong> (क्योंकि पृथ्वी
          सूर्य की परिक्रमा कर रही है)। पृथ्वी की कक्षा पर लगाये गये केप्लर
          के द्वितीय नियम के कारण सूर्य की प्रत्यक्ष गति भी कुछ अनियमित है,
          परन्तु यह बहुत छोटा प्रभाव है &mdash; पूरे वर्ष में लगभग 1° का
          झूलाव।
        </li>
      </ol>

      <p>
        औसत रूप से एक तिथि लगभग <strong>23 घंटे 37 मिनट</strong> की होती है
        &mdash; एक साधारण सावन दिवस से किंचित् कम (सावन मास 29.53 दिन ÷ 30
        तिथियाँ = 23.62 घंटे)। इसी कारण तिथि किसी भी दिन या रात के समय आरम्भ
        और समाप्त हो सकती है। एक 24-घंटे के दिन में दो तिथियाँ हो सकती हैं,
        अथवा एक तिथि दो दिनों तक खिंच सकती है।
      </p>

      <p>
        और इससे प्रश्न उठता है &mdash; <strong>यदि तिथि दिन के बीच में
        बदल जाये, तो वह दिन किस तिथि का माना जायेगा?</strong>
      </p>

      <h2>विभिन्न परम्पराओं के उत्तर</h2>

      <p>
        यह वही केन्द्रीय प्रश्न है जो पंचांग-परम्पराओं को विभाजित करता है,
        और जिसे समझ लेने पर आप दो भिन्न पंचांगों को मिलाकर देखने पर उनकी
        असहमतियों का तार्किक मूल्यांकन कर सकते हैं।
      </p>

      <p>
        मूल पहेली &mdash; मान लीजिए किसी मास की 15वीं तिथि का प्रातः है।
        सूर्योदय 6:30 बजे है। 6:30 पर तिथि 5 (पंचमी) चल रही है, परन्तु वह
        8:00 बजे समाप्त होती है, उसके बाद तिथि 6 (षष्ठी) आ जाती है और कल
        प्रातः तक चलती है। <strong>आज पंचमी है या षष्ठी?</strong>
      </p>

      <p>
        भिन्न-भिन्न परम्पराएँ भिन्न उत्तर देती हैं, और हर उत्तर का अपना तर्क
        है।
      </p>

      <ul>
        <li>
          <strong>सूर्योदय-नियम (सामान्य स्मार्त परम्परा)।</strong> सूर्योदय
          के क्षण जो भी तिथि चल रही हो, वही उस दिन की तिथि है &mdash; चाहे
          कितनी ही अल्प अवधि के लिए। इस नियम से आज पंचमी होगी, यद्यपि
          सूर्योदय के 90 मिनट बाद ही पंचमी समाप्त हो जाती है।
        </li>
        <li>
          <strong>दिन-बहुमत नियम (कुछ वैष्णव परम्पराओं में उपवास के लिए)।</strong>{" "}
          सूर्योदय और सूर्यास्त के बीच के काल में जो तिथि अधिक समय रहे, वही
          उस दिन की तिथि है।
        </li>
        <li>
          <strong>सूर्यास्त-नियम (कुछ दक्षिणी क्षेत्रीय पंचांगों में विशेष
          अनुष्ठानों के लिए)।</strong> सूर्यास्त के क्षण जो तिथि चल रही हो।
        </li>
        <li>
          <strong>छह-घटी नियम (जैन उदय तिथि, जिसका इस पंचांग में पालन है)।</strong>{" "}
          तिथि को सूर्योदय के बाद की प्रथम छह घटियों (~ 2 घ. 24 मि.) में चलते
          रहना चाहिए, तभी वह उदय तिथि होगी। यदि वह उससे पहले समाप्त हो जाये,
          तो अगली तिथि उस दिन को धारण करती है।
        </li>
      </ul>

      <p>
        इनमें से कोई भी &ldquo;अशुद्ध&rdquo; नहीं है। ये एक ही खगोलीय तथ्य
        (सूर्योदय के पास तिथि-परिवर्तन) से निपटने की भिन्न परिपाटियाँ हैं।
        जैन छह-घटी नियम के पीछे का तर्क हम आगे देख रहे हैं।
      </p>

      <h2>जैन नियम &mdash; उदय तिथि और छह घटियाँ</h2>

      <p>
        जैन परम्परा कहती है &mdash; <strong>सूर्योदय के बाद प्रथम 6 घटियों
        (लगभग 2 घंटे 24 मिनट) में जो तिथि सक्रिय हो, वही पूरे दिन की तिथि
        है।</strong> इसे <em>उदय तिथि</em> कहते हैं &mdash; &ldquo;उदय
        होती हुई तिथि&rdquo; &mdash; क्योंकि यह वही तिथि है जो दिन के उदय के
        समय प्रबल हो।
      </p>

      <p>
        ठीक छह घटियाँ ही क्यों? एक घटी 24 मिनट की होती है; छह घटियाँ
        अर्थात् 144 मिनट, या 2 घंटे 24 मिनट। शास्त्रीय जैन योजना में यह
        सूर्योदय के बाद के प्रथम <em>मुहूर्त</em> और प्रातःकालीन सन्ध्या-काल
        को मिलाकर बनती है &mdash; पारम्परिक रूप से दिन का सबसे
        अनुष्ठान-महत्त्वपूर्ण समय, जो नवकार मंत्र और प्रातः की क्रियाओं का
        समय है। तिथि-निर्णय को इसी अवधि से जोड़ने का अर्थ था कि कैलेंडर और
        अनुष्ठान-जीवन में सामंजस्य रहे &mdash; प्रातःकालीन क्रियाओं के समय जो
        तिथि चल रही हो, वही उस दिन की तिथि मानी जायेगी। यह नियम स्वच्छ है,
        निश्चित है, और पूर्णतः गणनीय है &mdash; ये गुण किसी पूरे समुदाय के
        लिए अनेक स्थानों और कालों में कैलेंडर चलाने में महत्त्वपूर्ण हैं।
      </p>

      <FigurePlaceholder
        number="2.3"
        caption="Jain udaya tithi: the tithi prevailing in the first 6 ghatis after sunrise governs the entire day."
        captionHi="जैन उदय तिथि नियम: सूर्योदय के बाद पहली 6 घटी में जो तिथि हो, वही पूरे दिन की उदय तिथि होती है।"
        promptHint="See Batch 1 image #5 for the Gemini prompt."
      />

      <h3>उदाहरण क &mdash; तिथि अवधि-भर चलती है</h3>

      <p>
        मान लीजिए तिथि 5 (पंचमी) कल रात्रि 10:00 बजे आरम्भ हुई और आज प्रातः
        10:00 बजे समाप्त होगी। आज सूर्योदय 6:30 बजे है। प्रथम छह घटियाँ
        6:30 से 8:54 तक चलती हैं। क्या पंचमी इस पूरे अंतराल में सक्रिय है?
      </p>

      <p>
        हाँ &mdash; पंचमी 6:30 से 10:00 तक चल रही है, जो 8:54 से बहुत आगे
        है। अतः पंचमी ही उदय तिथि है। आज, मध्यरात्रि से मध्यरात्रि तक, जैन
        पंचांग में पंचमी के रूप में अंकित है। यद्यपि पंचमी 10:00 पर समाप्त
        हो जाती है और शेष दिन तकनीकी रूप से षष्ठी का है, परन्तु इससे लेबल
        नहीं बदलता। दिन पंचमी का है।
      </p>

      <h3>उदाहरण ख &mdash; तिथि अवधि के भीतर समाप्त हो जाती है</h3>

      <p>
        मान लीजिए तिथि 5 कल प्रातः 4:00 बजे आरम्भ हुई और आज 7:00 बजे समाप्त
        होगी। सूर्योदय फिर 6:30 बजे। प्रथम छह घटियाँ 6:30 से 8:54 तक। क्या
        पंचमी पूरे अंतराल में चल रही है?
      </p>

      <p>
        नहीं &mdash; पंचमी 6:30 से 7:00 तक है (केवल 30 मिनट), और फिर 7:00
        से 8:54 तथा आगे षष्ठी ले लेती है। पंचमी ने पूरी अवधि नहीं रोकी।
        अतः आज की उदय तिथि है <strong>षष्ठी</strong>। आज मध्यरात्रि से
        मध्यरात्रि तक षष्ठी, यद्यपि दिन तकनीकी रूप से पंचमी से &ldquo;शुरू
        हुआ&rdquo; था।
      </p>

      <h3>उदाहरण ग &mdash; सीमा-स्थिति</h3>

      <p>
        और यदि पंचमी ठीक 8:54 पर, सीमा पर समाप्त हो? भिन्न आचार्यों ने
        सीमा-स्थिति पर थोड़े अलग निर्णय दिये हैं। रूढ़िपरक जैन व्याख्या
        &mdash; और इस पंचांग की व्याख्या &mdash; यह है कि तिथि छह-घटी अवधि
        में <em>पूर्ण रूप से</em> उपस्थित होनी चाहिए, सख्ती से। यदि परिवर्तन
        ठीक सीमा पर या उससे पहले हो, तो अगली तिथि जीतती है। इसका तात्पर्य
        यह है कि तिथि को <em>सातवीं घटी के आरम्भ पर</em> सक्रिय होना चाहिए,
        तभी वह उदय तिथि होगी।
      </p>

      <KeyIdea
        title="6-घटी का नियम कैलेंडर की एक वास्तविक उलझन को सुलझाता है"
        titleHi="The 6-ghati rule resolves a real ambiguity in the calendar."
      >
        अन्य परम्पराओं के अपने नियम हैं &mdash; कुछ सूर्योदय के क्षण की
        तिथि लेती हैं चाहे वह कितनी ही अल्प हो; कुछ दिन-बहुमत लेती हैं।
        कोई भी &ldquo;अशुद्ध&rdquo; नहीं &mdash; ये एक ही खगोलीय वास्तविकता
        की भिन्न परिपाटियाँ हैं। जैन का चयन छह-घटी नियम है, और यह पंचांग
        उसी का अनुसरण करता है।
      </KeyIdea>

      <h2>तिथि वृद्धि और तिथि क्षय</h2>

      <p>दो और शब्द जिनसे आपको कभी-न-कभी सामना होगा।</p>

      <p>
        चूँकि तिथियाँ असमान लंबाई की होती हैं, कभी-कभी एक तिथि इतनी लंबी हो
        जाती है कि वह दो लगातार सूर्योदयों तक खिंच जाती है। ऐसे में दो
        लगातार दिन एक ही तिथि से अंकित होते हैं। इसे <strong>तिथि वृद्धि</strong>{" "}
        कहते हैं &mdash; &ldquo;तिथि का बढ़ना।&rdquo; एक तिथि जो दो दिनों
        तक देखी जाती है।
      </p>

      <p>
        उल्टा भी होता है। कभी-कभी तिथि इतनी छोटी, और इतनी प्रतिकूल स्थिति
        में होती है, कि वह दो सूर्योदयों के बीच पूरी तरह आरम्भ और समाप्त हो
        जाती है &mdash; अर्थात् वह कभी अपने दिन पर &ldquo;उदित&rdquo; नहीं
        होती। कैलेंडर उसे छोड़ देता है। इसे <strong>तिथि क्षय</strong>{" "}
        कहते हैं &mdash; &ldquo;तिथि का लोप।&rdquo;
      </p>

      <p>
        औसत रूप से ये दोनों एक-दूसरे को संतुलित कर देते हैं और एक चन्द्र-मास
        में 30 तिथियाँ लगभग 29–30 सावन दिनों में फैल जाती हैं। परन्तु यही
        कारण है कि भिन्न परम्पराओं के दो लोग कभी-कभी किसी त्योहार पर एक दिन
        के अंतर से असहमत हो जाते हैं &mdash; और अब आप जानते हैं क्यों। जब
        महाशिवरात्रि (फाल्गुन कृष्ण चतुर्दशी) जैसी तिथि वृद्धि-वाली हो (दो
        दिन तक चले), अथवा वृद्धि के समीप हो, तब &ldquo;कौन से दिन इसे
        मनाया जाये&rdquo; के विभिन्न नियम भिन्न तिथियाँ देते हैं। मतभेद
        वास्तविक है; खगोल विज्ञान में कोई संदिग्धता नहीं।
      </p>

      <h2>मध्यम तिथि और स्पष्ट तिथि</h2>

      <p>
        एक अंतिम तकनीकी बिन्दु जो आपको पुराने ग्रंथों में मिल सकता है। शास्त्रीय
        भारतीय खगोल विज्ञान <em>मध्यम तिथि</em> &mdash; जो सूर्य और चन्द्र को
        एकसमान औसत गति का मानकर निकाली जाती है &mdash; और <em>स्पष्ट तिथि</em>{" "}
        &mdash; जो उनकी वास्तविक अनियमित गति से निकाली जाती है &mdash; में
        भेद करता है। सिद्धान्त-ग्रंथों में मध्यम से स्पष्ट निकालने के लिए
        विस्तृत संस्कार दिये हैं। आधुनिक पंचांग सदा स्पष्ट तिथि प्रयोग करते
        हैं, जो वर्तमान खगोलीय इफेमेरिस से निकाली जाती है। हम इसका उल्लेख
        केवल इसलिए कर रहे हैं ताकि यदि आप किसी उन्नीसवीं शताब्दी की पंचांग-
        पंचांगिका में यह शब्द देखें, तो लेखक का तात्पर्य आपको ज्ञात हो।
      </p>

      <h2>अब आप क्या कर सकते हैं</h2>

      <p>इस अध्याय के बाद आप यह सब करने में सक्षम होने चाहिए —</p>

      <ul>
        <li>12° का नियम एक वाक्य में बता सकें।</li>
        <li>
          सूर्य और चन्द्रमा के देशांतर दिये जाने पर बता सकें कि कौन-सी तिथि
          चल रही है।
        </li>
        <li>दोनों पक्षों के नाम और चन्द्रमा की स्थिति बता सकें।</li>
        <li>
          तिथि की लंबाई 20–26 घंटे क्यों झूलती है, और इसका चन्द्रमा की
          दीर्घवृत्तीय कक्षा से क्या सम्बन्ध है &mdash; समझा सकें।
        </li>
        <li>
          चार प्रमुख नियम बता सकें जिनसे विभिन्न परम्पराएँ तिथि को सावन दिन
          से जोड़ती हैं।
        </li>
        <li>
          जैन उदय-तिथि छह-घटी नियम बता सकें, और एक उदाहरण-दिन पर लागू कर
          सकें।
        </li>
        <li>
          तिथि वृद्धि और तिथि क्षय परिभाषित कर सकें, और बता सकें कि वे
          अंतर-परम्परा त्योहार-तिथि असहमति का कारण क्यों बनती हैं।
        </li>
      </ul>

      <p>
        इसी साइट का दैनिक पंचांग खोलिए। ऊपर आज की तिथि देखिए, और वह समय भी
        जिस पर आज की तिथि समाप्त होती है। ध्यान दीजिए &mdash; तिथि पूरे
        दिन के लिए नामित है, यद्यपि वह प्रातः ही समाप्त हो जाये। यही उदय-
        नियम का प्रत्यक्ष रूप है। अब कुछ मास आगे की किसी तिथि पर जाइए, ऐसा
        दिन ढूँढिए जिसकी तिथि-समाप्ति देर शाम हो, और देखिए कि उस दिन कौन-सी
        तिथि है। नियम का प्रयोग करके भविष्यवाणी कीजिए कि अगले दिन कौन-सी
        तिथि होगी। फिर सत्यापित कीजिए।
      </p>

      <p>
        अगले अध्याय में हम पाँच अंगों में सबसे सरल लेने जा रहे हैं &mdash;{" "}
        <strong>वार</strong>, सप्ताह का दिन। और देखेंगे कि सोमवार-मंगलवार-
        बुधवार में भी एक ऐसी गहरी संरचना है जिसे हम सामान्यतः नहीं देखते।
        सप्ताह के दिनों का क्रम मनमाना नहीं है &mdash; वह एक विशिष्ट खगोलीय
        प्रश्न का उत्तर है, और यह सात-गुना चक्र किसी भी आधुनिक कैलेंडर से
        प्राचीन है जो आज इसका प्रयोग करता है।
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ChapterShell chapter={chapter} en={<EnglishContent />} hi={<HindiContent />} />
  );
}

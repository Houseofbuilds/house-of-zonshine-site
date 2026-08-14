# House of Zonshine website and email compliance record

Last reviewed: August 14, 2026

This is an operational compliance record, not legal advice or a substitute for review by Compass compliance or a California attorney. It documents the website's current behavior and the recurring checks needed to keep its public statements accurate.

## Current website data map

- The contact form collects first name, last name, email address, optional real estate interest, and an optional message. Netlify processes the submission. The contact form does not subscribe a visitor to the newsletter.
- The newsletter form collects full name, email address, an express-consent checkbox, the consent-notice version, the privacy-notice version, and the collection source. Netlify supplies the server-side submission record and timestamp. Compass systems manage the subscriber record and send the newsletter.
- The site currently has no Google Analytics, Meta Pixel, session-replay tool, advertising pixel, or cross-site behavioral advertising script.
- Google Fonts loads on public pages. Embedded Google Maps loads on neighborhood-guide pages. Both can receive ordinary technical request data such as an IP address.
- The site does not collect payment-card information, account passwords, government identifiers, precise geolocation, or other sensitive information through its forms.

Any change to this map requires a privacy-policy and point-of-collection review before deployment.

## Controls implemented on the site

- Dedicated `/privacy/` and `/legal/` pages, linked from the footer of every substantive public page and from both collection forms.
- A just-in-time privacy notice on each collection form explaining the categories collected, purposes, and recipient categories.
- Express, unbundled newsletter consent with a versioned consent record. The contact form remains separate and cannot silently create a newsletter subscription.
- Accurate license identification in the footer: Julia Zonshine, DRE #02246696; Compass as responsible broker, DRE #01991628; Equal Housing Opportunity.
- Expanded California fair-housing statement and a neutral-information/anti-steering explanation for neighborhood and school content.
- Terms covering no agency relationship, no professional-advice substitution, property-data verification, third-party listings, testimonials, accessibility, and the 2026 California rule for materially altered property images.
- Security headers for framing, MIME sniffing, referrer minimization, and disabled camera/microphone/geolocation browser permissions.

## Recurring owner checklist

### Before sending any newsletter or marketing email

1. Send only to people with a recorded direct consent or another documented lawful basis. Never use scraped, purchased, harvested, or guessed addresses.
2. Use accurate From/Reply-To information and a subject line that truthfully describes the message.
3. Identify Julia Zonshine and House of Zonshine; include Julia's DRE #02246696 and Compass as the responsible broker.
4. Include a valid physical postal address. A registered USPS PO box or properly registered commercial private mailbox may be used.
5. Include a clear one-step unsubscribe mechanism in every commercial email. Keep it working for at least 30 days after the send and honor requests within 10 business days; operationally, suppress immediately.
6. Keep a suppression list. Never re-import or send marketing to an unsubscribed address unless that person later gives a new, documented consent.
7. Keep the consent source, exact notice version, submission timestamp, email address, and unsubscribe history. Limit access and use multi-factor authentication on the sending platform.
8. If another company prepares or sends the email, review its work. Legal responsibility cannot be delegated away.

### Before publishing a listing, featured home, social post, ad, or new guide

1. Confirm the copy and objective claims are current, supportable, and not misleading.
2. Show Julia Zonshine's name, DRE #02246696, and Compass's identity as responsible broker on first-point-of-contact advertising. Confirm Compass's current brand/compliance rules as well.
3. Confirm House of Zonshine and the RSR Real Estate identity/logo are approved for Julia's use under Compass supervision. Do not imply that House of Zonshine is an independent brokerage.
4. Confirm permission or an applicable license for every listing photograph, description, testimonial, logo, and third-party data item. Preserve attribution required by the source, listing broker, MLS, or license.
5. If a property image has been materially changed by adding, removing, or changing a property element, place a reasonably conspicuous alteration disclosure on or adjacent to that exact image. Include the original image in the same controlled website posting or link directly to a publicly accessible page that clearly identifies it. Keep both versions and the source record. Ordinary crop, exposure, white-balance, sharpening, straightening, and similar adjustments that do not change the property's representation are excluded by the statute.
6. Keep housing and neighborhood language neutral. Do not express preferences about protected groups, use protected-class proxies, or target/exclude audiences based on protected characteristics. Present school/crime/neighborhood data from identified sources and let the consumer choose their own criteria.
7. If a testimonial was compensated, incentivized, materially edited, or given by someone with a relationship that a reader would not expect, disclose that fact clearly beside the testimonial. Keep written permission and the unedited source.
8. Recheck property status, price, measurements, source, and listing-broker attribution. Keep sold stories but mark the status consistently wherever they appear.

### Before adding analytics, advertising pixels, embeds, chat, scheduling, or a new form

1. Identify every data category, purpose, recipient, cookie/local-storage item, retention period, and contract before launch.
2. Update `/privacy/` and the notice at the collection point before or when collection begins.
3. Determine whether the tool causes a sale or sharing of personal information, cross-context behavioral advertising, session recording, or collection of sensitive information. Add legally required opt-outs or consent controls before activation.
4. Reassess whether a cookie banner is necessary. The current California-only analysis does not require one for the site's present no-advertising/no-behavioral-tracking configuration, but that conclusion changes if nonessential tracking is added or users in consent-based jurisdictions are intentionally targeted.
5. Sign appropriate data-protection/service-provider terms and restrict each vendor to the documented purpose.

### Privacy and security operations

1. Enable multi-factor authentication for Netlify, the email platform, Google/Workspace, GitHub, and Compass systems.
2. Restrict form-submission access to people who need it. Do not forward submissions into shared personal inboxes or spreadsheets without access controls.
3. Delete or archive stale leads and messages under a written retention schedule. Preserve transaction and brokerage records for the period required by Compass and applicable law.
4. Maintain unsubscribe/suppression records even when other subscriber data is deleted.
5. Review privacy requests promptly, verify identity proportionately, document the response, and do not disclose one person's information to another.
6. Maintain an incident-response contact and follow California breach-notification requirements if protected personal information is compromised.
7. Review this file, the public policies, vendor list, and every live form at least annually and whenever the stack or business practice changes.

## Threshold and scope notes

- California's Online Privacy Protection Act applies to a commercial website that collects personally identifiable information from California consumers. Its privacy policy must identify categories collected and shared, describe any review/change process, explain material-change notice, show an effective date, and address Do Not Track/cross-site collection.
- The CCPA/CPRA generally applies to a for-profit business doing business in California that meets at least one threshold: gross annual revenue of at least $26.625 million (effective January 1, 2025), buying/selling/sharing personal information of 100,000 or more California consumers or households annually, or deriving at least 50% of annual revenue from selling/sharing California personal information. Recheck the threshold and any common-control/common-branding analysis annually with Compass compliance.
- Even when the CCPA does not apply, California separately requires reasonable security for specified personal information and prohibits materially misleading privacy-policy statements.
- California's commercial-email law bars unsolicited commercial email to or from California and prohibits deceptive domains, headers, and subject lines. Federal CAN-SPAM requirements also apply to commercial email, including to subscribers.

## Primary sources used

- [California Business and Professions Code §§ 22575–22579 (CalOPPA)](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=&chapter=22.&division=8.&lawCode=BPC&part=&title=)
- [California Privacy Protection Agency — CCPA applicability FAQ](https://cppa.ca.gov/faq)
- [California Privacy Protection Agency — adjusted CCPA monetary thresholds](https://cppa.ca.gov/regulations/cpi_adjustment.html)
- [California Civil Code § 1798.81.5 — reasonable security](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1798.81.5)
- [California Business and Professions Code §§ 17529–17529.9 — commercial email](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=1.8&chapter=1.&division=7.&lawCode=BPC&part=3.&title=)
- [FTC — CAN-SPAM compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
- [California Business and Professions Code § 10140.6 — license disclosure](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10140.6.)
- [California DRE — Real Estate Advertising Guidelines](https://www.dre.ca.gov/files/pdf/re27.pdf)
- [California Business and Professions Code § 10140.8 — digitally altered property images](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=1.&chapter=3.&division=4.&lawCode=BPC&part=1.&title=)
- [California Civil Rights Department — housing protected characteristics](https://calcivilrights.ca.gov/Housing/)
- [HUD — Fair Housing Act and digital advertising guidance](https://www.hud.gov/sites/dfiles/FHEO/documents/FHEO_Guidance_on_Advertising_through_Digital_Platforms.pdf)

## Confirmed operating facts

- Compass systems manage and send the House of Zonshine newsletter, including the email-template compliance controls.

## Items requiring human confirmation

- Before the first send and after any Compass template change, confirm that the delivered email visibly includes Compass's valid physical postal address and a functioning unsubscribe mechanism; preserve a test copy for the compliance record.
- Compass approval and exact classification of the House of Zonshine and RSR Real Estate names/logos.
- Current rights/permissions for each third-party listing photo, listing description, and testimonial.
- Whether any live or planned property image is materially altered within Business and Professions Code § 10140.8.
- Whether House of Zonshine, Compass, an affiliated team, or a commonly controlled entity meets a CCPA threshold or shares personal information under common branding.
- Final review of the public Privacy Policy and Terms by Compass compliance and California counsel.

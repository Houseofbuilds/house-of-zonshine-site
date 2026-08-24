# Legal and standards context — research summary

**Not legal advice.** This engineering summary explains why accessibility work is prudent and what standard was used. Qualified California/ADA counsel should assess House of Zonshine’s facts, contracts, insurance, and public statement.

## Federal ADA context

The U.S. Department of Justice states that Title III prohibits disability discrimination by businesses open to the public and has consistently interpreted the ADA to cover goods, services, privileges, and activities offered on the web. DOJ’s private-business guidance does not prescribe one detailed web technical standard; it points to technical standards such as WCAG as helpful guidance and emphasizes effective access. Source: https://www.ada.gov/resources/web-guidance/

The 2024 Title II web rule is not the governing rule for this private real-estate business. It applies to state and local governments and adopts WCAG 2.1 AA for that public-entity scope. As of August 2026, DOJ’s fact sheet reports extended compliance dates beginning in 2027. Source: https://www.ada.gov/resources/2024-03-08-web-rule/

In *Robles v. Domino’s Pizza*, the Ninth Circuit held that the ADA applied where the website/app connected users to goods and services of physical public accommodations; it treated that nexus as critical. House of Zonshine operates in the Ninth Circuit, and its website invites users to obtain real-estate services and contact the business, so counsel should analyze that relationship rather than assuming the website is outside Title III. Source: https://cdn.ca9.uscourts.gov/datastore/opinions/2019/01/15/17-55504.pdf

## California context

California Civil Code §51 (Unruh Civil Rights Act) gives people with disabilities full and equal services in business establishments and provides that an ADA-right violation also violates §51. Section 52 provides remedies that can include actual damages, a statutory floor of $4,000 for each offense covered by its text, and attorney’s fees. Application to a particular website claim is fact-specific; counsel should assess exposure and response strategy. Official sources:

- https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=51.
- https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=52.

## Engineering target and evaluation rule

This project uses WCAG 2.2 Level AA as a voluntary technical acceptance target because it includes the WCAG 2.0/2.1 criteria plus newer requirements such as focus not obscured and minimum target size. WCAG conformance applies to complete pages and processes, not selected components. W3C says evaluation requires automated and manual review and supplies WCAG-EM/reporting guidance:

- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/test-evaluate/conformance/
- https://www.w3.org/WAI/test-evaluate/report-template/

No “fully ADA compliant,” “certified,” or “lawsuit-proof” claim is supported by this repository work. Independent audit/retest and legal review remain required.

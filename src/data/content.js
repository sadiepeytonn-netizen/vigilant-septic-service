// Stages for the scroll-driven "How a septic system works" cutaway.
// focus = where the camera centres (percent of image), zoom = scale.
export const septicStages = [
  {
    n: 1,
    title: 'Main sewer line',
    text: 'Everything that goes down a drain in your home leaves through one main line. It needs steady downhill fall so waste keeps moving toward the tank.',
    tip: 'Gurgling drains or slow toilets often start here.',
    focus: { x: 26, y: 36 }, zoom: 1.9,
  },
  {
    n: 2,
    title: 'Septic tank',
    text: 'The tank holds wastewater long enough for solids to sink and grease to float. Baffles keep that layer of sludge and scum inside the tank where it belongs.',
    tip: 'Cracked tanks and missing baffles send solids downstream.',
    focus: { x: 40, y: 52 }, zoom: 2.1,
  },
  {
    n: 3,
    title: 'Outlet & distribution box',
    text: 'Clarified liquid called effluent leaves the tank and reaches a distribution box, which splits the flow evenly between the drain field lines.',
    tip: 'A tipped or clogged box overloads one trench while others sit dry.',
    focus: { x: 58, y: 52 }, zoom: 2.0,
  },
  {
    n: 4,
    title: 'Drain field trenches',
    text: 'Perforated pipe laid in gravel-filled trenches lets effluent trickle out over a wide area so it can soak into the ground.',
    tip: 'Soggy ground or stripes of bright green grass are warning signs.',
    focus: { x: 74, y: 58 }, zoom: 1.75,
  },
  {
    n: 5,
    title: 'Soil does the treatment',
    text: 'As effluent filters down through native soil, bacteria and the soil itself remove harmful organisms and nutrients before the water reaches groundwater.',
    tip: 'That is why soil type and setbacks matter so much in the Ozarks.',
    focus: { x: 50, y: 60 }, zoom: 1.0,
  },
]

export const generalFaqs = [
  ['Does Vigilant Septic Service pump septic tanks?', 'No. Vigilant focuses on septic installation, repair, inspections, drain fields, aerobic systems, pumps and maintenance rather than tank pumping.'],
  ['What areas does Vigilant Septic Service cover?', 'We serve Southwest and west-central Missouri, including Hickory, Polk, Dallas, Benton, Camden, St. Clair, Cedar, Greene, Webster, Laclede and Dade counties. Towns include Hermitage, Bolivar, Buffalo, Warsaw, Osceola, Stockton, Camdenton, Lebanon, Marshfield, Fair Grove and north Springfield.'],
  ['Who owns Vigilant Septic Service?', 'Vigilant Septic Service is a local, family-owned business run by Steve, who works on every job himself and is known by customers for explaining the system and pricing up front.'],
  ['Do you offer a military discount?', 'Yes. We proudly offer a discount for active duty, veterans and retired military. Mention your service when you call or check the box on our contact form.'],
  ['What are your hours?', 'Monday through Saturday, 7 AM to 8 PM. Call or text (417) 401-0949.'],
  ['Do you help with septic permits?', 'Yes. We help homeowners navigate county health department and Missouri DHSS requirements for new systems, replacements and real estate inspections.'],
  ['How much does septic repair cost?', 'It depends on what is wrong. A failed float or alarm is a small fix; a drain field replacement is a major project. We diagnose first and give you the price before any work starts.'],
  ['What are the warning signs of a failing septic system?', 'Slow drains, gurgling pipes, sewage odors, alarms, standing water or bright green stripes of grass over the drain field, and backups after heavy rain or laundry.'],
]

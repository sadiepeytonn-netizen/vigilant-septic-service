// Single source of truth for business facts. Update here and every page, schema
// block, sitemap and llms.txt picks it up on the next build.
export const SITE_URL = 'https://www.vigilantsepticservice.com'

export const business = {
  name: 'Vigilant Septic Service',
  legalName: 'Vigilant Septic Service',
  owner: 'Steve',
  tagline: 'Septic care done right.',
  slogan: 'Straight talk. Solid work.',
  phone: '(417) 401-0949',
  phoneHref: 'tel:+14174010949',
  smsHref: 'sms:+14174010949',
  email: 'vigilantseptic@gmail.com',
  // Form submissions are delivered here (via FormSubmit). First submission
  // triggers a one-time activation email to this inbox.
  formEmail: 'vigilantseptic@gmail.com',
  hoursText: 'Mon–Sat · 7 AM – 8 PM',
  hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '20:00' }],
  region: 'Southwest Missouri',
  geo: { lat: 37.9379505, lng: -93.3135789 },
  googleRating: 5.0,
  googleReviewCount: 28,
  googlePlaceId: 'ChIJudl7sX5JZEAR3UHyMwWmENs',
  googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJudl7sX5JZEAR3UHyMwWmENs',
  googleCidUrl: 'https://maps.google.com/?cid=15785299235210150365',
  googleReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJudl7sX5JZEAR3UHyMwWmENs',
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJudl7sX5JZEAR3UHyMwWmENs',
  affiliations: ['Missouri Smallflows Organization (MSO)'],
}

export const counties = [
  { name: 'Hickory County', towns: ['Hermitage', 'Wheatland', 'Pittsburg', 'Weaubleau', 'Cross Timbers'] },
  { name: 'Polk County', towns: ['Bolivar', 'Humansville', 'Pleasant Hope', 'Fair Play', 'Dunnegan', 'Morrisville'] },
  { name: 'Dallas County', towns: ['Buffalo', 'Urbana', 'Louisburg', 'Long Lane'] },
  { name: 'Benton County', towns: ['Warsaw', 'Lincoln', 'Cole Camp', 'Edwards'] },
  { name: 'Camden County', towns: ['Camdenton', 'Climax Springs', 'Macks Creek', 'Osage Beach', 'Lake Ozark'] },
  { name: 'St. Clair County', towns: ['Osceola', 'Lowry City', 'Collins'] },
  { name: 'Cedar County', towns: ['Stockton', 'El Dorado Springs', 'Jerico Springs'] },
  { name: 'Greene County', towns: ['Fair Grove', 'Willard', 'Ash Grove', 'Walnut Grove', 'north Springfield'] },
  { name: 'Webster County', towns: ['Marshfield', 'Elkland', 'Niangua'] },
  { name: 'Laclede County', towns: ['Lebanon', 'Eldridge', 'Phillipsburg', 'Conway'] },
  { name: 'Dade County', towns: ['Dadeville', 'Greenfield'] },
]

export const allTowns = counties.flatMap(c => c.towns)

import type { BlogData } from "hooks/types";

interface LocationInfo {
  center: { lat: number; lng: number };
  zoom: number;
}
export const locationData: Record<string, LocationInfo> = {
  Anywhere: {
    center: { lat: 0, lng: 0 },
    zoom: 2, // Zoom level for a global view
  },
  NorthAmerica: {
    center: { lat: 54.526, lng: -105.2551 }, // Center of North America
    zoom: 3, // Zoom level for the continent
  },
  Alaska: {
    center: { lat: 64.2008, lng: -149.4937 }, // General center of Alaska
    zoom: 5, // Zoom level for Alaska state
  },
  Anchorage: {
    center: { lat: 61.2181, lng: -149.9003 },
    zoom: 12,
  },
};

export const blogData: BlogData = [
  {
    city: "Anchorage",
    title: "Things to Do in Anchorage | Tours, Trails & More | ALASKA.ORG",
    url: "https://www.alaska.org/destination/anchorage/things-to-do",
    image:
      "https://uploads.alaska.org/advice/Thumbnails-Inlines/advice-Inlines/10-perfect-days-from-anchorage/2011-07-23-Matanuska-Lodge-_MG_63942019.jpg",
    category: ["destinations"],
    keywords: ["culture", "history"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
      { lat: 61.1919, lng: -149.8526 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "What to Do in Anchorage, Alaska — Handpicked Alaska",
    url: "https://handpickedalaska.com/blog/what-to-do-in-anchorage-alaska",
    category: ["destinations"],
    keywords: ["mountains", "lakes"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
      { lat: 61.1686, lng: -149.8827 }, // Near Potter Marsh
    ],
  },
  {
    city: "Anchorage",
    title: "20 Best Things to do in Anchorage | Visit Anchorage",
    url: "https://www.anchorage.net/blog/post/20-best-things-to-do-in-anchorage/",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_400,q_75,w_1366/v1/clients/anchorage/Glacier_Celebration_Ashley_Heimbigner_7ce04d70_6c58_48b6_83ee_f1d982544c79_9834b744-fdbe-4f31-9460-d287f1ebbb87.jpg",
    category: ["destinations"],
    keywords: ["food", "events"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
      { lat: 61.2151, lng: -149.8869 }, // Near Earthquake Park
    ],
  },
  {
    city: "Anchorage",
    title: "15 Best Things To Do In Anchorage [Alaska] in 2024",
    url: "https://www.dreambigtravelfarblog.com/blog/things-to-do-in-anchorage-alaska",
    image:
      "https://cdn.prod.website-files.com/576fd5a8f192527e50a4b95c/63e6e2a4db85c252436be41f_things%20to%20do%20in%20anchorage%20alaska.webp",
    category: ["hiking"],
    keywords: ["mountains", "nature"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
      { lat: 61.2074, lng: -149.8872 }, // Near Tony Knowles Coastal Trail
    ],
  },
  {
    city: "Anchorage",
    title: "75+ Unique Things to do in Anchorage Recommended by a Local",
    url: "https://curiositysavestravel.com/best-things-to-do-in-anchorage-alaska-local-recommendations/",
    image:
      "https://curiositysavestravel.com/wp-content/webp-express/webp-images/uploads/2020/02/70-things-to-do-in-anchorage-alaska.png.webp",
    category: ["place"],
    keywords: ["culture", "art"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
      { lat: 61.2091, lng: -149.8845 }, // Near Westchester Lagoon
    ],
  },
  {
    city: "Anchorage",
    title: "17 Unique Things to Do in Anchorage - Westmark Hotels",
    url: "https://www.westmarkhotels.com/blog/about-alaska/things-to-do-in-anchorage/",
    category: ["hotels"],
    keywords: ["food", "lakes"],
    markers: [
      { lat: 61.1686, lng: -149.8827 }, // Near Potter Marsh
      { lat: 61.2109, lng: -149.8785 }, // Near Delaney Park
    ],
  },
  {
    city: "Anchorage",
    title: "The 28 Best Things to Do in Anchorage (According to a Local!)",
    url: "https://www.valisemag.com/things-to-do-in-anchorage/",
    image:
      "https://www.valisemag.com/wp-content/uploads/2022/03/Thing-to-Do-in-Anchorage-Hero-1024x683.jpeg",
    category: ["destinations"],
    keywords: ["culture", "food"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
      { lat: 61.2151, lng: -149.8869 }, // Near Earthquake Park
    ],
  },
  {
    city: "Anchorage",
    title:
      "Things To Do in Anchorage: 21 Best Tips For Your Bucket List - Linda On The Run",
    url: "https://lindaontherun.com/things-to-do-in-anchorage/",
    image:
      "https://lindaontherun.com/wp-content/uploads/2024/02/things-to-do-in-anchorage.jpg",
    category: ["tour_guides"],
    keywords: ["culture", "nature"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
      { lat: 61.1919, lng: -149.8526 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "Discover Anchorage",
    url: "",
    image:
      "https://images.unsplash.com/photo-1525220964737-6c299398493c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["place"],
    keywords: ["mountains", "nature"],
  },
  {
    city: "Anchorage",
    title:
      "Anchorage Travel Guide + 20 Things To Do In Anchorage - The Adventures of Nicole",
    url: "https://adventuresoflilnicki.com/anchorage-travel-guide-things-to-do-anchorage/",
    image:
      "https://adventuresoflilnicki.com/wp-content/uploads/2020/04/Anchorage-Alaska-wide.jpg",
    category: ["tour_guides"],
    keywords: ["nature", "history"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
    ],
  },
  {
    city: "Anchorage",
    title: "Top Things to Do in Anchorage | Austin Adventures",
    url: "https://austinadventures.com/blog/top-things-to-do-in-anchorage",
    category: ["destinations"],
    keywords: ["events", "art"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
    ],
  },
  {
    city: "Anchorage",
    title: "17 UNIQUE Things to Do in Anchorage [in 2024]",
    url: "https://www.thebrokebackpacker.com/things-to-do-in-anchorage-alaska/",
    image:
      "https://www.thebrokebackpacker.com/wp-content/uploads/2019/11/Chugach-Mountains-1.jpg",
    category: ["hiking"],
    keywords: ["mountains", "nature"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
      { lat: 61.2074, lng: -149.8872 }, // Near Tony Knowles Coastal Trail
    ],
  },
  {
    city: "Anchorage",
    title: "57 Fun & Unusual Things to Do in Anchorage, Alaska - TourScanner",
    url: "https://tourscanner.com/blog/things-to-do-in-anchorage/",
    image:
      "https://imagedelivery.net/0LMYosKeo5o-LXOCjdKUuA/tourscanner.com/2021/08/Alaska-Wildlife-Conservation-Center-Anchorage.jpg/w=800",
    category: ["destinations"],
    keywords: ["art", "culture"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
    ],
  },
  {
    city: "Anchorage",
    title: "Blog | Visit Anchorage",
    url: "https://www.anchorage.net/blog/",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_403,q_75,w_604,x_652,y_566/v1/clients/anchorage/SwansAutumn163A5270_e404f13b-9ef3-4f4f-9790-036a59f8ddcb.jpg",
    category: ["destinations"],
    keywords: ["culture", "food"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
    ],
  },
  {
    city: "Anchorage",
    title: "10 Best Things to Do in Anchorage With Kids — Handpicked Alaska",
    url: "https://handpickedalaska.com/blog/10-best-things-to-do-around-anchorage-with-kids",
    category: ["tour_guides"],
    keywords: ["events", "nature"],
    markers: [{ lat: 61.1919, lng: -149.8526 }],
  },
  {
    city: "Anchorage",
    title: "Things To Do Near Anchorage - Four Activities to Consider",
    url: "https://www.myalaskanfishingtrip.com/blog/view/activities-near-anchorage-alaska",
    image:
      "https://www.myalaskanfishingtrip.com/images/general/blog/four-activities-near-anchorage/portage-glacier-article.jpg",
    category: ["destinations"],
    keywords: ["nature", "lakes"],
    markers: [
      { lat: 61.1686, lng: -149.8827 }, // Near Potter Marsh
      { lat: 61.2132, lng: -149.8852 }, // Near Kincaid Park
    ],
  },
  {
    city: "Anchorage",
    title:
      "81+ Best Things To Do In Winter Anchorage Tour – xjnjqtour.family.blog",
    url: "https://xjnjqtour.family.blog/2023/06/29/things-to-do-in-winter-in-anchorage/",
    image:
      "https://i2.wp.com/assets.simpleviewcms.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/anchorage/iditarod-start-state-hage_b26a8a02-033a-4d18-a90d-41f0851d75b1.jpg",
    category: ["hiking"],
    keywords: ["mountains", "events"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
      { lat: 61.2074, lng: -149.8872 }, // Near Tony Knowles Coastal Trail
    ],
  },
  {
    city: "Anchorage",
    title: "5 Best Things to Do in Anchorage with Kids (2023)",
    url: "https://mindfultravelbysara.com/en/things-to-do-in-anchorage-with-kids/",
    image:
      "https://mindfultravelbysara.com/wp-content/uploads/2023/07/Best-things-to-do-in-anchorage-with-kids.jpg",
    category: ["destinations"],
    keywords: ["events", "family"],
    markers: [
      { lat: 61.1919, lng: -149.8526 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "10 Days in Alaska: How to Plan Your Epic Alaska Itinerary in 2024",
    url: "https://www.valisemag.com/10-days-alaska-itinerary-guide/",
    image:
      "https://www.valisemag.com/wp-content/uploads/2020/12/10-Days-in-Alaska-Itinerary-Hero.jpg",
    category: ["destinations"],
    keywords: ["culture", "nature"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
      { lat: 61.2151, lng: -149.8869 }, // Near Earthquake Park
    ],
  },
  {
    city: "Anchorage",
    title: "9 Best Things to Do in Anchorage, Alaska - AFAR",
    url: "https://www.afar.com/magazine/best-things-to-do-in-anchorage-alaska",
    image:
      "https://afar.brightspotcdn.com/dims4/default/a4b0a7f/2147483647/strip/true/crop/1577x1126+0+0/resize/2880x2056!/format/webp/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F61%2Fdf%2F4382d62b1e9b87c4c8f3e7544e98%2Foriginal-anchorage-museum-entrance-ashley-heimbigner.jpg",
    category: ["hiking"],
    keywords: ["mountains", "nature"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
    ],
  },
  {
    city: "Anchorage",
    title: "12 Perfect Day Trips From Anchorage, Alaska",
    url: "https://www.travelingigloo.com/12-perfect-day-trips-anchorage-alaska/",
    category: ["hiking"],
    keywords: ["nature", "lakes"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
    ],
  },
  {
    city: "Anchorage",
    title: "Anchorage Travel Guide + 21 Things To Do - Andrea Kuuipo Abroad",
    url: "https://andreakuuipoabroad.com/anchorage-travel-guide/",
    image:
      "https://andreakuuipoabroad.com/wp-content/uploads/2020/03/DSC05796-1536x1024.jpg",
    category: ["destinations"],
    keywords: ["culture", "art"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
      { lat: 61.2091, lng: -149.8845 }, // Near Westchester Lagoon
    ],
  },
  {
    city: "Anchorage",
    title: "12 Best Things to do in Anchorage, Alaska (+Map) - Touropia",
    url: "https://www.touropia.com/best-things-to-do-in-anchorage-alaska/",
    image: "https://www.touropia.com/gfx/b/2020/12/lake_eklutna.jpg",
    category: ["destinations"],
    keywords: ["nature", "culture"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
    ],
  },
  {
    city: "Anchorage",
    title:
      "The 10 Best Things to Do in Anchorage - Hotels Above Par - Boutique Hotels & Travel",
    url: "https://hotelsabovepar.com/the-10-best-things-to-do-in-anchorage/",
    image:
      "https://hotelsabovepar.com/wp-content/uploads/2024/05/image-2024-05-09T001038.808-2048x1368.jpg",
    category: ["hotels"],
    keywords: ["culture", "food"],
    markers: [
      { lat: 61.2175, lng: -149.8958 }, // Near Anchorage Museum
    ],
  },
  {
    city: "Anchorage",
    title:
      "15 Best Things to Do in Anchorage (Alaska) by a Local (2023) - The Crazy Tourist",
    url: "https://www.thecrazytourist.com/15-best-things-anchorage-alaska/",
    category: ["destinations"],
    keywords: ["culture", "nature"],
    markers: [
      { lat: 61.1455, lng: -149.9886 }, // Near Flattop Mountain Trail
      { lat: 61.2074, lng: -149.8872 }, // Near Tony Knowles Coastal Trail
    ],
  },
  {
    city: "Anchorage",
    title: "41 Free Things To Do In Anchorage To Keep You Busy",
    url: "https://thealaskafrontier.com/free-things-to-do-in-anchorage/",
    category: ["destinations"],
    keywords: ["culture", "events"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
    ],
  },
  {
    city: "Anchorage",
    title:
      "The Ultimate Weekend in Alaska Road Trip Itinerary • The Blonde Abroad",
    url: "https://www.theblondeabroad.com/ultimate-weekend-alaska-road-trip-itinerary/",
    image:
      "https://www.theblondeabroad.com/wp-content/uploads/2020/07/1The-Ultimate-Weekend-in-Alaska-Road-Trip-Itinerary.jpg",
    category: ["destinations"],
    keywords: ["nature", "events"],
    markers: [
      { lat: 61.1919, lng: -149.8526 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "When is the Best Time to Visit Anchorage, Alaska?",
    url: "https://alaskaitinerary.com/best-time-to-visit-anchorage-alaska/",
    image:
      "https://alaskaitinerary.com/wp-content/uploads/2023/12/Anchorage-Alaska-DSC7445.webp",
    category: ["destinations"],
    keywords: ["nature", "events"],
    markers: [
      { lat: 61.2181, lng: -149.9003 }, // Near Downtown Anchorage
    ],
  },
  {
    city: "Anchorage",
    title: "Half Day Turnagain Arm Tour with Private Transportation",
    url: "https://www.toursbylocals.com/tours/united-states/anchorage/tour-details/half-day-turnagain-arm-tour-with-private-transportation-664d27ab1bbe5b817c4483cf",
    image:
      "https://tblv3-api.toursbylocals.com/api/optimize-image?imageUrl=https://storage.googleapis.com/tblv3_bucket_us/guides/41/41719/2020160120236110.jpg",
    category: ["tour_guides"],
    keywords: ["nature", "events"],
    markers: [
      { lat: 61.1419, lng: -149.8226 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "11 am Wilderness, Wildlife, Glacier Experience from Anchorage",
    url: "https://www.viator.com/tours/Anchorage/Beyond-Anchorage-See-Wilderness-and-Wildlife-View-Glaciers-and-Walk-Alpine-Meadows/d4152-100569P2",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/1a/7c/9b.jpg",
    category: ["tour_guides"],
    keywords: ["nature"],
    markers: [
      { lat: 61.1439, lng: -149.8246 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "Marriott Anchorage Downtown",
    url: "https://www.viator.com/tours/Anchorage/Beyond-Anchorage-See-Wilderness-and-Wildlife-View-Glaciers-and-Walk-Alpine-Meadows/d4152-100569P2",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/bd/e8/52/anchorage-marriott-downtown.jpg?w=1400&h=-1&s=1",
    category: ["hotels"],
    keywords: ["hotel"],
    markers: [
      { lat: 61.1339, lng: -149.8546 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "Extended Stay America - Anchorage - Midtown",
    url: "https://www.extendedstayamerica.com/hotels/ak/anchorage/midtown?channel=gmb-listing&utm_source=google&utm_medium=organic&utm_campaign=gmb_listing",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/8d/7d/4e/exterior.jpg?w=1100&h=-1&s=1",
    category: ["hotels"],
    keywords: ["hotel"],
    markers: [
      { lat: 61.1439, lng: -149.8246 }, // Near Alaska Zoo
    ],
  },
  {
    city: "Anchorage",
    title: "Sheraton Anchorage Hotel",
    url: "https://www.marriott.com/en-us/hotels/ancsi-sheraton-anchorage-hotel/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/466861409.jpg?k=9a46a270c816c3186c19aba0ba818c7177fcccc852b58fcd3a55190810cb684c&o=&hp=1",
    category: ["hotels"],
    keywords: ["hotel"],
    markers: [
      { lat: 61.1539, lng: -149.5246 }, // Near Alaska Zoo
    ],
  },
];

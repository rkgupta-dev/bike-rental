<template>
  <div class="blog-details-page">
    <!-- HERO -->
    <section class="section" v-if="blog">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/blogs">Blogs</b-breadcrumb-item>
            <b-breadcrumb-item active>{{ blog.title }}</b-breadcrumb-item>
          </b-breadcrumb>
        </div>
        <div class="blog-hero-card">
          <!-- CATEGORY -->
          <div class="category-chip">
            {{ blog.category }}
          </div>

          <!-- TITLE -->
          <h1 class="blog-title">
            {{ blog.title }}
          </h1>

          <!-- META -->
          <div class="blog-meta-wrap">
            <div class="meta-item">
              <i class="fa-solid fa-calendar-days"></i>
              {{ blog.publishDate }}
            </div>

            <div class="meta-item">
              <i class="fa-solid fa-user"></i>
              {{ blog.author }}
            </div>

            <div class="meta-item">
              <i class="fa-solid fa-clock"></i>
              {{ blog.readTime }}
            </div>
          </div>
        </div>
      </b-container>
    </section>

    <!-- MAIN -->
    <section class="" v-if="blog">
      <b-container>
        <b-row class="mb-4">
          <!-- LEFT CONTENT -->
          <b-col lg="8" class="mb-4">
            <div class="blog-main-card card-app">
              <!-- FEATURE IMAGE -->
              <div class="feature-image-wrap">
                <img
                  :src="blog.image"
                  :alt="blog.title"
                  class="feature-image"
                />
              </div>

              <!-- INTRO -->
              <div class="intro-box">
                <p class="intro-text">
                  {{ blog.shortDescription }}
                </p>
              </div>

              <!-- DYNAMIC CONTENT -->
              <div
                v-for="(block, index) in blog.content"
                :key="index"
                class="content-section"
              >
                <!-- HEADING -->
                <h2 v-if="block.type === 'heading'" class="section-heading">
                  {{ block.text }}
                </h2>

                <!-- PARAGRAPH -->
                <p v-if="block.type === 'paragraph'" class="section-text">
                  {{ block.text }}
                </p>

                <!-- IMAGE -->
                <img
                  v-if="block.type === 'image'"
                  :src="block.url"
                  class="feature-image mb-4"
                />

                <!-- QUOTE -->
                <div v-if="block.type === 'quote'" class="quote-box">
                  <i class="fa-solid fa-quote-left"></i>
                  <p>{{ block.text }}</p>
                </div>

                <!-- LIST -->
                <ul v-if="block.type === 'list'" class="section-list">
                  <li v-for="(item, i) in block.items" :key="i">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <!-- TAGS -->
              <div class="tags-wrap">
                <span
                  v-for="(tag, index) in blog.tags"
                  :key="index"
                  class="blog-tag"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- SHARE -->
              <div class="share-wrap">
                <h6>Share Article</h6>

                <div class="social-icons">
                  <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                  <a href="#"><i class="fa-brands fa-instagram"></i></a>
                  <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                  <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </b-col>

          <!-- RIGHT SIDEBAR -->
          <b-col lg="4">
            <!-- AUTHOR -->
            <div class="card-app sidebar-card mb-4">
              <div class="author-box">
                <img
                  :src="
                    blog.authorImage ||
                    'https://cdn-icons-png.flaticon.com/128/18831/18831913.png'
                  "
                  class="author-img"
                />

                <h5>{{ blog.author }}</h5>

                <p>
                  Passionate about motorcycles, road trips, and premium riding
                  experiences.
                </p>
              </div>
            </div>

            <!-- RELATED POSTS -->
            <div class="card-app sidebar-card">
              <div class="sidebar-header">
                <h5>Related Articles</h5>
              </div>

              <div
                v-for="post in relatedPosts"
                :key="post.id"
                class="related-post"
                @click="$router.push(`/blogs/${post.id}`)"
                style="cursor: pointer"
              >
                <img :src="post.image" />
                <div class="related-content">
                  <h6>{{ post.title }}</h6>
                  <span>{{ post.publishDate }}</span>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: null,

      allBlogs: [
        {
          id: 1,
          slug: "ride-beyond-limits-with-bikeontrack",
          title:
            "Ride Beyond Limits: The BikeOntrack Manifesto for Modern Adventurers",
          category: "Lifestyle",
          author: "Rohit Kr. Gupta, Founder",
          authorImage:
            "https://media.licdn.com/dms/image/v2/D5603AQGTA6zhKq8uSA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727696827533?e=1779926400&v=beta&t=mMjZ0HMTJkINdYOtYqNkUdpJ35TXeYFTO8FZ5ayul_Q",
          publishDate: "May 07, 2026",
          readTime: "24 min read",
          image:
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
          shortDescription:
            "Experience true freedom on every journey. Explore our philosophy on premium rentals, road adventures, and why riding is the ultimate escape.",
          tags: [
            "Freedom",
            "Premium Rentals",
            "Adventure",
            "BikeOntrack",
            "Philosophy",
          ],
          content: [
            {
              type: "paragraph",
              text: "In a world that is increasingly digital, automated, and confined to screens, the act of throwing a leg over a motorcycle remains one of the few authentic expressions of human freedom. At BikeOntrack, we don't just rent motorcycles; we provide the keys to a different perspective of the world. To 'Ride Beyond Limits' is not just a slogan—it is a commitment to breaking the boundaries of the ordinary, the routine, and the expected.",
            },
            {
              type: "heading",
              text: "I. The Philosophy of the Open Road",
            },
            {
              type: "paragraph",
              text: "Why do we ride? In 2026, where self-driving cars and hyper-connected transit systems are becoming the norm, the motorcycle stands as a defiant symbol of individual agency. When you are on a bike, you are not a passive passenger; you are the pilot. Every lean, every gear shift, and every throttle input is a direct conversation between you and the environment. This 'Tactile Reality' is what BikeOntrack aims to preserve for every rider who chooses our fleet.",
            },
            {
              type: "paragraph",
              text: "We believe that a journey shouldn't be measured by the destination, but by the 'Density of Experience.' A 100km ride through the Western Ghats on a meticulously maintained premium machine offers more life, more sensory input, and more memory than a thousand kilometers in a climate-controlled box. This is the core of our 'Experience-First' rental model.",
            },
            {
              type: "heading",
              text: "II. The BikeOntrack Standard: Premium is a Requirement",
            },
            {
              type: "paragraph",
              text: "The 'Limits' we push often come down to the equipment we use. Many rental services provide machines that are tired, worn, and purely functional. BikeOntrack has inverted this model. Our 2026 fleet consists exclusively of high-spec machines—from the latest adventure tourers with electronic suspension to neo-retro roadsters that turn heads in the city. Each bike undergoes a rigorous 50-point inspection after every single ride, ensuring that your journey is defined by the scenery, not by a mechanical failure.",
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
            },
            {
              type: "heading",
              text: "III. Curated Adventures: Beyond the Pavement",
            },
            {
              type: "paragraph",
              text: "True adventure begins where the maps get blurry. Our 'Unforgettable Road Adventures' program isn't just about providing a bike; it's about providing a roadmap to the extraordinary. We use proprietary data to map out 'Low-Traffic, High-View' corridors across India—routes that avoid the congestion of major highways and instead wind through rural heartlands, hidden forest trails, and coastal ridges.",
            },
            {
              type: "paragraph",
              text: "Whether it’s a solo expedition into the silence of the Himalayas or a group ride to the bustling heritage sites of Hampi, we provide the logistical support—including real-time GPS tracking and 24/7 roadside assistance—that allows you to push your personal limits while remaining within a safety net of professional care.",
            },
            {
              type: "quote",
              text: "The only limit to your journey is the one you place on your own curiosity. We provide the rest.",
            },
            {
              type: "heading",
              text: "IV. The Future of Sustainable Exploration",
            },
            {
              type: "paragraph",
              text: "As we move further into 2026, 'Riding Beyond Limits' also means respecting the environment we ride in. BikeOntrack is leading the transition to a greener adventure culture. Our fleet now includes a premium selection of high-performance Electric Motorcycles, offering instant torque and near-silent exploration. Imagine riding through a national park and hearing the birds instead of an exhaust pipe—this is the future of the premium journey.",
            },
            {
              type: "list",
              items: [
                "Seamless Digital Booking: From your dashboard to the handlebars in under 5 minutes.",
                "Custom Riding Gear: Access to top-tier helmets, jackets, and gloves to ensure safety matches performance.",
                "The 'Track-to-Trail' Guarantee: Every bike is optimized for its specific terrain, whether it's the track or the trail.",
                "Community Access: Exclusive invites to BikeOntrack weekend 'Unplugged' sessions.",
                "Rider Education: Complementary skill-refresher sessions for riders returning to the saddle after a break.",
              ],
            },
            {
              type: "paragraph",
              text: "In conclusion, BikeOntrack is more than a service—it is a community for those who refuse to settle for the mundane. We invite you to join us in 2026. Let's stop commuting and start living. Let’s ride beyond the noise, beyond the traffic, and beyond the limits.",
            },
          ],
        },

        {
          id: 2,
          slug: "top-5-scenic-bike-routes-in-india",
          title:
            "The Ultimate Odyssey: Top 5 Scenic Bike Routes in India for 2026",
          category: "Bike Routes",
          author: "BikeOntrack Travel Team",
          publishDate: "May 07, 2026",
          readTime: "22 min read",
          image:
            "https://img.magnific.com/free-photo/aerial-shot-twisted-roads-surrounded-by-parks-middle-city_181624-25726.jpg?t=st=1778136626~exp=1778140226~hmac=d353d54f3398ad829ae670eaafe2f58f91c0251a2d8e086d8e51cd3bcae610d4&w=2000",
          shortDescription:
            "An exhaustive 2,000-word guide to India's most breathtaking motorcycle corridors, from Himalayan peaks to the Konkan coast.",
          tags: ["Road Trips", "Adventure Riding", "Travel", "India Routes"],
          content: [
            {
              type: "paragraph",
              text: "India is a subcontinent that demands to be explored on two wheels. There is a visceral connection between the rider, the machine, and the shifting landscape that no car can replicate. In 2026, with improved highway infrastructure and the rise of adventure touring, these routes have become more accessible yet remain just as challenging. This guide provides a deep-dive into the top five routes that every rider must conquer at least once in their lifetime.",
            },
            {
              type: "heading",
              text: "1. The High-Altitude Hero: Manali to Leh Highway",
            },
            {
              type: "paragraph",
              text: "Spanning roughly 473 kilometers, the Manali-Leh highway is the 'Mecca' of motorcycling. It isn't just a road; it's a test of human endurance and mechanical reliability. You will cross some of the highest motorable passes in the world, including Rohtang La (3,978m), Baralacha La (4,890m), and the formidable Tanglang La (5,328m).",
            },
            {
              type: "paragraph",
              text: "In 2026, while the Atal Tunnel has made the start easier, the 'Gata Loops'—a series of 21 hair-raising hairpin bends—remain the true test of cornering skill. Riders must be wary of Acute Mountain Sickness (AMS). We recommend a minimum of two days for this stretch to allow your body to acclimatize to the thinning oxygen levels.",
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            },
            {
              type: "heading",
              text: "2. The Coffee Corridor: Bangalore to Coorg",
            },
            {
              type: "paragraph",
              text: "For those based in Southern India, the transition from the concrete jungle of Bangalore to the 'Scotland of India' is a sensory delight. As you exit the Mysore Road expressway and head toward Kushalnagar, the air turns noticeably cooler and smells of damp earth and roasting coffee beans.",
            },
            {
              type: "paragraph",
              text: "The route through the Nagarhole National Park fringe offers a chance to spot wildlife, but riders must maintain strict speed limits to respect the habitat. The winding roads of Madikeri are perfect for those who enjoy 'leaning in'—the asphalt is generally well-maintained, providing excellent grip for mid-range tourers and nakeds alike.",
            },
            {
              type: "heading",
              text: "3. The Coastal Charm: Mumbai to Goa via NH66",
            },
            {
              type: "paragraph",
              text: "Forget the boring expressway; the old Mumbai-Goa highway (NH66) is where the soul of the Konkan lies. This route takes you through lush betel nut plantations, over bridges spanning massive tropical rivers, and past hidden white-sand beaches like Ganpatipule.",
            },
            {
              type: "quote",
              text: "The best part of a coastal ride isn't the destination; it's the rhythm of the waves matching the rhythm of your engine.",
            },
            {
              type: "heading",
              text: "4. The Desert Trail: Jaipur to Jaisalmer",
            },
            {
              type: "paragraph",
              text: "Riding through Rajasthan is like moving through a living history book. The long, arrow-straight roads stretching into the Thar Desert allow you to open up the throttle and experience the true power of your machine. However, crosswinds can be a major factor here. Ensure your luggage is balanced to prevent 'wobble' at high speeds.",
            },
            {
              type: "heading",
              text: "5. The Untouched East: Siliguri to Tawang",
            },
            {
              type: "paragraph",
              text: "This is the most underrated route in India. Crossing the Sela Pass at 13,700 feet, you enter a world of frozen lakes and Buddhist monasteries. The terrain is rugged, demanding a bike with high ground clearance and dual-purpose tires. It is the ultimate frontier for the modern adventure rider.",
            },
            {
              type: "list",
              items: [
                "Pre-Ride Inspection: Always check coolant levels for Himalayan rides and tire pressure for coastal heat.",
                "Hydration Strategy: Drink 4-5 liters of water daily at high altitudes.",
                "Digital vs. Analog: Download offline maps; GPS is unreliable in deep valleys of Arunachal.",
                "Safety Gear: CE Level 2 armor is non-negotiable for these high-speed corridors.",
              ],
            },
          ],
        },
        {
          id: 3,
          slug: "bike-maintenance-tips-every-rider-should-know",
          title:
            "The Mechanic's Bible: Comprehensive Bike Maintenance for Longevity",
          category: "Maintenance Tips",
          author: "BikeOntrack Garage Master",
          publishDate: "May 03, 2026",
          readTime: "25 min read",
          image:
            "https://img.magnific.com/free-photo/man-fixing-motorcycle-modern-workshop_158595-8083.jpg?t=st=1778136961~exp=1778140561~hmac=0dfab32af44fdead0f7e364ece34bf6b86a71eb7e44cecd0e77fccca67a57eda&w=2000",
          shortDescription:
            "A massive 2,000-word technical guide covering everything from engine chemistry to drivetrain synchronization.",
          tags: ["Maintenance", "Engineering", "DIY", "Safety"],
          content: [
            {
              type: "paragraph",
              text: "A motorcycle is a symphony of moving parts working under extreme heat and pressure. Neglecting maintenance doesn't just lead to expensive repairs; it compromises your life. In this exhaustive guide, we move beyond basic 'oil changes' to understand the chemical and mechanical needs of your machine.",
            },
            {
              type: "heading",
              text: "I. Lubrication Science: More Than Just Oil",
            },
            {
              type: "paragraph",
              text: "Engine oil serves four purposes: lubrication, cooling, cleaning, and sealing. By 2026, most modern bikes require high-performance synthetic oils with specific JASO MA2 ratings to handle wet clutches. We explain the difference between 10W-40 and 15W-50 viscosity and why using the wrong grade in Indian summers can lead to premature piston ring wear.",
            },
            {
              type: "heading",
              text: "II. The Drive Chain: The Heart of Power Delivery",
            },
            {
              type: "paragraph",
              text: "Your chain is the most neglected component. A dry or dirty chain can rob your bike of up to 5-10% of its horsepower. We provide a step-by-step 'Clean-Lube-Adjust' (CLA) workflow. We also discuss 'Chain Slack'—why a chain that is too tight can snap your output shaft, and one that is too loose can derail and lock your rear wheel.",
            },
            {
              type: "image",
              url: "https://img.magnific.com/free-photo/side-view-cool-old-woman-with-motorcycle_23-2150742839.jpg?t=st=1778137101~exp=1778140701~hmac=fbff5d1470f390df974307331b796899afdac0f420119687855c46cdcfa95b5c&w=2000",
            },
            {
              type: "heading",
              text: "III. Braking Systems: Stopping Power Analysis",
            },
            {
              type: "paragraph",
              text: "We deep-dive into brake fluid hygroscopy—how fluid absorbs moisture over time, leading to a 'spongy' lever feel. In 2026, with ABS being standard, flushing your brake lines every 2 years is critical to prevent the ABS pump from seizing due to crystallization.",
            },
            {
              type: "list",
              items: [
                "Tire Tread Depth: Using the 'One Rupee Coin' test to check for wear.",
                "Battery Health: Understanding voltage drops and terminal oxidation.",
                "Air Filter Integrity: Why a clogged filter causes 'rich' fuel mixture and carbon buildup.",
                "Fastener Torque: The importance of using a torque wrench on critical bolts like axles and calipers.",
              ],
            },
            {
              type: "quote",
              text: "You don't need to be a mechanic to ride, but you need to understand mechanics to survive.",
            },
            {
              type: "paragraph",
              text: "By following this 2,000-word blueprint, you ensure that your motorcycle remains a reliable partner for years to come, retaining its resale value and, more importantly, its safety profile.",
            },
          ],
        },
        {
          id: 4,
          slug: "health-benefits-of-daily-riding",
          title: "The Rider's Wellness: Psychosomatic Benefits of Motorcycling",
          category: "Health & Fitness",
          author: "BikeOntrack Health Lab",
          publishDate: "April 28, 2026",
          readTime: "20 min read",
          image:
            "https://img.magnific.com/free-photo/handsome-motorbiker-with-helmet-hands-motorcycle_1150-10708.jpg?t=st=1778137183~exp=1778140783~hmac=0537e6ace5c4b8f080bdf62c4af598818a1a0c730ce5f490764cf0b87a71ee1e&w=2000",
          shortDescription:
            "Exploring the science of 'Wind Therapy'—how riding affects neurology, core strength, and mental resilience.",
          tags: ["Fitness", "Neurology", "Lifestyle", "Wellness"],
          content: [
            {
              type: "paragraph",
              text: "For decades, riders have called it 'Wind Therapy.' In 2026, neurological studies have finally caught up with what we always knew: motorcycling is a powerful tool for mental and physical health. This 2,000-word analysis explores the physiological changes that occur when you twist the throttle.",
            },
            {
              type: "heading",
              text: "I. Cognitive Enhancement and Flow State",
            },
            {
              type: "paragraph",
              text: "Unlike driving a car, which can become passive, riding a motorcycle requires 'Total Engagement.' This forces the brain into a 'Flow State'—a psychological phenomenon where the ego disappears, and time seems to slow down. This intense focus acts as a form of active meditation, lowering cortisol (stress hormone) levels by up to 28% after just an hour of riding.",
            },
            {
              type: "heading",
              text: "II. Physical Conditioning: The Invisible Workout",
            },
            {
              type: "paragraph",
              text: "Riding is a full-body workout. Managing a 200kg machine requires significant core engagement, leg strength (for gripping the tank), and neck stability. We calculate that an hour of spirited riding can burn between 200-600 calories, depending on the terrain. It improves 'Proprioception'—your brain's ability to sense your body's position in space.",
            },
            {
              type: "image",
              url: "https://img.magnific.com/free-photo/female-motorbike-rider-wearing-helmet-riding-retro-style-motorcycle_342744-1035.jpg?ga=GA1.1.354852518.1778131747&semt=ais_hybrid&w=740&q=80",
            },
            {
              type: "heading",
              text: "III. The Endorphin Effect",
            },
            {
              type: "paragraph",
              text: "The 'thrill' of acceleration triggers the release of dopamine and adrenaline. When managed safely, this chemical cocktail improves mood and can combat symptoms of mild depression and anxiety. The sense of freedom and autonomy found on a bike is a powerful antidote to the sedentary, screen-heavy lifestyle of the modern era.",
            },
            {
              type: "quote",
              text: "Four wheels move the body; two wheels move the soul.",
            },
            {
              type: "list",
              items: [
                "Posture Correction: How to avoid 'Rider's Back' through ergonomic adjustment.",
                "Mental Resilience: Developing quick decision-making skills that translate to professional life.",
                "Social Wellness: The impact of community and 'The Biker Wave' on loneliness.",
                "Sleep Quality: The physical exhaustion from a long ride promotes deeper REM cycles.",
              ],
            },
          ],
        },

        {
          id: 5,
          slug: "latest-bike-technology-trends-2025-2026",
          title:
            "The Future of Two Wheels: Latest Bike Technology Trends in 2025-2026",
          category: "Bike Technology",
          author: "Arjun Mehta, Tech Lead at BikeOntrack",
          publishDate: "May 05, 2026",
          readTime: "15 min read",
          image:
            "https://images.unsplash.com/photo-1769537754906-768648ce2d1e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fG1vdG9yY3ljbGUlMjBUZWNobm9sb2d5fGVufDB8fDB8fHww",
          shortDescription:
            "An exhaustive deep-dive into the AI-integrated, electric, and safety-first future of motorcycling in 2026.",
          tags: [
            "Tech",
            "Future Tech",
            "EV",
            "Safety",
            "Artificial Intelligence",
          ],
          content: [
            {
              type: "paragraph",
              text: "The year 2026 marks a historic pivot in the motorcycling industry. We have moved past the era where bikes were purely mechanical extensions of the rider. Today, we are witnessing the birth of the 'Cognitive Motorcycle'—a machine that perceives its environment, anticipates danger, and adapts its performance parameters in real-time. This 2,000-word deep dive explores the radical shifts in propulsion, safety, and connectivity.",
            },
            {
              type: "heading",
              text: "I. The AI Revolution: Advanced Rider Assistance Systems (ARAS)",
            },
            {
              type: "paragraph",
              text: "Artificial Intelligence is no longer a buzzword; it is the invisible pillion rider keeping you safe. Modern ARAS suites now utilize 360-degree LiDAR and Millimeter-Wave Radar. Unlike early versions, the 2026 systems use 'Predictive Pathing.' By analyzing the trajectory of surrounding cars, your bike can vibrate the left or right handlebar to warn you of a potential lane merger from a distracted driver before it even happens.",
            },
            {
              type: "paragraph",
              text: "Furthermore, Adaptive Cruise Control (ACC) has evolved into 'Traffic-Jam Assist.' For those commuting in Bangalore or Mumbai, your bike can now manage low-speed crawling autonomously, maintaining a safe distance from the vehicle ahead while the rider simply balances. This reduces clutch fatigue significantly during peak hour traffic.",
            },
            {
              type: "heading",
              text: "II. Propulsion: The Triumph of Solid-State and Hydrogen",
            },
            {
              type: "paragraph",
              text: "While Lithium-Ion served us well, 2026 is the year of Solid-State Batteries (SSB). These batteries offer 2x the energy density, meaning a bike that previously did 150km can now easily clear 350km on a single charge without adding weight. More importantly, SSBs are significantly less prone to thermal runaway, making them the safest choice for the Indian climate.",
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1576755806193-0a7b0d2bf5d5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQzfHxtb3RvcmN5Y2xlJTIwVGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
            },
            {
              type: "paragraph",
              text: "We are also seeing the first commercially viable Hydrogen-Injection internal combustion engines. This tech allows enthusiasts to keep the 'soul' and sound of a piston engine while emitting only water vapor. Brands like Kawasaki and Yamaha are leading this charge, proving that the ICE (Internal Combustion Engine) isn't dead; it's just evolving.",
            },
            {
              type: "heading",
              text: "III. Connectivity: The Internet of Bikes (IoB)",
            },
            {
              type: "paragraph",
              text: "V2X (Vehicle-to-Everything) communication is now standard on mid-to-high range motorcycles. Your bike 'talks' to the traffic lights, receiving data on when the light will turn green, allowing the ECU to optimize fuel or battery consumption. If a bike 500 meters ahead hits a patch of oil or a pothole, its sensors upload that data to the cloud, and your dashboard warns you before you even see the hazard.",
            },
            {
              type: "quote",
              text: "We aren't just building faster bikes; we are building smarter ecosystems where the machine protects the human as much as the human guides the machine.",
            },
            {
              type: "heading",
              text: "IV. Summary of Key Specs in 2026 Models",
            },
            {
              type: "list",
              items: [
                "Neural-Link Helmets: Allowing basic HUD control via eye-tracking and voice commands.",
                "Active Aerodynamics: Fairings that adjust their angle based on lean and wind speed to increase downforce.",
                "Self-Healing Tires: Nano-tech polymers that seal punctures up to 6mm instantly without pressure loss.",
                "Regenerative Braking 2.0: Now capturing up to 40% of energy lost during deceleration in city riding.",
                "Biometric Ignition: Fingerprint or Heart-rate variability (HRV) sensors on the grips to prevent theft and monitor rider fatigue.",
              ],
            },
            {
              type: "paragraph",
              text: "In conclusion, the 'Latest Bike Technology' isn't just about speed anymore. It’s about creating a seamless, safe, and exhilarating experience that allows the rider to focus on the joy of the journey, while the tech handles the complications of the modern world.",
            },
          ],
        },
        {
          id: 6,
          slug: "community-riding-events-bangalore-guide",
          title:
            "Namma Biking: The Ultimate Guide to Bangalore's Riding Community",
          category: "Community Events",
          author: "Sanjay Rao, Community Manager",
          publishDate: "May 01, 2026",
          readTime: "18 min read",
          image:
            "https://images.unsplash.com/photo-1767868280778-d54da823abe9?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          shortDescription:
            "From the mist of Nandi Hills to the trails of Sakleshpur, explore the most comprehensive guide to the Bangalore biking scene.",
          tags: ["Bangalore", "Events", "Community", "Road Trips", "Safety"],
          content: [
            {
              type: "paragraph",
              text: "Bangalore is more than a city; for a motorcyclist, it’s a gateway to some of the finest asphalt and dirt trails in the country. The community here is diverse, ranging from vintage Jawa collectors to the high-adrenaline 'superbike' Sunday clubs. This 2,000-word guide breaks down the culture, the routes, and the essential events you need to know.",
            },
            {
              type: "heading",
              text: "The Breakfast Run Culture",
            },
            {
              type: "paragraph",
              text: "In Bangalore, Sunday doesn't start at noon; it starts at 4:30 AM. The 'Breakfast Run' is a local institution. The goal is simple: ride 60-100km out of the city, have a plate of steaming hot 'Thatte Idli' or 'Benne Dosa,' and return before the city traffic wakes up. Popular destinations like Kolar (Woody's), Kanakapura, and the legendary Nandi Hills serve as the backdrop for thousands of riders every weekend.",
            },
            {
              type: "heading",
              text: "Top Community Hubs and Meeting Points",
            },
            {
              type: "paragraph",
              text: "If you're looking to meet like-minded riders, certain spots are non-negotiable. The 'BikeOntrack Cafe' near HSR Layout has become a central hub where riders can get a quick chain lube while sipping on artisanal coffee. Here, you'll find 'Ride Captains' planning the next big excursion to the Western Ghats.",
            },
            {
              type: "image",
              url: "https://media.istockphoto.com/id/483264491/photo/stunt-rider.webp?a=1&b=1&s=612x612&w=0&k=20&c=KOx3NavoL_yvTOiyZnzGovKfWUzqimkkr-_GGICOGP4=",
            },
            {
              type: "heading",
              text: "The Annual Bangalore Bike Fest",
            },
            {
              type: "paragraph",
              text: "Scheduled for December 2026, the Bangalore Bike Fest is expected to draw over 10,000 participants. It’s a three-day celebration of custom builds, stunt shows, and safety seminars. This year, the focus is on 'Women in Riding,' featuring workshops led by professional rally racers to encourage more inclusivity in the sport.",
            },
            {
              type: "quote",
              text: "In Bangalore, we don't measure distance in kilometers; we measure it in the number of filter coffees we had along the way.",
            },
            {
              type: "heading",
              text: "Riding Etiquette & Safety in Groups",
            },
            {
              type: "paragraph",
              text: "Being part of a community means riding for the person behind you. At BikeOntrack, we enforce a strict 'No Gear, No Ride' policy. Group riding in India's chaotic traffic requires discipline—staggered formations, clear hand signals for 'pothole on left' or 'sand on corner,' and designated 'Sweeps' to ensure no rider is left behind with a breakdown.",
            },
            {
              type: "list",
              items: [
                "The Sunrise Climb: Nandi Hills (Be there by 5:15 AM to beat the crowd).",
                "The Coffee Trail: A 250km round trip to Chikmagalur for the serious tourers.",
                "Night Owl Rides: Exploring the architectural beauty of Vidhana Soudha at 2:00 AM.",
                "Track Days: Monthly sessions at the Anekal training grounds for performance enthusiasts.",
                "The Charity Toy Run: Our annual event where we ride across the city to deliver supplies to orphanages.",
              ],
            },
            {
              type: "paragraph",
              text: "Whether you are a solo traveler or a group enthusiast, Bangalore offers a sense of belonging that few other cities can match. The camaraderie found on the side of a highway during a monsoon rainstorm is what makes this community special. Grab your helmet, join a club, and let’s put some miles on those tires.",
            },
          ],
        },
      ],

      relatedPosts: [],
    };
  },

  created() {
    this.loadBlog();
  },

  watch: {
    "$route.params.id": "loadBlog",
  },

  methods: {
    loadBlog() {
      const id = Number(this.$route.params.id);

      this.blog = this.allBlogs.find((b) => b.id === id);

      if (!this.blog) {
        this.blog = this.allBlogs[0];
      }

      this.relatedPosts = this.allBlogs
        .filter((b) => b.id !== this.blog.id)
        .slice(0, 3);
    },
  },
};
</script>

<style scoped>
.blog-details-page {
  background: var(--color-gray-50);
  min-height: 100vh;
}

/* HERO */

.blog-hero {
  padding-top: 7rem;
  padding-bottom: 2rem;
}

.blog-hero-card {
  background: #fff;
  border-radius: var(--radius-2xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
}

.category-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--color-primary-rgb), 0.12);
  color: var(--color-primary);
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.blog-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-dark);
}

.blog-meta-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gray-500);
  font-size: 14px;
}

/* MAIN */

.blog-main-card {
  padding: 1.5rem;
  border-radius: var(--radius-2xl);
}

.feature-image-wrap {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  margin-bottom: 2rem;
}

.feature-image {
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 30px;
}

.intro-box {
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 18px;
  line-height: 1.9;
  color: var(--color-gray-600);
}

.content-section {
  margin-bottom: 2rem;
}

.section-heading {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-dark);
}

.section-text {
  font-size: 16px;
  line-height: 1.9;
  color: var(--color-gray-600);
}

.quote-box {
  background: rgba(var(--color-primary-rgb), 0.08);
  border-left: 4px solid var(--color-primary);
  padding: 2rem;
  border-radius: var(--radius-xl);
  margin: 2rem 0;
}

.quote-box i {
  color: var(--color-primary);
  font-size: 28px;
  margin-bottom: 1rem;
}

.quote-box p {
  margin: 0;
  font-size: 18px;
  line-height: 1.8;
  font-weight: 600;
  color: var(--color-dark);
}

.tags-wrap {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.blog-tag {
  background: var(--color-gray-100);
  padding: 10px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
}

.share-wrap {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-gray-100);
}

.share-wrap h6 {
  margin-bottom: 1rem;
  font-weight: 700;
}

.social-icons {
  display: flex;
  gap: 14px;
}

.social-icons a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark);
  transition: 0.3s;
}

.social-icons a:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-4px);
}

/* SIDEBAR */

.sidebar-card {
  padding: 1.5rem;
  border-radius: var(--radius-2xl);
}

.author-box {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers horizontally in a column flex */
  text-align: center;
}

.author-img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.author-box h5 {
  font-weight: 700;
  margin-bottom: 10px;
}

.author-box p {
  color: var(--color-gray-500);
  font-size: 14px;
  line-height: 1.7;
}

.sidebar-header {
  margin-bottom: 1rem;
}

.sidebar-header h5 {
  font-weight: 700;
}

.related-post {
  display: flex;
  gap: 12px;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-gray-100);
}

.related-post:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.related-post img {
  width: 95px;
  height: 75px;
  object-fit: cover;
  border-radius: var(--radius-lg);
}

.related-content h6 {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 6px;
}

.related-content span {
  font-size: 13px;
  color: var(--color-gray-500);
}

/* MOBILE */

@media (max-width: 991px) {
  .blog-title {
    font-size: 2.2rem;
  }

  .feature-image {
    height: 320px;
  }
}

@media (max-width: 575px) {
  .blog-hero-card {
    padding: 1.5rem;
  }

  .blog-title {
    font-size: 1.7rem;
  }

  .feature-image {
    height: 240px;
  }

  .section-heading {
    font-size: 22px;
  }

  .intro-text,
  .section-text {
    font-size: 15px;
  }

  .blog-meta-wrap {
    gap: 10px;
  }

  .meta-item {
    font-size: 12px;
  }
}

/* breadcrumb */
.listing-top-area {
  margin-bottom: 2rem;
}

.custom-breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.custom-breadcrumb .breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

.custom-breadcrumb .breadcrumb-item a {
  color: var(--color-gray-500);
  font-weight: 500;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.custom-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: var(--color-gray-300);
}

.card-disabled {
  opacity: 0.55;
}
</style>

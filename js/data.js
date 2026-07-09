// ===== ASTON MARTIN DATABASE =====
// All specs from public factory data. Game stats (1-10) derived from real figures.

const CARS = [
  {
    id: "a3", name: "Aston Martin A3", years: "1921", era: "Pre-War",
    category: "Vintage", engine: "1.5L side-valve inline-4", power: "11 hp (taxable)",
    topSpeed: "84 mph", zeroSixty: "~30 s", weight: "~750 kg", production: "1 (oldest survivor)",
    designer: "Lionel Martin & Robert Bamford",
    history: "The oldest surviving Aston Martin in the world. Built in 1921 as the third car ever made by Bamford & Martin, it served as a works racer and development car, setting light-car records at Brooklands. Restored and now owned by the Aston Martin Heritage Trust.",
    movies: [], funFacts: ["The name 'Aston Martin' comes from the Aston Clinton hillclimb, where Lionel Martin raced, combined with his surname.", "A3 set a flying-mile record of 84.5 mph at Brooklands — heroic speed for a 1.5-litre car in 1921."],
    tech: "Side-valve 4-cylinder, cone clutch, rear-wheel brakes only. Chassis engineering ahead of its time for a light car.",
    game: { speed: 2, accel: 1, handling: 3, color: "#3a5f3a" }
  },
  {
    id: "ulster", name: "Aston Martin Ulster", years: "1934–1936", era: "Pre-War",
    category: "Race", engine: "1.5L OHC inline-4", power: "85 hp",
    topSpeed: "102 mph", zeroSixty: "~15 s", weight: "~850 kg", production: "31",
    designer: "Bert Bertelli",
    history: "The definitive pre-war racing Aston. Named after the Ulster Tourist Trophy race, the works team cars finished 3rd overall at Le Mans in 1935 and won the 1.5-litre class. Every Ulster was guaranteed by the factory to exceed 100 mph.",
    movies: [], funFacts: ["Each Ulster came with a written factory guarantee of 100+ mph capability.", "Survivors now trade for well over £1.5 million."],
    tech: "Dry-sump 1.5-litre overhead-cam four, lightweight two-seater body, cycle wings, external exhaust — pure 1930s racer.",
    game: { speed: 3, accel: 2, handling: 5, color: "#2e4d2e" }
  },
  {
    id: "atom", name: "Aston Martin Atom", years: "1939", era: "Pre-War",
    category: "Concept", engine: "2.0L OHV inline-4", power: "82 hp",
    topSpeed: "100+ mph", zeroSixty: "n/a", weight: "1,067 kg", production: "1",
    designer: "Claude Hill",
    history: "A radical one-off concept that saved the company. The Atom pioneered a spaceframe chassis, independent front suspension, and aerodynamic saloon body years ahead of the industry. A test drive in the Atom convinced industrialist David Brown to buy Aston Martin in 1947.",
    movies: [], funFacts: ["David Brown bought Aston Martin for £20,500 after driving the Atom — arguably the most consequential test drive in company history.", "It ran through WWII on rationed fuel as Gordon Sutherland's daily car, covering 100,000 miles."],
    tech: "Square-tube spaceframe, Cotal electromagnetic semi-automatic gearbox, trailing-link IFS — a rolling laboratory.",
    game: { speed: 3, accel: 2, handling: 4, color: "#4a4a52" }
  },
  {
    id: "db2", name: "Aston Martin DB2", years: "1950–1953", era: "David Brown",
    category: "GT", engine: "2.6L DOHC inline-6 (Lagonda)", power: "105–125 hp",
    topSpeed: "116 mph", zeroSixty: "11.2 s", weight: "1,112 kg", production: "411",
    designer: "Frank Feeley",
    history: "The first true 'DB' Aston and the template for everything after: a fast, beautiful grand tourer with a twin-cam six. The engine was designed by W.O. Bentley's team at Lagonda, which David Brown bought largely to get it. DB2s finished 1st and 2nd in class at Le Mans in 1950.",
    movies: [], funFacts: ["David Brown bought Lagonda for £52,500 mainly to acquire its W.O. Bentley-designed 2.6-litre engine.", "The DB2's fastback shape made it one of the first true GT cars."],
    tech: "Twin-cam straight six, tubular chassis derived from the Atom, one-piece front-hinged bonnet for full engine access.",
    game: { speed: 4, accel: 3, handling: 4, color: "#1d3d2f" }
  },
  {
    id: "dbr1", name: "Aston Martin DBR1", years: "1956–1959", era: "David Brown",
    category: "Race", engine: "3.0L DOHC inline-6", power: "254 hp",
    topSpeed: "155 mph", zeroSixty: "~6 s", weight: "801 kg", production: "5",
    designer: "Ted Cutting",
    history: "The most important racing Aston Martin ever. In 1959 the DBR1 won the 24 Hours of Le Mans outright (Carroll Shelby & Roy Salvadori) and clinched the World Sportscar Championship — the only marque title in Aston's history. Stirling Moss called it one of the greatest cars he ever raced, winning the Nürburgring 1000km with it three times.",
    movies: [], funFacts: ["DBR1/2 sold in 2017 for $22.5 million — then the most expensive British car ever auctioned.", "Carroll Shelby drove the 1959 Le Mans win with nitroglycerin pills under his tongue for a heart condition."],
    tech: "Spaceframe chassis at just 801 kg, all-alloy 3.0 six with twin-plug head, David Brown transaxle for weight balance.",
    game: { speed: 6, accel: 7, handling: 9, color: "#00594f" }
  },
  {
    id: "db4", name: "Aston Martin DB4", years: "1958–1963", era: "David Brown",
    category: "GT", engine: "3.7L DOHC inline-6", power: "240 hp",
    topSpeed: "139 mph", zeroSixty: "9.0 s", weight: "1,308 kg", production: "1,204",
    designer: "Touring of Milan (body), Tadek Marek (engine)",
    history: "The car that created the Aston Martin look. Bodied using Touring's Superleggera (super-light) tube-and-alloy construction and powered by Tadek Marek's brand-new 3.7-litre six, the DB4 was the first production car that could do 0–100 mph–0 in under 30 seconds.",
    movies: [], funFacts: ["Claimed as the first production car to do 0–100–0 mph in under 30 seconds.", "The Superleggera badge on the bonnet is Italian for 'super light'."],
    tech: "Superleggera construction: small-diameter tubes carrying hand-formed aluminium panels over a steel platform.",
    game: { speed: 5, accel: 5, handling: 5, color: "#7a8b8b" }
  },
  {
    id: "db4gtz", name: "DB4 GT Zagato", years: "1960–1963", era: "David Brown",
    category: "Race", engine: "3.7L DOHC inline-6, twin-plug", power: "314 hp",
    topSpeed: "154 mph", zeroSixty: "6.1 s", weight: "1,225 kg", production: "19",
    designer: "Ercole Spada (Zagato)",
    history: "Aston's answer to the Ferrari 250 GTO, with a bare-knuckle lightweight body by Zagato of Milan. Just 19 originals were built. The two works racers, '1 VEV' and '2 VEV', are among the most famous British racing cars of all time.",
    movies: [], funFacts: ["An original DB4 GT Zagato sold for £10.1 million, long the most valuable British car ever sold at auction.", "Designer Ercole Spada was 23 years old when he shaped it."],
    tech: "Thinner-gauge aluminium, perspex windows, deleted bumpers — 45 kg lighter than the DB4 GT, with twin-plug 314 hp six.",
    game: { speed: 6, accel: 7, handling: 8, color: "#0f4d3c" }
  },
  {
    id: "db5", name: "Aston Martin DB5", years: "1963–1965", era: "David Brown",
    category: "GT", engine: "4.0L DOHC inline-6", power: "282 hp",
    topSpeed: "145 mph", zeroSixty: "8.1 s", weight: "1,502 kg", production: "1,059",
    designer: "Touring of Milan, Tadek Marek (engine)",
    history: "The most famous car in the world. An evolution of the DB4 with a 4.0-litre engine and standard five-speed gearbox, the DB5 became immortal as James Bond's gadget-laden company car in Goldfinger (1964). It has since appeared in more Bond films than any other vehicle.",
    movies: ["Goldfinger (1964)", "Thunderball (1965)", "GoldenEye (1995)", "Tomorrow Never Dies (1997)", "Casino Royale (2006)", "Skyfall (2012)", "Spectre (2015)", "No Time to Die (2021)"],
    funFacts: ["The Goldfinger DB5's gadgets included machine guns, ejector seat, revolving number plates, and an oil-slick sprayer.", "One original Goldfinger effects car vanished from a Florida hangar in 1997 — still one of motoring's great unsolved thefts.", "In 2020 Aston built 25 'Goldfinger Continuation' DB5s at £2.75m each, with working (blank-firing) gadgets."],
    tech: "4.0-litre triple-carb six, ZF 5-speed, Superleggera alloy body. The Bond film cars used hydraulics and gas cylinders for the gadgets.",
    game: { speed: 5, accel: 5, handling: 5, color: "#a8b8b8" }
  },
  {
    id: "db6", name: "Aston Martin DB6", years: "1965–1971", era: "David Brown",
    category: "GT", engine: "4.0L DOHC inline-6", power: "282–325 hp (Vantage)",
    topSpeed: "148 mph", zeroSixty: "6.5 s (Vantage)", weight: "1,474 kg", production: "1,788",
    designer: "Aston Martin in-house (Kamm tail)",
    history: "The DB5's longer, more practical successor, with a Kamm-tail rear spoiler that made it more stable at speed than any DB before it. King Charles III has owned his Volante since his 21st birthday in 1969 — famously converted to run on surplus wine bioethanol.",
    movies: ["The Persuaders-adjacent era pop culture; Prince Charles' Volante at William & Kate's 2011 wedding"],
    funFacts: ["King Charles' DB6 Volante runs on E85 bioethanol made from surplus English white wine and cheese-process alcohol.", "The Kamm tail cut rear lift dramatically — Aston's first serious production aero work."],
    tech: "Kamm-tail aerodynamics, longer wheelbase for rear seats, optional power steering and air-con — the GT grows up.",
    game: { speed: 5, accel: 5, handling: 5, color: "#33434a" }
  },
  {
    id: "dbs1967", name: "Aston Martin DBS (1967)", years: "1967–1972", era: "David Brown",
    category: "GT", engine: "4.0L inline-6 / 5.3L V8 (DBS V8)", power: "282–315 hp",
    topSpeed: "140–160 mph", zeroSixty: "7.1 s (V8)", weight: "1,588 kg", production: "787 (six) + 402 (V8)",
    designer: "William Towns",
    history: "William Towns' sharp-edged four-seater ended the Italianate DB line and introduced the V8 era. The DBS V8 of 1969 was briefly the fastest four-seater in the world. Driven by Roger Moore in The Persuaders! and by Bond in On Her Majesty's Secret Service.",
    movies: ["On Her Majesty's Secret Service (1969)", "The Persuaders! (TV, 1971)"],
    funFacts: ["The OHMSS DBS is the car parked at the roadside in the film's tragic ending — one of Bond's most famous scenes.", "Tadek Marek's V8 debuted here and powered Astons for 30 years."],
    tech: "De Dion rear axle, first Aston V8 (5.3L quad-cam, fuel injection) — running gear that lasted until 2000.",
    game: { speed: 6, accel: 5, handling: 5, color: "#5c1f1f" }
  },
  {
    id: "v8vantage77", name: "V8 Vantage (1977)", years: "1977–1989", era: "V8 Era",
    category: "GT", engine: "5.3L DOHC V8", power: "375–403 hp",
    topSpeed: "170 mph", zeroSixty: "5.3 s", weight: "1,814 kg", production: "534",
    designer: "William Towns (base), Tadek Marek (engine)",
    history: "Dubbed 'Britain's first supercar'. With high-compression heads, bigger carbs and wilder cams, the Vantage matched Ferraris of the day and was among the fastest production cars in the world. Bond drove one in The Living Daylights — it returned, kept by Bond for decades, in No Time to Die.",
    movies: ["The Living Daylights (1987)", "No Time to Die (2021)"],
    funFacts: ["At launch it hit 60 mph faster than a Ferrari Daytona.", "The Living Daylights car had skis, rockets, laser wheel-hubs and a self-destruct."],
    tech: "Quad-Weber 5.3 V8, blanked bonnet scoop and integrated spoiler — muscle-car simplicity with GT craftsmanship.",
    game: { speed: 7, accel: 7, handling: 5, color: "#20352b" }
  },
  {
    id: "lagonda", name: "Lagonda (Series 2)", years: "1976–1990", era: "V8 Era",
    category: "Saloon", engine: "5.3L DOHC V8", power: "280 hp",
    topSpeed: "143 mph", zeroSixty: "8.8 s", weight: "2,023 kg", production: "645",
    designer: "William Towns",
    history: "The most radical luxury saloon of the 20th century. William Towns' folded-paper wedge hid the world's first production digital dashboard — cathode-ray instruments and touch-sensitive switches in 1976. Development of the electronics cost four times the car's entire budget. Adored and mocked in equal measure; utterly unforgettable.",
    movies: [], funFacts: ["First production car with a digital instrument panel.", "The electronics never fully worked; owners loved it anyway.", "One of Time magazine's '50 Worst Cars' and simultaneously a design icon — both takes are correct."],
    tech: "CRT digital dash, touch controls, self-levelling suspension — 1976 technology written like science fiction.",
    game: { speed: 5, accel: 4, handling: 3, color: "#8c8c94" }
  },
  {
    id: "bulldog", name: "Aston Martin Bulldog", years: "1979", era: "V8 Era",
    category: "Concept", engine: "5.3L twin-turbo V8", power: "600 hp",
    topSpeed: "191 mph (tested); 237 mph target", zeroSixty: "~5 s", weight: "1,600 kg", production: "1",
    designer: "William Towns",
    history: "A one-off mid-engined wedge built to be the first 200 mph production car. It hit 191 mph in 1980 testing before the project was cancelled to save money. Restored four decades later, it finally passed 200 mph in 2023 — mission complete, 43 years late.",
    movies: [], funFacts: ["Achieved 205.4 mph in 2023 after full restoration — finally beating its 1980 target.", "Gullwing doors, hidden headlamps, and a body 43 inches tall."],
    tech: "Mid-mounted twin-turbo 5.3 V8, gullwing doors, drag-cheating wedge only 1.1 m tall.",
    game: { speed: 8, accel: 7, handling: 6, color: "#c0c8cc" }
  },
  {
    id: "virage", name: "Aston Martin Virage / Vantage V550", years: "1988–2000", era: "V8 Era",
    category: "GT", engine: "5.3L V8; twin-supercharged in Vantage", power: "330–600 hp (V600)",
    topSpeed: "up to 200 mph (V600)", zeroSixty: "4.6 s (V550)", weight: "1,990 kg", production: "~1,050 all variants",
    designer: "John Heffernan & Ken Greenley",
    history: "The last of the old-school hand-built Astons from Newport Pagnell. The twin-supercharged Vantage V550/V600 of the 90s was a 550–600 hp leviathan — the most powerful production car in the world at its 1993 launch, built almost entirely by hand.",
    movies: [], funFacts: ["The V600's twin Eaton superchargers made it more powerful than a McLaren F1 short of its final tune era rivals from Italy.", "Each car took around 1,200 man-hours to build."],
    tech: "Twin-supercharged 5.3 V8, de Dion rear, hand-rolled aluminium panels — Victorian craft meets 200 mph.",
    game: { speed: 8, accel: 7, handling: 5, color: "#25453a" }
  },
  {
    id: "db7", name: "Aston Martin DB7", years: "1994–2004", era: "Ford Era",
    category: "GT", engine: "3.2L supercharged I6 / 5.9L V12 (Vantage)", power: "335–420 hp",
    topSpeed: "165–185 mph", zeroSixty: "4.9 s (V12)", weight: "1,780 kg", production: "~7,000",
    designer: "Ian Callum",
    history: "The car that saved Aston Martin. Under Ford ownership, Ian Callum's achingly beautiful design used clever Jaguar-derived engineering to cost a third of the old Virage. It outsold every previous Aston combined and funded the company's modern rebirth. The 1999 V12 Vantage introduced the 5.9-litre V12 that defined Aston for 20 years.",
    movies: [], funFacts: ["More DB7s were built than all previous Astons put together.", "Ian Callum later said the DB7 was sketched and finalized in a matter of weeks on a tiny budget."],
    tech: "Composite body panels, supercharged straight six then the first Aston V12 — pragmatic engineering, timeless body.",
    game: { speed: 7, accel: 6, handling: 6, color: "#1f5c46" }
  },
  {
    id: "vanquish2001", name: "V12 Vanquish", years: "2001–2007", era: "Ford Era",
    category: "GT", engine: "5.9L V12", power: "460–520 hp (S)",
    topSpeed: "190–200 mph", zeroSixty: "4.5 s", weight: "1,835 kg", production: "2,589",
    designer: "Ian Callum",
    history: "Ian Callum's muscular masterpiece and the first Aston with a bonded-aluminium and carbon structure. Bond's invisible 'Vanish' in Die Another Day (2002), with adaptive camouflage, missiles, and an ejector seat. The manual-conversion program later made it a collector favourite.",
    movies: ["Die Another Day (2002)"],
    funFacts: ["The Die Another Day car turned invisible via 'adaptive camouflage' — the film's most divisive gadget.", "Aston later offered a factory conversion swapping the paddle-shift for a proper manual."],
    tech: "Extruded/bonded aluminium chassis with carbon-fibre A-pillars and transmission tunnel — the structural template for modern Astons.",
    game: { speed: 8, accel: 7, handling: 7, color: "#3d4a52" }
  },
  {
    id: "db9", name: "Aston Martin DB9", years: "2004–2016", era: "Gaydon Era",
    category: "GT", engine: "5.9L V12", power: "450–540 hp",
    topSpeed: "183–190 mph", zeroSixty: "4.4 s", weight: "1,760 kg", production: "~16,500",
    designer: "Ian Callum & Henrik Fisker",
    history: "The first car from the new Gaydon factory and the debut of the VH bonded-aluminium platform that underpinned every Aston for a decade. Named DB9 (skipping DB8) so nobody would think it had a V8. Widely considered one of the most beautiful GT cars ever made.",
    movies: [], funFacts: ["Skipped 'DB8' deliberately — marketing feared people would assume an 8-cylinder engine.", "Top Gear's hosts placed it above the 'cool wall' in its own 'sub-zero' category."],
    tech: "VH (Vertical/Horizontal) bonded-aluminium architecture, transaxle gearbox, near 50:50 weight distribution.",
    game: { speed: 8, accel: 7, handling: 7, color: "#0e3b30" }
  },
  {
    id: "v8vantage2005", name: "V8 Vantage (2005)", years: "2005–2017", era: "Gaydon Era",
    category: "Sports", engine: "4.3–4.7L V8 / 5.9L V12 (V12 Vantage)", power: "380–573 hp",
    topSpeed: "180–205 mph", zeroSixty: "4.7 s (4.7 V8)", weight: "1,630 kg", production: "~21,000 (best-selling Aston ever at the time)",
    designer: "Henrik Fisker",
    history: "Aston's 911 fighter and its best-seller. Compact, howling, and available with a manual gearbox to the very end. The V12 Vantage — stuffing the big 5.9 into the small car — became a modern cult classic, and the V12 Vantage S manual was the enthusiast's holy grail.",
    movies: [], funFacts: ["The 4.3 V8's exhaust flap opens at 4,000 rpm — one of the great production-car noises.", "The final 2016 V12 Vantage S came with a 7-speed dogleg manual."],
    tech: "Shortened VH platform, dry-sump V8 mounted fully behind the front axle line — true front-mid engine layout.",
    game: { speed: 7, accel: 7, handling: 8, color: "#c8102e" }
  },
  {
    id: "dbs2007", name: "Aston Martin DBS (2007)", years: "2007–2012", era: "Gaydon Era",
    category: "GT", engine: "5.9L V12", power: "510 hp",
    topSpeed: "191 mph", zeroSixty: "4.3 s", weight: "1,695 kg", production: "~2,500",
    designer: "Marek Reichman",
    history: "Bond's car for the Daniel Craig reboot. It debuted in Casino Royale (2006) — where it set a world record with seven cannon-assisted barrel rolls — and returned battle-scarred in Quantum of Solace's opening chase. Carbon panels and ceramic brakes made it the hardcore DB9.",
    movies: ["Casino Royale (2006)", "Quantum of Solace (2008)"],
    funFacts: ["The Casino Royale crash set a Guinness World Record: seven full barrel rolls, launched by a nitrogen cannon behind the driver's seat.", "In the film's glovebox: a Medipac and Bond's Walther — the DBS badge appeared before the road car launched."],
    tech: "Carbon-fibre bonnet, boot and wings; carbon-ceramic brakes standard — Aston's first.",
    game: { speed: 8, accel: 8, handling: 8, color: "#454f54" }
  },
  {
    id: "one77", name: "Aston Martin One-77", years: "2009–2012", era: "Gaydon Era",
    category: "Hypercar", engine: "7.3L V12 (Cosworth-developed)", power: "750 hp",
    topSpeed: "220 mph", zeroSixty: "3.5 s", weight: "1,630 kg", production: "77",
    designer: "Marek Reichman",
    history: "Aston's first modern hypercar: 77 cars, each with a full carbon monocoque and a Cosworth-massaged 7.3-litre V12 that was the most powerful naturally aspirated production engine in the world at launch. Every body panel was hand-finished aluminium over carbon.",
    movies: [], funFacts: ["The 7.3 V12 was the world's most powerful naturally-aspirated production engine at launch.", "Each One-77's aluminium body took ~2,700 hours to craft."],
    tech: "Full carbon monocoque, pushrod inboard suspension, handcrafted alloy skin — art meets motorsport.",
    game: { speed: 9, accel: 9, handling: 8, color: "#6b7280" }
  },
  {
    id: "vulcan", name: "Aston Martin Vulcan", years: "2015–2016", era: "Modern",
    category: "Track", engine: "7.0L V12", power: "820 hp",
    topSpeed: "208+ mph", zeroSixty: "~2.9 s", weight: "1,350 kg", production: "24",
    designer: "Marek Reichman",
    history: "A track-only monster with no racing series to run in — built purely for the thrill of ownership. 820 naturally-aspirated horsepower, full carbon tub, and a flame-spitting side-exit exhaust. Owners received a driver-training program because the car was genuinely too fast for most of them.",
    movies: [], funFacts: ["Side-exhausts shoot visible flames on downshift — deliberately.", "A handful were later converted for road use by RML at ~£1.5m extra."],
    tech: "Carbon monocoque, integral roll cage, 50/50 driver-adjustable power maps: 550, 675, then full 820 hp.",
    game: { speed: 9, accel: 10, handling: 10, color: "#3fb54a" }
  },
  {
    id: "db10", name: "Aston Martin DB10", years: "2014", era: "Modern",
    category: "Concept", engine: "4.7L V8", power: "430 hp",
    topSpeed: "190 mph", zeroSixty: "~4.7 s", weight: "~1,600 kg", production: "10",
    designer: "Marek Reichman & Sam Holgate, with Sam Mendes",
    history: "The only car ever designed specifically for James Bond. Built exclusively for Spectre (2015) — just 10 made, 8 used in filming. Its design previewed the 2018 Vantage. One road-registered example sold for £2.4m for charity.",
    movies: ["Spectre (2015)"],
    funFacts: ["First car in history created solely for a film character.", "Gadgets in-film: flamethrower exhaust, ejector seat — used mid-chase through Rome."],
    tech: "V8 Vantage underpinnings beneath a bespoke body that previewed the next-generation Vantage design language.",
    game: { speed: 8, accel: 7, handling: 8, color: "#8a959c" }
  },
  {
    id: "db11", name: "Aston Martin DB11", years: "2016–2023", era: "Modern",
    category: "GT", engine: "5.2L twin-turbo V12 / 4.0L twin-turbo V8 (AMG)", power: "503–630 hp",
    topSpeed: "187–208 mph", zeroSixty: "3.6 s (AMR)", weight: "1,760 kg", production: "~10,000",
    designer: "Marek Reichman",
    history: "The first of the 'Second Century' Astons: new bonded-aluminium platform, first turbocharged Aston V12, and the start of the Mercedes-AMG partnership that supplied the V8 and electronics. The 'AeroBlade' channelled air through hidden ducts instead of a rear spoiler.",
    movies: [], funFacts: ["AeroBlade: air enters at the C-pillars and exits as a virtual spoiler through a slot in the bootlid.", "First all-new Aston V12 since 1999 — 5.2L with twin turbos."],
    tech: "AeroBlade virtual spoiler, curlicue front-wheel vents, AMG electrical architecture and V8 option.",
    game: { speed: 9, accel: 8, handling: 7, color: "#274e42" }
  },
  {
    id: "dbx", name: "Aston Martin DBX / DBX707", years: "2020–present", era: "Modern",
    category: "SUV", engine: "4.0L twin-turbo V8 (AMG)", power: "542–707 hp (707)",
    topSpeed: "193 mph (707)", zeroSixty: "3.1 s (707)", weight: "2,245 kg", production: "ongoing (St Athan, Wales)",
    designer: "Marek Reichman",
    history: "Aston's first SUV and now its best-seller, built in a new factory in Wales. The DBX707 was on launch the most powerful pure-combustion production SUV in the world, out-dragging most supercars while towing horseboxes. It also serves as the FIA F1 Medical Car.",
    movies: ["No Time to Die (2021) — briefly, DBX pre-production mule appearances in promo"],
    funFacts: ["DBX707: 707 PS made it the world's most powerful non-hybrid production SUV at launch.", "Serves as the official FIA Formula 1 Medical Car in AMR green."],
    tech: "Bespoke bonded-aluminium SUV platform (not shared), 48V active anti-roll, AMG wet-clutch 9-speed in the 707.",
    game: { speed: 8, accel: 8, handling: 6, color: "#00665e" }
  },
  {
    id: "valkyrie", name: "Aston Martin Valkyrie", years: "2021–present", era: "Modern",
    category: "Hypercar", engine: "6.5L NA V12 (Cosworth) + KERS hybrid", power: "1,160 hp combined",
    topSpeed: "~250 mph", zeroSixty: "~2.5 s", weight: "1,270 kg", production: "150 coupes + 85 Spiders + 40 AMR Pro",
    designer: "Adrian Newey & Marek Reichman",
    history: "The closest thing to a road-legal Formula 1 car ever made. Designed by F1's greatest aerodynamicist, Adrian Newey, with Red Bull Racing. Its Cosworth V12 revs to 11,100 rpm and alone makes 1,000 hp naturally aspirated. Underbody venturis generate more downforce than the car's weight. It returned Aston to Le Mans' top class in 2025.",
    movies: [], funFacts: ["The 6.5 V12 revs to 11,100 rpm — the highest-revving production road engine ever.", "Generates ~1,800 kg of downforce — more than the car weighs.", "Occupants' feet sit higher than their hips, F1-style; the seat is moulded to each owner."],
    tech: "Full carbon structure, F1-style pushrod/torsion suspension, teardrop cockpit, KERS hybrid from Rimac/Integral e-Drive.",
    game: { speed: 10, accel: 10, handling: 10, color: "#2e6b4f" }
  },
  {
    id: "vantage2018", name: "Vantage (2018) & V12 Speedster", years: "2018–2023", era: "Modern",
    category: "Sports", engine: "4.0L twin-turbo V8 / 5.2L TT V12 (V12 Vantage)", power: "503–700 hp",
    topSpeed: "195–200 mph", zeroSixty: "3.5 s", weight: "1,530 kg", production: "~8,000",
    designer: "Marek Reichman & Miles Nurnberger",
    history: "Born from the Bond DB10's design, the 2018 Vantage was Aston's aggressive small sports car with AMG V8 power and, uniquely in its class, an optional 7-speed manual (AMR). The final V12 Vantage of 2022 — 700 hp, 333 units — closed the V12-in-a-small-Aston chapter.",
    movies: [], funFacts: ["The manual AMR used a dogleg 7-speed — first gear down-and-left, race style.", "2022 V12 Vantage sold out before it was publicly revealed."],
    tech: "Electronic rear differential (e-diff) — a first for Aston, bonded aluminium structure, AMG 4.0 biturbo V8.",
    game: { speed: 8, accel: 8, handling: 9, color: "#b7d433" }
  },
  {
    id: "victor", name: "Aston Martin Victor", years: "2020", era: "Modern",
    category: "One-off", engine: "7.3L NA V12 (One-77 based)", power: "836 hp",
    topSpeed: "~200 mph", zeroSixty: "~3.5 s", weight: "~1,600 kg", production: "1",
    designer: "Q by Aston Martin (Marek Reichman)",
    history: "A one-of-one brute built by Q division: One-77 carbon chassis, its 7.3 V12 tuned to 836 hp, and — gloriously — a six-speed manual gearbox. Styled as a love letter to the 1977 V8 Vantage and the Muncher racer. The most powerful manual Aston ever.",
    movies: [], funFacts: ["836 hp through a 6-speed manual — the most powerful stick-shift Aston ever made.", "Named after Victor Gauntlett, the charismatic 1980s Aston chairman."],
    tech: "One-77 monocoque, Vulcan-derived aero and brakes, satin Pentland Green carbon body.",
    game: { speed: 9, accel: 9, handling: 9, color: "#1c3a2a" }
  },
  {
    id: "db12", name: "Aston Martin DB12", years: "2023–present", era: "Modern",
    category: "GT", engine: "4.0L twin-turbo V8 (AMG)", power: "671 hp",
    topSpeed: "202 mph", zeroSixty: "3.5 s", weight: "1,685 kg", production: "ongoing",
    designer: "Marek Reichman & Miles Nurnberger",
    history: "Billed as the world's first 'Super Tourer', the DB12 launched Aston's new era of in-house infotainment and vastly stiffer chassis tuning. No V12 this time — the 671 hp V8 outguns the old DB11 V12 anyway. Starred in the marketing blitz of Aston's F1-era revival under Lawrence Stroll.",
    movies: [], funFacts: ["First Aston with fully in-house-developed infotainment — ending the borrowed-Mercedes era.", "30% stiffer than DB11 with e-diff and adaptive Bilsteins."],
    tech: "Reworked bonded-aluminium platform, electronic LSD, 21-inch wheels, Michelin Pilot Sport 5 S with bespoke 'AML' marking.",
    game: { speed: 9, accel: 9, handling: 8, color: "#0b4f3f" }
  },
  {
    id: "vantage2024", name: "Vantage (2024)", years: "2024–present", era: "Modern",
    category: "Sports", engine: "4.0L twin-turbo V8 (AMG)", power: "656 hp",
    topSpeed: "202 mph", zeroSixty: "3.4 s", weight: "1,605 kg", production: "ongoing",
    designer: "Marek Reichman & Miles Nurnberger",
    history: "The most driver-focused series Vantage ever: 656 hp (a 30% jump), wider tracks, and chassis tuning benchmarked against the 911 Turbo. Doubles as the FIA F1 Safety Car, sharing duties with Mercedes.",
    movies: [], funFacts: ["Official FIA Formula 1 Safety Car — the green car leading the pack behind which champions grumble.", "Power jumped 153 hp over the outgoing base car in one generation."],
    tech: "Recalibrated AMG 4.0 biturbo with bespoke cams and compressors, e-diff, non-isolated steering column for feel.",
    game: { speed: 9, accel: 9, handling: 9, color: "#00594f" }
  },
  {
    id: "valhalla", name: "Aston Martin Valhalla", years: "2025–present", era: "Modern",
    category: "Hypercar", engine: "4.0L flat-plane TT V8 + 3 e-motors (PHEV)", power: "1,064 hp combined",
    topSpeed: "217 mph", zeroSixty: "2.5 s", weight: "1,655 kg", production: "999",
    designer: "Marek Reichman, aero with AM F1 team",
    history: "Aston's first series-production mid-engined car and first PHEV supercar: a flat-plane-crank AMG V8 plus three electric motors. Developed with input from the Aston Martin F1 team. Appeared (as an early concept) in No Time to Die's Q-branch lab.",
    movies: ["No Time to Die (2021) — concept cameo in Q's lab"],
    funFacts: ["First mid-engined series Aston and first with a dual-clutch gearbox.", "Can reverse using only its front electric motors — the gearbox has no reverse gear."],
    tech: "Carbon tub, 8-speed DCT with no reverse (e-motors handle it), F1-derived aero making 600+ kg downforce.",
    game: { speed: 10, accel: 10, handling: 9, color: "#3d5c50" }
  },
  {
    id: "amr23", name: "AMR23 / AMR24 (Formula 1)", years: "2023–present", era: "Modern",
    category: "Race", engine: "1.6L V6 turbo-hybrid (Mercedes PU)", power: "~1,000 hp",
    topSpeed: "~215 mph", zeroSixty: "~2.6 s", weight: "798 kg (min, with driver)", production: "n/a (works F1 team)",
    designer: "Dan Fallows era aero team; Adrian Newey joins 2025",
    history: "Aston Martin returned to Formula 1 as a works team in 2021 under Lawrence Stroll. The AMR23 gave Fernando Alonso six podiums in 2023. The team opened a new Silverstone campus, poached design legend Adrian Newey (from 2025), and switches to works Honda power in 2026.",
    movies: [], funFacts: ["Fernando Alonso took 6 podiums in the AMR23's first 8 races.", "Adrian Newey — designer of 12+ championship-winning F1 cars — joined Aston for 2025.", "Aston's only previous F1 attempt (1959-60, DBR4/DBR5) scored zero points."],
    tech: "Ground-effect floor, Mercedes hybrid PU, carbon monocoque, new AMR Technology Campus wind tunnel at Silverstone.",
    game: { speed: 10, accel: 10, handling: 10, color: "#00665e" }
  }
];

// ===== DAILY FACTS (rotate by day of year) =====
const FACTS = [
  "Aston Martin was founded in 1913 by Lionel Martin and Robert Bamford as 'Bamford & Martin'.",
  "The name comes from the Aston Clinton hillclimb in Buckinghamshire, where Lionel Martin raced successfully.",
  "Aston Martin has gone bankrupt seven times in its history — and survived every one.",
  "The famous wings badge, introduced in 1927, was inspired by the scarab beetle and Egyptomania of the 1920s.",
  "'DB' stands for David Brown, the tractor magnate who bought the company in 1947 for £20,500.",
  "Aston Martin won Le Mans outright in 1959 with the DBR1, driven by Carroll Shelby and Roy Salvadori.",
  "The DB5 has appeared in more James Bond films than any actor has played Bond.",
  "The 2020 DB5 Goldfinger Continuation cars cost £2.75m each and can't legally be driven on public roads.",
  "The Lagonda of 1976 had the world's first digital dashboard in a production car.",
  "Aston Martin's Gaydon HQ was its first purpose-built factory in the company's then-90-year history (2003).",
  "The One-77's 7.3L V12 was the most powerful naturally aspirated production engine in the world at launch.",
  "The Valkyrie's V12 revs to 11,100 rpm — the highest of any production road car in history.",
  "The Cygnet city car (2011) was a rebadged Toyota iQ, built to lower fleet CO2 averages. About 300 sold.",
  "Aston Martin builds the DBX SUV in St Athan, Wales — its first new factory location in decades.",
  "The current F1 Safety Car is an Aston Martin Vantage; the Medical Car is a DBX707.",
  "The 'Muncher' — a 1970 DBS V8 racer — got its nickname from eating brake pads at Le Mans.",
  "Aston Martin's Q division (named after Bond's quartermaster) builds one-off customer commissions like the Victor.",
  "James Bond author Ian Fleming actually put Bond in a DB Mark III in the Goldfinger novel — the film upgraded him to the DB5.",
  "Aston's 1980 Bulldog concept finally hit its 200 mph target in 2023 — 43 years after cancellation.",
  "The Vulcan's three power modes unlock 550, 675, and 820 hp as drivers earn trust in the car.",
  "In 1959 Aston Martin won the World Sportscar Championship — its only world title until the F1 project's ambitions.",
  "Every DB4, DB5 and DB6 body was hand-formed using Touring of Milan's Superleggera patent.",
  "Aston Martin listed on the London Stock Exchange in 2018 under the ticker 'AML'.",
  "The AMR Valkyrie Pro's downforce exceeds its own weight — it could theoretically drive upside down.",
  "Tadek Marek, a Polish engineer, designed both the legendary straight-six and the V8 that powered Astons for 30+ years.",
  "The DB10 was the first car in history designed exclusively for a movie character: James Bond in Spectre.",
  "Hand-trimming a single Aston interior takes around 50 hours; a One-77 body took ~2,700 hours.",
  "The 1935 Ulster team cars finished 3rd overall at Le Mans against cars with twice the engine size.",
  "Aston Martin Racing's Vantage GTE won its class at Le Mans in 2017 and 2020.",
  "Lawrence Stroll's consortium rescued Aston Martin in 2020 and rebranded the Racing Point F1 team as Aston Martin.",
  "The Victor one-off pays tribute to Victor Gauntlett, the 1980s chairman who once lent his own DB5 to a Bond film.",
  "Aston Martin returned to Le Mans' top Hypercar class in 2025 with the Valkyrie — the only NA V12 in the field.",
  "Prince (now King) Charles received his DB6 Volante for his 21st birthday; it now runs on wine-derived bioethanol.",
  "The 2018 Vantage AMR's 7-speed manual uses a race-style 'dogleg' first gear.",
  "Aston Martin's Newport Pagnell works built cars from 1955 to 2007 — now home to the Works Heritage division and continuation cars.",
  "A DBR1 sold for $22.5 million in 2017 — the most expensive British car ever sold at auction at the time.",
  "The wings badge has been redesigned eight times; the 2022 version was hand-drawn over 100+ hours.",
  "007's DB5 in No Time to Die used 8 replica stunt cars with BMW drivetrains for the Matera chase.",
  "The AeroBlade on the DB11 creates downforce with no visible spoiler — air exits through a slot in the bootlid.",
  "Aston Martin's 100th anniversary (2013) was celebrated with the CC100 Speedster concept, nicknamed 'DBR100'.",
  "The DBX707 was the world's most powerful non-hybrid production SUV at launch: 697 bhp / 707 PS.",
  "Zagato has collaborated with Aston Martin for over 60 years: DB4 GT Zagato (1960) through Vanquish Zagato (2016)."
];

// ===== QUIZ QUESTIONS =====
const QUIZ = [
  { q: "In which year was Aston Martin founded?", a: ["1913", "1921", "1907", "1935"], correct: 0 },
  { q: "What does 'DB' stand for in DB5, DB9, DB12?", a: ["David Brown", "Daniel Bond", "Double Barrel", "De Brooklands"], correct: 0 },
  { q: "Which Aston Martin won the 24 Hours of Le Mans outright in 1959?", a: ["DBR1", "DB4 GT", "Ulster", "DB3S"], correct: 0 },
  { q: "Which film first featured James Bond's DB5?", a: ["Goldfinger (1964)", "Dr. No (1962)", "Thunderball (1965)", "Casino Royale (2006)"], correct: 0 },
  { q: "How many One-77 hypercars were built?", a: ["77", "100", "50", "24"], correct: 0 },
  { q: "Who designed the Valkyrie's aerodynamics?", a: ["Adrian Newey", "Ian Callum", "Marek Reichman alone", "Gordon Murray"], correct: 0 },
  { q: "To what rpm does the Valkyrie's V12 rev?", a: ["11,100", "9,000", "8,500", "12,500"], correct: 0 },
  { q: "Which company's engine powers the modern Vantage and DB12 V8s?", a: ["Mercedes-AMG", "Ford", "Jaguar", "Cosworth (V8)"], correct: 0 },
  { q: "What was the first production car with a digital dashboard?", a: ["Aston Martin Lagonda", "DeLorean DMC-12", "Ferrari 400i", "Jaguar XJS"], correct: 0 },
  { q: "Which Aston was designed exclusively for a Bond film?", a: ["DB10", "DBS", "V8 Vantage", "Vanquish"], correct: 0 },
  { q: "How many times has Aston Martin gone bankrupt?", a: ["7", "2", "4", "Never"], correct: 0 },
  { q: "Where is the DBX SUV built?", a: ["St Athan, Wales", "Gaydon, England", "Newport Pagnell", "Cologne, Germany"], correct: 0 },
  { q: "Which car set a Guinness record with 7 barrel rolls in Casino Royale?", a: ["DBS", "DB9", "Vanquish", "Vantage"], correct: 0 },
  { q: "Who bought Aston Martin in 1947?", a: ["David Brown", "Ford", "Victor Gauntlett", "Lawrence Stroll"], correct: 0 },
  { q: "What is the Superleggera construction method?", a: ["Alloy panels over small tubes", "Carbon monocoque", "Steel unibody", "Wooden frame"], correct: 0 },
  { q: "Which engineer designed both Aston's classic straight-6 and V8?", a: ["Tadek Marek", "Ted Cutting", "Claude Hill", "W.O. Bentley"], correct: 0 },
  { q: "The 2024 Vantage serves as F1's official what?", a: ["Safety Car", "Medical Car", "Pace Car for IndyCar", "Course Car at Le Mans"], correct: 0 },
  { q: "Which Bond film features the V8 Vantage with skis and rockets?", a: ["The Living Daylights", "GoldenEye", "Octopussy", "A View to a Kill"], correct: 0 },
  { q: "What powered Bond's 'invisible' Aston in Die Another Day?", a: ["V12 Vanquish", "DB7 Vantage", "DBS", "Virage"], correct: 0 },
  { q: "How many DB4 GT Zagatos were originally built?", a: ["19", "77", "25", "100"], correct: 0 },
  { q: "The Valhalla's gearbox has no reverse gear. How does it back up?", a: ["Front electric motors", "It can't", "Driver pushes", "Separate reverse box"], correct: 0 },
  { q: "Which Aston hit its 200mph target 43 years late, in 2023?", a: ["Bulldog", "Atom", "Vulcan", "One-77"], correct: 0 },
  { q: "What was Aston's baby city car of 2011 called?", a: ["Cygnet", "Signet", "Sprite", "Colibri"], correct: 0 },
  { q: "Who rescued Aston Martin in 2020 and leads its F1 era?", a: ["Lawrence Stroll", "Elon Musk", "Andy Palmer", "Bernie Ecclestone"], correct: 0 },
  { q: "Which driver took 6 podiums in the AMR23's first 8 races?", a: ["Fernando Alonso", "Lance Stroll", "Sebastian Vettel", "Lewis Hamilton"], correct: 0 },
  { q: "The name 'Aston' comes from what?", a: ["Aston Clinton hillclimb", "Aston Villa FC", "A village in Kent", "Founder's middle name"], correct: 0 },
  { q: "What colour is traditionally associated with Aston Martin racing?", a: ["British Racing / AMR Green", "Blue", "Silver", "Red"], correct: 0 },
  { q: "Which 90s Aston was the world's most powerful production car at launch?", a: ["Vantage V550/V600", "DB7", "Virage base", "V8 Zagato"], correct: 0 },
  { q: "How much downforce can the Valkyrie generate?", a: ["~1,800 kg — more than its weight", "~500 kg", "~200 kg", "None, it's a GT"], correct: 0 },
  { q: "Ian Callum designed which pivotal 1994 Aston?", a: ["DB7", "DB9", "Vanquish", "Virage"], correct: 0 }
];

// ===== HISTORY TIMELINE (grouped into eras; img = car id for the card photo) =====
const TIMELINE = [
  { era: "The Founding Years · 1913–1946", year: "1913", title: "Founded", img: "a3", text: "Lionel Martin and Robert Bamford establish Bamford & Martin Ltd in London, selling and tuning Singer cars." },
  { era: "The Founding Years · 1913–1946", year: "1915", title: "First 'Aston Martin'", img: "a3", text: "The first car to bear the name — 'Coal Scuttle' — is built. WWI halts production immediately." },
  { era: "The Founding Years · 1913–1946", year: "1921", title: "A3 & Brooklands records", img: "a3", text: "Early cars race at Brooklands; A3 (the oldest survivor today) sets 1.5-litre records." },
  { era: "The Founding Years · 1913–1946", year: "1927", title: "The wings", img: "ulster", text: "The winged badge debuts under new owners; Bert Bertelli builds Aston's sporting reputation." },
  { era: "The Founding Years · 1913–1946", year: "1935", title: "Le Mans glory", img: "ulster", text: "Ulster team cars take 3rd overall and the class win at Le Mans." },
  { era: "The Founding Years · 1913–1946", year: "1939", title: "The Atom", img: "atom", text: "Claude Hill's radical spaceframe concept keeps the flame alive through the war — and seduces a buyer." },

  { era: "The David Brown Era · 1947–1972", year: "1947", title: "Enter David Brown", img: "db2", text: "Tractor tycoon David Brown buys Aston Martin (£20,500) and Lagonda (£52,500) — 'DB' is born." },
  { era: "The David Brown Era · 1947–1972", year: "1950", title: "DB2", img: "db2", text: "First proper DB grand tourer, with the W.O. Bentley-designed Lagonda six." },
  { era: "The David Brown Era · 1947–1972", year: "1959", title: "World champions", img: "dbr1", text: "DBR1 wins Le Mans outright and the World Sportscar Championship — Aston's greatest racing year." },
  { era: "The David Brown Era · 1947–1972", year: "1958", title: "DB4 & Superleggera", img: "db4", text: "Touring of Milan's featherweight body and Tadek Marek's new six create the definitive Aston shape." },
  { era: "The David Brown Era · 1947–1972", year: "1963", title: "DB5", img: "db5", text: "The most famous car in the world arrives; Goldfinger (1964) makes it immortal." },
  { era: "The David Brown Era · 1947–1972", year: "1967", title: "The DBS & the V8", img: "dbs1967", text: "William Towns' sharp DBS ends the Italian line; Marek's V8 arrives in 1969." },

  { era: "Survival & V8 Muscle · 1972–1993", year: "1972", title: "Brown sells", img: "lagonda", text: "David Brown sells; the 70s bring repeated financial crises — and the outrageous Lagonda saloon." },
  { era: "Survival & V8 Muscle · 1972–1993", year: "1977", title: "Britain's supercar", img: "v8vantage77", text: "V8 Vantage: 170 mph muscle from Newport Pagnell." },
  { era: "Survival & V8 Muscle · 1972–1993", year: "1980", title: "Bulldog", img: "bulldog", text: "The 200 mph wedge that nearly was — cancelled, then vindicated 43 years later." },
  { era: "Survival & V8 Muscle · 1972–1993", year: "1987", title: "Ford arrives", img: "v8vantage77", text: "Ford takes a stake (full control 1994), funding survival; Bond returns in The Living Daylights." },
  { era: "Survival & V8 Muscle · 1972–1993", year: "1993", title: "V600 monster", img: "virage", text: "The twin-supercharged Vantage becomes the world's most powerful production car." },

  { era: "Rebirth · 1994–2015", year: "1994", title: "DB7 saves the company", img: "db7", text: "Ian Callum's DB7 outsells every previous Aston combined." },
  { era: "Rebirth · 1994–2015", year: "2003", title: "Gaydon opens", img: "db9", text: "First purpose-built factory in company history; DB9 and the VH-platform era begin." },
  { era: "Rebirth · 1994–2015", year: "2006", title: "Craig-era Bond", img: "dbs2007", text: "Casino Royale's DBS sets a barrel-roll world record; Aston sold by Ford to a consortium (2007)." },
  { era: "Rebirth · 1994–2015", year: "2009", title: "One-77", img: "one77", text: "Aston enters the hypercar age: 77 cars, 750 hp, full carbon tub." },
  { era: "Rebirth · 1994–2015", year: "2013", title: "Centenary", img: "one77", text: "100 years celebrated with the CC100 Speedster; AMG technical partnership signed." },
  { era: "Rebirth · 1994–2015", year: "2015", title: "Vulcan & DB10", img: "vulcan", text: "A track-only 820 hp monster — and the first car ever designed solely for James Bond." },

  { era: "The Second Century · 2016–", year: "2016", title: "DB11", img: "db11", text: "New platform, first turbo V12, and the Red Bull deal that births the Valkyrie." },
  { era: "The Second Century · 2016–", year: "2018", title: "IPO", img: "vantage2018", text: "Aston Martin lists on the London Stock Exchange as the new Vantage lands." },
  { era: "The Second Century · 2016–", year: "2020", title: "Stroll rescue & DBX", img: "dbx", text: "Lawrence Stroll's consortium invests; first SUV launches from the new Welsh factory." },
  { era: "The Second Century · 2016–", year: "2021", title: "F1 returns", img: "amr23", text: "Aston Martin F1 Team returns after 61 years; Valkyrie deliveries begin." },
  { era: "The Second Century · 2016–", year: "2023", title: "Alonso's podiums & DB12", img: "db12", text: "AMR23 takes 8 podiums; DB12 opens the 'Super Tourer' era; new Silverstone campus opens." },
  { era: "The Second Century · 2016–", year: "2025", title: "Le Mans return & Newey", img: "valkyrie", text: "Valkyrie races in the Hypercar class at Le Mans; Adrian Newey starts as Managing Technical Partner. Honda works power arrives for F1 2026." }
];

// ===== TECH DEEP DIVES =====
const TECH = [
  { title: "Superleggera Construction", body: "Touring of Milan's patented 'super light' method: a skeleton of small-diameter steel tubes defines the body shape, and hand-formed aluminium panels are wrapped over it. Used on DB4, DB5, DB6. Result: strong, repairable, and far lighter than steel bodies of the era. The Superleggera name returned on the DBS Superleggera (2018) as a tribute." },
  { title: "VH Bonded-Aluminium Platform", body: "From DB9 (2003): extruded aluminium sections bonded with aerospace adhesive and self-piercing rivets rather than welds. 'Vertical/Horizontal' meant one flexible architecture stretched across DB9, Vantage, DBS, Rapide, Vanquish. Torsionally stiff, light, and buildable in low volumes — the spine of modern Aston Martin." },
  { title: "Tadek Marek's Engines", body: "Polish émigré engineer Tadek Marek designed the 3.7/4.0-litre straight six (DB4–DB6, DBS) and the 5.3-litre quad-cam V8 that ran from 1969 to 2000 — twin-supercharged to 600 hp by the end. Two engines, four decades, one man." },
  { title: "The Valkyrie Formula", body: "Adrian Newey's ground-effect road car: full carbon tub, F1-style keel and venturi tunnels generating up to ~1,800 kg downforce, Cosworth 6.5L V12 (1,000 hp NA at 11,100 rpm) plus a Rimac-supplied battery-KERS for 1,160 hp total. Torsion-bar pushrod suspension, screen-printed switchgear to save grams, and seats moulded to each owner's body." },
  { title: "AeroBlade Virtual Spoiler", body: "DB11's trick: intakes at the base of each C-pillar swallow air, duct it through the bodywork, and fire it upward from a slot across the bootlid — creating a curtain of air that acts as a spoiler with no visible wing. A small deployable lip assists at very high speed." },
  { title: "AMG Partnership", body: "Since 2013, Mercedes-AMG supplies the 4.0-litre twin-turbo V8 (M177) and electrical architecture in exchange for equity. Aston tunes its own induction, exhaust, sumps and mapping — DB12's 671 hp version out-powers any AMG application of the same engine. In-house infotainment arrived with DB12, ending borrowed Mercedes screens." },
  { title: "Q by Aston Martin", body: "The bespoke division (named after Bond's quartermaster). Two tiers: 'Collection' (extended materials/colours) and 'Commission' (full one-offs like the Victor, or the 'Goldfinger' DB5 Continuations with functioning gadget suites). Continuation cars are built at Newport Pagnell with a mix of original blueprints and modern CAD." },
  { title: "F1 Technology Transfer", body: "The Aston Martin Performance Technologies arm feeds F1 know-how into road cars: Valhalla's aero and torque-vectoring strategies were shaped with the F1 team, and the AMR Technology Campus wind tunnel at Silverstone runs road-car programs between F1 sessions." }
];

// ===== MOVIE APPEARANCES (master list) =====
const MOVIES = [
  { film: "Goldfinger", year: 1964, car: "DB5", carId: "db5", note: "The debut. Ejector seat, machine guns, and the most famous product placement in cinema history. Sean Connery's Bond receives the 'company car' from Q." },
  { film: "Thunderball", year: 1965, car: "DB5", carId: "db5", note: "The DB5 returns with rear water cannons in the opening sequence." },
  { film: "On Her Majesty's Secret Service", year: 1969, car: "DBS (1967)", carId: "dbs1967", note: "George Lazenby's Bond drives a gadget-free olive DBS; the film's devastating final scene takes place in it." },
  { film: "The Living Daylights", year: 1987, car: "V8 Vantage Volante / V8", carId: "v8vantage77", note: "Timothy Dalton's 'winterised' V8: outrigger skis, missiles, laser hubcaps, rocket boost, self-destruct." },
  { film: "GoldenEye", year: 1995, car: "DB5", carId: "db5", note: "Pierce Brosnan's DB5 races a Ferrari F355 through the hills above Monaco. Champagne chiller in the armrest." },
  { film: "Tomorrow Never Dies", year: 1997, car: "DB5", carId: "db5", note: "Brief return in Oxford." },
  { film: "Die Another Day", year: 2002, car: "V12 Vanquish", carId: "vanquish2001", note: "The 'Vanish': adaptive camouflage, ejector seat, target-seeking shotguns, ice-lake battle with a Jaguar XKR." },
  { film: "Casino Royale", year: 2006, car: "DBS + DB5", carId: "dbs2007", note: "Craig's Bond wins a 1964 DB5 in a poker game, then rolls his new DBS seven times — a Guinness World Record crash." },
  { film: "Quantum of Solace", year: 2008, car: "DBS", carId: "dbs2007", note: "Opening chase around Lake Garda's tunnels and quarries; the DBS arrives in Siena thoroughly ventilated." },
  { film: "Skyfall", year: 2012, car: "DB5", carId: "db5", note: "Bond takes M north in the Goldfinger DB5 — hidden machine guns intact. Its apparent destruction at Skyfall lodge broke hearts (a 3D-printed scale model was blown up)." },
  { film: "Spectre", year: 2015, car: "DB10 + DB5", carId: "db10", note: "The DB10, built solely for this film, duels a Jaguar C-X75 through Rome at night. The restored DB5 returns in the finale." },
  { film: "No Time to Die", year: 2021, car: "DB5, V8 Vantage, DBS Superleggera, Valhalla", carId: "v8vantage77", note: "Four Astons: the DB5's Matera gatling-gun siege, Bond's kept Living Daylights V8, Nomi's DBS Superleggera, and the Valhalla concept in Q's lab." },
  { film: "The Persuaders! (TV)", year: 1971, car: "DBS (as 'DBS V8')", carId: "dbs1967", note: "Roger Moore's Lord Brett Sinclair drives a Bahama Yellow DBS wearing V8 badges." },
  { film: "The Cannonball Run", year: 1981, car: "DB5", carId: "db5", note: "Roger Moore parodies his own Bond image driving a silver DB5." },
  { film: "James Bond video games", year: 0, car: "Various", carId: "vanquish2001", note: "DB5 and Vanquish star in GoldenEye 007, Everything or Nothing, and Agent Under Fire; modern Astons feature across Gran Turismo, Forza, and F1 games." }
];

// ===== PRICES & WHERE TO BUY =====
// Guide values only (mid-2026): classics move with the auction market, new-car
// prices vary by market and specification. Links are official channels first.
const BUY_LINKS = {
  dealers:  { label: "Official Dealer Locator", url: "https://www.astonmartin.com/en/dealers" },
  timeless: { label: "Aston Martin Timeless (certified pre-owned)", url: "https://preowned.astonmartin.com" },
  works:    { label: "Aston Martin Works — Heritage Sales", url: "https://www.astonmartinworks.com" },
  rm:       { label: "RM Sotheby's Auctions", url: "https://rmsothebys.com" },
  bonhams:  { label: "Bonhams Cars Auctions", url: "https://cars.bonhams.com" },
  market: (q) => ({ label: "Live market listings (Classic.com)", url: "https://www.classic.com/search?q=" + encodeURIComponent("Aston Martin " + q) })
};

const PRICING = {
  a3:            { value: "Not for sale — priceless", note: "Owned by the Aston Martin Heritage Trust and displayed at its museum in Oxfordshire.", links: [BUY_LINKS.works] },
  ulster:        { value: "≈ £1.5–3.5 million", note: "Genuine team cars command the top of that range at auction; 31 built, most survive.", links: [BUY_LINKS.rm, BUY_LINKS.bonhams, BUY_LINKS.market("Ulster")] },
  atom:          { value: "Not for sale — one-off", note: "Privately owned; surfaces at concours events. Effectively priceless company history.", links: [BUY_LINKS.works] },
  db2:           { value: "≈ £150,000–400,000", note: "Vantage-spec and Le Mans-history cars at the top; drivers-grade coupes from ~£150k.", links: [BUY_LINKS.works, BUY_LINKS.market("DB2"), BUY_LINKS.bonhams] },
  dbr1:          { value: "≈ $20–30 million", note: "DBR1/2 fetched $22.5m in 2017 — one of five, essentially museum-grade blue chip.", links: [BUY_LINKS.rm] },
  db4:           { value: "≈ £250,000–600,000", note: "Series I–V; GT-spec and matching-numbers restorations far higher.", links: [BUY_LINKS.works, BUY_LINKS.timeless, BUY_LINKS.market("DB4")] },
  db4gtz:        { value: "≈ £8–12 million", note: "19 originals. 2019 continuation cars (£6m+ as pairs with DBS GT Zagato) occasionally resell.", links: [BUY_LINKS.rm, BUY_LINKS.bonhams] },
  db5:           { value: "≈ £500,000–1.2 million", note: "Fine originals ~£700k; Goldfinger Continuation resales £2.75m+. Provenance is everything.", links: [BUY_LINKS.works, BUY_LINKS.market("DB5"), BUY_LINKS.rm] },
  db6:           { value: "≈ £250,000–500,000", note: "Volantes and Vantage-spec at the top; the 'affordable' classic DB — relatively.", links: [BUY_LINKS.works, BUY_LINKS.market("DB6")] },
  dbs1967:       { value: "≈ £80,000–250,000", note: "Six-cylinder cars cheapest; DBS V8 and OHMSS-style specs climbing fast.", links: [BUY_LINKS.works, BUY_LINKS.market("DBS 1970")] },
  v8vantage77:   { value: "≈ £250,000–550,000", note: "Proper 'flip-tail' V550 Vantages; X-Pack cars at a premium. Volantes higher still.", links: [BUY_LINKS.works, BUY_LINKS.market("V8 Vantage 1980"), BUY_LINKS.bonhams] },
  lagonda:       { value: "≈ £60,000–150,000", note: "Working electronics are the entire value question. Buy the best dashboard you can find.", links: [BUY_LINKS.market("Lagonda"), BUY_LINKS.bonhams] },
  bulldog:       { value: "Not for sale — one-off", note: "Privately owned, restored 2020–23. Insured value estimated well into eight figures.", links: [BUY_LINKS.works] },
  virage:        { value: "≈ £70,000–350,000", note: "Standard Virage from £70k; hand-built V550/V600 Vantages £250k+ and rising.", links: [BUY_LINKS.works, BUY_LINKS.market("Vantage V550")] },
  db7:           { value: "≈ £25,000–80,000", note: "The value entry to Aston ownership. V12 Vantage manuals and GT/GTA best; Zagatos exotic money.", links: [BUY_LINKS.timeless, BUY_LINKS.market("DB7")] },
  vanquish2001:  { value: "≈ £70,000–180,000", note: "2004+ Vanquish S most wanted; factory manual conversions carry a healthy premium.", links: [BUY_LINKS.timeless, BUY_LINKS.works, BUY_LINKS.market("Vanquish 2004")] },
  db9:           { value: "≈ £30,000–90,000", note: "Early coupes ~£30k (budget hero); late GT-spec cars near £90k. Buy on service history.", links: [BUY_LINKS.timeless, BUY_LINKS.market("DB9")] },
  v8vantage2005: { value: "≈ £30,000–200,000", note: "4.3 V8s from ~£30k; V12 Vantage S manual and GT8 collector-grade at the top.", links: [BUY_LINKS.timeless, BUY_LINKS.market("V8 Vantage 2007")] },
  dbs2007:       { value: "≈ £110,000–200,000", note: "Manual cars (fewer than 20% of production) command strong premiums.", links: [BUY_LINKS.timeless, BUY_LINKS.market("DBS 2010")] },
  one77:         { value: "≈ £1.5–2.5 million", note: "Trades privately and at flagship auctions; low-mileage cars at the top.", links: [BUY_LINKS.rm, BUY_LINKS.market("One-77")] },
  vulcan:        { value: "≈ £1.5–2.5 million", note: "24 cars; road-converted examples (RML) carry a premium. Sold via specialist dealers.", links: [BUY_LINKS.rm, BUY_LINKS.market("Vulcan")] },
  db10:          { value: "≈ £2.5 million+", note: "Only one of the ten was sold publicly (£2.4m, 2016, charity). The rest belong to EON/Aston.", links: [BUY_LINKS.rm] },
  db11:          { value: "≈ £70,000–140,000 used", note: "V8 coupes from ~£70k; AMR V12s toward the top. Depreciation has done its kind work.", links: [BUY_LINKS.timeless, BUY_LINKS.market("DB11")] },
  dbx:           { value: "From ≈ $250,000 / £190,000 new (DBX707)", note: "In production. Used early DBXs from ~£90k via Timeless.", links: [ { label: "DBX707 — Official Model Page", url: "https://www.astonmartin.com/en-us/models/dbx707" }, BUY_LINKS.dealers, BUY_LINKS.timeless] },
  valkyrie:      { value: "≈ £2.5–4 million (resale)", note: "All 275 sold out at ~£2.5m; resales trade above list. AMR Pro track cars similar money.", links: [ { label: "Valkyrie — Official Page", url: "https://www.astonmartin.com/en-us/models/aston-martin-valkyrie" }, BUY_LINKS.rm] },
  vantage2018:   { value: "≈ £60,000–250,000 used", note: "V8 coupes from ~£60k; 333-unit V12 Vantage holds ~£250k+. Manual AMRs collectible.", links: [BUY_LINKS.timeless, BUY_LINKS.market("Vantage 2019")] },
  victor:        { value: "Not for sale — one-off", note: "Q division commission for a single customer. Rumoured build cost north of £3m.", links: [ { label: "Q by Aston Martin", url: "https://www.astonmartin.com/en/q-by-aston-martin" } ] },
  db12:          { value: "From ≈ $250,000 / £185,000 new", note: "In production. Volante roughly £20k above coupe. Configure and order via dealers.", links: [ { label: "DB12 — Official Model Page", url: "https://www.astonmartin.com/en-us/models/db12" }, BUY_LINKS.dealers] },
  vantage2024:   { value: "From ≈ $195,000 / £165,000 new", note: "In production. Options escalate quickly — Q customization effectively uncapped.", links: [ { label: "Vantage — Official Model Page", url: "https://www.astonmartin.com/en-us/models/vantage-coupe" }, BUY_LINKS.dealers] },
  valhalla:      { value: "≈ $1.0–1.2 million", note: "999 units, effectively allocated. Speak to a dealer for allocation transfers.", links: [ { label: "Valhalla — Official Model Page", url: "https://www.astonmartin.com/en-us/models/valhalla" }, BUY_LINKS.dealers] },
  amr23:         { value: "Not for sale", note: "Current-era F1 machinery stays with the team; earlier show cars occasionally surface at auction.", links: [ { label: "Aston Martin F1 Team", url: "https://www.astonmartinf1.com" } ] }
};

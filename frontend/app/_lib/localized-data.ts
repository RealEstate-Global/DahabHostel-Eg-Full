import { tours, rooms, entranceFees, feeNotes, blogPosts, type Tour, type Room, type FeeGroup } from "@/app/_data";

type Locale = "en" | "ar" | "es" | "fr";

const TOUR_TRANSLATIONS: Record<string, Record<Locale, Partial<Tour>>> = {
  "giza-pyramids": {
    en: {
      title: "Giza Pyramids & Sphinx",
      cardTitle: "Giza Pyramids & Sphinx; Day trip (Very Popular)",
      duration: "Day trip",
      description: "The Giza Necropolis stands on the Giza Plateau, on the outskirts of Cairo, Egypt. The complex includes the three Great Pyramids and the massive Great Sphinx, 25 km southwest of Cairo city center. The Great Pyramid is the only remaining monument of the Seven Wonders of the Ancient World.",
      highlights: ["Giza Pyramids and Sphinx area", "Sakkara (The Step Pyramid) area", "Memphis Museum", "Dahshour (The Red Pyramid)"],
      inclusions: ["Full day trip transportation with a private car and English speaking driver", "Entrance fees to touristic sites (optional add-on)"],
      exclusions: ["Tourist guides are optional for an extra charge (English, French, Spanish and German available)", "Personal expenses and extras not mentioned"],
      notes: ["This tour starts early in the morning and ends in the afternoon.", "All sights open at 8:00 AM and close at 4:00 PM; times are flexible upon request."],
    },
    ar: {
      title: "أهرامات الجيزة وأبو الهول",
      cardTitle: "أهرامات الجيزة، سقارة ودهشور (الأكثر طلباً)",
      duration: "رحلة يوم كامل",
      description: "تقع أهرامات الجيزة الخالدة على هضبة الجيزة عند أطراف القاهرة. يضم المجمع الأهرامات الثلاثة الكبرى وتمثال أبو الهول الضخم. يُعد الهرم الأكبر العجيبة الوحيدة الباقية من عجائب الدنيا السبع القديمة.",
      highlights: ["منطقة أهرامات الجيزة وأبو الهول", "هرم سقارة المدرج والجبانة الملكية", "متحف ممفيس المفتوح (ميت رهينة)", "أهرامات دهشور (الهرم الأحمر والهرم المنحني)"],
      inclusions: ["انتقالات يوم كامل بسيارة خاصة حديثة ومكيفة مع سائق محترف", "توصيل واستقبال مباشر من مدخل الهوستل"],
      exclusions: ["تذاكر الدخول للمزارات الأثرية (تباع في شباك التذاكر)", "مرشد سياحي مرخص (متاح باللغات العربية والإنجليزية والفرنسية والإسبانية)", "المصاريف الشخصية والمشروبات"],
      notes: ["تبدأ الجولة في الصباح الباكر وتنتهي بعد الظهر.", "المواعيد مرنة حسب رغبة النزيل بالتنسيق مع الاستقبال."],
    },
    es: {
      title: "Pirámides de Giza y Esfinge",
      cardTitle: "Pirámides de Giza y Esfinge; Excursión de un día (Muy Popular)",
      duration: "Excursión de 1 día",
      description: "La necrópolis de Giza se encuentra en la meseta de Giza, a las afueras de El Cairo. El complejo incluye las tres Grandes Pirámides y la imponente Gran Esfinge. La Gran Pirámide es la única maravilla del mundo antiguo que aún perdura.",
      highlights: ["Zona de las Pirámides de Giza y la Esfinge", "Área de Saqqara (Pirámide Escalonada)", "Museo al aire libre de Menfis", "Pirámides de Dahshur (Pirámide Roja y Acodada)"],
      inclusions: ["Transporte de día completo en coche privado con aire acondicionado y chófer", "Recogida y regreso directamente en la recepción del hostel"],
      exclusions: ["Entradas oficiales a los monumentos", "Guía egiptólogo opcional (español, inglés, francés)", "Gastos personales y propinas"],
      notes: ["El tour comienza temprano por la mañana y finaliza a media tarde.", "Horarios flexibles previa solicitud en recepción."],
    },
    fr: {
      title: "Pyramides de Gizeh et Sphinx",
      cardTitle: "Pyramides de Gizeh & Sphinx ; Excursion journée (Très Populaire)",
      duration: "Excursion 1 jour",
      description: "La nécropole de Gizeh s'élève sur le plateau de Gizeh, aux portes du Caire. Le complexe comprend les trois grandes pyramides et le Sphinx majestueux. La Grande Pyramide est l'unique vestige des sept merveilles du monde antique.",
      highlights: ["Plateau des Pyramides de Gizeh et le Sphinx", "Nécropole de Saqqarah (Pyramide à degrés)", "Musée de Memphis", "Dahchour (Pyramide rouge et rhomboïdale)"],
      inclusions: ["Transport journée complète en véhicule privé climatisé avec chauffeur", "Prise en charge et retour à l'auberge"],
      exclusions: ["Billets d'entrée aux sites touristiques", "Guide conférencier en option (français, anglais, espagnol)", "Dépenses personnelles et pourboires"],
      notes: ["Départ tôt le matin et retour dans l'après-midi.", "Horaires flexibles sur simple demande à la réception."],
    },
  },
  "giza-grand-egyptian-museum": {
    en: {
      title: "Giza Pyramids & Grand Egyptian Museum",
      cardTitle: "Giza Pyramids & Grand Egyptian Museum (GEM)",
      duration: "Day trip",
      description: "Explore the ancient wonders of the Giza Plateau alongside the magnificent new Grand Egyptian Museum (GEM), housing the complete treasures of King Tutankhamun and thousands of masterworks.",
      highlights: ["Giza Plateau & Great Pyramids", "Grand Egyptian Museum grand halls & galleries", "Panoramic desert viewpoints"],
      inclusions: ["Private A/C transport", "Hotel pick-up & drop-off"],
      exclusions: ["GEM online admission tickets", "Optional guide"],
      notes: ["GEM tickets must be booked online in advance for allocated time slots."],
    },
    ar: {
      title: "أهرامات الجيزة والمتحف المصري الكبير",
      cardTitle: "أهرامات الجيزة والمتحف المصري الكبير (GEM)",
      duration: "رحلة يوم كامل",
      description: "استمتع بمشاهدة أهرامات الجيزة العظيمة إلى جانب زيارة المتحف المصري الكبير، أضخم متحف أثري في العالم يضم كنوز الملك الشاب توت عنخ آمون وروائع الحضارة المصرية.",
      highlights: ["هضبة الجيزة وأهرامات خوفو وخفرع ومنقرع", "الدرج العظيم وقاعات العرض بالمتحف المصري الكبير", "إطلالة بانورامية رائعة على الأهرامات"],
      inclusions: ["سيارة خاصة مكيفة مع سائق لليوم كاملاً", "التوصيل والاستقبال من الهوستل"],
      exclusions: ["تذكرة دخول المتحف الكبير (حجز إلكتروني مسبق)", "مرشد سياحي"],
      notes: ["تذاكر المتحف المصري الكبير تباع إلكترونياً فقط بفترات زمنية محددة، نساعدك في حجزها عند الطلب."],
    },
    es: {
      title: "Pirámides de Giza y Gran Museo Egipcio",
      cardTitle: "Pirámides de Giza y Gran Museo Egipcio (GEM)",
      duration: "Excursión de 1 día",
      description: "Combina la maravilla milenaria de las Pirámides de Giza con la visita al vanguardista Gran Museo Egipcio (GEM), que custodia los tesoros intactos de Tutankamón.",
      highlights: ["Pirámides de Giza y Gran Esfinge", "Gran Escalera y galerías del Gran Museo Egipcio", "Vistas panorámicas inolvidables"],
      inclusions: ["Transporte privado con aire acondicionado", "Recogida y regreso en el hostel"],
      exclusions: ["Entradas online al GEM", "Guía opcional"],
      notes: ["Las entradas al GEM son con reserva previa por franja horaria."],
    },
    fr: {
      title: "Pyramides de Gizeh & Grand Musée Égyptien",
      cardTitle: "Pyramides de Gizeh & Grand Musée Égyptien (GEM)",
      duration: "Excursion 1 jour",
      description: "Découvrez le plateau millénaire de Gizeh ainsi que le nouveau Grand Musée Égyptien (GEM), abritant le trésor intégral de Toutânkhamon.",
      highlights: ["Plateau de Gizeh et ses pyramides", "Grand escalier et galeries majeures du GEM", "Points de vue panoramiques"],
      inclusions: ["Transport privé climatisé avec chauffeur", "Aller-retour depuis l'auberge"],
      exclusions: ["Billets en ligne du musée GEM", "Guide optionnel"],
      notes: ["Les billets pour le GEM se réservent en ligne sur créneau horaire."],
    },
  },
  "islamic-coptic-cairo": {
    en: {
      title: "Islamic & Coptic Cairo",
      cardTitle: "Islamic & Coptic Cairo, Citadel & Khan El Khalili",
      duration: "Day trip",
      description: "Discover the multi-layered history of Cairo through its oldest churches, historic mosques, medieval fortress Citadel, and the legendary Khan El-Khalili bazaar.",
      highlights: ["Hanging Church & Coptic Cairo", "Citadel of Saladin & Mohamed Ali Mosque", "Khan El-Khalili historic souk", "Al-Azhar & Moez Street"],
      inclusions: ["Full day private car with driver", "Pick-up and return to hostel"],
      exclusions: ["Monument admission tickets", "Food and personal purchases"],
      notes: ["Modest dress is required for visiting active mosques and churches."],
    },
    ar: {
      title: "القاهرة الإسلامية والقبطية",
      cardTitle: "القاهرة الإسلامية والقبطية، القلعة وخان الخليلي",
      duration: "رحلة يوم كامل",
      description: "اكتشف تاريخ القاهرة العريق عبر زيارة مجمع الأديان والكنائس القديمة، قلعة صلاح الدين الأيوبي وجامع محمد علي، وشارع المعز وخان الخليلي الأسطوري.",
      highlights: ["الكنيسة المعلقة ومجمع الأديان بمصر القديمة", "قلعة صلاح الدين وجامع محمد علي باشا", "شارع المعز لدين الله الفاطمي", "سوق خان الخليلي العريق والقهوة الفيشاوي"],
      inclusions: ["انتقالات خاصة بسيارة مكيفة مع سائق لليوم كاملاً", "توصيل واستقبال من وإلى الهوستل"],
      exclusions: ["رسوم دخول المزارات", "الوجبات والمشتريات الشخصية"],
      notes: ["يُفضل ارتداء ملابس محتشمة ومريحة لزيارة المساجد والكنائس التاريخية."],
    },
    es: {
      title: "El Cairo Islámico y Copto",
      cardTitle: "El Cairo Islámico, Copto, Ciudadela y Jan el-Jalili",
      duration: "Excursión de 1 día",
      description: "Sumérgete en la historia viva de El Cairo recorriendo el barrio copto, la majestuosa Ciudadela de Saladino, la mezquita de Alabastro y el zoco de Jan el-Jalili.",
      highlights: ["Iglesia Colgante y barrio copto", "Ciudadela de Saladino y Mezquita de Mehmet Alí", "Calle Al-Muizz y Jan el-Jalili"],
      inclusions: ["Vehículo privado climatizado con chófer", "Traslado ida y vuelta al hostel"],
      exclusions: ["Entradas a monumentos", "Comidas y compras"],
      notes: ["Se recomienda ropa respetuosa para acceder a templos religiosos."],
    },
    fr: {
      title: "Le Caire Islamique et Copte",
      cardTitle: "Le Caire Islamique, Copte, Citadelle & Khan El Khalili",
      duration: "Excursion 1 jour",
      description: "Parcourez les siècles d'histoire cairote : les églises coptes anciennes, la citadelle de Saladin, la mosquée d'Albâtre et le célèbre souk Khan el-Khalili.",
      highlights: ["L'Église suspendue et quartier copte", "Citadelle de Saladin et mosquée Mohammed Ali", "Rue Al-Moez et souk Khan El Khalili"],
      inclusions: ["Voiture privée avec chauffeur toute la journée", "Prise en charge à l'auberge"],
      exclusions: ["Entrées des monuments", "Repas et achats personnels"],
      notes: ["Tenue respectueuse demandée pour la visite des lieux de culte."],
    },
  },
  "alexandria": {
    en: {
      title: "Alexandria Day Trip",
      cardTitle: "Alexandria, Pearl of the Mediterranean",
      duration: "Day trip",
      description: "Travel to the Mediterranean coast and explore the legacy of Alexander the Great: the Roman Catacombs of Kom El Shoqafa, Citadel of Qaitbay on the site of the ancient Pharos Lighthouse, and the modern Bibliotheca Alexandrina.",
      highlights: ["Catacombs of Kom El Shoqafa", "Pompey's Pillar", "Citadel of Qaitbay", "Bibliotheca Alexandrina & Corniche"],
      inclusions: ["Return private transportation from Cairo with English speaking driver", "Pick-up and drop-off at Dahab Hostel"],
      exclusions: ["Sightseeing entry tickets", "Seafood lunch at the Mediterranean coast"],
      notes: ["Early morning departure at 7:00 AM; approximately 2.5 hours drive each way."],
    },
    ar: {
      title: "رحلة الإسكندرية عروس المتوسط",
      cardTitle: "الإسكندرية، عروس البحر الأبيض المتوسط",
      duration: "رحلة يوم كامل",
      description: "انطلق في رحلة ساحلية رائعة إلى مدينة الإسكندرية لاكتشاف مقابر كوم الشقافة الرومانية، قلعة قايتباي في موقع فنار الإسكندرية القديم، ومكتبة الإسكندرية الحديثة وكورنيش البحر.",
      highlights: ["مقابر كوم الشقافة الأثرية", "عمود السواري الشهير", "قلعة قايتباي وإطلالة البحر المتوسط", "مكتبة الإسكندرية وكورنيش البحر"],
      inclusions: ["انتقالات ذهاب وإياب بسيارة خاصة مكيفة مع سائق من القاهرة للإسكندرية", "التوصيل والاستقبال من مدخل دهب هوستل"],
      exclusions: ["تذاكر دخول المعالم", "وجبة الغداء في مطاعم المأكولات البحرية على البحر"],
      notes: ["التحرك في تمام الساعة 7:00 صباحاً والعودة مساءً."],
    },
    es: {
      title: "Excursión a Alejandría",
      cardTitle: "Alejandría, La Perla del Mediterráneo",
      duration: "Excursión de 1 día",
      description: "Viaja a la costa mediterránea para conocer el legado grecorromano: las catacumbas de Kom el Shogafa, la fortaleza de Qaitbay erigida sobre el antiguo Faro y la moderna Biblioteca de Alejandría.",
      highlights: ["Catacumbas de Kom el Shogafa", "Columna de Pompeyo", "Ciudadela de Qaitbay", "Biblioteca de Alejandría y Corniche"],
      inclusions: ["Transporte privado ida y vuelta desde El Cairo", "Recogida y regreso en Dahab Hostel"],
      exclusions: ["Entradas a museos y fortalezas", "Almuerzo marinero"],
      notes: ["Salida a las 7:00 AM; unas 2 horas y media de trayecto por autopista."],
    },
    fr: {
      title: "Excursion à Alexandrie",
      cardTitle: "Alexandrie, La Perle de la Méditerranée",
      duration: "Excursion 1 jour",
      description: "Échappez-vous sur les rives méditerranéennes pour explorer les catacombes de Kom El Choqafa, la citadelle de Qaitbay érigée sur le site de l'ancien phare, et la Bibliothèque d'Alexandrie.",
      highlights: ["Catacombes de Kom El Choqafa", "Pilier de Pompée", "Citadelle de Qaitbay", "Bibliothèque et promenade maritime"],
      inclusions: ["Transport privé aller-retour depuis Le Caire avec chauffeur", "Prise en charge à Dahab Hostel"],
      exclusions: ["Billets d'entrée aux monuments", "Déjeuner de poissons au bord de mer"],
      notes: ["Départ tôt à 7h00 du matin, trajet d'environ 2h30 par sens."],
    },
  },
  "aswan-luxor-abu-simbel": {
    en: {
      title: "Aswan, Luxor & Abu Simbel",
      cardTitle: "Aswan, Luxor & Abu Simbel 4-Day Expedition",
      duration: "4 Days / 3 Nights",
      description: "The ultimate journey through Upper Egypt: the breathtaking rock temples of Abu Simbel, Philae Temple, Valley of the Kings, Karnak, and Luxor Temple with sleeper train or flight options.",
      highlights: ["Abu Simbel Sun Temples", "Philae Temple & High Dam in Aswan", "Valley of the Kings & Hatshepsut Temple in Luxor", "Karnak & Luxor Temples"],
      inclusions: ["All transfers in Upper Egypt with private vehicle", "Local transfers and tour coordination"],
      exclusions: ["Train/flight tickets from Cairo to Aswan and Luxor to Cairo", "Monument entrance fees"],
      notes: ["Hostel team assists with booking sleeper train or domestic flights."],
    },
    ar: {
      title: "أسوان، الأقصر وأبو سمبل",
      cardTitle: "رحلة أسوان، الأقصر وأبو سمبل (4 أيام / 3 ليالٍ)",
      duration: "4 أيام / 3 ليالٍ",
      description: "الرحلة الأروع في صعيد مصر: زيارة معبدي أبو سمبل العظيمين، معبد فيلة والسد العالي، وادي الملوك بالأقصر، معبد حتشبسوت، ومجمعي الكرنك ومعبد الأقصر.",
      highlights: ["معبدي رمسيس الثاني ونفرتاري في أبو سمبل", "معبد فيلة والسد العالي بأسوان", "وادي الملوك ومعبد حتشبسوت بالبر الغربي بالأقصر", "معبدي الكرنك والأقصر بالبر الشرقي"],
      inclusions: ["كافة الانتقالات بسيارات سياحية مكيفة خاصة في أسوان والأقصر", "رحلة أبو سمبل المشتركة أو الخاصة"],
      exclusions: ["تذاكر قطار النوم أو الطيران الداخلي", "تذاكر دخول المعالم الأثرية"],
      notes: ["يقوم فريق استقبال الهوستل بمساعدتك في حجز تذاكر القطار أو الطيران."],
    },
    es: {
      title: "Asuán, Luxor y Abu Simbel",
      cardTitle: "Expedición Asuán, Luxor y Abu Simbel (4 Días / 3 Noches)",
      duration: "4 Días / 3 Noches",
      description: "El viaje imprescindible por el Alto Egipto: los majestuosos templos excavados en la roca de Abu Simbel, el Templo de Isis en File, el Valle de los Reyes y los templos de Karnak y Luxor.",
      highlights: ["Templos de Abu Simbel", "Templo de File y Presa Alta en Asuán", "Valle de los Reyes y Hatshepsut en Luxor", "Karnak y Templo de Luxor"],
      inclusions: ["Todos los traslados en vehículo privado climatizado en Asuán y Luxor", "Excursión a Abu Simbel"],
      exclusions: ["Billetes de tren nocturno o vuelo desde El Cairo", "Entradas a templos"],
      notes: ["El hostel gestiona la reserva de tren cama o billetes de avión a petición."],
    },
    fr: {
      title: "Assouan, Louxor & Abou Simbel",
      cardTitle: "Expédition Assouan, Louxor & Abou Simbel (4 Jours / 3 Nuits)",
      duration: "4 Jours / 3 Nuits",
      description: "Le grand voyage en Haute-Égypte : les célèbres temples taillés dans la roche d'Abou Simbel, l'île de Philae, la Vallée des Rois, Karnak et Louxor.",
      highlights: ["Temples d'Abou Simbel", "Temple de Philae et haut barrage d'Assouan", "Vallée des Rois et temple d'Hatchepsout à Louxor", "Complexes de Karnak et Louxor"],
      inclusions: ["Tous les transferts en véhicule privé climatisé en Haute-Égypte", "Organisation de l'excursion Abou Simbel"],
      exclusions: ["Billets de train couchette ou vols intérieurs", "Billets d'entrée des sites"],
      notes: ["Notre équipe vous assiste pour réserver le train couchette ou les vols intérieurs."],
    },
  },
  "aswan-luxor-hostels-budget-trip": {
    en: {
      title: "Aswan & Luxor Budget Trip with Felucca",
      cardTitle: "Aswan, Luxor Hostels & Felucca Budget Adventure",
      duration: "3 Days / 2 Nights",
      description: "Experience the Nile the authentic backpacker way: overnight hostel stays in Aswan and Luxor, traditional Nile felucca sailing, and guided temple excursions tailored for budget travelers.",
      highlights: ["Traditional Nile felucca sailing", "Budget hostel accommodation in Aswan & Luxor", "Full temple sightseeing program"],
      inclusions: ["Hostel accommodation", "Felucca sailing tour", "Local transfers"],
      exclusions: ["Train tickets from Cairo", "Monuments tickets"],
      notes: ["Best choice for solo travelers and students seeking adventure on a budget."],
    },
    ar: {
      title: "رحلة أسوان والأقصر الاقتصادية مع الفلوكة",
      cardTitle: "مغامرة أسوان والأقصر الاقتصادية مع الفلوكة النيلية",
      duration: "3 أيام / ليلتان",
      description: "عش سحر النيل على طريقة الرحالة الحقيقيين: إقامة في هوستلز أسوان والأقصر، إبحار شاعري بالفلوكة الشراعية التقليدية في النيل، وجولات لكافة معابد الصعيد بأسعار مناسبة جداً.",
      highlights: ["إبحار شراعي تقليدي بالفلوكة في النيل", "إقامة في هوستلز شبابية بأسوان والأقصر", "جولات متكاملة لكافة المعابد التاريخية"],
      inclusions: ["الإقامة في هوستلز الشركاء", "جولة الفلوكة النيلية", "الانتقالات المحلية"],
      exclusions: ["تذاكر قطار السفر من القاهرة", "تذاكر المزارات"],
      notes: ["الخيار الأفضل للشباب والمسافرين المنفردين الباحثين عن مغامرة أصيلة وتكلفة اقتصادية."],
    },
    es: {
      title: "Viaje Económico Asuán y Luxor con Faluca",
      cardTitle: "Aventura Mochilera Asuán, Luxor y Faluca en el Nilo",
      duration: "3 Días / 2 Noches",
      description: "Siente el Nilo auténtico para mochileros: hostales colaboradores en Asuán y Luxor, navegación tradicional en faluca y visitas a los grandes templos a precio asequible.",
      highlights: ["Navegación tradicional en faluca por el Nilo", "Alojamiento en hostels seleccionados", "Visitas a los monumentos principales"],
      inclusions: ["Alojamiento en hostales", "Paseo en faluca", "Traslados locales"],
      exclusions: ["Billetes de tren desde El Cairo", "Entradas a monumentos"],
      notes: ["La opción preferida por mochileros y estudiantes."],
    },
    fr: {
      title: "Séjour Routard Assouan & Louxor en Félouque",
      cardTitle: "Aventure Routard Assouan, Louxor & Félouque sur le Nil",
      duration: "3 Jours / 2 Nuits",
      description: "Vivez l'aventure égyptienne au plus près des traditions : auberges partenaires à Assouan et Louxor, navigation en felouque traditionnelle et découverte des temples à prix doux.",
      highlights: ["Navigation en felouque traditionnelle sur le Nil", "Hébergements en auberges conviviales", "Programme complet des temples"],
      inclusions: ["Nuits en auberges", "Excursion en felouque", "Transferts locaux"],
      exclusions: ["Billets de train depuis Le Caire", "Entrées des sites"],
      notes: ["Le choix idéal pour les routards et voyageurs solos."],
    },
  },
  "bahareya-oasis-white-desert": {
    en: {
      title: "White Desert & Bahariya Oasis Safari",
      cardTitle: "Bahariya Oasis, White Desert & Black Desert 4x4 Safari",
      duration: "2 Days / 1 Night",
      description: "An unforgettable camping experience under a million stars in the surreal White Desert, featuring giant chalk rock sculptures, volcanic Black Desert cones, hot springs, and Bedouin dinner.",
      highlights: ["Chalk formations of the White Desert", "Volcanic mountains of the Black Desert", "Crystal Mountain & Agabat Valley", "Bedouin campfire BBQ & stargazing"],
      inclusions: ["4x4 safari jeep with experienced Bedouin driver", "Full board meals in the desert", "Camping gear (tents, mattresses, blankets)", "Round-trip transport from Cairo"],
      exclusions: ["National Park entrance fee", "Personal snacks & tipping"],
      notes: ["Warm clothing recommended for winter nights in the desert."],
    },
    ar: {
      title: "سفاري الصحراء البيضاء والواحات البحرية",
      cardTitle: "واحة البحرية، الصحراء البيضاء والسوداء بسيارات 4x4",
      duration: "يومان / ليلة واحدة",
      description: "تجربة تخييم خيالية لا تُنسى تحت ملايين النجوم في الصحراء البيضاء ذات الصخور الطباشيرية العجيبة، مع استكشاف الصحراء السوداء البركانية وجبل الكريستال وعشاء بدوي مشوي على الحطب.",
      highlights: ["تشكيلات الصخور الطباشيرية الساحرة في الصحراء البيضاء", "جبال وتلال الصحراء السوداء البركانية", "جبل الكريستال ووادي العقبات", "مخيم بدوي متكامل، عشاء مشوي وسهرة رصد النجوم"],
      inclusions: ["سيارة جيب لاندكروزر 4x4 مجهزة مع سائق ودليل بدوي محترف", "جميع الوجبات الطازجة خلال رحلة الصحراء", "أدوات التخييم الكاملة (خيام، فرش، بطاطين مريحة)", "الانتقالات ذهاباً وإياباً من القاهرة للهوستل"],
      exclusions: ["رسوم دخول محمية الصحراء البيضاء", "المصروفات الشخصية والإكراميات"],
      notes: ["يُنصح بإحضار ملابس دافئة لليالي الشتاء في الصحراء."],
    },
    es: {
      title: "Safari en el Desierto Blanco y Oasis de Bahariya",
      cardTitle: "Oasis de Bahariya, Desierto Blanco y Desierto Negro en 4x4",
      duration: "2 Días / 1 Noche",
      description: "Una noche mágica bajo el manto de estrellas del Desierto Blanco: esculturas de tiza esculpidas por el viento, conos volcánicos del Desierto Negro, fuentes termales y cena beduina al fuego.",
      highlights: ["Formaciones surrealistas del Desierto Blanco", "Paisajes volcánicos del Desierto Negro", "Montaña de Cristal y Valle de Agabat", "Campamento beduino tradicional bajo las estrellas"],
      inclusions: ["Vehículo 4x4 con conductor beduino experto", "Pensión completa en el desierto", "Equipo de acampada (tiendas, colchonetas y mantas)", "Transporte ida y vuelta desde El Cairo"],
      exclusions: ["Tasa del Parque Nacional", "Propinas y gastos personales"],
      notes: ["Llevar ropa de abrigo para las noches en el desierto."],
    },
    fr: {
      title: "Safari Désert Blanc & Oasis de Bahariya",
      cardTitle: "Oasis de Bahariya, Désert Blanc et Noir en 4x4",
      duration: "2 Jours / 1 Nuit",
      description: "Bivouaquez sous un ciel étoilé féerique au cœur du Désert Blanc et de ses silhouettes de craie blanche, traversez le Désert Noir et dégustez un repas bédouin traditionnel au feu de bois.",
      highlights: ["Formations calcaires féeriques du Désert Blanc", "Cônes volcaniques du Désert Noir", "Montagne de cristal et vallée d'Agabat", "Bivouac bédouin, feu de camp et dîner grillades"],
      inclusions: ["Safari en 4x4 avec chauffeur et guide bédouin", "Pension complète dans le désert", "Matériel de camping complet (tentes, matelas, duvets)", "Transport aller-retour depuis Le Caire"],
      exclusions: ["Droits d'entrée du Parc National", "Dépenses personnelles et pourboires"],
      notes: ["Prévoir des vêtements chauds pour la fraîcheur de la nuit."],
    },
  },
  "dahab-red-sea": {
    en: {
      title: "Dahab & Red Sea Coast",
      cardTitle: "Dahab (Red Sea) Snorkeling, Diving & Sinai Chill",
      duration: "3 Days / 2 Nights",
      description: "Escape to Dahab on the Gulf of Aqaba: world-class snorkeling at the Blue Hole, windsurfing, seaside restaurants, Mount Sinai sunrise hike, and Saint Catherine's Monastery.",
      highlights: ["The legendary Blue Hole & Canyon", "Mount Sinai sunrise hike (optional)", "Saint Catherine's Monastery", "Bohemian beachfront cafés"],
      inclusions: ["Bus tickets from Cairo to Dahab & return", "Accommodation in seaside Dahab camp/hotel", "Blue Hole snorkeling transfer"],
      exclusions: ["Diving equipment rental", "Meals and personal items"],
      notes: ["Dahab is the namesake sister destination of our hostel."],
    },
    ar: {
      title: "دهب وساحل البحر الأحمر",
      cardTitle: "دهب (البحر الأحمر) سنوركلينج، غوص وأجواء سيناء الساحرة",
      duration: "3 أيام / ليلتان",
      description: "اهرب إلى مدينة دهب الساحرة على خليج العقبة: سنوركلينج وغوص عالمي في البلو هول، كافيهات ومطاعم ممشى دهب على البحر مباشرة، وصعود جبل موسى عند شروق الشمس وزيارة دير سانت كاترين.",
      highlights: ["منطقة البلو هول الشهيرة عالمياً والكانيكون", "رحلة شروق الشمس على قمة جبل موسى (اختيارية)", "دير سانت كاترين التاريخي", "أجواء الاسترخاء والكافيهات البدوية على شاطئ البحر"],
      inclusions: ["تذاكر الأتوبيس السياحي ذهاباً وإياباً من القاهرة لدهب", "إقامة في كامب أو فندق شاطئي في دهب", "انتقالات جولة البلو هول للسنوركلينج"],
      exclusions: ["تأجير معدات الغوص المتخصصة", "الوجبات الإضافية والمصروفات الشخصية"],
      notes: ["مدينة دهب هي الملهمة والاسم الشقيق للهوستل الخاص بنا."],
    },
    es: {
      title: "Dahab y el Mar Rojo",
      cardTitle: "Dahab (Mar Rojo) Snorkel, Buceo y Relax en el Sinaí",
      duration: "3 Días / 2 Noches",
      description: "Escápate al paraíso costero de Dahab en el Golfo de Áqaba: snorkel en el Blue Hole, ambiente bohemio junto al mar, subida al Monte Sinaí al amanecer y Monasterio de Santa Catalina.",
      highlights: ["El célebre Blue Hole y el Cañón", "Subida al Monte Sinaí para ver el amanecer", "Monasterio de Santa Catalina", "Cafeterías y restaurantes frente al mar"],
      inclusions: ["Billetes de autobús ida y vuelta El Cairo - Dahab", "Alojamiento en campamento o hotel junto a la playa", "Traslado a la zona del Blue Hole"],
      exclusions: ["Alquiler de equipo de buceo con botella", "Comidas no especificadas"],
      notes: ["Dahab es la ciudad que da nombre a nuestro hostel."],
    },
    fr: {
      title: "Dahab & la Mer Rouge",
      cardTitle: "Dahab (Mer Rouge) Snorkeling, Plongée & Détente au Sinaï",
      duration: "3 Jours / 2 Nuits",
      description: "Découvrez la station balnéaire bohème de Dahab sur le golfe d'Aqaba : snorkeling réputé au Blue Hole, ascension du mont Sinaï au lever du soleil et monastère Sainte-Catherine.",
      highlights: ["Le fameux Blue Hole et le Canyon", "Ascension du mont Sinaï au lever du soleil", "Monastère Sainte-Catherine", "Cafés en bord de mer et ambiance relax"],
      inclusions: ["Billets de car aller-retour Le Caire - Dahab", "Hébergement en camp de bord de mer à Dahab", "Transfert pour le Blue Hole"],
      exclusions: ["Location de matériel de plongée autonome", "Repas et dépenses personnelles"],
      notes: ["Dahab a inspiré le nom de notre auberge au Caire."],
    },
  },
  "siwa-oasis": {
    en: {
      title: "Siwa Oasis Expedition",
      cardTitle: "Siwa Oasis, Salt Lakes & Great Sand Sea 4x4",
      duration: "3 Days / 2 Nights",
      description: "Journey deep into the Western Desert near the Libyan border to explore Siwa Oasis: mineral salt lakes where you float effortlessly, the Oracle Temple of Alexander the Great, Cleopatra's Bath, Shali fortress, and massive sand dunes.",
      highlights: ["Floating in the turquoise Salt Lakes", "Oracle Temple of Amun & Alexander the Great", "Sunset safari in the Great Sand Sea with sandboarding", "Shali medieval mud-brick fortress"],
      inclusions: ["Round-trip transport from Cairo", "Siwa eco-lodge accommodation", "4x4 Great Sand Sea safari with sandboarding"],
      exclusions: ["Admission tickets to historic sites", "Personal shopping (Siwan olive oil, dates & crafts)"],
      notes: ["One of Egypt's most untouched and peaceful paradises."],
    },
    ar: {
      title: "رحلة واحة سيوة الأسطورية",
      cardTitle: "واحة سيوة، بحيرات الملح وبحر الرمال الأعظم",
      duration: "3 أيام / ليلتان",
      description: "سافر إلى عمق الصحراء الغربية لاكتشاف واحة سيوة الساحرة: الطفو في بحيرات الملح الفيروزية، معبد آمون وتنبؤات الإسكندر الأكبر، عين كليوباترا الكبريتية، قلعة شالي القديمة وسفاري بحر الرمال والتزلج على الرمال.",
      highlights: ["السباحة والطفو في بحيرات الملح العلاجية الفيروزية", "معبد التنبؤات (الإسكندر الأكبر) وعين كليوباترا", "سفاري بحر الرمال العظيم والتزلج على الكثبان الرملية", "قلعة شالي القديمة وجبل الموتى"],
      inclusions: ["الانتقالات الكاملة ذهاباً وإياباً من القاهرة إلى سيوة", "الإقامة في إيكولودج أو فندق بواحة سيوة", "سفاري سيارات الدفع الرباعي 4x4 والتزلج على الرمال"],
      exclusions: ["تذاكر المزارات الأثرية", "المشتريات الشخصية من تمور وزيت زيتون سيوة الأصيل"],
      notes: ["تعتبر سيوة من أهدأ وأروع بقاع العالم وأكثرها سحراً ونقاءً."],
    },
    es: {
      title: "Expedición al Oasis de Siwa",
      cardTitle: "Oasis de Siwa, Lagos de Sal y Gran Mar de Arena",
      duration: "3 Días / 2 Noches",
      description: "Adéntrate en el desierto occidental hasta el legendario Oasis de Siwa: lagos de sal turquesa donde flotas sin esfuerzo, el Templo del Oráculo de Alejandro Magno, el Baño de Cleopatra y el Gran Mar de Arena.",
      highlights: ["Flotar en los lagos de sal cristalina", "Templo del Oráculo de Amón y Fuente de Cleopatra", "Safari 4x4 en el Gran Mar de Arena con sandboarding", "Fortaleza de arcilla de Shali y Montaña de los Muertos"],
      inclusions: ["Transporte ida y vuelta desde El Cairo", "Alojamiento ecológico en Siwa", "Safari 4x4 con tabla de arena"],
      exclusions: ["Entradas a sitios históricos", "Compras personales"],
      notes: ["Un remanso de paz y cultura amazigh bereber."],
    },
    fr: {
      title: "Expédition Oasis de Siwa",
      cardTitle: "Oasis de Siwa, Lacs Salés & Grand Erg en 4x4",
      duration: "3 Jours / 2 Nuits",
      description: "Plongez dans le désert occidental jusqu'à l'oasis de Siwa : flottaison dans les bassins de sel turquoise, temple de l'Oracle d'Alexandre le Grand, bain de Cléopâtre, forteresse de Shali et dunes géantes.",
      highlights: ["Baignade et flottaison dans les lacs de sel", "Temple de l'Oracle et bain de Cléopâtre", "Safari 4x4 dans la Grande Mer de Sable avec sandboard", "Forteresse de Shali et montagne des morts"],
      inclusions: ["Transport aller-retour depuis Le Caire", "Hébergement en éco-lodge à Siwa", "Safari 4x4 dans les dunes avec surf de sable"],
      exclusions: ["Billets des sites historiques", "Achats personnels"],
      notes: ["L'une des destinations les plus préservées et apaisantes d'Égypte."],
    },
  },
  "aswan-luxor-nile-cruise": {
    en: {
      title: "Aswan & Luxor Nile Cruise",
      cardTitle: "5-Star Nile Cruise between Aswan and Luxor",
      duration: "4 Days / 3 Nights",
      description: "Sail the timeless Nile aboard a 5-star cruise ship: explore Kom Ombo and Edfu temples along the river, combined with complete guided tours in both Aswan and Luxor with all meals included.",
      highlights: ["Kom Ombo Temple on the riverbank", "Edfu Temple of Horus by horse carriage", "Full Aswan & Luxor monument tours", "Full-board cruise ship accommodation"],
      inclusions: ["Cabin accommodation on 5-star Nile cruise ship", "All meals on board (breakfast, lunch, dinner)", "Sightseeing tours during cruise navigation"],
      exclusions: ["Domestic flights or trains from/to Cairo", "Monument entry tickets"],
      notes: ["Available starting from either Aswan or Luxor."],
    },
    ar: {
      title: "كروز النيل بين أسوان والأقصر",
      cardTitle: "كروز نايل 5 نجوم بين أسوان والأقصر مع الإقامة الشاملة",
      duration: "4 أيام / 3 ليالٍ",
      description: "أبحر في نهر النيل الخالد على متن باخرة نيلية 5 نجوم: استكشف معبدي كوم أمبو وإدفو على ضفاف النيل، بالتوازي مع جولات شاملة لآثار أسوان والأقصر مع إقامة كاملة شاملة جميع الوجبات.",
      highlights: ["معبد كوم أمبو المشيد على حافة النيل مباشرة", "معبد حورس بإدفو بعربة الحنطور التقليدية", "جولات متكاملة لآثار أسوان والأقصر", "إقامة فندقية فاخرة 5 نجوم مع وجبات الإفطار والغداء والعشاء"],
      inclusions: ["كابينة مجهزة على نايل كروز 5 نجوم", "جميع الوجبات الرئيسية على متن الباخرة (فطور، غداء، عشاء)", "الانتقالات والجولات السياحية طوال مسار الإبحار"],
      exclusions: ["تذاكر السفر بين القاهرة والصعيد (طيران أو قطار)", "تذاكر دخول المزارات"],
      notes: ["متاحة للبدء من أسوان أو من الأقصر حسب تفضيلك."],
    },
    es: {
      title: "Crucero por el Nilo Asuán y Luxor",
      cardTitle: "Crucero 5 Estrellas por el Nilo entre Asuán y Luxor",
      duration: "4 Días / 3 Noches",
      description: "Navega por las aguas del Nilo en un barco 5 estrellas: visita los templos de Kom Ombo y Edfu a orillas del río, combinados con las visitas guiadas en Asuán y Luxor con pensión completa.",
      highlights: ["Templo de Kom Ombo frente al Nilo", "Templo de Horus en Edfu", "Tours completos en Asuán y Luxor", "Alojamiento en crucero 5 estrellas con pensión completa"],
      inclusions: ["Camarote en barco crucero 5 estrellas", "Pensión completa a bordo (desayuno, almuerzo, cena)", "Excursiones durante la navegación"],
      exclusions: ["Billetes desde/hacia El Cairo", "Entradas a monumentos"],
      notes: ["Disponible con salida desde Asuán o desde Luxor."],
    },
    fr: {
      title: "Croisière sur le Nil Assouan & Louxor",
      cardTitle: "Croisière 5 Étoiles sur le Nil entre Assouan et Louxor",
      duration: "4 Jours / 3 Nuits",
      description: "Naviguez sur les eaux légendaires du Nil à bord d'un bateau 5 étoiles : découvrez les temples de Kôm Ombo et d'Edfou au fil de l'eau, et visitez tous les chefs-d'œuvre d'Assouan et de Louxor en pension complète.",
      highlights: ["Temple de Kôm Ombo au bord de l'eau", "Temple d'Horus à Edfou en calèche", "Visites guidées complètes à Assouan et Louxor", "Pension complète à bord"],
      inclusions: ["Cabine tout confort sur bateau de croisière 5 étoiles", "Tous les repas à bord (petit-déjeuner, déjeuner, dîner)", "Transferts et visites prévus lors de la navigation"],
      exclusions: ["Vols ou trains vers/depuis Le Caire", "Entrées aux monuments"],
      notes: ["Possibilité de départ depuis Assouan ou Louxor."],
    },
  },
  "aswan-luxor-hotels": {
    en: {
      title: "Aswan, Luxor & Abu Simbel Hotels Package",
      cardTitle: "Aswan, Luxor & Abu Simbel with 3/4-Star Hotels",
      duration: "4 Days / 3 Nights",
      description: "A comfortable hotel-based Upper Egypt tour for travelers who want private hotel rooms in Aswan and Luxor, complete sightseeing, and the Abu Simbel excursion.",
      highlights: ["Abu Simbel excursion", "Private hotel stays in Aswan & Luxor", "Full sightseeing program with private driver"],
      inclusions: ["Hotel accommodation with breakfast", "All ground transportation in Upper Egypt", "Abu Simbel excursion"],
      exclusions: ["Tickets from Cairo", "Monuments entrance fees"],
      notes: ["Tailored for families and couples desiring extra comfort."],
    },
    ar: {
      title: "باقة فنادق أسوان، الأقصر وأبو سمبل",
      cardTitle: "أسوان، الأقصر وأبو سمبل مع الإقامة بفنادق 3 أو 4 نجوم",
      duration: "4 أيام / 3 ليالٍ",
      description: "رحلة مريحة ومميزة في صعيد مصر تشمل الإقامة في فنادق راقية بأسوان والأقصر، مع جولات سياحية متكاملة لكافة المعالم الأثرية ورحلة معبدي أبو سمبل.",
      highlights: ["رحلة معبدي أبو سمبل الرائعة", "إقامة فندقية خاصة ومريحة في أسوان والأقصر مع الإفطار", "برنامج سياحي متكامل بسيارة خاصة مع سائق"],
      inclusions: ["الإقامة الفندقية مع وجبة الإفطار", "كافة الانتقالات البرية في الصعيد بسيارة سياحية مكيفة", "رحلة أبو سمبل"],
      exclusions: ["تذاكر السفر من القاهرة إلى الصعيد", "تذاكر دخول المزارات الأثرية"],
      notes: ["مثالية للعائلات والأزواج الباحثين عن راحة فندقية خاصة وبرنامج منظم."],
    },
    es: {
      title: "Paquete Hoteles Asuán, Luxor y Abu Simbel",
      cardTitle: "Asuán, Luxor y Abu Simbel con Hoteles 3/4 Estrellas",
      duration: "4 Días / 3 Noches",
      description: "Recorrido cómodo por el Alto Egipto con noches en hoteles seleccionados en Asuán y Luxor, traslados privados a los templos y la excursión a Abu Simbel.",
      highlights: ["Excursión a Abu Simbel", "Alojamiento en hoteles privados con desayuno", "Circuito completo de templos con chófer privado"],
      inclusions: ["Alojamiento de hotel con desayuno", "Todos los transportes privados en el Alto Egipto", "Excursión a Abu Simbel"],
      exclusions: ["Billetes desde El Cairo", "Entradas a sitios arqueológicos"],
      notes: ["Ideal para parejas y familias que buscan mayor confort."],
    },
    fr: {
      title: "Formule Hôtels Assouan, Louxor & Abou Simbel",
      cardTitle: "Assouan, Louxor & Abou Simbel avec Hôtels 3/4 Étoiles",
      duration: "4 Jours / 3 Nuits",
      description: "Un circuit confortable en Haute-Égypte comprenant l'hébergement en hôtel privé avec petit-déjeuner à Assouan et Louxor, les transferts privatifs et la visite d'Abou Simbel.",
      highlights: ["Excursion aux temples d'Abou Simbel", "Séjour en hôtel privé avec petit-déjeuner", "Programme complet de visites avec chauffeur"],
      inclusions: ["Nuits d'hôtel avec petit-déjeuner", "Tous les transferts terrestres en Haute-Égypte", "Excursion Abou Simbel"],
      exclusions: ["Billets de train/vol depuis Le Caire", "Entrées aux monuments"],
      notes: ["Recommandé pour les couples et familles privilégiant le confort."],
    },
  },
};

const ROOM_TRANSLATIONS: Record<string, Record<Locale, { name: string; description: string; price: string }>> = {
  "Bed in a Mixed 6 beds Dorm room": {
    en: { name: "Bed in a Mixed 6-bed Dorm", description: "Deluxe mixed dorm with private ensuite bathroom and A/C", price: "600 EGP" },
    ar: { name: "سرير في غرفة نوم مشتركة (6 أسرّة مختلطة)", description: "غرفة نوم مشتركة ديلوكس مع حمام خاص وتكييف هواء", price: "600 ج.م" },
    es: { name: "Cama en Dormitorio Mixto de 6 camas", description: "Dormitorio mixto deluxe con baño privado y aire acondicionado", price: "600 EGP" },
    fr: { name: "Lit en Dortoir Mixte de 6 lits", description: "Dortoir mixte confort avec salle de bain privée et climatisation", price: "600 EGP" },
  },
  "Deluxe Single; Ensuite": {
    en: { name: "Deluxe Single (Ensuite Bathroom)", description: "Private room with private ensuite bathroom and cooling fan", price: "1200 EGP" },
    ar: { name: "غرفة مفردة ديلوكس (بحمام خاص)", description: "غرفة خاصة لشخص واحد مع حمام خاص ومروحة", price: "1200 ج.م" },
    es: { name: "Individual Deluxe con Baño Privado", description: "Habitación individual con baño privado dentro y ventilador", price: "1200 EGP" },
    fr: { name: "Chambre Simple Deluxe (Bain Privé)", description: "Chambre individuelle avec salle de bain privée et ventilateur", price: "1200 EGP" },
  },
  "Single; Shared bathroom": {
    en: { name: "Single Room (Shared Bathroom)", description: "Standard private room with cooling fan and clean shared bathroom", price: "900 EGP" },
    ar: { name: "غرفة مفردة (حمام مشترك)", description: "غرفة خاصة مريحة لشخص واحد مع مروحة وحمام مشترك نظيف", price: "900 ج.م" },
    es: { name: "Individual Estándar (Baño Compartido)", description: "Habitación individual con ventilador y baño compartido limpio", price: "900 EGP" },
    fr: { name: "Chambre Simple (Bain Partagé)", description: "Chambre privée pour 1 personne avec ventilateur et salle de bain partagée", price: "900 EGP" },
  },
  "Deluxe Double; Ensuite": {
    en: { name: "Deluxe Double (Ensuite Bathroom)", description: "Spacious private room with private ensuite bathroom and A/C", price: "1800 EGP" },
    ar: { name: "غرفة مزدوجة ديلوكس (بحمام خاص)", description: "غرفة واسعة لشخصين مع سرير مزدوج أو سريرين، حمام خاص وتكييف", price: "1800 ج.م" },
    es: { name: "Doble Deluxe con Baño Privado", description: "Habitación amplia para 2 personas con baño privado y aire acondicionado", price: "1800 EGP" },
    fr: { name: "Chambre Double Deluxe (Bain Privé)", description: "Chambre spacieuse pour 2 personnes avec salle de bain privée et climatisation", price: "1800 EGP" },
  },
  "Double; Shared bathroom": {
    en: { name: "Double Room (Shared Bathroom)", description: "Standard private room with 2 single beds, cooling fan and shared bathroom", price: "1300 EGP" },
    ar: { name: "غرفة مزدوجة (حمام مشترك)", description: "غرفة خاصة لشخصين مع سريرين مفردين، مروحة وحمام مشترك نظيف", price: "1300 ج.م" },
    es: { name: "Doble Estándar (Baño Compartido)", description: "Habitación para 2 personas con 2 camas, ventilador y baño compartido", price: "1300 EGP" },
    fr: { name: "Chambre Double (Bain Partagé)", description: "Chambre standard pour 2 personnes avec 2 lits simples, ventilateur et bain partagé", price: "1300 EGP" },
  },
  "Deluxe 3-Bed; Ensuite": {
    en: { name: "Deluxe Triple (Ensuite Bathroom)", description: "Comfortable room for 3 guests with private ensuite bathroom and A/C", price: "2400 EGP" },
    ar: { name: "غرفة ثلاثية ديلوكس (بحمام خاص)", description: "غرفة تتسع لـ 3 أشخاص مع 3 أسرّة، حمام خاص وتكييف هواء", price: "2400 ج.م" },
    es: { name: "Triple Deluxe con Baño Privado", description: "Habitación para 3 personas con 3 camas, baño privado y aire acondicionado", price: "2400 EGP" },
    fr: { name: "Chambre Triple Deluxe (Bain Privé)", description: "Chambre pour 3 personnes avec 3 lits simples, salle de bain privée et climatisation", price: "2400 EGP" },
  },
  "3-Bed; Shared bathroom": {
    en: { name: "Triple Room (Shared Bathroom)", description: "Budget-friendly private room with 3 single beds and cooling fan", price: "1800 EGP" },
    ar: { name: "غرفة ثلاثية (حمام مشترك)", description: "غرفة اقتصادية تتسع لـ 3 أشخاص مع 3 أسرّة ومروحة وحمام مشترك نظيف", price: "1800 ج.م" },
    es: { name: "Triple Estándar (Baño Compartido)", description: "Habitación económica para 3 personas con ventilador y baño compartido", price: "1800 EGP" },
    fr: { name: "Chambre Triple (Bain Partagé)", description: "Chambre économique pour 3 personnes avec 3 lits simples et salle de bain partagée", price: "1800 EGP" },
  },
  "Female Dorm Room": {
    en: { name: "Female-Only Dorm Bed", description: "Safe and comfortable female-only dorm room with private bathroom and A/C", price: "600 EGP" },
    ar: { name: "سرير في غرفة نوم مشتركة للإناث فقط", description: "غرفة نوم آمنة ومريحة مخصصة للإناث فقط مع حمام خاص وتكييف", price: "600 ج.م" },
    es: { name: "Cama en Dormitorio Femenino", description: "Dormitorio exclusivo para mujeres con baño privado y aire acondicionado", price: "600 EGP" },
    fr: { name: "Lit en Dortoir Féminin", description: "Dortoir réservé aux femmes, calme et sécurisé avec salle de bain privée et climatisation", price: "600 EGP" },
  },
};

const BLOG_TITLES: Record<string, Record<Locale, string>> = {
  "Travelling to Egypt: Is it Safe?": {
    en: "Travelling to Egypt: Is it Safe?",
    ar: "السفر إلى مصر: هل هي وجهة آمنة للمسافرين؟",
    es: "Viajar a Egipto: ¿Es seguro?",
    fr: "Voyager en Égypte : Est-ce une destination sûre ?",
  },
  "Discover the Giza Pyramids": {
    en: "Discover the Giza Pyramids",
    ar: "دليل استكشاف أهرامات الجيزة وأبو الهول",
    es: "Descubre las Pirámides de Giza",
    fr: "Découvrir les Pyramides de Gizeh",
  },
  "Budget Travel Tips for Cairo": {
    en: "Budget Travel Tips for Cairo",
    ar: "أهم نصائح السفر الاقتصادي في القاهرة",
    es: "Consejos para viajar barato por El Cairo",
    fr: "Conseils pour voyager au Caire avec un petit budget",
  },
};

const FEE_GROUP_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  "Discover Giza with Us": {
    en: "Discover Giza with Us",
    ar: "اكتشف أهرامات الجيزة ومتاحفها معنا",
    es: "Descubre Giza con Nosotros",
    fr: "Découvrez Gizeh avec Nous",
  },
  "Discover the heart of Cairo's history": {
    en: "Discover the Heart of Cairo's History",
    ar: "اكتشف قلب تاريخ القاهرة الإسلامية والقبطية",
    es: "Descubre el Corazón Histórico de El Cairo",
    fr: "Découvrez le Cœur Historique du Caire",
  },
  "Uncover the secrets of Luxor, Aswan & Abu Simbel": {
    en: "Uncover the Secrets of Luxor, Aswan & Abu Simbel",
    ar: "أسرار معابد الأقصر، أسوان وأبو سمبل الخالدة",
    es: "Descubre los Secretos de Luxor, Asuán y Abu Simbel",
    fr: "Les Secrets de Louxor, Assouan & Abou Simbel",
  },
  "Come Sail into Alexandria's Timeless Charm": {
    en: "Come Sail into Alexandria's Timeless Charm",
    ar: "سحر مدينة الإسكندرية عروس البحر المتوسط",
    es: "Navega hacia el Encanto de Alejandría",
    fr: "Le Charme Intemporel d'Alexandrie",
  },
  "Experience the Chill Vibes of Dahab": {
    en: "Experience the Chill Vibes of Dahab",
    ar: "أجواء الاسترخاء والمغامرة في مدينة دهب",
    es: "Siente el Ambiente Relajado de Dahab",
    fr: "L'Ambiance Apaisante de Dahab",
  },
  "Discover Siwa with Us": {
    en: "Discover Siwa with Us",
    ar: "اكتشف واحة سيوة وبحيرات الملح معنا",
    es: "Descubre Siwa con Nosotros",
    fr: "Découvrez l'Oasis de Siwa avec Nous",
  },
  "Uncover the Magic of the White Desert": {
    en: "Uncover the Magic of the White Desert",
    ar: "سحر التخييم في محمية الصحراء البيضاء",
    es: "Descubre la Magia del Desierto Blanco",
    fr: "La Magie du Désert Blanc",
  },
};

const FEE_NOTES_TRANSLATIONS: Record<Locale, string[]> = {
  en: [
    "Entrance fees listed above are excluded and must be paid by card only at official site ticket offices.",
    "However, if you book a tour with us, cash payment options are available upon request.",
    "Grand Egyptian Museum (GEM) tickets are sold online only for dedicated time slots. We can assist with booking your tickets when joining our tour.",
  ],
  ar: [
    "أسعار تذاكر المزارات المذكورة أعلاه غير مشمولة في سعر الجولة ويتم دفعها بالبطاقة الائتمانية في شباك تذاكر كل موقع.",
    "ومع ذلك، عند حجز الجولة السياحية معنا، يمكن التنسيق للدفع نقداً حسب الرغبة.",
    "تذاكر المتحف المصري الكبير (GEM) تُباع إلكترونياً فقط بمواعيد مسبقة محددة؛ نقوم بمساعدتك في حجزها عند الانضمام لجولاتنا.",
  ],
  es: [
    "Las entradas oficiales no están incluidas y deben abonarse con tarjeta en las taquillas de los monumentos.",
    "No obstante, si reservas el tour con nosotros, disponemos de opciones de pago en efectivo.",
    "Las entradas al Gran Museo Egipcio (GEM) se venden únicamente online por franjas horarias. Te ayudamos a gestionarlas.",
  ],
  fr: [
    "Les billets d'entrée aux sites ne sont pas inclus et doivent être réglés par carte bancaire aux guichets officiels.",
    "Toutefois, en réservant votre excursion avec nous, des facilités de paiement en espèces sont possibles.",
    "Les billets pour le Grand Musée Égyptien (GEM) sont vendus exclusivement en ligne sur créneau horaire. Nous vous aidons pour la réservation.",
  ],
};

function validLocale(loc?: string): Locale {
  if (loc === "ar" || loc === "es" || loc === "fr") return loc;
  return "en";
}

/**
 * Returns all tours fully localized for the given language.
 */
export function getLocalizedTours(locale: string): Tour[] {
  const loc = validLocale(locale);
  return tours.map((tour) => {
    const translation = TOUR_TRANSLATIONS[tour.slug]?.[loc];
    if (!translation) return tour;
    return {
      ...tour,
      ...translation,
    };
  });
}

/**
 * Returns a single tour localized for the given language.
 */
export function getLocalizedTour(slug: string, locale: string): Tour | undefined {
  const loc = validLocale(locale);
  const base = tours.find((t) => t.slug === slug);
  if (!base) return undefined;
  const translation = TOUR_TRANSLATIONS[slug]?.[loc];
  if (!translation) return base;
  return {
    ...base,
    ...translation,
  };
}

/**
 * Returns all room rates cards fully localized.
 */
export function getLocalizedRooms(locale: string): Room[] {
  const loc = validLocale(locale);
  return rooms.map((room) => {
    const tr = ROOM_TRANSLATIONS[room.name]?.[loc];
    if (!tr) return room;
    return {
      ...room,
      name: tr.name,
      description: tr.description,
      price: tr.price,
    };
  });
}

/**
 * Returns all entrance fee groups localized.
 */
export function getLocalizedEntranceFees(locale: string): FeeGroup[] {
  const loc = validLocale(locale);
  return entranceFees.map((group) => {
    const translatedGroupName = FEE_GROUP_TRANSLATIONS[group.group]?.[loc] || group.group;
    return {
      ...group,
      group: translatedGroupName,
    };
  });
}

/**
 * Returns fee notes localized.
 */
export function getLocalizedFeeNotes(locale: string): string[] {
  const loc = validLocale(locale);
  return FEE_NOTES_TRANSLATIONS[loc] || FEE_NOTES_TRANSLATIONS.en;
}

/**
 * Returns blog posts localized.
 */
export function getLocalizedBlogPosts(locale: string) {
  const loc = validLocale(locale);
  return blogPosts.map((post) => ({
    ...post,
    title: BLOG_TITLES[post.title]?.[loc] || post.title,
  }));
}

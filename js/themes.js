// Situations the matcher recognises. Each keyword is a whole word/phrase;
// a trailing * means "starts with" (so "forgiv*" matches forgive, forgiveness…).
// `names` are ordered from most to least relevant. `w` lowers themes whose
// keywords are very common words.
const THEMES = [
  { id: "forgiveness", en: "Forgiveness & repentance", ur: "معافی اور توبہ",
    kw: ["forgiv*", "sin", "sins", "sinned", "sinning", "sinful", "mistake*", "wrong", "wrongdoing", "guilt*", "repent*", "regret*", "ashamed", "shame*", "tawba*", "tauba*", "toba", "istighfar", "sorry", "apologi*", "haram", "did something bad", "messed up", "lied", "lying", "cheated", "backbit*", "zina", "porn*", "relapse*", "fell back",
      "maafi", "maaf", "gunah*", "galti", "ghalti*", "ghalati", "sharminda*", "pachtawa", "pachta*",
      "معافی", "معاف", "گناہ*", "غلطی*", "توبہ", "شرمندہ*", "پچھتاوا", "پچھتا*", "استغفار", "ندامت", "خطا*", "جھوٹ"],
    names: ["ghaffar", "ghafur", "tawwab", "afuww", "rahim", "rahman", "halim", "rauf", "karim"] },

  { id: "rizq", en: "Provision & money", ur: "رزق اور مال",
    kw: ["rizq", "money", "poor", "poverty", "broke", "income", "salary", "wage*", "financ*", "afford*", "bills", "provision*", "sustenance", "livelihood", "wealth", "rich", "earn*", "expens*", "can't pay", "cant pay", "inflation", "food", "hungry", "hunger",
      "paisa", "paise", "paisay", "rozi", "rozgar", "ghurbat", "tangi", "tangdasti", "kamai", "tankhwah", "kharcha", "kharche", "gharib", "ghareeb",
      "رزق", "پیسہ", "پیسے", "پیسوں", "روزی", "غربت", "تنگی", "تنگدستی", "کمائی", "تنخواہ", "خرچ*", "مال", "دولت", "کھانا", "بھوک", "مہنگائی", "غریب*"],
    names: ["razzaq", "ghani", "mughni", "wahhab", "fattah", "karim", "basit", "wasi", "muqit", "barr", "qabid"] },

  { id: "debt", en: "Debt & loans", ur: "قرض",
    kw: ["debt*", "loan*", "owe", "owed", "owing", "borrow*", "lender", "creditor*", "interest", "riba", "mortgage", "installment*", "instalment*",
      "qarz*", "karz*", "udhaar", "udhar", "qist", "qistain",
      "قرض*", "ادھار", "قسط*", "سود"],
    names: ["mughni", "ghani", "razzaq", "fattah", "wakil", "qadir", "wasi"] },

  { id: "work", en: "Work, career & business", ur: "نوکری اور کاروبار",
    kw: ["job*", "work", "working", "career", "employ*", "unemploy*", "fired", "layoff", "laid off", "interview*", "promotion", "boss", "business*", "shop", "customer*", "client*", "startup", "deal", "contract", "hired", "hiring",
      "naukri", "nokri", "kaam", "karobar", "kaarobar", "dukaan", "dukan", "tarakki", "taraqqi", "berozgar",
      "نوکری", "ملازمت", "کاروبار", "دکان", "کام", "ترقی", "انٹرویو", "بے روزگار*", "بےروزگار*"],
    names: ["fattah", "razzaq", "wahhab", "rafi", "muizz", "qadir", "wakil", "alim", "hakim"] },

  { id: "health", en: "Illness & health", ur: "بیماری اور صحت",
    kw: ["sick*", "ill", "illness", "disease*", "health*", "pain*", "hospital*", "doctor*", "surgery", "operation", "cancer", "fever", "injur*", "heal*", "cure*", "medic*", "diagnos*", "treatment", "chronic", "disab*", "recover*", "ache*", "migraine", "diabet*", "covid", "tumor", "tumour",
      "bimar*", "beemar*", "sehat", "dard", "ilaaj", "ilaj", "shifa", "bukhar",
      "بیمار*", "صحت", "درد", "علاج", "شفا", "بخار", "ہسپتال", "اسپتال", "ڈاکٹر", "آپریشن", "مرض", "کینسر"],
    names: ["salam", "hafiz", "muhyi", "latif", "qawiyy", "rahman", "nafi", "hayy", "qayyum", "karim"],
    noteEn: "The Prophet ﷺ also called upon Allah as Ash-Shafi (The Healer) when visiting the sick:",
    noteUr: "نبی ﷺ بیمار کی عیادت پر اللہ کو الشافی (شفا دینے والا) کہہ کر یوں دعا فرماتے:",
    noteAr: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    noteSrc: "Sahih al-Bukhari" },

  { id: "fear", en: "Fear, anxiety & safety", ur: "خوف، گھبراہٹ اور حفاظت",
    kw: ["fear*", "afraid", "scared", "anxi*", "panic*", "worr*", "nervous", "unsafe", "safety", "safe", "danger*", "terrified", "phobia", "overthink*",
      "dar", "darr", "darta", "darti", "khauf", "khof", "ghabrahat", "ghabra*", "pareshan*", "preshan*", "fikr", "tension", "bechaini",
      "ڈر", "ڈرتا", "ڈرتی", "ڈر لگ*", "خوف*", "گھبراہٹ", "گھبرا*", "پریشان*", "فکر", "بے چینی", "بےچینی", "ٹینشن", "اندیشہ"],
    names: ["mumin", "salam", "hafiz", "wakil", "muhaymin", "waliyy", "mani", "latif", "qayyum", "kabir"] },

  { id: "sadness", en: "Sadness, grief & depression", ur: "غم، اداسی اور ڈپریشن",
    kw: ["sad", "sadness", "depress*", "grief", "griev*", "cry", "crying", "cried", "tears", "unhappy", "miserable", "empty", "numb", "sorrow*", "broken", "heavy heart", "tight chest",
      "udaas*", "udas*", "gham", "ghum", "dukh*", "rona", "ro raha", "ro rahi", "dil toota",
      "غم", "غمگین", "اداس*", "دکھ", "دکھی", "دکھوں", "رونا", "روتا", "روتی", "آنسو", "ڈپریشن", "ٹوٹ*"],
    names: ["jabbar", "latif", "wadud", "rahman", "rahim", "nur", "sabur", "basit", "salam", "qabid"] },

  { id: "lonely", en: "Loneliness & heartbreak", ur: "تنہائی اور دل ٹوٹنا",
    kw: ["lonely", "loneliness", "alone", "isolat*", "abandon*", "rejected", "rejection", "heartbreak*", "heartbroken", "breakup", "broke up", "betray*", "unloved", "no one", "nobody", "friendless", "no friends",
      "akela", "akeli", "tanha*", "tanhai", "dhoka", "dhokha", "bewafa*", "chhor diya", "chor diya",
      "اکیلا", "اکیلی", "تنہا*", "دھوکہ", "دھوکا", "دھوکے", "بے وفا*", "بےوفا*", "چھوڑ دیا", "ٹھکرا*"],
    names: ["wadud", "waliyy", "jabbar", "latif", "mujib", "sami", "jami", "rauf"] },

  { id: "guidance", en: "Guidance & decisions", ur: "ہدایت اور فیصلے",
    kw: ["confus*", "decide", "deciding", "decision*", "choice*", "choose", "choosing", "guidance", "guide", "which way", "lost", "direction", "istikhara*", "unsure", "don't know what to do", "dont know what to do", "dilemma", "path", "clarity", "doubt*",
      "faisla", "faisle", "uljhan", "rasta", "raasta", "hidayat", "samajh nahi",
      "فیصلہ", "فیصلے", "الجھن", "راستہ", "راستے", "ہدایت", "استخارہ", "سمجھ نہیں", "شک", "کنفیوز"],
    names: ["hadi", "rashid", "alim", "hakim", "khabir", "fattah", "nur", "latif"] },

  { id: "injustice", en: "Injustice & oppression", ur: "ظلم اور ناانصافی",
    kw: ["injustic*", "unjust*", "unfair*", "oppress*", "wronged", "treated badly", "bully*", "bullied", "abuse*", "abusive", "harass*", "exploit*", "discriminat*", "false accus*", "accused", "slander*", "court", "lawsuit", "justice", "my rights", "robbed", "scam*", "fraud",
      "zulm", "zalim", "na insafi", "nainsafi", "insaf", "haq mara", "ilzam", "adalat",
      "ظلم", "ظالم*", "ناانصافی", "نا انصافی", "انصاف", "حق مار*", "الزام", "بہتان", "عدالت", "مقدمہ", "فراڈ", "زیادتی"],
    names: ["adl", "hakam", "haqq", "muqsit", "shahid", "hasib", "wakil", "jabbar", "qahhar", "muntaqim", "aziz"] },

  { id: "protection", en: "Protection from enemies & evil", ur: "دشمن، نظرِ بد اور شر سے حفاظت",
    kw: ["enem*", "protect*", "harm*", "evil", "evil eye", "nazar", "magic", "sihr", "black magic", "jinn", "jealous*", "envy", "envious", "attack*", "threat*", "curse*", "shaitan", "shaytan", "satan",
      "dushman*", "jadu", "jaadu", "hasad", "jalan", "hifazat", "shar",
      "دشمن*", "نظر بد", "نظرِ بد", "نظر لگ*", "جادو", "سحر", "جن", "جنات", "حسد", "جلن", "حفاظت", "شر", "شیطان"],
    names: ["hafiz", "mani", "muhaymin", "qawiyy", "matin", "aziz", "qahhar", "salam", "mumin", "waliyy", "darr"] },

  { id: "patience", en: "Patience & hardship", ur: "صبر اور آزمائش",
    kw: ["patien*", "hardship*", "struggl*", "difficult*", "trial*", "tough", "hard time*", "suffer*", "endure", "burden*", "tired", "exhausted", "give up", "giving up", "calamit*", "problem*", "crisis",
      "sabr", "sabar", "mushkil*", "azmaish", "aazmaish", "takleef", "thak gaya", "thak gayi", "musibat",
      "صبر", "مشکل*", "آزمائش", "تکلیف", "مصیبت*", "تھک*", "بوجھ", "مسئلہ", "مسئلے", "مسائل"],
    names: ["sabur", "halim", "wakil", "latif", "fattah", "basit", "hakim", "qawiyy", "jabbar", "darr"] },

  { id: "strength", en: "Weakness & needing strength", ur: "کمزوری اور طاقت",
    kw: ["weak*", "strength", "strong", "powerless", "helpless", "can't do", "cant do", "courage", "energy", "motivat*", "lazy", "laziness", "procrastinat*",
      "kamzor*", "taqat", "taaqat", "himmat", "majboor", "majbur", "susti",
      "کمزور*", "طاقت", "ہمت", "مجبور*", "سستی", "کاہلی", "بے بس*", "بےبس*"],
    names: ["qawiyy", "matin", "qadir", "muqtadir", "aziz", "muqit", "hayy", "qayyum", "wakil"] },

  { id: "study", en: "Studies, exams & knowledge", ur: "تعلیم، امتحان اور علم",
    kw: ["exam*", "study", "studies", "studying", "student", "school", "universit*", "college", "test", "tests", "result*", "grade*", "learn*", "knowledge", "memori*", "hifz", "understand*", "focus*", "concentrat*", "admission*", "scholarship", "thesis", "degree",
      "imtihan", "imtehan", "parhai", "padhai", "ilm", "sabaq", "dakhla",
      "امتحان*", "پڑھائی", "علم", "حفظ", "سبق", "نتیجہ", "داخلہ", "اسکول", "سکول", "یونیورسٹی", "کالج", "پیپر*"],
    names: ["alim", "fattah", "hakim", "khabir", "rashid", "hadi", "wahhab", "nur", "latif"] },

  { id: "marriage", en: "Marriage & spouse", ur: "شادی اور رشتہ",
    kw: ["marr*", "spouse", "husband", "wife", "rishta*", "proposal", "engage*", "wedding", "nikah", "soulmate", "divorce*", "relationship",
      "shadi", "shaadi", "shohar", "biwi", "talaq", "mangni",
      "شادی", "رشتہ", "رشتے", "نکاح", "شوہر", "بیوی", "میاں", "طلاق", "منگنی", "جیون ساتھی"],
    names: ["wadud", "jami", "wahhab", "latif", "mughni", "karim", "salam", "rashid"] },

  { id: "children", en: "Children & having a child", ur: "اولاد",
    kw: ["child", "children", "kid", "kids", "baby", "babies", "pregnan*", "conceiv*", "infertil*", "miscarr*", "son", "daughter", "offspring", "ivf", "parenting",
      "aulad", "olad", "bacha", "bachay", "bachche", "beta", "beti", "hamal",
      "اولاد", "بچہ", "بچے", "بچوں", "بچی", "بیٹا", "بیٹی", "حمل", "حاملہ", "بانجھ*"],
    names: ["wahhab", "khaliq", "bari", "musawwir", "mubdi", "muhyi", "karim", "hafiz", "hadi"] },

  { id: "family", en: "Family conflict & reconciliation", ur: "خاندانی جھگڑے اور صلح", w: 0.8,
    kw: ["fight*", "argu*", "conflict*", "quarrel*", "family problem*", "family issue*", "toxic", "in-law*", "in law*", "reconcil*", "not talking", "not speaking", "estranged", "cut off", "upset with me", "angry with me",
      "jhagra", "jhagda", "larai", "ladai", "naraz*", "naraaz*", "sulah", "sulha", "susral", "baat nahi karte", "baat nahi karti",
      "جھگڑا", "جھگڑے", "لڑائی", "ناراض*", "صلح", "سسرال", "قطع تعلق", "بات نہیں کرت*", "گھریلو مسائل"],
    names: ["jami", "wadud", "salam", "halim", "latif", "mumin", "hadi", "afuww"] },

  { id: "lost", en: "Something lost or someone far away", ur: "کچھ کھو جانا یا کسی سے دوری",
    kw: ["lost", "missing", "can't find", "cant find", "misplac*", "stolen", "reunit*", "separated", "far away", "far from",
      "kho gaya", "kho gayi", "gum ho", "gumshuda", "mil nahi",
      "کھو*", "گم", "گمشدہ", "مل نہیں", "بچھڑ*", "جدا*", "دوری"],
    names: ["jami", "wajid", "hafiz", "hasib", "muhsi", "latif", "khabir", "alim", "muid"] },

  { id: "death", en: "Death & loss of a loved one", ur: "موت اور پیاروں کی جدائی",
    kw: ["death", "died", "dead", "die", "dying", "passed away", "funeral", "grave", "deceased", "janaza*", "loss of", "lost my", "widow*", "orphan*", "inherit*",
      "maut", "inteqal", "intiqal", "faut", "wafat", "qabar", "qabr", "yateem", "bewa",
      "موت", "انتقال", "فوت", "وفات", "جنازہ", "جنازے", "قبر", "یتیم", "بیوہ", "مرحوم*", "وراثت"],
    names: ["baqi", "rahim", "sabur", "warith", "muhyi", "baith", "jami", "hayy", "ghafur", "mumit", "akhir"] },

  { id: "despair", en: "Hopelessness & despair", ur: "ناامیدی اور مایوسی",
    kw: ["hopeless*", "despair*", "no hope", "lost hope", "no way out", "stuck", "worthless", "pointless", "nothing works", "nothing is working", "give up", "giving up",
      "mayoos*", "mayus*", "na umeed", "naumeed", "koi rasta nahi", "phans*",
      "مایوس*", "ناامید*", "نا امید*", "پھنس*", "بے کار", "کوئی راستہ نہیں"],
    names: ["rahman", "rahim", "fattah", "basit", "mujib", "karim", "wahhab", "nur", "latif", "jabbar", "badi"] },

  { id: "dua", en: "Wanting a dua answered", ur: "دعا کی قبولیت", w: 0.6,
    kw: ["dua*", "du'a*", "pray*", "answer*", "accept*", "not answered", "wish*", "hajat",
      "qabool", "qubool", "mangna", "mangta", "mangti", "mang raha", "mang rahi", "hajaat", "murad",
      "دعا*", "قبول*", "مانگ*", "حاجت*", "مراد", "التجا"],
    names: ["mujib", "sami", "basir", "karim", "wahhab", "dhuljalal", "hakim", "qadir", "latif"] },

  { id: "ego", en: "Pride, ego & showing off", ur: "تکبر، انا اور دکھاوا",
    kw: ["pride", "proud", "arrogan*", "ego", "egoistic", "show off", "showing off", "riya", "superior*", "boast*", "vanity", "selfish*",
      "takabbur", "ghuroor", "gharoor", "ana", "dikhawa", "kibr",
      "تکبر", "غرور", "انا", "دکھاوا", "ریا", "کبر", "گھمنڈ", "خود غرض*"],
    names: ["mutakabbir", "kabir", "azim", "aliyy", "mutaali", "jalil", "khafid", "mudhill", "haqq"] },

  { id: "honor", en: "Respect, honour & humiliation", ur: "عزت اور ذلت",
    kw: ["respect*", "honor*", "honour*", "humiliat*", "disrespect*", "insult*", "embarrass*", "reputation", "dignity", "status", "mocked", "mock*", "belittl*", "ridicul*",
      "izzat", "zillat", "beizzati", "be izzati", "bezti", "mazaq",
      "عزت", "ذلت", "بے عزتی", "بےعزتی", "توہین", "مذاق", "رسوا*", "شرمندگی"],
    names: ["muizz", "rafi", "mudhill", "khafid", "majid", "maajid", "jalil", "malikmulk", "hamid"] },

  { id: "unheard", en: "Feeling unseen or unheard", ur: "کوئی نہیں سنتا، کوئی نہیں سمجھتا",
    kw: ["unseen", "unheard", "no one listens", "nobody listens", "nobody understands", "no one understands", "misunderstood", "invisible", "ignored", "unappreciated", "no one cares", "nobody cares", "doesn't care", "dont care", "don't care",
      "koi nahi sunta", "koi nahi samajhta", "nazarandaz", "qadar nahi",
      "کوئی نہیں سنتا", "کوئی نہیں سمجھتا", "نظرانداز", "نظر انداز", "قدر نہیں", "کوئی پرواہ نہیں"],
    names: ["sami", "basir", "shahid", "alim", "khabir", "raqib", "latif", "shakur", "wadud"] },

  { id: "faith", en: "Weak faith & spiritual emptiness", ur: "کمزور ایمان اور روحانی خالی پن",
    kw: ["faith", "iman", "eeman", "imaan", "spiritual*", "far from allah", "distant from allah", "salah", "salat", "namaz", "quran", "heart is hard", "hardened", "not praying", "worship", "deen", "khushu", "waswas*", "whisper*",
      "emaan", "nimaz", "ibadat", "dil sakht", "waswasa", "wasway",
      "ایمان", "نماز", "دین", "عبادت", "قرآن", "دل سخت", "وسوسہ", "وسوسے", "اللہ سے دور", "روحانی"],
    names: ["hadi", "nur", "hayy", "muhyi", "quddus", "wadud", "tawwab", "waliyy", "qayyum"] },

  { id: "temptation", en: "Temptation & staying pure", ur: "نفس، خواہشات اور پاکیزگی",
    kw: ["tempt*", "desire*", "lust*", "urge", "urges", "purif*", "pure", "purity", "nafs", "resist*", "control myself", "bad habit*", "habit*", "addict*",
      "khwahish*", "buri aadat", "aadat", "pakeezgi",
      "نفس", "خواہش*", "بری عادت", "عادت", "پاکیزگی", "ہوس", "نشہ", "لت"],
    names: ["quddus", "tawwab", "raqib", "hafiz", "mani", "hadi", "qawiyy", "nur", "batin"] },

  { id: "travel", en: "Travel & journeys", ur: "سفر",
    kw: ["travel*", "trip", "journey", "flight", "flying", "plane", "driving", "road", "hajj", "umrah", "relocat*", "abroad", "immigra*", "visa",
      "safar", "musafir", "umra", "bahir mulk",
      "سفر", "مسافر", "حج", "عمرہ", "پرواز", "ویزا", "بیرون ملک"],
    names: ["hafiz", "wakil", "salam", "mumin", "muhaymin", "hadi", "latif"] },

  { id: "gratitude", en: "Gratitude & good news", ur: "شکر اور خوشی",
    kw: ["grate*", "thank*", "alhamdulillah", "blessed", "appreciat*", "happy", "joy", "good news", "succeed*", "succeeded", "achiev*",
      "shukr", "shukar", "khush", "khushi", "kamyab*",
      "شکر*", "الحمدللہ", "الحمد للہ", "خوش*", "کامیاب*", "نعمت*"],
    names: ["shakur", "hamid", "karim", "wahhab", "barr", "majid", "dhuljalal", "maajid", "rahman"] },

  { id: "anger", en: "Anger & resentment", ur: "غصہ اور کینہ",
    kw: ["anger", "angry", "rage", "temper", "furious", "irritat*", "frustrat*", "annoy*", "shout*", "yell*", "resent*", "hate", "hatred", "grudge", "revenge",
      "gussa", "ghussa", "gusa", "nafrat", "badla", "kina",
      "غصہ", "غصے", "نفرت", "بدلہ", "کینہ", "چڑچڑا*"],
    names: ["halim", "sabur", "afuww", "salam", "rauf", "ghafur", "wadud"] },

  { id: "overwhelmed", en: "Overwhelmed & out of control", ur: "حالات قابو سے باہر",
    kw: ["overwhelm*", "stress*", "pressure*", "out of control", "chaos", "too much", "burnout", "burnt out", "burned out", "uncertain*", "future",
      "qaboo", "kaboo", "mustaqbil", "bohat zyada",
      "دباؤ", "ذہنی دباؤ", "قابو", "بہت زیادہ", "مستقبل", "بے یقینی"],
    names: ["wakil", "qayyum", "wali", "hayy", "latif", "hasib", "malikmulk", "hakim", "malik", "muhaymin"] },

  { id: "freshstart", en: "A fresh start", ur: "نئی شروعات",
    kw: ["fresh start", "new start", "start over", "start again", "new beginning", "restart", "change my life", "new life", "rebuild*", "move on", "moving on", "second chance",
      "nayi shuruat", "naye sire", "zindagi badal*",
      "نئی شروعات", "نئے سرے", "زندگی بدل*", "نئی زندگی"],
    names: ["mubdi", "fattah", "muid", "badi", "khaliq", "muhyi", "tawwab", "nur"] },

  { id: "sleep", en: "Sleep & nightmares", ur: "نیند اور برے خواب",
    kw: ["sleep*", "insomnia", "nightmare*", "bad dream*", "can't sleep", "cant sleep",
      "neend", "nind", "bura khwab", "bure khwab",
      "نیند", "برا خواب", "برے خواب", "بے خوابی", "ڈراؤنے خواب"],
    names: ["salam", "hafiz", "mumin", "qayyum", "hayy", "muhaymin", "latif"] },

  { id: "hereafter", en: "Hereafter & accountability", ur: "آخرت اور حساب",
    kw: ["akhirah", "akhira", "hereafter", "afterlife", "judgement", "judgment", "day of judg*", "hell", "hellfire", "jahannam", "jannah", "jannat", "paradise", "heaven", "accountab*", "reckoning", "qiyamah", "qiyamat",
      "akhirat", "aakhirat", "qayamat", "dozakh", "hisab", "hisaab",
      "آخرت", "قیامت", "جنت", "جہنم", "دوزخ", "حساب", "اعمال", "عذاب"],
    names: ["afuww", "rahim", "hasib", "muhsi", "baith", "jami", "malik", "adl", "ghafur", "akhir"] },

  { id: "selfworth", en: "Self-image & self-worth", ur: "خود اعتمادی اور اپنی قدر",
    kw: ["ugly", "appearance", "my looks", "beauty", "beautiful", "body", "confiden*", "self-esteem", "self esteem", "self worth", "self-worth", "insecur*", "not good enough", "compar*", "skin", "weight",
      "khoobsurat", "khubsurat", "shakal", "shakl", "aitmaad", "etimad", "kamtari",
      "خوبصورت*", "شکل", "اعتماد", "خود اعتمادی", "احساس کمتری", "کمتری", "بدصورت"],
    names: ["musawwir", "khaliq", "bari", "badi", "muizz", "rafi", "wadud", "karim"] },

  { id: "barakah", en: "Blessings, barakah & opportunity", ur: "برکت، کشادگی اور مواقع",
    kw: ["barakah", "baraka", "barkat", "blessing*", "abundance", "expand*", "growth", "grow", "open doors", "opportunit*",
      "kushadgi", "mauqa",
      "برکت", "کشادگی", "وسعت", "موقع", "مواقع"],
    names: ["wasi", "basit", "barr", "karim", "wahhab", "ghani", "fattah", "majid"] },

  { id: "closeness", en: "Closeness to Allah", ur: "اللہ کا قرب",
    kw: ["closer to allah", "close to allah", "love allah", "love of allah", "know allah", "tawheed", "tawhid", "dhikr", "zikr", "remembrance", "draw near",
      "qurb", "tauheed",
      "قرب", "ذکر", "توحید", "اللہ کی محبت", "اللہ سے محبت", "اللہ کے قریب"],
    names: ["wadud", "waliyy", "ahad", "wahid", "samad", "awwal", "akhir", "zahir", "batin", "nur"] },

  { id: "dependence", en: "Depending on people", ur: "لوگوں پر انحصار", w: 0.8,
    kw: ["depend*", "rely*", "people pleas*", "approval", "let me down", "letting me down", "disappoint*", "needy", "favor*", "favour*",
      "sahara", "sahaara", "mohtaj", "mohtaaj",
      "سہارا", "محتاج*", "توقع*", "مایوس کیا"],
    names: ["samad", "ghani", "wakil", "ahad", "wahid", "hasib", "mughni"] },

  { id: "secrets", en: "Hidden matters & secrets", ur: "پوشیدہ معاملات اور راز", w: 0.8,
    kw: ["secret*", "hidden", "hide", "hiding", "nobody knows", "no one knows", "private", "expose*", "exposed", "conceal*", "find out",
      "raaz", "chupa", "chhupa", "parda", "pardah",
      "راز", "چھپا*", "چھپ*", "پردہ", "پوشیدہ", "کسی کو نہیں پتا"],
    names: ["batin", "khabir", "latif", "alim", "shahid", "zahir", "ghafur", "afuww"] },

  { id: "timing", en: "Delays & waiting", ur: "تاخیر اور انتظار",
    kw: ["delay*", "waiting", "wait", "late", "taking long", "too long", "timing", "when will", "running out", "getting old", "deadline",
      "der", "dair", "intezar", "intizar", "jaldi",
      "دیر", "انتظار", "جلدی", "تاخیر", "عمر نکل*"],
    names: ["muqaddim", "muakhkhir", "sabur", "hakim", "awwal", "akhir", "qadir", "latif"] },

  { id: "leadership", en: "Responsibility & leadership", ur: "ذمہ داری اور قیادت", w: 0.8,
    kw: ["responsib*", "leader*", "manag*", "team", "authority", "judge", "fair", "govern*", "teacher",
      "zimmedari", "zimmadari", "qayadat", "afsar",
      "ذمہ داری", "ذمہداری", "قیادت", "حکومت", "افسر", "ٹیم", "انتظام"],
    names: ["adl", "hakam", "muqsit", "wali", "hakim", "rashid", "malik", "haqq"] },

  { id: "home", en: "Home & shelter", ur: "گھر اور رہائش", w: 0.8,
    kw: ["house", "home", "rent", "landlord", "shelter", "homeless", "property", "land", "plot",
      "ghar", "makan", "kiraya", "zameen",
      "گھر", "مکان", "کرایہ", "کرائے", "زمین", "پلاٹ", "جائیداد"],
    names: ["razzaq", "wasi", "hafiz", "mughni", "karim", "salam", "malikmulk"] },
];

// Shown when nothing in the text is recognised — names suited to every situation.
const GENERAL_NAMES = ["rahman", "rahim", "wakil", "mujib", "latif", "karim", "fattah"];

// Self-harm phrases trigger a gentle support message above the results.
const CRISIS_KW = ["suicid*", "kill myself", "end my life", "end it all", "want to die", "don't want to live", "dont want to live", "self harm", "self-harm", "hurt myself",
  "khudkushi", "khud kushi", "marna chahta", "marna chahti", "jeena nahi",
  "خودکشی", "خود کشی", "مرنا چاہت*", "جینا نہیں", "زندگی ختم"];

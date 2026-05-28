const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const rawUsers = `
Vrushank Naik 	vrushanknaik9@gmail.com	prar62	8CSXlEW$
Atharv vhanshetti 	atharvvhanshetti8388@gmail.com	prar65	M@JdQ@me
Anuragh Talawar 	24u1000@students.git.edu	prar749	$k7Zb%Q1
Bikrant Mishra 	25u0881@students.git.edu	prar947	hmw3vjzs
ROHIT GAVADE	24u0636@students.git.edu	prar747	@6Bwd0ts
sarthak patil	patilsarthak265@gmail.com	prar759	Y8bv12n$
Tanmay Adhav	tanadhav@gmail.com	prar233	UrMunnJ%
Sammed patil	24u0220@students.git.edu	prar963	Ix5g3T%F
Aditya M Medar	24u0354@students.git.edu	prar114	VFXu@&5d
AMIT KUMBAR 	amitkumbar117@gmail.com	prar900	bU1w6w!T
T A Mohan Kumar 	24u0621@students.git.edu	prar973	#d4eFbST
Darshan M Tulajan 	24u0880@students.git.edu	prar89	*GWprLDo
Ayan Bijapuri 	ayanbujapuri@gmail.com	prar232	V0@U1Ise
Srujan Hannikeri 	24u1030@students.git.edu	prar351	6q6VXvmm
VIRAJ	virajmalage100@gmail.com	prar777	UXSx6*fr
Shounak kulkarni	24u0016@students.git.edu	prar357	mp#FyxUG
Girish Hadimani 	ghadimani145@gmail.com	prar181	uNJft8EA
Saee Patil	25u0484@students.git.edu	prar917	WzTN7LKj
Guru Hampannavar 	24u0622@students.git.edu	prar223	7$igK5*&
Aditi gudodagi	aditi23gud@gmail.com	prar441	Ko%r%PmQ
Bhagya Patil	24u0825@students.git.edu	prar976	Xhq1b4Kg
Anushka Ganamukhi 	25u0583@students.git.edu	prar372	v3hkgMR!
Aditya	24u0009@students.git.edu	prar24	nYhIilb3
Ritvik Rajesh Bilgeekar 	24u0687@students.git.edu	prar735	$2bJaq0V
Chetan Patil 	24u0609@students.git.edu	prar748	YiS@%@W4
Akul R Sanu 	24u0692@students.git.edu	prar596	TnNDuHoZ
Saee Patil	25u0484@students.git.edu	prar289	XFmWHWci
Madhushree 	24u0865@students.git.edu	prar66	zeXEFQ!9
Neha S Konnurmath 	25u0941@students.git.edu	prar366	8ne7A72w
Darshini  Patil 	24u0245@students.git.edu	prar20	fTLZi52c
Khushi Ravindra Majagavi 	24u0142@students.git.edu	prar565	c*@&xeWp
Vivek Khandekar 	khandekarvivek7483@gmail.com	prar858	Mdr#@V1m
Manasvi Jadhav	24u0527@students.git.edu	prar498	g8hPhY!P
Omkar Mandannavar 	omkarmandannavar@gmail.com	prar853	%v6yW6dN
Mariam 	25u0207@students.git.edu	prar230	4&dawWkX
Aditya Halijoli 	adityahalijoli8@gmail.com	prar685	5mVpW4jW
Sanjana badiger 	sanjanabadiger212005@gmail.com	prar218	eQSSu3Dx
Sarvadnya Kadolkar	sarvadnyakadolkar@gmail.com	prar981	xS#*0!l&
Mohammad Moiz Mehamud Khalifa 	24me409@students.git.edu	prar511	v3x6@$Ee
Atharv Kitwadkar	athyk4507@gmail.com	prar438	N201Fe3H
Chaitra Hiremath	24u0935@students.git.edu	prar906	7FXf5%w8
Shrivaths Kulkarni 	25u0621@students.git.edu	prar348	2BEf2MHG
Srushti 	24u0429@students.git.edu	prar968	8s80Ju8i
Prajwal Manoj 	24u0316@students.git.edu	prar826	p2DXdDB0
Akhilesh Jog	24u0590@students.git.edu	prar712	nLPE&WTz
Vedant Dongare 	24u0761@students.git.edu	prar212	fDLc4fjT
Pruthviraj Kori 	24u0136@students.git.edu	prar61	6VB1jzPC
Rahul Khemalapure 	24u0830@students.git.edu	prar706	e1bag%LZ
rohan patil	ronypatil2004@gmail.com	prar983	c#y@#Si8
Purva Naik	24u0818@students.git.edu	prar914	i4Gwbp5H
Ranjan Gore 	ranjangore227@gmail.com	prar709	ADlSK0Na
Nisarga Bairawadagi 	24u0899@students.git.edu	prar47	aQFS6$#6
Rajashekhar Talawar 	24u0758@students.git.edu	prar281	FTQeaJhx
Namita Dhadi 	24u0361@students.git.edu	prar567	PbKFtpx8
Aishwarya Kanase 	24u1011@students.git.edu	prar377	wkBlxRgP
Harsha Sarnobat	soharsha19@gmail.com	prar765	47hq$k5A
VIRAJ	virajmalage100@gmail.com	prar415	3St8ryiY
Namita Dhadi 	24u0361@students.git.edu	prar605	ZL0c2o85
Pravesh Shrivastava 	24u0128@students.git.edu	prar751	hVOVaDUA
Laxmikant kulkarni 	24u0596@students.git.edu	prar829	XD5Qk@On
Prajwal D Bhendigeri 	23u0444@students.git.edu	prar771	YZ4gpf*1
Naveen Kumar k 	24u0874@students.git.edu	prar676	M#nJY38O
Samarth Lohar 	samarthlohar7541@gmail.com	prar875	fWAxNqib
Sneha Jay Kulkarni 	23u0115@students.git.edu	prar391	*OAQ!loN
Nagesh	24me400@students.git.edu	prar349	$jLH%Wwy
Prithviraj Mahesh Desai 	23u0734@students.git.edu	prar227	VTc4lV@B
Vishwa Sulakhe 	23u0457@students.git.edu	prar787	%$fSIKfU
Ambika Kulkarni 	23u2680@students.git.edu	prar222	lFjnaVpg
Vivek Malavi	vivekmalavi0114@gmail.com	prar510	s8s5ZZ4F
Aryesha Kariappa Doddanaver 	25u0229@students.git.edu	prar792	OmkU0W@M
Pavan Kumar 	kambarp76@gmail.com	prar9	LOzQbuku
Francis Dsouza 	francodsouza10@gmail.com	prar669	bf$e7rps
Shreshtha Patil 	shreshthasp22@gmail.com	prar664	AUZdqm$m
Bhakti Desai 	25u0675@students.git.edu	prar30	cSGZ336g
Bhakti Kaluti 	24u0643@students.git.edu	prar122	QSrqxby0
Krishna Gaonkar 	24u0674@students.git.edu	prar475	KFNQ@BUB
Pradeep Mudasi 	24u0468@students.git.edu	prar576	IX9Sp$EP
Harshit Naikwadi 	harshitnaikwadi03@gmail.com	prar993	LJJeJam3
Mahananda Pujari 	mahanandapujari79@gmail.com	prar732	PoO5KovL
Yash Asode	yashasode255@gmail.com	prar112	q2tS%cvw
Rehan Sayed	24u0146@students.git.edu	prar999	hNigaDUA
Divya Talawar 	 24cs404@students.git.edu	prar111	@6BwD0tS
Srusti Vantagodi 	23u0802@students.git.edu 	prar100	KFnq@BU8
Rohit Sontakki 	23u0767@students.git.edu	prar199	$fSIcKfU
Harsh Arjunwadkar	24u0522@students.git.edu 	prar144	~$IGK5*&
Aryan A Nerali	24u0552@students.git.edu	prar188	KorPmQ
`;

const dialogues = [
  // 1. Sholay (1975)
  '"Kitne aadmi the?" (Gabbar Singh)',
  '"Jo darr gaya, samjho marr gaya." (Gabbar Singh)',
  '"Arrey o Sambha, kitna inaam rakhe hai sarkar hum par?" (Gabbar Singh)',
  '"Yeh haath humka de de Thakur!" (Gabbar Singh)',
  '"Basanti, in kutton ke saamne mat naachna." (Veeru)',
  '"Tumhara naam kya hai, Basanti?" (Jai)',
  '"Itna sannaata kyun hai, bhai?" (Rahim Chacha)',
  '"Loha garam hai, maar do hathoda!" (Jai)',
  '"Aadhe idhar jaao, aadhe udhar jaao... baaki hamare peeche aao." (Angrezon ke zamaane ke Jailor)',

  // 2. Dilwale Dulhania Le Jayenge (1995)
  '"Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita." (Raj)',
  '"Ja Simran ja, jee le apni zindagi." (Chaudhary Baldev Singh)',
  '"Raj, agar woh tumse pyaar karti hai toh woh palat ke dekhegi... palat... palat..." (Raj)',
  '"Koi bhi ullu ka pattha ek ladki ko dekhkar apna dil kho baithta hai... par woh mard hi kya jo ek ladki ki izzat na kare." (Raj)',
  '"Sapne dekho, zaroor dekho... bas unke poore hone ki shart mat rakho." (Simran)',
  '"Main ek Hindustani hoon, aur main jaanta hoon ki ek Hindustani ladki ki izzat kya hoti hai." (Raj)',
  '"Fail hona aur padhai na karna hamare khandaan ki parampara hai." (Raj)',
  '"Toh kya hua agar maine jhoot sirf tumse milne ke liye bola tha? Par mera pyaar toh sachha tha." (Raj)',
  '"Main aa raha hoon Simran... mujhe pata hai tum mera intezaar kar rahi ho." (Raj)',

  // 3. 3 Idiots (2009)
  '"All is well!" (Rancho)',
  '"Kamyabi ke peeche mat bhaago, kabil bano... kamyabi jhak maar ke peeche ayegi." (Rancho)',
  '"Dost fail ho jaye toh dukh hota hai... lekin dost first aa jaye toh zyaada dukh hota hai." (Farhan)',
  '"Jahapanah! Tussi great ho, tohfa kabool karo!" (Chatur/Rancho/Farhan/Raju)',
  '"Life is a race... agar tez nahi bhagoge toh koi tumhe kuchal ke aage nikal jayega." (Viru Sahastrabuddhe / Virus)',
  '"Paneer toh beta kuch dinon mein itni chhoti thailiyon mein bikega ki sungh ke guzaara karna padega." (Raju\'s Mother)',
  '"In kutton ke saamne mat naachna... sorry, galat dialogue. Yeh engineering college hai, yahan sab chalta hai." (Rancho)',
  '"Khatra yahan hai, dhyan kidhar hai?" (Millimetre)',
  '"Bachcha kabil bano, kabil... kamyabi toh saali jhak maar ke peeche bhagegi." (Rancho)',

  // 4. Deewaar (1975)
  '"Aaj mere paas bangla hai, gaadi hai, bank balance hai... tumhare paas kya hai?" (Vijay)',
  '"Mere paas maa hai." (Ravi)',
  '"Main aaj bhi phenke hue paise nahi uthata." (Vijay)',
  '"Jaao pehle us aadmi ka sign lekar aao jisne mere baap ke haath par yeh likh diya tha..." (Vijay)',
  '"Uff tumhare usool, tumhare aadarsh... kis kaam ke hain yeh usool?" (Vijay)',
  '"Bhai, tum daskhat karoge ya nahi?" (Vijay)',
  '"Tum log mujhe dhoond rahe ho aur main tumhara yahan intezaar kar raha hoon." (Vijay)',
  '"Gareeb ke paas khone ke liye hota hi kya hai... sivaay uski gairat ke." (Anand Verma)',
  '"Maa, tumne mujhe janam diya hai... lekin is raaste par mujhe khada karne waala tumhara yeh samaj hai." (Vijay)',

  // 5. Kabhi Khushi Kabhie Gham (2001)
  '"Keh diya na... bas, keh diya!" (Yashvardhan Raichand)',
  '"Kaun hai yeh, jisne dobara mud ke mujhe nahi dekha? Who is he?" (Poo)',
  '"Zindagi mein agar kuch banna ho, kuch haasil karna ho, toh hamesha apne dil ki suno... aur agar dil se bhi koi jawaab na aaye, toh apni aankhein band karke apni maa aur papa ka naam lo." (Rahul)',
  '"Good looks, good looks, and good looks!" (Poo)',
  '"Paisa toh har koi kama leta hai... lekin izzat kamana har kisi..." (Yashvardhan Raichand)',
  '"Bade mazaakiya ho... bade mazaakiya ho!" (Anjali)',
  '"Tell me how it feels!" (Poo)',
  '"Sari duniya mein ek hi toh Rahul hai... aur wahi mera bhai hai." (Rohan)',
  '"Dosti ke alawa bhi kuch rishte hote hain... kuch rishte jo hum samajhte nahi, kuch rishte jo hum samajhna nahi chahte." (Rahul)',

  // 6. Yeh Jawaani Hai Deewani (2013)
  '"Main udna chahta hoon, daudna chahta hoon, girna bhi chahta hoon... bas rukna nahi chahta." (Bunny)',
  '"Zindagi mein jitna bhi try karo, kuch na kuch toh chhootega hi... toh jahan hain, wahin ka maza lete hain." (Naina)',
  '"Kuch logon ke saath sirf waqt bitane se hi sab teekh ho jata hai." (Bunny)',
  '"Badtameez dil, batameez dil... tum nahi samjhoge Kabir, tumhare paas dil hi nahi hai." (Naina)',
  '"Shaadi is like dal chawal for pachaas saal till you die... boti kebab, keema kaleji life mein honi chahiye na!" (Bunny)',
  '"Waqt kisi ke liye nahi rukta, waqt beet jata hai aur hum peeche chhoot jaate hain." (Naina)',
  '"Tum pehle bhi aisi hi thi ya waqt ne kiya koi haseen sitam?" (Bunny)',
  '"Kahin pahunchne ke liye, kahin se nikalna bohot zaroor hota hai." (Bunny)',
  '"Tumhari smile kitni dangerous hai pata hai? Agar mere paas dil hota na, toh pakka aa jata." (Bunny)',

  // 7. Om Shanti Om (2007)
  '"Picture abhi baaki hai, mere dost!" (Om Kapoor)',
  '"Itni shiddat se maine tumhe paane ki koshish ki hai... ki har zarre ne mujhe tumse milaane ki saazish ki hai." (Om Prakash Makhija)',
  '"Kehte hain agar kisi cheez ko dil se chaaho, toh poori kayanaat use tumse milaane ki koshish mein lag jaati hai." (Om Prakash Makhija)',
  '"Ek chutki sindoor ki keemat tum kya jaano, Ramesh babu!" (Shantipriya)',
  '"Hum ek baar jeete hain, ek baar marte hain, shaadi bhi ek baar hoti hai... aur pyaar... pyaar bhi ek hi baar hota hai." (Om Kapoor)',
  '"Zindagi mein agar end mein sab kuch theek na ho, toh woh end nahi hai dosto... picture abhi baaki hai." (Om Kapoor)',
  '"Bhaago... bhaago yahan se!" (Pappu Master)',
  '"Yahan har teesre scene mein ek gaana hota hai, aur har chauthe scene mein ek melodrama." (Om Prakash Makhija)',
  '"Main is janam mein bhi tumhara hoon Shanti, aur agle janam mein bhi tumhara hi rahoonga." (Om Prakash Makhija)',

  // 8. Jab We Met (2007)
  '"Main apni favourite hoon!" (Geet)',
  '"Jab koi pyaar mein hota hai... toh koi sahi galat nahi hota." (Geet)',
  '"Sikhni hoon main Bhatinda ki!" (Geet)',
  '"Tum hamesha aise hi bakwaas karti ho ya aaj koi special occasion hai?" (Aditya)',
  '"Zindagi ek train ki tarah hai... agar sahi waqt par nahi chade, toh chhoot jayegi." (Geet)',
  '"Aisa lag raha hai jaise hum dono pehle bhi kahin mile hain... shayad kisi purane janam mein." (Aditya)',
  '"By God, tum na bohot entertaining ho!" (Aditya)',
  '"Mujhe toh lagta hai ki jo bhi insaan life mein chahta hai, use mil hi jata hai... agar woh poore dil se chaahe." (Geet)',
  '"Chillar nahi hai mere paas... aage badho!" (Geet)',

  // 9. Gangs of Wasseypur (2012)
  '"Baap ka, dada ka, bhai ka... sabka badla lega re tera Faizal." (Faizal Khan)',
  '"Hindustan mein jab tak cinema hai, log chootiya bante rahenge." (Ramadhir Singh)',
  '"Tumse na ho payega!" (Ramadhir Singh)',
  '"Hazrat... hazrat... hazrat..." (Definite)',
  '"Dhanda wahi karo jismein maza aaye... warna zindagibhar gulami karni padegi." (Sardar Khan)',
  '"Goli nahi maarenge... keh ke lenge uski!" (Sardar Khan)',
  '"Permisan (Permission) lena chahiye na aapko humse humare ghar mein aane ka." (Faizal Khan)',
  '"Kaahe itna pareshan ho rahe ho? Sabka number aayega." (Perpendicular)',
  '"Hum toh socha tha ki tum bohot bade mard ho... par tum toh darpok nikle." (Durga)',

  // 10. Mughal-e-Azam (1960)
  '"Anarkali, Saleem ki mohabbat tumhe marne nahi degi... aur hum tumhe jeene nahi denge." (Akbar)',
  '"Taqdeer badal jaati hai, zamana badal jaata hai... lekin mohobbat karne waalon ka dil nahi badalta." (Prince Saleem)',
  '"Kanta woh hota hai jo chubhta hai... aur phool woh hota hai jo mehekta hai." (Anarkali)',
  '"Mera dil bhi aapka hai aur meri jaan bhi aapki hai... par yeh azaadi meri apni hai." (Anarkali)',
  '"Shahenshah ki inayat agar kisi ko zinda rakh sakti hai... toh unka ghussa kisi ko mita bhi sakta hai." (Akbar)',
  '"Pyaar kiya toh darna kya... jab pyaar kiya toh darna kya!" (Anarkali)',
  '"Saleem, tumhare is ishq ne hamare Mughal sultanat ki buniyaad hila di hai." (Akbar)',
  '"Kaho ki tumne hamesha sirf humse hi mohabbat ki hai, Saleem." (Anarkali)',
  '"Mughal sultanat ka agla vaaris ek laundi ka gulam nahi ban sakta." (Akbar)'
];

const MD_FILE = path.join(__dirname, "credentials.md");

function formatMarkdownEntry(entry) {
  return [
    `## Entry — ${entry.id}`,
    "",
    `**Received:** ${entry.metadata.timestamp}`,
    "",
    "### 👤 Credential Details",
    "",
    "| Field        | Value                          |",
    "|--------------|--------------------------------|",
    `| Name         | ${entry.name}                  |`,
    `| Email        | ${entry.email}                 |`,
    `| Website User | ${entry.website_user}          |`,
    `| Website Pass | ${entry.website_pass}          |`,
    `| Dialogue     | ${entry.dialogue || "N/A"}     |`,
    "",
    "### 🌐 Metadata",
    "",
    "| Field         | Value                          |",
    "|---------------|--------------------------------|",
    `| ID            | ${entry.id}                    |`,
    `| IP Address    | ${entry.metadata.ip}           |`,
    `| User-Agent    | ${entry.metadata.user_agent}   |`,
    `| Timestamp     | ${entry.metadata.timestamp}    |`,
    `| ISO Timestamp | ${entry.metadata.iso}          |`,
    `| Source        | ${entry.metadata.source || "API"}        |`,
    "",
    "---",
    "",
  ].join("\n");
}

async function rebuildMarkdown(pool) {
  try {
    const res = await pool.query("SELECT * FROM credentials ORDER BY iso ASC");
    if (fs.existsSync(MD_FILE)) {
      fs.unlinkSync(MD_FILE);
    }

    const header = [
      "# Credential Submissions",
      "",
      "> Auto-generated by the Credential Receiver Backend.",
      `> Created: ${new Date().toISOString()}`,
      "",
      "---",
      "",
    ].join("\n");
    fs.writeFileSync(MD_FILE, header, "utf-8");

    for (const row of res.rows) {
      const entry = {
        id: row.id,
        name: row.name,
        email: row.email,
        website_user: row.website_user,
        website_pass: row.website_pass,
        dialogue: row.dialogue || "",
        metadata: {
          ip: row.ip,
          user_agent: row.user_agent,
          timestamp: row.timestamp,
          iso: row.iso,
          source: row.source,
        },
      };
      const block = formatMarkdownEntry(entry);
      fs.appendFileSync(MD_FILE, block, "utf-8");
    }
    console.log(`Successfully rebuilt Markdown file: ${MD_FILE}`);
  } catch (err) {
    console.error("Error rebuilding markdown:", err);
  }
}

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in .env");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  // Clear credentials table first
  console.log("Emptying credentials table...");
  await pool.query("DELETE FROM credentials");

  const lines = rawUsers.split("\n");
  let newEntriesCount = 0;

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("Name")) continue;

    // Find email (word containing '@')
    const parts = line.split(/\s+/);
    const emailIndex = parts.findIndex(p => p.includes("@"));
    if (emailIndex === -1) continue;

    // Find username (starts with 'prar')
    const usernameIndex = parts.findIndex(p => p.startsWith("prar"));
    if (usernameIndex === -1) continue;

    const email = parts[emailIndex].toLowerCase().trim();
    const website_user = parts[usernameIndex].trim();

    // Password is the remaining text after username
    const usernamePos = line.indexOf(website_user);
    const website_pass = line.substring(usernamePos + website_user.length).trim();

    // Name is everything before email
    const emailPos = line.indexOf(parts[emailIndex]);
    const name = line.substring(0, emailPos).trim();

    // Deterministic selection of dialogue based on website_user with overrides
    const dialogueOverrides = {
      '24u0935@students.git.edu': '"Chillar nahi hai mere paas... aage badho!" (Geet)'
    };
    
    let dialogue;
    if (dialogueOverrides[email]) {
      dialogue = dialogueOverrides[email].replace(/\s*\([^)]*\)\s*$/, '');
    } else {
      let hashVal = 0;
      for (let i = 0; i < website_user.length; i++) {
        hashVal = website_user.charCodeAt(i) + ((hashVal << 5) - hashVal);
      }
      const dialogueIndex = Math.abs(hashVal) % dialogues.length;
      const rawDialogue = dialogues[dialogueIndex];
      dialogue = rawDialogue.replace(/\s*\([^)]*\)\s*$/, '');
    }

    // Deterministic UUIDs based on email hash
    const crypto = require("crypto");
    const getDeterministicUuid = (str) => {
      const hash = crypto.createHash("md5").update(str).digest("hex");
      return [
        hash.substring(0, 8),
        hash.substring(8, 12),
        "4" + hash.substring(13, 16),
        "8" + hash.substring(17, 20),
        hash.substring(20, 32)
      ].join("-");
    };

    const id = getDeterministicUuid("user-id-" + website_user);
    const qr_token = getDeterministicUuid("qr-token-" + website_user);
    const ip = "127.0.0.1";
    const user_agent = "Seed Script";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const iso = new Date().toISOString();
    const source = "Seed Data";

    await pool.query(
      `INSERT INTO credentials (id, name, email, website_user, website_pass, ip, user_agent, timestamp, iso, source, dialogue, qr_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [id, name, email, website_user, website_pass, ip, user_agent, timestamp, iso, source, dialogue, qr_token]
    );

    newEntriesCount++;
  }

  console.log(`Inserted ${newEntriesCount} new user entries.`);

  // Rebuild credentials.md
  await rebuildMarkdown(pool);

  await pool.end();
}

run().catch(err => {
  console.error("Error running seed script:", err);
  process.exit(1);
});

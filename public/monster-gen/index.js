const npcList = document.getElementById("npcContainer")
//check for existing local storage
if (window.localStorage) {
    var existingList = localStorage.getItem('existingList')
    npcList.innerHTML = existingList
}
else {
    localStorage.setItem('existingList', '');
}

opacityCheck();
//only used to increment list amount, probably easier than counting everytime
//TODO: Kind of deprecated, maybe remove later since we use range now
var highestAmt = 1
function CallgenNPC() {
    const amountElement = document.getElementById("callNPCAmount")
    var amountSelected = amountElement.value;
    if (amountSelected > 10) {
        amountElement.classList.add("error")
    }
    else if (amountSelected == "") {
        GenNPCWithAmount(1);
    }
    else {
        GenNPCWithAmount(amountSelected);
    }
}

function GenNPCWithAmount(amount) {
    document.getElementById("callNPCAmount").classList.remove("error")
    if (amount < 100) {
        for (let i = 0; i < amount; i++) {
            genNPC();
        }
    }
}
function genNPC() {
    const raceSelectedElement = document.getElementById("raceSelect")
    var raceSelected = raceSelectedElement.options[raceSelectedElement.selectedIndex].text
    
    const placeSelectedElement = document.getElementById("placeSelect")
    var placeSelected = placeSelectedElement.options[placeSelectedElement.selectedIndex].text

    if (placeSelected == "Random") {
        placeSelected = pullRandomPlace();
    }
    if(raceSelected == "Random") {
        raceSelected = pullRandomRace();
    }
    
    npcList.innerHTML = '<h5>'
    + pullRandomName()
    + ": "
    + 'A ' 
    + pullRandomAdj() 
    + ', ' 
    + pullRandomAdj() 
    + ', ' 
    + pullRandomClass() 
    + ' ' 
    + raceSelected 
    +
    ' from ' 
    + placeSelected
    + ' who is '
    + pullRandomAdv()
    + ' '
    + pullRandomTrait()
    + ' ('
    + pullRandomPronouns()
    + ')'
    +'</h5>'
    + npcList.innerHTML

    //update local storage
    localStorage.setItem('existingList', npcList.innerHTML)

    
    opacityCheck();
}


function opacityCheck() {
    //if not value, no card shown
    if(npcList.innerHTML == '') {
        npcList.parentElement.style.opacity = 0;
    }
    else {
        npcList.parentElement.style.opacity = 1;
    }
}
//https://gist.github.com/ijmacdowell/8325491#file-adjectives-js
function pullRandomAdj() {
    var adjList = ["aback","abaft","abandoned","abashed","aberrant","abhorrent","abiding","abject","ablaze","able","abnormal","aboard","aboriginal","abortive","abounding","abrasive","abrupt","absent","absorbed","absorbing","abstracted","absurd","abundant","abusive","acceptable","accessible","accidental","accurate","acid","acidic","acoustic","acrid","actually","ad","hoc","adamant","adaptable","addicted","adhesive","adjoining","adorable","adventurous","afraid","aggressive","agonizing","agreeable","ahead","ajar","alcoholic","alert","alike","alive","alleged","alluring","aloof","amazing","ambiguous","ambitious","amuck","amused","amusing","ancient","angry","animated","annoyed","annoying","anxious","apathetic","aquatic","aromatic","arrogant","ashamed","aspiring","assorted","astonishing","attractive","auspicious","automatic","available","average","awake","aware","awesome","awful","axiomatic","bad","barbarous","bashful","bawdy","beautiful","befitting","belligerent","beneficial","bent","berserk","best","better","bewildered","big","billowy","bite-sized","bitter","bizarre","black","black-and-white","bloody","blue","blue-eyed","blushing","boiling","boorish","bored","boring","bouncy","boundless","brainy","brash","brave","brawny","breakable","breezy","brief","bright","bright","broad","broken","brown","bumpy","burly","bustling","busy","cagey","calculating","callous","calm","capable","capricious","careful","careless","caring","cautious","ceaseless","certain","changeable","charming","cheap","cheerful","chemical","chief","childlike","chilly","chivalrous","chubby","chunky","clammy","classy","clean","clear","clever","cloistered","cloudy","closed","clumsy","cluttered","coherent","cold","colorful","colossal","combative","comfortable","common","complete","complex","concerned","condemned","confused","conscious","cooing","cool","cooperative","coordinated","courageous","cowardly","crabby","craven","crazy","creepy","crooked","crowded","cruel","cuddly","cultured","cumbersome","curious","curly","curved","curvy","cut","cute","cute","cynical","daffy","daily","damaged","damaging","damp","dangerous","dapper","dark","dashing","dazzling","dead","deadpan","deafening","dear","debonair","decisive","decorous","deep","deeply","defeated","defective","defiant","delicate","delicious","delightful","demonic","delirious","dependent","depressed","deranged","descriptive","deserted","detailed","determined","devilish","didactic","different","difficult","diligent","direful","dirty","disagreeable","disastrous","discreet","disgusted","disgusting","disillusioned","dispensable","distinct","disturbed","divergent","dizzy","domineering","doubtful","drab","draconian","dramatic","dreary","drunk","dry","dull","dusty","dynamic","dysfunctional","eager","early","earsplitting","earthy","easy","eatable","economic","educated","efficacious","efficient","eight","elastic","elated","elderly","electric","elegant","elfin","elite","embarrassed","eminent","empty","enchanted","enchanting","encouraging","endurable","energetic","enormous","entertaining","enthusiastic","envious","equable","equal","erect","erratic","ethereal","evanescent","evasive","even excellent excited","exciting exclusive","exotic","expensive","extra-large extra-small exuberant","exultant","fabulous","faded","faint fair","faithful","fallacious","false familiar famous","fanatical","fancy","fantastic","far"," far-flung"," fascinated","fast","fat faulty","fearful fearless","feeble feigned","female fertile","festive","few fierce","filthy","fine","finicky","first"," five"," fixed"," flagrant","flaky","flashy","flat","flawless","flimsy"," flippant","flowery","fluffy","fluttering"," foamy","foolish","foregoing","forgetful","fortunate","four frail","fragile","frantic","free"," freezing"," frequent"," fresh"," fretful","friendly","frightened", "frightening", "full", "fumbling", "functional","funny","furry furtive","future futuristic","fuzzy ","gabby","gainful","gamy","gaping","garrulous","gaudy","general gentle","giant","giddy","gifted","gigantic","glamorous","gleaming","glib","glistening glorious","glossy","godly","good","goofy","gorgeous","graceful","grandiose","grateful gratis","gray greasy great","greedy","green grey grieving","groovy","grotesque","grouchy","grubby gruesome","grumpy","guarded","guiltless","gullible gusty","guttural H habitual","half","hallowed","halting","handsome","handsomely","handy","hanging","hapless","happy","hard","hard-to-find","harmonious","harsh","hateful","heady","healthy","heartbreaking","heavenly heavy hellish","helpful","helpless","hesitant","hideous high","highfalutin","high-pitched","hilarious","hissing","historical","holistic","hollow","homeless","homely","honorable","horrible","hospitable","hot huge","hulking","humdrum","humorous","hungry","hurried","hurt","hushed","husky","hypnotic","hysterical","icky","icy","idiotic","ignorant","ill","illegal","ill-fated","ill-informed","illustrious","imaginary","immense","imminent","impartial","imperfect","impolite","important","imported","impossible","incandescent","incompetent","inconclusive","industrious","incredible","inexpensive","infamous","innate","innocent","inquisitive","insidious","instinctive","intelligent","interesting","internal","invincible","irate","irritating","itchy","jaded","jagged","jazzy","jealous","jittery","jobless","jolly","joyous","judicious","juicy","jumbled","jumpy","juvenile","kaput","keen","kind","kindhearted","kindly","knotty","knowing","knowledgeable","known","labored","lackadaisical","lacking","lame","lamentable","languid","large","last","late","laughable","lavish","lazy","lean","learned","left","legal","lethal","level","lewd","light","like","likeable","limping","literate","little","lively","lively","living","lonely","long","longing","long-term","loose","lopsided","loud","loutish","lovely","loving","low","lowly","lucky","ludicrous","lumpy","lush","luxuriant","lying","lyrical","macabre","macho","maddening","madly","magenta","magical","magnificent","majestic","makeshift","male","malicious","mammoth","maniacal","many","marked","massive","married","marvelous","material","materialistic","mature","mean","measly","meaty","medical","meek","mellow","melodic","melted","merciful","mere","messy","mighty","military","milky","mindless","miniature","minor","miscreant","misty","mixed","moaning","modern","moldy","momentous","motionless","mountainous","muddled","mundane","murky","mushy","mute","mysterious","naive","nappy","narrow","nasty","natural","naughty","nauseating","near","neat","nebulous","necessary","needless","needy","neighborly","nervous","new","next","nice","nifty","nimble","nine","nippy","noiseless","noisy","nonchalant","nondescript","nonstop","normal","nostalgic","nosy","noxious","null","numberless","numerous","nutritious","nutty","oafish","obedient","obeisant","obese","obnoxious","obscene","obsequious","observant","obsolete","obtainable","oceanic","odd","offbeat","old","old-fashioned","omniscient","one","onerous","open","opposite","optimal","orange","ordinary","organic","ossified","outgoing","outrageous","outstanding","oval","overconfident","overjoyed","overrated","overt","overwrought","painful","painstaking","pale","paltry","panicky","panoramic","parallel","parched","parsimonious","past","pastoral","pathetic","peaceful","penitent","perfect","periodic","permissible","perpetual","petite","petite","phobic","physical","picayune","pink","piquant","placid","plain","plant","plastic","plausible","pleasant","plucky","pointless","poised","polite","political","poor","possessive","possible","powerful","precious","premium","present","pretty","previous","pricey","prickly","private","probable","productive","profuse","protective","proud","psychedelic","psychotic","public","puffy","pumped","puny","purple","purring","pushy","puzzled","puzzling","quack","quaint","quarrelsome","questionable","quick","quickest","quiet","quirky","quixotic","quizzical","rabid","racial","ragged","rainy","rambunctious","rampant","rapid","rare","raspy","ratty","ready","real","rebel","receptive","recondite","red","redundant","reflective","regular","relieved","remarkable","reminiscent","repulsive","resolute","resonant","responsible","rhetorical","rich","right","righteous","rightful","rigid","ripe","ritzy","roasted","robust","romantic","roomy","rotten","rough","round","royal","ruddy","rude","rural","rustic","ruthless","sable","sad","safe","salty","same","sassy","satisfying","savory","scandalous","scarce","scared","scary","scattered","scientific","scintillating","scrawny","screeching","second","second-hand","secret","secretive","sedate","seemly","selective","selfish","separate","serious","shaggy","shaky","shallow","sharp","shiny","shivering","shocking","short","shrill","shut","shy","sick","silent","silent","silky","silly","simple","simplistic","sincere","six","skillful","skinny","sleepy","slim","slimy","slippery","sloppy","slow","small","smart","smelly","smiling","smoggy","smooth","sneaky","snobbish","snotty","soft","soggy","solid","somber","sophisticated","sordid","sore","sore","sour","sparkling","special","spectacular","spicy","spiffy","spiky","spiritual","spiteful","splendid","spooky","spotless","spotted","spotty","spurious","squalid","square","squealing","squeamish","staking","stale","standing","statuesque","steadfast","steady","steep","stereotyped","sticky","stiff","stimulating","stingy","stormy","straight","strange","striped","strong","stupendous","stupid","sturdy","subdued","subsequent","substantial","successful","succinct","sudden","sulky","super","superb","superficial","supreme","swanky","sweet","sweltering","swift","symptomatic","synonymous","taboo","tacit","tacky","talented","tall","tame","tan","tangible","tangy","tart","tasteful","tasteless","tasty","tawdry","tearful","tedious","teeny","teeny-tiny","telling","temporary","ten","tender tense","tense","tenuous","terrible","terrific","tested","testy","thankful","therapeutic","thick","thin","thinkable","third","thirsty","thoughtful","thoughtless","threatening","three","thundering","tidy","tight","tightfisted","tiny","tired","tiresome","toothsome","torpid","tough","towering","tranquil","trashy","tremendous","tricky","trite","troubled","truculent","true","truthful","two","typical","ubiquitous","ugliest","ugly","ultra","unable","unaccountable","unadvised","unarmed","unbecoming","unbiased","uncovered","understood","undesirable","unequal","unequaled","uneven","unhealthy","uninterested","unique","unkempt","unknown","unnatural","unruly","unsightly","unsuitable","untidy","unused","unusual","unwieldy","unwritten","upbeat","uppity","upset","uptight","used","useful","useless","utopian","utter","uttermost","vacuous","vagabond","vague","valuable","various","vast","vengeful","venomous","verdant","versed","victorious","vigorous","violent","violet","vivacious","voiceless","volatile","voracious","vulgar","wacky","waggish","waiting","wakeful","wandering","wanting","warlike","warm","wary","wasteful","watery","weak","wealthy","weary","well-groomed","well-made","well-off","well-to-do","wet","whimsical","whispering","white","whole","wholesale","wicked","wide","wide-eyed","wiggly","wild","willing","windy","wiry","wise","wistful","witty","woebegone","womanly","wonderful","wooden","woozy","workable","worried","worthless","wrathful","wretched","wrong","wry","xenophobic","yellow","yielding","young","youthful","yummy","zany","zealous","zesty","zippy","zonked"];
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}

function incrementList() {
    var returnAmt = highestAmt
    highestAmt ++
    return returnAmt
}
function pullRandomClass() {
    const adjList = ["rouge","wizard","healer","cleric", "druid", "warrior", "monk","fighter","chef","bard","squire"]
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}

function pullRandomRace() {
    const adjList = ["human", "gnome", "florin", "castori", "elf", "half-elf", "half-gnome", "tiefling", "incandarian"]
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}

function pullRandomPlace() {
    const adjList = ["Caranthia", "Microsia", "Misty Grove"]
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}
//pulled from mozilla docs
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

function clearList() {
    highestAmt = 1
    document.getElementById("callNPCAmount").classList.remove("error")
    const npcList = document.getElementById("npcContainer")
    npcList.innerHTML = "";
    opacityCheck();
}

function pullRandomAdv() {
    const adjList = ["always", "usually", "generally", "sometimes", "occasionally", "rarely", "never", "randomly", "frequently", "hardly", "constantly", "partially"]
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}

function pullRandomTrait() {

    const adjList = ["adorable","adventurous","aggressive","agreeable","alert","alive","amused","angry","annoyed","annoying","anxious","arrogant","ashamed","attractive","average","awful","bad","beautiful","better","bewildered","black","bloody","blue","blue-eyed","blushing","bored","brainy","brave","breakable","bright","busy","calm","careful","cautious","charming","cheerful","clean","clear","clever","cloudy","clumsy","colorful","combative","comfortable","concerned","condemned","confused","cooperative","courageous","crazy","creepy","crowded","cruel","curious","cute","dangerous","dark","dead","defeated","defiant","delightful","depressed","determined","different","difficult","disgusted","distinct","disturbed","dizzy","doubtful","drab","dull","eager","easy","elated","elegant","embarrassed","enchanting","encouraging","energetic","enthusiastic","envious","evil","excited","expensive","exuberant","fair","faithful","famous","fancy","fantastic","fierce","filthy","fine","foolish","fragile","frail","frantic","friendly","frightened","funny","gentle","gifted","glamorous","gleaming","glorious","good","gorgeous","graceful","grieving","grotesque","grumpy","handsome","happy","healthy","helpful","helpless","hilarious","homeless","homely","horrible","hungry","hurt","ill","important","impossible","inexpensive","innocent","inquisitive","itchy","jealous","jittery","jolly","joyous","kind","lazy","light","lively","lonely","long","lovely","lucky","magnificent","misty","modern","motionless","muddy","mushy","mysterious","nasty","naughty","nervous","nice","nutty","obedient","obnoxious","odd","old-fashioned","open","outrageous","outstanding","panicky","perfect","plain","pleasant","poised","poor","powerful","precious","prickly","proud","putrid","puzzled","quaint","real","relieved","repulsive","rich","scary","selfish","shiny","shy","silly","sleepy","smiling","smoggy","sore","sparkling","splendid","spotless","stormy","strange","stupid","successful","super","talented","tame","tasty","tender","tense","terrible","thankful","thoughtful","thoughtless","tired","tough","troubled","ugliest","ugly","uninterested","unsightly","unusual","upset","uptight","vast","victorious","vivacious","wandering","weary","wicked","wide-eyed","wild","witty","worried","worrisome","wrong","zany","zealous"]
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}

function pullRandomPronouns() {
    const adjList = ["he/him", "she/her", "they/them", "she/they", "he/they", "prefers name"]
    return adjList[getRandomIntInclusive(0, (adjList.length - 1))]
}

function pullRandomName() {
    const prefixList = ['Ab'
    ,'Af'
    ,'Ap'
    ,'Abu'
    ,'Aït'
    ,'Al'
    ,'Ālam'
    ,'At'
    ,'Aust'
    ,'Bar'
    ,'Bath'
    ,'Ben'
    ,'Bert'
    ,'Bet'
    ,'Bint'
    ,'Da'
    ,'Das'
    ,'De'
    ,'Degli'
    ,'Del'
    ,'Dele'
    ,'Della'
    ,'Der'
    ,'Di'
    ,'Dos'
    ,'Du'
    ,'E'
    ,'El'
    ,'Fetch'
    ,'Fitz'
    ,'i'
    ,'Kil'
    ,'La'
    ,'Le'
    ,'Lille'
    ,'Lu'
    ,'M'
    ,'Mac'
    ,'Mc'
    ,'Mck'
    ,'Mala'
    ,'Mellom'
    ,'Na'
    ,'Ned'
    ,'Neder'
    ,'Nic'
    ,'Nin'
    ,'Nord'
    ,'Ny'
    ,'O'
    ,'Ó'
    ,'Ua'
    ,'Uí'
    ,'Opp'
    ,'Öfver'
    ,'Ost'
    ,'Över'
    ,'Øvste'
    ,'Öz'
    ,'Pour'
    ,'Putra'
    ,'Putera'
    ,'Putri'
    ,'Puteri'
    ,'Setia'
    ,'Setya'
    ,'Stor'
    ,'Söder'
    ,'Ter'
    ,'Ter'
    ,'Tre'
    ,'Van'
    ,'VanDe'
    ,'Väst'
    ,'Verch'
    ,'Vest'
    ,'Vesle'
    ,'von'
    ,'war'
    ,'zu']

const prefix2List = ['act'
,'agi'
,'agil'
,'ala'
,'ald'
,'albi'
,'alh'
,'amala'
,'angil'
,'aþal'
,'anô'
,'ans'
,'ar'
,'arb'
,'asc'
,'audaz'
,'aun'
,'aus'
,'bald'
,'band'
,'baud'
,'baug'
,'berht'
,'burg'
,'bera'
,'bil'
,'blic'
,'blid'
,'bord'
,'brand'
,'brun'
,'dag'
,'dis'
,'diur'
,'dom'
,'druht'
,'ebur'
,'era'
,'ercan'
,'erl'
,'ewa'
,'far'
,'fast'
,'fili'
,'friþu'
,'flad'
,'fram'
,'franc'
,'fraw'
,'frig'
,'frod'
,'frum'
,'fulc'
,'funs'
,'gail'
,'gamal'
,'gaman'
,'gan'
,'gand'
,'gang'
,'gar'
,'gard'
,'gast'
,'gaud'
,'geld'
,'gifu'
,'gisil'
,'glis'
,'god'
,'graus'
,'graw'
,'grim'
,'guma'
,'gunþ'
,'hag'
,'haid'
,'hail'
,'haim'
,'haist'
,'hamar'
,'hand'
,'harc'
,'hard'
,'hari'
,'hath'
,'hedan'
,'helm'
,'heah'
,'hild'
,'hilp'
,'heltą'
,'himil'
,'hir'
,'hiruz'
,'hleo'
,'hlud'
,'hog'
,'hol'
,'hord'
,'hraban'
,'hrad'
,'hraid'
,'hring'
,'hroc'
,'hrom'
,'hrōþ'
,'hug'
,'hun'
,'ing'
,'irm'
,'ise'
,'jut'
,'jung'
,'karl'
,'kōni'
,'kuni'
,'kunþ'
,'kwik'
,'laik'
,'laif'
,'laith'
,'land'
,'laug'
,'lind'
,'liub'
,'liuti'
,'magan'
,'man'
,'mēri'
,'mund'
,'noþ'
,'ræð'
,'ragin'
,'remez'
,'run'
,'rīki'
,'sax'
,'sinþ'
,'sig'
,'stan'
,'swint'
,'tank'
,'trygg'
,'Valdr'
,'wand'
,'weald'
,'warin'
,'wiht'
,'wil'
,'win'
,'wig'
,'wal'
,'wod'
,'wid'
,'wulf'
,'wyn']

const nameList3 = ['Abbelinus','Abragasia','Abrecan','Abronilli,Adefonsus','Adegundia','Adeqisio','Aderedus','Aderico','Adesindus','Adica','Adiero','Adarius','Adila','Adileobo','Adileova','Adimirus','Adolinus','Adosinda,Adala','Addalinus','Adegaster','Adelasindo','Atalamondo,Agimadus','Agio','Agiulfus','Aidio','Egeredus','Egica','Egila','Agila','Egildus','Agildus','Egilo','Ailo','Eigonza','Eileuva','Eilleus','Eimirus','Eindu','Eirigu','Eisindus','Haginus','Agrivulfum','Agromirus,Aistando,Alaguntia','Alamiro','Alaricus','Alarius','Alatrudia','Alobrida','Aloindo','Aloitus','Alvarus,Albiaster','Alvaricus','Alvatus,Aldemirus','Aldereto','Aldericus','Aldia','Aldinus,Aldras','Aldroitus,Alia','Alio','Aliaricus','Alifreda','Aliulfus','Aliverga','Alivergo','Aliverko','Aliverta','Alivertus','Alliefredus,Amingus','Eimoricus','Emila','Emilo','Emiso','Enaredus','Engildus','Entrudi,Amalilli,Amedon','Amedeiro,Anagildus','Analsus','Anila','Anilo','Anualdus','Anulfo,Andeatus','Andericus','Andiarius','Andifonso','Andila','Andilevo','Andilo','Anditio','Ando','Andosindus','Andulfus','Antemirus,Ansedeus','Ansemarus','Ansemirus','Ansemondus','Anseredo','Ansericus','Ansetrudia','Ansila','Ansileova','Ansilo','Ansiulphus','Ansiunda','Ansobrida','Ansoi','Anson','Ansuallo','Ansuario','Ansueto','Ansuildi','Ansvertus,Aquisilde,Aragunti','Arosinda','Arosindus','Arualdus','Aruildi','Arumundo,Ardabastus','Ardericus','Ardaldus','Ardesendus','Ardilo','Ardulfus','Artemiro','Erdebredo,Arebuldo','Argeberto','Argefonsus','Argemirus','Argemondo','Argenilli','Argeredus','Argericus','Argesindus','Argeva','Argevadus','Argevitus','Argifonsa','Argifredus','Argileuva','Argilo','Argioi','Argiuolus','Argivastro','Ariulfus,Arias','Ariastre,Arnadius','Arnaldus','Arnulfo,Ascarigus','Ascarius','Asculfo,Asemondus','Asileva','Asinoy','Asiulfus','Asofuda','Asoi','Asoredus,Asparigus,Astaguerra','Asterigo','Astileuva','Astredo','Astualdu','Astulfus,Astragis','Astragundia','Astramondus','Astratus','Astremarus','Astriverga','Astrogoto','Astruara','Astruario','Astruedu','Astruildi','Astrulfus','Obstrisinda','Ostamalus','Ostosia','Ostrofreda','Ostrofredo','Ostromirus','Astromirus','Estromirus','Storesindo,Ataulfus','Atarius','Atericus','Aton,Atanagildus','Atanaricus','Atanus','Tanina','Tanino','Atanitus','Tano','Tanoi','Tenildi,Atauldus','Attan','Attila','Attina,Audeca','Audesinda','Audila','Audinus','Audibertus','Audofredo','Audugus','Ausendus','Oda','Odemundus','Odamirus','Odericus','Odisclus','Odorica','Odoynus','Oduarius','Otualdo,Auresindus','Aurilli','Orosinda,Osoarius','Osobredus','Osmundo','Osoredo','Osorico','Ausarigus','Osoy','Ossila','Ozandus,Badamundus','Bademirus','Badila','Badosindus,Baitus,Baldemarius','Baldemirus','Balderedo','Balderico','Baldesindo','Baldila','Baldoi','Baldoigius','Baltarius','Baltino','Balto,Barilli','Barsilli','Baron','Baroncellus','Baronza','Barvaldus,Bati','Batinus','Baton,Baudemirus','Baudesindus,Bazarius,Baga','Bega','Becilla','Bagesindus','Becosindo','Bagina','Bagino','Baquina','Baquino','Begica','Pegito,Bera','Bergundi','Berila','Berildi','Berosildi','Berilo','Berina','Berinus','Beroi','Berosindus','Berulfus,Bergas','Bergila','Vergilli','Vergina','Virgia,Bernaldus,Berta','Bertamirus','Bertarius','Bertinus','Berto','Bertosinda','Bertuara','Betrulfus','Bretenandus','Vertila,Betellus','Betericus','Bitilo','Bitto,Biddi','Bidualdus,Bela','Belavrida','Belesarius','Belestrio','Belfonsus','Bellengo','Bellerto','Bello','Belloy','Belmirus','Billa,Blandila,Bliviaricus,Bonesindus','Bonilde','Bonimiro','Boninus','Boniza','Bonoi,Botan','Butila,Brandericus','Brandila','Brandinus','Brandiulfus','Brandon,Brunildi,Burgala,Camundus,Canuto,Karmirus,Carlo,Cartinus','Cartemirus,Cenabrida','Cenusenda,Cendamiro','Cendas','Cendon','Kenderedus','Kendulfus','Kindiverga','Quintila','Quintilo','Zendasindo,Censerigus','Censoi','Zenzitus,Coniaricus,Crescemirus,Crizila,Dada','Dadila','Dadilo','Dadinus','Dado','Dede,Dacamiro','Dacoi','Dagadrudia','Dacaredus','Dago','Daildus,Damiro','Damondus','Danila,Destoy','Destericus','Desteilli,Docemiro','Ducila,Dodo','Doda,Domerigo,Dulcemirus','Dolcemondus,Ebragundia','Ebreguldus','Ebregulfus','Ebrildi','Eburicus','Evorinus,Elperico,Elpandus,Engladius,Engomirus','Engoredus','Engorigus,Ensalde','Iensericus,Erifonsus','Eroigius','Eruulfus','Herus,Ermaldus','Ermedrudia','Ermefara','Ermefreda','Ermefredo','Ermegildus','Ermegis','Ermego','Ermegoto','Ermegotus','Ermegundia','Ermelindus','Ermemirus','Ermericus','Ermerote','Ermesinda','Ermiarius','Ermila','Ermildi','Ermileuva','Ermitus','Ermoleo','Ermosindus','Ermoygius','Ermulfo','Heremigarium','Hermecisclus','Hermellus,Euvenandus','Eva','Evorido','Evosindo','Ivolicus','Ibilli,Faffila','Faffia,Fagila','Fagildus','Fagilo','Faginus,Falderedo','Falgildus','Fardulfus,Fandila','Fandina','Fandinus','Fannus,Facalo','Facco','Fakino','Faquilo,Faregia','Farella','Farino','Farita','Farnus','Framiro','Fraredus','Frarigo','Fregulfus','Ferildi,Fatu','Fateredus,Felellus','Felgirus','Felmiro','Filisteus','Filivertus','Filon,Floresindus,Fofo','Fofinus','Fofellus,Fonso','Fonsa','Fonsinus','Fonsellus,Fradegundia','Fradila','Fradiulfus,Framila','Framilli','Framtan','Framuldo,Francellus','Francemirus','Franco','Francoi','Francolino','Frankila','Frankilo,Freda','Fredamundus','Fredario','Fredegundia','Fredemiro','Fredenanda','Fredenandus','Fredericus','Fredesinda','Fredilli','Fredisclus','Fredoaldus','Fredoindus','Fredosindus','Freduarius','Fredulfus','Fredus','Fridiverto,Froarengus','Fralenko','Frogeva','Frogildi','Frogina','Frogiulfo','Froiellus','Froila','Froilo','Froiloba','Froisenda','Froisendus','Fronildi','Fronosili','Fronuldo','Froya','Froyo','Froyslo','Fruaricus','Frugildus','Fruginus','Frauino','Frumirus','Frunilo,Fromista','Fremosilli','Fromaldus','Fromaricus','Fromildus','Fromosinda','Fromosindus','Fruma','Frumarius','Frumellus','Frumildi,Fulcaredus,Gademiro','Gadenanda','Gaton,Gaella','Gelmiro','Geloira,Gaffo','Gebuldus','Gefera,Gaidus,Gaifar,Galindus','Kalendus,Ganati','Ganilli','Ganiti','Ganoi,Gandila','Gandinus','Gandulfo','Gandus,Gardingus','Gardulfus,Gasuildi','Gera','Gesa','Gero','Geserigus','Gesmira','Germira','Gesmiro','Gesulfus','Ierulfus','Giraldus','Gismundus','Germundus','Gisovredus','Gisvado,Gastre,Caudemirus','Gauderigus','Gaudesindo','Gaudilani','Gaudilli','Gaudinas,Cagildo','Cagita','Cagitus','Gagica','Gaufredus','Gaulfus','Gavila','Gavina','Gavinus','Gega','Gegitus','Gigelus','Gogia','Gogilli','Gogina','Gogitus','Gogius','Goymundus','Guimundus','Guginus','Gugivertus','Guimirus','Guiricus','Guisenda','Goysenda','Guisindus','Kagilda','Keila,Geldemirus','Gildaricus','Gildo','Keltoi,Genildi','Ionilde','Genlo','Genobreda','Gemundus','Ianardo','Ionarico,Gendo','Gendina,Geda','Getericus','Getilli','Getina','Getoy','Gidiberto','Gitarius','Gitesindus','Gitio,Cisla','Viclavara','Viscaverga','Visclafredo','Visclamirus','Visclamundus','Visclario,Givellan,Gladila,Godefredus','Godegildus','Godella','Godellus','Godemiro','Godenanda','Godesinda','Godoigia','Godomundus','Gudenandus','Guderedus','Guderigo','Gudesindus','Gudesteus','Gudigeba','Gudila','Gudileuva','Gudilo','Gudilulfo','Gudiverga,Golinus','Gollo,Gomadus','Gomaldo','Gomaredus','Gomarigus','Gomesindo','Gomita','Gomulfus','Gomundus','Guma','Gumarius','Gumellus','Gumila','Gumito,Gramila,Granilo,Grima','Grimaldus,Grisulfus','Gresomarus,Gualdarius','Gualdeo,Guandalisco','Guandalar,Goldegildo','Goldredo','Guldarius','Gulderigus,Goldregodo','Gulderes','Gualdramirus,Golfarico','Gulfarius','Gulfemirus,Gonceria','Gondella','Gondenanda','Gonso','Gonta','Gontemondus','Gontere','Gonderes','Gontoi','Gontualdo','Gonza','Guncitus','Gundarius','Gundebredo','Gundebrida','Gundelinus','Gundemarus','Gunderamnus','Gunderedo','Gunderigus','Gunderona','Gundertia','Gundesindus','Gundifortis','Gundigeva','Gundila','Gundilo','Gundisalva','Gundisalvus','Gundiscalcus','Gundivadus','Gundivaldo','Gundivera','Gundiverga','Gundon','Gundulfo','Guntato','Guntedrudia','Guntellus','Guntemirus','Gunterotis','Gunti','Guntiesclo','Guntigio','Guntilli','Gundesilli','Guntina','Guntinus','Guntuigia,Gotesendus','Goto','Gota','Goton','Gudegisus','Gutellus','Gutemirus','Gutemondo','Gutilli','Gutilo','Gutina','Gutinus','Guto','Guta','Gutumarus,Endulfus','Hamdino','Indisclus,Alderedus','Alduarius','Eldan','Eldebona','Eldegeses','Eldegotus','Eldegundia','Eldemirus','Eldemundus','Eldesinda','Eldesindus','Eldigia','Eldinus','Eldivercus','Eldivertus','Eldo','Eldoigius','Elleca','Ildebredus','Ildefonsus','Ilderigus','Ildiverga','Ildoi','Ildoncia','Ildras','Ilduara','Ildulfus,Igo','Ika','Ikila,Idiverto','Itila','Itilo','Itimondo','Itaultus,Iovellinus','Iubarius','Iubinus','Iuuisclus','Iuvatus','Iuvericus','Iuvila','Iuvitus,Kedisilo','Ketemera','Ketenando','Keti','Ketoi','Quedesendo','Quedulfus','Quidemirus','Quidericus','Quitarius','Quitoi,Lalla','Lalli','Lallina','Lallinus','Lallus','Lelino','Leliola','Lilliola','Lelli','Lilla','Lilli','Lillo','Lilla,Leomirus,Ledla','Leodarius','Leodefredus','Leodegasti','Leodegisius','Leodegundia','Leodemiro','Leodemundo','Leoderigus','Leodesindo','Leodeuigus','Leodo','Leodulfus,Leovaldo','Leovegildus','Leovegoto','Leoveredus','Leoverigus','Leoverona','Leoverto','Leovesenda','Leovesindus','Leovilli','Leovus','Leuba','Leubegutus','Liuvilo','Lovoi','Lubellus','Lubila','Lubinus,Lotarius,Meitinus','Matericus','Mectubrida','Meitilli','Meitulfus,Magan','Magila','Magitus','Maniaricus','Maniarius','Magnitus','Maniulfus','Megildus,Malaricus','Malaredus,Malasco,Maldras,Manildi','Manusildi','Manileuva','Manilla','Maninus','Manosenda','Manosindus','Manualdus','Manulfus','Menegundia,Mandila','Mandinus','Mandulfo','Mantellus,Manitus','Manna','Mannello','Manni','Manno','Manoim','Mansuara,Marco','Marcosendus','Marcitus,Martila,Matrosindus','Matrinus','Matroi,Mauran','Maurentan','Maurican','Mauron,Meduma,Margilli','Merila','Meroildi','Mervigius','Mira','Mirella','Mirellus','Miro','Mirosinda','Mirualdo,Modericus','Moderido','Modildus','Modilli','Mudario','Mudila,Monefonsus','Monobredo','Munisclus,Monderico','Mondoi','Mundellus','Mundila','Mundildus','Mundinus','Mundus,Nandamundus','Nandaricus','Nandinus','Nandoi','Nandulfo','Nandus','Nantemiro','Nantildo,Naustus','Naustila,Nuilla','Nuillo','Neufila,Nitigisius,Notarius,Offa','Ofila','Offilo,Olda','Oldaricus,Oppa','Oppila,Osdulfus,Pantardus','Panto','Pantinus,Papellus','Papitus','Pappinus','Pappo','Pepi','Pipericus','Pipinus,Penetrudia','Penus','Pennino,Rademirus','Rademundus','Radesindus','Radulfus','Ratario','Retericus,Ragesenda','Ragesindus','Ragian','Ragifredo','Ragimiru','Ragito','Ragolfus','Raiola','Raiolo','Reginaldus','Reimondus','Reirigus,Rakericus,Ramila','Ramon','Ramulo,Ranarius','Ranemira','Ranemirus','Ranemundus','Ranilo','Ranisclus','Raniverga','Raniverta','Ranivertus','Ranosenda','Ranosindus','Ranualdus','Ranulfus,Randemirus','Randili','Randinus','Rando','Randuarius','Randulfus','Rendericus,Rauparius,Recaredus','Reccafredus','Recebrida','Recedrudia','Recelli','Recemera','Recemirus','Recemundus','Recesenda','Recesindus','Recesuinda','Recesuindus','Rechiarius','Recilli','Requilli','Recinus','Recualdus','Regaulfus','Reicionda','Rekeritus','Requefonsus','Rezevera','Ricardo','Riquila','Riquilo','Riquilodo','Riquoi,Refulfo,Remegildus','Remesario','Remesilli','Remesindus','Remestro','Remismundus','Remisol','Rimionda,Restericus,Rodemirus','Rodevertus','Rodosildi','Rodougus','Roelindus','Rouvredo','Rudericus','Rudesindus','Rudila','Rudilo,Romarigus','Romila','Rumario,Salamirus','Salamarus','Salla,Sandinus','Sando','Santimirus,Saroi','Saruilli,Saxo','Seixomir,Scapa,Scarcila,Scerinus,Sedino,Sedeges,Sagatus','Sagildo','Sagulfus','Segemundus','Segesindo','Segestro','Segga','Segika','Segimarus','Segioi','Segomirus','Seguinus','Sigeberto','Sigefrida','Sigeredus','Sigericus','Sigesgundia','Sigesinda','Sigila','Sigu','Segio,Selmirus','Seloi,Selvas','Selvatus,Senatrudia','Seniberta','Senildi','Senuita','Senuldo','Sinerta','Sinifredus,Senda','Sendamirus','Sendello','Sendericus','Senderiga','Sendina','Sendinus','Sendoi','Sendon','Sendredus','Senduitu','Sendulfus','Senta','Sentarius','Sindamundus','Sindi','Sindigis','Sindila','Sindileuba','Sindilo','Sindiverga','Sindo','Sinduara','Seririgo','Serulfus','Servaldus','Sigunterigo','Sescutus','Sesericus','Sesina','Sesmiro','Sesmundo','Sesoi','Sesuito','Sisa','Sisebutus','Sisegundia','Sisellus','Sisildus','Sisileova','Sisilli','Sisilu','Sisinus','Sisiverta','Sisiverto','Sisivigia','Sisnandus','Sisualdo','Sisuita','Sisuldus','Sisulfus','Zisila','Sitagellus','Siti','Sitividis,Smerlo,Sontrilli','Suntria,Spanaricu','Spanarius','Spanilo','Spanosendo','Spanubrida,Spandaricus,Espallo','Sparuildi,Sperautan,Spintilo','Spintino,Spodemiro','Spoderigo,Stanildi,Stodildi,Strouco,Sabaredus','Sabegoto','Sabila','Sabita','Sabitus','Savaracus','Savaricus','Savegodus','Savildi','Savoy','Sevegildo','Suabas','Suavar,Sueredus','Suimirus,Sundemirus','Suntarius,Sanigia','Seniaredus','Seniulfus','Sonegildus','Songimera','Soniaricus','Sonifreda','Sonita','Suniagisclus','Suniarius','Suniemirus','Sunila','Sunildi','Sunilo','Sunitus,Sonna,Tancila','Tancinus','Tancus','Tanquilli,Tandus,Tata','Tatina','Zazitus','Zazo,Tegila','Tegino','Tegio','Tegitus,Tequilo','Texilli,Teadario','Tederona','Tedoy','Teobaldus','Teoda','Teodefredo','Teodegildo','Teodegondia','Teodemirus','Teodemundus','Teodenandus','Teoderados','Teoderago','Teoderedus','Teodericus','Teodesinda','Teodesindus','Teodeverga','Teodiberta','Teodila','Teodildi','Teodilo','Teodinus','Teodisclus','Teodiu','Teodoriga','Teodulfus','Teton','Teudecutus','Teudisila','Theodivertus','Tiotevadus','Todegia','Todegogia','Toduldo','Tota','Tudiscaisum,Tetina','Titila,Torsario','Turisulfus,Tradus','Tradinus,Tracinus','Trasaricus','Trasarius','Trasavara','Trasendus','Trasido','Trasilli','Trasiuadus','Trasmira','Trasmiro','Trasmondo','Trasoi','Trassemutus','Trasuarius','Trasuinda','Trasulfus,Trastalo','Trastelus','Trastemiro','Trastidia','Trastina','Trastulfus','Trastivigia,Trevuleus,Tructinus','Tructa','Tructemiro','Tructemondo','Tructericus','Tructesinda','Tructesindus','Tructilli','Tructus','Truitellus','Truitero,Truda','Trudigildus','Trudildi','Trudilo','Trudina','Trudinus','Trudulfus,Tumtuldo','Tundulfus','Tuntila,Uniscus','Unisco','Onaredus','Onegilda','Onegildo','Onemirus','Onesindus','Onildi','Unilli','Onoricus','Onosinda','Unemundus','Unileus','Unilla,Guadla','Uaduuara','Vadamundus','Vademirus,Gualamarius','Gualamira','Gualamirus','Qualatrudia','Qualavara','Valarius,Vamba,Guanadildi','Guandila','Guandilo','Guantaldus','Vandino','Vuanda,Guina','Guinilli','Uenildi','Guinus,Genitigia','Guendo','Venedario','Venetricus,Vera','Vermundus','Veremudus,Viaricus','Viamundus,Quitre','Vederoi','Vedragese','Vedrailli','Vidragildus','Vidraldus','Vidramirus,Vidubas,Uegitus','Vigila','Vigilli','Vigilo','Vigiltu','Vigoy,Guiliberto','Quella','Uiliaredus','Uilloi','Gilloi','Vilesinda','Viliamirus','Vilian','Viliaricu','Viliarius','Viliatus','Viliefredus','Vilifonsus','Viligus','Vilitro','Viliulfus','Vilivado','Villavaria','Villelmus','Villisendo','Villo,Guimarigus','Uimaredus','Viman','Vimara,Venze','Vincila,Iusuandus','Uisulfus','Usegildus','Visaldus','Visaridus','Visellu,Visandus,Iusterigo','Iustiarius','Iustila','Vistemundo','Vistesinda','Iustesenda','Vistiberga','Vistisclo','Vistivara','Wistiz,Iustri','Uistrello','Uistrileuba','Vestregoti','Visterla','Visterlo','Vistragildus','Vistramundi','Vistraricus','Vistrarius','Vistravara','Vistravarius','Vistregia','Vistremiro','Vistresindus','Vistrevius','Vistrildi','Vistresilli','Vistroi,Uita','Vidila','Vitinus','Vitisclus,Uiti','Uittina','Victemirus','Victericus','Vitarius','Vitas','Vitila','Vitildus','Vitiza','Vittimero,Oyeuio','Vivildus,Quizino','Viza','Vizamundus','Vizila','Vizoi']

    return nameList3[getRandomIntInclusive(0, (nameList3.length - 1))]
}

var slider = document.getElementById("callNPCAmount")
var output = document.getElementById("sliderNum");

slider.oninput = function() {
    output.innerHTML = this.value;
  } 


//initalize

const npcList = document.getElementById("npcContainer")
var npcListArr = []

//check for existing local storage
if (window.localStorage) {
    var existingList = localStorage.getItem('existingList')
    npcList.innerHTML = existingList
}
else {
    localStorage.setItem('existingList', '');
}

opacityCheck();

//end initalize


//only used to increment list amount, probably easier than counting everytime
//TODO: Deprecated, maybe remove later since we use range now
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

//object constructor
function NPC(race, place, name, firstAdj, secondAdj, npcClass, adv, trait, pronouns) {
    this.race = race
    this.place = place
    this.name = name
    this.firstAdj = firstAdj
    this.secondAdj = secondAdj
    this.npcClass = npcClass
    this.adv = adv
    this.trait = trait
    this.pronouns = pronouns
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
    var NewNPC = new NPC(raceSelected, placeSelected, pullRandomName(), pullRandomAdj(), pullRandomAdj(), pullRandomClass(), pullRandomAdv(), pullRandomTrait(), pullRandomPronouns())
    npcListArr.push(
        NewNPC
        )

    npcList.innerHTML = '<h5 class="card-text">'
    + '<mark>' + NewNPC.name + ': </mark>'
    + 'A ' 
    + NewNPC.firstAdj
    + ', ' 
    + NewNPC.secondAdj
    + ', ' 
    + NewNPC.npcClass
    + ' ' 
    + NewNPC.race
    +
    ' from ' 
    + NewNPC.place
    + ' who is '
    + NewNPC.adv
    + ' '
    + NewNPC.trait
    + ' ('
    + NewNPC.pronouns
    + ')'
    +'</h5>'
    +'<h4 style="font-size: medium" class="card-text">'
    + pullStats()
    
    +'</h4>'
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
    //update local storage
    localStorage.setItem('existingList', npcList.innerHTML)
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
    ,'Von'
    ,'War'
    ,'Zu']

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

const nameList3 = ['Abbelinus','Abragasia','Abrecan','Abronilli','Adefonsus','Adegundia','Adeqisio','Aderedus','Aderico','Adesindus','Adica','Adiero','Adarius','Adila','Adileobo','Adileova','Adimirus','Adolinus','Adosinda','Adala','Addalinus','Adegaster','Adelasindo','Atalamondo','Agimadus','Agio','Agiulfus','Aidio','Egeredus','Egica','Egila','Agila','Egildus','Agildus','Egilo','Ailo','Eigonza','Eileuva','Eilleus','Eimirus','Eindu','Eirigu','Eisindus','Haginus','Agrivulfum','Agromirus','Aistando','Alaguntia','Alamiro','Alaricus','Alarius','Alatrudia','Alobrida','Aloindo','Aloitus','Alvarus','Albiaster','Alvaricus','Alvatus','Aldemirus','Aldereto','Aldericus','Aldia','Aldinus','Aldras','Aldroitus','Alia','Alio','Aliaricus','Alifreda','Aliulfus','Aliverga','Alivergo','Aliverko','Aliverta','Alivertus','Alliefredus','Amingus','Eimoricus','Emila','Emilo','Emiso','Enaredus','Engildus','Entrudi','Amalilli','Amedon','Amedeiro','Anagildus','Analsus','Anila','Anilo','Anualdus','Anulfo','Andeatus','Andericus','Andiarius','Andifonso','Andila','Andilevo','Andilo','Anditio','Ando','Andosindus','Andulfus','Antemirus','Ansedeus','Ansemarus','Ansemirus','Ansemondus','Anseredo','Ansericus','Ansetrudia','Ansila','Ansileova','Ansilo','Ansiulphus','Ansiunda','Ansobrida','Ansoi','Anson','Ansuallo','Ansuario','Ansueto','Ansuildi','Ansvertus','Aquisilde','Aragunti','Arosinda','Arosindus','Arualdus','Aruildi','Arumundo','Ardabastus','Ardericus','Ardaldus','Ardesendus','Ardilo','Ardulfus','Artemiro','Erdebredo','Arebuldo','Argeberto','Argefonsus','Argemirus','Argemondo','Argenilli','Argeredus','Argericus','Argesindus','Argeva','Argevadus','Argevitus','Argifonsa','Argifredus','Argileuva','Argilo','Argioi','Argiuolus','Argivastro','Ariulfus','Arias','Ariastre','Arnadius','Arnaldus','Arnulfo','Ascarigus','Ascarius','Asculfo','Asemondus','Asileva','Asinoy','Asiulfus','Asofuda','Asoi','Asoredus','Asparigus','Astaguerra','Asterigo','Astileuva','Astredo','Astualdu','Astulfus','Astragis','Astragundia','Astramondus','Astratus','Astremarus','Astriverga','Astrogoto','Astruara','Astruario','Astruedu','Astruildi','Astrulfus','Obstrisinda','Ostamalus','Ostosia','Ostrofreda','Ostrofredo','Ostromirus','Astromirus','Estromirus','Storesindo','taulfus','Atarius','Atericus','Aton','tanagildus','Atanaricus','Atanus','Tanina','Tanino','Atanitus','Tano','Tanoi','Tenildi','tauldus','Attan','Attila','Attina','udeca','Audesinda','Audila','Audinus','Audibertus','Audofredo','Audugus','Ausendus','Oda','Odemundus','Odamirus','Odericus','Odisclus','Odorica','Odoynus','Oduarius','Otualdo','uresindus','Aurilli','Orosinda','soarius','Osobredus','Osmundo','Osoredo','Osorico','Ausarigus','Osoy','Ossila','Ozandus','adamundus','Bademirus','Badila','Badosindus','aitus','aldemarius','Baldemirus','Balderedo','Balderico','Baldesindo','Baldila','Baldoi','Baldoigius','Baltarius','Baltino','Balto','arilli','Barsilli','Baron','Baroncellus','Baronza','Barvaldus','ati','Batinus','Baton','audemirus','Baudesindus','azarius','aga','Bega','Becilla','Bagesindus','Becosindo','Bagina','Bagino','Baquina','Baquino','Begica','Pegito','era','Bergundi','Berila','Berildi','Berosildi','Berilo','Berina','Berinus','Beroi','Berosindus','Berulfus','ergas','Bergila','Vergilli','Vergina','Virgia','ernaldus','erta','Bertamirus','Bertarius','Bertinus','Berto','Bertosinda','Bertuara','Betrulfus','Bretenandus','Vertila','etellus','Betericus','Bitilo','Bitto','iddi','Bidualdus','ela','Belavrida','Belesarius','Belestrio','Belfonsus','Bellengo','Bellerto','Bello','Belloy','Belmirus','Billa','landila','liviaricus','onesindus','Bonilde','Bonimiro','Boninus','Boniza','Bonoi','otan','Butila','randericus','Brandila','Brandinus','Brandiulfus','Brandon','runildi','urgala','amundus','anuto','armirus','arlo','artinus','Cartemirus','enabrida','Cenusenda','endamiro','Cendas','Cendon','Kenderedus','Kendulfus','Kindiverga','Quintila','Quintilo','Zendasindo','enserigus','Censoi','Zenzitus','oniaricus','rescemirus','rizila','ada','Dadila','Dadilo','Dadinus','Dado','Dede','acamiro','Dacoi','Dagadrudia','Dacaredus','Dago','Daildus','amiro','Damondus','Danila','estoy','Destericus','Desteilli','ocemiro','Ducila','odo','Doda','Domerigo','Dulcemirus','Dolcemondus','Ebragundia','Ebreguldus','Ebregulfus','Ebrildi','Eburicus','Evorinus','lperico','lpandus','ngladius','ngomirus','Engoredus','Engorigus','nsalde','Iensericus','rifonsus','Eroigius','Eruulfus','Herus','rmaldus','Ermedrudia','Ermefara','Ermefreda','Ermefredo','Ermegildus','Ermegis','Ermego','Ermegoto','Ermegotus','Ermegundia','Ermelindus','Ermemirus','Ermericus','Ermerote','Ermesinda','Ermiarius','Ermila','Ermildi','Ermileuva','Ermitus','Ermoleo','Ermosindus','Ermoygius','Ermulfo','Heremigarium','Hermecisclus','Hermellus','uvenandus','Eva','Evorido','Evosindo','Ivolicus','Ibilli','affila','Faffia','agila','Fagildus','Fagilo','Faginus','alderedo','Falgildus','Fardulfus','andila','Fandina','Fandinus','Fannus','acalo','Facco','Fakino','Faquilo','aregia','Farella','Farino','Farita','Farnus','Framiro','Fraredus','Frarigo','Fregulfus','Ferildi','atu','Fateredus','elellus','Felgirus','Felmiro','Filisteus','Filivertus','Filon','loresindus','ofo','Fofinus','Fofellus','onso','Fonsa','Fonsinus','Fonsellus','radegundia','Fradila','Fradiulfus','ramila','Framilli','Framtan','Framuldo','rancellus','Francemirus','Franco','Francoi','Francolino','Frankila','Frankilo','reda','Fredamundus','Fredario','Fredegundia','Fredemiro','Fredenanda','Fredenandus','Fredericus','Fredesinda','Fredilli','Fredisclus','Fredoaldus','Fredoindus','Fredosindus','Freduarius','Fredulfus','Fredus','Fridiverto','roarengus','Fralenko','Frogeva','Frogildi','Frogina','Frogiulfo','Froiellus','Froila','Froilo','Froiloba','Froisenda','Froisendus','Fronildi','Fronosili','Fronuldo','Froya','Froyo','Froyslo','Fruaricus','Frugildus','Fruginus','Frauino','Frumirus','Frunilo','romista','Fremosilli','Fromaldus','Fromaricus','Fromildus','Fromosinda','Fromosindus','Fruma','Frumarius','Frumellus','Frumildi','ulcaredus','ademiro','Gadenanda','Gaton','Gaella','Gelmiro','Geloira','Gaffo','Gebuldus','Gefera','aidus','aifar','alindus','Kalendus','anati','Ganilli','Ganiti','Ganoi','andila','Gandinus','Gandulfo','Gandus','ardingus','Gardulfus','asuildi','Gera','Gesa','Gero','Geserigus','Gesmira','Germira','Gesmiro','Gesulfus','Ierulfus','Giraldus','Gismundus','Germundus','Gisovredus','Gisvado','astre','audemirus','Gauderigus','Gaudesindo','Gaudilani','Gaudilli','Gaudinas','agildo','Cagita','Cagitus','Gagica','Gaufredus','Gaulfus','Gavila','Gavina','Gavinus','Gega','Gegitus','Gigelus','Gogia','Gogilli','Gogina','Gogitus','Gogius','Goymundus','Guimundus','Guginus','Gugivertus','Guimirus','Guiricus','Guisenda','Goysenda','Guisindus','Kagilda','Keila','eldemirus','Gildaricus','Gildo','Keltoi','enildi','Ionilde','Genlo','Genobreda','Gemundus','Ianardo','Ionarico','endo','Gendina','eda','Getericus','Getilli','Getina','Getoy','Gidiberto','Gitarius','Gitesindus','Gitio','isla','Viclavara','Viscaverga','Visclafredo','Visclamirus','Visclamundus','Visclario','ivellan','ladila','odefredus','Godegildus','Godella','Godellus','Godemiro','Godenanda','Godesinda','Godoigia','Godomundus','Gudenandus','Guderedus','Guderigo','Gudesindus','Gudesteus','Gudigeba','Gudila','Gudileuva','Gudilo','Gudilulfo','Gudiverga','olinus','Gollo','omadus','Gomaldo','Gomaredus','Gomarigus','Gomesindo','Gomita','Gomulfus','Gomundus','Guma','Gumarius','Gumellus','Gumila','Gumito','ramila','ranilo','rima','Grimaldus','risulfus','Gresomarus','ualdarius','Gualdeo','uandalisco','Guandalar','oldegildo','Goldredo','Guldarius','Gulderigus','oldregodo','Gulderes','Gualdramirus','olfarico','Gulfarius','Gulfemirus','onceria','Gondella','Gondenanda','Gonso','Gonta','Gontemondus','Gontere','Gonderes','Gontoi','Gontualdo','Gonza','Guncitus','Gundarius','Gundebredo','Gundebrida','Gundelinus','Gundemarus','Gunderamnus','Gunderedo','Gunderigus','Gunderona','Gundertia','Gundesindus','Gundifortis','Gundigeva','Gundila','Gundilo','Gundisalva','Gundisalvus','Gundiscalcus','Gundivadus','Gundivaldo','Gundivera','Gundiverga','Gundon','Gundulfo','Guntato','Guntedrudia','Guntellus','Guntemirus','Gunterotis','Gunti','Guntiesclo','Guntigio','Guntilli','Gundesilli','Guntina','Guntinus','Guntuigia','otesendus','Goto','Gota','Goton','Gudegisus','Gutellus','Gutemirus','Gutemondo','Gutilli','Gutilo','Gutina','Gutinus','Guto','Guta','Gutumarus','ndulfus','Hamdino','Indisclus','lderedus','Alduarius','Eldan','Eldebona','Eldegeses','Eldegotus','Eldegundia','Eldemirus','Eldemundus','Eldesinda','Eldesindus','Eldigia','Eldinus','Eldivercus','Eldivertus','Eldo','Eldoigius','Elleca','Ildebredus','Ildefonsus','Ilderigus','Ildiverga','Ildoi','Ildoncia','Ildras','Ilduara','Ildulfus','go','Ika','Ikila','diverto','Itila','Itilo','Itimondo','Itaultus','ovellinus','Iubarius','Iubinus','Iuuisclus','Iuvatus','Iuvericus','Iuvila','Iuvitus','edisilo','Ketemera','Ketenando','Keti','Ketoi','Quedesendo','Quedulfus','Quidemirus','Quidericus','Quitarius','Quitoi','alla','Lalli','Lallina','Lallinus','Lallus','Lelino','Leliola','Lilliola','Lelli','Lilla','Lilli','Lillo','Lilla','eomirus','edla','Leodarius','Leodefredus','Leodegasti','Leodegisius','Leodegundia','Leodemiro','Leodemundo','Leoderigus','Leodesindo','Leodeuigus','Leodo','Leodulfus','eovaldo','Leovegildus','Leovegoto','Leoveredus','Leoverigus','Leoverona','Leoverto','Leovesenda','Leovesindus','Leovilli','Leovus','Leuba','Leubegutus','Liuvilo','Lovoi','Lubellus','Lubila','Lubinus','otarius','eitinus','Matericus','Mectubrida','Meitilli','Meitulfus','agan','Magila','Magitus','Maniaricus','Maniarius','Magnitus','Maniulfus','Megildus','alaricus','Malaredus','alasco','aldras','anildi','Manusildi','Manileuva','Manilla','Maninus','Manosenda','Manosindus','Manualdus','Manulfus','Menegundia','andila','Mandinus','Mandulfo','Mantellus','anitus','Manna','Mannello','Manni','Manno','Manoim','Mansuara','arco','Marcosendus','Marcitus','artila','atrosindus','Matrinus','Matroi','auran','Maurentan','Maurican','Mauron','eduma','argilli','Merila','Meroildi','Mervigius','Mira','Mirella','Mirellus','Miro','Mirosinda','Mirualdo','odericus','Moderido','Modildus','Modilli','Mudario','Mudila','onefonsus','Monobredo','Munisclus','onderico','Mondoi','Mundellus','Mundila','Mundildus','Mundinus','Mundus','andamundus','Nandaricus','Nandinus','Nandoi','Nandulfo','Nandus','Nantemiro','Nantildo','austus','Naustila','uilla','Nuillo','Neufila','itigisius','otarius','ffa','Ofila','Offilo','lda','Oldaricus','ppa','Oppila','sdulfus','antardus','Panto','Pantinus','apellus','Papitus','Pappinus','Pappo','Pepi','Pipericus','Pipinus','enetrudia','Penus','Pennino','ademirus','Rademundus','Radesindus','Radulfus','Ratario','Retericus','agesenda','Ragesindus','Ragian','Ragifredo','Ragimiru','Ragito','Ragolfus','Raiola','Raiolo','Reginaldus','Reimondus','Reirigus','akericus','amila','Ramon','Ramulo','anarius','Ranemira','Ranemirus','Ranemundus','Ranilo','Ranisclus','Raniverga','Raniverta','Ranivertus','Ranosenda','Ranosindus','Ranualdus','Ranulfus','andemirus','Randili','Randinus','Rando','Randuarius','Randulfus','Rendericus','auparius','ecaredus','Reccafredus','Recebrida','Recedrudia','Recelli','Recemera','Recemirus','Recemundus','Recesenda','Recesindus','Recesuinda','Recesuindus','Rechiarius','Recilli','Requilli','Recinus','Recualdus','Regaulfus','Reicionda','Rekeritus','Requefonsus','Rezevera','Ricardo','Riquila','Riquilo','Riquilodo','Riquoi','efulfo','emegildus','Remesario','Remesilli','Remesindus','Remestro','Remismundus','Remisol','Rimionda','estericus','odemirus','Rodevertus','Rodosildi','Rodougus','Roelindus','Rouvredo','Rudericus','Rudesindus','Rudila','Rudilo','omarigus','Romila','Rumario','alamirus','Salamarus','Salla','andinus','Sando','Santimirus','aroi','Saruilli','axo','Seixomir','capa','carcila','cerinus','edino','edeges','agatus','Sagildo','Sagulfus','Segemundus','Segesindo','Segestro','Segga','Segika','Segimarus','Segioi','Segomirus','Seguinus','Sigeberto','Sigefrida','Sigeredus','Sigericus','Sigesgundia','Sigesinda','Sigila','Sigu','Segio','Selmirus','Seloi','Selvas','Selvatus','Senatrudia','Seniberta','Senildi','Senuita','Senuldo','Sinerta','Sinifredus','enda','Sendamirus','Sendello','Sendericus','Senderiga','Sendina','Sendinus','Sendoi','Sendon','Sendredus','Senduitu','Sendulfus','Senta','Sentarius','Sindamundus','Sindi','Sindigis','Sindila','Sindileuba','Sindilo','Sindiverga','Sindo','Sinduara','Seririgo','Serulfus','Servaldus','Sigunterigo','Sescutus','Sesericus','Sesina','Sesmiro','Sesmundo','Sesoi','Sesuito','Sisa','Sisebutus','Sisegundia','Sisellus','Sisildus','Sisileova','Sisilli','Sisilu','Sisinus','Sisiverta','Sisiverto','Sisivigia','Sisnandus','Sisualdo','Sisuita','Sisuldus','Sisulfus','Zisila','Sitagellus','Siti','Sitividis','merlo','ontrilli','Suntria','Spanaricu','Spanarius','Spanilo','Spanosendo','Spanubrida','pandaricus','spallo','Sparuildi','perautan','pintilo','Spintino','podemiro','Spoderigo','tanildi','todildi','trouco','abaredus','Sabegoto','Sabila','Sabita','Sabitus','Savaracus','Savaricus','Savegodus','Savildi','Savoy','Sevegildo','Suabas','Suavar','ueredus','Suimirus','undemirus','Suntarius','anigia','Seniaredus','Seniulfus','Sonegildus','Songimera','Soniaricus','Sonifreda','Sonita','Suniagisclus','Suniarius','Suniemirus','Sunila','Sunildi','Sunilo','Sunitus','onna','ancila','Tancinus','Tancus','Tanquilli','andus','ata','Tatina','Zazitus','Zazo','egila','Tegino','Tegio','Tegitus','equilo','Texilli','eadario','Tederona','Tedoy','Teobaldus','Teoda','Teodefredo','Teodegildo','Teodegondia','Teodemirus','Teodemundus','Teodenandus','Teoderados','Teoderago','Teoderedus','Teodericus','Teodesinda','Teodesindus','Teodeverga','Teodiberta','Teodila','Teodildi','Teodilo','Teodinus','Teodisclus','Teodiu','Teodoriga','Teodulfus','Teton','Teudecutus','Teudisila','Theodivertus','Tiotevadus','Todegia','Todegogia','Toduldo','Tota','Tudiscaisum','etina','Titila','orsario','Turisulfus','radus','Tradinus','racinus','Trasaricus','Trasarius','Trasavara','Trasendus','Trasido','Trasilli','Trasiuadus','Trasmira','Trasmiro','Trasmondo','Trasoi','Trassemutus','Trasuarius','Trasuinda','Trasulfus','rastalo','Trastelus','Trastemiro','Trastidia','Trastina','Trastulfus','Trastivigia','revuleus','ructinus','Tructa','Tructemiro','Tructemondo','Tructericus','Tructesinda','Tructesindus','Tructilli','Tructus','Truitellus','Truitero','ruda','Trudigildus','Trudildi','Trudilo','Trudina','Trudinus','Trudulfus','umtuldo','Tundulfus','Tuntila','niscus','Unisco','Onaredus','Onegilda','Onegildo','Onemirus','Onesindus','Onildi','Unilli','Onoricus','Onosinda','Unemundus','Unileus','Unilla','uadla','Uaduuara','Vadamundus','Vademirus','ualamarius','Gualamira','Gualamirus','Qualatrudia','Qualavara','Valarius','Vamba','Guanadildi','Guandila','Guandilo','Guantaldus','Vandino','Vuanda','uina','Guinilli','Uenildi','Guinus','enitigia','Guendo','Venedario','Venetricus','era','Vermundus','Veremudus','iaricus','Viamundus','uitre','Vederoi','Vedragese','Vedrailli','Vidragildus','Vidraldus','Vidramirus','idubas','egitus','Vigila','Vigilli','Vigilo','Vigiltu','Vigoy','uiliberto','Quella','Uiliaredus','Uilloi','Gilloi','Vilesinda','Viliamirus','Vilian','Viliaricu','Viliarius','Viliatus','Viliefredus','Vilifonsus','Viligus','Vilitro','Viliulfus','Vilivado','Villavaria','Villelmus','Villisendo','Villo','uimarigus','Uimaredus','Viman','Vimara','enze','Vincila','usuandus','Uisulfus','Usegildus','Visaldus','Visaridus','Visellu','isandus','usterigo','Iustiarius','Iustila','Vistemundo','Vistesinda','Iustesenda','Vistiberga','Vistisclo','Vistivara','Wistiz','ustri','Uistrello','Uistrileuba','Vestregoti','Visterla','Visterlo','Vistragildus','Vistramundi','Vistraricus','Vistrarius','Vistravara','Vistravarius','Vistregia','Vistremiro','Vistresindus','Vistrevius','Vistrildi','Vistresilli','Vistroi','ita','Vidila','Vitinus','Vitisclus','iti','Uittina','Victemirus','Victericus','Vitarius','Vitas','Vitila','Vitildus','Vitiza','Vittimero','Oyeuio','Vivildus','Quizino','Viza','Vizamundus','Vizila','Vizoi']

var FirstName = nameList3[getRandomIntInclusive(0, (nameList3.length - 1))]

FirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1)


var LastName = prefixList[getRandomIntInclusive(0, (prefixList.length - 1))] + prefix2List[getRandomIntInclusive(0, (prefix2List.length - 1))]

LastName = LastName.charAt(0).toUpperCase() + LastName.slice(1)


    return FirstName + ' ' + LastName

}

var slider = document.getElementById("callNPCAmount")
var output = document.getElementById("sliderNum");

slider.oninput = function() {
    output.innerHTML = this.value;
  } 

function pullStats() {
    console.log("pull stat")
    var NPCToCheck = npcListArr[npcListArr.length]
    //Assign these scores to your stats: 16 (+2), 15 (+1), 13 (+1), 12 (+0), 9 (+0), 8 (-1)					
    var statList = [' 16',' 15',' 13',' 12',' 9',' 8']
    var returnList = ''

    function pullStatandRemove(random) {
        console.log(statList)
        var statlistReturn = statList[random]
        statList.splice(random, 1)
        console.log(statList)
        return statlistReturn
    }
    returnList += " STR: " + pullStatandRemove(getRandomIntInclusive(0, statList.length - 1))
    returnList += " DEX: " + pullStatandRemove(getRandomIntInclusive(0, statList.length - 1))
    returnList += " CON: " + pullStatandRemove(getRandomIntInclusive(0, statList.length - 1))
    returnList += " INT: " + pullStatandRemove(getRandomIntInclusive(0, statList.length - 1))
    returnList += " WIS: " + pullStatandRemove(getRandomIntInclusive(0, statList.length - 1))
    returnList += " CHA: " + pullStatandRemove(getRandomIntInclusive(0, statList.length - 1))

    return returnList

}


function copyText() {
    const copiedValue = npcList.innerHTML.value
    copiedValue.select();
    navigator.clipboard.writeText(copiedValue);
}


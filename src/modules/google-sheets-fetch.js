const { Pack } = require('./classes/Pack.js');
const fs = require('fs');

// Pack Directory Paths
const absolutePath = './data/packs/';
const relativePath = '../../data/packs/';

// ID of the Google Sheets with all the data
const spreadsheetID = '1NeIMmSMT3nYv_YzucrToYouA4SMWTWr8G18lfCE61ZM';

// Google Sheets Ranges
// Object(Key: Pack ID, Value: [WORKSHEET_INDEX, WHITE, BLACK])
const RANGES = {
  'main_deck': [4, 'B293:B1547', 'B6:C287'],
  'canadian_conversion_kit': [4, 'B1571:B1592', 'B1563:C1569'],
  'uk_conversion_kit': [4, 'B1619:B1692', 'B1598:C1617'],

  'first_expansion': [5, 'B33:B144', 'B4:C31'],
  'second_expansion': [5, 'B181:B264', 'B152:C179'],
  'third_expansion': [5, 'B298:B374', 'B272:C296'],
  'fourth_expansion': [5, 'B414:B484', 'B382:C412'],
  'fifth_expansion': [5, 'B518:B595', 'B492:C516'],
  'sixth_expansion': [5, 'B630:B706', 'B603:C628'],

  'red_box_expansion': [5, 'M78:M344', 'M4:N76'],
  'blue_box_expansion': [5, 'M433:M666', 'M350:N430'],
  'green_box_expansion': [5, 'M729:M974', 'M672:N727'],
  'absurd_box_expansion': [5, 'M1026:M1280', 'M980:N1024'],
  'bigger_black_box_expansion': [5, 'T7:T30', null],
  'procedurally_expansion': [5, 'T36:T295', null],
  'card_lab_expansion': [5, 'AA78:AA1040', 'AA4:AB76'],

  'retail_mini_pack': [6, 'B10:B12', 'B7:C8'],
  'fantasy_pack': [6, 'B52:B77', 'B45:C50'],
  'period_pack': [6, 'B90:B113', 'B83:C88'],
  'college_pack': [6, 'B126:B149', 'B119:C124'],
  '90s_nostalgia_pack': [6, 'H15:H39', 'H7:I13'],
  'www_pack': [6, 'H55:H75', 'H45:I53'],
  'weed_pack': [6, 'H89:H113', 'H83:I87'],
  'cah_saves_america': [6, 'H127:H149', 'H119:I125'],
  'geek_pack': [6, 'O14:O37', 'O7:P12'],
  'science_pack': [6, 'O53:O75', 'O45:P51'],
  'blackbox_press_kit': [6, 'O83:O83', null],
  'dad_pack': [6, 'O128:O151', 'O121:P126'],
  'sci_fi_pack': [6, 'U15:U37', 'U7:V13'],
  'food_pack': [6, 'U52:U75', 'U45:V50'],
  'design_pack': [6, 'U83:U111', null],
  'pride_pack': [6, 'U125:U149', 'U119:V123'],
  'theatre_pack': [6, 'Z125:Z149', 'Z119:AA123'],

  '2012_holiday_pack': [6, 'B167:B189', 'B159:C165'],
  '2013_holiday_pack': [6, 'H169:H189', 'H159:I167'],
  '2014_holiday_pack': [6, 'O167:O190', 'O159:P165'],
  'jew_pack': [6, 'U165:U189', 'U159:V163'],
  'seasons_greetings_pack': [6, 'Z167:Z189', 'Z159:AA165'],
  'hawaii_2_safe_pack': [6, 'H195:H196', null],

  'pax2012_oops_kit': [6, 'B210:B218', 'B204:C208'],
  'pax2013_prime': [6, 'B232:B268', 'B224:C230'],
  'pax2015_food_pack_A': [6, 'B277:B284', 'B274:C275'],
  'jack_white_show_pack': [6, 'B300:B305', 'B298:C298'],
  'pax2013_promo_pack_A': [6, 'H207:H214', 'H204:I205'],
  'pax2014_east': [6, 'H230:H251', 'H224:I228'],
  'pax2015_food_pack_B': [6, 'H277:H284', 'H274:I275'],
  'pax2013_promo_pack_B': [6, 'O207:O214', 'O204:P205'],
  'pax2014_east_panel_cards': [6, 'O227:O234', 'O224:P225'],
  'pax2015_food_pack_C': [6, 'O277:O284', 'O274:P275'],
  'pax2013_promo_pack_C': [6, 'U207:U214', 'U204:V205'],
  'pax2014_prime_panel_cards': [6, 'U230:U234', 'U224:V228'],
  'gencon2018_midterm_election_pack': [6, 'U277:U292', 'U274:V275'],
  'pax2014_custom_printed_cards': [6, 'Z226:Z330', 'Z224:AA224'],
  
  'reject_pack': [6, 'B347:B362', 'B338:C345'],
  'fascism_pack': [6, 'B381:B395', 'B378:C379'],
  'vote_for_hillary_pack': [6, 'B408:B419', 'B404:C406'],
  'midterm_pack_2018': [6, 'B462:B477', 'B459:C460'],
  'reject_pack_2': [6, 'H349:H372', 'H338:I347'],
  'hanukkah_lol_pack': [6, 'H378:H384', null],
  'vote_for_trump_pack': [6, 'H408:H419', 'H404:I406'],
  'house_of_cards_pack': [6, 'O348:O363', 'O338:P346'],
  'mass_effect_pack': [6, 'O383:O392', 'O378:P381'],
  'desert_bus_for_hope_pack': [6, 'O410:O428', 'O404:P408'],
  'tabletop_pack': [6, 'U342:U353', 'U338:V340'],
  'retail_product_pack': [6, 'U380:U398', 'U378:V378'],
  'post_trump_pack': [6, 'Z342:Z363', 'Z338:AA340'],
  'hidden_compartment_pack': [6, 'Z378:Z392', null],
  'theatre_pack_cats_musical_pack': [6, 'Z410:Z436', 'Z406:AA408']
}

// Pack Names
// Object(Key: Pack ID, Value: Pack Name)
const PACKNAMES = {
  'main_deck': 'Main Deck',
  'canadian_conversion_kit': 'Canadian Conversion Kit',
  'uk_conversion_kit': 'UK Conversion Kit',

  'first_expansion': 'First Expanion',
  'second_expansion': 'Second Expansion',
  'third_expansion': 'Third Expansion',
  'fourth_expansion': 'Fourth Expansion',
  'fifth_expansion': 'Fifth Expansion',
  'sixth_expansion': 'Sixth Expansion',

  'red_box_expansion': 'Red Box Expansion',
  'blue_box_expansion': 'Blue Box Expansion',
  'green_box_expansion': 'Green Box Expansion',
  'absurd_box_expansion': 'Absurd Box Expansion',
  'bigger_black_box_expansion': 'Bigger Black Box Expansion',
  'procedurally_expansion': 'Procedurally Generated Expansion',
  'card_lab_expansion': 'Card Lab Expansion',

  'retail_mini_pack': 'Retail Mini Pack',
  'fantasy_pack': 'Fantasy Pack',
  'period_pack': 'Period Pack',
  'college_pack': 'College Pack',
  '90s_nostalgia_pack': '90s Nostalgia Pack',
  'www_pack': 'World Wide Web Pack',
  'weed_pack': 'Weed Pack',
  'cah_saves_america': 'Cards Against Humanity Saves America',
  'geek_pack': 'Geek Pack',
  'science_pack': 'Science Pack',
  'blackbox_press_kit': 'Blackbox Press Kit',
  'dad_pack': 'Dad Pack',
  'sci_fi_pack': 'Sci-Fi Pack',
  'food_pack': 'Food Pack',
  'design_pack': 'Design Pack',
  'pride_pack': 'Pride Pack',
  'theatre_pack': 'Theatre Pack',

  '2012_holiday_pack': '2012 Holiday Pack',
  '2013_holiday_pack': '2013 Holiday Pack',
  '2014_holiday_pack': '2014 Holiday Pack',
  'jew_pack': 'Jew Pack / Chosen People Pack',
  'seasons_greetings_pack': 'Seasons Greetings Pack',
  'hawaii_2_safe_pack': 'Hawaii 2 Safe Pack',

  'pax2012_oops_kit': 'PAX 2012 "Oops" Kit',
  'pax2013_prime': 'PAX Prime 2013',
  'pax2015_food_pack_A': 'PAX Prime 2015 Food Pack A (Mango)',
  'jack_white_show_pack': 'Jack White Show Pack',
  'pax2013_promo_pack_A': 'PAX East 2013 Promo Pack A',
  'pax2014_east': 'PAX East 2014',
  'pax2015_food_pack_B': 'PAX Prime 2015 Food Pack B (Coconut)',
  'pax2013_promo_pack_B': 'PAX East 2013 Promo Pack B',
  'pax2014_east_panel_cards': 'PAX East 2014 - Panel Cards',
  'pax2015_food_pack_C': 'PAX Prime 2015 Food Pack C (Cherry)',
  'pax2013_promo_pack_C': 'PAX East 2013 Promo Pack C',
  'pax2014_prime_panel_cards': 'PAX Prime 2014 - Panel Cards',
  'gencon2018_midterm_election_pack': 'Gen Con 2018 Midterm Election Pack',
  'pax2014_custom_printed_cards': 'PAX Prime 2014 Custom Printed Cards',
  
  'reject_pack': 'Reject Pack',
  'fascism_pack': 'Fascism Pack',
  'vote_for_hillary_pack': 'Vote For Hillary Pack',
  'midterm_pack_2018': 'Midterm Pack 2018',
  'reject_pack_2': 'Reject Pack 2',
  'hanukkah_lol_pack': 'Hanukkah LOL Pack',
  'vote_for_trump_pack': 'Vote For Trump Pack',
  'house_of_cards_pack': 'House of Cards Pack',
  'mass_effect_pack': 'Mass Effect Pack',
  'desert_bus_for_hope_pack': 'Desert Bus For Hope Pack',
  'tabletop_pack': 'Tabletop Pack',
  'retail_product_pack': 'Retail Product Pack',
  'post_trump_pack': 'Trump Bug Out Bag / Post-Trump Pack',
  'hidden_compartment_pack': 'Hidden Compartment Pack',
  'theatre_pack_cats_musical_pack': 'Theatre Pack - CATS Musical Pack'
}

// Validate RANGES and PACKNAMES correspondance.
if (Object.keys(RANGES).length != Object.keys(PACKNAMES).length){
  throw new Error('RANGES and PACKNAMES do not correspond!');
}
for (const key in RANGES) {
  if (!PACKNAMES.hasOwnProperty(key)) {
    throw new Error('RANGES and PACKNAMES do not correspond!');
  }
}

// Validate RANGES object.
// Since every pack has at least white cards, we can afford to assume the white cards exist
// and do our checks when black cards exist.
for (const key in RANGES) {
  if (isNaN(RANGES[key][0])) throw new Error('Worksheet ID is not a number!');
  const whiteRange = RANGES[key][1].split(':');
  if (RANGES[key][2]) {
    const blackRange = RANGES[key][2].split(':');
    let blackCols = [];
    for (const axis of blackRange) {
      blackCols.push(axis.replace(/[0-9]/g, ''));
    }
    if (blackCols[0].length == blackCols[1].length && blackCols[0] >= blackCols[1]) throw new Error('Black range is not valid!');
  }
  if (whiteRange[0][0] != whiteRange[1][0]) throw new Error('White range is not valid!'); 
}

// Fetch all packs.
let callCooldown = 0;
let i = 0;
const totalPacks = Object.keys(PACKNAMES).length;

console.log('Fetching expansion packs...');
for (const key in PACKNAMES) {
  callCooldown+=200;
  setTimeout(() => {
    const pack = new Pack(spreadsheetID, key, PACKNAMES[key], RANGES[key]);
    pack.fetchData().then( name => {
      i++;
      console.log(`[${Math.floor(100 * i / totalPacks)}%] - Fetched ${name}.`);
      if (i == totalPacks) listPacks();
    }).catch(err => console.error(err))
  }, callCooldown);
}

function listPacks() {
  // Create JSON with data from all expansion packs.
  let allPacks = {
    "packs": []
  }

  const packFiles = fs.readdirSync(absolutePath).filter(file => file.endsWith('.json'));
  for (const file of packFiles) {
    const pack = require(relativePath + file);
    allPacks.packs.push({
      "name": pack.pack.name,
      "id": pack.pack.id,
      "quantity": pack.quantity
    });
  }

  fs.writeFileSync('./data/packs.json', JSON.stringify(allPacks, null, 2), function(err) {
    if (err) return console.log(err); 
  });

  console.log(`[DONE] - Created JSON with data from all expansion packs with ${allPacks.packs.length} entries.`);
}


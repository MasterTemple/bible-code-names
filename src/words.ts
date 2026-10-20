// Word pools for the board, grouped into categories the host can mix and match.
// Keep words short (each part of a two-word entry at 10 letters or fewer) so
// cards stay legible on a phone held in portrait. Longer words need a soft
// hyphen (\u00ad) where they should break on small screens.
// Each word has a difficulty: words listed in a category's `medium` or `hard`
// list have that difficulty, and every other word is easy.
// NOTE: boards are derived from these lists, and a category's position in
// CATEGORIES is its bit in the game code. Append new categories at the end and
// avoid reordering categories or their words, or existing codes will produce
// different boards. Retagging a word's difficulty is safe for codes that
// include every difficulty.

export type Difficulty = 'easy' | 'medium' | 'hard'

export const DIFFICULTIES: readonly { id: Difficulty; name: string; hint: string }[] = [
  { id: 'easy', name: 'Easy', hint: 'Familiar to most churchgoers and kids' },
  { id: 'medium', name: 'Medium', hint: 'Sunday school graduates and history buffs' },
  { id: 'hard', name: 'Hard', hint: 'Seminary students and Bible trivia champions' },
]

export const ALL_DIFFICULTIES: readonly Difficulty[] = DIFFICULTIES.map((d) => d.id)

export type Group = 'scripture' | 'church'

export const GROUPS: readonly { id: Group; name: string }[] = [
  { id: 'scripture', name: 'Scripture' },
  { id: 'church', name: 'Church & Theology' },
]

export interface Category {
  id: string
  name: string
  /** Section of the start dialog the category is listed in. */
  group: Group
  words: readonly string[]
  medium?: readonly string[]
  hard?: readonly string[]
  /** Selected when the host has no saved preference. */
  default: boolean
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'ot-people',
    name: 'Old Testament People',
    group: 'scripture',
    default: true,
    words: [
      'Adam', 'Eve', 'Cain', 'Abel', 'Seth', 'Enoch', 'Methuselah', 'Noah',
      'Abraham', 'Sarah', 'Hagar', 'Ishmael', 'Isaac', 'Rebekah', 'Jacob', 'Esau',
      'Rachel', 'Leah', 'Joseph', 'Benjamin', 'Judah', 'Levi', 'Reuben', 'Lot',
      'Moses', 'Aaron', 'Miriam', 'Pharaoh', 'Joshua', 'Caleb', 'Rahab', 'Balaam',
      'Deborah', 'Jael', 'Gideon', 'Samson', 'Delilah', 'Ruth', 'Naomi', 'Boaz',
      'Hannah', 'Eli', 'Samuel', 'Saul', 'Jonathan', 'David', 'Goliath',
      'Bathsheba', 'Absalom', 'Nathan', 'Solomon', 'Elijah', 'Elisha', 'Ahab',
      'Jezebel', 'Naaman', 'Hezekiah', 'Josiah', 'Isaiah', 'Jeremiah', 'Ezekiel',
      'Daniel', 'Jonah', 'Hosea', 'Amos', 'Micah', 'Esther', 'Mordecai', 'Haman',
      'Nehemiah', 'Ezra', 'Job', 'Cyrus',
    ],
    medium: [
      'Seth', 'Enoch', 'Methuselah', 'Hagar', 'Ishmael', 'Rebekah',
      'Rachel', 'Leah', 'Benjamin', 'Judah', 'Levi', 'Lot', 'Miriam',
      'Caleb', 'Rahab', 'Balaam', 'Deborah', 'Gideon', 'Naomi', 'Boaz',
      'Hannah', 'Eli', 'Samuel', 'Saul', 'Jonathan', 'Bathsheba', 'Absalom',
      'Nathan', 'Elisha', 'Ahab', 'Jezebel', 'Isaiah', 'Jeremiah',
      'Ezekiel', 'Mordecai', 'Haman', 'Nehemiah', 'Ezra',
    ],
    hard: [
      'Reuben', 'Jael', 'Naaman', 'Hezekiah', 'Josiah', 'Hosea', 'Amos',
      'Micah', 'Cyrus',
    ],
  },
  {
    id: 'nt-people',
    name: 'New Testament People',
    group: 'scripture',
    default: true,
    words: [
      'Mary', 'Joseph', 'Elizabeth', 'Zechariah', 'Simeon', 'Anna', 'Peter',
      'Andrew', 'James', 'John', 'Philip', 'Thomas', 'Matthew', 'Mark', 'Luke',
      'Judas', 'Martha', 'Lazarus', 'Zacchaeus', 'Nicodemus', 'Pilate', 'Herod',
      'Barabbas', 'Caiaphas', 'Stephen', 'Paul', 'Barnabas', 'Silas', 'Timothy',
      'Titus', 'Lydia', 'Priscilla', 'Aquila', 'Apollos', 'Philemon', 'Onesimus',
      'Legion', 'Magdalene', 'Cornelius', 'Ananias', 'Tabitha', 'Felix', 'Festus',
      'Agrippa', 'Gabriel', 'Michael', 'Satan',
    ],
    medium: [
      'Andrew', 'Elizabeth', 'Zechariah', 'Philip', 'Nicodemus', 'Barabbas',
      'Stephen', 'Barnabas', 'Silas', 'Timothy', 'Lydia', 'Legion',
      'Magdalene', 'Michael', 'Caiaphas', 'Titus', 'Cornelius',
    ],
    hard: [
      'Simeon', 'Anna', 'Priscilla', 'Aquila', 'Apollos', 'Philemon',
      'Onesimus', 'Ananias', 'Tabitha', 'Felix', 'Festus', 'Agrippa',
    ],
  },
  {
    id: 'places',
    name: 'Places',
    group: 'scripture',
    default: true,
    words: [
      'Eden', 'Babel', 'Ur', 'Ararat', 'Egypt', 'Goshen', 'Canaan', 'Sodom',
      'Jericho', 'Jordan', 'Sinai', 'Horeb', 'Zion', 'Jerusalem', 'Bethlehem',
      'Nazareth', 'Galilee', 'Samaria', 'Bethany', 'Bethel', 'Hebron', 'Shiloh',
      'Carmel', 'Gilgal', 'Moab', 'Edom', 'Gaza', 'Tyre', 'Nineveh', 'Babylon',
      'Persia', 'Tarshish', 'Rome', 'Athens', 'Corinth', 'Ephesus', 'Philippi',
      'Antioch', 'Damascus', 'Patmos', 'Malta', 'Golgotha', 'Calvary',
      'Gethsemane', 'Capernaum', 'Emmaus', 'Megiddo', 'Red Sea', 'Dead Sea',
      'Macedonia', 'Cana', 'Olivet', 'Jezreel', 'Gath',
    ],
    medium: [
      'Ararat', 'Canaan', 'Sodom', 'Zion', 'Samaria', 'Bethany', 'Nineveh',
      'Persia', 'Athens', 'Corinth', 'Ephesus', 'Damascus', 'Golgotha',
      'Gethsemane', 'Capernaum', 'Emmaus', 'Cana', 'Moab', 'Gaza',
      'Philippi', 'Antioch', 'Patmos', 'Tyre', 'Macedonia', 'Goshen', 'Ur',
      'Hebron', 'Carmel',
    ],
    hard: [
      'Horeb', 'Bethel', 'Shiloh', 'Gilgal', 'Edom', 'Tarshish', 'Malta',
      'Megiddo', 'Olivet', 'Jezreel', 'Gath',
    ],
  },
  {
    id: 'objects',
    name: 'Objects & Artifacts',
    group: 'scripture',
    default: true,
    words: [
      'Ark', 'Manna', 'Staff', 'Rod', 'Sling', 'Stone', 'Harp', 'Lyre', 'Crown',
      'Throne', 'Temple', 'Altar', 'Tabernacle', 'Lampstand', 'Lamp', 'Oil',
      'Bread', 'Wine', 'Cup', 'Net', 'Boat', 'Cross', 'Nail', 'Thorn', 'Tomb',
      'Scroll', 'Tablet', 'Trumpet', 'Shofar', 'Sword', 'Shield', 'Armor',
      'Helmet', 'Belt', 'Sandal', 'Robe', 'Coat', 'Veil', 'Well', 'Jar',
      'Pitcher', 'Basket', 'Coin', 'Talent', 'Denarius', 'Pearl', 'Gold',
      'Silver', 'Myrrh', 'Incense', 'Salt', 'Leaven', 'Ladder', 'Tower', 'Gate',
      'Wall', 'Key', 'Door', 'Roof', 'Mat', 'Table', 'Chariot', 'Plow', 'Sickle',
      'Ephod', 'Manger', 'Inn', 'Seal', 'Bowl', 'Horn', 'Spear', 'Bow', 'Arrow',
      'Mirror', 'Ring', 'Purse', 'Cloak', 'Sackcloth', 'Ashes', 'Idol', 'Tent',
      'Rib', 'Dust', 'Yoke', 'Anchor', 'Millstone',
      'Phylactery', 'Urim', 'Thummim', 'Mercy Seat', 'Laver', 'Censer',
      'Breast\u00adplate', 'Plumb Line', 'Mantle', 'Signet', 'Teraphim',
      'Showbread', 'Wineskin', 'Goad', 'Distaff', 'Quiver', 'Cubit', 'Shekel',
      'Omer',
    ],
    medium: [
      'Lyre', 'Tabernacle', 'Lampstand', 'Talent', 'Denarius', 'Myrrh',
      'Incense', 'Leaven', 'Chariot', 'Sickle', 'Yoke', 'Sackcloth',
      'Ashes', 'Idol', 'Millstone', 'Pitcher', 'Veil',
    ],
    hard: [
      'Ephod', 'Shofar',
      'Phylactery', 'Urim', 'Thummim', 'Mercy Seat', 'Laver', 'Censer',
      'Breast\u00adplate', 'Plumb Line', 'Mantle', 'Signet', 'Teraphim',
      'Showbread', 'Wineskin', 'Goad', 'Distaff', 'Quiver', 'Cubit', 'Shekel',
      'Omer',
    ],
  },
  {
    id: 'creatures',
    name: 'Animals & Plants',
    group: 'scripture',
    default: true,
    words: [
      'Lion', 'Lamb', 'Sheep', 'Goat', 'Donkey', 'Camel', 'Dove', 'Raven',
      'Serpent', 'Fish', 'Whale', 'Ram', 'Ox', 'Calf', 'Eagle', 'Bear', 'Wolf',
      'Pig', 'Frog', 'Locust', 'Gnat', 'Fly', 'Horse', 'Rooster', 'Worm',
      'Sparrow', 'Fox', 'Leviathan', 'Fig', 'Olive', 'Vine', 'Seed', 'Wheat',
      'Tares', 'Barley', 'Cedar', 'Palm', 'Lily', 'Reed', 'Grape', 'Mustard',
      'Hyssop', 'Honey', 'Milk',
      'Sycamore', 'Gazelle', 'Behemoth', 'Coney', 'Hoopoe', 'Ibex', 'Hart',
      'Asp', 'Adder', 'Ostrich', 'Terebinth', 'Tamarisk', 'Acacia', 'Aloes',
      'Cassia', 'Spikenard', 'Gourd', 'Bramble',
    ],
    medium: [
      'Locust', 'Gnat', 'Tares', 'Barley', 'Cedar', 'Reed', 'Mustard',
      'Raven', 'Sparrow',
      'Sycamore', 'Gazelle',
    ],
    hard: [
      'Leviathan', 'Hyssop',
      'Behemoth', 'Coney', 'Hoopoe', 'Ibex', 'Hart', 'Asp', 'Adder', 'Ostrich',
      'Terebinth', 'Tamarisk', 'Acacia', 'Aloes', 'Cassia', 'Spikenard', 'Gourd',
      'Bramble',
    ],
  },
  {
    id: 'nature',
    name: 'Nature & Miracles',
    group: 'scripture',
    default: true,
    words: [
      'Rainbow', 'Flood', 'Rain', 'Fire', 'Cloud', 'Pillar', 'Bush', 'Star',
      'Moon', 'Sun', 'Wind', 'Water', 'Rock', 'Mountain', 'Desert', 'Wilderness',
      'River', 'Sea', 'Garden', 'Tree', 'Storm', 'Earthquake', 'Darkness',
      'Light', 'Hail', 'Plague', 'Famine', 'Blood', 'Dew', 'Fleece', 'Miracle',
      'Healing', 'Loaves', 'Whirlwind', 'Shadow',
      'Talking Donkey', 'Brimstone', 'Firmament', 'Pleiades', 'Orion', 'Sundial',
      'Pestilence', 'Mildew', 'Boils', 'Floodgates', 'Axe Head', 'Bronze Snake',
      'Hailstones', 'Locust Swarm',
    ],
    medium: [
      'Pillar', 'Fleece', 'Famine', 'Dew', 'Whirlwind',
      'Talking Donkey', 'Brimstone',
    ],
    hard: [
      'Firmament', 'Pleiades', 'Orion', 'Sundial', 'Pestilence', 'Mildew',
      'Boils', 'Floodgates', 'Axe Head', 'Bronze Snake', 'Hailstones',
      'Locust Swarm',
    ],
  },
  {
    id: 'roles',
    name: 'Roles & Groups',
    group: 'scripture',
    default: true,
    words: [
      'Prophet', 'Priest', 'King', 'Queen', 'Judge', 'Shepherd', 'Fisherman',
      'Carpenter', 'Pharisee', 'Sadducee', 'Scribe', 'Centurion', 'Soldier',
      'Disciple', 'Apostle', 'Elder', 'Deacon', 'Widow', 'Orphan', 'Leper',
      'Beggar', 'Servant', 'Master', 'Bride', 'Groom', 'Virgin', 'Magi',
      'Wise Men', 'Giant', 'Spy', 'Harlot', 'Prodigal', 'Samaritan', 'Gentile',
      'Philistine', 'Levite', 'Nazirite', 'Zealot', 'Angel', 'Cherub', 'Seraph',
      'Demon', 'Tribe', 'Sower', 'Tax Man',
      'Steward', 'Cupbearer', 'Sorcerer', 'Eunuch', 'Tetrarch', 'Proconsul',
      'Satrap', 'Concubine', 'Herald', 'Gleaner', 'Diviner', 'Kinsman', 'Essene',
      'Herodian', 'Publican', 'Magistrate', 'Tanner',
    ],
    medium: [
      'Pharisee', 'Scribe', 'Centurion', 'Apostle', 'Elder', 'Deacon',
      'Leper', 'Virgin', 'Harlot', 'Prodigal', 'Samaritan', 'Gentile',
      'Philistine', 'Levite', 'Cherub', 'Sower', 'Tax Man',
      'Steward', 'Cupbearer', 'Sorcerer', 'Eunuch',
    ],
    hard: [
      'Sadducee', 'Nazirite', 'Zealot', 'Seraph',
      'Tetrarch', 'Proconsul', 'Satrap', 'Concubine', 'Herald', 'Gleaner',
      'Diviner', 'Kinsman', 'Essene', 'Herodian', 'Publican', 'Magistrate',
      'Tanner',
    ],
  },
  {
    id: 'faith',
    name: 'Faith & Worship',
    group: 'scripture',
    default: true,
    words: [
      'Creation', 'Exodus', 'Passover', 'Pentecost', 'Sabbath', 'Jubilee',
      'Feast', 'Fast', 'Wedding', 'Census', 'Baptism', 'Communion', 'Supper',
      'Ascension', 'Covenant', 'Grace', 'Faith', 'Hope', 'Love', 'Mercy',
      'Glory', 'Kingdom', 'Gospel', 'Psalm', 'Proverb', 'Parable', 'Prayer',
      'Hymn', 'Tithe', 'Offering', 'Sacrifice', 'Law', 'Sin', 'Repentance',
      'Heaven', 'Hades', 'Eternity', 'Promise', 'Blessing', 'Curse', 'Vision',
      'Dream', 'Wisdom', 'Truth', 'Spirit', 'Word', 'Amen', 'Hosanna',
      'Alleluia', 'Shalom', 'Battle', 'Exile', 'Harvest', 'Good News', 'Tongues',
      'Anointing', 'Lament', 'Sheol', 'Gehenna', 'First\u00adfruits', 'Libation',
      'Vow', 'Puri\u00adfication', 'Consecrate', 'Taber\u00adnacles',
      'Unleavened', 'Sabbatical', 'Ordinance',
    ],
    medium: [
      'Exodus', 'Passover', 'Pentecost', 'Sabbath', 'Fast', 'Census',
      'Ascension', 'Covenant', 'Tithe', 'Repentance', 'Hades', 'Eternity',
      'Hosanna', 'Alleluia', 'Shalom', 'Exile', 'Tongues', 'Proverb',
      'Anointing', 'Lament',
    ],
    hard: [
      'Jubilee',
      'Sheol', 'Gehenna', 'First\u00adfruits', 'Libation', 'Vow',
      'Puri\u00adfication', 'Consecrate', 'Taber\u00adnacles', 'Unleavened',
      'Sabbatical', 'Ordinance',
    ],
  },
  {
    id: 'books',
    name: 'Books of the Bible',
    group: 'scripture',
    default: false,
    words: [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuter\u00adonomy', 'Joshua',
      'Judges', 'Ruth', 'Samuel', 'Kings', 'Chronicles', 'Ezra', 'Nehemiah',
      'Esther', 'Job', 'Psalms', 'Proverbs', 'Eccles\u00adiastes', 'Song of Songs',
      'Isaiah', 'Jeremiah', 'Lamen\u00adtations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
      'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
      'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts',
      'Romans', 'Corin\u00adthians', 'Galatians', 'Ephesians', 'Philip\u00adpians',
      'Colossians', 'Thessa\u00adlonians', 'Timothy', 'Titus', 'Philemon', 'Hebrews',
      'James', 'Peter', 'Jude', 'Revelation',
    ],
    medium: [
      'Leviticus', 'Numbers', 'Deuter\u00adonomy', 'Joshua', 'Judges',
      'Ruth', 'Samuel', 'Kings', 'Chronicles', 'Ezra', 'Nehemiah', 'Job',
      'Song of Songs', 'Isaiah', 'Jeremiah', 'Ezekiel', 'Romans',
      'Corin\u00adthians', 'Galatians', 'Ephesians', 'Philip\u00adpians',
      'Colossians', 'Hebrews', 'James', 'Peter', 'Timothy',
      'Eccles\u00adiastes', 'Lamen\u00adtations',
    ],
    hard: [
      'Hosea', 'Joel', 'Amos', 'Obadiah', 'Micah', 'Nahum', 'Habakkuk',
      'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Thessa\u00adlonians',
      'Titus', 'Philemon', 'Jude',
    ],
  },
  {
    id: 'revelation',
    name: 'Revelation & Prophecy',
    group: 'scripture',
    default: false,
    words: [
      'Beast', 'Dragon', 'Horseman', 'Seal', 'Bowl', 'Trumpet', 'Lampstand',
      'Abyss', 'Throne', 'Lamb', 'Scroll', 'Elder', 'Babylon', 'Armageddon',
      'Millennium', 'Antichrist', 'Alpha', 'Omega', 'New Earth', 'Bride',
      'Crown', 'New Jerusalem', 'Lake', 'Sickle', 'Winepress', 'Wormwood',
      'Locust', 'Mark', 'Number', 'Witness', 'Martyr', 'Rapture', 'Judgment',
      'Statue', 'Furnace', 'Lions Den', 'Writing', 'Dry Bones', 'Watchman',
      'Remnant', 'Branch', 'Seventy',
      'Laodicea', 'Smyrna', 'Pergamum', 'Thyatira', 'Sardis',
      'Phila\u00addelphia', 'Nicolaitan', 'Gog', 'Magog', 'Abaddon', 'Euphrates',
      'Jasper', 'Little Horn', 'Mene Tekel', 'Ancient of Days',
    ],
    medium: [
      'Horseman', 'Seal', 'Bowl', 'Lampstand', 'Elder', 'Babylon',
      'Armageddon', 'Millennium', 'Antichrist', 'New Earth', 'New Jerusalem', 'Sickle', 'Winepress', 'Locust', 'Mark', 'Martyr',
      'Rapture', 'Dry Bones', 'Watchman', 'Writing',
    ],
    hard: [
      'Abyss', 'Wormwood', 'Remnant', 'Seventy', 'Branch',
      'Laodicea', 'Smyrna', 'Pergamum', 'Thyatira', 'Sardis',
      'Phila\u00addelphia', 'Nicolaitan', 'Gog', 'Magog', 'Abaddon', 'Euphrates',
      'Jasper', 'Little Horn', 'Mene Tekel', 'Ancient of Days',
    ],
  },
  {
    id: 'christmas-easter',
    name: 'Christmas & Easter',
    group: 'scripture',
    default: true,
    words: [
      'Manger', 'Stable', 'Inn', 'Star', 'Angel', 'Shepherd', 'Magi', 'Gold',
      'Myrrh', 'Frank\u00adincense', 'Bethlehem', 'Census', 'Swaddling', 'Gabriel',
      'Mary', 'Joseph', 'Herod', 'Camel', 'Gifts', 'Advent', 'Wreath', 'Candle',
      'Carol', 'Nativity', 'Virgin', 'Emmanuel', 'Gloria', 'Noel', 'Palm',
      'Donkey', 'Hosanna', 'Upper Room', 'Supper', 'Bread', 'Cup', 'Garden',
      'Kiss', 'Rooster', 'Thorns', 'Crown', 'Cross', 'Nails', 'Spear', 'Vinegar',
      'Linen', 'Tomb', 'Stone', 'Spices', 'Sunrise', 'Empty', 'Risen', 'Lily',
      'Lamb', 'Passover', 'Silver', 'Judas', 'Pilate', 'Basin', 'Towel', 'Veil',
      'Lent', 'Good Friday', 'Holy Week', 'Sponge', 'Shroud', 'Gardener', 'Dice',
      'Quirinius', 'Magnificat', 'Benedictus', 'Nunc Dimittis', 'Epiphany',
      'Maundy', 'Cleopas', 'Arimathea', 'Gabbatha', 'Hyssop', 'Simeon', 'Anna',
    ],
    medium: [
      'Myrrh', 'Frank\u00adincense', 'Census', 'Swaddling', 'Gabriel',
      'Advent', 'Emmanuel', 'Gloria', 'Noel', 'Upper Room', 'Hosanna',
      'Vinegar', 'Linen', 'Spices', 'Basin', 'Passover', 'Silver',
      'Lent', 'Good Friday', 'Holy Week', 'Sponge', 'Shroud', 'Gardener', 'Dice',
    ],
    hard: [
      'Veil',
      'Quirinius', 'Magnificat', 'Benedictus', 'Nunc Dimittis', 'Epiphany',
      'Maundy', 'Cleopas', 'Arimathea', 'Gabbatha', 'Hyssop', 'Simeon', 'Anna',
    ],
  },
  {
    id: 'church-life',
    name: 'Church Life',
    group: 'church',
    default: true,
    words: [
      'Pew', 'Pulpit', 'Choir', 'Hymnal', 'Sermon', 'Pastor', 'Usher', 'Potluck',
      'Bulletin', 'Steeple', 'Bell', 'Organ', 'Piano', 'Candle', 'Sunday', 'Bible',
      'Nursery', 'Youth Group', 'Missions', 'Retreat', 'Camp', 'Revival',
      'Testimony', 'Worship', 'Chapel', 'Baptistry', 'Offering', 'Plate',
      'Altar Call', 'Bene\u00addiction', 'Doxology', 'Amen', 'Small Group', 'Deacon',
      'Elder', 'Greeter', 'Coffee', 'Donut', 'Lectern', 'Sanctuary', 'Fellowship',
      'Prayer', 'Hymn', 'Verse', 'Sunday School', 'Picnic', 'Wedding', 'Funeral',
      'Tithe', 'Stained Glass', 'Microphone', 'Projector', 'Parking Lot',
      'Narthex', 'Nave', 'Vestry', 'Chancel', 'Liturgy', 'Lectionary', 'Vespers',
      'Matins', 'Vestments', 'Stole', 'Chalice', 'Paten', 'Thurible', 'Sexton',
      'Verger', 'Rubric',
    ],
    medium: [
      'Lectern', 'Bene\u00addiction', 'Doxology', 'Baptistry', 'Sanctuary',
      'Fellowship', 'Testimony', 'Revival', 'Tithe', 'Bulletin',
    ],
    hard: [
      'Narthex', 'Nave', 'Vestry', 'Chancel', 'Liturgy', 'Lectionary', 'Vespers',
      'Matins', 'Vestments', 'Stole', 'Chalice', 'Paten', 'Thurible', 'Sexton',
      'Verger', 'Rubric',
    ],
  },
  {
    id: 'church-history',
    name: 'Church History',
    group: 'church',
    default: false,
    words: [
      'Constan\u00adtine', 'Nicaea', 'Augustine', 'Patrick', 'Monk', 'Monastery',
      'Nun', 'Abbey', 'Crusade', 'Pope', 'Cathedral', 'Creed', 'Council', 'Martyr',
      'Catacombs', 'Pilgrim', 'Puritan', 'Mayflower', 'Wesley', 'Spurgeon',
      'Moody', 'Revival', 'Missionary', 'Bunyan', 'Byzantine', 'Schism', 'Jerome',
      'Francis', 'Aquinas', 'Gutenberg', 'Orthodox', 'Catholic', 'Methodist',
      'Baptist', 'Quaker', 'Amish', 'Awakening', 'Edwards', 'Whitefield', 'Carey',
      'Living\u00adstone', 'Bonhoeffer', 'C.S. Lewis', 'Billy Graham', 'Icon',
      'Relic', 'Bishop', 'Knights', 'Templar', 'Charle\u00admagne', 'Benedict',
      'Celtic', 'Iona', 'Canterbury', 'Vatican', 'Hudson Taylor', 'Wilber\u00adforce',
      'Jesuit', 'Cluny', 'Lindis\u00adfarne', 'Waldensian', 'Cathar', 'Lollard',
      'Avignon', 'Foxe', 'Zinzendorf', 'Moravian', 'Pietism', 'Jansenist',
      'Loyola', 'Brainerd', 'Judson', 'Keswick',
    ],
    medium: [
      'Constan\u00adtine', 'Augustine', 'Nicaea', 'Council', 'Catacombs',
      'Puritan', 'Wesley', 'Spurgeon', 'Moody', 'Bunyan', 'Byzantine',
      'Schism', 'Jerome', 'Francis', 'Aquinas', 'Gutenberg', 'Awakening',
      'Edwards', 'Living\u00adstone', 'Bonhoeffer', 'Relic', 'Templar',
      'Charle\u00admagne', 'Benedict', 'Celtic', 'Canterbury',
      'Wilber\u00adforce', 'Hudson Taylor',
      'Jesuit',
    ],
    hard: [
      'Whitefield', 'Carey', 'Iona',
      'Cluny', 'Lindis\u00adfarne', 'Waldensian', 'Cathar', 'Lollard', 'Avignon',
      'Foxe', 'Zinzendorf', 'Moravian', 'Pietism', 'Jansenist', 'Loyola',
      'Brainerd', 'Judson', 'Keswick',
    ],
  },
  {
    id: 'reformation',
    name: 'Protestant Reformation',
    group: 'church',
    default: false,
    words: [
      'Luther', 'Calvin', 'Zwingli', 'Knox', 'Tyndale', 'Wycliffe', 'Hus',
      'Erasmus', 'Melanch\u00adthon', 'Cranmer', 'Latimer', 'Wittenberg', 'Geneva',
      'Zurich', 'Worms', 'Augsburg', 'Theses', 'Indulgence', 'Purgatory', 'Tetzel',
      'Sola Fide', 'Sola Gratia', 'Sola Scriptura', 'Solus Christus', 'Anabaptist',
      'Huguenot', 'Puritan', 'Covenanter', 'Catechism', 'Heidelberg',
      'West\u00adminster', 'Dort', 'Trent', 'Inqui\u00adsition', 'Printing', 'Press',
      'Hammer', 'Door', 'Lutheran', 'Reformed', 'Presbytery', 'Anglican',
      'Henry VIII', 'Boleyn', 'Bloody Mary', 'Psalter', 'Vernacular', 'Mass',
      'Diet', 'Edict', 'Heretic', 'Stake', 'Bucer', 'Marburg', 'Katharina',
      'Five Solas', 'Pamphlet', 'Monk',
    ],
    medium: [
      'Calvin', 'Knox', 'Tyndale', 'Wycliffe', 'Erasmus', 'Wittenberg',
      'Geneva', 'Worms', 'Theses', 'Indulgence', 'Purgatory', 'Sola Fide',
      'Sola Gratia', 'Sola Scriptura', 'Solus Christus', 'Five Solas',
      'Puritan', 'Catechism', 'West\u00adminster', 'Reformed', 'Presbytery',
      'Anglican', 'Boleyn', 'Psalter', 'Vernacular', 'Diet', 'Edict',
      'Zurich', 'Inqui\u00adsition', 'Trent', 'Zwingli', 'Huguenot',
      'Anabaptist',
    ],
    hard: [
      'Hus', 'Melanch\u00adthon', 'Cranmer', 'Latimer', 'Augsburg',
      'Tetzel', 'Covenanter', 'Heidelberg', 'Dort', 'Bucer', 'Marburg',
      'Katharina',
    ],
  },
  {
    id: 'doctrine',
    name: 'Theology & Doctrine',
    group: 'church',
    default: false,
    words: [
      'Trinity', 'Incar\u00adnation', 'Atonement', 'Justi\u00adfication',
      'Sancti\u00adfication', 'Election', 'Predes\u00adtination', 'Sover\u00adeignty',
      'Providence', 'Covenant', 'Redemption', 'Propi\u00adtiation', 'Imputation',
      'Adoption', 'Regen\u00aderation', 'Conversion', 'Depravity', 'Original Sin',
      'Omniscient', 'Omnipotent', 'Omni\u00adpresent', 'Immutable', 'Holiness',
      'Righteous', 'Wrath', 'Mediator', 'Advocate', 'Logos', 'Imago Dei',
      'Free Will', 'Monotheism', 'Escha\u00adtology', 'Apostasy', 'Heresy',
      'Orthodoxy', 'Canon', 'Inspi\u00adration', 'Inerrancy', 'Sacrament',
      'Perse\u00adverance', 'Assurance', 'Calling', 'Union', 'Kenosis', 'Hypostatic',
      'Substitute', 'Ransom', 'Reconcile', 'Glorified', 'Theodicy', 'Revelation',
      'Gospel', 'Law', 'Grace',
    ],
    medium: [
      'Atonement', 'Justi\u00adfication', 'Sancti\u00adfication',
      'Election', 'Predes\u00adtination', 'Sover\u00adeignty', 'Providence',
      'Covenant', 'Redemption', 'Holiness', 'Righteous', 'Wrath',
      'Mediator', 'Advocate', 'Depravity', 'Omniscient', 'Omnipotent',
      'Omni\u00adpresent', 'Inspi\u00adration', 'Assurance', 'Canon',
      'Orthodoxy', 'Apostasy', 'Monotheism', 'Sacrament', 'Substitute',
      'Reconcile', 'Glorified', 'Incar\u00adnation', 'Perse\u00adverance',
      'Regen\u00aderation',
    ],
    hard: [
      'Propi\u00adtiation', 'Imputation', 'Immutable', 'Logos', 'Imago Dei',
      'Escha\u00adtology', 'Inerrancy', 'Kenosis', 'Hypostatic', 'Theodicy',
      'Union',
    ],
  },
  {
    id: 'early-church',
    name: 'Early Church',
    group: 'church',
    default: false,
    words: [
      'Polycarp', 'Ignatius', 'Irenaeus', 'Tertullian', 'Origen', 'Athanasius',
      'Arius', 'Chrysostom', 'Ambrose', 'Basil', 'Gregory', 'Cyprian', 'Justin',
      'Clement', 'Eusebius', 'Nicaea', 'Chalcedon', 'Didache', 'Gnostic',
      'Pelagius', 'Donatist', 'Montanist', 'Marcion', 'Catacombs', 'Martyr',
      'Hermit', 'Antony', 'Desert', 'Monk', 'Jerome', 'Vulgate', 'Creed', 'Canon',
      'Heresy', 'Bishop', 'Presbyter', 'Ichthys', 'Chi Rho', 'Diocletian', 'Nero',
      'Lions', 'Arena', 'Perpetua', 'Edict', 'Milan', 'Alexandria', 'Carthage',
      'Hippo',
    ],
    medium: [
      'Nicaea', 'Jerome', 'Gnostic', 'Canon', 'Heresy', 'Edict', 'Milan',
      'Alexandria', 'Carthage', 'Hippo', 'Ambrose', 'Gregory', 'Arius',
      'Athanasius', 'Vulgate', 'Chi Rho', 'Ichthys', 'Diocletian',
      'Presbyter',
    ],
    hard: [
      'Polycarp', 'Ignatius', 'Origen', 'Clement', 'Justin', 'Antony',
      'Basil', 'Irenaeus', 'Tertullian', 'Chrysostom', 'Cyprian',
      'Eusebius', 'Chalcedon', 'Didache', 'Pelagius', 'Donatist',
      'Montanist', 'Marcion', 'Perpetua',
    ],
  },
  {
    id: 'lesser-known',
    name: 'Lesser-Known People',
    group: 'scripture',
    default: false,
    words: [
      'Shamgar', 'Ehud', 'Jephthah', 'Othniel', 'Tamar', 'Dinah', 'Zipporah',
      'Jethro', 'Korah', 'Achan', 'Phinehas', 'Abigail', 'Michal', 'Joab', 'Abner',
      'Uzzah', 'Mephi\u00adbosheth', 'Rehoboam', 'Jeroboam', 'Athaliah', 'Jehu',
      'Gehazi', 'Baruch', 'Zerubbabel', 'Shadrach', 'Meshach', 'Abednego',
      'Belshazzar', 'Vashti', 'Eutychus', 'Sapphira', 'Demas', 'Dorcas', 'Rhoda',
      'Epaphras', 'Tychicus', 'Jairus', 'Bartimaeus', 'Malchus', 'Joanna',
      'Salome', 'Herodias', 'Lois', 'Eunice', 'Gamaliel', 'Ishbosheth', 'Hur',
      'Nadab', 'Abihu', 'Huldah', 'Obed', 'Jesse', 'Laban', 'Zilpah', 'Bilhah',
      'Keturah', 'Lamech', 'Tubal',
    ],
    medium: [
      'Jethro', 'Tamar', 'Dinah', 'Zipporah', 'Abigail', 'Michal', 'Joab',
      'Laban', 'Jairus', 'Dorcas', 'Rhoda', 'Eutychus', 'Sapphira', 'Lois',
      'Eunice', 'Gamaliel', 'Salome', 'Herodias', 'Belshazzar', 'Vashti',
      'Bartimaeus', 'Rehoboam', 'Jeroboam', 'Obed', 'Lamech', 'Korah',
      'Achan', 'Mephi\u00adbosheth',
    ],
    hard: [
      'Shamgar', 'Ehud', 'Jephthah', 'Othniel', 'Phinehas', 'Abner',
      'Uzzah', 'Athaliah', 'Jehu', 'Gehazi', 'Baruch', 'Zerubbabel',
      'Demas', 'Epaphras', 'Tychicus', 'Malchus', 'Joanna', 'Ishbosheth',
      'Hur', 'Nadab', 'Abihu', 'Huldah', 'Zilpah', 'Bilhah', 'Keturah',
      'Tubal',
    ],
  },
  {
    id: 'hebrew-greek',
    name: 'Hebrew & Greek Words',
    group: 'scripture',
    default: false,
    words: [
      'Agape', 'Logos', 'Shalom', 'Hesed', 'Abba', 'Selah', 'Maranatha',
      'Hallelujah', 'Hosanna', 'Amen', 'Kairos', 'Koinonia', 'Ekklesia', 'Kerygma',
      'Torah', 'Talmud', 'Midrash', 'Elohim', 'Adonai', 'Yahweh', 'El Shaddai',
      'Messiah', 'Christos', 'Rabbi', 'Rabboni', 'Ephphatha', 'Talitha',
      'Immanuel', 'Mammon', 'Raca', 'Corban', 'Sanhedrin', 'Shekinah', 'Shema',
      'Shofar', 'Menorah', 'Mezuzah', 'Tallit', 'Kosher', 'Mitzvah', 'Shabbat',
      'Pesach', 'Sukkot', 'Yom Kippur', 'Purim', 'Hanukkah', 'Diaspora',
      'Septuagint', 'Euangelion', 'Pneuma', 'Sarx', 'Dunamis', 'Metanoia',
      'Parousia', 'Charis', 'Pistis', 'Doxa', 'Alpha', 'Omega',
    ],
    medium: [
      'Agape', 'Logos', 'Selah', 'Maranatha', 'Torah', 'Elohim', 'Adonai',
      'Yahweh', 'El Shaddai', 'Talmud', 'Rabboni', 'Mammon', 'Sanhedrin',
      'Shofar', 'Shabbat', 'Yom Kippur', 'Purim', 'Pesach', 'Diaspora',
      'Septuagint', 'Shema', 'Mitzvah', 'Shekinah',
    ],
    hard: [
      'Hesed', 'Kairos', 'Koinonia', 'Ekklesia', 'Kerygma', 'Midrash',
      'Christos', 'Ephphatha', 'Talitha', 'Raca', 'Corban', 'Mezuzah',
      'Tallit', 'Sukkot', 'Euangelion', 'Pneuma', 'Sarx', 'Dunamis',
      'Metanoia', 'Parousia', 'Charis', 'Pistis', 'Doxa',
    ],
  },
]

/** Human-readable list of categories; `limit` collapses the tail into "+N more". */
export function difficultyOf(category: Category, word: string): Difficulty {
  if (category.hard?.includes(word)) return 'hard'
  if (category.medium?.includes(word)) return 'medium'
  return 'easy'
}

export function categoryNames(categories: readonly number[], limit = Infinity): string {
  if (categories.length === CATEGORIES.length) return 'All categories'
  const names = categories.map((i) => CATEGORIES[i].name)
  if (names.length <= limit) return names.join(' · ')
  return `${names.slice(0, limit).join(' · ')} +${names.length - limit} more`
}

export function difficultyNames(difficulties: readonly Difficulty[]): string {
  if (difficulties.length === DIFFICULTIES.length) return 'All difficulties'
  return DIFFICULTIES.filter((d) => difficulties.includes(d.id)).map((d) => d.name).join(' & ')
}

/** One-line summary of a game's settings, e.g. "Easy & Medium · Places · Church History". */
export function describeSettings(categories: readonly number[], difficulties: readonly Difficulty[], limit = Infinity): string {
  return `${difficultyNames(difficulties)} · ${categoryNames(categories, limit)}`
}

/**
 * Words in the selected categories at the selected difficulties, de-duplicated
 * in a stable order. With every difficulty this is each category's full list.
 */
export function wordsFor(selected: readonly number[], difficulties: readonly Difficulty[] = ALL_DIFFICULTIES): string[] {
  return [
    ...new Set(
      selected.flatMap((i) => {
        const category = CATEGORIES[i]
        return category ? category.words.filter((w) => difficulties.includes(difficultyOf(category, w))) : []
      }),
    ),
  ]
}

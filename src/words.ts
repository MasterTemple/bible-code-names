// Word pools for the board, grouped into categories the host can mix and match.
// Keep words short (each part of a two-word entry at 10 letters or fewer) so
// cards stay legible on a phone held in portrait. Longer words need a soft
// hyphen (\u00ad) where they should break on small screens.
// NOTE: boards are derived from these lists, and a category's position in
// CATEGORIES is its bit in the game code. Append new categories at the end and
// avoid reordering, or existing codes will produce different boards.

export type Difficulty = 'easy' | 'medium' | 'hard'

export const DIFFICULTIES: readonly { id: Difficulty; name: string; hint: string }[] = [
  { id: 'easy', name: 'Easy', hint: 'Familiar to most churchgoers and kids' },
  { id: 'medium', name: 'Medium', hint: 'Sunday school graduates and history buffs' },
  { id: 'hard', name: 'Hard', hint: 'Seminary students and Bible trivia champions' },
]

export interface Category {
  id: string
  name: string
  difficulty: Difficulty
  words: readonly string[]
  /** Selected when the host has no saved preference. */
  default: boolean
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'ot-people',
    name: 'Old Testament People',
    difficulty: 'easy',
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
  },
  {
    id: 'nt-people',
    name: 'New Testament People',
    difficulty: 'easy',
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
  },
  {
    id: 'places',
    name: 'Places',
    difficulty: 'medium',
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
  },
  {
    id: 'objects',
    name: 'Objects & Artifacts',
    difficulty: 'easy',
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
    ],
  },
  {
    id: 'creatures',
    name: 'Animals & Plants',
    difficulty: 'easy',
    default: true,
    words: [
      'Lion', 'Lamb', 'Sheep', 'Goat', 'Donkey', 'Camel', 'Dove', 'Raven',
      'Serpent', 'Fish', 'Whale', 'Ram', 'Ox', 'Calf', 'Eagle', 'Bear', 'Wolf',
      'Pig', 'Frog', 'Locust', 'Gnat', 'Fly', 'Horse', 'Rooster', 'Worm',
      'Sparrow', 'Fox', 'Leviathan', 'Fig', 'Olive', 'Vine', 'Seed', 'Wheat',
      'Tares', 'Barley', 'Cedar', 'Palm', 'Lily', 'Reed', 'Grape', 'Mustard',
      'Hyssop', 'Honey', 'Milk',
    ],
  },
  {
    id: 'nature',
    name: 'Nature & Miracles',
    difficulty: 'easy',
    default: true,
    words: [
      'Rainbow', 'Flood', 'Rain', 'Fire', 'Cloud', 'Pillar', 'Bush', 'Star',
      'Moon', 'Sun', 'Wind', 'Water', 'Rock', 'Mountain', 'Desert', 'Wilderness',
      'River', 'Sea', 'Garden', 'Tree', 'Storm', 'Earthquake', 'Darkness',
      'Light', 'Hail', 'Plague', 'Famine', 'Blood', 'Dew', 'Fleece', 'Miracle',
      'Healing', 'Loaves', 'Whirlwind', 'Shadow',
    ],
  },
  {
    id: 'roles',
    name: 'Roles & Groups',
    difficulty: 'medium',
    default: true,
    words: [
      'Prophet', 'Priest', 'King', 'Queen', 'Judge', 'Shepherd', 'Fisherman',
      'Carpenter', 'Pharisee', 'Sadducee', 'Scribe', 'Centurion', 'Soldier',
      'Disciple', 'Apostle', 'Elder', 'Deacon', 'Widow', 'Orphan', 'Leper',
      'Beggar', 'Servant', 'Master', 'Bride', 'Groom', 'Virgin', 'Magi',
      'Wise Men', 'Giant', 'Spy', 'Harlot', 'Prodigal', 'Samaritan', 'Gentile',
      'Philistine', 'Levite', 'Nazirite', 'Zealot', 'Angel', 'Cherub', 'Seraph',
      'Demon', 'Tribe', 'Sower', 'Tax Man',
    ],
  },
  {
    id: 'faith',
    name: 'Faith & Worship',
    difficulty: 'easy',
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
    ],
  },
  {
    id: 'books',
    name: 'Books of the Bible',
    difficulty: 'medium',
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
  },
  {
    id: 'revelation',
    name: 'Revelation & Prophecy',
    difficulty: 'hard',
    default: false,
    words: [
      'Beast', 'Dragon', 'Horseman', 'Seal', 'Bowl', 'Trumpet', 'Lampstand',
      'Abyss', 'Throne', 'Lamb', 'Scroll', 'Elder', 'Babylon', 'Armageddon',
      'Millennium', 'Antichrist', 'Alpha', 'Omega', 'New Earth', 'Bride',
      'Crown', 'New Jerusalem', 'Lake', 'Sickle', 'Winepress', 'Wormwood',
      'Locust', 'Mark', 'Number', 'Witness', 'Martyr', 'Rapture', 'Judgment',
      'Statue', 'Furnace', 'Lions Den', 'Writing', 'Dry Bones', 'Watchman',
      'Remnant', 'Branch', 'Seventy',
    ],
  },
  {
    id: 'christmas-easter',
    name: 'Christmas & Easter',
    difficulty: 'easy',
    default: true,
    words: [
      'Manger', 'Stable', 'Inn', 'Star', 'Angel', 'Shepherd', 'Magi', 'Gold',
      'Myrrh', 'Frank­incense', 'Bethlehem', 'Census', 'Swaddling', 'Gabriel',
      'Mary', 'Joseph', 'Herod', 'Camel', 'Gifts', 'Advent', 'Wreath', 'Candle',
      'Carol', 'Nativity', 'Virgin', 'Emmanuel', 'Gloria', 'Noel', 'Palm',
      'Donkey', 'Hosanna', 'Upper Room', 'Supper', 'Bread', 'Cup', 'Garden',
      'Kiss', 'Rooster', 'Thorns', 'Crown', 'Cross', 'Nails', 'Spear', 'Vinegar',
      'Linen', 'Tomb', 'Stone', 'Spices', 'Sunrise', 'Empty', 'Risen', 'Lily',
      'Lamb', 'Passover', 'Silver', 'Judas', 'Pilate', 'Basin', 'Towel', 'Veil',
    ],
  },
  {
    id: 'church-life',
    name: 'Church Life',
    difficulty: 'easy',
    default: true,
    words: [
      'Pew', 'Pulpit', 'Choir', 'Hymnal', 'Sermon', 'Pastor', 'Usher', 'Potluck',
      'Bulletin', 'Steeple', 'Bell', 'Organ', 'Piano', 'Candle', 'Sunday', 'Bible',
      'Nursery', 'Youth Group', 'Missions', 'Retreat', 'Camp', 'Revival',
      'Testimony', 'Worship', 'Chapel', 'Baptistry', 'Offering', 'Plate',
      'Altar Call', 'Bene­diction', 'Doxology', 'Amen', 'Small Group', 'Deacon',
      'Elder', 'Greeter', 'Coffee', 'Donut', 'Lectern', 'Sanctuary', 'Fellowship',
      'Prayer', 'Hymn', 'Verse', 'Sunday School', 'Picnic', 'Wedding', 'Funeral',
      'Tithe', 'Stained Glass', 'Microphone', 'Projector', 'Parking Lot',
    ],
  },
  {
    id: 'church-history',
    name: 'Church History',
    difficulty: 'medium',
    default: false,
    words: [
      'Constan­tine', 'Nicaea', 'Augustine', 'Patrick', 'Monk', 'Monastery',
      'Nun', 'Abbey', 'Crusade', 'Pope', 'Cathedral', 'Creed', 'Council', 'Martyr',
      'Catacombs', 'Pilgrim', 'Puritan', 'Mayflower', 'Wesley', 'Spurgeon',
      'Moody', 'Revival', 'Missionary', 'Bunyan', 'Byzantine', 'Schism', 'Jerome',
      'Francis', 'Aquinas', 'Gutenberg', 'Orthodox', 'Catholic', 'Methodist',
      'Baptist', 'Quaker', 'Amish', 'Awakening', 'Edwards', 'Whitefield', 'Carey',
      'Living­stone', 'Bonhoeffer', 'C.S. Lewis', 'Billy Graham', 'Icon',
      'Relic', 'Bishop', 'Knights', 'Templar', 'Charle­magne', 'Benedict',
      'Celtic', 'Iona', 'Canterbury', 'Vatican', 'Hudson Taylor', 'Wilber\u00adforce',
    ],
  },
  {
    id: 'reformation',
    name: 'Protestant Reformation',
    difficulty: 'medium',
    default: false,
    words: [
      'Luther', 'Calvin', 'Zwingli', 'Knox', 'Tyndale', 'Wycliffe', 'Hus',
      'Erasmus', 'Melanch­thon', 'Cranmer', 'Latimer', 'Wittenberg', 'Geneva',
      'Zurich', 'Worms', 'Augsburg', 'Theses', 'Indulgence', 'Purgatory', 'Tetzel',
      'Sola Fide', 'Sola Gratia', 'Sola Scriptura', 'Solus Christus', 'Anabaptist',
      'Huguenot', 'Puritan', 'Covenanter', 'Catechism', 'Heidelberg',
      'West­minster', 'Dort', 'Trent', 'Inqui­sition', 'Printing', 'Press',
      'Hammer', 'Door', 'Lutheran', 'Reformed', 'Presbytery', 'Anglican',
      'Henry VIII', 'Boleyn', 'Bloody Mary', 'Psalter', 'Vernacular', 'Mass',
      'Diet', 'Edict', 'Heretic', 'Stake', 'Bucer', 'Marburg', 'Katharina',
      'Five Solas', 'Pamphlet', 'Monk',
    ],
  },
  {
    id: 'doctrine',
    name: 'Theology & Doctrine',
    difficulty: 'hard',
    default: false,
    words: [
      'Trinity', 'Incar­nation', 'Atonement', 'Justi­fication',
      'Sancti­fication', 'Election', 'Predes­tination', 'Sover­eignty',
      'Providence', 'Covenant', 'Redemption', 'Propi­tiation', 'Imputation',
      'Adoption', 'Regen­eration', 'Conversion', 'Depravity', 'Original Sin',
      'Omniscient', 'Omnipotent', 'Omni­present', 'Immutable', 'Holiness',
      'Righteous', 'Wrath', 'Mediator', 'Advocate', 'Logos', 'Imago Dei',
      'Free Will', 'Monotheism', 'Escha­tology', 'Apostasy', 'Heresy',
      'Orthodoxy', 'Canon', 'Inspi­ration', 'Inerrancy', 'Sacrament',
      'Perse­verance', 'Assurance', 'Calling', 'Union', 'Kenosis', 'Hypostatic',
      'Substitute', 'Ransom', 'Reconcile', 'Glorified', 'Theodicy', 'Revelation',
      'Gospel', 'Law', 'Grace',
    ],
  },
  {
    id: 'early-church',
    name: 'Early Church',
    difficulty: 'hard',
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
  },
  {
    id: 'lesser-known',
    name: 'Lesser-Known People',
    difficulty: 'hard',
    default: false,
    words: [
      'Shamgar', 'Ehud', 'Jephthah', 'Othniel', 'Tamar', 'Dinah', 'Zipporah',
      'Jethro', 'Korah', 'Achan', 'Phinehas', 'Abigail', 'Michal', 'Joab', 'Abner',
      'Uzzah', 'Mephi­bosheth', 'Rehoboam', 'Jeroboam', 'Athaliah', 'Jehu',
      'Gehazi', 'Baruch', 'Zerubbabel', 'Shadrach', 'Meshach', 'Abednego',
      'Belshazzar', 'Vashti', 'Eutychus', 'Sapphira', 'Demas', 'Dorcas', 'Rhoda',
      'Epaphras', 'Tychicus', 'Jairus', 'Bartimaeus', 'Malchus', 'Joanna',
      'Salome', 'Herodias', 'Lois', 'Eunice', 'Gamaliel', 'Ishbosheth', 'Hur',
      'Nadab', 'Abihu', 'Huldah', 'Obed', 'Jesse', 'Laban', 'Zilpah', 'Bilhah',
      'Keturah', 'Lamech', 'Tubal',
    ],
  },
  {
    id: 'hebrew-greek',
    name: 'Hebrew & Greek Words',
    difficulty: 'hard',
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
  },
]

/** Human-readable list of categories; `limit` collapses the tail into "+N more". */
export function categoryNames(categories: readonly number[], limit = Infinity): string {
  if (categories.length === CATEGORIES.length) return 'All categories'
  const names = categories.map((i) => CATEGORIES[i].name)
  if (names.length <= limit) return names.join(' · ')
  return `${names.slice(0, limit).join(' · ')} +${names.length - limit} more`
}

/** All words in the selected categories, de-duplicated in a stable order. */
export function wordsFor(selected: readonly number[]): string[] {
  return [...new Set(selected.flatMap((i) => CATEGORIES[i]?.words ?? []))]
}

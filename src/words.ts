// Word pools for the board, grouped into categories the host can mix and match.
// Keep words short (each part of a two-word entry at 10 letters or fewer) so
// cards stay legible on a phone held in portrait. Longer words need a soft
// hyphen (\u00ad) where they should break on small screens.
// NOTE: boards are derived from these lists, and a category's position in
// CATEGORIES is its bit in the game code. Append new categories at the end and
// avoid reordering, or existing codes will produce different boards.

export interface Category {
  id: string
  name: string
  words: readonly string[]
  /** Selected when the host has no saved preference. */
  default: boolean
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'ot-people',
    name: 'Old Testament People',
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
]

/** All words in the selected categories, de-duplicated in a stable order. */
export function wordsFor(selected: readonly number[]): string[] {
  return [...new Set(selected.flatMap((i) => CATEGORIES[i]?.words ?? []))]
}

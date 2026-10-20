// Word pool for the board. Keep every word (or each part of a two-word entry)
// at 10 letters or fewer so cards stay legible on a phone held in portrait.
// NOTE: boards are derived from this list, so editing it changes which words
// an existing game code produces. Host and spymasters must be on the same build.

const PEOPLE = [
  'Adam', 'Eve', 'Cain', 'Abel', 'Seth', 'Enoch', 'Methuselah', 'Noah',
  'Abraham', 'Sarah', 'Hagar', 'Ishmael', 'Isaac', 'Rebekah', 'Jacob', 'Esau',
  'Rachel', 'Leah', 'Joseph', 'Benjamin', 'Judah', 'Levi', 'Reuben', 'Lot',
  'Moses', 'Aaron', 'Miriam', 'Pharaoh', 'Joshua', 'Caleb', 'Rahab', 'Balaam',
  'Deborah', 'Jael', 'Gideon', 'Samson', 'Delilah', 'Ruth', 'Naomi', 'Boaz',
  'Hannah', 'Eli', 'Samuel', 'Saul', 'Jonathan', 'David', 'Goliath',
  'Bathsheba', 'Absalom', 'Nathan', 'Solomon', 'Elijah', 'Elisha', 'Ahab',
  'Jezebel', 'Naaman', 'Hezekiah', 'Josiah', 'Isaiah', 'Jeremiah', 'Ezekiel',
  'Daniel', 'Jonah', 'Hosea', 'Amos', 'Micah', 'Esther', 'Mordecai', 'Haman',
  'Nehemiah', 'Ezra', 'Job', 'Cyrus', 'Gabriel', 'Michael', 'Satan', 'Mary',
  'Joseph', 'Elizabeth', 'Zechariah', 'Peter', 'Andrew', 'James', 'John',
  'Thomas', 'Matthew', 'Mark', 'Luke', 'Judas', 'Martha', 'Lazarus',
  'Zacchaeus', 'Nicodemus', 'Pilate', 'Herod', 'Barabbas', 'Caiaphas',
  'Stephen', 'Paul', 'Barnabas', 'Silas', 'Timothy', 'Titus', 'Lydia',
  'Priscilla', 'Apollos', 'Philemon', 'Onesimus', 'Legion', 'Magdalene',
]

const PLACES = [
  'Eden', 'Babel', 'Ur', 'Ararat', 'Egypt', 'Goshen', 'Canaan', 'Sodom',
  'Jericho', 'Jordan', 'Sinai', 'Horeb', 'Zion', 'Jerusalem', 'Bethlehem',
  'Nazareth', 'Galilee', 'Samaria', 'Bethany', 'Bethel', 'Hebron', 'Shiloh',
  'Carmel', 'Gilgal', 'Moab', 'Edom', 'Gaza', 'Tyre', 'Nineveh', 'Babylon',
  'Persia', 'Tarshish', 'Rome', 'Athens', 'Corinth', 'Ephesus', 'Philippi',
  'Antioch', 'Damascus', 'Patmos', 'Malta', 'Golgotha', 'Calvary',
  'Gethsemane', 'Capernaum', 'Emmaus', 'Megiddo', 'Red Sea', 'Dead Sea',
  'Macedonia', 'Cana', 'Olivet', 'Jezreel', 'Gath',
]

const THINGS = [
  // Objects & artifacts
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
  'Rib', 'Dust', 'Yoke', 'Anchor', 'Millstone', 'Lamp', 'Mustard',
  // Animals & plants
  'Lion', 'Lamb', 'Sheep', 'Goat', 'Donkey', 'Camel', 'Dove', 'Raven',
  'Serpent', 'Fish', 'Whale', 'Ram', 'Ox', 'Calf', 'Eagle', 'Bear', 'Wolf',
  'Pig', 'Frog', 'Locust', 'Gnat', 'Fly', 'Horse', 'Rooster', 'Worm',
  'Fig', 'Olive', 'Vine', 'Seed', 'Wheat', 'Tares', 'Barley', 'Cedar',
  'Palm', 'Lily', 'Reed', 'Grape', 'Honey', 'Milk',
  // Nature & signs
  'Rainbow', 'Flood', 'Rain', 'Fire', 'Cloud', 'Pillar', 'Bush', 'Star',
  'Moon', 'Sun', 'Wind', 'Water', 'Rock', 'Mountain', 'Desert', 'Wilderness',
  'River', 'Sea', 'Garden', 'Tree', 'Storm', 'Earthquake', 'Darkness',
  'Light', 'Hail', 'Plague', 'Famine', 'Blood', 'Dew', 'Fleece',
  // People groups & roles
  'Prophet', 'Priest', 'King', 'Queen', 'Judge', 'Shepherd', 'Fisherman',
  'Carpenter', 'Pharisee', 'Sadducee', 'Scribe', 'Centurion', 'Soldier',
  'Disciple', 'Apostle', 'Elder', 'Deacon', 'Widow', 'Orphan', 'Leper',
  'Beggar', 'Servant', 'Master', 'Bride', 'Groom', 'Virgin', 'Magi',
  'Wise Men', 'Giant', 'Spy', 'Harlot', 'Prodigal', 'Samaritan', 'Gentile',
  'Philistine', 'Levite', 'Nazirite', 'Zealot', 'Angel', 'Cherub', 'Seraph',
  'Demon', 'Beast', 'Dragon', 'Horseman', 'Tribe',
  // Events, ideas & worship
  'Creation', 'Exodus', 'Passover', 'Pentecost', 'Sabbath', 'Jubilee',
  'Feast', 'Fast', 'Wedding', 'Census', 'Baptism', 'Communion', 'Supper',
  'Ascension', 'Covenant', 'Grace', 'Faith', 'Hope', 'Love', 'Mercy',
  'Glory', 'Kingdom', 'Gospel', 'Psalm', 'Proverb', 'Parable', 'Miracle',
  'Prayer', 'Hymn', 'Tithe', 'Offering', 'Sacrifice', 'Law',
  'Sin', 'Repentance', 'Heaven', 'Hades', 'Abyss', 'Eternity', 'Promise',
  'Blessing', 'Curse', 'Vision', 'Dream', 'Wisdom', 'Truth', 'Spirit', 'Word',
  'Amen', 'Hosanna', 'Alleluia', 'Shalom', 'Talent', 'Battle', 'Exile',
  'Harvest', 'Sower', 'Pearl', 'Good News', 'Tongues',
]

// Duplicates across groups are removed; the order is stable so codes stay reproducible.
export const WORDS: readonly string[] = [...new Set([...PEOPLE, ...PLACES, ...THINGS])]

// Erstelle ein neues ListWidget-Objekt
let widget = new ListWidget()

// Hintergrundbild hinzufügen
let url = "https://eoimages.gsfc.nasa.gov/images/imagerecords/90000/90008/europe_vir_2016.jpg"
let req = new Request(url)
let image = await req.loadImage()
widget.backgroundImage = image


// Hole den aktuellen Standort als Objekt mit Breiten- und Längengrad
let location = await Location.current()

// Wandle den Standort in eine Adresse um
let address = await Location.reverseGeocode(location.latitude, location.longitude)

// Füge die Adresse als Text zum Widget hinzu
let text1 = widget.addText("Mein Standort")
text1.centerAlignText()
text1.font = Font.boldSystemFont(12)
widget.addSpacer(10) // Fügt einen Abstand von 10 Pixeln hinzu
let text2 = widget.addText(address[0].name + ", " + address[0].postalCode + ", " + address[0].locality + ", " + address[0].administrativeArea + ", " + address[0].isoCountryCode)
text2.centerAlignText()
text2.font = Font.systemFont(12)

// Setze die URL für das Öffnen von Google Maps mit der Adresse
widget.url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address[0].name)}+${encodeURIComponent(address[0].postalCode)}+${encodeURIComponent(address[0].locality)}+${encodeURIComponent(address[0].administrativeArea)}+${encodeURIComponent(address[0].isoCountryCode)}`

// Zeige das Widget an
Script.setWidget(widget)
console.log(address)

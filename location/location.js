// Create a new ListWidget object
let widget = new ListWidget()

// Add a background image
let url = "https://eoimages.gsfc.nasa.gov/images/imagerecords/90000/90008/europe_vir_2016.jpg"
let req = new Request(url)
let image = await req.loadImage()
widget.backgroundImage = image

// Get the current location as an object with latitude and longitude
let location = await Location.current()

// Convert the location into an address
let address = await Location.reverseGeocode(location.latitude, location.longitude)

// Add the address as text to the widget
let text1 = widget.addText("My Location")
text1.centerAlignText()
text1.font = Font.boldSystemFont(12)
text1.textColor = Color.white() // Change text color to white
widget.addSpacer(10) // Adds a space of 10 pixels
let text2 = widget.addText(address[0].name + ", " + address[0].postalCode + ", " + address[0].locality + ", " + address[0].administrativeArea + ", " + address[0].isoCountryCode)
text2.centerAlignText()
text2.font = Font.systemFont(12)
text2.textColor = Color.white() // Change text color to white

// Set the URL for opening Google Maps with the address
widget.url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address[0].name)}+${encodeURIComponent(address[0].postalCode)}+${encodeURIComponent(address[0].locality)}+${encodeURIComponent(address[0].administrativeArea)}+${encodeURIComponent(address[0].isoCountryCode)}`

// Display the widget
Script.setWidget(widget)
console.log(address)

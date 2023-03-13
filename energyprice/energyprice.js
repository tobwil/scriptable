const url = "https://api.awattar.de/v1/marketdata";
const req = new Request(url);
const res = await req.loadJSON();

let currentTime = new Date(res.data[0].start_timestamp);
let currentPrice = res.data[0].marketprice / 1000;
let minPrice = currentPrice;
let minTime;

for (let i = 0; i < 24; i++) {
    let price = res.data[i].marketprice / 1000;
    if (price < minPrice) {
        minPrice = price;
        minTime = new Date(res.data[i].start_timestamp);
    }
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#1c1c1e");

widget.addSpacer();

let titleText = widget.addText("⚡️Energy Prices EEX Spotmarkt⚡️");
titleText.textColor = Color.white();
titleText.font = Font.boldSystemFont(16);
titleText.centerAlignText();

widget.addSpacer(8);

let currentPriceText = widget.addText(`Current: ${currentPrice.toFixed(2)} €/kWh`);
currentPriceText.textColor = Color.white();
currentPriceText.font = Font.systemFont(14);
currentPriceText.centerAlignText();
let currentTimeText=widget.addText(`${currentTime.toLocaleString()}`);
currentTimeText.textColor=Color.white();
currentTimeText.font=Font.systemFont(12);
currentTimeText.centerAlignText();

widget.addSpacer(8);

let minPriceText=widget.addText(`Cheapest: ${minPrice.toFixed(2)} €/kWh`);
minPriceText.textColor=Color.white();
minPriceText.font=Font.systemFont(14);
minPriceText.centerAlignText();

let minTimeText;
if (minTime) {
    minTimeText = widget.addText(`${minTime.toLocaleString()}`);
} else {
    minTimeText = widget.addText(`Now`);
}
minTimeText.textColor=Color.white();
minTimeText.font=Font.systemFont(12);
minTimeText.centerAlignText()


// Add this code after the `minTimeText.centerAlignText()` line

widget.addSpacer(8);

let chart = new DrawContext();
chart.size = new Size(320, 100);
chart.opaque = false;
chart.setFillColor(new Color("#1c1c1e"));
chart.fillRect(new Rect(0, 0, 320, 100));

let maxPrice = Math.max(...res.data.slice(0, 24).map(x => x.marketprice)) / 1000;
let minPriceIndex = res.data.slice(0, 24).findIndex(x => x.marketprice / 1000 === minPrice);

for (let i = 0; i < 24; i++) {
    let price = res.data[i].marketprice / 1000;
    let barHeight = (price / maxPrice) * 80;
    if (i === minPriceIndex) {
        chart.setFillColor(Color.green());
    } else if (i === 0) {
        chart.setFillColor(Color.gray());
    } else {
        chart.setFillColor(Color.white());
    }
    chart.fillRect(new Rect(i * (320 / 24), 100 - barHeight, (320 / 24) - 4, barHeight));
}

let chartImage = chart.getImage();
widget.addImage(chartImage);

widget.addSpacer();
console.log(res)

Script.setWidget(widget);
Script.complete();

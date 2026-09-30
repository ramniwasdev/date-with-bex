# A date with Bex

A responsive, no-build invitation website made with plain HTML, CSS, and JavaScript.

## Preview

Open `index.html` in a browser. The site does not need a development server.

After Bex chooses a plan, **Send my pick to Bubs** opens the device's share sheet. On browsers without native sharing, the choice is copied so it can be pasted into a message.

## Hosting

This is a static site and is ready for GitHub Pages, Netlify, Cloudflare Pages, or any host that serves a folder. Upload `index.html`, `styles.css`, `script.js`, and the complete `assets` folder together. No build command or environment variables are required.

## Optional: Connect Google Forms

The website works without a form. Connect one only if you want each choice recorded automatically instead of shared by Bex.

1. Create a blank Google Form at [forms.google.com](https://forms.google.com).
2. Add one **Multiple choice** question named `Which date should we choose?`.
3. Add these choices:
   - Cubbon Park Picnic
   - Indian Music Experience Museum, JP Nagar
   - Go Native, HSR
   - A cozy date at home
4. Open the form preview, right-click the page, and choose **View page source**.
5. Search the source for `entry.` near the question text. Copy the full field name, such as `entry.123456789`.
6. Copy the public form URL. Change the ending from `/viewform` to `/formResponse`.
7. Open `script.js` and fill in the first two values:

```js
const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf9XcoyaLSNXl5RznuM3X2DwdyhaW45YBG5_ckvyBUiMX9vyg/formResponse",
  planField: "entry.227867586"
};
```

8. Submit one test choice from the website and confirm it appears in the Form's **Responses** tab.

Google Forms may change its internal markup over time. If the test does not arrive, confirm the `entry.` field name from the current preview source.

## Images

The date-plan photographs are sourced from [Unsplash](https://unsplash.com) under the Unsplash License.

The pink-and-blue hydrangea photograph is by Gustamons, dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla_pink_and_blue.jpg).

The featured Cubbon Park photograph is by Ranjithsiji, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cubbon_Park_DSC_5416.jpg). The image is cropped to fit the card.
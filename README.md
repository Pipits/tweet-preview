# Tweet Preview plugin
The Tweet Preview plugin adds a preview to the tweet in the edit form when using the [Pipit Sharing](/pipits/apps/sharing) app.

## Installation
* Download the latest version of the Tweet Preview plugin
* Unzip the download
* Place the `pipit_tweet_preview` folder in `perch/addons/plugins/ui/`
* Include the CSS and Javascript files in `perch/addons/plugins/ui/_config.inc`

### Requirements
* Perch or Perch Runway 3.0 or higher
* [Pipit Sharing](/pipits/apps/sharing)

### Browsers
The preview may not work on older browsers at this stage.

### Including the files
To include the CSS and Javascript files, you need to have `_config.inc` in `perch/addons/plugins/ui/`. If you don't already have it, create it. Add the following to the file:

```markup
<link rel="stylesheet" href="/perch/addons/plugins/ui/pipit_tweet_preview/tweet_preview.min.css" />
<script src="/perch/addons/plugins/ui/pipit_tweet_preview/tweet_preview.min.js"></script>
```

For usage information visit the plugin's [documentation](https://grabapipit.com/pipits/plugins/tweet-preview/docs/usage).
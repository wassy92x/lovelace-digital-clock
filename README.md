# Digital Clock

A custom digital clock card for Home Assistant

[![GitHub Release][releases-shield]][releases]
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![License][license-shield]](LICENSE.md)

![Image of Digital Clock Card](https://github.com/wassy92x/lovelace-digital-clock/blob/master/.images/digital-clock.png?raw=true)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:digital-clock`                      |                     |
| locale            | string  | **Optional** | Locale to use for formatting. For example `de` | locale set in your home assistant profile otherwise your browser locale |
| timeZone          | string  | **Optional** | Time zone to use. For example `Europe/Berlin` | time zone set in your home assistant profile otherwise your browser time zone |
| firstLineFormat &#124; timeFormat   | object &#124; string | **Optional** | Format of first line           | { hour: '2-digit', minute: '2-digit' } |
| secondLineFormat &#124; dateFormat | object  &#124; string  | **Optional** | Format of second line        | { weekday: 'short', day: '2-digit', month: 'short' } |
| firstLineStyle | map  | **Optional** | CSS Style properties for first line        | { font-size: 4em, text-align: left } |
| secondLineStyle | map  | **Optional** | CSS Style properties for second line        | { font-size: 4em, text-align: left } |

If `firstLineFormat` respectively `secondLineFormat` is a string, it can be every format, which is valid in Luxon.
See: [https://moment.github.io/luxon/#/formatting?id=toformat](https://moment.github.io/luxon/#/formatting?id=toformat)

If `firstLineFormat` respectively `secondLineFormat` is an object, it can be every valid object, which can be passed as options to the Luxon-function `toLocalString()`.
See: [https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans)

If `timeFormat` is specified, it will override `firstLineFormat` and `dateFormat` will override `secondLineFormat`.

# Example
```
type: 'custom:digital-clock'
dateFormat:
  weekday: 'long'
  day: '2-digit'
  month: 'short'
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
```

# Example with Styling
```
type: 'custom:digital-clock'
dateFormat:
  weekday: 'long'
  day: '2-digit'
  month: 'short'
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
firstLineStyle:
  font-size: 4em
  font-family: 'Roboto Condensed, sans-serif'
  font-weight: 400
secondLineStyle:
  font-size: 2em
  font-family: 'Roboto Condensed, sans-serif'
  font-weight: 300
```

[license-shield]: https://img.shields.io/github/license/wassy92x/lovelace-digital-clock.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/wassy92x/lovelace-digital-clock.svg?style=for-the-badge
[releases]: https://github.com/wassy92x/lovelace-digital-clock/releases

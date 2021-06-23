# Digital Clock

A custom digital clock card for Home Assistant

[![GitHub Release][releases-shield]][releases]
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)
[![License][license-shield]](LICENSE.md)

![Image of Digital Clock Card](https://github.com/wassy92x/lovelace-digital-clock/blob/master/.images/digital-clock.png?raw=true)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:digital-clock`                      |                     |
| locale            | string  | **Optional** | Locale to use for formatting. For example `fr` | your browser locale |
| firstLineFormat &#124; timeFormat   | object &#124; string | **Optional** | Format of first line           | { hour: '2-digit', minute: '2-digit' } |
| secondLineFormat &#124; dateFormat | object  &#124; string  | **Optional** | Format of second line        | { weekday: 'short', day: '2-digit', month: 'short' } |

If `firstLineFormat` respectively `secondLineFormat` is a string, it can be every format, which is valid in Luxon.
See: [https://moment.github.io/luxon/docs/manual/formatting.html#toformat](https://moment.github.io/luxon/docs/manual/formatting.html#toformat)

If `firstLineFormat` respectively `secondLineFormat` is an object, it can be every valid object, which can be passed as options to the Luxon-function `toLocalString()`.
See: [https://moment.github.io/luxon/docs/manual/formatting.html#tolocalestring--strings-for-humans-](https://moment.github.io/luxon/docs/manual/formatting.html#tolocalestring--strings-for-humans-)

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

[license-shield]: https://img.shields.io/github/license/wassy92x/lovelace-digital-clock.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/wassy92x/lovelace-digital-clock.svg?style=for-the-badge
[releases]: https://github.com/wassy92x/lovelace-digital-clock/releases

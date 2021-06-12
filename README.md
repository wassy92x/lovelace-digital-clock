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
| dateFormat        | object  | **Optional** | Format of date                              | { weekday: 'short', day: '2-digit', month: 'short' } |
| timeFormat        | object  | **Optional** | Format of time                              | { hour: '2-digit', minute: '2-digit' } |

dateFormat and timeFormat can be every valid object, which can be passed as options to the JavaScript-Function Date.prototype.toLocaleDateString() / Date.prototype.toLocaleTimeString()

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

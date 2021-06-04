# Home Assistant Lovelace Digital Clock

A custom dashboard for Home Assistant with sidebar

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:digital-clock`                      |                     |
| dateFormat        | object  | **Optional** | Format of date                              | { weekday: 'short', day: '2-digit', month: 'short' } |
| timeFormat        | object  | **Optional** | Format of time                              | { hour: '2-digit', minute: '2-digit' } |

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

[license-shield]: https://img.shields.io/github/license/custom-cards/boilerplate-card.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/wassy92x/lovelace-ha-dashboard.svg?style=for-the-badge
[releases]: https://github.com/wassy92x/lovelace-ha-dashboard/releases

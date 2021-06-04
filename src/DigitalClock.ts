/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    LitElement,
    html,
    customElement,
    CSSResult,
    TemplateResult,
    css,
    PropertyValues,
    state,
} from 'lit-element';

import {CARD_VERSION} from './const';
import IDigitalClockConfig from './IDigitalClockConfig';

/* eslint no-console: 0 */
console.info(
    `%c  Digital-Clock \n%c  Version ${CARD_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'digital-clock',
    name: 'DigitalClock',
    description: 'A digital clock component',
});

@customElement('digital-clock')
export class DigitalClock extends LitElement {
    @state() private _date = '';
    @state() private _time = '';
    @state() private _config?: IDigitalClockConfig;
    @state() private _interval = 1000;
    private _intervalId?: number;

    public setConfig(config: IDigitalClockConfig): void {
        this._config = config;
        if (this._config.interval !== this._interval)
            this._interval = this._config.interval ?? 1000;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return changedProps.has('_date') || changedProps.has('_time') || changedProps.has('_config');
    }

    public async getCardSize(): Promise<number> {
        return 3;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('_interval')) {
            this._stopInterval();
            this._startInterval();
        }
        if (changedProperties.has('_config'))
            this._updateDateTime();
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this._startInterval();
    }

    private _startInterval(): void {
        if (this._intervalId)
            return;

        this._intervalId = window.setInterval(this._updateDateTime.bind(this), this._interval);
    }

    private _stopInterval(): void {
        if (!this._intervalId)
            return;
        window.clearInterval(this._intervalId);
        this._intervalId = undefined;
    }

    private _updateDateTime(): void {
        const dateTime = new Date();
        const date = dateTime.toLocaleDateString([], this._config?.dateFormat ?? { weekday: 'short', day: '2-digit', month: 'short' });
        const time = dateTime.toLocaleTimeString([], this._config?.timeFormat ?? { hour: '2-digit', minute: '2-digit' });
        if (date !== this._date)
            this._date = date;
        if (time !== this._time)
            this._time = time;
    }

    public disconnectedCallback(): void {
        this._stopInterval();
        super.disconnectedCallback();
    }

    protected render(): TemplateResult | void {
        return html`
            <ha-card>
                <span class="time">${this._time}</span>
                <span class="date">${this._date}</span>
            </ha-card>
        `;
    }

    static get styles(): CSSResult {
        return css`
          ha-card {
            text-align: center;
            font-weight: bold;
            padding: 8px 0;
          }
          
          ha-card > span {
            display: block;
          }
          
          .time {
            font-size: 2.8em;
            line-height: 1em;
          }
          
          .date {
            font-size: 1.6em;
            line-height: 1em;
          }
        `;
    }
}

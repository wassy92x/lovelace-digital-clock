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
import {DateTime} from 'luxon';

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
    @state() private _firstLine = '';
    @state() private _secondLine = '';
    @state() private _config?: IDigitalClockConfig;
    @state() private _interval = 1000;
    private _intervalId?: number;

    public setConfig(config: IDigitalClockConfig): void {
        this._config = { ...config };
        if (this._config.timeFormat)
            this._config.firstLineFormat = this._config.timeFormat;
        if (this._config.dateFormat)
            this._config.secondLineFormat = this._config.dateFormat;
        if (this._config.interval !== this._interval)
            this._interval = this._config.interval ?? 1000;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return changedProps.has('_firstLine') || changedProps.has('_secondLine') || changedProps.has('_config');
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
        let dateTime = DateTime.now();
        dateTime = dateTime.setLocale(this._config?.locale ?? dateTime.resolvedLocaleOpts().locale);

        let firstLine: string;
        let secondLine: string;

        if (typeof this._config?.firstLineFormat === 'string')
            firstLine = dateTime.toFormat(this._config.firstLineFormat);
        else
            firstLine = dateTime.toLocaleString(this._config?.firstLineFormat ?? { hour: '2-digit', minute: '2-digit' });

        if (typeof this._config?.secondLineFormat === 'string')
            secondLine = dateTime.toFormat(this._config.secondLineFormat);
        else
            secondLine = dateTime.toLocaleString(this._config?.secondLineFormat ?? { weekday: 'short', day: '2-digit', month: 'short' });

        if (firstLine !== this._firstLine)
            this._firstLine = firstLine;
        if (secondLine !== this._secondLine)
            this._secondLine = secondLine;
    }

    public disconnectedCallback(): void {
        this._stopInterval();
        super.disconnectedCallback();
    }

    protected render(): TemplateResult | void {
        return html`
            <ha-card>
                <span class="first-line">${this._firstLine}</span>
                <span class="second-line">${this._secondLine}</span>
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
          
          .first-line {
            font-size: 2.8em;
            line-height: 1em;
          }
          
          .second-line {
            font-size: 1.6em;
            line-height: 1em;
          }
        `;
    }
}

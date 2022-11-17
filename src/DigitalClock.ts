/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    LitElement,
    html,
    customElement,
    CSSResult,
    TemplateResult,
    css,
    PropertyValues,
    state, property,
} from 'lit-element';
import {DateTime} from 'luxon';
import {HomeAssistant} from 'custom-card-helpers';

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
    @property({attribute: false}) public hass!: HomeAssistant;
    @state() private _firstLine = '';
    @state() private _secondLine = '';
    @state() private _firstLineElement?: HTMLElement;
    @state() private _secondLineElement?: HTMLElement;  
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

        this._firstLineElement = this._createStyledElement('first-line', this._config?.firstLineStyle || {});
        this._firstLineElement.innerText = this._firstLine;
        this._secondLineElement = this._createStyledElement('second-line', this._config?.secondLineStyle || {});
        this._secondLineElement.innerText = this._secondLine;        
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return changedProps.has('_firstLine') || changedProps.has('_secondLine') || changedProps.has('_config') || changedProps.has('hass');
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

    private _createStyledElement(className: string, lineStyle: { [name: string]: string }): HTMLElement {
        const element = document.createElement('span');
        element.className = className;
        for (const prop in lineStyle) {
          element.style.setProperty(prop, lineStyle[prop]);
        }
        return element;
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

    private async _updateDateTime(): Promise<void> {
        const timeZone = this._config?.timeZone ?? this.hass?.config?.time_zone;
        const locale = this._config?.locale ?? this.hass?.locale?.language;

        let dateTime: DateTime = DateTime.local();
        /* if (!this._config?.useHATime) {
            dateTime = DateTime.local();
        } else {
            dateTime = DateTime.fromSeconds(await new Promise<number>((resolve) => {
                this.hass.connection.subscribeMessage(
                    (msg) => resolve(parseInt((msg as any).result, 10)),
                    {type: "render_template", template: '{{as_timestamp(now())}}'}
                );
            }));
        } */

        if (timeZone)
            dateTime = dateTime.setZone(timeZone);
        if (locale)
            dateTime = dateTime.setLocale(locale);

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

        if (firstLine !== this._firstLine) {
            this._firstLine = firstLine;
            if (this._firstLineElement) {
                this._firstLineElement.innerText = firstLine;
            }
        }
        if (secondLine !== this._secondLine) {
            this._secondLine = secondLine;
            if (this._secondLineElement) {
                this._secondLineElement.innerText = secondLine;
            }
        }
    }

    public disconnectedCallback(): void {
        this._stopInterval();
        super.disconnectedCallback();
    }

    protected render(): TemplateResult | void {
        return html`
            <ha-card>
              ${this._firstLineElement}
              ${this._secondLineElement}
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

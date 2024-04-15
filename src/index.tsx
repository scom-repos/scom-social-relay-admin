import {
    Container,
    Control,
    ControlElement,
    customElements,
    Module,
    Styles,
    Table,
} from '@ijstech/components';
import { ISocialRelayAdmin } from './interface';
import CreateRelayModule from './createRelay/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomSocialRelayAdminElement extends ControlElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-social-relay-admin']: ScomSocialRelayAdminElement;
        }
    }
}

@customElements('i-scom-social-relay-admin')
export default class ScomSocialRelayAdmin extends Module {
    private relaysColumns = [
        {
            title: 'Instance ID',
            fieldName: 'instanceId',
            onRenderCell: (source: Control, columnData: any, rowData: any) => {
                return columnData;
            }
        },
        {
            title: 'Instance Name',
            fieldName: 'instanceName',
            onRenderCell: (source: Control, columnData: any, rowData: any) => {
                return columnData;
            }
        },
        {
            title: '',
            fieldName: '_buttons',
            onRenderCell: (source: Control, columnData: any, rowData: any) => {
                return (
                    <i-button
                        caption='View'
                        padding={{ top: '0.4375rem', bottom: '0.4375rem', left: '0.625rem', right: '0.625rem' }}
                        border={{ radius: '0.5rem' }}
                        font={{ weight: 500, color: Theme.colors.primary.contrastText, size: '0.875rem', transform: 'capitalize' }}
                        boxShadow='none'
                        background={{ color: Theme.colors.primary.main }}
                        mediaQueries={[
                            {
                                maxWidth: '767px',
                                properties: { visible: false }
                            }
                        ]}
                        onClick={() => this.handleViewButtonClick(rowData.instanceId)}
                    ></i-button>
                )
            }
        }
    ];

    private createRelayModule: CreateRelayModule;
    private tableRelays: Table;
    private _data: ISocialRelayAdmin;
    tag: any = {
        light: {},
        dark: {}
    }
    private handleViewButtonClick(instanceId: string) {
    }

    constructor(parent?: Container, options?: any) {
        super(parent, options)
    }

    async init() {
        await super.init();
        await this.tableRelays.ready();
        this.tableRelays.columns = this.relaysColumns; //FIXME: This line is only necessary because of a bug in the Table component
    }

    private async setData(value: ISocialRelayAdmin) {
        this._data = value;
    }

    private getData() {
        return this._data;
    }

    getConfigurators() {
        return [
            {
                name: 'Builder Configurator',
                target: 'Builders',
                getActions: () => {
                    return this._getActions();
                },
                getData: this.getData.bind(this),
                setData: this.setData.bind(this),
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            }
        ]
    }

    private _getActions() {
        return [];
    }

    private getTag() {
        return this.tag;
    }

    private setTag(value: any) {
        const newValue = value || {};
        for (let prop in newValue) {
            if (newValue.hasOwnProperty(prop)) {
                if (prop === 'light' || prop === 'dark')
                    this.updateTag(prop, newValue[prop]);
                else
                    this.tag[prop] = newValue[prop];
            }
        }
        this.updateTheme();
    }

    private updateTag(type: 'light' | 'dark', value: any) {
        this.tag[type] = this.tag[type] ?? {};
        for (let prop in value) {
            if (value.hasOwnProperty(prop))
                this.tag[type][prop] = value[prop];
        }
    }

    private updateStyle(name: string, value: any) {
        value ?
            this.style.setProperty(name, value) :
            this.style.removeProperty(name);
    }

    private updateTheme() {
        const themeVar = document.body.style.getPropertyValue('--theme') || 'light';
        this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
        this.updateStyle('--text-secondary', this.tag[themeVar]?.secondaryColor);
        this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
        this.updateStyle('--colors-primary-main', this.tag[themeVar]?.primaryColor);
        this.updateStyle('--colors-primary-light', this.tag[themeVar]?.primaryLightColor);
        this.updateStyle('--colors-primary-dark', this.tag[themeVar]?.primaryDarkColor);
        this.updateStyle('--colors-secondary-light', this.tag[themeVar]?.secondaryLight);
        this.updateStyle('--colors-secondary-main', this.tag[themeVar]?.secondaryMain);
        this.updateStyle('--divider', this.tag[themeVar]?.borderColor);
        this.updateStyle('--action-selected', this.tag[themeVar]?.selected);
        this.updateStyle('--action-selected_background', this.tag[themeVar]?.selectedBackground);
        this.updateStyle('--action-hover_background', this.tag[themeVar]?.hoverBackground);
        this.updateStyle('--action-hover', this.tag[themeVar]?.hover);
    }

    async show(options?: any) {
        this.tableRelays.data = [];
        this.tableRelays.data = [{ instanceId: '1', instanceName: 'Relay 1' }, { instanceId: '2', instanceName: 'Relay 2' }];
    }

    private async handleCreateRelayButtonClick() {
        if (!this.createRelayModule) {
            this.createRelayModule = new CreateRelayModule();
            await this.createRelayModule.ready();
        }
        let modal = this.createRelayModule.openModal({
            width: '50rem',
            maxHeight: '100vh',
            overflow: { y: 'auto' },
            zIndex: 30,
            padding: { top: "1rem", bottom: "1rem", left: "1.5rem", right: "1.5rem" },
            closeOnBackdropClick: false,
            popupPlacement: 'top',
            mediaQueries: [
                {
                    maxWidth: '767px',
                    properties: {
                        height: '100vh',
                        maxHeight: '100vh'
                    }
                }
            ]
        });
        this.createRelayModule.show();
    }

    render() {
        return (
            <i-panel width="100%" height="100%">
                <i-vstack padding={{ top: "1.5rem", bottom: "1.5rem", left: '1.5rem', right: '1.5rem' }} margin={{ bottom: '0.5rem' }} id="pnlSocialRelayAdmin">
                    <i-hstack id="pnlButtons" verticalAlignment="center" horizontalAlignment='end' gap="0.5rem">
                        <i-hstack
                            width='2rem'
                            height='2rem'
                            position='relative'
                            verticalAlignment='center'
                            horizontalAlignment='center'
                            cursor='pointer'
                        >
                            <i-icon
                                name='plus-circle'
                                width={'1.125rem'} height={'1.125rem'}
                                display='inline-flex'
                                fill={Theme.text.primary}
                                onClick={this.handleCreateRelayButtonClick}
                            ></i-icon>
                        </i-hstack>
                    </i-hstack>

                    <i-table
                        id="tableRelays"
                        heading={true}
                        columns={this.relaysColumns}
                        headingStyles={{
                            font: { size: '1rem', weight: 600, color: Theme.text.secondary },
                            padding: { top: '1.25rem', bottom: '1.25rem', left: '0.5rem', right: '0.5rem' }
                        }}
                        bodyStyles={{
                            font: { size: '1rem', color: Theme.text.primary },
                            padding: { top: '1.25rem', bottom: '1.25rem', left: '0.5rem', right: '0.5rem' }
                        }}
                    ></i-table>
                </i-vstack>
            </i-panel>
        )
    }
}
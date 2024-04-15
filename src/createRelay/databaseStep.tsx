import {
    customElements,
    Input,
    Module,
    Styles,
} from '@ijstech/components';
import { ISocialRelayAdmin } from '../interface';

const Theme = Styles.Theme.ThemeVars

const DatabaseHostCaption = 'Database Host';
const DatabasePortCaption = 'Database Port';
const DatabaseUserCaption = 'Database User';
const DatabasePasswordCaption = 'Database Password';
const DatabaseNameCaption = 'Database Name';
const DatabaseHostHint = 'Enter the host address for your database.';
const DatabasePortHint = 'Specify the port number.';
const DatabaseUserHint = 'Enter your database username.';
const DatabasePasswordHint = 'Input your password for security.';
const DatabaseNameHint = 'Name your database.';

@customElements('scom-social-relay-admin--database-step')
export class DatabaseStep extends Module {
    private info: ISocialRelayAdmin;
    private edtDatabaseHost: Input;
    private edtDatabasePort: Input;
    private edtDatabaseUser: Input;
    private edtDatabasePassword: Input;

    async init() {
        await super.init();
    }

    show(options?: any) {
        this.clear();
        this.info = options;
        this.updateUI();
    }

    clear() {
    }

    getData() {
        return {
            databaseHost: this.edtDatabaseHost.value,
            databasePort: this.edtDatabasePort.value,
            databaseUser: this.edtDatabaseUser.value,
            databasePassword: this.edtDatabasePassword.value,
        }
    }

    private updateUI() {
    }

    render() {
        return (
            <i-vstack id="pnlInfo" gap="1rem">
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={DatabaseHostCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtDatabaseHost" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={DatabaseHostHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={DatabasePortCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>                
                    <i-input id="edtDatabasePort" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={DatabasePortHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={DatabaseUserCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtDatabaseUser" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={DatabaseUserHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={DatabasePasswordCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtDatabasePassword" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={DatabasePasswordHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={DatabaseNameCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtDatabaseName" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={DatabaseNameHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
            </i-vstack>
        )
    }
}
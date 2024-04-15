import {
    ComboBox,
    customElements,
    IComboItem,
    Input,
    Module,
    Styles,
} from '@ijstech/components';
import { ISocialRelayAdmin } from '../interface';

const Theme = Styles.Theme.ThemeVars

const StorageTypes = [
    {
        label: 'S3',
        value: 'S3'
    },
    {
        label: 'LevelDB',
        value: 'LevelDB'
    }
];

const StorageTypeCaption = 'Storage Type';
const S3UrlCaption = 'S3 URL';
const StorageTypeHint = 'Choose your storage solution.';
const S3UrlHint = 'Provide the URL to your S3 bucket.';

@customElements('scom-social-relay-admin--storage-step')
export class StorageStep extends Module {
    private info: ISocialRelayAdmin;
    private comboStorageType: ComboBox;
    private edtS3Url: Input;

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
            storageType: this.comboStorageType.selectedItem as IComboItem,
            s3Url: this.edtS3Url.value,
        }
    }

    private updateUI() {
    }

    private onStorageTypeChanged() {
    }

    render() {
        return (
            <i-vstack id="pnlInfo" gap="1rem">
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={StorageTypeCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-combo-box
                        id="comboStorageType"
                        height={32}
                        width="100%"
                        icon={{ width: 14, height: 14, name: 'angle-down', fill: Theme.divider }}
                        border={{ width: 1, style: 'solid', color: Theme.divider, radius: 5 }}
                        items={StorageTypes}
                        selectedItem={StorageTypes[0]}
                        onChanged={this.onStorageTypeChanged}
                    ></i-combo-box>
                    <i-label caption={StorageTypeHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={S3UrlCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtS3Url" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={S3UrlHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
            </i-vstack>
        )
    }
}
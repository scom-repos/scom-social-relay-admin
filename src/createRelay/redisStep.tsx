import {
    customElements,
    Input,
    Module,
    Styles,
} from '@ijstech/components';
import { ISocialRelayAdmin } from '../interface';

const Theme = Styles.Theme.ThemeVars

const RedisHostCaption = 'Redis Host';
const RedisPortCaption = 'Redis Port';
const RedisPasswordCaption = 'Redis Password';
const RedisDBIndexCaption = 'Redis DB Index';
const RedisHostHint = 'Specify the Redis host address.';
const RedisPortHint = 'Enter the port number for Redis.';
const RedisPasswordHint = 'Secure your Redis with a password.';
const RedisDBIndexHint = 'Select the database index for Redis.';

@customElements('scom-social-relay-admin--redis-step')
export class RedisStep extends Module {
    private info: ISocialRelayAdmin;
    private edtRedisHost: Input;
    private edtRedisPort: Input;
    private edtRedisPassword: Input;
    private edtRedisDBIndex: Input;

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
            redisHost: this.edtRedisHost.value,
            redisPort: this.edtRedisPort.value,
            redisPassword: this.edtRedisPassword.value,
            redisDBIndex: this.edtRedisDBIndex.value,
        }
    }

    private updateUI() {
    }

    render() {
        return (
            <i-vstack id="pnlInfo" gap="1rem">
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={RedisHostCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtRedisHost" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={RedisHostHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={RedisPortCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtRedisPort" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={RedisPortHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={RedisPasswordCaption}></i-label>
                    </i-panel>
                    <i-input id="edtRedisPassword" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={RedisPasswordHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={RedisDBIndexCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtRedisDBIndex" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={RedisDBIndexHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
            </i-vstack>
        )
    }
}
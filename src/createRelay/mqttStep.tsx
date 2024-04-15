import {
    customElements,
    Input,
    Module,
    Styles,
} from '@ijstech/components';
import { ISocialRelayAdmin } from '../interface';

const Theme = Styles.Theme.ThemeVars

const BrokerUrlCaption = 'Broker URL';
const TopicSubscriptionCaption = 'Topic Subscription';
const BrokerUrlHint = 'Input the URL of your MQTT broker.';
const TopicSubscriptionHint = 'List the topic you want to subscribe to.';

@customElements('scom-social-relay-admin--mqtt-step')
export class MqttStep extends Module {
    private info: ISocialRelayAdmin;
    private edtBrokerUrl: Input;
    private edtTopicSubscription: Input;

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
            brokerUrl: this.edtBrokerUrl.value,
            topicSubscription: this.edtTopicSubscription.value,
        }
    }

    private updateUI() {
    }

    render() {
        return (
            <i-vstack id="pnlInfo" gap="1rem">
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={BrokerUrlCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtBrokerUrl" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={BrokerUrlHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={TopicSubscriptionCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input id="edtTopicSubscription" width="100%" height={32} padding={{ left: '0.5rem', right: '0.5rem' }} border={{ radius: 5 }}></i-input>
                    <i-label caption={TopicSubscriptionHint} font={{ size: '0.875rem', color: Theme.text.secondary }}></i-label>
                </i-vstack>
            </i-vstack>
        )
    }
}
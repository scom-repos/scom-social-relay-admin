import {
    customElements,
    Module,
    Styles,
    RadioGroup,
    Input,
    CodeEditor,
    VStack
} from '@ijstech/components';
import { ISocialRelayAdmin } from '../interface';

const Theme = Styles.Theme.ThemeVars

enum RelayMode {
    Public = 'Public',
    Private = 'Private'
}

enum DeploymentOption {
    SelfHosted = 'Self-Hosted',
    CloudHosted = 'Cloud-Hosted'
}

const RelayModes = [
    {
        caption: 'Public',
        value: RelayMode.Public,
    },
    {
        caption: 'Private',
        value: RelayMode.Private,
    }
];
const DeploymentOptions = [
    {
        caption: 'Self-Hosted',
        value: DeploymentOption.SelfHosted,
    },
    {
        caption: 'Cloud-Hosted',
        value: DeploymentOption.CloudHosted,
    }
];

const DefaultRelayMode = RelayMode.Public;
const DefaultDeploymentOption = DeploymentOption.SelfHosted;
const RelayNameCaption = 'Relay Name';
const RelayModeCaption = 'Relay Mode';
const DeploymentOptionCaption = 'Deployment Option';
const selfHostedCommandHint = 'Please connect to your target server and run the following command to install the relay:';
const commandTemplate = `
    docker run --init --rm --name scom-master-bot \\
    -v /run/docker.sock:/var/run/docker.sock \\
    -v /container:/container \\
    -v /container/scom-master-bot/config:/app/config \\
    benhoijs/scom-master-bot:0.0.1 <nostr-name> <owner-npub>
`;

@customElements('scom-social-relay-admin--setup-mode-step')
export class SetupModeStep extends Module {
    private edtRelayName: Input;
    private info: ISocialRelayAdmin;
    private radioGroupRelayMode: RadioGroup;
    private radioGroupDeploymentOption: RadioGroup;
    private pnlCommand: VStack;
    private codeEditorCommand: CodeEditor;

    async init() {
        await super.init();
        this.codeEditorCommand.updateOptions({ readOnly: true });
    }

    show(options?: any) {
        this.clear();
        this.info = options;
        this.updateUI();
    }

    clear() {
        this.pnlCommand.visible = false;
    }

    getData() {
        return {
            relayName: this.edtRelayName.value,
            relayMode: this.radioGroupRelayMode.selectedValue,
            deploymentOption: this.radioGroupDeploymentOption.selectedValue
        }
    }

    private updateCodeEditorCommand(relayName: string) {
        this.codeEditorCommand.value = commandTemplate.replace(/^\s+|\s+$/g, '').replace(/\n\s+/g, '\n').replace('<nostr-name>', relayName);
    } 

    private updateUI() {
    }

    private onRelayNameChanged() {
        this.pnlCommand.visible = this.radioGroupDeploymentOption.selectedValue === DeploymentOption.SelfHosted;
        const relayName = this.edtRelayName.value;
        this.updateCodeEditorCommand(relayName);
    }

    private onRelayModeChanged() {
        const relayMode = this.radioGroupRelayMode.selectedValue as RelayMode;
    }

    private onDeploymentOptionChanged() {
        const deploymentOption = this.radioGroupDeploymentOption.selectedValue as DeploymentOption;
        this.pnlCommand.visible = deploymentOption === DeploymentOption.SelfHosted;
    }

    render() {
        return (
            <i-vstack id="pnlInfo" gap="1rem">
                <i-vstack gap="0.5rem">
                    <i-panel>
                        <i-label display="inline" caption={RelayNameCaption}></i-label>
                        <i-label display="inline" caption="*" font={{ color: Theme.colors.error.main }}></i-label>
                    </i-panel>
                    <i-input 
                        id="edtRelayName" 
                        width="100%" 
                        height={32} 
                        padding={{ left: '0.5rem', right: '0.5rem' }} 
                        border={{ radius: 5 }}
                        onChanged={this.onRelayNameChanged}
                    ></i-input>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-label caption={RelayModeCaption}></i-label>
                    <i-radio-group
                        id="radioGroupRelayMode"
                        radioItems={RelayModes}
                        selectedValue={DefaultRelayMode}
                        onChanged={this.onRelayModeChanged}
                    ></i-radio-group>
                </i-vstack>
                <i-vstack gap="0.5rem">
                    <i-label caption={DeploymentOptionCaption}></i-label>
                    <i-radio-group
                        id="radioGroupDeploymentOption"
                        radioItems={DeploymentOptions}
                        selectedValue={DefaultDeploymentOption}
                        onChanged={this.onDeploymentOptionChanged}
                    ></i-radio-group>
                </i-vstack>
                <i-vstack id="pnlCommand" gap="0.5rem" visible={false}>
                    <i-label caption={selfHostedCommandHint}></i-label>
                    <i-code-editor
                        id="codeEditorCommand"   
                        width="100%" 
                        height="150px" 
                        language='shell'
                        padding={{ right: '1rem' }}
                    ></i-code-editor>
                </i-vstack>
            </i-vstack>
        )
    }
}
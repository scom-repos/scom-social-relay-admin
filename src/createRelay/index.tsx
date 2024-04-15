import {
    Button,
    Container,
    ControlElement,
    customElements,
    FormatUtils,
    HStack,
    Label,
    Module,
    Styles,
    VStack,
} from '@ijstech/components';
import ScomStepper from "@scom/scom-stepper";
import { ISocialRelayAdmin } from '../interface';
import { SetupModeStep } from './setupModeStep';
import { DatabaseStep } from './databaseStep';
import { StorageStep } from './storageStep';
import { RedisStep } from './redisStep';
import { MqttStep } from './mqttStep';

const Theme = Styles.Theme.ThemeVars;

enum Step {
    SetupMode = "Setup Mode",
    Database = "Database",
    Storage = "Storage",
    Redis = "Redis",
    MQTT = "MQTT",
}

interface IModule extends Module {
    getData(): any;
    show(options?: any): void;
}

interface IStepConfig {
    moduleClass: new (...args: any[]) => IModule;
    module?: IModule;
}

const initialSteps = [
    {
        name: Step.SetupMode
    },
    {
        name: Step.Database
    },
    {
        name: Step.Storage
    },
    {
        name: Step.Redis
    },
    {
        name: Step.MQTT
    }
];

@customElements('scom-social-relay-admin--create-relay-module')
export default class CreateRelayModule extends Module {
    private pnlSocialRelayAdmin: VStack;
    private stepper: ScomStepper;
    private stepConfigMap: Record<string, IStepConfig>;
    private loadedSteps: Set<Step> = new Set(); 
    private info: ISocialRelayAdmin;

    private _data: ISocialRelayAdmin;
    tag: any = {
      light: {},
      dark: {}
    }

    constructor(parent?: Container, options?: any) {
        super(parent, options)
        this.deferReadyCallback = true;
    }
    
    async init() {
        await super.init();
        await this.stepper.ready();
        this.stepper.steps = initialSteps;
        this.stepper.onDone = this.onConfirm.bind(this);
        this.stepper.onBeforeNext = this.onValidate.bind(this);
        this.stepper.finishCaption = "Confirm";
        this.stepConfigMap = {
            [Step.SetupMode]: {
                moduleClass: SetupModeStep
            },
            [Step.Database]: {
                moduleClass: DatabaseStep
            },
            [Step.Storage]: {
                moduleClass: StorageStep
            },
            [Step.Redis]: {
                moduleClass: RedisStep
            },
            [Step.MQTT]: {
                moduleClass: MqttStep
            }
        }
        this.executeReadyCallback();
    }

    private async setData(value: ISocialRelayAdmin) {
        this._data = value;
    }

    private getData() {
        return this._data;
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
        await this.clear();
        this.info = options;
        await this.showStepModule(Step.SetupMode);
    }

    async clear() {
        this.stepper.activeStep = 0;
        this.loadedSteps.clear();
        this.info = null;
    }

    private async showStepModule(stepName: Step) {
        for (let key in this.stepConfigMap) {
            const stepConfig = this.stepConfigMap[key];
            const visible = key === stepName;        
            if (visible) {
                if (!stepConfig.module) {
                    stepConfig.module = new stepConfig.moduleClass();
                    this.pnlSocialRelayAdmin.append(stepConfig.module);
                    await stepConfig.module.ready();
                }
                if (!this.loadedSteps.has(stepName) && stepConfig.module.show) {
                    this.loadedSteps.add(stepName);
                    stepConfig.module.show(this.info);
                }
            }
            if (stepConfig.module) {
                stepConfig.module.visible = visible;
            }
        }
    }

    private async onStepperChanged(target?: ScomStepper, oldStep?: number) {
        if (this.stepper.activeStep === oldStep) return;
        const stepName = this.stepper.steps[this.stepper.activeStep]?.name as Step;
        await this.showStepModule(stepName);
    }

    private onValidate() {
        const step = this.stepper.activeStep;
        const stepName = this.stepper.steps[step]?.name;
        const stepModule = this.stepConfigMap[stepName]?.module;
        this.stepper.updateStatus(step, true);
    }

    async onConfirm() {
        try {
            const setupModeStepModule = this.stepConfigMap[Step.SetupMode].module as SetupModeStep;
            const setupModeStepModuleData = setupModeStepModule.getData();
            const databaseModule = this.stepConfigMap[Step.Database].module as DatabaseStep;
            const databaseModuleData = databaseModule.getData();
            const storageModule = this.stepConfigMap[Step.Storage].module as StorageStep;
            const storageModuleData = storageModule.getData();
            const redisModule = this.stepConfigMap[Step.Redis].module as RedisStep;
            const redisModuleData = redisModule.getData();
            const mqttModule = this.stepConfigMap[Step.MQTT].module as MqttStep;
            const mqttModuleData = mqttModule.getData();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <i-panel width="100%" height="100%">
                <i-vstack padding={{ top: "1.5rem" }} margin={{ bottom: '0.5rem' }} id="pnlSocialRelayAdmin">
                    <i-scom-stepper id="stepper" margin={{ top: '1rem', bottom: '1rem' }} onChanged={this.onStepperChanged}></i-scom-stepper>
                </i-vstack>
            </i-panel>
        )
    }
}
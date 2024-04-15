/// <amd-module name="@scom/scom-social-relay-admin/interface.ts" />
declare module "@scom/scom-social-relay-admin/interface.ts" {
    export interface ISocialRelayAdmin {
        chainId?: number;
        to?: string;
        amount?: number;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin/createRelay/setupModeStep.tsx" />
declare module "@scom/scom-social-relay-admin/createRelay/setupModeStep.tsx" {
    import { Module } from '@ijstech/components';
    export class SetupModeStep extends Module {
        private edtRelayName;
        private info;
        private radioGroupRelayMode;
        private radioGroupDeploymentOption;
        private pnlCommand;
        private codeEditorCommand;
        init(): Promise<void>;
        show(options?: any): void;
        clear(): void;
        getData(): {
            relayName: any;
            relayMode: string;
            deploymentOption: string;
        };
        private updateCodeEditorCommand;
        private updateUI;
        private onRelayNameChanged;
        private onRelayModeChanged;
        private onDeploymentOptionChanged;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin/createRelay/databaseStep.tsx" />
declare module "@scom/scom-social-relay-admin/createRelay/databaseStep.tsx" {
    import { Module } from '@ijstech/components';
    export class DatabaseStep extends Module {
        private info;
        private edtDatabaseHost;
        private edtDatabasePort;
        private edtDatabaseUser;
        private edtDatabasePassword;
        init(): Promise<void>;
        show(options?: any): void;
        clear(): void;
        getData(): {
            databaseHost: any;
            databasePort: any;
            databaseUser: any;
            databasePassword: any;
        };
        private updateUI;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin/createRelay/storageStep.tsx" />
declare module "@scom/scom-social-relay-admin/createRelay/storageStep.tsx" {
    import { IComboItem, Module } from '@ijstech/components';
    export class StorageStep extends Module {
        private info;
        private comboStorageType;
        private edtS3Url;
        init(): Promise<void>;
        show(options?: any): void;
        clear(): void;
        getData(): {
            storageType: IComboItem;
            s3Url: any;
        };
        private updateUI;
        private onStorageTypeChanged;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin/createRelay/redisStep.tsx" />
declare module "@scom/scom-social-relay-admin/createRelay/redisStep.tsx" {
    import { Module } from '@ijstech/components';
    export class RedisStep extends Module {
        private info;
        private edtRedisHost;
        private edtRedisPort;
        private edtRedisPassword;
        private edtRedisDBIndex;
        init(): Promise<void>;
        show(options?: any): void;
        clear(): void;
        getData(): {
            redisHost: any;
            redisPort: any;
            redisPassword: any;
            redisDBIndex: any;
        };
        private updateUI;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin/createRelay/mqttStep.tsx" />
declare module "@scom/scom-social-relay-admin/createRelay/mqttStep.tsx" {
    import { Module } from '@ijstech/components';
    export class MqttStep extends Module {
        private info;
        private edtBrokerUrl;
        private edtTopicSubscription;
        init(): Promise<void>;
        show(options?: any): void;
        clear(): void;
        getData(): {
            brokerUrl: any;
            topicSubscription: any;
        };
        private updateUI;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin/createRelay/index.tsx" />
declare module "@scom/scom-social-relay-admin/createRelay/index.tsx" {
    import { Container, Module } from '@ijstech/components';
    export default class CreateRelayModule extends Module {
        private pnlSocialRelayAdmin;
        private stepper;
        private stepConfigMap;
        private loadedSteps;
        private info;
        private _data;
        tag: any;
        constructor(parent?: Container, options?: any);
        init(): Promise<void>;
        private setData;
        private getData;
        private _getActions;
        private getTag;
        private setTag;
        private updateTag;
        private updateStyle;
        private updateTheme;
        show(options?: any): Promise<void>;
        clear(): Promise<void>;
        private showStepModule;
        private onStepperChanged;
        private onValidate;
        onConfirm(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-social-relay-admin" />
declare module "@scom/scom-social-relay-admin" {
    import { Container, ControlElement, Module } from '@ijstech/components';
    interface ScomSocialRelayAdminElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-social-relay-admin']: ScomSocialRelayAdminElement;
            }
        }
    }
    export default class ScomSocialRelayAdmin extends Module {
        private relaysColumns;
        private createRelayModule;
        private tableRelays;
        private _data;
        tag: any;
        private handleViewButtonClick;
        constructor(parent?: Container, options?: any);
        init(): Promise<void>;
        private setData;
        private getData;
        getConfigurators(): {
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        private _getActions;
        private getTag;
        private setTag;
        private updateTag;
        private updateStyle;
        private updateTheme;
        show(options?: any): Promise<void>;
        private handleCreateRelayButtonClick;
        render(): any;
    }
}

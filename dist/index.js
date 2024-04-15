var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-social-relay-admin/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-social-relay-admin/createRelay/setupModeStep.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SetupModeStep = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    var RelayMode;
    (function (RelayMode) {
        RelayMode["Public"] = "Public";
        RelayMode["Private"] = "Private";
    })(RelayMode || (RelayMode = {}));
    var DeploymentOption;
    (function (DeploymentOption) {
        DeploymentOption["SelfHosted"] = "Self-Hosted";
        DeploymentOption["CloudHosted"] = "Cloud-Hosted";
    })(DeploymentOption || (DeploymentOption = {}));
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
    let SetupModeStep = class SetupModeStep extends components_1.Module {
        async init() {
            await super.init();
            this.codeEditorCommand.updateOptions({ readOnly: true });
        }
        show(options) {
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
            };
        }
        updateCodeEditorCommand(relayName) {
            this.codeEditorCommand.value = commandTemplate.replace(/^\s+|\s+$/g, '').replace(/\n\s+/g, '\n').replace('<nostr-name>', relayName);
        }
        updateUI() {
        }
        onRelayNameChanged() {
            this.pnlCommand.visible = this.radioGroupDeploymentOption.selectedValue === DeploymentOption.SelfHosted;
            const relayName = this.edtRelayName.value;
            this.updateCodeEditorCommand(relayName);
        }
        onRelayModeChanged() {
            const relayMode = this.radioGroupRelayMode.selectedValue;
        }
        onDeploymentOptionChanged() {
            const deploymentOption = this.radioGroupDeploymentOption.selectedValue;
            this.pnlCommand.visible = deploymentOption === DeploymentOption.SelfHosted;
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlInfo", gap: "1rem" },
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: RelayNameCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtRelayName", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 }, onChanged: this.onRelayNameChanged })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-label", { caption: RelayModeCaption }),
                    this.$render("i-radio-group", { id: "radioGroupRelayMode", radioItems: RelayModes, selectedValue: DefaultRelayMode, onChanged: this.onRelayModeChanged })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-label", { caption: DeploymentOptionCaption }),
                    this.$render("i-radio-group", { id: "radioGroupDeploymentOption", radioItems: DeploymentOptions, selectedValue: DefaultDeploymentOption, onChanged: this.onDeploymentOptionChanged })),
                this.$render("i-vstack", { id: "pnlCommand", gap: "0.5rem", visible: false },
                    this.$render("i-label", { caption: selfHostedCommandHint }),
                    this.$render("i-code-editor", { id: "codeEditorCommand", width: "100%", height: "150px", language: 'shell', padding: { right: '1rem' } }))));
        }
    };
    SetupModeStep = __decorate([
        (0, components_1.customElements)('scom-social-relay-admin--setup-mode-step')
    ], SetupModeStep);
    exports.SetupModeStep = SetupModeStep;
});
define("@scom/scom-social-relay-admin/createRelay/databaseStep.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseStep = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
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
    let DatabaseStep = class DatabaseStep extends components_2.Module {
        async init() {
            await super.init();
        }
        show(options) {
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
            };
        }
        updateUI() {
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlInfo", gap: "1rem" },
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: DatabaseHostCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtDatabaseHost", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: DatabaseHostHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: DatabasePortCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtDatabasePort", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: DatabasePortHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: DatabaseUserCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtDatabaseUser", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: DatabaseUserHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: DatabasePasswordCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtDatabasePassword", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: DatabasePasswordHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: DatabaseNameCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtDatabaseName", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: DatabaseNameHint, font: { size: '0.875rem', color: Theme.text.secondary } }))));
        }
    };
    DatabaseStep = __decorate([
        (0, components_2.customElements)('scom-social-relay-admin--database-step')
    ], DatabaseStep);
    exports.DatabaseStep = DatabaseStep;
});
define("@scom/scom-social-relay-admin/createRelay/storageStep.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorageStep = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
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
    let StorageStep = class StorageStep extends components_3.Module {
        async init() {
            await super.init();
        }
        show(options) {
            this.clear();
            this.info = options;
            this.updateUI();
        }
        clear() {
        }
        getData() {
            return {
                storageType: this.comboStorageType.selectedItem,
                s3Url: this.edtS3Url.value,
            };
        }
        updateUI() {
        }
        onStorageTypeChanged() {
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlInfo", gap: "1rem" },
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: StorageTypeCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-combo-box", { id: "comboStorageType", height: 32, width: "100%", icon: { width: 14, height: 14, name: 'angle-down', fill: Theme.divider }, border: { width: 1, style: 'solid', color: Theme.divider, radius: 5 }, items: StorageTypes, selectedItem: StorageTypes[0], onChanged: this.onStorageTypeChanged }),
                    this.$render("i-label", { caption: StorageTypeHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: S3UrlCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtS3Url", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: S3UrlHint, font: { size: '0.875rem', color: Theme.text.secondary } }))));
        }
    };
    StorageStep = __decorate([
        (0, components_3.customElements)('scom-social-relay-admin--storage-step')
    ], StorageStep);
    exports.StorageStep = StorageStep;
});
define("@scom/scom-social-relay-admin/createRelay/redisStep.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RedisStep = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    const RedisHostCaption = 'Redis Host';
    const RedisPortCaption = 'Redis Port';
    const RedisPasswordCaption = 'Redis Password';
    const RedisDBIndexCaption = 'Redis DB Index';
    const RedisHostHint = 'Specify the Redis host address.';
    const RedisPortHint = 'Enter the port number for Redis.';
    const RedisPasswordHint = 'Secure your Redis with a password.';
    const RedisDBIndexHint = 'Select the database index for Redis.';
    let RedisStep = class RedisStep extends components_4.Module {
        async init() {
            await super.init();
        }
        show(options) {
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
            };
        }
        updateUI() {
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlInfo", gap: "1rem" },
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: RedisHostCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtRedisHost", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: RedisHostHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: RedisPortCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtRedisPort", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: RedisPortHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: RedisPasswordCaption })),
                    this.$render("i-input", { id: "edtRedisPassword", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: RedisPasswordHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: RedisDBIndexCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtRedisDBIndex", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: RedisDBIndexHint, font: { size: '0.875rem', color: Theme.text.secondary } }))));
        }
    };
    RedisStep = __decorate([
        (0, components_4.customElements)('scom-social-relay-admin--redis-step')
    ], RedisStep);
    exports.RedisStep = RedisStep;
});
define("@scom/scom-social-relay-admin/createRelay/mqttStep.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MqttStep = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    const BrokerUrlCaption = 'Broker URL';
    const TopicSubscriptionCaption = 'Topic Subscription';
    const BrokerUrlHint = 'Input the URL of your MQTT broker.';
    const TopicSubscriptionHint = 'List the topic you want to subscribe to.';
    let MqttStep = class MqttStep extends components_5.Module {
        async init() {
            await super.init();
        }
        show(options) {
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
            };
        }
        updateUI() {
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlInfo", gap: "1rem" },
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: BrokerUrlCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtBrokerUrl", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: BrokerUrlHint, font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-panel", null,
                        this.$render("i-label", { display: "inline", caption: TopicSubscriptionCaption }),
                        this.$render("i-label", { display: "inline", caption: "*", font: { color: Theme.colors.error.main } })),
                    this.$render("i-input", { id: "edtTopicSubscription", width: "100%", height: 32, padding: { left: '0.5rem', right: '0.5rem' }, border: { radius: 5 } }),
                    this.$render("i-label", { caption: TopicSubscriptionHint, font: { size: '0.875rem', color: Theme.text.secondary } }))));
        }
    };
    MqttStep = __decorate([
        (0, components_5.customElements)('scom-social-relay-admin--mqtt-step')
    ], MqttStep);
    exports.MqttStep = MqttStep;
});
define("@scom/scom-social-relay-admin/createRelay/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-social-relay-admin/createRelay/setupModeStep.tsx", "@scom/scom-social-relay-admin/createRelay/databaseStep.tsx", "@scom/scom-social-relay-admin/createRelay/storageStep.tsx", "@scom/scom-social-relay-admin/createRelay/redisStep.tsx", "@scom/scom-social-relay-admin/createRelay/mqttStep.tsx"], function (require, exports, components_6, setupModeStep_1, databaseStep_1, storageStep_1, redisStep_1, mqttStep_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_6.Styles.Theme.ThemeVars;
    var Step;
    (function (Step) {
        Step["SetupMode"] = "Setup Mode";
        Step["Database"] = "Database";
        Step["Storage"] = "Storage";
        Step["Redis"] = "Redis";
        Step["MQTT"] = "MQTT";
    })(Step || (Step = {}));
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
    let CreateRelayModule = class CreateRelayModule extends components_6.Module {
        constructor(parent, options) {
            super(parent, options);
            this.loadedSteps = new Set();
            this.tag = {
                light: {},
                dark: {}
            };
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
                    moduleClass: setupModeStep_1.SetupModeStep
                },
                [Step.Database]: {
                    moduleClass: databaseStep_1.DatabaseStep
                },
                [Step.Storage]: {
                    moduleClass: storageStep_1.StorageStep
                },
                [Step.Redis]: {
                    moduleClass: redisStep_1.RedisStep
                },
                [Step.MQTT]: {
                    moduleClass: mqttStep_1.MqttStep
                }
            };
            this.executeReadyCallback();
        }
        async setData(value) {
            this._data = value;
        }
        getData() {
            return this._data;
        }
        _getActions() {
            return [];
        }
        getTag() {
            return this.tag;
        }
        setTag(value) {
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
        updateTag(type, value) {
            this.tag[type] = this.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
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
        async show(options) {
            await this.clear();
            this.info = options;
            await this.showStepModule(Step.SetupMode);
        }
        async clear() {
            this.stepper.activeStep = 0;
            this.loadedSteps.clear();
            this.info = null;
        }
        async showStepModule(stepName) {
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
        async onStepperChanged(target, oldStep) {
            if (this.stepper.activeStep === oldStep)
                return;
            const stepName = this.stepper.steps[this.stepper.activeStep]?.name;
            await this.showStepModule(stepName);
        }
        onValidate() {
            const step = this.stepper.activeStep;
            const stepName = this.stepper.steps[step]?.name;
            const stepModule = this.stepConfigMap[stepName]?.module;
            this.stepper.updateStatus(step, true);
        }
        async onConfirm() {
            try {
                const setupModeStepModule = this.stepConfigMap[Step.SetupMode].module;
                const setupModeStepModuleData = setupModeStepModule.getData();
                const databaseModule = this.stepConfigMap[Step.Database].module;
                const databaseModuleData = databaseModule.getData();
                const storageModule = this.stepConfigMap[Step.Storage].module;
                const storageModuleData = storageModule.getData();
                const redisModule = this.stepConfigMap[Step.Redis].module;
                const redisModuleData = redisModule.getData();
                const mqttModule = this.stepConfigMap[Step.MQTT].module;
                const mqttModuleData = mqttModule.getData();
            }
            catch (err) {
                console.error(err);
            }
        }
        render() {
            return (this.$render("i-panel", { width: "100%", height: "100%" },
                this.$render("i-vstack", { padding: { top: "1.5rem" }, margin: { bottom: '0.5rem' }, id: "pnlSocialRelayAdmin" },
                    this.$render("i-scom-stepper", { id: "stepper", margin: { top: '1rem', bottom: '1rem' }, onChanged: this.onStepperChanged }))));
        }
    };
    CreateRelayModule = __decorate([
        (0, components_6.customElements)('scom-social-relay-admin--create-relay-module')
    ], CreateRelayModule);
    exports.default = CreateRelayModule;
});
define("@scom/scom-social-relay-admin", ["require", "exports", "@ijstech/components", "@scom/scom-social-relay-admin/createRelay/index.tsx"], function (require, exports, components_7, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_7.Styles.Theme.ThemeVars;
    let ScomSocialRelayAdmin = class ScomSocialRelayAdmin extends components_7.Module {
        handleViewButtonClick(instanceId) {
        }
        constructor(parent, options) {
            super(parent, options);
            this.relaysColumns = [
                {
                    title: 'Instance ID',
                    fieldName: 'instanceId',
                    onRenderCell: (source, columnData, rowData) => {
                        return columnData;
                    }
                },
                {
                    title: 'Instance Name',
                    fieldName: 'instanceName',
                    onRenderCell: (source, columnData, rowData) => {
                        return columnData;
                    }
                },
                {
                    title: '',
                    fieldName: '_buttons',
                    onRenderCell: (source, columnData, rowData) => {
                        return (this.$render("i-button", { caption: 'View', padding: { top: '0.4375rem', bottom: '0.4375rem', left: '0.625rem', right: '0.625rem' }, border: { radius: '0.5rem' }, font: { weight: 500, color: Theme.colors.primary.contrastText, size: '0.875rem', transform: 'capitalize' }, boxShadow: 'none', background: { color: Theme.colors.primary.main }, mediaQueries: [
                                {
                                    maxWidth: '767px',
                                    properties: { visible: false }
                                }
                            ], onClick: () => this.handleViewButtonClick(rowData.instanceId) }));
                    }
                }
            ];
            this.tag = {
                light: {},
                dark: {}
            };
        }
        async init() {
            await super.init();
            await this.tableRelays.ready();
            this.tableRelays.columns = this.relaysColumns; //FIXME: This line is only necessary because of a bug in the Table component
        }
        async setData(value) {
            this._data = value;
        }
        getData() {
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
            ];
        }
        _getActions() {
            return [];
        }
        getTag() {
            return this.tag;
        }
        setTag(value) {
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
        updateTag(type, value) {
            this.tag[type] = this.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
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
        async show(options) {
            this.tableRelays.data = [];
            this.tableRelays.data = [{ instanceId: '1', instanceName: 'Relay 1' }, { instanceId: '2', instanceName: 'Relay 2' }];
        }
        async handleCreateRelayButtonClick() {
            if (!this.createRelayModule) {
                this.createRelayModule = new index_1.default();
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
            return (this.$render("i-panel", { width: "100%", height: "100%" },
                this.$render("i-vstack", { padding: { top: "1.5rem", bottom: "1.5rem", left: '1.5rem', right: '1.5rem' }, margin: { bottom: '0.5rem' }, id: "pnlSocialRelayAdmin" },
                    this.$render("i-hstack", { id: "pnlButtons", verticalAlignment: "center", horizontalAlignment: 'end', gap: "0.5rem" },
                        this.$render("i-hstack", { width: '2rem', height: '2rem', position: 'relative', verticalAlignment: 'center', horizontalAlignment: 'center', cursor: 'pointer' },
                            this.$render("i-icon", { name: 'plus-circle', width: '1.125rem', height: '1.125rem', display: 'inline-flex', fill: Theme.text.primary, onClick: this.handleCreateRelayButtonClick }))),
                    this.$render("i-table", { id: "tableRelays", heading: true, columns: this.relaysColumns, headingStyles: {
                            font: { size: '1rem', weight: 600, color: Theme.text.secondary },
                            padding: { top: '1.25rem', bottom: '1.25rem', left: '0.5rem', right: '0.5rem' }
                        }, bodyStyles: {
                            font: { size: '1rem', color: Theme.text.primary },
                            padding: { top: '1.25rem', bottom: '1.25rem', left: '0.5rem', right: '0.5rem' }
                        } }))));
        }
    };
    ScomSocialRelayAdmin = __decorate([
        (0, components_7.customElements)('i-scom-social-relay-admin')
    ], ScomSocialRelayAdmin);
    exports.default = ScomSocialRelayAdmin;
});

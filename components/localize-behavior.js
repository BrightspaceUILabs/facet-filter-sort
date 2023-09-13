import '@brightspace-ui/localize-behavior/d2l-localize-behavior.js';

const LocalizeBehaviorImpl = {
	localizeConfig: {
		importFunc: async lang => (await import(`../lang/${lang}.js`)).default
	}
};

export const LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	LocalizeBehaviorImpl
];

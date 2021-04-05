import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.LabsFilterDropdown = window.D2L.PolymerBehaviors.LabsFilterDropdown || {};

/**
 * Localizes the search facets component.
 * @polymerBehavior D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehavior
 */
D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehaviorImpl = {
	properties: {
	/**
	 * Localization resources.
	 */
		resources: {
			value: function() {
				return {
					// 'ar': {
					// 	clear: 'مسح',
					// 	filter: 'عامل التصفية',
					// 	filterBy: 'تصفية حسب',
					// 	filterMultiple: 'عامل التصفية: {numOptions} من عوامل التصفية',
					// 	filterSingle: 'التصفية: عامل تصفية واحد'
					// },
					// 'cy': {
					// 	clear: 'Clirio',
					// 	filter: 'Hidlo',
					// 	filterBy: 'Hidlo yn ôl',
					// 	filterMultiple: 'Hidlo: {numOptions} Hidlyddion',
					// 	filterSingle: 'Hidlo: 1 Hidlydd'
					// },
					// 'da': {
					// 	clear: 'Ryd',
					// 	filter: 'Filtrér',
					// 	filterBy: 'Filtrér efter',
					// 	filterMultiple: 'Filtrér: {numOptions} filtre',
					// 	filterSingle: 'Filtrér: 1 filter'
					// },
					// 'de': {
					// 	clear: 'Löschen',
					// 	filter: 'Filter',
					// 	filterBy: 'Filtern nach',
					// 	filterMultiple: 'Filter: {numOptions} Filter',
					// 	filterSingle: 'Filter: 1 Filter'
					// },
					// 'en': {
					// 	clear: 'Clear',
					// 	filter: 'Filter',
					// 	filterBy: 'Filter By',
					// 	filterMultiple: 'Filter: {numOptions} Filters',
					// 	filterSingle: 'Filter: 1 Filter'
					// },
					// 'es': {
					// 	clear: 'Borrar',
					// 	filter: 'Filtrar',
					// 	filterBy: 'Filtrar por',
					// 	filterMultiple: 'Filtro: {numOptions} filtros',
					// 	filterSingle: 'Filtro: 1 filtro'
					// },
					// 'es-es': {
					// 	clear: 'Borrar',
					// 	filter: 'Filtro',
					// 	filterBy: 'Filtrar por',
					// 	filterMultiple: 'Filtro: {numOptions} filtros',
					// 	filterSingle: 'Filtro: 1 filtro'
					// },
					// 'fi': {
					// 	clear: 'Tyhjennä',
					// 	filter: 'Suodatin',
					// 	filterBy: 'Suodatusperuste',
					// 	filterMultiple: 'Suodatus: {numOptions} suodatinta',
					// 	filterSingle: 'Suodatus: 1 suodatin'
					// },
					// 'fr': {
					// 	clear: 'Effacer',
					// 	filter: 'Filtrer',
					// 	filterBy: 'Filtrer par',
					// 	filterMultiple: 'Filtre : {numOptions} filtres',
					// 	filterSingle: 'Filtre : 1 filtre'
					// },
					// 'fr-fr': {
					// 	clear: 'Effacer',
					// 	filter: 'Filtre',
					// 	filterBy: 'Filtrer par',
					// 	filterMultiple: 'Filtre : {numOptions} filtres',
					// 	filterSingle: 'Filtre : 1 filtre'
					// },
					// 'ja': {
					// 	clear: 'クリア',
					// 	filter: 'フィルタ',
					// 	filterBy: 'フィルタの条件',
					// 	filterMultiple: 'フィルタ数: {numOptions}',
					// 	filterSingle: 'フィルタ数: 1'
					// },
					// 'ko': {
					// 	clear: '지우기',
					// 	filter: '필터',
					// 	filterBy: '필터링 기준',
					// 	filterMultiple: '필터: {numOptions}개 필터',
					// 	filterSingle: '필터: 1개 필터'
					// },
					// 'nb': {
					// 	clear: 'Fjern',
					// 	filter: 'Filter',
					// 	filterBy: 'Filtrer etter',
					// 	filterMultiple: 'Filter: {numOptions} filtre',
					// 	filterSingle: 'Filter: 1 filter'
					// },
					// 'nl': {
					// 	clear: 'Wissen',
					// 	filter: 'Filteren',
					// 	filterBy: 'Filteren op',
					// 	filterMultiple: 'Filteren: {numOptions} filters',
					// 	filterSingle: 'Filteren: 1 filter'
					// },
					// 'pt': {
					// 	clear: 'Limpar',
					// 	filter: 'Filtrar',
					// 	filterBy: 'Filtrar por',
					// 	filterMultiple: 'Filtros: {numOptions}',
					// 	filterSingle: 'Filtros: 1'
					// },
					// 'sv': {
					// 	clear: 'Rensa',
					// 	filter: 'Filter',
					// 	filterBy: 'Filtrera efter',
					// 	filterMultiple: 'Filter: {numOptions} filter',
					// 	filterSingle: 'Filter: 1 filter'
					// },
					// 'tr': {
					// 	clear: 'Temizle',
					// 	filter: 'Filtrele',
					// 	filterBy: 'Filtreleme Ölçütü',
					// 	filterMultiple: 'Filtre: {numOptions} Filtre',
					// 	filterSingle: 'Filtre: 1 Filtre'
					// },
					// 'zh': {
					// 	clear: '清除',
					// 	filter: '筛选',
					// 	filterBy: '筛选条件',
					// 	filterMultiple: '筛选：{numOptions} 个筛选条件',
					// 	filterSingle: '筛选：1 个筛选条件'
					// },
					// 'zh-tw': {
					// 	clear: '清除',
					// 	filter: '篩選',
					// 	filterBy: '篩選依據',
					// 	filterMultiple: '篩選器：{numOptions} 個篩選器',
					// 	filterSingle: '篩選器：1 個篩選器'
					// }
				};
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehavior */
D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehaviorImpl
];

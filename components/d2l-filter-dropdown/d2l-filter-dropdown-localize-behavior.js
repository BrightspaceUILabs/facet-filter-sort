import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.FilterDropdown = window.D2L.PolymerBehaviors.FilterDropdown || {};

/**
 * Localizes the search facets component.
 * @polymerBehavior D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior
 */
D2L.PolymerBehaviors.FilterDropdown.LocalizeBehaviorImpl = {
	properties: {
	/**
	 * Localization resources.
	 */
		resources: {
			value: function() {
				return {
					'ar': {
						clear: 'مسح',
						filter: 'التصفية',
						filterBy: 'تصفية بحسب',
						filterMultiple: 'Filter: {numOptions} Filters',
						filterSingle: 'التصفية: عامل تصفية واحد',
						searchBy: 'البحث عن {category}'
					},
					'de': {
						clear: 'Löschen',
						filter: 'Filter',
						filterBy: 'Filtern nach',
						filterMultiple: 'Filter: {numOptions} Filter',
						filterSingle: 'Filter: 1 Filter',
						searchBy: 'Nach {category} suchen'
					},
					'en': {
						clear: 'Clear',
						filter: 'Filter',
						filterBy: 'Filter By',
						filterMultiple: 'Filter: {numOptions} Filters',
						filterSingle: 'Filter: 1 Filter',
						searchBy: 'Search by {category}'
					},
					'es': {
						clear: 'Borrar',
						filter: 'Filtrar',
						filterBy: 'Filtrar por',
						filterMultiple: 'Filtro: {numOptions} filtros',
						filterSingle: 'Filtro: 1 filtro',
						searchBy: 'Buscar por {category}'
					},
					'fi': {
						clear: 'Tyhjennä',
						filter: 'Suodatin',
						filterBy: 'Suodatusperuste',
						filterMultiple: 'Suodatus: {numOptions} suodatinta',
						filterSingle: 'Suodatus: 1 suodatin',
						searchBy: 'Hakuperuste {category}'
					},
					'fr': {
						clear: 'Effacer',
						filter: 'Filtrer',
						filterBy: 'Filtrer par',
						filterMultiple: 'Filtre : {numOptions} filtres',
						filterSingle: 'Filtre : 1 filtre',
						searchBy: 'Recherche par {category}'
					},
					'ja': {
						clear: 'クリア',
						filter: 'フィルタ',
						filterBy: 'フィルタの条件',
						filterMultiple: 'フィルタ数: {numOptions}',
						filterSingle: 'フィルタ数: 1',
						searchBy: '{category} で検索'
					},
					'ko': {
						clear: '지우기',
						filter: '필터',
						filterBy: '필터링 기준',
						filterMultiple: '필터: {numOptions}개 필터',
						filterSingle: '필터: 1개 필터',
						searchBy: '{category} 필터로 검색'
					},
					'nb': {
						clear: 'Fjern',
						filter: 'Filter',
						filterBy: 'Filtrer etter',
						filterSingle: 'Filter: 1 filter',
						filterMultiple: 'Filter: {numOptions} filtre',
						searchBy: 'Søk etter {category}'
					},
					'nl': {
						clear: 'Wissen',
						filter: 'Filteren',
						filterBy: 'Filteren op',
						filterMultiple: 'Filteren: {numOptions} filters',
						filterSingle: 'Filteren: 1 filter',
						searchBy: 'Zoeken op {category}'
					},
					'pt': {
						clear: 'Apagar',
						filter: 'Filtro',
						filterBy: 'Filtrar por',
						filterMultiple: 'Filtrar: {numOptions} filtros',
						filterSingle: 'Filtrar: 1 Filtro',
						searchBy: 'Pesquisar por {category}'
					},
					'sv': {
						clear: 'Rensa',
						filter: 'Filter',
						filterBy: 'Filtrera efter',
						filterMultiple: 'Filter: {numOptions} filter',
						filterSingle: 'Filter: 1 filter',
						searchBy: 'Sök per {category}'
					},
					'tr': {
						clear: 'Temizle',
						filter: 'Filtrele',
						filterBy: 'Filtreleme Ölçütü',
						filterMultiple: 'Filtre: {numOptions} Filtre',
						filterSingle: 'Filtre: 1 Filtre',
						searchBy: '{category} Kullanarak Ara'
					},
					'zh': {
						clear: '清除',
						filter: '筛选',
						filterBy: '筛选条件',
						filterMultiple: '筛选：{numOptions} 个筛选条件',
						filterSingle: '筛选：1 个筛选条件',
						searchBy: '按 {category} 搜索'
					},
					'zh-tw': {
						clear: '清除',
						filter: '篩選',
						filterBy: '篩選依據',
						filterMultiple: '篩選器：{numOptions} 個篩選器',
						filterSingle: '篩選器：1 個篩選器',
						searchBy: '依 {categoryF{}} 搜尋'
					}
				};
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior */
D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.FilterDropdown.LocalizeBehaviorImpl
];

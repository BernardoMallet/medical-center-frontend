import { Pageable } from './pageable';
import { Sort } from './sort';

export class ResultSet {
	content: any[] = [];
	pageable: Pageable | undefined;
	totalElements: number | undefined;
	totalPages: number | undefined;
	last: boolean | undefined;
	size: number | undefined;
	number: number | undefined;
	sort: Sort | undefined;
	first: boolean | undefined;
	numberOfElements: number | undefined;
}

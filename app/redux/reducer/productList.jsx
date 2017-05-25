import {GETPRODUCTLIST} from 'actionPath/productAction.jsx';

import {PAGESIZE} from 'cmPath/config.jsx';

const initialstate={


	rootName:'Flashlights',
	parentName:'echargeable Flashlights',
	list:[],
	currentPage:0,
	maxPage:4


}

export default function productList(state= initialstate, action) {

	switch (action.type) {

		case GETPRODUCTLIST:



			return {

				...state,
			}



		default:
			return state
	}
}
import {GETPRODUCTLIST,CHANGE} from 'actionPath/productAction.jsx';

import {PAGESIZE} from 'cmPath/config.jsx';

const initialstate={


	rootName:'Flashlights',
	parentName:'Rechargeable Flashlights',
	list:[],
	currentPage:1,
	maxPage:4

}

export default function productList(state= initialstate, action) {

	switch (action.type) {

		case GETPRODUCTLIST:



			return {

				...state,
			}



		case CHANGE:


			return {

				...state,
				rootName:action.root,
				parentName:action.parent
			}
		default:
			return state
	}
}
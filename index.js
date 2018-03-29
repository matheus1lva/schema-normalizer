function checkIsObject(variable){
    return Object.prototype.toString.call(variable) === '[object Object]';
}

function generateSameType(data) {
	if (checkIsObject(data)) {
		return {};
	}
	if (Array.isArray(data)) {
		return [];
	}
}

function decontructValues(object) {
	if (object.hasOwnProperty('value') && object.hasOwnProperty('label')) {
		if (typeof object.value === 'string') {
			return object.value
		} else {
			return { ...object.value };
		}
	} else {
		// lets deconstruct everything;
		const tempObject = {};
		Object.keys(object).forEach((key) => {
			if (object[key].hasOwnProperty('label') && object[key].hasOwnProperty('value')) {
				tempObject[key] = decontructValues(object[key]);
			} else{
				tempObject[key] = object[key];
			}
		});
		return tempObject;
	}
	return object;
}

function checkOptionalAndFill(key, object) {
	if (!key.includes('!')) {
		return '';
	}
	const sanitizedKey = key.replace('!', '');
	// that is, we set the item as optional
	// but the object has this item.
	if (object.hasOwnProperty(sanitizedKey)) {
		return object[sanitizedKey];
	}
}

function extractAndFillObject(schemaKeys, object) {
	const resultObject = {};
	schemaKeys.forEach((key) => {
		let tempObject = object;
		tempObject = decontructValues(object);
		if (object.hasOwnProperty(key)) {
			resultObject[key] = object[key];
		} else {
			const sanitizedKey = key.replace('!', '');
			resultObject[sanitizedKey] = checkOptionalAndFill(key, object);
		}
	});
	return resultObject;
}

function getEverythingOrNot(values, property, object) {
	if (values === '*') {
		return object;
	}
	debugger;
	return object[values];
}

function fillOrReturn(property, object) {
	if (!object.hasOwnProperty(property)) {
		return '';
	}
	return object[property];
}

export function normalizer(pseudoSchema, data) {
	const schema = { ...pseudoSchema };
	const finalResult = generateSameType(data);

	Object.keys(schema).forEach((element) => {
		// element = key of our schema
		const property = element;
		// schema[element] = values
		const values = schema[property];

		if (Array.isArray(values)) {
			finalResult[property] = [];

			if (Array.isArray(data[property])) {
				data[property].forEach((datum) => {
					finalResult[property].push(extractAndFillObject(values, datum));
				});
			} else if (checkIsObject(data[property])) {
				finalResult[property] = extractAndFillObject(values, data[property]);
			}
		} else {
			if (checkIsObject(data[property])) {
				// removed the value from object {label, value}
				const tempObject = decontructValues(data[property]);
				finalResult[property] = getEverythingOrNot(values, property, tempObject);
			} else {
				finalResult[property] = fillOrReturn(property, data);
			}
		}
	});
	return finalResult;
}

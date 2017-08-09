/*
 * @param classObject: object { className: logicToShow }
 * @param classDefault: string -- all className will be showed
 *
 * @return string -- string of classes
 */
export default function getClassName(classObject, classDefault = null) {
	let classList = []

	if(classDefault) 
		classList.push(classDefault)

	for(let className in classObject) {
		if(classObject[className]) classList.push(className)
	}

	return classList.join(" ")
}
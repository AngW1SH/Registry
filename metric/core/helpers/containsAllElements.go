package helpers

func ContainsAllElements(arr1, arr2 []string) bool {
	elementsMap := make(map[string]bool)

	for _, element := range arr1 {
		elementsMap[element] = true
	}

	for _, element := range arr2 {
		if _, exists := elementsMap[element]; !exists {
			return false
		}
	}

	return true
}
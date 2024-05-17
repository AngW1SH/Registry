package helpers

func Contains(arr []string, elem string) bool {

	for _, v := range arr {
		if v == elem {
			return true
		}
	}

	return false
}
package metrics

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
)

type ReturnValue struct {
	Value uint `json:"value"`
}

func getEndpoint(parsedData interface{}) string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["label"] == "API Endpoint" {
			return v.(map[string]interface{})["value"].(string)
		}
	}

	return ""
}

func TotalCommitsMetric(data interface{}) (string, error) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(data.(string)), &parsed)

	if err != nil {
		return "", err
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		return "", errors.New("no API endpoint")
	}

	resp, err := http.Get(endpoint + "commits?per_page=1")

	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return "", errors.New("failed to fetch data")
	}

	pattern := `page=(\d+)>; rel="last"`

    // Compile the regular expression
    re := regexp.MustCompile(pattern)

	fmt.Println(resp.Header.Get("Link"))
    // Find the submatch in the string
    match := re.FindStringSubmatch(resp.Header.Get("Link"))

	if len(match) == 0 {
		return "", errors.New("failed to find the submatch in the Link header")
	}

	numValue, err := strconv.Atoi(match[1])

	if err != nil {
		return "", err
	}

	result, error := json.Marshal(ReturnValue{
		Value: uint(numValue),
	})

	if error != nil {
		return "", nil
	}

	return string(result), nil
}
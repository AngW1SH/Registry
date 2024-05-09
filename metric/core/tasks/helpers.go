package tasks

import "core/models"

func taskToSnapshot(task models.Task, data string, err string, params []models.SnapshotParam) *models.Snapshot {

	return &models.Snapshot{
		Metric:    task.Metric,
		Data:      data,
		Groups:    task.Groups,
		Error:     err,
		IsPublic:  task.IsPublic,
		Params:    params,
	}
}

func getEndpoint(parsedData interface{}) string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["prop"] == "apiEndpoint" {
			return v.(map[string]interface{})["value"].(string)
		}
	}

	return ""
}

func getAPIKeys(parsedData interface{}) []string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["prop"] == "apiKeys" {
			var result []string

			for _, apiKey := range v.(map[string]interface{})["value"].([]interface{}) {
				result = append(result, apiKey.(string))
			}
			return result
		}
	}

	return nil
}

func mapSnapshotsByNodeIds(issues []models.SnapshotDB) map[string]models.SnapshotDB {

	result := map[string]models.SnapshotDB{}

	for _, issue := range issues {

		var nodeId string

		for _, param := range issue.Params {

			if param.Name == "id" {
				nodeId = param.Value
			}
		}

		if nodeId == "" {
			continue
		}

		result[nodeId] = issue
	}

	return result
}
package metrics

import "core/models"

var List = []models.MetricType{
	{
		Name: "1",
		Payload: MetricOne,
	},
	{
		Name: "2",
		Payload: MetricTwo,
	},
	{
		Name: "3",
		Payload: MetricThree,
	},
}
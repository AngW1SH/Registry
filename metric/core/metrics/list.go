package metrics

var List = map[string]func(data interface{}) string{
	"1": MetricOne,
	"2": MetricTwo,
	"3": MetricThree,
}
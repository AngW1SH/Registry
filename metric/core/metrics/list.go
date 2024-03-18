package metrics

var List = map[string]func(data interface{}) string{
	"CommitsPerDay": CommitsPerDayMetric,
}
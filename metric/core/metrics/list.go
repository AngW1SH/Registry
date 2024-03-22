package metrics

var List = map[string]func(data interface{}) (string, error){
	"CommitsPerDay": CommitsPerDayMetric,
}
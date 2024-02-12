package initializers

import (
	"log"

	"github.com/joho/godotenv"
)

func InitializeEnvVariables() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}